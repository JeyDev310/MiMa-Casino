import { combineReducers } from 'redux'

import login from './auth/login/reducer'
import signup from './auth/signup/reducer'
import errors from './errors/reducer'
import objects from './objects/reducer'
import theme from './theme/reducer'

export default combineReducers({ login, signup, errors, objects, theme })