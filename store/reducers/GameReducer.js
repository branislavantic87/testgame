import { START_GAME, GAME_FIELDS } from "../actions/types";

const initialState = { gameStarted: false, gameFields: [] }

export default (state = initialState, action) => {
    switch (action.type) {
        case START_GAME:
            return { ...state, gameStarted: action.payload }
        case GAME_FIELDS:
            return { ...state, gameFields: [...state.gameFields, action.payload] }
        default:
            return state;
    }
}