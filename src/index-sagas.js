import LoginSaga from './login/sagas'
import ProfileSaga from './profile/sagas'
import SignupSaga from './signup/sagas'

export default function* IndexSaga () {
    yield [
        LoginSaga(),
        ProfileSaga(),
        SignupSaga(),
    ]
}