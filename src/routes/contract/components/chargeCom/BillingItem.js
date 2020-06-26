import React from 'react'
import { inject, observer } from 'mobx-react'
import { Form, Input, Card, DatePicker, Divider, Modal, Button, message, Row, Col } from 'antd';
import { toJS } from 'mobx'

import api from '@/api/api'
import moment from 'moment';
import 'moment/locale/zh-cn';
import { clone } from '@uform/antd/esm/utils';
moment.locale('zh-cn');


@inject('billingSummaryStore')
@inject("chargeStore")
@inject("IDC_cfg_store")

@observer

class BillingItem extends React.Component {
    constructor(props) {
        super()
        this.saveBillingItem = this.saveBillingItem.bind(this)


        this.IDC_cfg_store = props.IDC_cfg_store
        this.chargeStore = props.chargeStore
        this.billingSummaryStore = props.billingSummaryStore

        this.default_startdate = this.IDC_cfg_store.saveContractData.contract_start_date
        this.default_enddate = this.IDC_cfg_store.saveContractData.contract_end_date
         

        this.state = {

            local_total_money: 0,
            local_manualset_billing_itmes: [],
            local_chargeShowListData: []
        }
    }


    componentWillMount() {


        let that = this
        console.log(toJS(this.chargeStore.chargeShowListData))

        this.chargeStore.chargeShowListData.forEach(function(element) {
            
            console.log(" chargeShowListData  ==>")
            console.log( toJS(element))
            
            element.ifsaved = "未保存";
            // element.startdate = that.default_startdate
            // element.enddate = that.default_enddate
            element.contract_no = that.IDC_cfg_store.saveContractData.contract_no
            element.uuid = that.IDC_cfg_store.uuid
             let target = {}
            const new_element = Object.assign(target, element);
            that.state.local_chargeShowListData.push(new_element)
        });

        this.billingSummaryStore.manualset_billing_itmes.forEach(function(element) {
            let target = {}
            const new_element = Object.assign(target, element);
            that.state.local_manualset_billing_itmes.push(new_element)
        });
        this.compareIfSaved()

    }


    async saveBillingItem(key) {

        let findidx = -1;
        this.state.local_chargeShowListData.forEach(function(element, index) {
            if (element.key == key) {
                findidx = index;
            }
        });
        let params = {
            data: this.state.local_chargeShowListData[findidx],
            method: 'POST'
        }
        let resp = await api.billing.saveBillingItem(params);
        this.getSavedItems()

    }


    async deleteBillingItem(key) {

        let findidx = -1;
        this.state.local_chargeShowListData.forEach(function(element, index) {
            if (element.key == key) {
                findidx = index;
            }
        });

        this.state.local_chargeShowListData[findidx].row_summary = 0;
        this.state.local_chargeShowListData[findidx].sub_summary = 0;


        let params = {
            data: this.state.local_chargeShowListData[findidx],
            method: 'POST'
        }
        let resp = await api.billing.deleteBillingItem(params);
        this.getSavedItems()
    }



    async getSavedItems() {

        let params = {
            data: { contract_no: this.IDC_cfg_store.saveContractData.contract_no },
            method: 'POST'
        }
        let resp = await api.billing.get_manual_billing_items(params);
        console.log(resp)
        
        //set_manualset_billing_itmes
        this.billingSummaryStore.set_manualset_billing_itmes(resp.manualset_billing_itmes)
        this.setState({ local_manualset_billing_itmes: resp.manualset_billing_itmes }, this.compareIfSaved)
    }

 
  
    onChangeMoney = function(e, key) {
        let new_money = event.target.value;
        let that = this

        //修改某个收费项的金额
        this.state.local_chargeShowListData.forEach(function(element, index) {
            if (element.key == key) {
                that.state.local_chargeShowListData[index].row_summary = new_money;
                that.state.local_chargeShowListData[index].sub_summary = new_money;
            }
        });
        // console.log(this.state.local_chargeShowListData)
    }


    compareIfSaved() {
        console.log('比较>>>>>....')
        console.log(this.state.local_chargeShowListData)
        console.log(this.state.local_manualset_billing_itmes)
        const that = this

        let billing_item_counter = 0

        console.log('总金额...')
        let tmp_local_total_money = 0;
        console.log(tmp_local_total_money)


        that.state.local_chargeShowListData.forEach(function(element, index1) {
            // element.key
            that.state.local_chargeShowListData[index1].ifsaved = '未设置'

            that.state.local_manualset_billing_itmes.forEach(function(savedItem, index2) {
                // element.key
                if (element.key == savedItem.itemid) {
                    billing_item_counter++
                    that.state.local_chargeShowListData[index1].ifsaved = '已设置'
                    that.state.local_chargeShowListData[index1].row_summary = that.state.local_manualset_billing_itmes[index2].money
                    that.state.local_chargeShowListData[index1].sub_summary = that.state.local_manualset_billing_itmes[index2].money

                    tmp_local_total_money = tmp_local_total_money + parseFloat(that.state.local_manualset_billing_itmes[index2].money)

                    console.log('总金额.汇总:..' + tmp_local_total_money)

                }
            });
        })



        console.log('比较.结束...')
        this.setState({ local_total_money: tmp_local_total_money })
        this.IDC_cfg_store.saveContractData.contract_money = tmp_local_total_money

        if (billing_item_counter == 0) {
            this.IDC_cfg_store.saveContractData.contract_money = this.chargeStore.chargeSumPrice
        }


    }


    render() {
        console.log(this.state)
        return (
            <Card title={ '计费条目/合同总金额:' + this.state.local_total_money.toFixed(2) }>
                <Row gutter={ [8, 8] }>

                    <Col span={ 2 }>状态</Col>
                    <Col span={ 4 }>收费项</Col>
                    <Col span={ 4 }>单价</Col>
                    <Col span={ 2 }>数量</Col>
                    <Col span={ 3 }>起始日期 </Col>
                    <Col span={ 3 }>结束日期 </Col>
                    <Col span={ 2 }>金额 </Col>
                    <Col span={ 2 }>保存 </Col>
                </Row>
                <Divider />
                { this.state.local_chargeShowListData.map((item, idx) =>
                    <div key={ idx } >
                        <Row gutter={ [8, 8] }>

                            <Col span={ 2 }>
                                <Input value={ item.ifsaved } />
                            </Col>

                            <Col span={ 4 }>
                                <Input value={ item.resname } />
                            </Col>

                            <Col span={ 4 }>
                                <Input value={ item.price } />
                            </Col>

                            <Col span={ 2 }>

                                <Input value={ item.num } />

                            </Col>

                            <Col span={ 3 }>
                                 <Input value={item.itemstart} />
                             </Col>

                            <Col span={ 3 }>
                                <Input value={item.itemend} />

                            </Col>
                            <Col span={ 2 }>


                                <Input defaultValue={ item.row_summary } onChange={ (e) => { this.onChangeMoney(e, item.key) } } />
                            </Col>
                            <Col span={ 1 }>
                                <Button type="primary" onClick={ () => this.saveBillingItem(item.key) }>
                                    设置
                                </Button>
                            </Col>

                            <Col span={ 1 }>
                                <Button style={ { marginLeft: '20px' } } type="primary" onClick={ () => this.deleteBillingItem(item.key) }>
                                    取消设置
                                </Button>
                            </Col>
                        </Row>
                        <Divider />
                    </div>
                )

                }
            </Card>
        )
    }

}

export default Form.create()(BillingItem);