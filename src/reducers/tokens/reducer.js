
import Immutable from 'seamless-immutable'

const initialState = Immutable({
    tokens: {
        '0x73de023fc01ab': 'OMG',
        '0x023e1abfc073d': 'ETH',
        '0x048e1a2d7803a': 'ZRX',
    }
})

export default function tokens(state = initialState, action={}) {
    switch(action.type) {
    default:
        return state
    }
}
