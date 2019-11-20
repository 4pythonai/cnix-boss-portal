
//controller和基础路径配置

// if (process.env.NODE_ENV === 'docker') {
//     var root_url = 'http://127.0.0.1';
// } else {
//     var root_url = 'http://portal.sinnet.com.cn';

// }

const root_url = 'http://114.113.88.2';
const port = '8502';
const version_1 = 'v1';
const version_2 = 'v2';
const processRoot = 'http://119.254.119.57:8202';    //工作流引擎

const controller = {
    sales: 'sales_api',
    contract_api: 'contract_api',
    cabinet_api: 'cabinet_api',
    menu_api: 'menu_api',
    bpm: 'bpm',
    process: 'process',
    contract_management: "contract_management",
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
    button: 'Button',
    organization: 'organization',
    user: 'user',
    address: 'address'
}

export {
    version_1,
    version_2,
    root_url,
    port,
    controller,
    processRoot
}

