
// 分配到节点[添加动作]	已经弃用.


import React from 'react'
import { Modal, Descriptions, message, Checkbox } from 'antd';
import { observer, inject } from "mobx-react";
import api from '../../../../api/api'
import pmStore from '../../../../store/pmStore'
import { toJS } from 'mobx'
const CheckboxGroup = Checkbox.Group;

@observer
export default class NodeAssignPlugin extends React.Component {
    constructor(props) {
        super(props)
        this.pmStore = pmStore
        this.state = {
            visible: false,
            current_field: null,
            checkedList: [],
            indeterminate: true,
            checkAll: false,
            nodeNames: []
        }
        this.init = this.init.bind(this)
    }
    async init() {
        if (this.pmStore.current_processkey == '') {
            message.info('必须选择一个流程')
        } else {
            let { selectedRows } = this.props.commonTableStore
            if (selectedRows.length == 0) {
                message.info('必须选择一项')
                return;
            } else {
                this.setState({
                    visible: true
                })
                let NodeData = toJS(this.props.commonTableStore.selectedRows[0])
                let params = {
                    data: {
                        processkey: NodeData.processkey,
                        id: NodeData.id,
                        assigntype: this.props.commonTableStore.action_code
                    },
                    method: 'POST'
                }
                let resp = await api.bpm.getItemAssignInfo(params);
                if (resp.code == 200) {
                    var arr = []
                    for (var i = 0; i < resp.data.length; i++) {
                        arr.push(resp.data[i].nodesid + '')
                    }
                    console.log("分配情况")
                    console.log(arr)
                    this.setState({
                        checkedList: arr
                    })
                    message.success(resp.message)
                }
            }
        }

    }

    onCancel() {
        this.setState({
            checkedList: [],
            visible: false
        })
    }

    //保存节点的配置信息.

    async SaveAssignHandler() {

        let _row = toJS(this.props.commonTableStore.selectedRows[0])

        let _rows = toJS(this.props.commonTableStore.selectedRows)

        let itemids = []

        _rows.map(_tmp_item => {
            itemids.push(_tmp_item.id)
        })





        console.log('选择的节点', this.props.commonTableStore)
        let cfgobj = {
            assigntype: this.props.commonTableStore.action_code,
            itemids: itemids,
            itemid: _row.id, processkey: _row.processkey, processname: _row.processname,
            assigns: this.state.checkedList
        }

        console.log(this.state.checkedList)
        console.log(pmStore.AllNodeName)

        //  将 node_id ,node_name 同时送后台.

        let combine = []

        this.state.checkedList.map(node_id => {

            let _tmp = {}
            _tmp.nodesid = node_id;

            var found_node = pmStore.AllNodeName.find(function(xnode) {
                return xnode.id == node_id;
            });

            _tmp.nodename = found_node.name
            combine.push(_tmp)
        }
        )


        cfgobj.assigns_combine = combine
        let params = { data: { ...cfgobj }, method: 'POST' };
        console.log(params)


        let res = await api.processmanager.saveItemAssign(params);
        if (res.code == 200) {
            message.success(res.message, 0.5)
        }


    }

    onChangeSelectNode = checkedList => {

        console.log(checkedList)

        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && checkedList.length < this.state.nodeNames.length,
            checkAll: checkedList.length === this.state.nodeNames.length,
        });
    };

    onCheckAllChange = e => {
        let nodeNames = this.getAllCheckedValue();


        this.setState({
            checkedList: e.target.checked ? nodeNames : [],
            indeterminate: false,
            checkAll: e.target.checked,
        });
    };

    getAllCheckedValue() {
        return pmStore.AllNodeName.map(item => item.id)
    }

    render() {

        let { selectedRows } = this.props.commonTableStore

        console.log(pmStore)
        let nodeNames = pmStore.AllNodeName;
        console.log(toJS(nodeNames))




        return (

            selectedRows.length > 0 ?

                <Modal
                    visible={ this.state.visible }
                    destroyOnClose={ true }
                    onCancel={ () => this.onCancel() }
                    onOk={ () => this.SaveAssignHandler() }
                    style={ { width: '400px' } }
                    title="节点权限分配查看" >

                    <div>
                        <div style={ { borderBottom: '1px solid #E9E9E9', margin: '10px' } }>
                            <div className="field_msg">
                                <Descriptions title="元素" size={ "middle" } bordered>
                                    <Descriptions.Item key={ "x1" } label="ID">{ selectedRows[0].id }</Descriptions.Item>
                                    <Descriptions.Item key={ "x2" } label="字段">{ selectedRows[0].fieldtitle }</Descriptions.Item>
                                    <Descriptions.Item key={ "x3" } label="Fieldid">{ selectedRows[0].id }</Descriptions.Item>
                                    <Descriptions.Item key={ "x4" } label="memo">{ selectedRows[0].memo }</Descriptions.Item>
                                </Descriptions>
                            </div>
                        </div>
                        <br />
                        <Checkbox
                            indeterminate={ this.state.indeterminate }
                            onChange={ this.onCheckAllChange }
                            checked={ this.state.checkAll }
                        >
                            选择所有
                       </Checkbox>
                        <br /><br />
                        <CheckboxGroup
                            value={ this.state.checkedList }
                            onChange={ this.onChangeSelectNode }>

                            {
                                nodeNames.length > 0 ?
                                    nodeNames.map((item, index) => {
                                        return (
                                            <Checkbox style={ { width: '180px', marginLeft: '10px' } } key={ index } value={ item.id }>{ item.name }</Checkbox>
                                        )
                                    })
                                    :
                                    null
                            }
                        </CheckboxGroup>

                    </div>
                </Modal >
                : null
        )

    }
}


