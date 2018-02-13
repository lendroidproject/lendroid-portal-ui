import * as types from './actionType'
import axios from 'axios'

import { SERVER_URL_90 } from '../../config'

/**
 * 
 * @param {string} address lendroid address
 */
export function getOrders(address) {
    return async function(dispatch, getState) {
        axios.get( SERVER_URL_90 + '/orders?address='+address)
        .then((response) => {
            dispatch({
                type: types.GET_ORDERS,
                data: response.data.offers
            })
        })
        .catch((error) => {
            console.log(error);
        });
    }
}