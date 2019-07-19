import { START_GAME, GAME_FIELDS, POSSIBLE_JUMPS, SET_SELECTED_FIELDS, CURRENT_GAME_LEVEL, GO_TO_NEXT_LEVEL, GAME_LEVEL_FAILED_START_NEW, ADD_LIFE, REMOVE_LIVES, SAVE_TIME, SET_PLAYERS, SET_ACTIVE_PLAYER, RESET_PLAYER, CLEAR_TIMER, SET_LEVEL } from "../actions/types";

const initialState = { gameStarted: false, gameFields: [], possibleJumps: [], allreadySelectedFields: [], currentLevel: 20, time: 0, activePlayer: 'Player', players: [], clearTimer: false }

export default (state = initialState, action) => {
    const foundIndex = state.players.findIndex(player => player.player === state.activePlayer);
    const newPlayers = [...state.players]
    switch (action.type) {
        case START_GAME:
            return { ...state, gameStarted: action.payload };
        case GAME_FIELDS:
            return { ...state, gameFields: [...state.gameFields, action.payload] };
        case POSSIBLE_JUMPS:
            return { ...state, possibleJumps: action.payload };
        case SET_SELECTED_FIELDS:
            return { ...state, allreadySelectedFields: [...state.allreadySelectedFields, action.payload] };
        case CURRENT_GAME_LEVEL:
            return { ...state, currentLevel: action.payload };
        case GO_TO_NEXT_LEVEL:
            return { ...state, gameStarted: false, gameFields: [], possibleJumps: [], allreadySelectedFields: [], time: 0 };
        case GAME_LEVEL_FAILED_START_NEW:
            return { ...state, gameStarted: false, gameFields: [], possibleJumps: [], allreadySelectedFields: [], time: 0 };
        case ADD_LIFE:
            if (foundIndex != - 1) {
                newPlayers[foundIndex].lives = newPlayers[foundIndex].lives + 1;
                newPlayers[foundIndex].currentLevel = newPlayers[foundIndex].currentLevel + 1;
                return { ...state, players: newPlayers };
            }
        case REMOVE_LIVES:
            if (foundIndex != - 1) {
                newPlayers[foundIndex].lives = newPlayers[foundIndex].lives - action.payload;
                return { ...state, players: newPlayers };
            }

        case SAVE_TIME:
            return { ...state, time: action.payload };
        case SET_PLAYERS:
            return { ...state, players: [...state.players, action.payload] };
        case SET_ACTIVE_PLAYER:
            return { ...state, activePlayer: action.payload };
        case RESET_PLAYER:
            if (foundIndex != -1) {
                newPlayers[foundIndex] = { player: action.payload, lives: 99, currentLevel: 1 }
                return { ...state, players: newPlayers }
            }
        case SET_LEVEL:
            newPlayers[foundIndex].currentLevel = action.payload;
            return { ...state, players: newPlayers }
        default:
            return state;
    }
}