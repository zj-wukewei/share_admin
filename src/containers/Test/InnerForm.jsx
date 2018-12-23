import React, { Component } from 'react'
import { Form, Input, Button, Select } from 'antd'


const FormItem = Form.Item
const { Option, OptGroup } = Select

let userId = 0

const test = [
    {
        id: '1',
        vaule: '2',
        childer: [
            {
                id: '3'
            }
        ]
    },
    {
        id: '2',
        vaule: '2',

    }
]

const findId = '3'

class InnerForm extends Component {


    handleSubmit = (e, add) => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (add) {
                    userId++
                }
                this.props.onSave(add, {
                    id: add ? userId : this.props.selectItem.id,
                    ...values
                })
            }
        })
    }

    render() {
        const find = test.find(item => {
            console.log('1111')
            return item.id == findId || (item.childer && item.childer.find(c => {
                console.log('22222')
                return c.id == findId
            }))
        })
        console.log('aaa', find)
        const { getFieldDecorator } = this.props.form
        const add = this.props.selectItem.id == undefined
        return (
            <div>
                <Form onSubmit={(e) => this.handleSubmit(e, add)}>
                    <FormItem
                        label="姓名"
                    >
                        {getFieldDecorator('user', {
                            rules: [{ required: true, message: '姓名!' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        label="性别"
                    >
                        {getFieldDecorator('sex', {
                            rules: [
                                { required: true, message: '性别!' },
                            ],

                        })(
                            <Select placeholder="性别"
                                allowClear={true}
                                onChange={() => {
                                    this.props.form.setFieldsValue({
                                        'hhh': null
                                    })
                                }}
                            >
                                <Option value="0">男</Option>
                                <Option value="1">女</Option>
                                <OptGroup label="其他">
                                    <Option value="2">人妖</Option>
                                    <Option value="3">变形</Option>
                                </OptGroup>
                            </Select>
                        )}
                    </FormItem>

                    <FormItem
                        label="hhh"
                    >
                        {getFieldDecorator('hhh', {
                            rules: [
                                { required: true, message: 'hhh!' },
                            ],

                        })(
                            <Select placeholder="hhh"
                            >
                                <Option value="0">xxx</Option>
                                <Option value="1">sss</Option>

                            </Select>
                        )}
                    </FormItem>

                    <FormItem
                        label="phone"
                    >
                        {getFieldDecorator('phone', {
                            rules: [{ required: true, message: 'phone!' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <Button type="primary" htmlType="submit">
                        {add ? '提交' : '修改'}
                    </Button>
                </Form>
            </div>
        )
    }
}

export default Form.create({
    mapPropsToFields(props) {
        return {
            user: Form.createFormField({
                value: props.selectItem.user,
                test: 'aaaa'
            }),
            sex: Form.createFormField({
                value: props.selectItem.sex
            }),
            hhh: Form.createFormField({
                value: props.selectItem.hhh
            }),
            phone: Form.createFormField({
                value: props.selectItem.phone,
            }),
        };
    },
    onFieldsChange(props, fields, a) {
        console.log('onFieldsChange', fields, a)
        console.log('onFieldsChange111', a)
    },
    onValuesChange(props, changedValues, allValues) {
        props.onChange(allValues)
    }
})(InnerForm)