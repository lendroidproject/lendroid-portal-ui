import * as types from './actionType'

import Immutable from 'seamless-immutable'

const initialState = Immutable({
    markets: [{
        pair: 'OMG/WETH',
        baseTokenAddress: '0x73de023fc01ab',
        quoteTokenAddress: '0x023e1abfc073d'
      },
      {
        pair: 'ZRX/WETH',
        baseTokenAddress: '0x048e1a2d7803a',
        quoteTokenAddress: '0x023e1abfc073d'
      }]
})

export default function markets(state = initialState, action={}) {
    switch(action.type) {
    default:
        return state
    }
}
