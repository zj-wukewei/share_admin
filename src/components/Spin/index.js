import React, {Component} from 'react'
import {Spin} from 'antd'

class SpinCustom extends Component {

  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <Spin tip="加载中..." spinning={!this.props.loaded}>
          {this.props.children}
        </Spin>
      </div>
    )
  }
}

export default SpinCustom