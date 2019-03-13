import React from 'react';
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
  }

  componentDidMount() {
    this.handleFetchData();
    if (this.props.onMountOtherActionCreators !== undefined) {
      this.props.onMountOtherActionCreators.forEach((action) =>action());
    }
  }
  
  componentWillUnmount() {
    clearInterval(this.interval);
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
  }

  handleKeyPress(e) {
    const isServerSearch = this.props.searchType === 'server';
    if (isServerSearch && e.key === 'Enter') {
      this.handleSubmit(e);
    }
  }

  render() {
    // TODO "getPatientIdentifiers" should be generalizible in some way
    const {
      rowData,
      loading,
      card,
      AdditionalSearchFilters,
      getPatientIdentifiers,
      noDataMessage,
      searchType,
    } = this.props;
    const isServerSearch = searchType === 'server';
    const filtersClassName = isServerSearch ? "server-search": '';

    const filteredRowData = this.applyFiltersToList(rowData);
    return (
      <div className="cardlist-search-container">
        <div className="refresh-button-container">
          <h3><Label>{this.props.title}</Label></h3>
          <Glyphicon
            className="refresh-button"
            glyph="refresh"
            onClick={() => this.handleFetchData()}
          />
        </div>
        <div className={filtersClassName}>
          {AdditionalSearchFilters && <AdditionalSearchFilters
            handleSearchChange={this.handleSearchChange}
            onKeyPress={this.handleKeyPress}
            value={this.state.additionalSearchValue}
            searchType={searchType ? searchType : ''}
          />}
          {isServerSearch &&
          <button
            className=""
            onClick={this.handleSubmit}
          >search</button>
          }
        </div>

        {<div className="">
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
                placeholder="search by name"
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
        </div>}
        <div className="card-list-container">
          { loading ? <Loader /> : 
            (filteredRowData.length > 0 ? filteredRowData.map((patientData, index) => 
              card(patientData, index, this.onRowSelected, getPatientIdentifiers)
            ) : <h2 className="text-center">{noDataMessage || 'No Data to display'}</h2>)
          }
        </div>
      </div>
    );
  }
}

// TODO fix AdditioanlFilers and card prop-types?
CardList.propTypes = {
  AdditionalSearchFilters: PropTypes.func,
  additionalSearchFilterFields: PropTypes.array,
  card: PropTypes.func.isRequired,
  delayInterval: PropTypes.number.isRequired,
  fetchListActionCreator: PropTypes.func,
  filters: PropTypes.array,
  getPatientIdentifiers: PropTypes.func,
  handleSearchSubmit: PropTypes.func,
  loading: PropTypes.bool,
  noDataMessage: PropTypes.string,
  onMountOtherActionCreators: PropTypes.array,
  rowData: PropTypes.array.isRequired,
  rowSelectedActionCreators: PropTypes.array,
  searchFilterFields: PropTypes.array,
  sortFields: PropTypes.array,
  title: PropTypes.string.isRequired,
  
};

CardList.defaultProps = {
  delayInterval: 60000,
  title: 'List',
  filters: [],
  sortFields: []
};

export default CardList;
