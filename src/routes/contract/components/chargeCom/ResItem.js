import React from 'react'
import { observer, inject } from "mobx-react";
import ChargeTable from './ChargeTable'
import { Button, Statistic, Card, Modal, Popover } from 'antd';
import ChargeModal from './chargeModal'
import BillingSummary from '../billingSummary'

@inject("chargeStore")
@inject("billingSummaryStore")
@observer

export default class ResItem extends React.Component {
    constructor(props) {
        super(props);
        this.store = props.chargeStore;
        this.billingSummaryStore = props.billingSummaryStore;
    }

    componentWillUnmount() {
        this.store.clearStore();
    }

    setChargeFeeTypeRowSpan(text, row, index) {
        let row_cfg = {
            children: text,
            props: {},
        };
        if (this.store.cycleFeeCount == 0) {
            row_cfg.props.rowSpan = index == 0 ? this.store.chargeShowListData.length : 0;
        }


        if (this.store.cycleFeeCount != 0) {
            if (index == 0) {
                row_cfg.props.rowSpan = this.store.cycleFeeCount;
            }
            if (index > 0 && index <= this.store.cycleFeeCount) {
                row_cfg.props.rowSpan = 0;
            }

            if (index == this.store.cycleFeeCount) {
                row_cfg.props.rowSpan = this.store.chargeShowListData.length - this.store.cycleFeeCount;
            }
            if (index > this.store.cycleFeeCount) {
                row_cfg.props.rowSpan = 0;
            }
        }
        return row_cfg;
    }

    getColumns() {
        let delButton = {
            title: '操作',
            dataIndex: '',
            width: this.props.source == 'contractList' ? 170 : 150,
            key: 'operation',
            fixed: 'right',
            render: (text, record) => this.getOptions(record)
        }

        return this.props.isShowOption ? [...this.props.columns, delButton] : this.props.columns;

    }

    renderMore(text, record, title, count) {
        return <Popover title={title} content={text} >
             <span className="lookMore">{text.length > count ? text.slice(0, count) + '...': text }</span>
        </Popover>
    }

    getChargeColumns() {
        let columnbegin = [
            {
                title: '收费类型',
                dataIndex: 'charge_fee_type',
                key: 'charge_fee_type',
                width: 150,
                fixed: 'left',
                render: (text, row, index) => this.setChargeFeeTypeRowSpan(text, row, index)
            }]

        let singleSum = [{
            title: '合计',
            dataIndex: 'sub_summary',
            key: 'sub_summary',
            width: 150,
            render: (text, row, index) => this.setChargeFeeTypeRowSpan(text, row, index)
        }, {
            title: '单项合计',
            dataIndex: 'row_summary',
            key: 'row_summary',
            width: 150,
        }];

        let columnend = [
            {
                title: '收费项',
                dataIndex: 'resname',
                key: 'resname',
                width: 150,
            },
            {
                title: '单价',
                dataIndex: 'price',
                key: 'price',
                width: 150,
            },

            {
                title: '数量',
                dataIndex: 'num',
                key: 'num',
                width: 100
            }, {
                title: '所在机房',
                dataIndex: 'loc',
                key: 'loc',
                width: 150,
            },
            {
                title: '详细信息',
                dataIndex: 'description',
                key: 'description',
                render: (text, record) => this.renderMore(text, record, '详细信息', 15)
            },
            {
                title: '备注',
                dataIndex: 'memo',
                key: 'memo',
                width: 150,
                render: (text, record) => this.renderMore(text, record, '备注', 8)
            }
        ]
        if (this.props.contract_type == '固定合同') {
            return [...columnbegin, ...singleSum, ...columnend]
        }

        return [...columnbegin, ...columnend]
    }

    render() {
        let scrollx = this.props.contract_type == '固定合同' ? 1350 : 1050;
        return (
            <article id="chargeTable" style={{ position: 'relative' }}>
                <Card title='收费项'>
                    <div className="charge_add_group">
                        {
                            this.props.disabled || <Button onClick={() => this.store.addChargeBtnHandle('周期性费用')} > 添加周期性费用项 </Button>
                        }

                        {
                            this.props.disabled || <Button
                                onClick={() => this.store.addChargeBtnHandle('一次性费用')}
                                style={{ marginLeft: '10px' }}> 添加一次性费用项 </Button>
                        }

                        <Button
                            onClick={() => this.billingSummaryStore.showBillingModal()}
                            style={{ marginLeft: '10px' }}> 查看费用详情 </Button>
                    </div>

                    <div className='chargeTableWrapper'>
                        <ChargeTable
                            disabled={this.props.disabled}
                            scroll={{ x: scrollx }}
                            editChargeRow={this.store.editChargeRow}
                            deleteChargeRow={this.store.deleteChargeRow}
                            columns={this.getChargeColumns()}
                        />
                        {
                            this.props.contract_type == '固定合同'
                                ?
                                <Statistic className="chargeSumPrice" title="总计" value={this.store.chargeSumPrice + '元'} />
                                :
                                ''
                        }

                    </div>
                </Card>

                <ChargeModal />
                <Modal
                    width={800}
                    title='费用详情'
                    visible={this.billingSummaryStore.billingVisible}
                    onCancel={this.billingSummaryStore.hideBillingModal}
                    onOk={this.billingSummaryStore.hideBillingModal}
                >
                    <BillingSummary />
                </Modal>
            </article>
        )
    }
}



