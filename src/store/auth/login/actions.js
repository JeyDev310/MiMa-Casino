import {
    CHECK_LOGIN,
    CHECK_LOGIN_OAUTH2,
    CHECK_LOGIN_DELEGATE,
    LOGIN_USER_SUCCESSFUL,
    APILOGIN_FAILED,
    CHECK_OTP,
    VALIDATE_OTP_SUCCESS,
    VALIDATE_OTP_ERROR,
    ERROR_CLEAR,
} from './actionTypes'

export const checkLogin = (
    username,
    password,
    recaptcha,
    history,
) => {
    return {
        type: CHECK_LOGIN,
        payload: {
            username,
            password,
            recaptcha,
            history,
        }
    }
}

export const checkLoginOAuth2 = (
    clientId,
    provider,
    code,
    redirectUri,
    history,
) => {
    return {
        type: CHECK_LOGIN_OAUTH2,
        payload: {
            clientId,
            provider,
            code,
            redirectUri,
            history,
        }
    }
}

export const checkLoginDelegate = (
    username,
    delegate,
    password,
    recaptcha,
    history,
) => {
    return {
        type: CHECK_LOGIN_DELEGATE,
        payload: {
            username,
            delegate,
            password,
            recaptcha,
            history,
        }
    }
}

export const checkOtp = (
    user_id,
    otp,
    history,
) => {
    return {
        type: CHECK_OTP,
        payload: {
            user_id,
            otp,
            history,
        }
    }
}

export const validateOtpSuccess = (user) => {
    return {
        type: VALIDATE_OTP_SUCCESS,
        payload: user,
    }
}

export const validateOtpError = (error) => {
    return {
        type: VALIDATE_OTP_ERROR,
        payload: error,
    }
}

export const loginUserSuccessful = (user) => {
    return {
        type: LOGIN_USER_SUCCESSFUL,
        payload: user,
    }
}

export const apiLoginError = (error) => {
    return {
        type: APILOGIN_FAILED,
        payload: error,
    }
}

export const clearErrorLogin = () => {
    return {
        type: ERROR_CLEAR,
    }
}