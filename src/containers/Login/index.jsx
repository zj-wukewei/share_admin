import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as md5 from 'md5'
import {doLogin} from './action'
import {Button, Col, Form, Icon, Input, Row} from 'antd'
import './index.scss'

const FormItem = Form.Item

class Login extends Component {

  state = {
    loading: false
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        this.doLogin(values)
      }
    })
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.login.loginSuccess && !this.props.login.loginSuccess) { 
      console.log(this.props.login)
      this.props.history.push('/app');
    }
  }

  doLogin = (data) => {
    data.password = md5(data.password);
    this.props.doLogin(data)
  }

  render() {
    const {getFieldDecorator} = this.props.form
    return (
      <Row className="login-row" type="flex" justify="space-around" align="middle">
        <Col span="8">
          <Form layout="horizontal" onSubmit={this.handleSubmit} className="login-form">
            <h2 className="logo"><span>Share</span></h2>
            <FormItem>
              {getFieldDecorator('mobile', {
                rules: [{required: true, message: '请输入用户名!'}]
              })(
                <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder='用户名'/>
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{required: true, message: '请输入密码!'}]
              })(
                <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password"  placeholder='密码'/>
              )}
            </FormItem>
            <Button type="primary" loading={this.state.loading} htmlType="submit" className="login-form-button" style={{width: '100%'}}>
              登录
            </Button>

          </Form>
        </Col>
      </Row>
    )
  }
}

function mapStateToProps(state) {
  return {
     login: state.login
  }
}

export default connect(mapStateToProps, { doLogin })(Form.create()(Login))