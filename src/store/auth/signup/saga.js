import { takeEvery, fork, put, all, call } from 'redux-saga/effects'

import {
    CHECK_SIGNUP,
} from './actionTypes'

import {
    apiLoginError,
    signupUserSuccessful,
} from './actions'

import {
    postRegister,
} from '../../../utils/authUtils'

let apiUrl
(process.env.REACT_APP_ENV === 'development')
    ? apiUrl = process.env.REACT_APP_DEV_API_URL
    : apiUrl = process.env.REACT_APP_API_URL

function* registerUser({ payload: {
    username,
    email,
    password,
    promotion,
    recaptcha,
    firstName,
    lastName,
    form,
    history,
} }) {
    try {
        const response = yield call(postRegister, new URL('auth/1/core/signup/', apiUrl).href, {
            username: username,
            email: email,
            password: password,
            promotion: promotion,
            recaptcha: recaptcha,
            first_name: firstName,
            last_name: lastName,
            form: form,
        })
        yield put(signupUserSuccessful(response))
        if (response.status === 201) {
            history.push('/auth/register/success')
        }
    } catch (error) {
        yield put(apiLoginError(error))
        history.push('/auth/register/failed')
    }
}

export function* watchUserSignup() {
    yield takeEvery(CHECK_SIGNUP, registerUser)
}

function* signupSaga() {
    yield all([fork(watchUserSignup)])
}

export default signupSaga