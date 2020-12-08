import request from 'then-request'
import AuthService from '@//routes/auth/AuthService'
import userStore from '@/store/userStore'
import navigationStore from '@/store/navigationStore'
import {hashHistory} from 'react-router'
import {message} from 'antd'

message.config({
    top: 20,
    maxCount: 100,
});


const loadingKey = 'loading'
const resKey = 'reponse'
window.hideMsgArr = []
const http = (params,url) => {

    const headers = setHeader();
    const options = {
        mode: 'cors',
        json: params ? params.data : ''
    }
    const method = (params && params.method) ? params.method : 'GET';

    url = method == 'GET' ? getUrl(url,params) : url;
    return new Promise((resolve,reject) => {

        message.loading({content: '处理中...',duration: 0})
        let hideloading = function() {
            message.destroy()
        }

        request(method,url,{headers,...options})
            .then(res => {
                if(res.statusCode == 401) {
                    hashHistory.push('/login')
                    hideloading()
                    message.error(JSON.parse(res.body).message,3)
                    userStore.clearToken()
                    sessionStorage.clear();
                    navigationStore.clear()
                    navigationStore.setBossTitle(null)
                    return;
                }
                let data = JSON.parse(res.body)

                if(data.msg) {
                    data.message = data.msg
                }


                if(data.code == 200) {
                    hideloading()
                    if(data.hasOwnProperty("hidemessage")) {
                    } else {
                        data.message && message.success({content: data.message,key: resKey,duration: 2});
                    }
                    resolve(data)
                } else if(data.code == 401) {
                    hideloading()
                    message.success({content: data.message ? data.message : '您没有权限操作！',key: resKey,duration: 2})
                    resolve(data)
                } else if(data.code == 500) {
                    hideloading()
                    message.error({content: data.message ? data.message : '请求出错',key: resKey,duration: 2})
                    resolve(data)
                } else {
                    hideloading()
                    data.message && message.error({content: data.message,key: resKey,duration: 2});
                    resolve(data)
                }

            }).catch(error => {
                console.log(error)
                hideloading()
                message.error({content: 'Request Failer,Try later',key: "errorKey",duration: 10})

            })
    })
}


const checkTimeOut = () => {
    let postBeofreAuth = new AuthService();
    let token = postBeofreAuth.getToken()

    if(!postBeofreAuth.loggedIn() && postBeofreAuth.isTokenExpired(token)) {
        postBeofreAuth.logout()
        return true;
    }
}

const setHeader = () => {
    let token_from_userStore = userStore.getToken()
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token_from_userStore
    }
    return headers;
}

const getUrl = (url,params) => {
    let data = params ? params.data : ''
    if(data == '') {
        return url
    }
    url += '/?';

    let paramsArray = [];
    //拼接参数  
    Object.keys(data).forEach(key => paramsArray.push(key + '=' + data[key]))
    url += paramsArray.join('&')
    return url
}

export default http