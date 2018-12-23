import React, { Component } from 'react'
import InnerListForm from './InnerListForm'



class OutWrapper extends Component {
    state = {
        ids: ['0'],
        list: [{
            id: '0',
            name: 'wukewei',
            sex: '0'
        },
        ],
        nesList: []
    }

    handleOnChange = (form) => {
        console.log('handleOnChange', form)
        const list = form.list.filter(item => item != null)
        console.log('handleOnChange', list)
        this.setState({ list: list })
    }

    render() {
        console.log('render', this.state)
        return (
            <div>
                <InnerListForm onChange={this.handleOnChange}  {...this.state} />


                <div>
                    {JSON.stringify(this.state)}
                </div>
            </div>
        )
    }
}

export default OutWrapper