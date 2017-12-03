import {createSelector} from 'reselect';
import {mapToArr} from "../helpers";

const filtersGetter = state => state.filters,
    articlesGetter = state => state.articles.entities,
    commentsGetter = state => state.comments.entities,
    idGetter = (state, props) => props.id;

export const filtratedArticlesSelector = createSelector(articlesGetter, filtersGetter, (articles, filters) => {
    const {selected, dateRange: {from, to}} = filters;
    return mapToArr(articles).filter(article => {
        const published = Date.parse(article.date);
        return (!selected.length || selected.includes(article.id)) &&
            (!from || !to || (published > from && published < to));
    });
});

export const commentSelectorFactory = () => createSelector(commentsGetter, idGetter, (comments, id) => {
    return comments.get(id);
});