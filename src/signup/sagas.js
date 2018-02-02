import { call, put, takeLatest } from 'redux-saga/effects'
import { handleApiErrors } from '../lib/api-errors'
import { 
    SIGNUP_REQUESTING,
    SIGNUP_SUCCESS,
    SIGNUP_ERROR, 
} from './constants'

// The url derived from our .env file
const signupUrl = '/users/sign-up'

function signupApi (username, password) {
    console.log("FETCH", signupUrl)
    return fetch(signupUrl, {
        credentials: 'same-origin',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json => json)
    .catch((error) => { throw error})
}

// This will run on SIGNUP_REQUESTING Action
function* signupFlow (action) {
    try {
        const { email, password } = action

        // call api and wait here for response
        const response = yield call(signupApi, email, password)

        // dispatch success action with response
        yield put({ type: SIGNUP_SUCCESS, response })
    } catch (error) {
        yield put({ type: SIGNUP_ERROR, error })
    }
}

// Watch for SIGNUP_REQUESTING and call signupFlow with dispatched action
function* signupWatcher () {
    // takeLatest() takes the LATEST call of that action and runs it
    // if we used takeEvery, it would take every single
    // one of the actions and kick off a new task to handle it
    // CONCURRENTLY!!!
    yield takeLatest(SIGNUP_REQUESTING, signupFlow)
}

export default signupWatcher