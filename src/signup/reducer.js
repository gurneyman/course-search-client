import { 
    SIGNUP_REQUESTING,
    SIGNUP_SUCCESS,
    SIGNUP_ERROR,
} from './constants'

const initialState = {
    requesting: false,
    successful: false,
    messages: [],
    errors: [],
}

const reducer = function signupReducer (state = initialState, action) {
    switch (action.type) {
        case SIGNUP_REQUESTING:
            return {
                requesting: true,
                successful: false,
                messages: [{ body: 'Signing up...', time: new Date() }],
                errors: [],
            }
        // Reset state and add success message
        case SIGNUP_SUCCESS:
            return {
                errors: [],
                messages: [{
                    body: `Successfully created account for ${action.response.username}`,
                    time: new Date(),
                }],
                requestin: false,
                successful: true,
            }
        case SIGNUP_ERROR:
            return {
                errors: state.errors.concat([{
                    body: action.error.toString(),
                    time: Date(),
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