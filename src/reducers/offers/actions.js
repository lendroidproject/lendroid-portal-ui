import * as types from './actionType'
import axios from 'axios'

import { SERVER_URL_80 } from '../../config'

/**
 * 
 * @param {string} address lenderAddress
 */

export function getOffers(address) {
    return async function(dispatch, getState) {
        axios.get( SERVER_URL_80 + '/offers?address='+address)
        .then((response) => {
            dispatch({
                type: types.GET_OFFERS,
                data: response.data.offers
            })
        })
        .catch((error) => {
            console.log(error);
        });
    }
}