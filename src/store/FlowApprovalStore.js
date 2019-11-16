
import { observable, action } from "mobx"
import api from '../api/api'
import { message } from "antd"
import userStore from './userStore'
import { hashHistory } from 'react-router'
import navigationStore from '@/store/navigationStore'

class FlowApprovalStore {
    constructor() {

    }

    @observable readonly = ''

    @observable flowFormCfg = null

    // 启动流程： y  下一步： n
    @observable init_node = 'n'


    // 资源操作button组
    @observable button_res_group_cfg = [];


    @observable progressImgUrl = ''

    // 流程启动id
    @observable uuid = '';

    @observable paperno = ''

    // 下一个审批人
    @observable nextUser = ''


    // 流程key
    @observable processDefinitionKey = 'ABC';


    // 设置流程状态 分为： undefined  start back backOrigin  break-Off finish
    @observable FlowProcessStatus = ''



    @observable strategy = null

    /************************ userTree *************************/
    @observable newTreeData = []
    @observable originTreeData = {}
    @observable checkedKeys = []


    @action initData = () => {


        this.uuid = '';
        this.progressImgUrl = ''
        this.processDefinitionKey = 'ABC';
        this.paperno = ''
        this.originTreeData = {}
        this.nextUser = ''
        this.newTreeData = []
        this.init_node = 'n'
        this.FlowProcessStatus = ''
        this.flowFormCfg = null
        this.checkedKeys = []
        this.button_res_group_cfg = [];
        this.nodeKey = null;
        this.actcode = '';   // 来区分是流程主表/已办/代办



    }



    @action setNodeKey = nodeKey => this.nodeKey = nodeKey

    @action setActCode = actcode => this.actcode = actcode



    @action setReadonly = readonly => this.readonly = readonly


    @action getFlowFormCfg = async () => {
        let params = {
            data: {
                processKey: this.processDefinitionKey,
                init_node: this.init_node,
                uuid: this.uuid,
                readonly: this.readonly,
                nodeKey: this.nodeKey,
                actcode: this.actcode,
            },
            method: 'POST'
        };


        let json = await api.activity.getFlowFormCfg(params);
        if (json.code == 200) {
            this.flowFormCfg = json.data;
            console.log('流程表单配置', json.data)
            return;
        }
        message.error('获取流程表单配置失败');
    }



    @action setInitNode = init_node => this.init_node = init_node

    // @action setPageSource = pageSource => this.pageSource = pageSource


    @action clearNextUser = () => this.nextUser = ''


    // 设置uuid
    @action setUuid = uuid => this.uuid = uuid


    @action
    setFlowProcessStatus = status => this.FlowProcessStatus = status



    // 设置流程
    @action setProcessDefinitionKey = (processDefinitionKey) => {
        this.processDefinitionKey = processDefinitionKey
    }




    // 启动流程
    @action startProcess = async (event, submitData) => {
        if (event) {
            event.persist()
            // event.stopPropagation()
        }

        let data = {
            processDefinitionKey: this.processDefinitionKey,
            starter: sessionStorage.getItem("user"),
            uuid: this.uuid,
            strategy: this.strategy,
            ...submitData
        }
        let params = { data: data, method: 'POST' };
        let res = await api.bpm.startProcess(params);

        if (res.code == 200) {
            //启动成功, 跳转到已办
            message.success(res.message + ',跳转到已办')
            navigationStore.switchRouter({ action_code: 'passedtasks' })
        }
    }



    // 撤回流程
    @action withDraw = async (event, submitData) => {
        if (event) {
            event.persist()
            // event.stopPropagation()
        }

        let data = {
            processDefinitionKey: this.processDefinitionKey,
            starter: sessionStorage.getItem("user"),
            uuid: this.uuid,
            ...submitData
        }
        let params = { data: data, method: 'POST' };
        let res = await api.bpm.withDraw(params);


    }



    //NextStep

    @action
    nextStep = async (event, submitData) => {
        if (event) {
            // event.stopPropagation()
            event.persist()
        }

        let data = {
            nextuser: this.nextUser,
            note: this.note,
            processDefinitionKey: this.processDefinitionKey,
            starter: sessionStorage.getItem("user"),
            uuid: this.uuid,
            strategy: this.strategy,
            ...submitData
        };

        let params = { data: data, method: 'POST' };
        let res = await api.bpm.nextStep(params);
        if (res.code == 200) {
            // 提交成功，退回列表页
            hashHistory.goBack()
        }

    }



    // 终止流程 //terminateProcess
    @action
    terminateProcess = async (event, submitData) => {

        if (event) {
            // event.stopPropagation()
            event.persist()
        }

        let data = {
            processDefinitionKey: this.processDefinitionKey,
            uuid: this.uuid,
            ...submitData
        };

        let params = { data: data, method: 'POST' };

        let res = await api.bpm.terminateProcess(params)

    }



    //
    //action 取值范围（  regresses(上一步)，reject(起点)  ）



    // 退回发起人
    @action returnToStart = (event, submitData) => {
        // event.stopPropagation();
        event.persist()
        let data = {
            action: 'reject',
            processDefinitionKey: this.processDefinitionKey,
            starter: sessionStorage.getItem("user"),
            uuid: this.uuid,
            ...submitData
        };

        let params = { data: data, method: 'POST' };
        let res = api.bpm.returnToStart(params);
        this.clearNextUser()
    }



    // 退回上一步
    @action returnToPrev = (event, submitData) => {
        // event.stopPropagation();
        event.persist()

        let data = {
            action: 'regresses',
            processDefinitionKey: this.processDefinitionKey,
            starter: sessionStorage.getItem("user"),
            uuid: this.uuid,
            ...submitData
        };

        let params = { data: data, method: 'POST' };
        let res = api.bpm.returnToPrev(params);
        this.clearNextUser()


    }




    // 归档
    @action ArchivingProcess = async (event, submitData) => {
        event.persist()
        let params = {
            data: {
                note: this.note,
                processDefinitionKey: this.processDefinitionKey,
                starter: sessionStorage.getItem("user"),
                uuid: this.uuid,
                strategy: this.strategy,
                ...submitData
            },
            method: 'POST'
        };

        let res = await api.bpm.ArchivingProcess(params);
        if (res.code == 200) {
            // 提交成功，退回列表页
            hashHistory.goBack()
        }
        this.clearNextUser()

    }






    // 查看流程进度
    @action
    async  FlowProgress(e, record) {
        // e.persist()
        this.uuid = record.uuid
        this.processDefinitionKey = record.process_key;
        this.progressImgUrl = `${ api.bpm.progressImgUrl }/${ record.uuid }&${ this.processDefinitionKey }?date=` + new Date()
        hashHistory.push({
            pathname: 'flow/flowProgress',
            state: {
                progressImgUrl: this.progressImgUrl,
                uuid: record.uuid,
                processDefinitionKey: record.process_key
            }
        });


    }


    // 获取流程记录
    @action
    async getFlowRecords() {

        console.log()

        let params = {
            data: {
                processDefinitionKey: this.processDefinitionKey,
                uuid: this.uuid
            },
            method: 'POST'
        };
        let res = await api.bpm.getFlowRecords(params);
        console.log('流程记录')
        if (res.code == '200') {
            this.paperno = res.data.paperno;
            this.flowRecords = res.data.records;
        }

    }




    // 获取数据
    @action uformProcess = async (event, submitData) => {
        if (event) {
            event.stopPropagation()
        }
        console.log(submitData)
    }


    // 获取流程策略
    @action getFlowTactics = async () => {
        this.newTreeData = [];
        let params = {
            data: {
                processDefinitionKey: this.processDefinitionKey,
                role: sessionStorage.getItem("role_code"),
                username: sessionStorage.getItem("user"),
                uuid: this.uuid
            }
        };

        // 起始节点获取策略
        if (this.init_node == 'y') {

            await this.getStartStrategy(params)

            await this.getStartuserByproDefKey(params)
            return;
        }

        // 流程审批  获取策略
        if (this.init_node == 'n') {
            params.data.uuid = this.uuid
            await this.getStrategyByUuidAndPKey(params);
            await this.getNextGroupsAndUsersOrLike(params)
        }
    }

    // 起始节点策略
    @action getStartStrategy = async params => {
        let res = await api.bpm.getStartStrategy(params);
        this.setStrategy(res.data.strategy);
    }

    // 非起始节点策略
    @action getStrategyByUuidAndPKey = async params => {
        params.method = 'POST';
        let res = await api.bpm.getStrategyByUuidAndPKey(params);
        this.setStrategy(res.data.strategy);
    }

    // 获取起始节点可选人员部门集合
    @action
    async getStartuserByproDefKey(params) {
        //调用流程引擎
        let res = await api.bpm.getStartuserByproDefKey(params);

        this.getUserOrDept(res.data);
    }

    // // 根据UUID获取下一步候选组或人集合? 这都什么命名方式.....
    @action
    async getNextGroupsAndUsersOrLike(params) {
        params.method = 'GET'
        //调用流程引擎
        let res = await api.bpm.getNextGroupsAndUsersOrLike(params);

        this.getUserOrDept(res.data);
    }

    @action getUserOrDept = data => {
        if (this.strategy === 'SelectRole') {
            this.getRoleList(data)
            return
        }

        if (this.strategy === 'SelectPerson') {
            this.getDeparment(data);
            return
        }

    }


    @action setStrategy = strategy => this.strategy = strategy

    /**************************   获取角色   ***************************/
    @action getRoleList = data => {
        let roleList = []
        data.map(item => {
            item.groups.map(role => {
                roleList.push({
                    key: role.role_key,
                    title: role.role_value,
                    number: role.role_value,
                    isLeaf: true
                })
            })
        })

        this.newTreeData = roleList
    }

    /**************************   获取部门   ***************************/
    @action getDeparment = data => {
        this.originTreeData = data;
        let tempDepartment = []
        data.map(item => {
            item.dept.map(deptUserItem => {
                tempDepartment.push(
                    {
                        key: deptUserItem.number,
                        title: deptUserItem.deptName + '（' + item.taskName + '）',
                        number: deptUserItem.number,
                        isLeaf: false
                    }
                )
            })
        })
        this.newTreeData = tempDepartment
    }



    @action getNextUser = number => {
        let currentDept = {}

        this.originTreeData.map(item => {
            item.dept.map(deptUserItem => {
                if (deptUserItem.number == number) {
                    currentDept = deptUserItem;
                }
            })
        })

        return this.makeNextUser(currentDept.userItem);
    }

    // 重构下一步人员
    @action makeNextUser = data => {
        if (!data) {
            return;
        }
        let userData = [];
        data.map(item => {
            let user_obj = {};
            user_obj['key'] = item.key;
            user_obj['title'] = item.userName;
            user_obj['isLeaf'] = true;

            userData.push(user_obj);
        })
        return userData
    }

    // 展开收起userTree
    @action onExpandDept = (keys, { expanded: bool, node }) => {
        if (!bool) {
            return;
        }

        let data = this.getNextUser(node.props.eventKey);
        node.props.dataRef.children = data
        this.newTreeData = [...this.newTreeData]
    }


    // 复选框选择下一步要审批的人
    @action onCheck = (nextUser, checkedKeys) => {
        this.nextUser = nextUser;
        this.checkedKeys = checkedKeys
    }
}

export default new FlowApprovalStore()