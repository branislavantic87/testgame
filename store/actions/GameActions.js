import { START_GAME, GAME_FIELDS } from "./types";
import store from '../index';
let currentLevelNumber = 99;

let arrayOfPossibleJumps = [{ i: +3, j: 0 }, { i: + 2, j: - 2 }, { i: 0, j: - 3 }, { i: - 2, j: - 2 }, { i: - 3, j: 0 }, { i: - 2, j: + 2 }, { i: + 2, j: - 2 }, { i: 0, j: + 3 }, { i: + 2, j: + 2 }]
let failedFilds = []

activeFields = (i, j) => {
    console.log('usao sam')
    let array = [{ i, j }]
    let lastValue = array[0]
    for (let k = 1; k < currentLevelNumber; k++) {
        let newValue = recursiveFuntion(lastValue, array)
        lastValue = newValue;
        store.dispatch({ type: GAME_FIELDS, payload: newValue });
    }
}

const recursiveFuntion = (lastValue, array) => {
    var jump = generateRandomJump();
    let newField = { i: lastValue.i + jump.i, j: lastValue.j + jump.j }
    let validate = validateField(newField, array)
    if (!validate) {
        return recursiveFuntion(lastValue, array)
    } else {
        return newField;
    }
}

const validateField = (field) => {
    let index = store.getState().gameReducer.gameFields.findIndex(element => element.i === field.i && element.j === field.j)
    console.log('+======', failedFilds.length)
    if (index < 0 && field.i > 0 && field.i < 11 && field.j > 0 && field.j < 11) {
        return true;
    } else {
        failedFilds.push(field)
        return false;
    }
}

const generateRandomJump = () => {
    return arrayOfPossibleJumps[Math.floor(Math.random() * arrayOfPossibleJumps.length)]
}

export const startGame = (i, j) => dispatch => {
    activeFields(i, j);
    dispatch({ type: START_GAME, payload: true })
}