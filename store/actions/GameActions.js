import { START_GAME, GAME_FIELDS, POSSIBLE_JUMPS, SET_SELECTED_FIELDS, GO_TO_NEXT_LEVEL, GAME_LEVEL_FAILED_START_NEW, SAVE_TIME } from "./types";
import store from '../index';
import { Alert } from 'react-native';

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
}

const validateField = (field) => {
    let index = store.getState().gameReducer.gameFields.findIndex(element => element.i === field.i && element.j === field.j)
    return (index == -1 && field.i > 0 && field.i < 11 && field.j > 0 && field.j < 11);
}

const activeFields = (i, j) => {
    let lastField = { i, j }
    store.dispatch({ type: GAME_FIELDS, payload: lastField });
    for (let k = 1; k < store.getState().gameReducer.currentLevel; k++) {
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
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            }
        ],
        { cancelable: false },
    );
}

const generateRandomJump = (array) => {
    return array[Math.floor(Math.random() * array.length)]
}

const calculatePossibleJumps = (field) => {
    const gameFields = store.getState().gameReducer.gameFields;
    const allreadySelectedFields = store.getState().gameReducer.allreadySelectedFields;
    const possibleJumps = arrayOfPossibleJumps.filter(possibleJump => 0 < possibleJump.i + field.i && possibleJump.i + field.i < 11 && 0 < possibleJump.j + field.j && possibleJump.j + field.j < 11)
    const changedValues = possibleJumps.map(jump => { return { i: jump.i + field.i, j: jump.j + field.j } })
    const jumpsWithinSelectedFields = gameFields.filter(element => changedValues.find(value => value.i === element.i && value.j === element.j))
    const filterAllreadySelectedFields = jumpsWithinSelectedFields.filter(element => !allreadySelectedFields.find(value => value.i === element.i && value.j === element.j))
    if (!filterAllreadySelectedFields.length && gameFields.length !== allreadySelectedFields.length) {
        store.dispatch({ type: START_GAME, payload: false })
        gameEnded('There is no more moves, you lost this game, play again?')
    } else if (!filterAllreadySelectedFields.length && gameFields.length == allreadySelectedFields.length) {
        store.dispatch({ type: START_GAME, payload: false })
        gameEnded(`Level ${store.getState().gameReducer.currentLevel} complete. Play next one?`, true)
    } else {
        return filterAllreadySelectedFields;
    }
}