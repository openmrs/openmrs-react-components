import React from 'react';
import PropTypes from 'prop-types';
import { Label, ButtonToolbar, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import moment from 'moment';
import { applyFilters} from "../../util/filterUtil";
import Loader from '../widgets/Loader';
import '../../../assets/css/cardList.css';

class CardList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      filters: []
    };

    this.onRowSelected = this.onRowSelected.bind(this);
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

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  applyFiltersToList(list) {
    let filters = this.props.filters ? [...this.props.filters] : [];

    // add any optional filters
    if (this.state.filters) {
      filters =
        [...filters,
          ...(this.state.filters
            .filter((v) => v.enabled)
            .map((v) => v.filter))
        ];
    }

    return applyFilters(list, filters, this.props.optionalFiltersType);
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
    const { rowData, loading } = this.props;

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
          <ToggleButtonGroup type="checkbox" >
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
        <h3><Label>{this.props.title}</Label></h3>
        <h3><Label>{''}</Label></h3>
        {this.props.filters &&
          <div className="filters">
            <span>Filter:</span>
            <span>{ this.props.optionalFilters ? filterButtonToolbar : undefined }</span>
          </div>
        }
        {rowData.length > 0 ? this.applyFiltersToList(rowData).map((patient, index) => (
          <div 
            className="card-list"
            key={index} 
            onClick={() => this.onRowSelected(patient)}>
            <div className="left-items">
              <span className="name">
                <span className="given-name">{patient.name && patient.name.givenName && patient.name.givenName}</span>
                <span className="family-name">{patient.name && patient.name.familyName && patient.name.familyName}</span>
              </span>
              <span className="gender-age">
                <span className="gender">{patient.gender && patient.gender === 'M' ? "Male" : "Female"}</span>
                <span className="age">{patient.age && patient.age} yrs old</span>
                <span className="dob">({patient.birthdate && moment(patient.birthdate).format('DD, MMM, YYYY')})</span>
              </span>
            </div>
            <div className="right-items">
              {this.props.getIdentifiers(patient) && this.props.getIdentifiers(patient).split('<br/>').map((identifier, index) => (
                <span key={index}>{identifier}</span>
              ))}
            </div>
          </div>
        )) : <h2 className="text-center">No Data to display</h2>
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
  title: PropTypes.string.isRequired,
  
};

CardList.defaultProps = {
  delayInterval: 60000,
  title: 'List',
  filters: [],
  optionalFiltersType: 'and',
};

export default CardList;
