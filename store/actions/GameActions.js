import { START_GAME, GAME_FIELDS } from "./types";
import store from '../index';
let currentLevelNumber = 99;

let arrayOfPossibleJumps = [{ i: +3, j: 0 }, { i: +2, j: -2 }, { i: 0, j: -3 }, { i: -2, j: -2 }, { i: -3, j: 0 }, { i: -2, j: +2 }, { i: +2, j: -2 }, { i: 0, j: +3 }, { i: +2, j: +2 }]
let failedJumps = []

const activeFields = (i, j) => {
    let array = [{ i, j }]
    let lastValue = array[0]
    store.dispatch({ type: GAME_FIELDS, payload: lastValue });
    for (let k = 1; k < currentLevelNumber; k++) {
        let newValue = recursiveFuntion(lastValue, array)
        if (newValue) {
            lastValue = newValue;
            store.dispatch({ type: GAME_FIELDS, payload: newValue });
        } else {
            return;
        }
    }
}

const recursiveFuntion = (lastValue) => {
    try {
        let filtered = arrayOfPossibleJumps.filter(possibleJump => !failedJumps.find(faildJump => faildJump.i === possibleJump.i && faildJump.j === possibleJump.j))
        if (filtered.length) {
            var jump = generateRandomJump(filtered)
            let newField = { i: lastValue.i + jump.i, j: lastValue.j + jump.j };
            let validate = validateField(newField)
            if (!validate) {
                failedJumps.push(jump)
                return recursiveFuntion(lastValue)
            } else {
                failedJumps = [];
                return newField;
            }
        } else {
            throw new Error('No valid field to jump from this field ' + lastValue.i + ' ' + lastValue.j);

        }
    } catch (error) {
        console.log('Catch from recursive funtion', error.message)
    }
}

const validateField = (field) => {
    let index = store.getState().gameReducer.gameFields.findIndex(element => element.i === field.i && element.j === field.j)
    console.log('INDEX', index)
    if (index == -1 && field.i > 0 && field.i < 11 && field.j > 0 && field.j < 11) {
        return true;
    } else {
        return false;
    }
}

const generateRandomJump = (array) => {
    return array[Math.floor(Math.random() * array.length)]
}

export const startGame = (i, j) => dispatch => {
    activeFields(i, j);
    dispatch({ type: START_GAME, payload: true })
}