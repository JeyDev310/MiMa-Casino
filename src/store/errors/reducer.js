import { GET_ERRORS } from './actionTypes'

const initialState = {}

export default function (state = initialState, action) {
    switch (action.type) {

        case GET_ERRORS:
            if (typeof action.payload === 'object') {
                return action.payload
            } else if (typeof action.payload === 'string') {
                let errors = {}
                errors.global = action.payload
                return errors
            }
            return state

        default:
            return state
    }
}