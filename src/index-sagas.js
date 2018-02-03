import LoginSaga from './login/sagas'
import SignupSaga from './signup/sagas'

export default function* IndexSaga () {
    yield [
        LoginSaga(),
        SignupSaga(),
    ]
}