import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DayPicker, {DateUtils} from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import {connect} from 'react-redux';
import {changeDateRange} from '../../AC';

class DateRange extends Component {
    static propTypes = {
        changeDateRange: PropTypes.func.isRequired,
        range: PropTypes.shape({
            from: PropTypes.object,
            to: PropTypes.object
        })
    };

    handleDayClick = day => {
        const {changeDateRange, range} = this.props;
        changeDateRange(DateUtils.addDayToRange(day, range));
    };

    render() {
        const {from, to} = this.props.range,
                selectedRange = from && to && `${from.toDateString()} - ${to.toDateString()}`;
        return (
            <div className='date-range'>
                <DayPicker
                    ref='daypicker'
                    selectedDays={day => DateUtils.isDayInRange(day, {from, to})}
                    onDayClick={this.handleDayClick}
                />
                {selectedRange}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        range: state.filters.dateRange
    }
}

const mapDispatchToProps = {changeDateRange: changeDateRange};

export default connect(mapStateToProps, mapDispatchToProps)(DateRange);
