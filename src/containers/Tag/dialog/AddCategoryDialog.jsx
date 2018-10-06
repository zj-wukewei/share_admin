import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Form, Icon, Input, Modal} from 'antd'

const FormItem = Form.Item

class AddCategoryDialog extends Component {


  handleOnOk = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        this.props.addCategory(values)
      }
    })
  }


  render() {
    const {getFieldDecorator} = this.props.form
    return (
      <Modal
        visible={this.props.visible}
        onOk={this.handleOnOk}
        onCancel={this.props.onCancel}
        confirmLoading={this.props.confirmLoading}
        title='添加类别'>

        <Form
          onSubmit={this.handleSubmit}>
          <FormItem label='类别'>

            {getFieldDecorator('name', {
              rules: [{required: true, message: '请输入类别!'}]
            })(
              <Input prefix={<Icon type="tag" style={{fontSize: 13}}/>} placeholder='请输入类别'/>
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

AddCategoryDialog.propTypes = {
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
  addCategory: PropTypes.func,
  confirmLoading: PropTypes.bool
}

export default Form.create()(AddCategoryDialog)