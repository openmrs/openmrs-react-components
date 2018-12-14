import React from 'react';
import PropTypes from 'prop-types';
import { Label, ButtonToolbar, ToggleButtonGroup, ToggleButton, Glyphicon } from 'react-bootstrap';
import { applyFilters} from "../../util/filterUtil";
import Loader from '../widgets/Loader';
import '../../../assets/css/cardList.css';

class CardList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      filters: [],
    };

    this.onRowSelected = this.onRowSelected.bind(this);
    this.handleFetchData = this.handleFetchData.bind(this);
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

    if (this.props.onMountOtherActionCreators !== undefined) {
      this.props.onMountOtherActionCreators.forEach((action) =>action());
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
        return applyFilters(list, optional, this.props.optionalFiltersType);
      }
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

  render() {
    const { rowData, loading, card, getPatientIdentifiers } = this.props;

    const filterButtons = this.state.filters.map((filter, index) => {
      return (
        <ToggleButton value={ filter.key } key={index}>
          {filter.label}
        </ToggleButton>
      );
    });

    const filterButtonToolbar = (
      <div>
        <ButtonToolbar>
          <ToggleButtonGroup type="checkbox" onChange={ (e) => this.handleFilterToggle(e)}>
            { filterButtons }
          </ToggleButtonGroup>
        </ButtonToolbar>
      </div>
    );

    if (loading) {
      return (
        <Loader />);
    }

    return (
      <div>
        <div className="refresh-button-container">
          <Glyphicon className="refresh-button" glyph="refresh" onClick={() => this.handleFetchData()}/>
        </div>
        <h3><Label>{this.props.title}</Label></h3>
        <h3><Label>{''}</Label></h3>
        {/* Temporarily commenting this out till I understand what should happen to this filter */}
        {/* {this.props.filters &&
          <div className="filters">
            <span>Filter:</span>
            <span>{ this.props.optionalFilters ? filterButtonToolbar : undefined }</span>
          </div>
        } */}
        {this.props.cardListFilters && this.props.cardListFilters()}
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
  cardListFilters: PropTypes.func,
  filters: PropTypes.array,
  loading: PropTypes.bool,
  onMountOtherActionCreators: PropTypes.array,
  optionalFilters: PropTypes.array,
  optionalFiltersType: PropTypes.string,
  rowData: PropTypes.array.isRequired,
  rowSelectedActionCreators: PropTypes.array,
  title: PropTypes.string.isRequired,
  
};

CardList.defaultProps = {
  delayInterval: 60000,
  title: 'List',
  filters: [],
  optionalFiltersType: 'and',
};

export default CardList;
