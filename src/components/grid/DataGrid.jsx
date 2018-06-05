import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';


class DataGrid extends React.Component {

    render() {
        return (
            <div
                className="ag-theme-balham"
                style={{
                    height: '600px',
                    width: '100%' }}
            >
                <AgGridReact
                    onGridReady={ params => this.gridApi = params.api }
                    enableSorting={true}
                    rowSelection="multiple"
                    columnDefs={this.props.columnDefs}
                    rowData={this.props.rowData}>
                </AgGridReact>
            </div>
        );
    }
}

export default DataGrid;