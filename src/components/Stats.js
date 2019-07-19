import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import TimerComponent from './comon/TimerComponent';


arrayOfStats = ['Timer', 'Left to click', 'Lives left', 'Level']

class Stats extends Component {
    constructor(props) {
        super(props)
    };

    renderStats = (value) => {
        switch (value) {
            case 'Timer':
                return <Text>{value}  <TimerComponent /></Text>
            case 'Left to click':
                return <Text>{value}: {this.props.gameStarted ? this.props.gameFields.length - this.props.allreadySelectedFields.length : ''}</Text>
            case 'Lives left':
                return <Text>{value} {this.props.players.length && this.props.players.find(player => player.player === this.props.activePlayer).lives}</Text>;
            case 'Level':
                return <Text>{value}: {this.props.players.length && this.props.players.find(player => player.player === this.props.activePlayer).currentLevel}</Text>
            default:
                console.log('default')
                break;
        }
    }

    render() {
        console.log('=====', this.props.activePlayer)
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
    const { gameFields, allreadySelectedFields, gameStarted, currentLevel, lives, activePlayer, players } = state.gameReducer;
    return { gameFields, allreadySelectedFields, gameStarted, currentLevel, lives, activePlayer, players };
}

export default connect(mapStateToProsp)(Stats)