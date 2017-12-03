import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import Comment from './Comment';
import Loader from './Loader';
import {checkAndLoadCommentsForPage} from "../AC/index";

class CommentsPagination extends Component {
    static propTypes = {};

    componentWillMount() {
        this.props.checkAndLoadCommentsForPage(this.props.page);
    }

    componentWillReceiveProps({checkAndLoadCommentsForPage, page}) {
        checkAndLoadCommentsForPage(page);
    }

    getCommentItems = () => {
        const {comments, loading} = this.props;
        if (loading || !comments) return <Loader/>;
        const commentItems = comments.map(id => <li key={id}><Comment id={id}/></li>);
        return <ul>{commentItems}</ul>
    };

    getPaginator = () => {
        const {total} = this.props,
            items = [];

        for (let i = 1; i <= Math.floor((total - 1) / 5) + 1; i++) {
            items.push(<li key={i}><NavLink to={`/comments/${i}`} activeStyle={{color: 'red'}}>{i}</NavLink></li>);
        }

        return <ul>{items}</ul>;
    };

    render() {
        const {total} = this.props;
        if (!total) return <Loader/>;
        return (
            <div>
                {this.getCommentItems()}
                {this.getPaginator()}
            </div>
        );
    }
}

export default connect((state, {page}) => {
    const {total, pagination} = state.comments;
    return {
        total,
        loading: pagination.getIn([page, 'loading']),
        comments: pagination.getIn([page, 'ids'])
    }
}, {checkAndLoadCommentsForPage})(CommentsPagination);
