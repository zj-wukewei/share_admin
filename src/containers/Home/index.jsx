import React, { Component } from 'react';
import { connect } from 'react-redux';

import { List, Card, Avatar, Icon, Button } from 'antd';
import { fetchFeedList } from './action';
import { PageNum, PageSize } from '../../constants/constant'
import { handleListData } from '../../utils/helper'

import './home.scss'

const { Meta } = Card;

const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: '4px' }} />
        {text}
    </span>
);

class Home extends Component {


    state = {
        pageNum: PageNum,
        pageSize: PageSize,
        type: 2
    }

    componentDidMount = () => {
        this.fetchFeedList()
    }

    fetchFeedList = () => {
        console.log('fetchFeedList', this.state)
        this.props.fetchFeedList(this.state)
    }

    onLoadMore = () => {
        this.setState({
            pageNum: this.state.pageNum++
        }, this.fetchFeedList)
    }

    render() {
        console.log('Home', this.props.feedList)
        const { loading, total, list, hasMore } = handleListData(this.props.feedList)

        const loadMore = hasMore && !loading ? (
            <div style={{
                textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px',
            }}
            >
                <Button onClick={this.onLoadMore}>加载更多</Button>
            </div>
        ) : null
        return (
            <div className="home">
                <List
                    loading={loading}
                    itemLayout="vertical"
                    grid={{ gutter: 16, column: 4 }}
                    dataSource={list}
                    loadMore={loadMore}
                    renderItem={item => (
                        <List.Item
                        >
                            <Card
                                bordered={true}
                                cover={<img src={item.images} />}>
                                <Meta
                                    className="meta"
                                    avatar={<Avatar src={item.userAvatar} />}
                                    description={item.content}
                                />
                                <div className="footer">
                                    <IconText type="like-o" text="156" />
                                    <IconText type="message" text="2" />
                                </div>
                            </Card>
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        feedList: state.feedList,
    }
}


export default connect(mapStateToProps, { fetchFeedList })(Home)