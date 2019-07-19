import React, { Component } from 'react';
import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { getFromAsyncStorege } from '../../../store/actions';
import Accordion from 'react-native-collapsible/Accordion';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';

const statsArray = ['Level', 'Name', 'Time', 'Times completed']

export default class GameStats extends Component {

    state = { data: [], activeSections: [] };

    async componentDidMount() {
        const playerData = await getFromAsyncStorege('@data')
        if (playerData && playerData.length) {
            this.setState({ data: playerData })
        }
    }

    _renderHeader = (section, key) => {
        const array = this.state.data.filter(element => element.level === section.level).sort((a, b) => parseFloat(a.time) - parseFloat(b.time))
        return (
            <View style={styles.sectionStyle}>
                <View style={styles.flexCenterCenter}>
                    <Text>{section.level}</Text>
                </View>
                <View style={[styles.flexCenterCenter, { flexDirection: 'row', justifyContent: 'space-around' }]}>
                    <Text>{array[0].player}</Text>
                    {this.state.activeSections[0] !== key && array.length > 1 && <Text style={{ fontSize: 24, color: 'green' }}>+</Text>}
                </View>
                <View style={styles.flexCenterCenter}>
                    <Text>{array[0].time}</Text>
                </View>
                <View style={styles.flexCenterCenter}>
                    <Text>{array.length}</Text>
                </View>
            </View>
        );
    };

    _renderContent = section => {
        let array = this.state.data.filter(element => element.level === section.level).sort((a, b) => parseFloat(a.time) - parseFloat(b.time))
        array = array.slice(1, array.length)
        return (
            array.map((element, i) => {
                return <View key={i} style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', height: 30 }}>
                    <View style={styles.flexCenterCenter}>
                    </View>
                    <View style={[styles.flexCenterCenter, { backgroundColor: 'gray' }]}>
                        <Text>{element.player}</Text>
                    </View>
                    <View style={[styles.flexCenterCenter, { backgroundColor: 'gray' }]}>
                        <Text>{element.time}</Text>
                    </View>
                    <View style={styles.flexCenterCenter}>
                    </View>
                </View>
            })
        );
    };

    _updateSections = activeSections => {
        this.setState({ activeSections });
    };

    render() {
        if (this.state.data.length) {
            const uniqueArray = _.uniqBy(this.state.data, 'level')
            return (
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>
                        <View style={[Platform.OS === 'ios' ? { flex: 2 } : { flex: 1 }, { flexDirection: 'row', borderBottomColor: 'gray', borderBottomWidth: 0.5, alignItems: 'center' }]}>
                            {Platform.OS === 'ios' && <View style={{ flex: 0.2 }}><TouchableOpacity onPress={() => Actions.pop()}><Text> Back</Text></TouchableOpacity></View>}
                            <View style={{ flex: 1, }}>
                                <Text style={{ color: 'red', fontSize: 24 }}>Top score</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                            {statsArray.map((stat, i) => <View key={i} style={styles.flexCenterCenter}><Text style={{ fontWeight: 'bold' }}>{stat}</Text></View>)}
                        </View>
                    </View>
                    <View style={{ flex: 10 }}>
                        <ScrollView style={{ flex: 1 }}>
                            <Accordion
                                sections={uniqueArray.sort((a, b) => parseFloat(b.level) - parseFloat(a.level))}
                                activeSections={this.state.activeSections}
                                renderHeader={this._renderHeader}
                                containerStyle={{ flex: 1 }}
                                renderContent={this._renderContent}
                                onChange={this._updateSections}
                            />
                        </ScrollView>
                    </View>
                </View >
            )
        } else {
            return (
                <ActivityIndicator size='large' />
            )
        }
    }
}

const styles = {
    sectionStyle: {
        flex: 0,
        width: '100%',
        height: 40,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        borderRadius: 0.3,
        marginBottom: 3
    },
    flexCenterCenter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
}