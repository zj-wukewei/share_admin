import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Col, Form, Input, message, Row } from 'antd'
import SpinCustom from '../../components/Spin'
import { fetchUserInfo, updateUserInfo } from './action'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    xs: { span: 20 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 20 },
    sm: { span: 15 }
  }
}

class UserInfo extends Component {

  componentDidMount() {
    const { uId } = this.props.match.params
    this.props.fetchUserInfo(uId)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const userInfo = {
          ...this.props.userInfo.data,
          ...values
        }
        this.props.updateUserInfo(userInfo)
        console.log('userInfo: ', userInfo)
      }
    })
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.user.updateInfoSuccess && !this.props.user.updateInfoSuccess) {
      const { uId } = this.props.match.params
      this.props.fetchUserInfo(uId)
      message.success('更新基本信息成功!')
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { loaded, data } = this.props.userInfo
    return (
      <SpinCustom loaded={loaded}>
        <Row className="" type="flex" justify="space-around" align="middle">
          <Col span="8">
            <Form layout="horizontal" onSubmit={this.handleSubmit} className="login-form">
              <span className="avatar"><img src={data.avatar} alt="头像" /></span>
              <FormItem
                label="昵称"
                hasFeedback
                {...formItemLayout}
              >
                {getFieldDecorator('nickname', {
                  rules: [{ required: true, message: '请输入昵称!' }]
                })(
                  <Input />
                )}
              </FormItem>

              <FormItem
                label="地址"
                hasFeedback
                {...formItemLayout}
              >
                {getFieldDecorator('location', {
                  rules: [{ required: true, message: '请输入地址!' }]
                })(
                  <Input />
                )}
              </FormItem>

              <FormItem
                label="年龄"
                hasFeedback
                {...formItemLayout}
              >
                {getFieldDecorator('age', {
                  rules: [{ required: true, message: '请输入年龄!' }]
                })(
                  <Input />
                )}
              </FormItem>

              <FormItem
                label="博客地址"
                hasFeedback
                {...formItemLayout}
              >
                {getFieldDecorator('bio', {
                  rules: [{ required: true, message: '请输入博客地址!' }]
                })(
                  <Input />
                )}
              </FormItem>

              <FormItem
                label="个人网站"
                hasFeedback
                {...formItemLayout}
              >
                {getFieldDecorator('website', {
                  rules: [{ required: true, message: '请输入个人网站!' }]
                })(
                  <Input />
                )}
              </FormItem>

              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Form>
          </Col>
        </Row>
      </SpinCustom>
    )
  }
}

function mapStateToProps(state) {

  return {
    userInfo: state.userInfo,
    user: state.user
  }
}

export default connect(mapStateToProps, { fetchUserInfo, updateUserInfo })(Form.create({
  mapPropsToFields(props) {
    const info = props.userInfo.data
    return {
      nickname: Form.createFormField({
        value: info.nickname
      }),
      location: Form.createFormField({
        value: info.location
      }),
      age: Form.createFormField({
        value: info.age
      }),
      bio: Form.createFormField({
        value: info.bio
      }),
      website: Form.createFormField({
        value: info.website
      })
    }
  }
})(UserInfo))