import React from 'react';
import { Modal, message } from 'antd';
import CommonTable from '@/routes/commonAntTable/components/commonTableCom/commonTable';
import api from '@/api/api';

export default class AssignCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.store = props.commonTableStore;
        this.state = {
            visible: false,
            selectedRows: []
        };
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    async init() {
        console.log(77777, this.store);
        if (this.store.selectedRows.length != 1) {
            message.error('请选择一条数据');
            return;
        }
        this.setState({
            visible: true
        });
    }
    async handleOk() {
        if (this.state.selectedRows.length != 0) {
            let customerserviceid = [];
            for (var i = 0; i < this.state.selectedRows.length; i++) {
                customerserviceid.push(this.state.selectedRows[i].id);
            }
            let data = { actcode: this.store.action_code, id: this.store.selectedRows[0].id, customerserviceid: customerserviceid };
            let params = { data: data, method: 'POST' };
            let res = await api.custservice.setContractCustomerService(params);
            if (res.code == 200) {
                this.setState({
                    visible: false
                });
                this.props.refreshTable();
            }
        } else {
            message.error('您还没有选择客服，请选择');
        }
    }
    handleCancel() {
        this.setState({
            visible: false
        });
    }
    sendData(selectedRows) {
        this.setState({
            selectedRows: selectedRows
        });
    }
    render() {
        return (
            <Modal title="客服人员列表：" onOk={this.handleOk} onCancel={this.handleCancel} width="600px" visible={this.state.visible}>
                <CommonTable ref="commonTableRef" key="custservicers" action_code="custservicers" sendData={(res) => this.sendData(res)} />
            </Modal>
        );
    }
}
