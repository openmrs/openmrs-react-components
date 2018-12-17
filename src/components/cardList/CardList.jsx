import React from 'react';
import PropTypes from 'prop-types';
import matchSorter from 'match-sorter';
import { Label, ButtonToolbar, ToggleButtonGroup, ToggleButton, Glyphicon, FormControl } from 'react-bootstrap';
import { applyFilters } from "../../util/filterUtil";
import Loader from '../widgets/Loader';
import '../../../assets/css/cardList.css';

class CardList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      filters: [],
      searchValue: ''
    };

    this.onRowSelected = this.onRowSelected.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchClear = this.handleSearchClear.bind(this);
    
    if (props.optionalFilters) {
      this.state.filters = props.optionalFilters
        .map((v) => {
          v.enabled = false;
          v.key = v.label.toLowerCase().replace(/\s/g,'');
          return v;
        });
    }
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

  applyFiltersToList(list) {
    let filters = this.props.filters ? [...this.props.filters] : [];
    // screening queue filters should always be AND (at least for now)
    list = applyFilters(list, filters, 'and');

    // add any optional filters
    if (this.state.filters) {
      let optional =
        [ ...(this.state.filters
          .filter((v) => v.enabled)
          .map((v) => v.filter))
        ];
      if (optional) {
        list = applyFilters(list, optional, this.props.optionalFiltersType);
      }
    }

    if (this.props.searchFilterFields) {
      list = matchSorter(list, this.state.searchValue, {keys: this.props.searchFilterFields})
    }

    return list;
  }

  handleFilterToggle(e) {
    this.setState((state) => {
      state.filters = state.filters
        .map((filter) => {
          if ( e.includes(filter.key) ) {
            filter.enabled = true;
          } else {
            filter.enabled = false;
          }
          return filter;
        });

      return state;
    });
  }

  onRowSelected(row) {
    if (this.props.rowSelectedActionCreators) {
      this.props.rowSelectedActionCreators.forEach((f) => this.props.dispatch(f(row)));
    }
  }

  handleSearchChange(e, filter) {
    if (filter === 'identifierFilter') {
      this.setState({ searchValue: e });
    } else {
      this.setState({ searchValue: e.target.value });
    }
  }

  handleSearchClear() {
    this.setState({ searchValue: '' });
  }

  render() {
    const { rowData, loading, card, getPatientIdentifiers, ScreeningFilters } = this.props;

    const filterButtons = this.state.filters.map((filter, index) => {
      return (
        <ToggleButton key={index}
value={ filter.key }>
          {filter.label}
        </ToggleButton>
      );
    });

    const filterButtonToolbar = (
      <div>
        <ButtonToolbar>
          <ToggleButtonGroup onChange={ (e) => this.handleFilterToggle(e)}
type="checkbox">
            { filterButtons }
          </ToggleButtonGroup>
        </ButtonToolbar>
      </div>
    );

    if (loading) {
      return (
        <Loader />);
    }
    const data = this.applyFiltersToList(rowData);
    return (
      <div>
        <div className="refresh-button-container">
          <h3><Label>{this.props.title}</Label></h3>
          <Glyphicon className="refresh-button" glyph="refresh" onClick={() => this.handleFetchData()}/>
        </div>
        {this.props.optionalFilters &&
          <div className="filters">
            <span>Filter:</span>
            <span>{ this.props.optionalFilters ? filterButtonToolbar : undefined }</span>
          </div>
        }
        {ScreeningFilters && <ScreeningFilters 
          handleSearchChange={this.handleSearchChange}
          rowData={data} />}
        {this.props.searchFilterFields && <div className="">
          <div className="name-filter-container">
            <div>Name/id search:</div>
            <span className="name-filter">
              <Glyphicon
                className="left-icon"
                glyph="search"
              />
              <FormControl
                autoFocus
                onChange={this.handleSearchChange}
                placeholder="search by text"
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
        {rowData.length > 0 ? this.applyFiltersToList(rowData).map((patientData, index) => 
          card(patientData, index, this.onRowSelected, getPatientIdentifiers)
        ) : <h2 className="text-center">No Data to display</h2>
        }
      </div>
    );
  }
}

CardList.propTypes = {
  delayInterval: PropTypes.number.isRequired,
  fetchListActionCreator: PropTypes.func,
  filters: PropTypes.array,
  loading: PropTypes.bool,
  onMountOtherActionCreators: PropTypes.array,
  optionalFilters: PropTypes.array,
  optionalFiltersType: PropTypes.string,
  rowData: PropTypes.array.isRequired,
  rowSelectedActionCreators: PropTypes.array,
  searchFilterFields: PropTypes.array,
  title: PropTypes.string.isRequired,
  
};

CardList.defaultProps = {
  delayInterval: 60000,
  title: 'List',
  filters: [],
  optionalFiltersType: 'and',
};

export default CardList;
