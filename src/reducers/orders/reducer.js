import * as types from './actionType'

import Immutable from 'seamless-immutable'

const initialState = Immutable({
    orders: []
})

export default function orders(state = initialState, action={}) {
    switch(action.type) {
    case types.GET_ORDERS:
        return state.merge({
            orders: action.data
        })
    default:
        return state
    }
}