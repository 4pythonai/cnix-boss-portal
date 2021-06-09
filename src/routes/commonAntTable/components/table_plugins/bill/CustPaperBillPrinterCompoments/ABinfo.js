import React from 'react';

export default function ABinfo(props) {
    console.log(props);
    return (
        <div style={{ color: 'black', marginLeft: '10px', fontFamily: '"Microsoft YaHei", 微软雅黑, monospace' }}>
            <table>
                <tbody>
                    <tr>
                        <td style={{ width: '565px' }}>
                            {' '}
                            <div
                                style={{
                                    marginBottom: '5px',
                                    fontWeight: 'bold'
                                }}>
                                客户名称:
                                {props.custinfo.customer_name}
                            </div>
                            <div
                                style={{
                                    marginBottom: '5px',
                                    fontWeight: 'bold'
                                }}>
                                纳税识别号:
                                {props.custinfo.tax_no}
                            </div>
                            <div
                                style={{
                                    marginBottom: '5px',
                                    fontWeight: 'bold'
                                }}>
                                客户地址:
                                {props.custinfo.address}
                            </div>
                            <div
                                style={{
                                    marginBottom: '5px',
                                    fontWeight: 'bold'
                                }}>
                                联系电话:
                                {props.custinfo.phone}
                            </div>
                            <div
                                style={{
                                    marginBottom: '5px',
                                    fontWeight: 'bold'
                                }}>
                                开户银行:
                                {props.custinfo.open_bank}
                            </div>
                            <div
                                style={{
                                    marginBottom: '5px',
                                    fontWeight: 'bold'
                                }}>
                                银行帐号:
                                {props.custinfo.bank_account}
                            </div>
                            <div
                                style={{
                                    marginBottom: '5px',
                                    fontWeight: 'bold'
                                }}>
                                Email:
                                {props.custinfo.email}
                            </div>
                        </td>
                        <td style={{ width: '565px' }}>
                            <div
                                style={{
                                    marginBottom: '5px',
                                    fontWeight: 'bold'
                                }}>
                                收款公司:
                                {props.zone.receive_company}
                            </div>
                            <div
                                style={{
                                    marginBottom: '5px',
                                    fontWeight: 'bold'
                                }}>
                                开户银行:
                                {props.zone.receive_bank}
                            </div>
                            <div
                                style={{
                                    marginBottom: '5px',
                                    fontWeight: 'bold'
                                }}>
                                银行帐号:
                                {props.zone.receive_bank_account}
                            </div>
                            <div
                                style={{
                                    marginBottom: '5px',
                                    fontWeight: 'bold'
                                }}>
                                发票类型:
                                {props.zone.invocie_type}
                            </div>
                            <div
                                style={{
                                    marginBottom: '5px',
                                    fontWeight: 'bold'
                                }}>
                                联系人:
                                {props.zone.contact_person} {props.zone.contact_mobile}
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
}
