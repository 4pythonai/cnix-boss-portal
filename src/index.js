<<<<<<< HEAD
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import "core-js/es";
=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';







<<<<<<< HEAD
ReactDOM.render(<App/>, document.getElementById('app'));


if (module.hot) {
    module.hot.accept()
}

=======
ReactDOM.render(<App />, document.getElementById('app'));


>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
serviceWorker.unregister();
