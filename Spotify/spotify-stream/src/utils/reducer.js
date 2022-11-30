import { reducerCases } from "./Constant"

export const initialState = {
    token: null,
    playlist: [],
    userInfo: null,
    currentlyPlaying: null,
    selectedPlaylistId: "6O4mVFyxHbkXkop5B44hV4",
    selectedPlaylist: null,
    playerState: false,
}
export const reducer = (state, action) => {
    switch(action.type) {
        case reducerCases.SET_TOKEN: {
            return {
                ...state,
                token: action.token,
            }
        }
        case reducerCases.SET_PLAYLIST: {
            return {
                ...state,
                playlist: action.playlist,
            }
        }
        case reducerCases.SET_USER: {
            return {
                ...state,
                userInfo: action.userInfo,
            }
        }
        case reducerCases.SET_TRACK: {
            return {
                ...state,
                selectedPlaylist: action.selectedPlaylist,
            }
        }
        case reducerCases.SET_PLAYING: {
            return {
                ...state,
                currentlyPlaying: action.currentlyPlaying,
            }
        }
        case reducerCases.SET_PLAYSTATE: {
            return {
                ...state,
                playerState: action.playerState,
            }
        }
        case reducerCases.SET_PLAYLIST_ID: {
            return {
                ...state,
                selectedPlaylistId: action.selectedPlaylistId,
            }
        }
        default:
            return state
    }
}