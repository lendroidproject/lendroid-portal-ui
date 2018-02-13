import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'antd/dist/antd.min.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

const LENDER_ADDRESS = "0x23614cad46228c932caef635ca5279"
const TOKENS = {
  '0xd26114cd6ee289accf82350c8d8487fedb8a0c07': {
    'symbol': 'OMG',
    'name': 'Omisego',
    'decimals': 18
  },
  '0x2956356cd2a2bf3202f771f50d3d14a367b48070': {
    'symbol': 'WETH',
    'name': 'Wrapped-Ethereum',
    'decimals': 18
  },
  '0xe41d2489571d322189246dafa5ebde1f4699f498': {
    'symbol': 'ZRX',
    'name': '0x Protocol Token',
    'decimals': 18
  },
}
const MARKETS = [
    {
      pair: 'OMG/ETH',
      baseTokenSymbol: 'OMG',
      baseTokenAddress: '0xd26114cd6ee289accf82350c8d8487fedb8a0c07',
      quoteTokenSymbol: 'WETH',
      quoteTokenAddress: '0x2956356cd2a2bf3202f771f50d3d14a367b48070'
    },
    {
      pair: 'ZRX/ETH',
      baseTokenSymbol: 'ZRX',
      baseTokenAddress: '0xe41d2489571d322189246dafa5ebde1f4699f498',
      quoteTokenSymbol: 'WETH',
      quoteTokenAddress: '0x2956356cd2a2bf3202f771f50d3d14a367b48070'
    }
]
ReactDOM.render(
  <App markets={MARKETS} tokens={TOKENS} lenderAddress={LENDER_ADDRESS}/> ,
  document.getElementById('root')
);
registerServiceWorker();
