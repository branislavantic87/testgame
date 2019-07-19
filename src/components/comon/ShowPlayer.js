import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';


class ShowPlayer extends Component {
    render() {
        return (
            <View style={styles.mainCont}>
                <View style={[styles.singleCont, { flexDirection: 'row' }]}>
                    <Text>Player Name: </Text>
                    <Text style={{ color: 'red' }}>{this.props.activePlayer}</Text>
                </View>
                <View style={[styles.singleCont]}>
                    <TouchableOpacity onPress={() => Actions.choosePlayer()} style={styles.touchableStyle}>
                        <Text >Change Player</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = {
    mainCont: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    singleCont: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    touchableStyle: {
        width: '80%',
        height: '60%',
        borderRadius: 3,
        backgroundColor: '#d3d3d3',
        justifyContent: 'center',
        alignItems: 'center'
    }
}

const mapStateToProsp = state => {
    const { activePlayer } = state.gameReducer;
    return { activePlayer };
}


export default connect(mapStateToProsp)(ShowPlayer);