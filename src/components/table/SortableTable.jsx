import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import ReactTable from "react-table";
import "react-table/react-table.css";


class SortableTable extends PureComponent {
  getTableData() {
    const { data } = this.props;
    return data;
  }


  selectedRowsClassName(rowInfo) {
    const { selectedRows } = this.props;
    let className = "";

    if (selectedRows && selectedRows.length) {
      if (rowInfo !== undefined && selectedRows.includes(rowInfo.row._id)) {
        className = "selected-row";
      }
    }

    return className;
  }

  renderColumnFilter() {
    const { filterType } = this.props;

    if (filterType === "both" || filterType === "column") {
      return true;
    }

    return false;
  }

  renderData() {
    const { filters, data, getDataWithFilters } = this.props;

    if (typeof getDataWithFilters !== 'undefined') {
      return getDataWithFilters(filters, data);
    }
    return data;
  }

  renderColumns() {
    const { columnMetadata } = this.props;

    const displayColumns = columnMetadata.map(element => Object.assign({}, element, {
      minWidth: undefined,
    }));
    return displayColumns;
  }

  renderPaginationBottom() {
    if (this.getTableData().length === 0) {
      return false;
    }

    return true;
  }

  render() {
    const { ...otherProps } = this.props;
    const defaultClassName = otherProps.defaultClassName || "-striped -highlight";

    // console.log('state', this.state);

    // All available props: https://github.com/tannerlinsley/react-table#props
    return (
      <div>
        <ReactTable
          className={otherProps.tableClassName || defaultClassName}
          collapseOnDataChange={false}
          columns={this.renderColumns()}
          data={this.renderData()}
          defaultPageSize={otherProps.defaultPageSize}
          filterable={this.renderColumnFilter()}
          getPaginationProps={otherProps.getPaginationProps}
          getTableProps={otherProps.getTableProps}
          getTheadProps={otherProps.getTheadProps}
          getTrGroupProps={otherProps.getTrGroupProps}
          getTrProps={(state, rowInfo, column, instance) => {
            if (otherProps.getTrProps && rowInfo) {
              otherProps.getTrProps(rowInfo);
            }
            return {
              onClick: (e) => {
                const { rowOnClick } = otherProps;
                if (typeof rowOnClick !== 'undefined') {
                  rowOnClick(rowInfo.original);
                }
              },
              className: this.selectedRowsClassName(rowInfo)
            };
          }}
          loadingText={otherProps.loadingText}
          minRows={otherProps.minRows}
          nextText={otherProps.nextText}
          noDataText={<span className="sortableTable-noDataText">{this.props.noDataMessage}</span>}
          ofText={otherProps.ofText}
          pageSizeOptions={[10, 20, 25, 50, 100]}
          pageText={otherProps.pageText}
          previousText={otherProps.previousText}
          rowsText={otherProps.rowsText}
          showPagination={otherProps.showPagination}
          showPaginationBottom={this.renderPaginationBottom()}
          showPaginationTop={otherProps.showPaginationTop}
          sortable={otherProps.isSortable}
          onPageSizeChange={otherProps.onPageSizeChange}
          onPageChange={otherProps.onPageChange}
          SubComponent={otherProps.subComponent}
        />
      </div>
    );
  }
}

SortableTable.propTypes = {
  columnMetadata: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  defaultPageSize: PropTypes.number,
  filterType: PropTypes.string,
  filteredFields: PropTypes.array.isRequired,
  filters: PropTypes.object.isRequired,
  getDataWithFilters: PropTypes.func.isRequired,
  isFilterable: PropTypes.bool,
  isResizeable: PropTypes.bool,
  isSortable: PropTypes.bool,
  loadingText: PropTypes.string,
  minRows: PropTypes.number,
  nextText: PropTypes.string,
  noDataMessage: PropTypes.string,
  noDataText: PropTypes.string,
  ofText: PropTypes.string,
  pageText: PropTypes.string,
  previousText: PropTypes.string,
  rowsText: PropTypes.string,
  selectedRows: PropTypes.array,
};

SortableTable.defaultProps = {
  defaultPageSize: 10,
  filterType: "table",
  isFilterable: false,
  isResizeable: true,
  isSortable: true,
  minRows: 0,
  noDataMessage: "No results found",
  previousText: "Previous",
  nextText: "Next",
  loadingText: "Loading...",
  noDataText: "No results found",
  pageText: "Page",
  ofText: "of",
  rowsText: "rows",
  selectedRows: [],
};

export default SortableTable;
