import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import TimerComponent from './comon/TimerComponent';


arrayOfStats = ['Timer', 'Left to click', 'Lives', 'Level']

class Stats extends Component {

    renderStats = (value) => {
        switch (value) {
            case 'Timer':
                return <Text>{value}  <TimerComponent /></Text>
            case 'Left to click':
                return <Text>{value}: {this.props.gameStarted ? this.props.gameFields.length - this.props.allreadySelectedFields.length : ''}</Text>
            case 'Lives':
                return <Text>{value}</Text>;
            case 'Level':
                return <Text>{value}: {this.props.currentLevel}</Text>
            default:
                break;
        }
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                {arrayOfStats.map((element, i) => {
                    return <View key={i} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>{this.renderStats(element)}</View>
                })}
            </View>
        )
    }
}




const mapStateToProsp = state => {
    const { gameFields, allreadySelectedFields, gameStarted, currentLevel } = state.gameReducer;
    return { gameFields, allreadySelectedFields, gameStarted, currentLevel };
}

export default connect(mapStateToProsp)(Stats)