import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';
import toggleOpen from '../decorators/toggleOpen';
import CommentForm from './CommentForm';
import {loadArticleComments} from "../AC/index";
import {connect} from 'react-redux';
import Loader from './Loader';
import LocalizedText from './LocalizedText';

class CommentsList extends Component {
    static propTypes = {};

    //Описываем что нам нужно из контекста
    static contextTypes = {
        user: PropTypes.string
    };

    componentWillReceiveProps({isOpen, article, loadArticleComments}) {
        if (!this.props.isOpen && isOpen && !article.commentLoading && !article.commentsLoaded) {
            loadArticleComments(article.id);
        }
    }

    render() {
        console.log('---', this.context);
        const {article, isOpen, toggleOpen} = this.props,
            text = isOpen ? 'hide comments' : 'open comments';
        return (
            <div>
                <h3>User: {this.context.user}</h3>
                <button onClick={toggleOpen}><LocalizedText>{text}</LocalizedText></button>
                {getBody({article, isOpen})}
            </div>
        )
    }

}

function getBody({article: {comments = [], id, commentsLoading, commentsLoaded}, isOpen}) {
    if (!isOpen) return null;
    if (commentsLoading) return <Loader/>;
    if (!commentsLoaded) return null;

    if (!comments.length) {
        return <div>
            <p><LocalizedText>No comments yet</LocalizedText></p>
            <CommentForm articleId={id}/>
        </div>
    }

    return (
        <div>
            <ul>
                {comments.map(id => <li key={id}><Comment id={id}/></li>)}
            </ul>
            <CommentForm articleId={id}/>
        </div>
    )
}

CommentsList.propTypes = {
    comments: PropTypes.array,
    isOpen: PropTypes.bool.isRequired,
    toggleOpen: PropTypes.func.isRequired
};

export default connect(null, {loadArticleComments}, null, {pure: false})(toggleOpen(CommentsList));