import React, {Component, PureComponent} from 'react';
import {connect} from 'react-redux';
import CommentsList from '../CommentsList';
import PropTypes from 'prop-types';
import {CSSTransitionGroup} from 'react-transition-group';
import {deleteArticle, loadArticle} from '../../AC';
import './style.css';
import Loader from "../Loader";
import LocalizedText from '../LocalizedText';

//Вместо shouldComponentUpdate
class Article extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        isOpen: PropTypes.bool,
        toggleOpen: PropTypes.func,
        //from connect
        article: PropTypes.shape({
            id: PropTypes.string,
            title: PropTypes.string,
            text: PropTypes.string
        })
    };

    // Чтобы компонент постоянно не обновлялся
    // shouldComponentUpdate(nextProps, nextState) {
    //     return nextProps.isOpen !== this.props.isOpen;
    // }

    componentDidMount() {
        const {loadArticle, article, id} = this.props;
        if (!article || (!article.text && !article.loading)) loadArticle(id);
    }

    getBody() {
        const {article, isOpen} = this.props;
        if (!isOpen) return null;
        if (article.loading) return <Loader/>

        return (
            <section>
                {article.text}
                <CommentsList article={article}/>
            </section>
        )
    }

    setContainerRef = ref => {
        this.container = ref;
    };

    handleDelete = () => {
        const {deleteArticle, article} = this.props;
        deleteArticle(article.id);
    };

    render() {
        const {article, isOpen, toggleOpen} = this.props;
        if(!article) return null;
        return (
            <div ref={this.setContainerRef}>
                <h3>{article.title}</h3>
                <button onClick={toggleOpen}>
                    {isOpen ? 'close' : 'open'}
                </button>
                <button onClick = {this.handleDelete}><LocalizedText>delete me</LocalizedText></button>
                <CSSTransitionGroup
                    transitionName='article'
                    transitionAppear
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}
                    transitionAppearTimeout={500}
                    component='div'
                >
                    {this.getBody()}
                </CSSTransitionGroup>
            </div>
        )
    }
}

export default connect((state, ownProps) => ({
    article: state.articles.entities.get(ownProps.id)
}), {deleteArticle, loadArticle}, null, {pure: false})(Article);