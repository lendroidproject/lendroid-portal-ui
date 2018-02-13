import * as types from './actionType'

import Immutable from 'seamless-immutable'

const initialState = Immutable({
    offers: []
})

export default function markets(state = initialState, action={}) {
    switch(action.type) {
    default:
        return state
    }
}