import { takeEvery, fork, put, all, call } from 'redux-saga/effects'

import {
    CHECK_LOGIN,
    CHECK_LOGIN_OAUTH2,
    CHECK_LOGIN_DELEGATE,
} from './actionTypes'

import {
    apiLoginError,
    loginUserSuccessful,
} from './actions'

import {
    setLoggedInUser,
    postLogin,
} from '../../../utils/authUtils'

let apiUrl
(process.env.REACT_APP_ENV === 'development')
    ? apiUrl = process.env.REACT_APP_DEV_API_URL
    : apiUrl = process.env.REACT_APP_API_URL

function* loginUser({ payload: { username, password, recaptcha, history } }) {
    try {
        const response = yield call(postLogin, new URL('auth/1/core/login/', apiUrl).href, {
            username: username,
            password: password,
            recaptcha: recaptcha,
        })
        setLoggedInUser(response)
        yield put(loginUserSuccessful(response))
        history.push('/games')
    } catch (error) {
        yield put(apiLoginError(error))
    }
}

function* loginUserOAuth2({ payload: { clientId, provider, code, redirectUri, history } }) {
    try {
        const response = yield call(postLogin, new URL('auth/1/core/login/social/jwt-pair/', apiUrl).href, {
            clientId: clientId,
            provider: provider,
            code: code,
            redirectUri: redirectUri,
        })
        setLoggedInUser(response)
        yield put(loginUserSuccessful(response))
        history.push('/games')
    } catch (error) {
        yield put(apiLoginError(error))
    }
}

function* loginUserDelegate({ payload: { username, delegate, password, recaptcha, history } }) {
    try {
        const response = yield call(postLogin, new URL('auth/1/core/delegate/', apiUrl).href, {
            username: username,
            delegate: delegate,
            password: password,
            recaptcha: recaptcha,
        })
        setLoggedInUser(response)
        yield put(loginUserSuccessful(response))
        history.push('/games')
    } catch (error) {
        yield put(apiLoginError(error))
    }
}

export function* watchUserLogin() {
    yield takeEvery(CHECK_LOGIN, loginUser)
    yield takeEvery(CHECK_LOGIN_OAUTH2, loginUserOAuth2)
    yield takeEvery(CHECK_LOGIN_DELEGATE, loginUserDelegate)
}

function* loginSaga() {
    yield all([fork(watchUserLogin)])
}

export default loginSaga