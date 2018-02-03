import { take, fork, cancel, call, put, cancelled } from 'redux-saga/effects'

import { handleApiErrors } from '../lib/api-errors'

import {  
    LOGIN_REQUESTING,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
} from './constants'

import {
    setClient,
    unsetClient,
} from '../client/actions'

import {
    CLIENT_UNSET,
} from '../client/constants'

const loginUrl = '/login'
function loginApi (username, password) {
    const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    }

    return fetch(loginUrl, fetchOptions)
            .then(handleApiErrors)
            .then(response => { 
                const jwt = response.headers.get("authorization")
                return jwt
            })
            .catch((error) => { throw error })
}

function* logout () {
    yield put(unsetClient())
    localStorage.removeItem('token')
    // Need to redirect when client unset...
}

function* loginFlow (username, password) {
    let token
    try {
        // try to login and wait for result
        token = yield call(loginApi, username, password)
        // give redux our token - non-blocking
        yield put(setClient(token))
        // it's a success
        yield put({ type: LOGIN_SUCCESS })
        localStorage.setItem('token', JSON.stringify(token))
        // Use redirect to go to protected resource
    } catch (error) {
        yield put({ type: LOGIN_ERROR, error })
    } finally {
        if (yield cancelled()) {
            console.log("cancelled. Maybe I need another state for cancelled? Or just let error handle redirect to login?")
        }
    }

    return token
}

// Saga
function* loginWatcher () {
    while (true) {
        // Pause and watch for LOGIN_REQUESTING. Literally stops here until it sees this action
        const { username, password } = yield take(LOGIN_REQUESTING)
        // run the login flow in the background. Moves forward while that's happening
        // But keep a reference to the process in task
        const task = yield fork(loginFlow, username, password)
        // Watch for logout or login error. Stop here as long as you don't see either of those
        const action = yield take([CLIENT_UNSET, LOGIN_ERROR])
        // Saw either an error or logout... Cancel the login flow process
        if (action.type === CLIENT_UNSET) yield cancel(task)
        // On error or logout, start the logout process, then start the loop over
        yield call(logout)
    }
}

export default loginWatcher