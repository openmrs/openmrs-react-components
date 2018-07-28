import React from 'react';
import PropTypes from 'prop-types';
import { Label } from 'react-bootstrap';
import DataGrid from '../grid/DataGrid';

class List extends React.Component {

  componentDidMount() {

    if (this.props.fetchListActionCreator !== undefined) {
      this.props.fetchListActionCreator();
      this.interval = setInterval(() =>
        this.props.fetchListActionCreator(), this.props.delayInterval);
    }

    if (this.props.onMountOtherActionCreators !== undefined) {
      this.props.onMountOtherActionCreators.forEach((action) =>action());
    }

  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  
  render() {
    return (
      <div>
        <h3><Label>{this.props.title}</Label></h3>
        <DataGrid
          columnDefs={this.props.columnDefs}
          rowData={this.props.rowData}
          rowSelectedActionCreators={this.props.rowSelectedActionCreators}
        />
      </div>
    );
  }
}

List.propTypes = {
  columnDefs: PropTypes.array.isRequired,
  delayInterval: PropTypes.number.isRequired,
  fetchListActionCreator: PropTypes.func.isRequired,
  onMountOtherActionCreators: PropTypes.array,
  rowData: PropTypes.array.isRequired,
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
  title: 'List'
};

export default List;
