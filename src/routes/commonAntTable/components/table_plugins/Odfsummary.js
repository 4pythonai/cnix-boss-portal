import CommonTableForm from '../commonTableCom/commonTableForm';
import React from 'react'
import { observer, inject } from "mobx-react";
import CommonModal from '../commonTableCom/commonModal'
import api from '@/api/api'
import { message } from 'antd'
import { Modal, Button, Badge } from 'antd';

@observer
export default class Odfsummary extends React.Component {
    state = {
        visible: false,
        odfusage: [],
        devname: '',

    }

    init() {
        if (this.props.commonTableStore.selectedRows.length != 1) {
            message.error("请选择一条数据！")
            return;
        }

        let _tmprec = this.props.commonTableStore.selectedRows[0]
        console.log(_tmprec)
        this.showModal()
        this.getOdfsummary(_tmprec.id)
    }


    async getOdfsummary(odfid) {
        let params = {
            method: 'post',
            data: { odfid: odfid }
        }
        let res = await api.network.getOdfsummary(params)
        console.log(res)
        this.setState({ odfusage: res.data })
        this.setState({ devname: res.devname })

    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };


    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    hideModal() {

        this.refs.commonModalRef.onCancelHandle()
    }

    renderUsage() {

        console.log(this.state)
        let rows = []

        this.state.odfusage.map(item => {
            rows.push(
                <div style={ w200v2 } key={ item.id } value={ item.id }>

                    <span> <Badge style={ portbadge } count={ item.odfportindex } /> { item.cust }{ item.resid ? 'RESID=>' + item.resid : '' }  </span>
                    <div>{ item.network_text }</div>
                    <div>{ item.memo }</div>
                </div>
            )
        })
        return rows;
    }


    render() {


        return <Modal
            visible={ this.state.visible }
            title={ this.state.devname }
            onOk={ this.handleOk }
            onCancel={ this.handleCancel }
            width={ 1320 }

        >
            <div style={ flowgrid }>
                { this.renderUsage() }
            </div>
        </Modal >
    }
}


const flowgrid = {
    fontSize: '8',
    width: '1300px',
    marginTop: '12px',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start'
}



const w200 = {
    width: '150px',
    fontSize: '12px',
}


const w200v2 = {
    width: '150px',
    height: '180px',
    fontSize: '12px',
    margin: '2px',
    padding: '10px',
    border: '1px solid black',
}

const portbadge = {
    margin: '4px 70px 4px  60px',
}

