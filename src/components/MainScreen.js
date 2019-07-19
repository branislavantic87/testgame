import React, { Component } from 'react';
import { View } from 'react-native';
import Section from './comon/Section';
import Board from './Board';
import Stats from './Stats';
import ShowPlayer from './comon/ShowPlayer';
import store from '../../store';
import { getAllPlayers } from '../../store/actions';


export default class MainScreen extends Component {

    componentDidMount() {
        if (!store.getState().gameReducer.players.length) {
            store.dispatch(getAllPlayers())
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Section>
                    <View style={{ flex: 2, justifyContent: 'center' }}>
                        <ShowPlayer />
                    </View>
                    <View style={{ flex: 10 }}>
                        <Board />
                    </View>
                </Section>
                <Section>
                    <View style={{ flex: 2, justifyContent: "center" }}>
                        <Stats />
                    </View>

                    <View style={{ flex: 3 }}></View>
                </Section>
            </View>
        )
    }
}
