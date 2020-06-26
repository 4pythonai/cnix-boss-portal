import { observable, action } from "mobx"
import api from '../api/api'
import { message } from "antd"
import userStore from './userStore'
import { hashHistory } from 'react-router'
import navigationStore from '@/store/navigationStore'


class CandidateStore {
    /************************ userTree *************************/
    @observable newTreeData = []
    @observable originTreeData = {}
    @observable checkedKeys = []
    @observable init_node = ''
    @observable uuid = ''
    @observable processDefinitionKey = ''
    @observable filterUserParams = ''

    @observable strategy = null

    @action clearCheckedKeys = () => this.checkedKeys = []

    @action setInitNode = init_node => this.init_node = init_node

    // 设置uuid
    @action setUuid = uuid => this.uuid = uuid
    @action setFilterUserParams = filterUserParams => this.filterUserParams = filterUserParams


    @action setProcessDefinitionKey = processDefinitionKey => this.processDefinitionKey = processDefinitionKey

    // 获取流程策略 candistrore
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

        if(!this.uuid){
            delete params.data.uuid
        }

        params.data = { ...params.data, ...this.filterUserParams }
        // 起始节点获取策略
        if (this.init_node == 'y') {

            await this.getStartStrategy(params)

            await this.getStartuserByproDefKey(params)
            return;
        }

        // 流程审批  获取策略
        if (this.init_node == 'n') {
            params.data.uuid = this.uuid
            if(!this.uuid){
                delete params.data.uuid
            }
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

    // // 根据UUID获取下一步候选组或人集合
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

        console.log(this.newTreeData)
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

export default CandidateStore