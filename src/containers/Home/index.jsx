import React, { Component } from 'react';
import { connect } from 'react-redux';

import { List, Card, Avatar, Icon, Button, Popconfirm, message } from 'antd';
import { fetchFeedList, updateFeedStatus } from './action';
import { PageNum, PageSize } from '../../constants/constant'
import { handlePageListData } from '../../utils/helper'

import './home.scss'

const { Meta } = Card;

const IconText = ({ type, text, deleted = false, onClick = null }) => (
    <span onClick={onClick}>
        <Icon type={type} style={deleted ? { color: 'red', marginRight: '4px' } : { marginRight: '4px' }} />
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
            pageNum: this.state.pageNum + 1
        }, this.fetchFeedList)
    }

    handleDeleteItem = (item) => {
        console.log('handleDeleteItem', item)
        this.props.updateFeedStatus({
            feedId: item.id,
            deleted: !item.deleted
        })
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.updataFeedStatusSuccess && !this.props.updataFeedStatusSuccess) {
            message.success('切换状态成功!')
        }
    }

    render() {
        console.log('Home', this.props.feedList)
        const { loading, list, hasMore } = handlePageListData(this.props.feedList)

        const loadMore = hasMore && !loading ? (
            <div className="load-more">
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
                                cover={<img src={item.images} alt="feed图片" />}>
                                <Meta
                                    className="meta"
                                    avatar={<Avatar src={item.userAvatar} />}
                                    description={item.content}
                                />
                                <div className="footer">
                                    <IconText type="like-o" text={item.likeCount} />
                                    <IconText type="message" text={item.commentCount} onClick={() => this.props.history.push(`/app/feed/comment/${item.id}`)} />
                                    <Popconfirm
                                        title={item.deleted ? "确定取消删除吗？" : "确定要删除吗？"}
                                        onConfirm={() => this.handleDeleteItem(item)}
                                        icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}>
                                        <div>
                                            <IconText type="delete" deleted={item.deleted} text={item.deleted ? "已删除" : "删除"} />
                                        </div>
                                    </Popconfirm>
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
        updataFeedStatusSuccess: state.feed.updataFeedStatusSuccess,
        feedList: state.feedList,
    }
}


export default connect(mapStateToProps, { fetchFeedList, updateFeedStatus })(Home)