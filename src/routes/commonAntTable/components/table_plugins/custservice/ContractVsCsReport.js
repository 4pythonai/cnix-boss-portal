import React, { useState } from "react";
import { Modal, Table, message } from "antd";
import api from '@/api/api'



export default class ContractVsCsReport extends React.Component {
    constructor(props) {
        super(props);
        this.commonTableStore = props.commonTableStore;
        this.state = {
            data: []
        };
        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    async componentDidMount() {
        // let params={
        //     data:{},
        //     method:'POST'
        // }
        // let res=await api.custservice.cs_vs_contract_report(params)
        // console.log('fetch data.....')
        // if(res.code==200){
        //     this.setState({
        //         data:res.data
        //     })
        // }
    }



    init() {
        console.log('init.....')

        let staffname_session = JSON.parse(sessionStorage.getItem('userInfo')).staff_name
        if (staffname_session == '王晓来') {
            this.showModal();
        } else {
            message.info('查看权限只对王晓来开放')

        }
    }


    async showModal() {
        let params = {
            data: {},
            method: 'POST'
        }
        let res = await api.custservice.cs_vs_contract_report(params)
        console.log('fetch data.....')
        if (res.code == 200) {
            this.setState({
                data: res.data
            })
        }

        this.setState({
            visible: true,
        });
    }

    handleCancel() {
        this.setState({
            visible: false,
        });
    }




    render() {
        let columns = [
            {
                title: '姓名',
                dataIndex: 'serviceuser',
                key: 'serviceuser'
            },
            {
                title: '合同数量',
                dataIndex: 'total',
                key: 'total'
            },
            {
                title: '合同合计金额',
                dataIndex: 'sum',
                key: 'sum'
            }
        ]

        return (
            <div>
                <Modal
                    title="客服分配情况查看"
                    onOk={ this.handleCancel }
                    onCancel={ this.handleCancel }
                    okText="确定"
                    cancelText="取消"
                    width="600px"
                    visible={ this.state.visible }
                    className="inquiremodal"
                >
                    <Table pagination={ false } dataSource={ this.state.data } columns={ columns } bordered></Table>

                </Modal>
            </div>
        );
    }
}