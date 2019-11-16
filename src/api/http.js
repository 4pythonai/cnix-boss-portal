import request from 'then-request'
import AuthService from '@//routes/auth/AuthService'
import userStore from '@/store/userStore'
import navigationStore from '@/store/navigationStore'
import { hashHistory } from 'react-router'
import { message } from 'antd'

message.config({
    top: 20,
    duration: 2,
    maxCount: 2,
});


const loadingKey = 'loading'

const resKey = 'reponse'
window.hideMsgArr = []


const http = (params, url) => {
    const headers = setHeader();
    const options = {
        mode: 'cors',
        json: params ? params.data : ''
    }
    const method = (params && params.method) ? params.method : 'GET';

    url = method == 'GET' ? getUrl(url, params) : url;
    return new Promise((resolve, reject) => {
        // let hideloading = message.loading(['正在加载数据．．．'])
        let hideloading = message.loading(['正在加载数据．．．'])

        request(method, url, { headers, ...options })
            .then(res => {


                if (res.statusCode == 401) {
                    hideloading()
                    message.error(JSON.parse(res.body).message, 3)
                    userStore.clearToken()
                    sessionStorage.clear();
                    navigationStore.clear()
                    hashHistory.push('/login')
                    return;


                }



                let data = JSON.parse(res.body)

                if (data.code == 200) {
                    hideloading()
                    data.message && message.success([data.message], 3);
                    resolve(data)
                } else if (data.code == 401) {
                    
                    hideloading()
                    message.success([data.message ? data.message : '您没有权限操作！'], 3)
                    resolve(data)
                } else if (data.code == 500) {
                    hideloading()
                    message.error(data.message ? data.message : '请求出错', 2)
                    resolve(data)
                } else {
                    hideloading()
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
