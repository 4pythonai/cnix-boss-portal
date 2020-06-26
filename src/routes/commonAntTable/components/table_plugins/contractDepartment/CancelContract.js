import React from 'react';
import { message, Modal } from 'antd'
import api from '@/api/api'

const { confirm } = Modal;

export default class CancelContract extends React.Component {
    constructor(props) {
        super(props)
        this.init = this.init.bind(this)
        this.state = {
            visible: false,
        }
    }

    init() {
        if (this.props.commonTableStore.selectedRowKeys.length != 1) {
            message.warning('请选择一条数据');
            return;
        }

        confirm({
            title: '撤销',
            content: '您确定要撤销这条数据么？',
            onOk: async ()=> {
              let params = {
                  data: {
                      action_code: this.props.commonTableStore.action_code,
                      id: this.props.commonTableStore.selectedRows[0].id,
                      concat: this.props.commonTableStore.selectedRows[0].concat ? this.props.commonTableStore.selectedRows[0].concat : '',
                  },
                  method: 'POST'
              };
              let res = await api.contractManage.updateContractStatus(params)
              if(res.code == 200){
                this.props.refreshTable();
              }
            }
          });

    }


    render() {
        return null
    }
}