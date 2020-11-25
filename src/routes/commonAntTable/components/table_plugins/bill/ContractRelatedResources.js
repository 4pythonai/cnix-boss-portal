
import React from 'react'
import {Modal,message,Table} from 'antd';
import api from '@/api/api'
import {toJS} from 'mobx'

export default class ContractRelatedResources extends React.Component {
  constructor(props) {
    super(props)
    this.init = this.init.bind(this)
  }


  state = {
    visible: false,
  }

  async init() {
    if(this.props.commonTableStore.selectedRowKeys.length === 0) {
      message.error('请选择一个合同');
      return;
    }

    let current_row = toJS(this.props.commonTableStore.selectedRows[0])
    let params = {method: 'POST',data: {"contract_no": current_row.contract_no}}
    let json = await api.billing.getContractRelatedResources(params);
    if(json.code === 200) {
      this.setState({visible: true,resources: json.resources})
    } else {
      this.setState({visible: true,resources: []})
    }
  }


  onCancel = () => {
    this.setState({
      visible: false
    })
  }



  createTableByRows = () => {

    if(!this.state.visible) {
      return;
    }



    const cols = [
      {
        title: '资源项ID',
        dataIndex: 'resid',
        key: 'resid',
      },
      {
        title: '产品子类',
        dataIndex: 'sub_category_name',
        key: 'sub_category_name',
      },
      {
        title: '产品全称',
        dataIndex: 'full_product_name',
        key: 'full_product_name',
      },
      {
        title: '资源详情',
        dataIndex: 'network_text',
        key: 'network_text',
      },
      {
        title: '计费开始时间',
        dataIndex: 'billingdate',
        key: 'billingdate',
      },
      {
        title: '计费结束时间',
        dataIndex: 'closedate',
        key: 'closedate',
      },

      {
        title: '备注',
        dataIndex: 'meno',
        key: 'meno',
      },

      {
        title: '资源价格(框架)',
        dataIndex: 'frameprice',
        key: 'frameprice',
      },

      {
        title: '资源价格(占用)',
        dataIndex: 'resprice',
        key: 'resprice',
      },

      {
        title: '备注',
        dataIndex: 'memo',
        key: 'memo'
      }
    ]


    return (
      <div>
        <Table
          dataSource={this.state.resources}
          columns={cols}
          size="small"
          style={{marginBottom: '20px',marginLeft: '10px'}}
        />
      </div>
    )
  }






  getModalProps() {
    return {
      width: 1800,
      destroyOnClose: true,
      ref: "billrpt",
      title: '资源价格情况',
      bodyStyle: {
        width: 1800,
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
    let modalProps = this.getModalProps();
    return <Modal {...modalProps}>
      <div>
        <div style={{margin: '10px'}}>资源明细:<br /></div>
        {
          this.createTableByRows()
        }

      </div >
    </Modal >
  }
}
