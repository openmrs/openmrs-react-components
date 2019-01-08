import React from 'react';
import PropTypes from 'prop-types';
import matchSorter from 'match-sorter';
import * as R from "ramda";
import { Label, Glyphicon, FormControl } from 'react-bootstrap';
import { applyFilters } from "../../util/filterUtil";
import Loader from '../widgets/Loader';
import '../../../assets/css/cardList.css';

class CardList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: '',
      additionalSearchValue: ''
    };

    this.onRowSelected = this.onRowSelected.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchClear = this.handleSearchClear.bind(this);
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
    let filters = this.props.filters ? [...this.props.filters] : [];
    list = applyFilters(list, filters, 'and');

    if (searchFilterFields || additionalSearchFilterFields) {
      list = matchSorter(list, this.state.searchValue, { keys: searchFilterFields });
      list = matchSorter(list, this.state.additionalSearchValue, { keys: additionalSearchFilterFields });
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

  handleSearchChange(e) {
    if (e.hasOwnProperty('target')) {
      this.setState({ searchValue: e.target.value });
    } else if (e){
      this.setState({ additionalSearchValue: e });
    }
  }
  
  handleSearchClear() {
    this.setState({ searchValue: '' });
  }

  render() {
    // TODO "getPatientIdentifiers" should be generalizible in some way
    const { rowData, loading, card, AdditionalSearchFilters, getPatientIdentifiers } = this.props;

    const data = this.applyFiltersToList(rowData);

    return (
      <div>
        <div className="refresh-button-container">
          <h3><Label>{this.props.title}</Label></h3>
          <Glyphicon className="refresh-button" glyph="refresh" onClick={() => this.handleFetchData()} />
        </div>
        {AdditionalSearchFilters && <AdditionalSearchFilters
          handleSearchChange={this.handleSearchChange} />}
        {this.props.searchFilterFields && <div className="">
          <div className="name-filter-container">
            <span className="name-filter">
              <Glyphicon
                className="left-icon"
                glyph="search"
              />
              <FormControl
                onChange={this.handleSearchChange}
                placeholder="search by name"
                type="text"
                value={this.state.searchValue}
              />           
              <Glyphicon 
                className="right-icon"
                glyph="remove-sign" 
                onClick={this.handleSearchClear}
              />
              <button className="search-button">search</button>
            </span>
          </div>
        </div>}
        {loading ? <Loader /> : 
          (rowData.length > 0 ? this.applyFiltersToList(rowData).map((patientData, index) => 
            card(patientData, index, this.onRowSelected, getPatientIdentifiers)
          ) : <h2 className="text-center">No Data to display</h2>)
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
  delayInterval: PropTypes.number.isRequired,
  fetchListActionCreator: PropTypes.func,
  filters: PropTypes.array,
  getPatientIdentifiers: PropTypes.func,
  loading: PropTypes.bool,
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
  searchFilterFields: [],
  sortFields: []
};

export default CardList;
