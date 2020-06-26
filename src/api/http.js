import request from 'then-request'
import AuthService from '@//routes/auth/AuthService'
import userStore from '@/store/userStore'
import navigationStore from '@/store/navigationStore'
import { hashHistory } from 'react-router'
import { message } from 'antd'

<<<<<<< HEAD
message.config({
    top: 20,
    maxCount: 100,
});


const loadingKey = 'loading'
const resKey = 'reponse'
window.hideMsgArr = []
const http = (params, url) => {

=======



const http = (params, url) => {
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
    const headers = setHeader();
    const options = {
        mode: 'cors',
        json: params ? params.data : ''
    }
    const method = (params && params.method) ? params.method : 'GET';

    url = method == 'GET' ? getUrl(url, params) : url;
    return new Promise((resolve, reject) => {
<<<<<<< HEAD

        console.log("http 请求>>>>>>>" + url)
        message.loading({ content: '处理中...', duration: 0 })
        // let hideloading = message.loading({ content: '正在加载数据...', key: loadingKey, duration: 0 })
        let hideloading = function() {
            message.destroy()
        }

        request(method, url, { headers, ...options })
            .then(res => {
                if (res.statusCode == 401) {
                    hashHistory.push('/login')
                    hideloading()
=======
        message.loading(['处理中...'], 0)

        request(method, url, { headers, ...options })
            .then(res => {

                message.destroy()
                if (res.statusCode == 401) {

>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
                    message.error(JSON.parse(res.body).message, 3)
                    userStore.clearToken()
                    sessionStorage.clear();
                    navigationStore.clear()
<<<<<<< HEAD
                    navigationStore.setBossTitle(null)
                    return;
                }
                let data = JSON.parse(res.body)

                if (data.msg) {
                    data.message = data.msg
                }


                if (data.code == 200) {
                    hideloading()
                    data.message && message.success({ content: data.message, key: resKey, duration: 2 });
                    resolve(data)
                } else if (data.code == 401) {
                    hideloading()
                    message.success({ content: data.message ? data.message : '您没有权限操作！', key: resKey, duration: 2 })
                    resolve(data)
                } else if (data.code == 500) {
                    hideloading()
                    message.error({ content: data.message ? data.message : '请求出错', key: resKey, duration: 2 })
                    resolve(data)
                } else {
                    hideloading()
                    data.message && message.error({ content: data.message, key: resKey, duration: 2 });
=======
                    hashHistory.push('/login')
                    return;


                }



                let data = JSON.parse(res.body)

                if (data.code == 200) {

                    data.message && message.success([data.message], 3);
                    resolve(data)
                } else if (data.code == 401) {


                    message.success([data.message ? data.message : '您没有权限操作！'], 3)
                    resolve(data)
                } else if (data.code == 500) {

                    message.error(data.message ? data.message : '请求出错', 2)
                    resolve(data)
                } else {

                    data.message && message.error(data.message, 2);
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
                    resolve(data)
                }

            }).catch(error => {
<<<<<<< HEAD
                console.log(error)
                hideloading()
                message.error({ content: '服务器维护，请稍后再试', key: "errorKey", duration: 10 })

            })
=======
                console.error(error)
            })

>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
    })
}


<<<<<<< HEAD
=======


>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
const checkTimeOut = () => {
    let postBeofreAuth = new AuthService();
    let token = postBeofreAuth.getToken()

    if (!postBeofreAuth.loggedIn() && postBeofreAuth.isTokenExpired(token)) {
        postBeofreAuth.logout()
        return true;
    }
}

const setHeader = () => {
    let token_from_userStore = userStore.getToken()
<<<<<<< HEAD
=======

>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token_from_userStore
    }
    return headers;
}

const getUrl = (url, params) => {
    let data = params ? params.data : ''
    if (data == '') {
        return url
    }
    url += '/?';

    let paramsArray = [];
    //拼接参数  
    Object.keys(data).forEach(key => paramsArray.push(key + '=' + data[key]))
    url += paramsArray.join('&')
    return url
}

<<<<<<< HEAD
export default http
=======
export default http
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
