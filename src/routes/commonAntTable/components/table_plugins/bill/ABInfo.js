
import React from 'react';
import './paper_bill_style.scss';


export default class ABinfo extends React.Component {


    render() {
        return (
            <div style={{color: 'black',marginLeft: '10px',fontFamily: '"Microsoft YaHei", 微软雅黑, monospace'}}>
                <table>
                    <tbody>
                        <tr>
                            <td style={{width: '565px'}}>
                                {' '}
                                <div
                                    style={{
                                        marginBottom: '5px',
                                        fontWeight: 'bold'
                                    }}>
                                    客户名称:
                                    {this.props.custinfo.customer_name}
                                </div>
                                <div
                                    style={{
                                        marginBottom: '5px',
                                        fontWeight: 'bold'
                                    }}>
                                    纳税识别号:
                                    {this.props.custinfo.tax_no}
                                </div>
                                <div
                                    style={{
                                        marginBottom: '5px',
                                        fontWeight: 'bold'
                                    }}>
                                    客户地址:
                                    {this.props.custinfo.address}
                                </div>
                                <div
                                    style={{
                                        marginBottom: '5px',
                                        fontWeight: 'bold'
                                    }}>
                                    联系电话:
                                    {this.props.custinfo.phone}
                                </div>
                                <div
                                    style={{
                                        marginBottom: '5px',
                                        fontWeight: 'bold'
                                    }}>
                                    开户银行:
                                    {this.props.custinfo.open_bank}
                                </div>
                                <div
                                    style={{
                                        marginBottom: '5px',
                                        fontWeight: 'bold'
                                    }}>
                                    银行帐号:
                                    {this.props.custinfo.bank_account}
                                </div>
                                <div
                                    style={{
                                        marginBottom: '5px',
                                        fontWeight: 'bold'
                                    }}>
                                    Email:
                                    {this.props.custinfo.email}
                                </div>
                            </td>
                            <td style={{width: '565px'}}>
                                <div
                                    style={{
                                        marginBottom: '5px',
                                        fontWeight: 'bold'
                                    }}>
                                    收款公司:
                                    {this.props.zone.company}
                                </div>
                                <div
                                    style={{
                                        marginBottom: '5px',
                                        fontWeight: 'bold'
                                    }}>
                                    开户银行:
                                    {this.props.zone.bank}
                                </div>
                                <div
                                    style={{
                                        marginBottom: '5px',
                                        fontWeight: 'bold'
                                    }}>
                                    银行帐号:
                                    {this.props.zone.bankcode}
                                </div>
                                <div
                                    style={{
                                        marginBottom: '5px',
                                        fontWeight: 'bold'
                                    }}>
                                    发票类型:
                                    {this.props.zone.invocietype}
                                </div>
                                <div
                                    style={{
                                        marginBottom: '5px',
                                        fontWeight: 'bold'
                                    }}>
                                    联系人:
                                    {this.props.zone.contact} {this.props.zone.mobile}{' '}
                                </div>
                                <div
                                    style={{
                                        marginBottom: '5px',
                                        fontWeight: 'bold'
                                    }}>
                                    主页:
                                    {'http://www.cnix.com.cn'}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    };



}
