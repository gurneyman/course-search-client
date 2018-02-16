import {
    PROFILE_REQUESTING,
    PROFILE_REQUEST_SUCCESS,
    PROFILE_REQUEST_ERROR,
} from './constants'

export function profileRequest (token) {
    return {
        type: PROFILE_REQUESTING,
        token,
    }
}

export function profileSuccess (profileData) {
    return {
        type: PROFILE_REQUEST_SUCCESS,
        profileData,
    }
}

export function profileError (error) {
    return {
        type: PROFILE_REQUEST_ERROR,
        error,
    }
}