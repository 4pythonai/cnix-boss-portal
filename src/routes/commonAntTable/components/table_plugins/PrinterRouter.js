import React from 'react'
import { toJS } from 'mobx'

import api from '@/api/api'
import { hashHistory } from "react-router";

import { Form,message,Input,Menu, Icon, Dropdown, Modal } from 'antd';




export default class PrinterRouter extends React.Component {
    constructor(props) {
        super(props);
        this.commonTableStore = props.commonTableStore;

        this.state = {

        };
        this.init = this.init.bind(this);
    }

    async init() {
        if (this.props.commonTableStore.selectedRows.length != 1) {
            message.error("请选择一条数据");
            return;
        }

        let current = this.props.commonTableStore.selectedRows[0]
        console.log(this.props.commonTableStore.selectedRows)


        console.log(toJS(current))



        



        let contract_action = 'noteset'
        
        
        // alert( toJS(current).processDefinitionKey ) 

        if ( toJS(current).processDefinitionKey == 'idc_order') {
            contract_action = "IDCReceiveContract";

        }

        if (toJS(current).processDefinitionKey == 'idc_order_payment') {
            contract_action = "IDCPaymentsContract";
        }
        if (toJS(current).processDefinitionKey == 'idc_order_stop') {
            contract_action = "idc_order_stop";
        }
        if (toJS(current).processDefinitionKey == 'sales_con_tovoid_app') {
            contract_action = "sales_con_tovoid_app";
        }
        
        if (contract_action == 'noteset') {
            message.info('只支持合同助理人员合同打印功能')
            return;
            
        }
        
        let params = {
            data: {
                process_key: current.processDefinitionKey,
                uuid: current.uuid,
            },
            method: 'POST'
        };

        let res = await api.contract_api.getContractByUUID(params);
        console.log('合同详情:')
        console.log(res.data)

        let ifvip = res.data.ifvip
        
        


        if (contract_action == 'noteset') {
            message.info('暂时不支持这种类型的打印')
        } else if(contract_action == 'idc_order_stop'||contract_action=='sales_con_tovoid_app'){
         let data = {
            process_key: current.processDefinitionKey,
            uuid: current.uuid,
            nodeKey: current.nodeKey,
            readonly: true,
            init_node: 'n',
            action_code: this.commonTableStore.action_code,
            page_source: 'detail', // IDC合同专用开关
            printer:'printer'

        }

        let params = ''
        let keys = Object.keys(data)
        keys.map((key, index) => {
            params += index + 1 === keys.length ? `${ key }=${ data[key] }` : `${ key }=${ data[key] }&`
        })
        let  x_printer_url = window.location.origin + '#/flow/flowdetail?'+params
        window.location.href = x_printer_url;
        }else {
            let  x_printer_url = window.location.origin + '#/contract/detailIDCContract?page_source=detail&uuid=' +
                current.uuid + "&process_key=" + current.processDefinitionKey + "&contract_action=" +contract_action + "&contract_no=" + current.paperno + "&readOnl=y&FirstSigner=false&ifvip=" + ifvip;
            // alert(x_printer_url)
            window.location.href = x_printer_url;


        }


        //     hashHistory.push({ pathname: 'ISP_contract/detailISPContract', state: params });
        // let  idc_order_printer_url ='http://portal.sinnet.com.cn:8503/#/contract/detailIDCContract?page_source=detail&uuid='+
        // current.uuid +"&process_key=idc_order&contract_action=IDCReceiveContract&contract_no="+ current.paperno +"&readOnlyFirstSigner=false&ifvip=%E5%90%A6";





    }

    render() {


        return null
    }


}





