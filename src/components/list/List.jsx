import React from 'react';
import PropTypes from 'prop-types';
import { Label } from 'react-bootstrap';
import DataGrid from '../grid/DataGrid';

/*
  This component was designed to be used to render and dynamically update a list based on data received from a server

  It can be used with the createListReducer.js, but can also be used separately:

    https://github.com/openmrs/openmrs-react-components/blob/master/src/features/list/createListReducer.js

  The UI display element is ag-Grid: https://www.ag-grid.com/best-react-data-grid/

  Props:
    * columnDefs: columns to display (default/sample provided, based on patientUtil.js domain object), passed on directly to DataGrid
    * delayInterval: the delay interval before re-triggering the fetchListActionCreator (to force a refresh of the list) (default is 10000ms)
      if null or 0, no refresh is scheduled
    * fetchListActionCreator: action creator to call on mount, and every subsequent {delayInterval} ms
      this action is generally an action that fetches the data to display and eventually results in a update to rowData
    * filters: list of one or more filters to apply to rowData before passing on to DataGrid
    * onMountOtherActionCreators: any other action creators to trigger after the component mounts
    * rowData (required): data to display (generally an array of objects), passed on directly to DataGrid,
    * rowSelectedActionCreators: array of action creators for actions to trigger when row is selected, passed on directly to DataGrid
    * title: title for the grid (default is "List")

  Examples:
    In the workflow module we have a "ScreeningQueue" that specifies the list action creator (which requests a list of active
    visit) as well as a default set of columns:

      https://github.com/PIH/openmrs-pwa-workflow/blob/master/src/screening/ScreeningQueue.jsx

    Yet this itself is in abstract component, and we build individual queues from it that specify a link to go to when
    a row is selected, and also maps the appropriate part of the state into rowData, with the appropriate filters:

      https://github.com/PIH/openmrs-pwa-workflow/blob/master/src/screening/bloodPressure/BloodPressureQueue.jsx
      https://github.com/PIH/openmrs-pwa-workflow/blob/master/src/screening/nutrition/NutritionQueue.jsx
      https://github.com/PIH/openmrs-pwa-workflow/blob/master/src/screening/nurse/NurseQueue.jsx
 */
class List extends React.Component {

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

  applyFilters(list, filters) {
    if (filters.length === 0) {
      return list;
    } else {
      return this.applyFilters(list.filter(filters[filters.length - 1]), filters.slice(0, -1));
    }
  };

  render() {
    return (
      <div>
        <h3><Label>{this.props.title}</Label></h3>
        <h3><Label>{''}</Label></h3>
        <DataGrid
          columnDefs={this.props.columnDefs}
          rowData={this.applyFilters(this.props.rowData, this.props.filters)}
          onRowCount={this.props.onRowCount}
          rowSelectedActionCreators={this.props.rowSelectedActionCreators}
        />
      </div>
    );
  }
}

List.propTypes = {
  columnDefs: PropTypes.array.isRequired,
  filters: PropTypes.array,
  delayInterval: PropTypes.number.isRequired,
  fetchListActionCreator: PropTypes.func,
  onMountOtherActionCreators: PropTypes.array,
  rowData: PropTypes.array.isRequired,
  onRowCount: PropTypes.func,
  rowSelectedActionCreators: PropTypes.array,
  title: PropTypes.string.isRequired
};

List.defaultProps = {
  columnDefs:  [
    { headerName: 'uuid', hide: true, field: 'uuid' },
    { headerName: 'Given Name', field: 'name.givenName' },
    { headerName: 'Family Name', field: 'name.familyName' },
    { headerName: 'Gender', field: 'gender' },
    { headerName: 'Age', field: 'age' }
  ],
  delayInterval: 10000,
  title: 'List',
  filters: []
};

export default List;
