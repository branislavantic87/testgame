import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { saveTimeForCompletedFiled } from '../../../store/actions';

class TimerComponent extends Component {

    componentDidUpdate(prevProps) {
        if (prevProps.gameStarted != this.props.gameStarted && this.props.gameStarted) {
            this.startTimer()
        } else if (prevProps.gameStarted != this.props.gameStarted && prevProps.gameStarted) {
            clearInterval(interval)
        }
    }

    startTimer = () => {
        interval = setInterval(() => {
            this.props.saveTimeForCompletedFiled(this.props.time + 1)
        }, 1000)
    }

    render() {
        return (
            <Text>{this.props.time}</Text>
        )
    }
}

const mapStateToProps = state => {
    const { gameStarted, time } = state.gameReducer;
    return { gameStarted, time };
}

export default connect(mapStateToProps, { saveTimeForCompletedFiled })(TimerComponent);


