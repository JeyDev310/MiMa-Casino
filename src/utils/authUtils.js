import axios from 'axios'

const setLoggedInUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', user.token)
}

const getLoggedInUser = () => {
    const user = localStorage.getItem('user')
    if (user)
        return JSON.parse(user)
    return null
}

const isUserAuthenticated = () => {
    return getLoggedInUser() !== null
}

const postLogin = (url, data) => {
    return axios
        .post(url, data)
        .then(response => {
            if (
                response.status === 400 ||
                response.status === 401 ||
                response.status === 500
            ) {
                throw response.data
            }
            return response.data
        }).catch(err => {
            throw err
        })
}

const postRegister = (url, data) => {
    return axios
        .post(url, data)
        .then(response => {
            if (response.status >= 200 || response.status <= 299)
                return response
            throw response.data
        })
        .catch(err => {
            var message
            if (err.response && err.response.status) {
                switch (err.response.status) {
                    case 404:
                        message = "Sorry! The page you are looking for could not be found"
                        break
                    case 500:
                        message = "Sorry! Something went wrong, please contact our support team"
                        break
                    case 401:
                        message = "Invalid credentials"
                        break
                    default:
                        message = err
                        break
                }
            }
            throw message
        })
}

const postForgetPwd = (url, data) => {
    return axios
        .post(url, data)
        .then(response => {
            if (
                response.status === 400 ||
                response.status === 500
            )
                throw response.data
            return response.data
        })
        .catch(err => {
            throw err[1]
        })
}

export { setLoggedInUser, getLoggedInUser, isUserAuthenticated, postRegister, postLogin, postForgetPwd }