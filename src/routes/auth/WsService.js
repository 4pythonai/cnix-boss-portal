import decode from 'jwt-decode';
import { hashHistory } from "react-router";
import api from '../../api/api'
import navigationStore from '../../store/navigationStore'
import userStore from '../../store/userStore'
<<<<<<< HEAD
import AuthService from './AuthService';
import { inject, observer } from 'mobx-react'

=======



import AuthService from './AuthService';
import { inject, observer } from 'mobx-react'

// @inject('navigation')
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778


export default class WsService {
    constructor() {
        this.Auth = new AuthService();

    }

<<<<<<< HEAD
    wsinit(transaction_id) {

        var socket = new WebSocket(api.auth.socket_url + '?ts=' + transaction_id);
        console.log(99,transaction_id)
=======


    wsinit(transaction_id) {

        var socket = new WebSocket(api.auth.socket_url + '?ts=' + transaction_id);
        console.log(transaction_id)
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778


        socket.onopen = function() {

            let _msgob = { "cmd": "register", "transaction_id": transaction_id }
<<<<<<< HEAD
=======

            // JSON.stringify(_msgob)

>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
            socket.send(JSON.stringify(_msgob));
        };

        socket.onmessage = (msg) => {

<<<<<<< HEAD
            console.log("接受到socketserver 传来的消息:");

=======

            console.log(msg);
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778

            var msg_received = JSON.parse(msg.data);
            console.log(msg_received);

            if (msg_received.cmd == 'notify_web_try_login') {
                this.Auth.login_qrscan(transaction_id)
            }
            if (msg_received.cmd == 'change_badge_num') {
<<<<<<< HEAD
                navigationStore.saveSessionBadge(msg_received.info);
                navigationStore.setBadge(msg_received.info);
=======
                navigationStore.change_badge_num(msg_received);
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
            }
        }

    }



}
