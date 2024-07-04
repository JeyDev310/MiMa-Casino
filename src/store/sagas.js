import { all } from 'redux-saga/effects'

import loginSaga from './auth/login/saga'
import signupSaga from './auth/signup/saga'

export default function* rootSaga() {
    yield all([
        loginSaga(),
        signupSaga(),
    ])
}