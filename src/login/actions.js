import {
    LOGIN_REQUESTING,
} from './constants'

// In order to perform an action of type LOGIN_REQUESTING
// we need a username and password
const loginRequest = function loginRequest ({ username, password }) {
    return {
        type: LOGIN_REQUESTING,
        username,
        password,
    }
}

export default loginRequest