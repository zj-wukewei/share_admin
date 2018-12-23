import React, { Component } from 'react'
import { Button } from 'antd'
import InnerForm from './InnerForm'

const initUser = {
    user: null,
    phone: null,
    sex: null,
    hhh: null
}

class OutWrapper extends Component {
    state = {
        selectItem: {
            ...initUser
        },
        userList: []
    }

    handleOnChange = (form) => {
        // console.log('handleOnChange', form)
        // this.setState(({ selectItem }) => ({
        //     selectItem: { ...selectItem, ...form },
        // }));
        const { sex, ...other } = form
        if (this.state.selectItem.sex != sex) {
            console.log('sex变化了', sex === undefined ? null : sex)
        }
        this.setState({
            'selectItem': {
                ...this.state.selectItem,
                ...form
            }
        })
    }

    handleOnSave = (add, form) => {
        // console.log('handleOnSave', form)
        let userList = this.state.userList
        if (add) {
            userList.push(form)
        } else {
            const index = this.state.userList.findIndex(item => item.id == form.id)
            // console.log('handleOnSave', index)
            userList.splice(index, 1, { ...form })
            // console.log('handleOnSave', userList)
        }
        this.setState({
            'userList': userList,
            selectItem: initUser,
        })
    }

    render() {
        return (
            <div>
                <InnerForm onSave={this.handleOnSave} onChange={this.handleOnChange} {...this.state} />

                {
                    this.state.userList.map((user, index) => {
                        return (
                            <Button key={user.id} onClick={() => {
                                this.setState({
                                    'selectItem': user
                                })
                            }}>{index}</Button>
                        )
                    })
                }
                <div>
                    {JSON.stringify(this.state)}
                </div>
            </div>
        )
    }
}

export default OutWrapper