import { 
    call, 
    cancel, 
    cancelled, 
    fork, 
    put, 
    take, 
} from 'redux-saga/effects'

import {
    profileError,
    profileSuccess,
} from './actions'

import {
    PROFILE_REQUESTING,
} from './constants'

import { fetchUserProfile } from './dataService'

function* profileRequestFlow (token) {
    let profile

    try {
        profile = yield call(fetchUserProfile, token)
        yield put(profileSuccess(profile))
    } catch (error) {
        yield put(profileError(error))
    } 

    return token
}

function* profileWatcher () {
    while (true) {
        const { token } = yield take(PROFILE_REQUESTING)
        const task = yield fork(profileRequestFlow, token)
    }
}

export default profileWatcher