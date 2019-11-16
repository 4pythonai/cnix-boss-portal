import React from "react";
import { Collapse, Button, Icon, Select } from 'antd';
import CustomerSelecte from './CustomerSelecte'
import CustomerReferInfo from './CustomerReferInfo'
import CustomerAddr from './CustomerAddr'

const { Panel } = Collapse;
export default class SignCustomer extends React.Component {
    constructor(props) {
        super();
    }

    destroyCustomer = () => {
        this.props.destroyCustomer(this.props.customer_index)
    }

    getDeleteButton() {

        let { isRenderButton, ...props } = this.props.customer_target;
        if (isRenderButton === false || this.props.customer_index == 0 || this.props.disabled) {
            return;
        }
        return <Button
            htmlType="button"
            style={deleteCustomerStyle}
            type="danger"
            icon="delete"
            onClick={this.destroyCustomer} />
    }

    controlCustomerDetail() {

        let { addressList, addressId, customerReferInfo, addressName, readOnly, ...props } = this.props.customer_target
        let { getCurrentCustomerAddr, customer_index, disabled } = this.props

        return <Collapse
            bordered={false}
            defaultActiveKey={[]}
            expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
        >
            <Panel header="查看客户详细信息" key="1">
                <CustomerAddr
                    addressList={addressList}
                    addressName={addressName}
                    addressId={addressId}
                    customer_index={customer_index}
                    getCurrentCustomerAddr={getCurrentCustomerAddr}
                    disabled={disabled}
                    readOnly={readOnly} />
                <CustomerReferInfo
                    customerReferInfo={customerReferInfo} />
            </Panel>
        </Collapse>
    }



    render() {
        let { customerId, readOnly, customerName, ...props } = this.props.customer_target;
        let { getCurrentCustomer, getCustomerApi, customer_index, customerList, disabled } = this.props
        return (
            <div style={wrapperStyle}>

                <CustomerSelecte
                    customerName={customerName}
                    customerList={customerList}
                    customerId={customerId}
                    customer_index={customer_index}
                    getCustomerApi={getCustomerApi}
                    getCurrentCustomer={getCurrentCustomer}
                    disabled={disabled}
                    readOnly={readOnly} />

                {this.controlCustomerDetail()}

                {this.getDeleteButton()}

            </div >
        );
    }
}


const wrapperStyle = {
    borderRadius: '3px',
    position: 'relative',
    marginBottom: '20px'
}

const deleteCustomerStyle = {
    marginLeft: '10px',
    position: "absolute",
    right: '5px',
    top: '5px'
}