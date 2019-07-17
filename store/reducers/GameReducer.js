import { START_GAME, GAME_FIELDS, POSSIBLE_JUMPS, SET_SELECTED_FIELDS, CURRENT_GAME_LEVEL, GO_TO_NEXT_LEVEL, GAME_LEVEL_FAILED_START_NEW } from "../actions/types";

const initialState = { gameStarted: false, gameFields: [], possibleJumps: [], allreadySelectedFields: [], currentLevel: 10 }

export default (state = initialState, action) => {
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
            return { ...state, gameStarted: false, gameFields: [], possibleJumps: [], allreadySelectedFields: [], currentLevel: state.currentLevel + 1 };
        case GAME_LEVEL_FAILED_START_NEW:
            return { ...state, gameStarted: false, gameFields: [], possibleJumps: [], allreadySelectedFields: [], currentLevel: state.currentLevel };
        default:
            return state;
    }
}