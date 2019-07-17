import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { saveTimeForCompletedFiled } from '../../../store/actions';

class TimerComponent extends Component {

    state = { time: 0 }

    componentDidUpdate(prevProps) {
        if (prevProps.gameStarted != this.props.gameStarted && this.props.gameStarted) {
            this.startTimer()
        } else if (prevProps.gameStarted != this.props.gameStarted && prevProps.gameStarted) {
            this.props.saveTimeForCompletedFiled(this.state.time)
            clearInterval(interval)
            this.setState({ time: 0 })
        }
    }

    startTimer = () => {
        interval = setInterval(() => {
            this.setState({ time: this.state.time + 1 })
        }, 1000)
    }

    render() {
        return (
            <Text>{this.state.time}</Text>
        )
    }
}

const mapStateToProps = state => {
    const { gameStarted } = state.gameReducer;
    return { gameStarted };
}

export default connect(mapStateToProps, { saveTimeForCompletedFiled })(TimerComponent);


