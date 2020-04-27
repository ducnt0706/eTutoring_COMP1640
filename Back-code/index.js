import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import Application from './Application';
//TODO:
import Userprovider from './providers/Userprovider';
ReactDOM.render(
<Userprovider>
    <Application/>
</Userprovider>
,
document.getElementById('root'));

