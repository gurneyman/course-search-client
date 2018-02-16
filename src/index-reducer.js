import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import client from './client/reducer'
import login from './login/reducer'
import profile from './profile/reducer'
import signup from './signup/reducer'

const IndexReducer = combineReducers({
    client,
    form,
    login,
    profile,
    signup,
})

export default IndexReducer