import { observable, action, computed, toJS, autorun } from "mobx";


class userStore {
    contractor() {
        if (!localStorage.getItem('token')) {
            this.getToken();
        }
    }

    @observable userInfo = null

    @observable token = null


    @action
    setUserProfile(profile) {

        let userInfo = toJS(profile)

        localStorage.setItem('staff_id', userInfo.staff_id);
        localStorage.setItem('staff_name', userInfo.staff_name)
        // if (userInfo.roles.length == 1) {
        //     alert(1)
        //     localStorage.setItem('role_name', userInfo.roles[0].role_name)
        // }


        this.userInfo = { ...userInfo }
        console.log(467, userInfo)
        sessionStorage.setItem("userInfo", JSON.stringify(userInfo))
        sessionStorage.setItem("user", userInfo.user)
        sessionStorage.setItem("staff_name", userInfo.staff_name)
        // if (userInfo.roles.length == 1) {
        //     sessionStorage.setItem("role_name", userInfo.roles[0].role_name)
        //     sessionStorage.setItem("role_code", userInfo.roles[0].role_code)
        // }


    }
    @action
    setUserRole(user){
        localStorage.setItem('role_name', user.role_name)
        sessionStorage.setItem("role_name", user.role_name)
        sessionStorage.setItem("role_code", user.role_code)
    }

    @action
    getUserProfile() {
        return this.userInfo
    }



    @action setToken(token) {
        localStorage.setItem('token', token)  // 防止刷新丢失token
<<<<<<< HEAD
        sessionStorage.setItem('token', token)
=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        this.token = token
    }

    @action getToken() {
<<<<<<< HEAD
        return sessionStorage.getItem('token')
        // if (this.token) {
        //     return this.token
        // } else {
        //     return localStorage.getItem('token')
        // }
=======

        if (this.token) {
            return this.token
        } else {
            return localStorage.getItem('token')
        }
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
    }


    @action clearToken() {
        localStorage.removeItem('token');
        this.token = null
    }





}

export default new userStore()
