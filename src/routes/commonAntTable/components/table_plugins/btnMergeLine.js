import React from 'react';
import { message } from 'antd'
import navigationStore from '@/store/navigationStore'


export default class BtnMergeLine extends React.Component {
    constructor(props) {
        super(props)
    }

    init() {
        if (this.props.commonTableStore.selectedRowKeys.length != 1) {
            message.error('请选择一条数据');
            return;
        }else if(navigationStore.currentMenu.process_key!='merge_line'&&this.props.commonTableStore.selectedRows[0].processDefinitionKey!='merge_line'){
            message.error('请选择端对端待办工单')
            return
        }

     
    }

    render() {
        return null
    }
}