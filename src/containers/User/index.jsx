import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Switch, message} from 'antd'

import Table from '../../components/Table'
import {changeUserState, fetchUserList} from './action'

import {handleDate, handleListData} from '../../utils/helper'
import {handleAppRole, handleAppType} from './helper'
import {PageNum, PageSize} from '../../constants/constant'

class User extends Component {

  state = {
    pageNum: PageNum,
    pageSize: PageSize
  }

  constructor(props) {
    super(props)
    this.columns = [{
      title: 'Id',
      dataIndex: 'id',
      render: (id) => <div onClick={() => this.handleOnRowClick(id)}>{id}</div>
    },{
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
        render: (updateTime) => `${handleDate(updateTime)}`
      }, {
        title: '状态',
        dataIndex: 'deleted',
        render: (deleted, user) => <Switch onChange={(enable) => this.handleToggle(user.id, enable)}
                                           checked={!deleted}/>
      }]
  }

  onPageChange = (pagination, filters, sorter) => {
    console.log('onPageChange', pagination)
    this.setState({
      pageNum: pagination.current,
      pageSize: pagination.pageSize
    }, this.fetchUserList)
  }

  fetchUserList = () => {
    console.log('fetchUserList', this.state)
    this.props.fetchUserList(this.state)
  }

  handleToggle = (userId, enable) => {
    console.log('handleToggle', userId, enable)
    this.props.changeUserState(userId, !enable)
  }

  handleOnRowClick = (id) => {
    this.props.history.push(`/app/system/user/${id}`)
  }

  componentDidMount = () => {
    this.fetchUserList()
  }


   componentWillReceiveProps = (nextProps) => {
    if (nextProps.updateUserStatusSuccess && !this.props.updateUserStatusSuccess) {
      this.fetchUserList()
      message.success('切换用户状态成功!')
    }
  }

  

  render() {
    const {loading, total, list} = handleListData(this.props.userList)
    return (
      <Table
        rowKey={record => record.id}
        columns={this.columns}
        loading={loading}
        onChange={this.onPageChange}
        total={total}
        current={this.state.pageNum}
        dataSource={list}/>
    )
  }


}

function mapStateToProps(state) {
  return {
    userList: state.userList,
    updateUserStatusSuccess: state.user.updateUserStatusSuccess
  }
}


export default connect(mapStateToProps, {fetchUserList, changeUserState})(User)