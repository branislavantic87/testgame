import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Platform } from 'react-native';
import Board from './Board';
import Stats from './Stats';
import ShowPlayer from './comon/ShowPlayer';
import store from '../../store';
import { getAllPlayers } from '../../store/actions';
import { Actions } from 'react-native-router-flux';


export default class MainScreen extends Component {

    componentDidMount() {
        if (!store.getState().gameReducer.players.length) {
            store.dispatch(getAllPlayers())
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={Platform.OS === 'android' ? { flex: 9 } : { flex: 7 }}>
                    <View style={{ flex: 2, justifyContent: 'center' }}>
                        <ShowPlayer />
                    </View>
                    <View style={{ flex: 10 }}>
                        <Board />
                    </View>
                </View>
                <View style={{ flex: 3 }}>
                    <View style={{ flex: 2, justifyContent: "center" }}>
                        <Stats />
                    </View>

                    <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => Actions.gameStats()} style={styles.touchStyle}>
                            <Text style={styles.fontStyle}>Show stats</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View >
        )
    }
}

const styles = {
    touchStyle: {
        width: '80%',
        height: '30%',
        borderRadius: 3,
        borderWidth: 0.5,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    },
    fontStyle: {
        color: 'white',
        fontSize: 24
    }
}
