import {
    LOGIN_REQUESTING,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
} from './constants'

const initialState = {  
    errors: [],
    messages: [],
    requesting: false,
    successful: false,
}

const reducer = function loginReducer (state = initialState, action) {
    switch (action.type) {
        case LOGIN_REQUESTING:
            return {
                errors: [],
                messages: [{body: "Logging in...", time: new Date() }],
                requesting: true,
                successful: false,
            }
        case LOGIN_SUCCESS:
            return {
                errors: [],
                messages: [],
                requesting: false,
                successful: true,
            }
        case LOGIN_ERROR:
            return {
                errors: state.errors.concat([{
                    body: action.error.toString(),
                    time: new Date(),
                }]),
                messages: [],
                requesting: false,
                successful: false,
            }
        default:
            return state
    }
}

export default reducer