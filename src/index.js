import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'antd/dist/antd.min.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as lendroid from 'lendroid'

const len = new lendroid.Lendroid({ deployedConstants: { walletAddress: '0xaecf50f01a8002ab8d34bbd83a5da60ca2e0203d' } })

ReactDOM.render(
    <App lendroid={len}/>,
    document.getElementById('root')
);
registerServiceWorker();
