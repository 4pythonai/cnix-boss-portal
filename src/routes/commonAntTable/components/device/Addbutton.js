import React from 'react'
import { Form, Select, message, Input, Menu, Icon, Dropdown, Modal } from 'antd'
import api from '@/api/api'
import { inject, observer } from 'mobx-react'
import permissionManageStore from '@/store/permissionManageStore'
import commonTableStore from '@/store/commonTableStore'
import dmStore from '@/store/dmStore'

// @inject('permissionManageStore')
// @inject('dmStore')
@observer
export default class Addbutton extends React.Component {
    constructor(props) {
        super(props);
        this.store = permissionManageStore
        this.stores=dmStore
        this.state = {
            visible: false,
            value: ''
        }
        this.handleOk = this.handleOk.bind(this)
        this.addbutton = this.addbutton.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.getValue = this.getValue.bind(this)
    }
    componentWillMount(){
        this.store.getButtonList_noparams();
    }
    componentDidMount() {
        // let children=[]
        // let list=this.store.buttonList
        // console.log(789,list)
        // for(var i=0;i<list.length;i++){
        //     children.push(<Option key={list[i].id}>{list[i].name}</Option>);
        // }
        
    }
    async handleOk() {
        let params = {
            data: {
                act_code :this.stores.current_actcode,
                id:this.state.value
            },
            method: 'POST'
        }
        let res = await api.button.addmenuButton(params);
        if(res.code=='200'){
            message.success('添加成功')
            this.handleCancel()
        }

    }
    async init() {

        //这里没有执行?  
        console.log(api)
        // alert('init')

        if (commonTableStore.selectedRowKeys.length == 0) {
            message.error('请选择一条数据');
            return;
        } else {
            message.info('选中了记录');
        }

        let current_row = toJS(commonTableStore.selectedRows[0])
        console.log(current_row)

        console.log("componentDidMount")
        let params = {
            method: 'POST'
        };

        this.setState({ visible: true, lines: [] })

    }
    handleCancel() {
        this.setState({
            visible: false
        })
    }

    addbutton() {
        this.setState({
            visible: true
        })
    }
    getValue(value){
        console.log(value)
        this.setState({
            value:value
        })
    }
    
    render() {
        const children = [];
        let list=this.store.buttonList
        for(var i=0;i<list.length;i++){
            children.push(<Option key={list[i].id}>{list[i].name}</Option>);
        }
        return (
            <Modal
                title="关联按钮："
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                okText="确认"
                cancelText="取消"
                width="400px"
                visible={this.state.visible}
            >
                <Form labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
                    <Form.Item label="选择按钮：">
                        <Select
                         showSearch
                         style={{ width: '100%' }}
                         optionFilterProp="children"
                         onChange={this.getValue}
                        //  onFocus={onFocus}
                        //  onBlur={onBlur}
                        //  onSearch={onSearch}
                         filterOption={(input, option) =>
                           option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                         }
                         >
                            {children}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }

}