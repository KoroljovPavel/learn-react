import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ArticleCharts extends Component {
    static propTypes = {

    };

    componentDidMount() {
        //d3 works with this.refs.chart
    }

    componentWillReceiveProps(nextProps) {
        //do something with new props
    }

    render() {
        return <div ref='chart' />
    }

    componentWillMount() {
        //do some cleanup
    }
}