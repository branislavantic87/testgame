import { getFromAsyncStorege } from "./GameActions";
import { SET_PLAYERS, SET_ACTIVE_PLAYER, RESET_PLAYER, GAME_LEVEL_FAILED_START_NEW } from "./types";
import { Actions } from "react-native-router-flux";
import AsyncStorage from "@react-native-community/async-storage";
import store from "..";

// AsyncStorage.removeItem('@players')
const getAllPlayersFromStorage = async () => {
    try {
        return await getFromAsyncStorege('@players')
    } catch (error) {
        console.log('catch from getAllPlayersFromStorage', error)
    }

}

export const getAllPlayers = () => async dispatch => {
    try {
        dispatch({ type: SET_PLAYERS, payload: { player: 'Player', lives: 99, currentLevel: 1 } })
        const players = await getAllPlayersFromStorage()
        if (players) {
            players.map(player => dispatch({ type: SET_PLAYERS, payload: { ...player } }))
        }
    } catch (error) {
        console.log('catch from getAllPlayers', error)
    }
}


export const createNewPlayer = (name) => async dispatch => {
    try {
        const players = await getAllPlayersFromStorage()
        const findPlayerIndex = store.getState().gameReducer.players.findIndex(player => player.player === name)
        if (findPlayerIndex == -1) {
            if (players) {
                let newPlayers = [...players]
                const findIndex = newPlayers.findIndex(player => player.player === name)
                if (findIndex == -1) {
                    newPlayers = [...newPlayers, { player: name, lives: 99, currentLevel: 1 }]
                    await AsyncStorage.setItem('@players', JSON.stringify(newPlayers))
                }
            } else if (!players) {
                await AsyncStorage.setItem('@players', JSON.stringify([{ player: name, lives: 99, currentLevel: 1 }]))
            }
            dispatch({ type: SET_PLAYERS, payload: { player: name, lives: 99, currentLevel: 1 } })
        }
        dispatch({ type: SET_ACTIVE_PLAYER, payload: name })
        Actions.root({ type: 'reset' })
    } catch (error) {
        console.log('catch from createNewPlayer', error)
    }
}

export const resetPlayerToZero = (activePlayer) => async dispatch => {
    let players = await getAllPlayersFromStorage()
    if (players) {
        let newPlayers = [...players]
        let findIndex = players.findIndex(player => player.player === activePlayer)
        newPlayers[findIndex] = { player: activePlayer, lives: 99, currentLevel: 1 }
        await AsyncStorage.setItem('@players', JSON.stringify(newPlayers));
        await AsyncStorage.removeItem(`@${activePlayer}`)
    }
    dispatch({ type: RESET_PLAYER, payload: activePlayer })
}

export const changeActivePlayer = (name) => dispatch => {
    dispatch({ type: GAME_LEVEL_FAILED_START_NEW })
    dispatch({ type: SET_ACTIVE_PLAYER, payload: name });
    Actions.root({ type: 'reset' });
}