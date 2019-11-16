import React from "react";
import { Provider, inject, observer } from "mobx-react";
import { Router, hashHistory } from "react-router";
import store from "./store";

import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import "./styles/variables.scss";
import 'antd/dist/antd.css';


import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');


import { routes } from './routes/routes.js'

export default class App extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <ConfigProvider locale={ zhCN }>
                <Provider { ...store } >
                    <Router history={ hashHistory } routes={ routes } />
                </Provider>
            </ConfigProvider>

        );
    }
}
