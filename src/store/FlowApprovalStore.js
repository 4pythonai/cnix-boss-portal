
import { observable, action } from "mobx"
import api from '../api/api'
import { message } from "antd"
import userStore from './userStore'
import { hashHistory } from 'react-router'
import navigationStore from '@/store/navigationStore'

class FlowApprovalStore {
    constructor() {

    }

    @observable preventRepeatClick = false

    @observable readonly = ''

    @observable flowFormCfg = null
    @observable relatedFlowFormCfg = []

    // 启动流程： y  下一步： n
    @observable init_node = 'n'

    //弹框
    @observable visible = false

    //生成竣工单弹框
    @observable combineVisible = false

    @observable voucherVisible = false


    // 资源操作button组
    @observable button_res_group_cfg = [];


    // 流程启动id
    @observable uuid = '';

    @observable transactid = '';

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
        this.transactid = '';
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

    @action hideModal = () => this.visible = false

    @action cancelcombineModal = () => this.combineVisible = false

    @action showcombineModal = () => this.combineVisible = true

    @action showvoucherMOdal = () => this.voucherVisible = true

    @action cancelvoucherMOdal = () => this.voucherVisible = false

    @action setReadonly = readonly => this.readonly = readonly


    @action getFlowFormCfg = async () => {
        let params = {
            data: {
                processKey: this.processDefinitionKey,
                transactid: this.transactid,
                init_node: this.init_node,
                uuid: this.uuid,
                readonly: this.readonly,
                nodeKey: this.nodeKey,
                actcode: this.actcode,
                role_code: sessionStorage.getItem("role_code")
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

    @action setRelatedFlowFormCfg = async () => {
        let para = { uuid: this.uuid, pk: this.processDefinitionKey }
        let res = await api.bpm.getReleatedFlowInfo({ data: para, method: 'POST' });
        console.log(res)
        if (res.code == 200) {
            this.relatedFlowFormCfg = res.related_flowforms

        }
    }

    @action setInitNode = init_node => this.init_node = init_node

    // @action setPageSource = pageSource => this.pageSource = pageSource


    @action clearNextUser = () => this.nextUser = ''


    // 设置uuid
    @action setUuid = uuid => this.uuid = uuid

    @action setTransactid = tid => this.transactid = tid




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
        this.preventRepeatClick = true;

        let data = {
            processDefinitionKey: this.processDefinitionKey,
            starter: sessionStorage.getItem("user"),
            uuid: this.uuid,
            strategy: this.strategy,
            role_code: sessionStorage.getItem("role_code"),
            ...submitData
        }
        let params = { data: data, method: 'POST' };
        let res = await api.bpm.startProcess(params);
        this.preventRepeatClick = false;
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
        this.preventRepeatClick = true;
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
            role_code: sessionStorage.getItem("role_code"),
            ...submitData
        };

        let params = { data: data, method: 'POST' };
        let res = await api.bpm.nextStep(params);
        if (res.code == 200) {
            // 提交成功，退回列表页
            hashHistory.goBack()
        }
        this.preventRepeatClick = false;
    }

    @action
    mergeProcessHandlerNO = (event, submitData) => {
        if (event) {
            // event.stopPropagation()
            event.persist()
        }
        this.visible = true
        console.log(6789)



    }
    @action
    mergeProcessHandlerYes = async (event, submitData) => {
        if (event) {
            // event.stopPropagation()
            event.persist()
        }
        let dataList = []
        let billsList = [
            // {approve:'y',flow_notes:'同意'},
            // {approve:'y',flow_notes:'同意'},
            // {approve:'y',flow_notes:'同意'}
        ]
        let params = {
            data: { transactid: this.transactid },
            method: 'POST'
        }
        let res = await api.bpm.getLineDataByTransactid(params)
        if (res.code == 200) {
            dataList = res.data
            for (var j = 0; j < dataList.length; j++) {
                billsList.push({ approve: 'y', flow_notes: '同意' })
            }
            for (var i = 0; i < dataList.length; i++) {
                Object.assign(dataList[i], billsList[i])
            }

            let params1 = {
                data: dataList,
                method: 'POST'
            }
            let res1 = await api.bpm.examineAndApproveLine(params1)
            if (res1.code == 200) {
                hashHistory.goBack()
            }

        }



    }

    // 生成网络竣工单
    @action completionOrder = () => {
        var combinedRefData = {}
        var combinedRefData1 = {}
        var combinedRefData2 = {}
        var combinedRefData3 = {}
        var combinedRefData4 = {}

        for (var i = 0; i < this.flowFormCfg.combinedRef.length; i++) {
            console.log(2211, String(this.flowFormCfg.combinedRef[i].bigtitle).indexOf('工单信息'))
            if (String(this.flowFormCfg.combinedRef[i].bigtitle).indexOf('工单业务信息') != -1) {
                combinedRefData = this.flowFormCfg.combinedRef[i].bigdata[0].rows[0]
            }
            if (String(this.flowFormCfg.combinedRef[i].bigtitle).indexOf('核心网络技术资料') != -1) {
                combinedRefData1 = this.flowFormCfg.combinedRef[i].bigdata[0].rows[0]
            }
            if (String(this.flowFormCfg.combinedRef[i].bigtitle).indexOf('线路测试数据') != -1) {
                combinedRefData2 = this.flowFormCfg.combinedRef[i].bigdata[0].rows[0]
            }
            if (String(this.flowFormCfg.combinedRef[i].bigtitle).indexOf('网络需求') != -1) {
                let networkdata= this.flowFormCfg.combinedRef[i].bigdata[0].rows
                combinedRefData4 = this.flowFormCfg.combinedRef[i].bigdata[0].rows[0].data
                for(var k=0;k<networkdata.length;k++){
                    if(networkdata[k].title=='网络需求描述'){
                        console.log(675,networkdata[k].data)
                        combinedRefData3=networkdata[k].data
                        console.log(745,combinedRefData3.网络需求描述)
                        
                    }

                }
            }
        }

        console.log(333,combinedRefData)
        let data = {
            客户名称: combinedRefData.客户名称 ? combinedRefData.客户名称 : '',
            合同编号: combinedRefData.合同号 ? combinedRefData.合同号 : '',
            受理人员: combinedRefData.销售 ? combinedRefData.销售 : '',
            施工要求: combinedRefData3.网络需求描述?combinedRefData3.网络需求描述   : '',
            本端所在机房: combinedRefData4.所在IDC ? combinedRefData4.所在IDC : '',
            所在楼层: combinedRefData4.所在楼宇 ? String(combinedRefData4.所在楼宇 + combinedRefData4.所在楼层) : '',
            所在模块间: combinedRefData4.所在区域 ? combinedRefData4.所在区域 : '',
            具体位置: combinedRefData4.所在区域 ? String(combinedRefData4.所在IDC+combinedRefData4.所在楼宇 + combinedRefData4.所在楼层+ combinedRefData4.所在区域): '',
            IP地址个数: combinedRefData.IP地址个数 ? combinedRefData.IP地址个数 : '',
            IP地址段: combinedRefData1.IP地址及掩码 ? combinedRefData1.IP地址及掩码 : '',
            互联地址: combinedRefData1.互联地址 ? combinedRefData1.互联地址 : '',
            AS号: combinedRefData1.AS号 ? combinedRefData1.AS号 : '',
            用户IP地址: combinedRefData1.用户IP地址 ? combinedRefData1.用户IP地址 : '',
            用户AS号: combinedRefData1.用户AS号 ? combinedRefData1.用户AS号 : '',
            BGP: combinedRefData1.BGP ? combinedRefData1.BGP : '',
            双线或三线: combinedRefData1.双线或三线 ? combinedRefData1.双线或三线 : '',
            实际竣工时间: combinedRefData2.实际竣工时间 ? combinedRefData2.实际竣工时间 : '',
            测试结果: combinedRefData2.测试结果 ? combinedRefData2.测试结果 : '',
            丢包率: combinedRefData2.丢包率 ? combinedRefData2.丢包率.replace(/%/g, '%25') : '',
            时延: combinedRefData2.时延 ? combinedRefData2.时延 : '',
            施工备注信息: combinedRefData2.施工备注信息 ? combinedRefData2.施工备注信息 : '',
            提供电路类型: combinedRefData2.提供电路类型 ? combinedRefData2.提供电路类型 : '',
            原电路租用带宽: combinedRefData2.原电路租用带宽 ? combinedRefData2.原电路租用带宽 : '',
            新电路租用带宽: combinedRefData2.新电路租用带宽 ? combinedRefData2.新电路租用带宽 : '',
            端口资源占用: combinedRefData2.端口资源占用 ? combinedRefData2.端口资源占用 : '',
            类型: combinedRefData2.类型 ? combinedRefData2.类型 : '',
            端口速率: combinedRefData2.端口速率 ? combinedRefData2.端口速率 : '',
            客户签字: combinedRefData2.客户签字 ? combinedRefData2.客户签字 : '',
            技术负责人签字: combinedRefData2.技术负责人签字 ? combinedRefData2.技术负责人签字 : '',

        }
        console.log('tttttttt',data)
        let params = ''
        let keys = Object.keys(data)
        keys.map((key, index) => {
            params += index + 1 === keys.length ? `${ key }=${ data[key] }` : `${ key }=${ data[key] }&`
        })

        sessionStorage.setItem('completionorder', params)
        let new_url = `http:${ window.location.host }/#/completionOrder?${ params }`

        window.open(new_url, '_blank')

    }
    // 生成线路竣工单
    @action lineCompletionOrder = () => {
        let combinedRefData = {}
        let combinedRefData1 = {}
        let combinedRefData2 = {}

        for (var i = 0; i < this.flowFormCfg.combinedRef.length; i++) {
            console.log(666, String(this.flowFormCfg.combinedRef[i].bigtitle))
            if (String(this.flowFormCfg.combinedRef[i].bigtitle).indexOf('工单信息') != -1) {
                combinedRefData = this.flowFormCfg.combinedRef[i].bigdata[0].rows[0]
            }
            if (String(this.flowFormCfg.combinedRef[i].bigtitle).indexOf('起点/终点具体位置') != -1) {
                combinedRefData1 = this.flowFormCfg.combinedRef[i].bigdata[0].rows[0]
            }
            if (String(this.flowFormCfg.combinedRef[i].bigtitle).indexOf('技术资料') != -1) {

                combinedRefData2 = this.flowFormCfg.combinedRef[i].bigdata[0].rows[0]
            }
        }

        console.log(9988, combinedRefData)
        let data = {
            客户名称: combinedRefData.客户名称 ? combinedRefData.客户名称 : '',
            合同编号: combinedRefData.合同号 ? combinedRefData.合同号 : '',
            受理人员: combinedRefData.销售负责人 ? combinedRefData.销售负责人 : '',
            施工要求: combinedRefData.任务需求描述 ? combinedRefData.任务需求描述 : '',
            Z端至接入点公里数: combinedRefData2.Z端至接入点公里数 ? combinedRefData2.Z端至接入点公里数 : '',
            A端至接入点公里数: combinedRefData2.A端至接入点公里数 ? combinedRefData2.A端至接入点公里数 : '',
            实际竣工时间: combinedRefData2.实际竣工时间 ? combinedRefData2.实际竣工时间 : '',
            全程公里数: combinedRefData2.全程公里数 ? combinedRefData2.全程公里数 : '',
            A端所在机房: combinedRefData.起点所在IDC ? combinedRefData.起点所在IDC : '',
            A端所在楼层: combinedRefData.起点所在楼层 ? combinedRefData.起点所在楼层 : '',
            A端所在模块间: combinedRefData.起点所在区域 ? combinedRefData.起点所在区域 : '',
            A端具体位置: combinedRefData.起点具体位置 ? combinedRefData.起点具体位置 : '',
            Z端所在机房: combinedRefData.终点所在IDC ? combinedRefData.终点所在IDC : '',
            Z端所在楼层: combinedRefData.终点所在楼层 ? combinedRefData.终点所在楼层 : '',
            Z端所在模块间: combinedRefData.终点所在区域 ? combinedRefData.终点所在区域 : '',
            Z端地址: combinedRefData.终点 ? combinedRefData.终点 : '',
            Z端具体位置: combinedRefData.终点具体位置 ? combinedRefData.终点具体位置 : '',
            全程损耗值: combinedRefData2.全程衰耗值 ? combinedRefData2.全程衰耗值 : '',
            接入电路类型: combinedRefData2['接入电路类型（原用户类型）'] ? combinedRefData2['接入电路类型（原用户类型）'] : '',
            '损耗值(接入点至接入点)': combinedRefData2['损耗值(接入点至接入点)'] ? combinedRefData2['损耗值(接入点至接入点)'] : '',
            '损耗值(Z端至接入点)': combinedRefData2['损耗值(Z端至接入点)'] ? combinedRefData2['损耗值(Z端至接入点)'] : '',
            '损耗值(A端至接入点)': combinedRefData2['损耗值(A端至接入点)'] ? combinedRefData2['损耗值(A端至接入点)'] : '',
            '接入点至接入点（或对端）公里数': combinedRefData2['接入点至接入点（或对端）公里数'] ? combinedRefData2['接入点至接入点（或对端）公里数'] : '',
            施工备注信息: combinedRefData2.施工备注信息 ? combinedRefData2.施工备注信息 : '',
            原电路租用带宽: combinedRefData2.原电路租用带宽 ? combinedRefData2.原电路租用带宽 : '',
            新电路租用带宽: combinedRefData2.新电路租用带宽 ? combinedRefData2.新电路租用带宽 : '',
            端口资源占用: combinedRefData2.端口资源占用 ? combinedRefData2.端口资源占用 : '',
            类型: combinedRefData2.端口类型 ? combinedRefData2.端口类型 : '',
            端口速率: combinedRefData2.端口速率 ? combinedRefData2.端口速率 : '',
            客户签字: combinedRefData2.客户签字 ? combinedRefData2.客户签字 : '',
            技术负责人签字: combinedRefData2.技术负责人签字 ? combinedRefData2.技术负责人签字 : ''

        }
        let params = ''
        let keys = Object.keys(data)
        keys.map((key, index) => {
            params += index + 1 === keys.length ? `${ key }=${ data[key] }` : `${ key }=${ data[key] }&`
        })

        sessionStorage.setItem('linecompletionorder', params)
        let new_url = `http:${ window.location.host }/#/lineCompletionOrder`

        window.open(new_url, '_blank')


    }
    @action combineOrdercompare=(record)=>{
   
        let data = {
            process_key: this.processDefinitionKey,
            uuid: this.uuid,
            nodeKey: this.nodeKey,
            readonly: true,
            init_node: 'n',
            action_code: this.actcode,
            page_source: 'detail', // IDC合同专用开关

        }

        let params = ''
        let keys = Object.keys(data)
        keys.map((key, index) => {
            params += index + 1 === keys.length ? `${ key }=${ data[key] }` : `${ key }=${ data[key] }&`
        })

        let new_url = `/#/flow/FlowDetail?${ params }`

        window.open(new_url, '_blank')
    }
    // 终止流程 //terminateProcess
    @action
    terminateProcess = async (event, submitData) => {
        this.preventRepeatClick = true;
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
        if (res.code == 200) {
            hashHistory.goBack()
        }
        this.preventRepeatClick = false;
    }



    //
    //action 取值范围（  regresses(上一步)，reject(起点)  ）



    // 退回发起人
    @action returnToStart = async (event, submitData) => {
        // event.stopPropagation();
        this.preventRepeatClick = true;
        event.persist()
        let data = {
            action: 'reject',
            processDefinitionKey: this.processDefinitionKey,
            starter: sessionStorage.getItem("user"),
            uuid: this.uuid,
            ...submitData
        };

        let params = { data: data, method: 'POST' };
        let res = await api.bpm.returnToStart(params);
        if (res.code == 200) {
            hashHistory.goBack()
        }
        this.clearNextUser()
        this.preventRepeatClick = false;
    }



    // 退回上一步
    @action returnToPrev = async (event, submitData) => {
        // event.stopPropagation();
        event.persist()
        this.preventRepeatClick = true;
        let data = {
            action: 'regresses',
            processDefinitionKey: this.processDefinitionKey,
            starter: sessionStorage.getItem("user"),
            uuid: this.uuid,
            ...submitData
        };

        let params = { data: data, method: 'POST' };
        let res = await api.bpm.returnToPrev(params);
        if (res.code == 200) {
            hashHistory.goBack()
        }
        this.clearNextUser()
        this.preventRepeatClick = false;


    }




    // 归档
    @action ArchivingProcess = async (event, submitData) => {
        event.persist()
        this.preventRepeatClick = true;
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
        this.preventRepeatClick = false;

    }






    // 查看流程进度
    @action
    async  FlowProgress(e, record) {
        // e.persist()
        this.uuid = record.uuid
        this.processDefinitionKey = record.process_key;
        let res = await api.bpm.getActivityDiagram({ data: {}, method: 'POST' });
        if (res.code == 200) {
            hashHistory.push({
                pathname: 'flow/flowProgress',
                state: {
                    progressImgUrl: res.data + `/${ record.uuid }&${ this.processDefinitionKey }?date=` + new Date(),
                    uuid: record.uuid,
                    processDefinitionKey: record.process_key
                }
            });
        }



    }


    // 获取流程记录 
    // 注： 流程记录组件不再使用，cui
    @action
    async getFlowRecords() {

        let params = {
            data: {
                processDefinitionKey: this.processDefinitionKey,
                uuid: this.uuid
            },
            method: 'POST'
        };
        let res = await api.bpm.getFlowRecords(params);

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
        if (params.data.processDefinitionKey === 'ABC') {
            return;
        }
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
        if (!params.data.uuid) {
            return;
        }
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