import React, { Component } from 'react';
import { View, TouchableOpacity, Text, FlatList, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { createNewPlayer, changeActivePlayer } from '../../../store/actions';

class ChoosePlayer extends Component {

    state = { text: '' }

    renderItem = ({ item, index }) => {
        return (
            <View style={styles.flatlistItem}>
                <View style={{ flex: 5, marginLeft: 10 }}>
                    <Text>{item.player}</Text>
                </View>
                <View style={{ flex: 2, alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => this.props.changeActivePlayer(item.player)} style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'green' }}>Choose</Text>
                    </TouchableOpacity>
                </View>
            </View >
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 2, flexDirection: 'row', maxHeight: 50 }}>
                    <View style={{ flex: 7 }}>
                        <TextInput
                            placeholder='Type in new player name'
                            onChangeText={text => this.setState({ text })}
                            value={this.state.text}
                            returnKeyType='done'
                            style={{ flexGrow: 1, padding: 5, borderColor: 'gray', borderWidth: 0.5 }}
                        />
                    </View>
                    <View style={{ flex: 3 }}>
                        <TouchableOpacity disabled={!this.state.text.trim().length} onPress={() => this.props.createNewPlayer(this.state.text)} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>Create</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 8, marginTop: 10 }}>
                    <Text>List of avaliable players:</Text>
                    <FlatList
                        data={this.props.players.filter(player => player.player != this.props.activePlayer)}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        getItemLayout={(data, index) => ({
                            length: 100,
                            offset: 0,
                            index
                        })}
                        style={{ marginTop: 10 }}
                    />
                </View>
            </View>
        )
    }
}

const styles = {
    flatlistItem: {
        flex: 1,
        height: 50,
        flexDirection: 'row',
        borderBottomColor: 'gray',
        borderTopWidth: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    }
}

const mapStateToProsp = state => {
    const { players, activePlayer } = state.gameReducer;
    return { players, activePlayer }
}

export default connect(mapStateToProsp, { createNewPlayer, changeActivePlayer })(ChoosePlayer);