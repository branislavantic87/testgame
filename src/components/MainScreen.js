import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Section from './comon/Section';
import Board from './Board';
import Stats from './Stats';


export default class MainScreen extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Section>
                    <Board />
                </Section>
                <Section>
                    <View style={{ flex: 1 }}>
                        <Stats />
                    </View>
                    <View style={{ flex: 9 }}></View>
                </Section>
            </View>
        )
    }
}