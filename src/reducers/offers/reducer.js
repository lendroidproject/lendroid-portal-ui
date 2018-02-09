import * as types from './actionType'

import Immutable from 'seamless-immutable'

const initialState = Immutable({
    offers: []
})

export default function offers(state = initialState, action={}) {
    switch(action.type) {
    case types.GET_OFFERS:
        return state.merge({
            offers: action.data
        })
    default:
        return state
    }
}