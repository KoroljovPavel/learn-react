import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './style.css';
import {addComment} from "../../AC/index";
import {connect} from 'react-redux';

class CommentForm extends Component {
    static propTypes = {};

    state = {
        user: '',
        text: ''
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.addComment(this.state);
        this.setState({
            user: '',
            text: ''
        });
    };

    getClassName = type => this.state[type].length && this.state[type].length < limits[type].min ?
        'form-input__error' : '';

    handleChange = type => e => {
        const {value} = e.target;
        if (value.length > limits[type].max) return;
        this.setState({[type]: value});
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                user: <input
                value={this.state.user}
                onChange={this.handleChange('user')}
                className={this.getClassName('user')}
            />
                comment: <input
                value={this.state.text}
                onChange={this.handleChange('text')}
                className={this.getClassName('text')}
            />
                <input type='submit' value='submit'/>
            </form>
        );
    }
}

const limits = {
    user: {
        min: 5,
        max: 15
    },
    text: {
        min: 20,
        max: 50
    }
};

export default connect(null, (dispatch, ownProps) => ({
    addComment: comment => dispatch(addComment(comment, ownProps.articleId))
}))(CommentForm);
