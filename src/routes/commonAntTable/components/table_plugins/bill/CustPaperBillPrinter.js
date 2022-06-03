// PDF pdf  客户账单打印功能

import api from '@/api/api';
import {Button,Divider,message,Modal,Select,Table} from 'antd';
import {toJS} from 'mobx';
import {inject,observer} from 'mobx-react';
import React from 'react';
import './paper_bill_style.scss';
import ResTimeColumns from './columns/ResTimeColumns'
import ABInfo from './ABInfo'
import downloadpdf from '@/utils/Pdfhelper';
@inject('billingSummaryStore')
@observer
export default class CustPaperBillPrinter extends React.Component {
    constructor(props) {
        super(props);
        this.store = props.billingSummaryStore;
        this.init = this.init.bind(this);
    }

    state = {
        visible: false,
        paper_id: 0,
        paperinfo: {},
        custinfo: {},
        zones: [],
        zone: null
    };

    async init() {
        if(this.props.commonTableStore.selectedRowKeys.length === 0) {
            message.error('请选择一个账单');
            return;
        }

        const current_rec = toJS(this.props.commonTableStore.selectedRows[0]);
        const params = {method: 'GET',data: {paperid: current_rec.id}};
        const json = await api.billing.getPaperInfoById(params);

        console.log(json);

        this.setState({
            visible: true,
            custinfo: json.custinfo,
            paperinfo: json.paperinfo
        });

        const json_zone = await api.billing.getZones();
        this.setState({zones: json_zone.zones});
        console.log(this.state);
    }

    onCancel = () => {
        this.setState({
            visible: false
        });
    };


    // 资源使用日志
    expandedLog = (record,index,indent,expanded) => {
        return <Table columns={ResTimeColumns} rowKey="reactkey" rowClassName={'small_table'} dataSource={record.resource_logs} pagination={false} />;
    };

    // 每个合同账单的循环列表
    CreateContractBillItem = (rowstr) => {
        if(!this.state.visible) {
            return;
        }

        const row = JSON.parse(rowstr);
        let newrow = JSON.stringify(row);
        newrow = JSON.parse(newrow);

        let num = 0;
        for(let j = 0;j < newrow.length;j++) {
            num++;
            newrow[j].key = num;
        }

        const cols = [
            {
                title: '合同号',
                dataIndex: 'contract_no',
                key: 'contract_no',
                width: '140px'
            },
            {
                title: '账期开始',
                dataIndex: 'periodstart',
                key: 'periodstart',
                width: '150px'
            },
            {
                title: '账期结束',
                dataIndex: 'periodend',
                key: 'periodend',
                width: '150px'
            },

            {
                title: '账期金额',
                dataIndex: 'period_money',
                key: 'period_money',
                width: '156px'
            },
            {
                title: '调整金额',
                dataIndex: 'adjust_money',
                key: 'adjust_money'
            },
            {
                title: '调整事项',
                dataIndex: 'memo',
                key: 'memo'
            },

            {
                title: '实际金额',
                dataIndex: 'actual_money',
                key: 'actual_money'
            },

            {
                title: '账单类型',
                dataIndex: 'billtype',
                key: 'billtype'
            }
        ];

        return (
            <div>
                <Table
                    dataSource={newrow}
                    columns={cols}
                    size="small"
                    rowClassName={'big_table'}
                    defaultExpandAllRows={true}
                    pagination={false}
                    expandedRowRender={this.expandedLog}
                    style={{marginBottom: '20px',marginLeft: '10px'}}
                />
            </div>
        );
    };

    getModalProps() {
        return {
            width: 1600,
            destroyOnClose: true,
            ref: 'billrpt',
            title: '账单打印',
            bodyStyle: {
                width: 1590,
                height: 'auto',
                overflow: 'auto',
                bottom: 0
            },
            cancelText: '取消',
            okText: '确定',
            visible: this.state.visible,
            onCancel: () => this.onCancel()
        };
    }

    async handleZoneChange(value) {
        console.log(`selected ${value}`);
        let found = null;
        found = this.state.zones.find((element) => element.id === value);
        await this.setState({zone: found});
    }

    // 要打印的主体内容

    show_main_content = () => {
        return (
            <div
                style={{
                    paddingLeft: '15px',
                    paddingTop: '15px'
                }}
                ref="pdf">
                <div
                    style={{
                        marginBottom: '5px',
                        marginLeft: '145px',
                        fontWeight: 'bold',
                        fontFamily: '"Microsoft YaHei", 微软雅黑, monospace'
                    }}>
                    <h1>账单编号:{this.state.paperinfo.paperno}</h1>
                </div>
                <div
                    style={{
                        marginBottom: '5px',
                        marginLeft: '10px',
                        fontWeight: 'bold',
                        color: 'black',
                        fontFamily: '"Microsoft YaHei", 微软雅黑, monospace'
                    }}>
                    总金额:{this.state.paperinfo.total_money}
                </div>
                <div
                    style={{
                        marginBottom: '5px',
                        marginLeft: '10px',
                        fontWeight: 'bold',
                        color: 'black',
                        fontFamily: '"Microsoft YaHei", 微软雅黑, monospace'
                    }}>
                    账单创建时间:
                    {this.state.paperinfo.createdate}
                </div>
                <Divider />

                <ABInfo zone={this.state.zone} custinfo={this.state.custinfo} />
                <Divider />

                <div style={{fontFamily: '"Microsoft YaHei", 微软雅黑, monospace',margin: '10px'}}>
                    费用明细:
                    <br />
                </div>
                {this.CreateContractBillItem(this.state.paperinfo.billsjson)}
            </div>
        );
    };

    render() {
        const modalProps = this.getModalProps();
        const {Option} = Select;
        const sourceList = this.state.zones;

        return (
            <Modal {...modalProps}>
                <div>
                    <div>
                        <Button type="primary"
                            onClick={() => downloadpdf(this.refs.pdf,this.state.paperinfo.paperno + '.pdf')}>
                            下载PDF
                        </Button>
                    </div>

                    <Divider />

                    {sourceList.length == 0 ? (
                        <span></span>
                    ) : (
                        <Select defaultValue={sourceList[0].zone} style={{width: 140}} onChange={this.handleZoneChange.bind(this)}>
                            {sourceList.map((item) => (
                                <Option value={item.id} key={item.id}>
                                    {item.zone}
                                </Option>
                            ))}
                        </Select>
                    )}
                    {this.state.zone && this.state.zone.id ? this.show_main_content() : <div>请选择节点 </div>}
                </div>
            </Modal>
        );
    }
}
