import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Switch} from 'antd'

import Table from '../../components/Table'
import {changeUserState, fetchUserList} from './action'

import {handleDate, handleListData} from '../../utils/helper'
import {handleAppRole, handleAppType} from './helper'


class User extends Component {

  constructor(props) {
    super(props)
    this.columns = [{
      title: '手机',
      dataIndex: 'phone'
    }, {
      title: '角色',
      dataIndex: 'roleId',
      render: (roleId) => `${handleAppRole(roleId)}`
    }, {
      title: '登录类型',
      dataIndex: 'appType',
      render: (appType) => `${handleAppType(appType)}`
    },
      {
        title: '注册时间',
        dataIndex: 'addTime',
        render: (time) => `${handleDate(time)}`
      }, {
        title: '登录时间',
        dataIndex: 'updateTime',
        render: (time) => `${handleDate(time)}`
      }, {
        title: '状态',
        dataIndex: 'deleted',
        render: (deleted, user) => <Switch onChange={(enable) => this.handleToggle(user.id, enable)}
                                           checked={!deleted}/>
      }]
  }

  onPageChange = (options) => {
    this.props.fetchUserList(options)
  }

  handleToggle = (userId, enable) => {
    console.log('handleToggle', userId, enable)
  }

  handleOnRowClick = (user) => {
    this.props.history.push(`/app/system/user/${user.id}`)
  }

  render() {
    const {loading, total, list} = handleListData(this.props.userList)
    return (
      <Table
        rowKey={record => record.id}
        columns={this.columns}
        loading={loading}
        total={total}
        onRowClick={this.handleOnRowClick}
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


export default connect(mapStateToProps, {fetchUserList, changeUserState})(User)