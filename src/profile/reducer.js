import {
    PROFILE_REQUESTING,
    PROFILE_REQUEST_SUCCESS,
    PROFILE_REQUEST_ERROR,
} from './constants'

const initialState = {  
    errors: [],
    messages: [],
    profileData: null,
    requesting: false,
    successful: false,
}

const profileReducer = function profileReducer (state = initialState, action) {
    switch (action.type) {
        case PROFILE_REQUESTING:
            return {
                errors: [],
                messages: [{body: "Fetching your profile...", time: new Date() }],
                profileData: null,
                requesting: true,
                successful: false,
            }
        case PROFILE_REQUEST_SUCCESS:
            return {
                errors: [],
                messages: [],
                profileData: action.profileData,
                requesting: false,
                successful: true,
            }
        case PROFILE_REQUEST_ERROR:
            return {
                errors: state.errors.concat([{
                    body: action.error.toString(),
                    time: new Date(),
                }]),
                messages: [],
                profileData: null,
                requesting: false,
                successful: false,
            }
        default:
            return state
    }
}

export default profileReducer