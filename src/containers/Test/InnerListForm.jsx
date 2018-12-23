import React, { Component } from 'react'
import { Form, Input, Button, Select, Popover } from 'antd'


const FormItem = Form.Item
const { Option, OptGroup } = Select

class InnerListForm extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    handleConfirm = (rule, value, callback, k) => {
        const { getFieldValue } = this.props.form
        console.log('aaaaaa', value)
        console.log('vvvvv', value)
        console.log('vvvvv', getFieldValue(`list[${k}].name`))
        if (getFieldValue(`list[${k}].name`) == "") {
            callback('name不能为空')
        }

        // if (getFieldValue(`list[${k}].sex`) == null) {
        //     callback('sex不能为空')
        // }
        callback()
    }

    test = (keys) => {
        let vale = {}
        for (const key of keys) {
            vale[key] = null
        }
        console.log('xxxxxxx', vale)
    }

    render() {
        console.log('listlist', this.props.list)
        const { getFieldDecorator, getFieldValue } = this.props.form
        getFieldDecorator('ids', { initialValue: this.props.ids })
        const ids = getFieldValue('ids')
        this.test(['name', 'sex'])
        const formItems = ids.map((k, index) => {
            const item = this.props.list.find(item => item.id == k)
            getFieldDecorator(`list[${k}].id`, {
                initialValue: k,
            })
            console.log('aaaa', item)
            return (
                <div key={k} >

                    <FormItem
                        label="姓名"

                    >
                        {getFieldDecorator(`list[${k}].name`, {
                            rules: [{
                                required: true,
                                message: `请输入姓名`,
                            }],
                            initialValue: item.name,

                        })(
                            <Input></Input>
                        )}

                    </FormItem>

                    <FormItem
                        label="性别">

                        {getFieldDecorator(`list[${k}].sex`, {
                            rules: [{
                                required: true,
                                message: `请选择性别`,
                            }, {
                                validator: (rule, value, callback) => this.handleConfirm(rule, value, callback, k)
                            }],
                            initialValue: item.sex,


                        })(
                            <Select
                                allowClear={true}
                                onChange={() => console.log('onChange')}
                                placeholder="请选择">
                                <Option value="0">男</Option>
                                <Option value="1">女</Option>
                            </Select>
                        )}
                    </FormItem>

                    {/* <Popover
                        content={<a onClick={this.hide}>Close</a>}
                        title="Title"
                        trigger="click"
                        visible={this.state.visible}
                        onVisibleChange={this.handleVisibleChange}
                    >
                        <Button type="primary">Click me</Button>
                    </Popover> */}
                </div>

            )

        })


        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    {
                        formItems
                    }
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form>
            </div>
        )
    }
}

export default Form.create({
    onValuesChange(props, changedValues, allValues) {
        props.onChange(allValues)
    }
})(InnerListForm)