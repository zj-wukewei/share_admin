import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Table} from 'antd'

class TableCustom extends Component {
  state = {
    pagination: {
      current: 1
    }
  }

  componentDidMount() {
    this.props.onPageChange({
      pageNum: this.state.pagination.current,
      pageSize: 10
    })
  }

  handleOnChange = (pagination, filters, sorter) => {
    this.props.onPageChange({
      pageNum: pagination.current,
      pageSize: pagination.pageSize
    })
  }

  render() {
    return (
      <Table
        rowKey={this.props.rowKey}
        pagination={this.state.pagination}
        dataSource={this.props.dataSource}
        columns={this.props.columns}
        onChange={this.handleOnChange}
        loading={this.props.loading}/>
    )
  }
}

TableCustom.propTypes = {
  total: PropTypes.number,
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  columns: PropTypes.array,
  onPageChange: PropTypes.func,
  rowKey: PropTypes.func
}

export default TableCustom