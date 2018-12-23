import React from 'react'
import { connect } from 'react-redux'
import { Comment, List } from 'antd'
import InfiniteScroll from 'react-infinite-scroller'

import { fetchCommentList } from '../action'
import { PageNum, PageSize } from '../../../constants/constant';
import { handlePageListData } from '../../../utils/helper';

class CommentList extends React.Component {
    state = {
        pageNum: PageNum,
        pageSize: PageSize,
    }

    componentDidMount() {
        this.fetchCommentList(PageNum)
    }


    fetchCommentList = () => {
        const { feedId } = this.props.match.params
        this.props.fetchCommentList({
            pageNum: this.state.pageNum,
            pageSize: this.state.pageSize,
            feedId: parseInt(feedId, 10)
        })
    }

    handleInfiniteOnLoad = () => {
        this.setState({
            pageNum: this.state.pageNum + 1
        }, this.fetchCommentList)
    }

    render() {
        const { list, loading, hasMore } = handlePageListData(this.props.commentList)
        console.log('commentList', this.props.commentList)
        return (
            <div className="comment">
                <InfiniteScroll
                    initialLoad={false}
                    pageStart={PageNum}
                    loadMore={this.handleInfiniteOnLoad}
                    hasMore={!loading && hasMore}
                    useWindow={false}>
                    <List
                        itemLayout="horizontal"
                        dataSource={list}
                        renderItem={item => (
                            <Comment
                                actions={[<span>回复</span>]}
                                author={item.fromNickName}
                                avatar={item.avatar}
                                content={item.content}
                                datetime={item.time}
                            >
                                {
                                    item.childComments && item.childComments.map(child => {
                                        return (
                                            <Comment
                                                key={child.id}
                                                actions={[<span>回复</span>]}
                                                author={child.fromNickName}
                                                avatar={child.avatar}
                                                content={child.content}
                                                datetime={child.time}
                                            />
                                        )
                                    })
                                }
                            </Comment>
                        )}
                    />
                </InfiniteScroll>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        commentList: state.commentList
    }
}

export default connect(mapStateToProps, { fetchCommentList })(CommentList)