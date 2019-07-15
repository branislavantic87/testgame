import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { startGame } from '../../store/actions';

let arrayI = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let arrayJ = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

class Board extends Component {

    oneBox = (i, j) => {
        return <TouchableOpacity
            disabled={this.props.gameStarted && !this.checkField(i, j)}
            onPress={() => {
                if (!this.props.gameStarted) {
                    this.props.startGame(i, j)
                } else {
                    // currentActiveFiels(i, j)
                }
            }}
            style={[styles.oneBoxStyle, this.checkField(i, j) ? { backgroundColor: 'green' } : {}]}>
            {/* <Text>{i}  {j}</Text> */}
        </TouchableOpacity>
    }

    checkField = (i, j) => {
        return this.props.gameFields.find(ele => ele.i === i && ele.j === j);
    }

    renderBoard = () => {
        return arrayI.map((eleI) => {
            return <View key={eleI} style={{ flex: 1, flexDirection: 'row' }}>
                {arrayJ.map(eleJ => {
                    return <View key={eleJ} style={{ flex: 1, flexDirection: 'column' }}>
                        {this.oneBox(eleI, eleJ)}
                    </View>
                })}
            </View>
        });
    }

    render() {
        // console.log('====', )
        return (
            <View style={{ flex: 1 }}>
                {this.renderBoard()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    oneBoxStyle: {
        flex: 1,
        borderColor: 'red',
        borderWidth: 0.3,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

const mapStateToProps = state => {
    const { gameStarted, gameFields } = state.gameReducer;
    return { gameStarted, gameFields };
}

export default connect(mapStateToProps, { startGame })(Board);