import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import matchSorter from 'match-sorter';
import * as R from "ramda";
import { debounce } from 'lodash';
import { Label, Glyphicon, FormControl } from 'react-bootstrap';
import { applyFilters } from "../../util/filterUtil";
import Loader from '../widgets/Loader';
import '../../../assets/css/cardList.css';

class CardList extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      searchValue: props.activeSearchType === 'patient-name' ? props.searchValue : "",
      additionalSearchValue: props.activeSearchType === 'patient-identifier' ? props.searchValue : "",
      activeSearchType: '',
      customMatchSorterConfigs: {}
    };

    this.onRowSelected = this.onRowSelected.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchClear = this.handleSearchClear.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);

    this.patientName = React.createRef();
  }

  // TODO VERY CONFUSING:
  // TODO the clearListActionCreators and rowSelectedActionCreators are called and then dispatched,
  // TODO but the onMountOtherActionCreators aren't dispatched, they are just called, and so need
  // TODO to be wrapped in dispatch... there should be consistency... the onMountOtherActionCreators should really dispatch actions as well
  componentDidMount() {
    this.handleFetchData();
    if (this.props.onMountOtherActionCreators !== undefined) {
      this.props.onMountOtherActionCreators.forEach((action) =>action());
    }
    this.setFocus(this.patientName.current);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleClearData() {
    if (this.props.clearListActionCreators !== undefined) {
      this.props.clearListActionCreators.forEach((action) => this.props.dispatch(action()));
    }
  }

  handleFetchData() {
    if (this.props.fetchListActionCreator !== undefined) {
      this.props.fetchListActionCreator();

      if (this.props.delayInterval !== undefined && this.props.delayInterval > 0) {
        this.interval = setInterval(() =>
          this.props.fetchListActionCreator(), this.props.delayInterval);
      }
    }
  }

  getSortFields(index) {
    const { sortFields } = this.props;
    return sortFields[index] ? sortFields[index].split('.') : '';
  }

  applyFiltersToList(list) {
    const { sortFields, searchFilterFields, additionalSearchFilterFields } = this.props;
    const {
      searchValue, additionalSearchValue, customMatchSorterConfigs
    } = this.state;
    let filters = this.props.filters ? [...this.props.filters] : [];
    list = applyFilters(list, filters, 'and');

    if (searchFilterFields) {
      list = matchSorter(list, searchValue, { keys: searchFilterFields });
    }
    if (additionalSearchFilterFields) {
      list = matchSorter(list, additionalSearchValue, { keys: additionalSearchFilterFields, ...customMatchSorterConfigs });
    }

    if (sortFields) {
      // Can accept up to 5 fallback sorting params
      let sorter = R.sortWith([
        R.ascend(R.path(this.getSortFields(0))),
        R.ascend(R.path(this.getSortFields(1))),
        R.ascend(R.path(this.getSortFields(2))),
        R.ascend(R.path(this.getSortFields(3))),
        R.ascend(R.path(this.getSortFields(4))),
      ]);
      list = sorter(list);
    }

    return list;
  }

  onRowSelected(row) {
    if (this.props.rowSelectedActionCreators) {
      this.props.rowSelectedActionCreators.forEach((f) => this.props.dispatch(f(row)));
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let searchQuery = null;
    const { searchValue, additionalSearchValue, activeSearchType } = this.state;
    if (activeSearchType === 'patient-name' || additionalSearchValue === "") {
      searchQuery = searchValue;
    }
    if (activeSearchType === 'patient-identifier' || searchValue === "") {
      searchQuery = additionalSearchValue;
    }
    const handleSearch = debounce(() => this.props.handleSearchSubmit({ activeSearchType, searchQuery }), 1000);
    handleSearch();
  }

  handleSearchChange(e, customMatchSorterConfigs) {
    if (e.hasOwnProperty('target')) {
      const value = e.target.value;
      const activeSearchType = e.target.name;
      this.setState({ searchValue: value, activeSearchType });
      if (this.props.searchType !== 'server') {
        if (this.props.handleSearchSubmit && value.length > 2) {
          const handleSearch = debounce(() => this.props.handleSearchSubmit(value), 1000);
          handleSearch();
        }
      }
    } else {
      this.setState({ additionalSearchValue: e, activeSearchType: 'patient-identifier' });
    }

    if (typeof customMatchSorterConfigs !== 'undefined') {
      this.setState({ customMatchSorterConfigs });
    }
  }

  handleSearchClear() {
    this.setState({ searchValue: '' });
    this.handleClearData();
    this.setFocus(this.patientName.current);
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleSubmit(e);
    }
  }

  setFocus(ref) {
    let node = ReactDOM.findDOMNode(ref);
    if (node && node.focus instanceof Function) {
      node.focus();
    }
  }

  render() {
    // TODO "getPatientIdentifiers" should be generalizible in some way
    const {
      rowData,
      loading,
      error,
      errorMessage,
      card,
      AdditionalSearchFilters,
      getPatientIdentifiers,
      noDataMessage,
      placeholder,
      searchType,
      selectRowAutomaticallyIfOnlyOneRow,
      showEmptyListContainer,
      showRefreshButton,
      showPatientCount,
      showSearchButton,
    } = this.props;

    // TODO what is this actually doing?
    const isServerSearch = searchType === 'server';
    const filtersClassName = isServerSearch ? "server-search": '';

    const filteredRowData = this.applyFiltersToList(rowData);

    // automatically trigger a click on a row if only one result and "selectRowAutomaticallyIfOnlyOneRow" has been set true
    if (filteredRowData && filteredRowData.length === 1 && selectRowAutomaticallyIfOnlyOneRow) {
      this.onRowSelected(filteredRowData[0]);
    }

    return (
      <div className="cardlist-search-container">
        <h3><Label>{this.props.title}</Label></h3>
        {showRefreshButton &&
          <div className="refresh-button-container">
            <Glyphicon
              className="refresh-button"
              glyph="refresh"
              onClick={() => this.handleFetchData()}
            />
          </div>
        }

        {(AdditionalSearchFilters || showSearchButton) &&
          <div className={filtersClassName}>
            {AdditionalSearchFilters && <AdditionalSearchFilters
              handleSearchChange={this.handleSearchChange}
              onKeyPress={this.handleKeyPress}
              searchType={searchType ? searchType : ''}
              value={this.state.additionalSearchValue}
            />}
            {showSearchButton &&
            <button
              className=""
              onClick={this.handleSubmit}
            >search</button>
            }
          </div>
        }

        {<div className="search-by-name-container">
          <div className="name-filter-container">
            <span className="name-filter">
              <Glyphicon
                className="left-icon"
                glyph="search"
              />
              <FormControl
                autoComplete="off"
                name="patient-name"
                onChange={this.handleSearchChange}
                onKeyPress={this.handleKeyPress}
                placeholder={placeholder}
                ref={this.patientName}
                type="text"
                value={this.state.searchValue}
              />
              <Glyphicon
                className="right-icon"
                glyph="remove-sign"
                onClick={this.handleSearchClear}
              />
            </span>
          </div>
          <div>
            { !loading && !error && showPatientCount &&
            (<span className="no-of-patients">{`${filteredRowData.length} Patient${filteredRowData.length === 1? '' : 's'}`}</span>)}
          </div>
        </div>
        }
        {(loading || filteredRowData.length > 0 || showEmptyListContainer) &&
          <div className="card-list-container">
            {loading ? <Loader/> :
              (error ? <h2 className="text-center">{errorMessage}</h2> :
                (filteredRowData.length > 0 ? filteredRowData.map((patientData, index) =>
                  card(patientData, index, this.onRowSelected, getPatientIdentifiers)
                ) : <h2 className="text-center">{noDataMessage || 'No Data to display'}</h2>)
              )
            }
          </div>
        }
      </div>
    );
  }
}

// TODO fix AdditioanlFilers and card prop-types?
CardList.propTypes = {
  AdditionalSearchFilters: PropTypes.func,
  additionalSearchFilterFields: PropTypes.array,
  card: PropTypes.func.isRequired,
  clearListActionCreators: PropTypes.array,
  delayInterval: PropTypes.number.isRequired,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  fetchListActionCreator: PropTypes.func,
  filters: PropTypes.array,
  getPatientIdentifiers: PropTypes.func,
  handleSearchSubmit: PropTypes.func,
  loading: PropTypes.bool,
  noDataMessage: PropTypes.string,
  onMountOtherActionCreators: PropTypes.array,
  placeholder: PropTypes.string,
  rowData: PropTypes.array.isRequired,
  rowSelectedActionCreators: PropTypes.array,
  searchFilterFields: PropTypes.array,
  selectRowAutomaticallyIfOnlyOneRow: PropTypes.bool,
  showEmptyListContainer: PropTypes.bool,
  showPatientCount: PropTypes.bool,
  showRefreshButton: PropTypes.bool,
  showSearchButton: PropTypes.bool,
  sortFields: PropTypes.array,
  title: PropTypes.string.isRequired,

};

CardList.defaultProps = {
  delayInterval: 60000,
  errorMessage: 'Error',
  title: 'List',
  filters: [],
  placeholder: "Search by name",
  selectRowAutomaticallyIfOnlyOneRow: false,
  showEmptyListContainer: true,
  showPatientCount: true,
  showRefreshButton: true,
  showSearchButton: true,
  sortFields: []
};

export default CardList;
