import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import client from './client/reducer'
import login from './login/reducer'
import signup from './signup/reducer'

const IndexReducer = combineReducers({
    client,
    form,
    login,
    signup,
})

export default IndexReducer