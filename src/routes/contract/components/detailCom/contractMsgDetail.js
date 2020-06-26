import React from "react"
import { Descriptions, Card } from "antd"
import ResItem from "../../components/chargeCom/ResItem"
// import FileViewer from 'react-file-viewer';
import { splitDate } from '@/utils/tools'



const CustomErrorComponent = () => {
    return <div>暂无数据</div>
}
export default class DetailWrapper extends React.Component {

    getAttachment = () => {

        return <Descriptions.Item span={ this.getAttachmentSpan() } label="附件">
            {
                this.props.fileList.map((item, index) => {
                    return <a style={ { display: 'block' } } target="_blank" key={ index } href={ item.url }>{ item.name }</a>
                })
            }
        </Descriptions.Item>
        // return <Descriptions.Item span={this.getAttachmentSpan()} label="附件">
        //     {
        //         this.props.fileList.map((item, index) => {
        //             var index = item.url.lastIndexOf(".");
        //             var type = item.url.substr(index + 1);
        //             return <FileViewer
        //                 key={index}
        //                 fileType={type}
        //                 filePath={item.url}
        //                 errorComponent={CustomErrorComponent}
        //                 onError={this.onError} />
        //         })
        //     }
        // </Descriptions.Item>
    }

    onError(e) {
        logger.logError(e, 'error in file-viewer');
    }

    getAttachmentSpan = () => {
        let count = 3;
        if (this.props.detailData.contract_type === '固定合同') {
            count -= 1
        }

        if (this.props.detailData.payment_method === '其他') {
            count -= 1
        }
        return count
    }


    getFixedMoney = () => {
        if (this.props.detailData.contract_type === '固定合同') {
            return <Descriptions.Item label="固定合同额">{ this.props.detailData.contract_money }（元）</Descriptions.Item>
                   
                   
        }

    }

    getOtherPaymentMethods = () => {
        if (this.props.detailData.payment_method === '其他') {
            return <Descriptions.Item label="其他结算方式">{ this.props.detailData.payment_method }</Descriptions.Item>
        }
    }

    
    getSingerList() {
        return this.props.detailData.singers_customers.map((item, index) => {
            return (
                <Descriptions.Item span={ 4 } key={ index } label="签约方">
                    <div style={ { display: 'flex', lineHeight: '40px' } }>
                        {this.props.canprinter?<div style={ { flex: 1 } }>{ item.customerName }</div>:<div style={ { flex: 1 } }>名称： { item.customerName }</div>}
                        {this.props.canprinter?null:<div style={ { flex: 1 } }>地址： { item.addressName }</div>}
                        {this.props.canprinter?null:<div style={ { flex: 1 } }>户名： { item.customerReferInfo!=null?item.customerReferInfo.account:'' }</div>}
                    </div>
                    {this.props.canprinter?null:<div style={ { display: 'flex', lineHeight: '40px' } }>

                        <div style={ { flex: 1 } }>账号： { item.customerReferInfo!=null?item.customerReferInfo.account:'' }</div>
                        <div style={ { flex: 1 } }>开户行： { item.customerReferInfo!=null?item.customerReferInfo.bank:'' }</div>
                        <div style={ { flex: 1 } }>银行编号： { item.customerReferInfo!=null?item.customerReferInfo.bank_number:'' }</div>
                    </div>}
                    {this.props.canprinter?null:<div style={ { display: 'flex', lineHeight: '40px' } }>
                        <div style={ { flex: 1 } }>税号： { item.customerReferInfo!=null?item.customerReferInfo.payee_num:'' }</div>
                    </div>}
                </Descriptions.Item>
            )
        })
    }

    render() {
        let detailData = this.props.detailData
        return <div>

            <Card title="签约信息" >
                <Descriptions column={ 4 } bordered>


                    <Descriptions.Item label="签约方" key='001' span={ 4 }>
                        <div style={ { display: 'flex', lineHeight: '40px' } }>
                        {this.props.canprinter?<div style={ { flex: 1 } }>{ this.props.signerCustomer }</div>:<div style={ { flex: 1 } }>名称： { this.props.signerCustomer }</div>}
                            {this.props.canprinter?null:<div style={ { flex: 1 } }>户名： { detailData.singerReferInfo.account }</div>}
                            {this.props.canprinter?null:<div style={ { flex: 1 } }>账号： { detailData.singerReferInfo.account }</div>}

                        </div>
                        {this.props.canprinter?null:<div style={ { display: 'flex', lineHeight: '40px' } }>
                            <div style={ { flex: 1 } }>开户行： { detailData.singerReferInfo.bank }</div>
                            <div style={ { flex: 1 } }>银行编号： { detailData.singerReferInfo.bank_number }</div>
                            <div style={ { flex: 1 } }>税号： { detailData.singerReferInfo.payee_num }</div>

                        </div>}
                    </Descriptions.Item>
                    { this.getSingerList() }

                </Descriptions>
            </Card>
            <Card title="合同信息">
                
                <Descriptions column={ 2 } bordered>
                    <Descriptions.Item label="合同编号">{ detailData.contract_no }</Descriptions.Item>
                    <Descriptions.Item label="签约类型">{ detailData.sign_type }</Descriptions.Item>
                    <Descriptions.Item label="业务员">{ detailData.staffname }</Descriptions.Item>
                    <Descriptions.Item label="所属部门">{ detailData.department }</Descriptions.Item>  
                    <Descriptions.Item label="合同名称">{ detailData.contract_name }</Descriptions.Item>
                    <Descriptions.Item label="用章名称">{ detailData.stamp_name }</Descriptions.Item>
                    <Descriptions.Item label="用章简称">{ detailData.chinese_shorthand }</Descriptions.Item>


                    <Descriptions.Item label="背靠背合同">{ detailData.back_to_back_contract_no }</Descriptions.Item>
                    <Descriptions.Item label="合同份数">{ detailData.contractNumber }</Descriptions.Item>
                    {this.props.processkey&&this.props.processkey=='idc_order_payment'?null:<Descriptions.Item label={ <span style={ { color: 'red' } }>是否预签</span> }>
                        { detailData.hasContract=='是'?'否':'是' }
                        </Descriptions.Item>}                    
                    <Descriptions.Item label="合同签定日期">{ splitDate(detailData.contract_start_date) }</Descriptions.Item>
                    <Descriptions.Item label="合同结束日期">{ splitDate(detailData.contract_end_date) }</Descriptions.Item>
                    <Descriptions.Item label="合同类型">{ detailData.contract_type }</Descriptions.Item>

                    { this.getFixedMoney() }

                    <Descriptions.Item label="整租/散租">{ detailData.rent_type }</Descriptions.Item>

                    <Descriptions.Item label="结算方式">{ detailData.payment_method }</Descriptions.Item>

                    { this.getOtherPaymentMethods() }

                    <Descriptions.Item label="收费周期">{ detailData.billing_cycle }</Descriptions.Item>
                    <Descriptions.Item label="支付类型">{ detailData.pay_type }</Descriptions.Item>
                    <Descriptions.Item label="首付款">{ detailData.contract_first_payment }（元）</Descriptions.Item>
                    
                    <Descriptions.Item label="合同期限">{ detailData.contract_days }（天）</Descriptions.Item>
                  

                    { this.getAttachment() }
                    <Descriptions.Item span={ 4 } label="描述">{ detailData.description }</Descriptions.Item>
                    <Descriptions.Item span={ 4 } label="机柜需求">{ detailData.cabinet_description }</Descriptions.Item>
                    <Descriptions.Item span={ 4 } label="网络需求">{ detailData.bandwidth_description }</Descriptions.Item>
                    <Descriptions.Item span={ 4 } label="线路需求">{ detailData.isp_description }</Descriptions.Item>

                </Descriptions>
            </Card>


            <ResItem
                contract_type={ detailData.contract_type }
                disabled={ this.props.disabled }
                contract_no={ detailData.contract_no }
                canprinter={this.props.canprinter}
                setChargeDataOption={ this.props.setChargeDataOption } />
            {detailData.oaflag=='y'?<Card title="OA原始信息">
                    <table style={{border:'0',borderColor:'#ccc'}} border="solid 0.5px"  dangerouslySetInnerHTML={ { __html: detailData.oainfo } }>
                    </table>
            </Card>:null}
            
            <Card title="条款信息">
                    <Descriptions column={ 6 } bordered>
                    <Descriptions.Item className="articleDescriptionWrapper" span={ 6 } label={ <span style={ { color: 'red' } }>*市场部领导定夺条款</span> }>
                        <div className="articleDescriptionWrapper" dangerouslySetInnerHTML={ { __html: detailData.marketing_department_leader_clause } } ></div>
                     </Descriptions.Item>      
                    <Descriptions.Item span={ 6 } label="甲方权利义务(修改内容)" >
                        <div className="articleDescriptionWrapper" dangerouslySetInnerHTML={ { __html: detailData.obligations_party_a } } ></div>
                    </Descriptions.Item>
                    <Descriptions.Item className="articleDescriptionWrapper" span={ 6 } label="乙方权利义务(修改内容)">
                        <div className="articleDescriptionWrapper" dangerouslySetInnerHTML={ { __html: detailData.obligations_party_b } } ></div>
                    </Descriptions.Item>
                    <Descriptions.Item className="articleDescriptionWrapper" span={ 6 } label="甲方违约责任(修改内容)">
                        <div className="articleDescriptionWrapper" dangerouslySetInnerHTML={ { __html: detailData.responsibility_party_a } } ></div>
                    </Descriptions.Item>
                    <Descriptions.Item className="articleDescriptionWrapper" span={ 6 } label="乙方违约责任(修改内容)">
                        <div className="articleDescriptionWrapper" dangerouslySetInnerHTML={ { __html: detailData.responsibility_party_b } }></div>
                    </Descriptions.Item>
                    <Descriptions.Item className="articleDescriptionWrapper" span={ 6 } label="合同模板外新增条款">
                        <div className="articleDescriptionWrapper" dangerouslySetInnerHTML={ { __html: detailData.contract_model_outside_clause } } ></div>
                    </Descriptions.Item>
                </Descriptions>
            </Card>
        </div>;
    }
}
