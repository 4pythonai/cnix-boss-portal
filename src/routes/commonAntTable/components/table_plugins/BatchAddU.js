import React from 'react';
import { observer } from 'mobx-react';
import api from '@/api/api';
import { message } from 'antd';
import { Modal, Badge, Button } from 'antd';

@observer
export default class BatchAddU extends React.Component {
    constructor(props) {
        super(props);
        // this.batchAddU = this.batchAddU.bind(this);
    }

    state = {
        visible: false,
        u_number: 0,
        cabinet_id: 0
    };

    init() {
        if (this.props.commonTableStore.selectedRows.length != 1) {
            message.error('请选择一个机柜');
            return;
        }

        let _tmprec = this.props.commonTableStore.selectedRows[0];
        console.log(_tmprec);
        this.setState({ u_number: _tmprec.u_number, cabinet_id: _tmprec.id });
        this.showModal();
        // this.getSwSummary(_tmprec.id);
    }

    showModal = () => {
        this.setState({
            visible: true
        });
    };

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false
        });
    };

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false
        });
    };

    batchAddU = async () => {
        console.log('批量添加U位');
        console.log(this.state.u_number);
        console.log(this.state.cabinet_id);
        let params = {
            data: { cabinet_id: this.state.cabinet_id, u_number: this.state.u_number },
            method: 'POST'
        };

        let resp = await api.device.batchAddU(params);
        // alert(resp.message);
    };

    render() {
        return (
            <Modal visible={this.state.visible} title={'批量增加U位'} onOk={this.handleOk} onCancel={this.handleCancel} width={1320}>
                <div style={flexGrid}>
                    U位数量:{this.state.u_number}
                    <Button style={{ margin: '10px' }} type="danger" onClick={this.batchAddU}>
                        批量添加U位
                    </Button>
                </div>
            </Modal>
        );
    }
}

const flexGrid = {
    fontSize: '8',
    width: '1300px',
    marginTop: '12px',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start'
};
