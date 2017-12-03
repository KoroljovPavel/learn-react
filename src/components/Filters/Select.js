import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import {connect} from 'react-redux';
import {changeSelection} from '../../AC';
import {mapToArr} from "../../helpers";

class SelectFilter extends Component {
    static propTypes = {
        articles: PropTypes.array.isRequired,
        selected: PropTypes.array
    };

    handleChange = selected => this.props.changeSelection(selected.map(option => option.value));

    render() {
        const {articles, selected} = this.props,
            options = articles.map(article => ({
                label: article.title,
                value: article.id
            }));
        return (
            <Select options={options} value={selected} onChange={this.handleChange} multi/>
        );
    }
}

function mapStateToProps(state) {
    return {
        articles: mapToArr(state.articles.entities),
        selected: state.filters.selected
    }
}

const mapToDispatch = {changeSelection: changeSelection};

export default connect(mapStateToProps, mapToDispatch)(SelectFilter);
