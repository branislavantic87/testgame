import React, { Component } from 'react';
import { View, ScrollView, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { setLevelForUser } from '../../../store/actions';

class ChooseLevel extends Component {

    state = { myLevel: [] }

    async componentDidMount() {
        const myMaxLevel = await AsyncStorage.getItem(`@${this.props.activePlayer}`);
        // Reason why i use Array.fill is beacause something is wrong with for loop it iterates only once.
        let array = new Array(Number(myMaxLevel)).fill(myMaxLevel)
        if (myMaxLevel) {
            this.setState({ myLevel: array })
        }
    }

    componentWillUnmount() {
        this.setState({ myLevel: [] });
    }

    renderAllLevels = () => {
        if (this.state.myLevel.length) {
            return this.state.myLevel.map((element, i) => {
                return (
                    <View key={i} style={{ flex: 1, justifyContent: "center", alignItems: 'center', height: 50, maxHeight: 50, backgroundColor: '#d3d3d3', borderBottomWidth: 0.5 }}>
                        <TouchableOpacity onPress={() => this.props.setLevelForUser(i + 1)} style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            <Text>{i + 1}</Text>
                        </TouchableOpacity>
                    </View>
                )
            })
        } else {
            return (
                <View style={{ flex: 1 }}><ActivityIndicator size='large' /></View>
            )
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ height: 50, width: '100%', alignItems: 'flex-start', justifyContent: 'center' }}><Text style={{ fontSize: 20 }}>Choose level to start from</Text></View>
                <ScrollView style={{ flex: 1 }}>
                    {this.renderAllLevels()}
                </ScrollView>
            </View>
        )
    }
}


const mapStateToProps = state => {
    const { activePlayer } = state.gameReducer;
    return { activePlayer };
}

export default connect(mapStateToProps, { setLevelForUser })(ChooseLevel)