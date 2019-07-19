import { START_GAME, GAME_FIELDS, POSSIBLE_JUMPS, SET_SELECTED_FIELDS, GO_TO_NEXT_LEVEL, GAME_LEVEL_FAILED_START_NEW, SAVE_TIME, ADD_LIFE, REMOVE_LIVES, CLEAR_TIMER, SET_LEVEL } from "./types";
import store from '../index';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { resetPlayerToZero } from "./PlayerActions";
import { Actions } from "react-native-router-flux";

let arrayOfPossibleJumps = [{ i: +3, j: 0 }, { i: +2, j: -2 }, { i: 0, j: -3 }, { i: -2, j: -2 }, { i: -3, j: 0 }, { i: -2, j: +2 }, { i: 0, j: +3 }, { i: +2, j: +2 }]
let failedJumps = []

export const possibleJumpsFromLastSelectedField = (field) => dispatch => {
    dispatch({ type: SET_SELECTED_FIELDS, payload: field })
    let jumps = calculatePossibleJumps(field)
    dispatch({ type: POSSIBLE_JUMPS, payload: jumps })
}

export const startGame = (i, j) => dispatch => {
    activeFields(i, j);
    dispatch({ type: SET_SELECTED_FIELDS, payload: { i, j } })
    let jumps = calculatePossibleJumps({ i, j })
    dispatch({ type: POSSIBLE_JUMPS, payload: jumps })
    dispatch({ type: START_GAME, payload: true })
}

export const saveTimeForCompletedFiled = (time) => {
    return {
        type: SAVE_TIME,
        payload: time
    }
};

export const setLevelForUser = (level) => dispatch => {
    dispatch({ type: GAME_LEVEL_FAILED_START_NEW })
    dispatch({ type: SET_LEVEL, payload: level });
    Actions.root({ type: 'reset' })
}

const validateField = (field) => {
    let index = store.getState().gameReducer.gameFields.findIndex(element => element.i === field.i && element.j === field.j)
    return (index == -1 && field.i > 0 && field.i < 11 && field.j > 0 && field.j < 11);
}

const activeFields = (i, j) => {
    let lastField = { i, j }
    store.dispatch({ type: GAME_FIELDS, payload: lastField });
    const level = store.getState().gameReducer.players.find(player => player.player === store.getState().gameReducer.activePlayer).currentLevel;
    for (let k = 1; k < level; k++) {
        let newValue = recursiveFuntionToGenerateJumps(lastField)
        if (newValue) {
            lastField = newValue;
            store.dispatch({ type: GAME_FIELDS, payload: newValue });
        } else {
            return;
        };
    };
};

const recursiveFuntionToGenerateJumps = (lastValue) => {
    try {
        let filtered = arrayOfPossibleJumps.filter(possibleJump => !failedJumps.find(faildJump => faildJump.i === possibleJump.i && faildJump.j === possibleJump.j))
        if (filtered.length) {
            var jump = generateRandomJump(filtered)
            let newField = { i: lastValue.i + jump.i, j: lastValue.j + jump.j };
            let validate = validateField(newField)
            if (!validate) {
                failedJumps.push(jump)
                return recursiveFuntionToGenerateJumps(lastValue)
            } else {
                failedJumps = [];
                return newField;
            }
        } else {
            failedJumps = [];
            throw new Error('No valid field to jump from this field ' + lastValue.i + ' ' + lastValue.j);

        }
    } catch (error) {
        console.log('Catch from recursive funtion', error.message)
    }
}

const gameEnded = (message, win) => {
    Alert.alert(
        'Alert',
        message,
        [
            { text: 'OK', onPress: () => { win ? store.dispatch({ type: GO_TO_NEXT_LEVEL }) : store.dispatch({ type: GAME_LEVEL_FAILED_START_NEW }) } },
            !win && {
                text: 'Choose Level',
                onPress: () => Actions.chooseLevel()
            }
        ],
        { cancelable: false },
    );
}

const livesLost = (player) => {
    Alert.alert(
        'Alert',
        'You lost all lives. Reseting all data to 0',
        [
            { text: 'OK', onPress: () => store.dispatch(resetPlayerToZero(player)) },
        ],
        { cancelable: false },
    );
}

const generateRandomJump = (array) => {
    return array[Math.floor(Math.random() * array.length)]
}

const calculatePossibleJumps = (field) => {
    const gameReducerState = store.getState().gameReducer;
    const gameFields = gameReducerState.gameFields;
    const allreadySelectedFields = gameReducerState.allreadySelectedFields;
    const possibleJumps = arrayOfPossibleJumps.filter(possibleJump => 0 < possibleJump.i + field.i && possibleJump.i + field.i < 11 && 0 < possibleJump.j + field.j && possibleJump.j + field.j < 11)
    const changedValues = possibleJumps.map(jump => { return { i: jump.i + field.i, j: jump.j + field.j } })
    const jumpsWithinSelectedFields = gameFields.filter(element => changedValues.find(value => value.i === element.i && value.j === element.j))
    const filterAllreadySelectedFields = jumpsWithinSelectedFields.filter(element => !allreadySelectedFields.find(value => value.i === element.i && value.j === element.j))
    const singlePlayerData = gameReducerState.players.find(player => player.player === gameReducerState.activePlayer)
    if (!filterAllreadySelectedFields.length && gameFields.length !== allreadySelectedFields.length) {
        store.dispatch({ type: START_GAME, payload: false })
        store.dispatch({ type: SAVE_TIME, payload: 0 })
        if (singlePlayerData.lives - gameFields.length - allreadySelectedFields.length > 1) {
            gameEnded('There is no more moves, you lost this game, play again?')
            store.dispatch({ type: REMOVE_LIVES, payload: gameFields.length - allreadySelectedFields.length });
        } else {
            livesLost(singlePlayerData.player)
        }
    } else if (!filterAllreadySelectedFields.length && gameFields.length == allreadySelectedFields.length) {
        store.dispatch({ type: START_GAME, payload: false })
        saveSinglePlayerData(singlePlayerData)
        saveValueForLevel({ level: singlePlayerData.currentLevel, time: gameReducerState.time, player: singlePlayerData.player })
        gameEnded(`Level ${singlePlayerData.currentLevel} complete. Play next one?`, true)
        store.dispatch({ type: ADD_LIFE });
    } else {
        return filterAllreadySelectedFields;
    }
}

const saveValueForLevel = async (levelData) => {
    let data = await getFromAsyncStorege('@data')
    saveMaxLevel(levelData.level, levelData.player)
    if (data) {
        let newData = [...data, levelData];
        // console.log('newData', newData)
        await AsyncStorage.setItem('@data', JSON.stringify(newData))
    } else {
        let makeArray = [];
        makeArray.push(levelData);
        await AsyncStorage.setItem('@data', JSON.stringify(makeArray))
    }
    store.dispatch({ type: SAVE_TIME, payload: 0 })
}

const saveMaxLevel = async (level, player) => {
    let savedPlayer = await getFromAsyncStorege(`@${player}`);
    if (savedPlayer && savedPlayer < level) {
        await AsyncStorage.setItem(`@${player}`, JSON.stringify(level))
    } else if (!savedPlayer) {
        await AsyncStorage.setItem(`@${player}`, JSON.stringify(level))
    }
}

export const saveSinglePlayerData = async (newObject) => {
    const players = await getFromAsyncStorege('@players')
    let newPlayers = [...players];
    const foundIndex = newPlayers.findIndex(player => player.player === newObject.player);
    newPlayers[foundIndex] = newObject;
    console.log('new plejers', newPlayers)
    await AsyncStorage.setItem('@players', JSON.stringify(newPlayers))
}

export const getFromAsyncStorege = async (key) => {
    return await AsyncStorage.getItem(key).then(res => JSON.parse(res))
}