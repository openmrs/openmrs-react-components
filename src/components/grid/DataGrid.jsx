import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { connect } from "react-redux";
import { gridActions } from '../../features/grid';
import '../../../assets/css/omrsGrid.css';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';


class DataGrid extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rowSelection: "single"
    };
    this.onRowSelected = this.onRowSelected.bind(this);
    this.filterGrid = this.filterGrid.bind(this);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.toggleUpdateOverlay();
    this.updateRowCount();
    this.autoSizeAll();
  }

  componentDidUpdate() {
    this.toggleUpdateOverlay();
  }

  toggleUpdateOverlay() {
    if (this.gridApi) {
      if (this.props.loading) {
        this.gridApi.showLoadingOverlay();
      }
      else {
        this.gridApi.hideOverlay();
      }
    }
  }

  updateRowCount() {
    if (this.props.onRowCount && this.gridApi) {
      this.props.onRowCount(this.gridApi.getModel().getRowCount());
    }
  }

  onGridSizeChanged() {
    this.autoSizeAll();
  }

  autoSizeAll() {
    if (this.gridColumnApi) {
      var allColumnIds = [];
      this.gridColumnApi.getAllColumns().forEach(function(column) {
        allColumnIds.push(column.colId);
      });
      this.gridColumnApi.autoSizeColumns(allColumnIds);
    }
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
      self.onRowSelected(selectedRow);
    });
  }

  onDataRowChanged() {
    this.updateRowCount();
    this.autoSizeAll();
  }

  onRowSelected(row) {
    this.props.dispatch(gridActions.rowSelected(row));

    // create any custom actions
    if (this.props.rowSelectedActionCreators) {
      this.props.rowSelectedActionCreators.forEach((f) => this.props.dispatch(f(row)));
    }
  }

  onFilterChanged() {
    this.updateRowCount();
  }

  filterGrid(event) {
    this.gridApi.setQuickFilter(event.target.value);
  }

  render() {
    return (
      // the consuming app should provide a wrapping style as described here: https://www.ag-grid.com/react-more-details/
      <div
        id="omrsGrid"
        className="grid-wrapper"
      >
        <label>
          Search: {' '}
          <input type="text" onChange={this.filterGrid}/>
        </label>
        <AgGridReact
          columnDefs={this.props.columnDefs}
          animateRows={true}
          enableFiltering={ true }
          enableSorting
          id="omrsGrid"
          style="width: 100%; height: 100%;"
          onGridReady={this.onGridReady.bind(this)}
          onSelectionChanged={this.onSelectionChanged.bind(this)}
          rowClassRules="rowClassRules"
          rowData={this.props.rowData}
          onRowDataChanged={ this.onDataRowChanged.bind(this) }
          onFilterChanged = { this.onFilterChanged.bind(this) }
          onGridSizeChanged = { this.onGridSizeChanged.bind(this) }
          rowSelection={this.state.rowSelection}
        />
      </div>
    );
  }
}

export default connect()(DataGrid);
