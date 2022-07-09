import React from 'react';
import { observer } from 'mobx-react';
import api from '@/api/api';
import { message } from 'antd';
import { Modal, Badge } from 'antd';

@observer
export default class SwitchSummary extends React.Component {
    state = {
        visible: false,
        SWprotsUsage: [],
        devname: ''
    };

    init() {
        if (this.props.commonTableStore.selectedRows.length != 1) {
            message.error('请选择一条数据！');
            return;
        }

        let _tmprec = this.props.commonTableStore.selectedRows[0];
        console.log(_tmprec);
        this.showModal();
        this.getSwSummary(_tmprec.id);
    }

    async getSwSummary(swid) {
        let params = {
            method: 'post',
            data: { swid: swid }
        };
        let res = await api.network.getSwSummary(params);
        console.log(res);
        this.setState({ SWprotsUsage: res.data });
        this.setState({ devname: res.devname });
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

    renderUsage() {
        console.log(this.state);
        let rows = [];

        this.state.SWprotsUsage.map((item) => {
            console.log(item);
            let BadgeStyle = item.devstatus == 'using' ? usedportbadge : freeportbadge;

            rows.push(
                <div style={w200v2} key={item.id} value={item.id}>
                    <span>
                        <Badge style={BadgeStyle} count={item.port} /> {item.cust}
                    </span>
                    <div> {item.contract_no} </div>
                    <div>{item.memo}</div>
                </div>
            );
        });
        return rows;
    }

    render() {
        return (
            <Modal visible={this.state.visible} title={this.state.devname} onOk={this.handleOk} onCancel={this.handleCancel} width={1320}>
                <div style={flexGrid}>{this.renderUsage()}</div>
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

const w200v2 = {
    width: '150px',
    height: '180px',
    fontSize: '12px',
    margin: '2px',
    padding: '10px',
    border: '1px solid black'
};

const freeportbadge = {
    backgroundColor: '#52c41a',
    margin: '4px 70px 4px  10px'
};

const usedportbadge = {
    margin: '4px 70px 4px  10px'
};
