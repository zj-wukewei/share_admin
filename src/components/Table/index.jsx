import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Table} from 'antd'
import {PageNum, PageSize} from '../../constants/constant'

class TableCustom extends Component {
  state = {
    pagination: {
      current: PageNum
    }
  }

  componentDidMount() {
    this.props.onPageChange({
      pageNum: this.state.pagination.current,
      pageSize: PageSize
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
        bordered
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