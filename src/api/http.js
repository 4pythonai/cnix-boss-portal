import request from 'then-request'
import AuthService from '@//routes/auth/AuthService'
import userStore from '@/store/userStore'
import navigationStore from '@/store/navigationStore'
import { hashHistory } from 'react-router'
import { message } from 'antd'




const http = (params, url) => {
    const headers = setHeader();
    const options = {
        mode: 'cors',
        json: params ? params.data : ''
    }
    const method = (params && params.method) ? params.method : 'GET';

    url = method == 'GET' ? getUrl(url, params) : url;
    return new Promise((resolve, reject) => {
        message.loading(['处理中...'], 0)

        request(method, url, { headers, ...options })
            .then(res => {

                message.destroy()
                if (res.statusCode == 401) {

                    message.error(JSON.parse(res.body).message, 3)
                    userStore.clearToken()
                    sessionStorage.clear();
                    navigationStore.clear()
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
                    resolve(data)
                }

            }).catch(error => {
                console.error(error)
            })

    })
}




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

export default http
