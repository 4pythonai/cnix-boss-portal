import React from 'react'
import { inject, observer } from 'mobx-react'
import { Form, Input, Card, DatePicker, Divider, Modal, Button, message, Row, Col } from 'antd';
import BillingItem from './BillingItem'
import { toJS } from 'mobx'

import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
@inject('billingSummaryStore')
@inject("chargeStore")
@inject("IDC_cfg_store")

@observer
export default class AddBillingItems extends React.Component {
    constructor(props) {
        super()
        this.billingSummaryStore = props.billingSummaryStore
        this.chargeStore = props.chargeStore
        this.IDC_cfg_store = props.IDC_cfg_store

    }


    render() {
        console.log(toJS(this.billingSummaryStore))
        console.log(toJS(this.chargeStore))
        console.log(toJS(this.IDC_cfg_store))

        return (
            <div>


                <Modal
                    title='设置计费条目'
                    width={ 1360 }
                    closable={false}
                    bodyStyle={
                        {
                            minHeight: '650px'
                        }
                    }
                    destroyOnClose={ true }
                    maskClosable={ true }
                    visible={ this.billingSummaryStore.addBillingItemsVisible }
                    footer={[
                        <Button type="primary"   onClick={ this.billingSummaryStore.hideBillingItemsModal  }> 关闭 </Button>]}
            
                    >

                    <Card title="使用指南" style={ { width: 1310 } }>
                        <p>如果设置了计费条目,则合同总额会以所有设置项的合计为准,系统计费产生的结果只作为参考用.
                        如果仍然想使用系统自动计算的结果为准,请"取消设置"所有条目
                        </p>
                        <p>本功能只在合同编辑阶段可以使用
                        </p>
                        <p>如果您正在生成新合同,请保存合同后,再回这里进行编辑
                        </p>
                    </Card>
                    { this.IDC_cfg_store.page_source == 'add' ? (
                        <div style={ { marginTop: '40px', textAlign: 'center', color: 'red', 'fontSize': '29px' } }>请先保存合同后,再回来手工设置收费项</div>
                    ) : (
                            <BillingItem />
                        ) }
                </Modal>
            </div>
        );
    }
}