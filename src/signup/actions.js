import { SIGNUP_REQUESTING } from './constants'

const signupRequest = function signupRequest ({ username, password }) {  
  return {
    type: SIGNUP_REQUESTING,
    username,
    password,
  }
}

export default signupRequest