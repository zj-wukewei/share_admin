import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Table} from 'antd'
import {PageSize} from '../../constants/constant'

class TableCustom extends Component {

  state = {
    pageSize: PageSize
  }

 handleOnChange = (pagination, filters, sorter) => {
    const pageSize = pagination.pageSize;
    this.setState({
      pageSize
    }, () => this.props.onChange(pagination, filters, sorter));
  }



  render() {
    const { total, current, ...restProps } = this.props;
    const { pageSize } = this.state;

    return (
      <Table
        bordered
        rowKey={this.props.rowKey}
        {...restProps}
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
          size: 'large',
          total,
          pageSize,
          current
        }}
        dataSource={this.props.dataSource}
        columns={this.props.columns}
        onChange={this.handleOnChange}
        onRow={(record) => {
          return {
            onClick: () => this.props.onRowClick && this.props.onRowClick(record)
          }
        }}
        loading={this.props.loading}/>
    )
  }
}

TableCustom.propTypes = {
  total: PropTypes.number,
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  columns: PropTypes.array,
  onChange: PropTypes.func,
  rowKey: PropTypes.func,
  onRowClick: PropTypes.func,
  current: PropTypes.number
}

export default TableCustom