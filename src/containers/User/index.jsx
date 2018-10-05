import React, {Component} from 'react'
import {connect} from 'react-redux'
import Table from '../../components/Table'
import {fetchUserList} from './action'

import {handleDate, handleListData} from '../../utils/helper'
import {handleAppRole, handleAppType} from './helper'


class User extends Component {

  onPageChange = (options) => {
    this.props.fetchUserList(options)
  }

  render() {
    const {loading, total, list} = handleListData(this.props.userList)
    return (
      <Table
        rowKey={record => record.id}
        columns={columns}
        loading={loading}
        total={total}
        onPageChange={this.onPageChange}
        dataSource={list}/>
    )
  }
}

function mapStateToProps(state) {
  return {
    userList: state.userList
  }
}


const columns = [{
  title: '手机',
  dataIndex: 'phone'
}, {
  title: '角色',
  dataIndex: 'roleId',
  render: (roleId) => <div>{handleAppRole(roleId)}</div>
}, {
  title: '登录类型',
  dataIndex: 'appType',
  render: (appType) => <div>{handleAppType(appType)}</div>
},
  {
    title: '注册时间',
    dataIndex: 'addTime',
    render: (time) => <div>{handleDate(time)}</div>
  }, {
    title: '登录时间',
    dataIndex: 'updateTime',
    render: (time) => <div>{handleDate(time)}</div>
  }]

export default connect(mapStateToProps, {fetchUserList})(User)