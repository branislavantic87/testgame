import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Section from './comon/Section';
import Board from './Board';


export default class MainScreen extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Section>
                    <Board />
                </Section>
                <Section>
                    <Text>BBB</Text>
                </Section>
            </View>
        )
    }
}