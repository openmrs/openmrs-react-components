import React from 'react';
import { push } from 'connected-react-router';
import { Label } from 'react-bootstrap';
import DataGrid from '../grid/DataGrid';

class List extends React.Component {

  componentDidMount() {

    if (this.fetchListAction() !== undefined) {
      this.props.dispatch(this.fetchListAction());
      this.interval = setInterval(() =>
        this.props.dispatch(this.fetchListAction()), this.delayInterval());
    }

    if (this.fetchOtherActions() !== undefined) {
      this.fetchOtherActions().forEach((action) => this.props.dispatch(action));
    }

  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  columnDefs() {
    return [
      { headerName: 'uuid', hide: true, field: 'uuid' },
      { headerName: 'Given Name', field: 'name.givenName' },
      { headerName: 'Family Name', field: 'name.familyName' },
      { headerName: 'Gender', field: 'gender' },
      { headerName: 'Age', field: 'age' }
    ];
  }

  delayInterval() {
    return 10000;
  }

  fetchListAction() {
    return undefined;  // needs to be overwritten in implementing classes
  }

  fetchOtherActions() {
    return undefined;
  }

  redirectToInfoPageActionCreator() {
    return push('/'); // needs to be overwritten in implementing classed
  }

  title() {
    return "List";
  }

  render() {
    return (
      <div>
        <h3><Label>{this.title()}</Label></h3>
        <DataGrid
          columnDefs={this.columnDefs()}
          rowData={this.props.rowData}
          rowSelectedActionCreators={[this.redirectToInfoPageActionCreator]}
        />
      </div>
    );
  }

}

export default List;
