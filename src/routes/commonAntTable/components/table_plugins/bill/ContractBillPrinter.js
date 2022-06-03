
import React from 'react'
import {Modal,message,Table,Divider} from 'antd';
import {observer,inject} from "mobx-react";
import {toJS} from 'mobx'
import ResTimeColumns from './columns/ResTimeColumns'


@inject("billingSummaryStore")

@observer
export default class ContractBillPrinter extends React.Component {
    constructor(props) {
        super(props)
        this.store = props.billingSummaryStore
        this.init = this.init.bind(this)
    }


    state = {
        visible: false,
    }

    async init() {


        if(this.props.commonTableStore.selectedRowKeys.length == 0) {
            message.error('请选择一个账单');
            return;
        }
        let current_row = toJS(this.props.commonTableStore.selectedRows[0])
        console.log(current_row)


        this.setState({visible: true})
        this.setState(current_row)
    }


    onCancel = (e,f) => {
        this.setState({
            visible: false
        })
    }



    createTableByRows = (rowstr) => {

        if(!this.state.visible) {
            return;
        }

        let row = JSON.parse(rowstr)
        let newrow = JSON.stringify(row)
        newrow = JSON.parse(newrow)
        let num = 0
        for(var j = 0;j < newrow.length;j++) {
            num++
            newrow[j]['key'] = num
        }

        return (
            <div>
                <Table
                    dataSource={newrow}
                    columns={ResTimeColumns}
                    size="small"
                    pagination={{
                        hideOnSinglePage: true
                    }}
                    style={{marginBottom: '20px',marginLeft: '10px'}}
                />
            </div>
        )
    }






    getModalProps() {
        return {
            width: 1450,
            destroyOnClose: true,
            ref: "billrpt",
            title: '合同账单详情',
            bodyStyle: {
                width: 1440,
                height: "auto",
                overflow: 'auto',
                bottom: 0
            },
            cancelText: '取消',
            okText: "确定",
            visible: this.state.visible,

            onCancel: () => this.onCancel()
        }
    }






    render() {
        console.log('will render.....')
        let modalProps = this.getModalProps();
        return <Modal {...modalProps}>
            <div>

                <div style={{marginBottom: '5px',fontWeight: 'bold'}}>合同号:{this.state.contract_no}</div>
                <div style={{marginBottom: '5px',fontWeight: 'bold'}}>账期:{this.state.counter}</div>
                <div style={{marginBottom: '5px',fontWeight: 'bold'}}>账期起始:{this.state.periodstart}</div>
                <div style={{marginBottom: '5px',fontWeight: 'bold'}}>账期终止:{this.state.periodend}</div>
                <div style={{marginBottom: '5px',fontWeight: 'bold'}}>费用:{this.state.period_money}元</div>
                <Divider />
                <div style={{margin: '10px'}}>费用明细:<br /></div>

                {
                    this.createTableByRows(this.state.resource_logs)
                }

            </div >
        </Modal >
    }
}
