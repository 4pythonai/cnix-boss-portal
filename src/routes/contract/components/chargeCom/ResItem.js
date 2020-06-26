import React from 'react'
import { observer, inject } from "mobx-react";
import ChargeTable from './ChargeTable'
import { Button, Statistic, Card, Modal, Popover } from 'antd';
import ChargeModal from './chargeModal'
import AddBillingItems from './addBillingItems'
import { Radio } from 'antd';

import BillingSummary from '../billingSummary'
import ChargeCompare from './chargecompare'

@inject("chargeStore")
@inject("billingSummaryStore")
@inject("IDC_cfg_store")
@observer

export default class ResItem extends React.Component {
    constructor(props) {
        super(props);
        console.log("ResItem------ResItem----------ResItem")

        console.log(props)
        this.chargeStore = props.chargeStore;
        this.billingSummaryStore = props.billingSummaryStore;
        this.IDC_cfg_store = props.IDC_cfg_store;


        this.state = {
            showBillingHelp: false,
        }
        this.hidehelp = this.hidehelp.bind(this)
        this.showhelp = this.showhelp.bind(this)


    }

    componentDidMount() {

        if(this.props.defaultProps.page_source=='add' ){
            
            this.IDC_cfg_store.saveContractData.billingoption ='later'
        }

    }

    onChangeBillingoption = e => {
        console.log('radio checked', e.target.value);

        this.IDC_cfg_store.saveBillingoption(e.target.value)

    };

    hidehelp() {
        this.setState({ showBillingHelp: false })
    }

    showhelp() {
        this.setState({ showBillingHelp: true })
    }

    componentWillUnmount() {
        this.chargeStore.clearStore();
    }

    setChargeFeeTypeRowSpan(text, row, index) {
        let row_cfg = {
            children: text,
            props: {},
        };
        if (this.chargeStore.cycleFeeCount == 0) {
            row_cfg.props.rowSpan = index == 0 ? this.chargeStore.chargeShowListData.length : 0;
        }


        if (this.chargeStore.cycleFeeCount != 0) {
            if (index == 0) {
                row_cfg.props.rowSpan = this.chargeStore.cycleFeeCount;
            }
            if (index > 0 && index <= this.chargeStore.cycleFeeCount) {
                row_cfg.props.rowSpan = 0;
            }

            if (index == this.chargeStore.cycleFeeCount) {
                row_cfg.props.rowSpan = this.chargeStore.chargeShowListData.length - this.chargeStore.cycleFeeCount;
            }
            if (index > this.chargeStore.cycleFeeCount) {
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
            render: (text, record) => this.getOptions(record)
        }

        return this.props.isShowOption ? [...this.props.columns, delButton] : this.props.columns;

    }

    renderMore(text, record, title, count) {
        return <Popover title={ title } content={ text } >
            <span className="lookMore">{ text }</span>
        </Popover>
    }

    getChargeColumns() {
        let columnbegin = [
            {
                title: '收费类型',
                dataIndex: 'charge_fee_type',
                key: 'charge_fee_type',
                width: this.props.canprinter ? 110 : 120,
                fixed: 'left',
                render: (text, row, index) => this.setChargeFeeTypeRowSpan(text, row, index)
            }]

        let singleSum = [{
            title: '合计',
            dataIndex: 'sub_summary',
            key: 'sub_summary',
            width: this.props.canprinter ? 70 : 150,
            render: (text, row, index) => this.setChargeFeeTypeRowSpan(text, row, index)
        }, {
            title: '单项合计',
            dataIndex: 'row_summary',
            key: 'row_summary',
            width: this.props.canprinter ? 90 : 150,
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
                width: this.props.canprinter ? 70 : 80
            },
            //  {
            //     title: '所在机房',
            //     dataIndex: 'loc',
            //     key: 'loc',
            //     width: 300,
            // },
            {
                title: '详细信息',
                dataIndex: 'description',
                key: 'description',
                width: this.props.canprinter ? 190 : ''
            },
            {
                title: '备注',
                dataIndex: 'memo',
                key: 'memo',
                render: (text, record) => this.renderMore(text, record, '备注', 50)
            }
        ]
        if (this.props.contract_type == '固定合同') {
            return [...columnbegin, ...singleSum, ...columnend]
        }

        return [...columnbegin, ...columnend]
    }

    render() {
        let scrollx = this.props.contract_type == '固定合同' ? 1350 : 1050;

        let compareButtonStyle = {
            marginLeft: '10px',
            // visibility: this.props.isShowCompareButton ? "visible": "hidden"
            visibility: this.chargeStore.isShowCompareButton ? "visible" : "hidden"
        }


        return (
            <article id="chargeTable" style={ { position: 'relative' } }>
                <Card title='收费项'>
                    <div className="charge_add_group">
                        {
                            this.props.disabled || <Button onClick={ () => this.chargeStore.addChargeBtnHandle('周期性费用') } > 添加周期性费用项 </Button>
                        }

                        {
                            this.props.disabled || <Button
                                onClick={ () => this.chargeStore.addChargeBtnHandle('一次性费用') }
                                style={ { marginLeft: '10px' } }> 添加一次性费用项 </Button>
                        }

                        <Button
                            onClick={ () => this.billingSummaryStore.showBillingModal() }
                            style={ { marginLeft: '10px' } }> 查看计费依据 </Button>


                        {
                            this.props.disabled || <Button
                                onClick={ () => this.billingSummaryStore.addBillingItemsHandler() }
                                style={ { marginLeft: '10px' } }> 手动设置计费条目 </Button>

                        }

                        {
                            this.props.disabled || <div style={ { display: 'inline', paddingLeft: '20px' } }>



                                <Radio.Group onChange={ this.onChangeBillingoption } value={ this.IDC_cfg_store.saveContractData.billingoption } >
                                    <Radio value={ 'early' }>前置周期计费</Radio>
                                    <Radio value={ 'later' }>后置周期计费</Radio>
                                </Radio.Group>
                                <Button


                                    onClick={ this.showhelp }
                                    style={ { marginLeft: '10px' } }> 查看帮助 </Button>
                                <Modal
                                    title="帮助信息"
                                    onOk={ this.hidehelp }
                                    onCancel={ this.hidehelp }
                                    visible={ this.state.showBillingHelp }
                                >
                                    <h4>设置第一个计费账期的开始与结束</h4>
                                    <p>前置周期计费: <br />
                                       如 一月十八日至一月底(1.18->1.31)
                                    </p>
                                    <p>后置周期计费: <br />
                                    如 一月十八日至二月十七日(1.18->2.17)
                                    </p>
                                </Modal></div>

                        }


                        <Button
                            onClick={ () => this.billingSummaryStore.showchargeModal(this.props.contract_no) }
                            style={ compareButtonStyle }> 机柜预签资源对比 </Button>
                    </div>

                    <div className='chargeTableWrapper'>
                        <ChargeTable
                            disabled={ this.props.disabled }
                            scroll={ this.props.canprinter ? { x: '' } : { x: scrollx } }
                            editChargeRow={ this.chargeStore.editChargeRow }
                            deleteChargeRow={ this.chargeStore.deleteChargeRow }
                            columns={ this.getChargeColumns() }
                        />
                        {
                            this.props.contract_type == '固定合同'
                                ?
                                <Statistic className="chargeSumPrice" title="费用预估" value={ this.chargeStore.chargeSumPrice + '元' } />
                                :
                                ''
                        }

                    </div>
                </Card>

                <ChargeModal />
                <Modal
                    width={ 800 }
                    title='费用详情'
                    visible={ this.billingSummaryStore.billingVisible }
                    onCancel={ this.billingSummaryStore.hideBillingModal }
                    onOk={ this.billingSummaryStore.hideBillingModal }
                >
                    <BillingSummary />
                </Modal>

                <AddBillingItems />

                <Modal
                    width={ 800 }
                    title='机柜预签资源对比'
                    visible={ this.billingSummaryStore.chargeVisible }
                    onCancel={ this.billingSummaryStore.hidechargeModal }
                    onOk={ this.billingSummaryStore.hidechargeModal }
                >

                    <ChargeCompare contract_no={ this.props.contract_no } data={ this.billingSummaryStore.chargeData } />
                </Modal>
            </article>
        )
    }
}






