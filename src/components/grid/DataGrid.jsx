import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';


class DataGrid extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rowSelection: "single"
    };
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onSelectionChanged() {
    let selectedRows = this.gridApi.getSelectedRows();
    let selectedRowsString = "";
    let self = this;
    selectedRows.forEach(function (selectedRow, index) {
      if (index !== 0) {
        selectedRowsString += ", ";
      }
      selectedRowsString += selectedRow.id + ", " + selectedRow.uuid;
      self.props.onRowSelected(selectedRow);
    });
  }

  render() {
    return (
      <div
        className="ag-theme-balham"
        style={{
          height: '600px',
          width: '100%'
        }}
      >
        <AgGridReact
          columnDefs={this.props.columnDefs}
          enableSorting
          id="omrsGrid"
          onGridReady={this.onGridReady.bind(this)}
          onSelectionChanged={this.onSelectionChanged.bind(this)}
          rowClassRules="rowClassRules"
          rowData={this.props.rowData}
          rowSelection={this.state.rowSelection}
        />
      </div>
    );
  }
}

export default DataGrid;
