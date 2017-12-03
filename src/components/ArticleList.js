import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {filtratedArticlesSelector} from "../selectors/index";
import {loadAllArticles} from "../AC/index";
import Loader from './Loader';
import {NavLink} from 'react-router-dom';

class ArticleList extends Component {
    static propTypes = {
        //from connect
        articles: PropTypes.array.isRequired
    };

    componentDidMount() {
        const {loadAllArticles, loading, loaded} = this.props;
        if (!loading && !loaded) loadAllArticles();
    }

    render() {
        const {articles, loading} = this.props;
        if (loading) return <Loader/>;
        const articleElements = articles.map(article =>
            <li key={article.id}>
                <NavLink to={`/articles/${article.id}`} activeStyle={{color: 'red'}}>
                    {article.title}
                </NavLink>
            </li>);
        return (
            <ul>
                {articleElements}
            </ul>
        )
    }
}

function mapStateToProps(state) {
    return {
        articles: filtratedArticlesSelector(state),
        loading: state.articles.loading,
        loaded: state.articles.loaded
    }
}

export default connect(mapStateToProps, {loadAllArticles})(ArticleList);