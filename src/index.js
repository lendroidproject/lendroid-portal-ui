import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'antd/dist/antd.min.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as lendroid from 'lendroid'

const len = new lendroid.Lendroid({ deployedConstants: { walletAddress: '0x464707b3e20c984856eb21cbb3bf29c14d74a3f1' } })

ReactDOM.render(
    <App lendroid={len}/>,
    document.getElementById('root')
);
registerServiceWorker();
