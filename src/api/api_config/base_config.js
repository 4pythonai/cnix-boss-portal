//controller和基础路径配置

// if (process.env.NODE_ENV === 'docker') {
//     var root_url = 'http://127.0.0.1';
// } else {
//     var root_url = 'http://portal.sinnet.com.cn';

// }



let root_url ='http://114.113.88.2';


let  port = '8502';

 


const version_1 = 'v1';
const version_2 = 'v2';


const controller = {
    sales_api: 'sales_api',
    contract_api: 'contract_api',
    cabinet_api: 'cabinet_api',
    menu_api: 'menu_api',
    bpm: 'bpm',
    process: 'process',
    startTask: "start_work",
    cabinet: "sinnet_tree_plugin",
    resitemui: "resitemui",
    permission: 'permission',
    equipmentMaterial: 'equipmentMaterial',
    completion: 'completion',
    billing_api: 'billing_api',
    activity: 'Activity',
    curd: 'curd',
    auth: 'Auth',
    file: 'File',
    button: 'Button',
    organization: 'organization',
    user: 'user',
    address: 'address',
    resourcesOrder: 'ResourcesOrder',
    notify: 'notify'
}

export {
    version_1,
    version_2,
    root_url,
    port,
    controller,
<<<<<<< HEAD
=======
    processRoot
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
}

