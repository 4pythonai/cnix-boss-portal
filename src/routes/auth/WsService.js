import decode from 'jwt-decode';
import { hashHistory } from "react-router";
import api from '../../api/api'
import navigationStore from '../../store/navigationStore'
import userStore from '../../store/userStore'
import AuthService from './AuthService';
import { inject, observer } from 'mobx-react'



export default class WsService {
    constructor() {
        this.Auth = new AuthService();

    }

    wsinit(transaction_id) {

        var socket = new WebSocket(api.auth.socket_url + '?ts=' + transaction_id);
        console.log(99,transaction_id)


        socket.onopen = function() {

            let _msgob = { "cmd": "register", "transaction_id": transaction_id }
            socket.send(JSON.stringify(_msgob));
        };

        socket.onmessage = (msg) => {

            console.log("接受到socketserver 传来的消息:");


            var msg_received = JSON.parse(msg.data);
            console.log(msg_received);

            if (msg_received.cmd == 'notify_web_try_login') {
                this.Auth.login_qrscan(transaction_id)
            }
            if (msg_received.cmd == 'change_badge_num') {
                navigationStore.saveSessionBadge(msg_received.info);
                navigationStore.setBadge(msg_received.info);
            }
        }

    }



}
