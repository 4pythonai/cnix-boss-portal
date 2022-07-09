import React from 'react';
import { Modal, Table, message, Input } from 'antd';
import api from '@/api/api';
import ResTimeColumns from '@/routes/commonAntTable/components/table_plugins/bill/columns/ResTimeColumns';

export default class TransferContract extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            old: null,
            new: null,
            selectedRows: [],
            indeterminate: true
        };
        this.init = this.init.bind(this);
    }

    async init() {
        this.setState({ selectedRows: [] });
        if (this.props.commonTableStore.selectedRows.length != 0) {
            let _srow = this.props.commonTableStore.selectedRows[0];

            let params = { method: 'POST', data: { contract_no: _srow.contract_no } };
            let json = await api.billing.getContractRelatedResourcesAll(params);
            if (json.code === 200) {
                this.setState({ selectedRows: [], old: _srow.contract_no, visible: true, resources: json.resources });
            } else {
                this.setState({ selectedRows: [], old: _srow.contract_no, visible: true, resources: [] });
            }
        } else {
            message.error('请选择一个合同');
        }
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({ selectedRows: [] });
    };

    onCancel() {
        this.setState({
            visible: false
        });
    }

    //转移合同号
    async TransferContract() {
        var ids = this.state.selectedRows.map(function (a) {
            return parseInt(a.id);
        });

        console.log('选择的数据ids: ', ids);
        let params = { data: { new: this.state.new, old: this.state.old, ids: ids }, method: 'POST' };
        let json = await api.billing.transferContract(params);
        console.log(json);
    }

    onChangeNew = (newcontract) => {
        this.setState({ new: newcontract });
    };

    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log('选择的数据rows: ', selectedRows);
            this.setState({ selectedRows: selectedRows });
        },

        onSelectAll: (selected, selectedRows, changeRows) => {
            console.log(selected, selectedRows, changeRows);
        }
    };

    render() {
        return (
            <Modal destroyOnClose={true} visible={this.state.visible} onCancel={() => this.onCancel()} onOk={() => this.TransferContract()} width="1100" title="合同转移">
                <div style={{ paddingLeft: '10px' }}>
                    <p style={{ color: 'red' }}>将老合同号[{this.state.old}]下面的计费项转移到新合同号:</p>
                    <p style={{ color: 'red' }}>转移后的资源转占用项计费时间将被清空</p>
                    <p style={{ color: 'red' }}>转移后的资源转占用项资源编号将被清空</p>
                    <br />
                    <br />
                    新合同号: <Input style={{ width: '200px' }} onChange={(e) => this.onChangeNew(e.target.value)} />
                    <br />
                    <div style={{ marginTop: '10px' }}>
                        <Table
                            pagination={false}
                            rowKey="id"
                            rowSelection={this.rowSelection}
                            dataSource={this.state.resources}
                            columns={ResTimeColumns}
                            size="small"
                            style={{ marginBottom: '20px' }}
                        />
                    </div>
                </div>
            </Modal>
        );
    }
}
