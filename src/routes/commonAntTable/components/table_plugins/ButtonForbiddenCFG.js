// import React from 'react';
// import { Modal, message, Button, Checkbox } from 'antd';
// import api from '@/api/api';
// import { useEffect, useState } from 'react';
// const CheckboxGroup = Checkbox.Group;

// const ForbiddenCFG = (props) => {
//     const [forbiddens, setForbiddens] = useState([]);
//     const [roles, setRoles] = useState([]);

//     const saveForbidden = async () => {
//         console.log(forbiddens);
//         console.log(props.act_code);
//         console.log(props.assignid);
//         let params = { data: { act_code: props.act_code, assignid: props.assignid, forbiddens: forbiddens }, method: 'POST' };
//         await api.permission.saveForbiddenBtns(params);
//     };

//     const initRolesAndForbiddens = async () => {
//         let params = { data: { act_code: props.act_code, currentPage: 1, pageSize: 10000 }, method: 'POST' };
//         let res = await api.permission.getActRoleList(params);

//         let tmp = [];
//         res.roles.map((item, index) => {
//             tmp.push(item.role_code);
//         });
//         setRoles(tmp);

//         params = { data: { act_code: props.act_code, assignid: props.assignid }, method: 'POST' };
//         res = await api.permission.getBtnForbiddens(params);

//         tmp = [];
//         res.data.map((item, index) => {
//             tmp.push(item.role_code);
//         });
//         setForbiddens(tmp);
//     };

//     const deb3 = (x, y) => {
//         console.log(x, y);

//         setForbiddens();
//     };

//     useEffect(() => {
//         initRolesAndForbiddens();
//     }, [props.visible]);

//     return (
//         <div>
//             {props.assignid}
//             {props.act_code}
//             {props.button_code}

//             <CheckboxGroup value={forbiddens} onChange={deb3}>
//                 {roles.map((item, index) => {
//                     return (
//                         <Checkbox style={{ width: '180px', marginLeft: '10px' }} key={index} value={item.role_code}>
//                             {item.role_name}
//                         </Checkbox>
//                     );
//                 })}
//             </CheckboxGroup>

//             <CheckboxGroup options={plainOptions} value={this.state.checkedList} onChange={this.onChange} />

//             <br />
//             <br />

//             <Button onClick={saveForbidden}>保存</Button>
//         </div>
//     );
// };

// export default class ButtonForbiddenCFG extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             assignid: -1,
//             act_code: '',
//             visible: false,
//             button_code: ''
//         };
//         this.init = this.init.bind(this);
//     }

//     onCancel() {
//         this.setState({ visible: false });
//     }

//     init() {
//         if (this.props.commonTableStore.selectedRows.length != 0) {
//             let _srow = this.props.commonTableStore.selectedRows[0];
//             console.log(_srow);
//             this.setState({
//                 assignid: _srow.id,
//                 visible: true,
//                 act_code: _srow.act_code,
//                 button_code: _srow.button_code
//             });
//         } else {
//             message.error('请选择一个按钮');
//         }
//     }

//     render() {
//         return (
//             <Modal okText={'关闭'} visible={this.state.visible} onCancel={() => this.onCancel()} style={{ width: '400px' }} title="设置角色禁用按钮">
//                 <div>
//                     <ForbiddenCFG visible={this.state.visible} button_code={this.state.button_code} act_code={this.state.act_code} assignid={this.state.assignid} />
//                 </div>
//             </Modal>
//         );
//     }
// }

import React from 'react';
import { Modal, Descriptions, message, Checkbox } from 'antd';
import { observer } from 'mobx-react';
import api from '@/api/api';

import { toJS } from 'mobx';
const CheckboxGroup = Checkbox.Group;

export default class ButtonForbiddenCFG extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            checkedList: [],
            indeterminate: true,
            checkAll: false,
            roles: []
        };
        this.init = this.init.bind(this);
    }

    async init() {
        let { selectedRows } = this.props.commonTableStore;
        if (selectedRows.length == 0) {
            message.info('必须选择一个按钮');
            return;
        }

        this.setState({
            visible: true
        });
        let NodeData = toJS(this.props.commonTableStore.selectedRows[0]);
        console.log(NodeData);

        let params = { data: { act_code: NodeData.act_code, currentPage: 1, pageSize: 10000 }, method: 'POST' };
        let resp = await api.permission.getActRoleList(params);
        this.setState({ roles: resp.roles });

        params = { data: { act_code: NodeData.act_code, assignid: NodeData.id }, method: 'POST' };
        resp = await api.permission.getBtnForbiddens(params);
        if (resp.code == 200) {
            var arr = [];
            for (var i = 0; i < resp.rows.length; i++) {
                arr.push(resp.rows[i].role_code);
            }
            this.setState({
                checkedList: arr
            });
        }
    }

    onCancel() {
        this.setState({
            checkedList: [],
            visible: false
        });
    }

    // 按钮,  配置为某个角色不可见

    async saveBtnFobiddenRoles() {
        let _row = toJS(this.props.commonTableStore.selectedRows[0]);
        console.log(_row);
        let cfgobj = {
            act_code: _row.act_code,
            assignid: _row.id,
            button_code: _row.ghost_button_code,
            forbiddens: this.state.checkedList
        };
        let params = { data: { ...cfgobj }, method: 'POST' };
        console.log(params);
        let res = await api.permission.saveForbiddenBtns(params);
        if (res.code == 200) {
            message.success(res.message, 0.5);
        }
    }

    onChangeSelectNode = (checkedList) => {
        console.log(checkedList);

        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && checkedList.length < this.state.roles.length
        });
    };

    render() {
        let { selectedRows } = this.props.commonTableStore;
        return (
            <Modal
                visible={this.state.visible}
                bodyStyle={{ width: '840px', overflow: 'auto', bottom: 0 }}
                destroyOnClose={true}
                onCancel={() => this.onCancel()}
                onOk={() => this.saveBtnFobiddenRoles()}
                title="按钮禁用设置"
                width={840}>
                <div style={{ width: '800px' }}>
                    <div style={{ borderBottom: '1px solid #E9E9E9', width: '800px', margin: '10px' }}>
                        <div className="field_msg">
                            <Descriptions title="按钮" size={'middle'} bordered>
                                <Descriptions.Item key={'x1'} label="ID">
                                    {selectedRows[0].id}
                                </Descriptions.Item>
                                <Descriptions.Item key={'x2'} label="button_code">
                                    {selectedRows[0].button_code}
                                </Descriptions.Item>
                            </Descriptions>
                        </div>
                    </div>
                    <div>选中的角色将看不到此按钮</div>
                    <br />
                    <CheckboxGroup value={this.state.checkedList} onChange={this.onChangeSelectNode}>
                        {this.state.roles.map((item, index) => {
                            return (
                                <Checkbox style={{ width: '180px', marginLeft: '10px' }} key={index} value={item.role_code}>
                                    <div>
                                        {item.role_code}/{item.role_name}
                                        <br />
                                    </div>
                                </Checkbox>
                            );
                        })}
                    </CheckboxGroup>
                </div>
            </Modal>
        );
    }
}
