import { root_url, port, version_2 } from './api_config/base_config';
import http from './http';

const api_root = `${root_url}:${port}/${version_2}`;

export default class ActivityRecord {
    static methods = {
        removeMember: (params) => http(params, `${api_root}/Sales_api/deleteMember`),
        addMember: (params) => http(params, `${api_root}/Sales_api/addMember`),
        addReply: (params) => http(params, `${api_root}/Sales_api/addReply`),
        addRecord: (params) => http(params, `${api_root}/Sales_api/addRecord`),
        getRecordList: (params) => http(params, `${api_root}/Sales_api/recordList`),
        // 获取成员列表
        getMember: (params) => http(params, `${api_root}/Sales_api/getMember`)
        // 获取机会进度、活动记录
    };
}
