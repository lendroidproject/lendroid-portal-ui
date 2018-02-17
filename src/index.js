import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'antd/dist/antd.min.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as lendroid from 'lendroid'

const hostServer = window.location.port == '3000' ? 'http://localhost:8080/offers' : window.location.origin+'/offers';
const len = new lendroid.Lendroid({ apiEndpoint: hostServer, deployedConstants: { walletAddress: '0x04Ad601827AabD2259a6F5Ed67978401aEDF3cBE' } })

ReactDOM.render(
    <App lendroid={len}/>,
    document.getElementById('root')
);
registerServiceWorker();
