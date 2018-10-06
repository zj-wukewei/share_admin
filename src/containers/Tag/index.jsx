import React, {Component} from 'react'

import {connect} from 'react-redux'
import Table from '../../components/Table'
import {Button} from 'antd'

import AddCategoryDialog from './dialog/AddCategoryDialog'

import {addCategory, fetchCategoryList} from './action'
import {handleListData} from '../../utils/helper'
import {abstractQry} from '../../constants/constant'

class Tag extends Component {

  state = {
    showDialog: false
  }

  onPageChange = (options) => {
    this.props.fetchCategoryList(options)
  }

  handleOnAdd = () => {
    this.setState({
      showDialog: true
    })
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.category.addCategorySuccess && !this.props.category.addCategorySuccess) {
      this.setState({showDialog: false})
      this.props.fetchCategoryList(abstractQry)
    }
  }


  render() {
    const {loading, total, list} = handleListData(this.props.categoryList)
    return (
      <div>
        {
          this.state.showDialog &&
          <AddCategoryDialog
            confirmLoading={this.props.category.loading}
            addCategory={this.props.addCategory}
            onCancel={() => this.setState({showDialog: false})}
            visible={this.state.showDialog}/>
        }
        <Button style={{marginBottom: 20}} onClick={this.handleOnAdd}>添加</Button>

        <Table
          rowKey={record => record.id}
          columns={columns}
          loading={loading}
          total={total}
          onPageChange={this.onPageChange}
          dataSource={list}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    categoryList: state.categoryList,
    category: state.category
  }
}

const columns = [{
  title: 'id',
  dataIndex: 'id'
}, {
  title: '种类名字',
  dataIndex: 'name'
}]


export default connect(mapStateToProps, {fetchCategoryList, addCategory})(Tag)