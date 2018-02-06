import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainBox from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <MainBox />,
    document.getElementById('main')
)

registerServiceWorker();
