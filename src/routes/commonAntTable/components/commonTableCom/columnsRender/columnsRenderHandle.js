import React from 'react'
import { Tag, Icon } from 'antd'
import {
    hashHistory
} from 'react-router'
import api from '@/api/api'

class ColumnsHandle {
     async bpmProcessFromNotify(event, record,store) {
         let jsondata=JSON.parse(record.route_json)
         let data = {
            process_key: jsondata.process_key,
            uuid: jsondata.uuid,
            nodeKey: null,
            readonly: true,
            init_node: 'n',
            action_code: store.action_code,
            page_source: 'detail', // IDC合同专用开关

        }

        let params = ''
        let keys = Object.keys(data)
        keys.map((key, index) => {
            params += index + 1 === keys.length ? `${ key }=${ data[key] }` : `${ key }=${ data[key] }&`
        })

        let new_url = `/#/flow/FlowDetail?${ params }`

        window.open(new_url, '_blank')
        let parames = {
            data: {
                selectedRowKeys: [record.id]
            },
            method: 'POST'
        }
        let res = await api.notify.saveReadNotify(parames)
        if(res.code == 200){
          
        }
    }
    notifyContentRender(text, record,store) {
        return <div style={ { cursor: 'pointer', color: '#409eff' } } onClick={ event => this.bpmProcessFromNotify(event, record,store) }>{ text }</div>
    }
    splitDate(text, record) {
        if (!text) {
            return text
        }
        let arr = text.split(' ')
        return arr[0]
    }
    renderTag(text, record) {
        if (text == 'y') {
            return <Tag color="#108ee9">已读</Tag>
        }
        if (text == 'n') {
            return <Tag color="volcano">未读</Tag>
        }
    }
    renderVIP(text, record) {
        if (text == '是') {
            return <Icon type="star" theme="filled" style={ { color: '#e80d11' } } />
        }
        if (text == '否') {
            return null
        }
    }
    renderMergeLine(text, record, store) {
        if (String(text).indexOf('merge_line') != -1) {
            return <span style={ { color: "#409eff", cursor: 'pointer' } } onClick={ event => this.jumpflowdetail(event, record, store) }><Icon type="star" theme="filled" style={ { color: '#e80d11' } } /><span>{ text.substring(12) }</span></span>
        } else {
            return <span style={ { color: "#409eff", cursor: 'pointer' } } onClick={ event => this.jumpflowdetail(event, record, store) }>{ text }</span>
        }
    }
    renderapprove(text, record, store){ 
        if (String(text).indexOf('merge_line') != -1) {
            return <span style={ { color: "#409eff", cursor: 'pointer' } } onClick={ event => this.jumpflowform(event, record, store) }><Icon type="star" theme="filled" style={ { color: '#e80d11' } } /><span>{ text.substring(12) }</span></span>
        }else{
            return <span style={ { color: "#409eff", cursor: 'pointer' } } onClick={ event => this.jumpflowform(event, record, store) }>{ text }</span>
        }
           
    }
    rendercontractreceive(text, record, store){
        return <span style={ { color: "#409eff", cursor: 'pointer' } } onClick={ event => this.jumpcontractreceivedetail(event, record, store) }>{ text }</span>
    }
    rendercontractpayment(text, record, store){
        return <span style={ { color: "#409eff", cursor: 'pointer' } } onClick={ event => this.jumpcontractpaymentdetail(event, record, store) }>{ text }</span>
    }
    yesOrNoHandle(text, record) {
        if (!text) {
            return null
        }
        return text === 'y' ? '是' : '否'
    }


    filterSensitiveCustomer(text, record) {
        if (!text) {
            return null
        }
        if (text.length <= 6) {
            return text
        }
        let lastString = text.slice(6)
        var sensitiveString = ""
        let i = 0
        while (i <= lastString.length) {
            sensitiveString += '*'
            i++
        }

        return text.slice(0, 6) + sensitiveString
    }

    dataDesensitization(text, record) {
        if (!text) {
            return null
        }

        var len = text.length
        if (len > 4) {
            return text.substring(0, 3) + '****' + text.substring(len - 4, len)
        }
    }

    chanceNameRender(text, record) {
        if (!text) {
            return null
        }

        return <span style={ { color: "#409eff", cursor: 'pointer' } } onClick={ event => this.jumpChanceDetail(event, record) }>{ text }</span>

    }

    jumpChanceDetail(event, record) {
        event.stopPropagation
            ?
            event.stopPropagation()
            :
            e.cancelBubble = true;

        console.log('查看机会数据', record);
        // 跳转到机会详情页

        let data = {
            chanceRowData: record
        }

        hashHistory.push({ pathname: `saleschancemnt/chanceDetail`, state: data });

    }
    jumpflowdetail(event, record, store) {
       
        let data = {
            process_key: record.processDefinitionKey?record.processDefinitionKey:'completion_confirmation_process',
            uuid: record.uuid,
            nodeKey: record.nodeKey,
            readonly: true,
            init_node: 'n',
            action_code: store.action_code,
            page_source: 'detail', // IDC合同专用开关

        }
        if(record.refer_processkey){
            data.process_key=record.refer_processkey
            data.uuid=record.refer_uuid
            data.nodeKey=null
        }
        let params = ''
        let keys = Object.keys(data)
        keys.map((key, index) => {
            params += index + 1 === keys.length ? `${ key }=${ data[key] }` : `${ key }=${ data[key] }&`
        })

        let new_url = `/#/flow/FlowDetail?${ params }`

        window.open(new_url, '_blank')

    }
    jumpflowform(event, record, store){
        let data = {
            process_key: record.processDefinitionKey?record.processDefinitionKey:'completion_confirmation_process',
            uuid: record.uuid,
            nodeKey: record.nodeKey,
            readonly: false,
            transactid:record.transactid?record.transactid:'',
            init_node: 'n',
            action_code: store.action_code,
            page_source: 'detail', // IDC合同专用开关

        }

        let params = ''
        let keys = Object.keys(data)
        keys.map((key, index) => {
            params += index + 1 === keys.length ? `${ key }=${ data[key] }` : `${ key }=${ data[key] }&`
        })

        // let new_url = `/#/flow/FlowDetail?${ params }`

        // window.open(new_url, '_blank')
        hashHistory.push({ pathname: `flow/FlowForm`, state:data});
    }
    jumpcontractreceivedetail(event, record, store){
        let data = {
            page_source: 'detail',
            readonly: true,
            init_node: 'n',
            uuid: record.uuid,
            process_key: 'idc_order',
            action_code: store.action_code,
            page_source: 'detail', // IDC合同专用开关
        }
         

        let params = ''
        let keys = Object.keys(data)
        keys.map((key, index) => {
            params += index + 1 === keys.length ? `${ key }=${ data[key] }` : `${ key }=${ data[key] }&`
        })

        let new_url = `/#/flow/FlowDetail?${ params }`

        window.open(new_url, '_blank')
    }

    jumpcontractpaymentdetail(event, record, store){
        let data = {
            page_source: 'detail',
            readonly: true,
            init_node: 'n',
            uuid: record.uuid,
            process_key: 'idc_order_payment',
            action_code: store.action_code,
            page_source: 'detail', // IDC合同专用开关
        }
         

        let params = ''
        let keys = Object.keys(data)
        keys.map((key, index) => {
            params += index + 1 === keys.length ? `${ key }=${ data[key] }` : `${ key }=${ data[key] }&`
        })

        let new_url = `/#/flow/FlowDetail?${ params }`

        window.open(new_url, '_blank')
    }



}



export default new ColumnsHandle()