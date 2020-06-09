// PDF pdf  客户账单打印功能
import React from 'react'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Modal, Descriptions, message, InputNumber, Table, Divider, Radio, Checkbox, Slider, Row, Col, Input, Button } from 'antd';
import { Select } from 'antd';

import { observer, inject } from "mobx-react";
import api from '@/api/api'
import { toJS } from 'mobx'
import { randomString } from '@/utils/tools'
import OneContractBillingStore from "./OneContractBillingStore"
import DevicePort from './DevicePort'
import styles from './paper_bill_style.scss'



@observer
export default class CustPaperBillPrinter extends React.Component {
    constructor(props) {
        super(props)
        this.store = OneContractBillingStore
        this.init = this.init.bind(this)
    }


    state = {
        visible: false,
        paper_id: 0,
        paperinfo: {},
        custinfo: {},
        zones: [],
        zone: null,      //


    }

    async init() {


        if (this.props.commonTableStore.selectedRowKeys.length == 0) {
            message.error('请选择一个账单');
            return;
        }

        let current_rec = toJS(this.props.commonTableStore.selectedRows[0])
        let params = { method: 'GET', data: { "paperid": current_rec.id } }
        let json = await api.billing.getPaperInfoById(params);

        console.log(json);


        this.setState({ visible: true, custinfo: json.custinfo, paperinfo: json.paperinfo })

        let json_zone = await api.billing.getZones();
        this.setState({ zones: json_zone.zones })
        console.log(this.state)
    }


    onCancel = (e, f) => {
        this.setState({
            visible: false
        })
    }

    downloadpdf = () => {
        console.log(this.state.paperinfo.paperno)

        html2canvas(this.refs.pdf, { scale: 2 }).then(canvas => {
            //返回图片dataURL，参数：图片格式和清晰度(0-1)
            let pageData = canvas.toDataURL('image/jpeg', 1.0);

            let dims = {
                a2: [1190.55, 1683.78],
                a3: [841.89, 1190.55],
                a4: [595.28, 841.89]
            }
            //方向默认竖直，尺寸ponits，格式a2
            let pdf = new jsPDF('', 'pt', 'a4');

            let a4Width = dims['a4'][0];
            let a4Height = dims['a4'][1];

            let contentWidth = canvas.width,
                contentHeight = canvas.height;

            let pageHeight = contentWidth / a4Width * a4Height;
            let leftHeight = contentHeight;
            let position = 0;
            let imgWidth = a4Width,
                imgHeight = a4Width / contentWidth * contentHeight;




            if (leftHeight < pageHeight) {
                //addImage后两个参数控制添加图片的尺寸，此处将页面高度按照a4纸宽高比列进行压缩
                pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
            } else {
                while (leftHeight > 0) {
                    pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
                    leftHeight -= pageHeight;
                    position -= a4Height;

                    if (leftHeight > 0) {
                        pdf.addPage();
                    }
                }
            }

            pdf.save(this.state.paperinfo.paperno + '.pdf');
        });
    }





    // 资源使用日志
    expandedLog = (record, index, indent, expanded) => {
        let resource_logs = record.resource_logs //该参数是从父表格带过来的key
        const cols = [

            {
                title: '产品分类',
                className: "small_table",
                dataIndex: 'sub_category',
                key: 'sub_category',
            },

            {
                title: '资源明细',
                className: "small_table",
                dataIndex: 'network_text',
                key: 'network_text',
            },
            {
                title: '起',
                className: "small_table",
                dataIndex: '_begin',
                key: '_begin',
            },
            {
                title: '止',
                className: "small_table",

                dataIndex: '_end',
                key: '_end',
            },
            {
                title: '价格',
                className: "small_table",
                dataIndex: 'price',
                key: 'price'
            },

            {
                title: '费用',
                className: "small_table",
                dataIndex: 'shouldpay',
                key: 'shouldpay'
            },
            {
                title: '备注',
                className: "small_table",
                dataIndex: 'memo',
                key: 'memo'
            }
        ]

        return (
            <Table
                columns={ cols }
                rowKey="reactkey"
                rowClassName={ "small_table" }
                dataSource={ record.resource_logs }
                pagination={ false }
            />
        );
    };




    // 每个合同账单的循环列表
    CreateContractBillItem = (rowstr) => {

        if (!this.state.visible) {
            return;
        }

        let row = JSON.parse(rowstr)
        let newrow = JSON.stringify(row)
        newrow = JSON.parse(newrow)


        let num = 0
        for (var j = 0; j < newrow.length; j++) {
            num++
            newrow[j]['key'] = num
        }

        const cols = [
            {
                title: '合同号',
                dataIndex: 'contract_no',
                key: 'contract_no',
            },
            {
                title: '账期开始',
                dataIndex: 'periodstart',
                key: 'periodstart',
            },
            {
                title: '账期结束',
                dataIndex: 'periodend',
                key: 'periodend',
            },

            {
                title: '账期金额',
                dataIndex: 'period_money',
                key: 'period_money',
            },
            {
                title: '调整金额',
                dataIndex: 'adjust_money',
                key: 'adjust_money'
            },
            {
                title: '调整事项',
                dataIndex: 'memo',
                key: 'memo'
            },



            {
                title: '实际金额',
                dataIndex: 'actual_money',
                key: 'actual_money'
            },

            {
                title: '账单类型',
                dataIndex: 'billtype',
                key: 'billtype'
            },

        ]



        return (
            <div>
                <Table
                    dataSource={ newrow }
                    columns={ cols }
                    size="small"
                    rowClassName={ "big_table" }
                    defaultExpandAllRows={ true }
                    pagination={ false }
                    expandedRowRender={ this.expandedLog }
                    style={ { marginBottom: '20px', marginLeft: '10px' } }
                />
            </div>
        )
    }

    getModalProps() {
        return {
            width: 1200,
            destroyOnClose: true,
            ref: "billrpt",
            title: '账单详情',
            bodyStyle: {
                width: 1200,
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

    async handleZoneChange(value, now) {

        console.log(`selected ${ value }`);

        var obj = null
        var found = null

        console.log(this.state.zones)

        console.log(now)

        found = this.state.zones.find(element => element.id == value);
        console.log(found)
        await this.setState({ zone: found })
        console.log(this.state)
    }




    render() {
        let modalProps = this.getModalProps();
        const Option = Select.Option;
        let sourceList = this.state.zones


        return <Modal { ...modalProps }>
            <div>

                <div>
                    <Button type="primary" onClick={ this.downloadpdf }>下载PDF</Button>
                </div>

                <Divider />

                { sourceList.length == 0 ? (<span></span>) :
                    (<Select defaultValue={ sourceList[0].zone } style={ { width: 140 } } onChange={ this.handleZoneChange.bind(this) }>
                        {
                            sourceList.map(item => {
                                return (
                                    <Option value={ item.id } key={ item.id } >{ item.zone }</Option>
                                )
                            })
                        }
                    </Select>)

                }
                {
                    this.state.zone && this.state.zone.id ? (
                        <div>
                            <div style={ { paddingLeft: '10px', paddingTop: '15px' } } ref="pdf">
                                <div style={ { marginBottom: '5px', marginLeft: '145px', fontWeight: 'bold' } }>
                                    <h1>账单编号:{ this.state.paperinfo.paperno }</h1>

                                </div>
                                <div style={ { marginBottom: '5px', fontWeight: 'bold' } }>总金额:{ this.state.paperinfo.total_money }</div>
                                <div style={ { marginBottom: '5px', fontWeight: 'bold' } }>账单创建时间:{ this.state.paperinfo.createdate }</div>
                                <Divider />

                                <table>
                                    <tbody>
                                        <tr>
                                            <td style={ { width: '565px' } }> <div style={ { marginBottom: '5px', fontWeight: 'bold' } }>客户名称:{ this.state.custinfo.customer_name }</div>
                                                <div style={ { marginBottom: '5px', fontWeight: 'bold' } }>纳税识别号:{ this.state.custinfo.tax_no }</div>
                                                <div style={ { marginBottom: '5px', fontWeight: 'bold' } }>客户地址:{ this.state.custinfo.address }</div>
                                                <div style={ { marginBottom: '5px', fontWeight: 'bold' } }>联系电话:{ this.state.custinfo.phone }</div>
                                                <div style={ { marginBottom: '5px', fontWeight: 'bold' } }>开户银行:{ this.state.custinfo.open_bank }</div>
                                                <div style={ { marginBottom: '5px', fontWeight: 'bold' } }>银行帐号:{ this.state.custinfo.bank_account }</div>
                                                <div style={ { marginBottom: '5px', fontWeight: 'bold' } }>Email:{ this.state.custinfo.email }</div>
                                            </td>
                                            <td style={ { width: '565px' } }>
                                                <div style={ { marginBottom: '5px', fontWeight: 'bold' } }>收款公司:{ this.state.zone.company }</div>
                                                <div style={ { marginBottom: '5px', fontWeight: 'bold' } }>开户银行:{ this.state.zone.bank }</div>
                                                <div style={ { marginBottom: '5px', fontWeight: 'bold' } }>银行帐号:{ this.state.zone.bankcode }</div>
                                                <div style={ { marginBottom: '5px', fontWeight: 'bold' } }>发票类型:{ this.state.zone.invocietype }</div>
                                                <div style={ { marginBottom: '5px', fontWeight: 'bold' } }>联系人:{ this.state.zone.contact } { this.state.zone.mobile }  </div>
                                                <div style={ { marginBottom: '5px', fontWeight: 'bold' } }>主页:{ "http://www.cninx.com.cn" }</div>

                                                {/* <div style={ { marginBottom: '5px', fontWeight: 'bold' } }>客服联系电话:{ "40012345678" }</div> */}
                                            </td>

                                        </tr>
                                    </tbody>
                                </table>
                                <Divider />
                                <div style={ { margin: '10px' } } > 费用明细:<br /></div>
                                {
                                    this.CreateContractBillItem(this.state.paperinfo.billsjson)
                                }
                            </div>
                        </div>
                    ) : (
                            <div>请选择节点  </div>
                        )
                }
            </div >
        </Modal >
    }
}