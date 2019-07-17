import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { startGame, possibleJumpsFromLastSelectedField } from '../../store/actions';

let arrayI = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let arrayJ = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

class Board extends Component {

    oneBox = (i, j) => {
        return <TouchableOpacity
            disabled={this.props.gameStarted && (!this.checkField(i, j) || !this.renderPossibleJumps(i, j))}
            onPress={() => {
                if (!this.props.gameStarted) {
                    this.props.startGame(i, j)
                } else {
                    this.props.possibleJumpsFromLastSelectedField({ i, j })
                }
            }}
            style={[styles.oneBoxStyle, this.renderSelectedFields(i, j) ? { backgroundColor: '#20B2AA' } : this.renderPossibleJumps(i, j) ? { backgroundColor: '#ADFF2F' } : this.checkField(i, j) ? { backgroundColor: '#228B22' } : {}]}>
        </TouchableOpacity>
    }

    checkField = (i, j) => this.props.gameFields && this.props.gameFields.find(ele => ele.i === i && ele.j === j)

    renderPossibleJumps = (i, j) => this.props.possibleJumps && this.props.possibleJumps.find(possibleJump => possibleJump.i === i && possibleJump.j === j);

    renderSelectedFields = (i, j) => this.props.allreadySelectedFields && this.props.allreadySelectedFields.find(selectedField => selectedField.i === i && selectedField.j === j)

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
        borderColor: 'gray',
        borderWidth: 0.3,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

const mapStateToProps = state => {
    const { gameStarted, gameFields, possibleJumps, allreadySelectedFields } = state.gameReducer;
    return { gameStarted, gameFields, possibleJumps, allreadySelectedFields };
}

export default connect(mapStateToProps, { startGame, possibleJumpsFromLastSelectedField })(Board);