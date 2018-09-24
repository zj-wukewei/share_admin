import React, {Component} from 'react'
import {Form, Input, Button, Row, Col, Icon} from 'antd'
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
        this.setState({
          loading: true
        })
        setTimeout( () => {
          this.setState({
            loading: false
        })
        }, 2000)
      }
    })
  }

  render() {
    const {getFieldDecorator} = this.props.form
    return (
      <Row className="login-row" type="flex" justify="space-around" align="middle">
        <Col span="8">
          <Form layout="horizontal" onSubmit={this.handleSubmit} className="login-form">
            <h2 className="logo"><span>Share</span></h2>
            <FormItem>
              {getFieldDecorator('user', {
                rules: [{required: true, message: '请输入用户名!'}]
              })(
                <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder='用户名'/>
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{required: true, message: '请输入密码!'}]
              })(
                <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} placeholder='密码'/>
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

export default Form.create()(Login)