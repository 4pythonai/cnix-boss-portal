import React from "react";
import { observer, inject } from "mobx-react";
import { Input  } from 'antd';
import NumericInput from 'react-numeric-input';

const { TextArea } = Input;
@inject("chargeStore")
@observer
export default class OnceFee extends React.Component {
  constructor(props) {
    super(props);
    this.store = props.chargeStore
  }

  render() {
    return (
       <div>
        <div className="charge_form">
          <div className="charge_info"><span className="requireIcon">*</span>费用名称</div>
          <div className="charge_control">
          <Input
            onChange={value => this.store.setNormalFiledsValue(value,'costName')}
            defaultValue={this.store.chargeRowData.costName || ''}
          />
          </div>
        </div>  

        <div className="charge_form">
          <div className="charge_info"><span className="requireIcon">*</span>金额</div>
          <div className="charge_price_control">
          <NumericInput
            className='price_input'
            min={0.00} 
            step={0.01}
            onChange={value=> this.store.setNormalFiledsValue(value,'price')}
            value={this.store.chargeRowData.price}
          />
            <span>元</span>
          </div>
        </div>

        <div className="charge_form">
          <div className="charge_info">备注</div>
          <div className="charge_control">
          <TextArea 
            rows={4} 
            placeholder="备注"
            type="text"
            name="remarks"
            onChange={event=> this.store.setNormalFiledsValue(event, 'memo')}
            defaultValue={this.store.chargeRowData.memo || ''} />
          </div>
        </div>
        </div>
    );
  }
}
