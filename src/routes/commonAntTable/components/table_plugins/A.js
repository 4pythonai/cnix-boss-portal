// import React from 'react'
// import { Form, Radio, message, Modal, Popover } from 'antd'
// import api from '@/api/api'
// import navigationStore from '@/store/navigationStore'
// import ChargeTable from '@/routes/contract/components/chargeCom/ChargeTable'
// import chargeStore from '@/store/chargeStore'
// import IDC_cfg_store from '@/store/IDC_cfg_store'
// import IDConeButtonStart from './IDConeButtonStart'



// export default class A extends React.Component {
//     constructor(props) {
//         super(props);
//         this.commonTableStore = props.commonTableStore
//         this.chargeStore = chargeStore
//         this.IDC_cfg_store = IDC_cfg_store
//         this.state = {
//             visible: false,
//             cabinet_process_key: '',
//             isRenderFlowForm: false
//         }
//     }

//     async init() {
//         if (this.props.commonTableStore.selectedRows.length <= 0) {
//             message.error('请选择一条数据');
//             return
//         }

//         if (!await this.isCanStart()) {
//             return
//         }

        

//         await this.getChargeData()

//         this.setState({
//             visible: true
//         })
//     }

//     isCanStart = async () => {
//         let params = {
//             data: {
//                 process_key: this.props.commonTableStore.selectedRows[0].ifvip == '是'
//                     ?
//                     "idc_order_vip"
//                     :
//                     navigationStore.currentMenu.process_key,
//                 uuid: this.props.commonTableStore.selectedRows[0].uuid
//             },
//             method: 'POST'
//         };
//         let res = await api.bpm.isWhetherLaunchWorkOrder(params);
//         return res.checkresult === 'n' ? false : true
//     }

//     handleOk = async () => {
//         if (!this.state.cabinet_process_key) {
//             message.warning('请选择机柜操作！')
//             return;
//         }
        
//         this.setState({
//             isRenderFlowForm: true,
//             visible: false,
//         }, () => {
//             this.refs.IDConeButtonStartRef.init()
//         })


//     }


//     handleCancel = () => {
//         this.setState({
//             visible: false,
//         })
//     }



//     async getChargeData() {
//         await this.IDC_cfg_store.setUuid(this.commonTableStore.selectedRows[0].uuid);
//         await this.IDC_cfg_store.setProcessKey(navigationStore.currentMenu.process_key)
//         // await this.IDC_cfg_store.setDetailContractNo(this.commonTableStore.selectedRows[0].contract_no)
//         await this.chargeStore.getChargeList('', this.props.parentTable.state.button_code)

//         if (this.chargeStore.chargeSubmitData.length != 0) {
//             this.chargeStore.rowSelectChange([this.chargeStore.chargeSubmitData[0].id], [this.chargeStore.chargeSubmitData[0]])
//         }
//     }

//     onChangeCabinet = e => {
//         this.setState({
//             cabinet_process_key: e.target.value,
//         });
//     }


//     renderMore(text, record, title, count) {
//         return <Popover title={title} content={text} >
//             <span className="lookMore">{text}</span>
//         </Popover>
//     }


//     getTableColumns() {
//         return [
//             {
//                 title: '收费类型',
//                 dataIndex: 'charge_fee_type',
//                 key: 'charge_fee_type',
//                 width: 120,
//             },
//             {
//                 title: '收费项',
//                 dataIndex: 'resname',
//                 key: 'resname',
//                 width: 150,
//             },
//             {
//                 title: '单价',
//                 dataIndex: 'price',
//                 key: 'price',
//                 width: 150,
//             },

//             {
//                 title: '数量',
//                 dataIndex: 'num',
//                 key: 'num',
//                 width: 80
//             },

//             {
//                 title: '详细信息',
//                 dataIndex: 'description',
//                 key: 'description',
//             },
//             {
//                 title: '备注',
//                 dataIndex: 'memo',
//                 key: 'memo',
//                 render: (text, record) => this.renderMore(text, record, '备注', 8)
//             }
//         ]
//     }


//     getFlowForm() {
//         if (this.state.isRenderFlowForm === true) {
   
//             return <IDConeButtonStart
//                 cabinet_process_key={this.state.cabinet_process_key}
//                 type="A"
//                 ref="IDConeButtonStartRef"
//                 commonTableStore={this.props.commonTableStore} />
//         }
//         return null
//     }


//     render() {
//         const radioStyle = {
//             display: 'block'
//         }

//         return (
//             <div>

//                 {this.getFlowForm()}

//                 <Modal
//                     title="机柜相关工单"
//                     onOk={this.handleOk}
//                     onCancel={this.handleCancel}
//                     okText="确认"
//                     cancelText="取消"
//                     width="1200px"
//                     visible={this.state.visible}
//                     destroyOnClose={true}
//                 >
//                     <div style={{ fontSize: '16px' }}>合同相关资费项:<br /></div>
//                     <br />
//                     <ChargeTable
//                         key="show_chargeTable"
//                         disabled={true}
//                         scroll={{ x: 1356 }}
//                         columns={this.getTableColumns()}
//                     />
//                     <Form style={{ marginTop: '30px' }} labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
//                         <Radio.Group onChange={this.onChangeCabinet} value={this.state.cabinet_process_key}>
//                             <Radio style={radioStyle} value='open_response'>
//                                 <span style={{ fontWeight: 'bold' }}>IDC机柜开通工单</span>
//                                 <p style={{ marginLeft: '23px' }}>选择机柜,进行业务开通</p>
//                             </Radio>
//                             <Radio style={radioStyle} value='reserved_response'>
//                                 <span style={{ fontWeight: 'bold' }}>IDC机柜预占工单</span>
//                                 <p style={{ marginLeft: '23px' }}>选择机柜,进行预分配</p>
//                             </Radio>

//                         </Radio.Group>
//                     </Form>
//                 </Modal>
//             </div>

//         )
//     }

// }