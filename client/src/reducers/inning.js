import {
    ADD_INNING,
    GET_INNING,
    ADD_BAT_FLAG,
    ADD_BOWL_FLAG,
    ADD_BAT,
    ADD_BOWL,
    UPDATE_SCORE
} from '../actions/types';

const initialState = {
    innings: [],
    error: {},
    addbatFlag: false,
    addbowlFlag: false
}

export default function(state = initialState, action) {
    const {type, payload} = action;

    switch(type) {
        case ADD_INNING:
            return {
                ...state,
                innings:[...state.innings, payload]
            }
        case GET_INNING:
            return {
                ...state,
                innings: payload,
                headerFlag: false
            }
        case ADD_BAT_FLAG:
            return {
                ...state,
                addbatFlag: payload
            }
        case ADD_BOWL_FLAG:    
            return {
                ...state,
                addbowlFlag: payload
            }
        case ADD_BAT:
            return {
                ...state,
                innings: state.innings.map(inn => 
                    inn._id === payload.id ? {...inn, battingCard: payload.battingCard}: inn)
            } 
        case ADD_BOWL:
            return {
                ...state,
                innings: state.innings.map(inn => 
                    inn._id === payload.id ? {...inn, bowlingCard: payload.bowlingCard}: inn)
                } 
        case UPDATE_SCORE:
            return {
                ...state,
                innings: state.innings.map(inn =>
                    inn._id === payload.id ? {...inn, inn:payload } : inn)
            }            
            default:
                return state;
    }
}