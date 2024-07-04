import {
    CHECK_LOGIN,
    LOGIN_USER_SUCCESSFUL,
    APILOGIN_FAILED,
    CHECK_OTP,
    VALIDATE_OTP_SUCCESS,
    VALIDATE_OTP_ERROR,
    ERROR_CLEAR,
    CHECK_SIGNUP,
    SIGNUP_USER_SUCCESSFUL,
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

export const checkSignup = (
    username,
    email,
    password,
    promotion,
    recaptcha,
    firstName,
    lastName,
    form,
    history,
) => {
    return {
        type: CHECK_SIGNUP,
        payload: {
            username,
            email,
            password,
            promotion,
            recaptcha,
            firstName,
            lastName,
            form,
            history,
        }
    }
}

export const signupUserSuccessful = (user) => {
    return {
        type: SIGNUP_USER_SUCCESSFUL,
        payload: user,
    }
}