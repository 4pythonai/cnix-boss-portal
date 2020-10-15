import React from 'react'
import {Modal,Select,Icon,DatePicker,message,Form,Button,Radio,Upload,Input} from 'antd';
import moment from 'moment';
import OneContractBillReportCom from "@/routes/commonAntTable/components/table_plugins/bill/OneContractBillReportCom"
import {observer,inject} from "mobx-react";
const {Option} = Select;
import api from "@/api/api"
import 'antd/dist/antd.css';

@observer
class BillingDebuger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contractno: 'IBM1',
      contract_start: '2020-01-01',
      contract_end: '20-12-31',
      res1start: null,
      res2start: null,
      res1end: null,
      res2end: null,
      checkpassed: false,
      visible: false,
      billjson: {},
      cycle: '月付',
      cutoff: 'early',
      billingoption: '后付',
      toal_check_errors: []
    }
  }



  changeCycle = async (value) => {
    this.setState({
      cycle: value
    })
  }

  changeBillingoption = async (value) => {
    this.setState({
      billingoption: value
    })
  }

  changeCutoff = async (value) => {
    this.setState({
      cutoff: value
    })
  }



  ChangeBstart = (date,dateString) => {
    console.log(date,dateString)
    this.setState({bstart: dateString})
  }

  ChangeBend = (date,dateString) => {
    console.log(date,dateString)
    this.setState({bend: dateString})
  }

  ChangeRes1Start = (date,dateString) => {
    console.log(date,dateString)
    this.setState({res1start: dateString})
  }

  ChangeRes1End = (date,dateString) => {
    console.log(date,dateString)
    this.setState({res1end: dateString})
  }


  ChangeRes2Start = (date,dateString) => {
    console.log(date,dateString)
    this.setState({res2start: dateString})
  }

  ChangeRes2End = (date,dateString) => {
    console.log(date,dateString)
    this.setState({res2end: dateString})
  }

  testibm = async () => {


    if(!this.state.res1start || !this.state.res2start) {
      message.info('必须设置两个资源项的开始计费时间');
      return
    }

    let params = {method: 'POST',data: {...this.state}}
    let json = await api.billing.testIBM(params);
    if(json.success == 'false') {
      this.setState({visible: true,checkpassed: false,toal_check_errors: json.toal_check_errors})

    } else {
      this.setState({visible: true,checkpassed: true,billjson: json})
    }

  }



  render() {
    return (
      <div>
        <br />
        <div style={{width: "1230px",justifyContent: 'space-between',display: 'flex',paddingLeft: '20px'}}>
          <div style={{width: '160px'}}
          >
            <Input
              style={{width: '160'}}
              value={this.state.contractno}
              placeholder="请输入合同号,留空为所有"
            ></Input>
          </div>
          <DatePicker placeholder='合同开始日期' defaultValue={moment(this.state.contract_start,'YYYY-MM-DD')} onChange={this.ChangeBstart} />
          <DatePicker placeholder='合同结束日期' defaultValue={moment(this.state.contract_end,'YYYY-MM-DD')} onChange={this.ChangeBend} />


          <Select
            showSearch
            style={{width: 200}}
            placeholder="选择周期"
            optionFilterProp="children"
            defaultValue={this.state.cycle}
            onChange={this.changeCycle}
          >
            <Option value="月付">月付</Option>
            <Option value="季付">季付</Option>
            <Option value="半年付">半年付</Option>
            <Option value="年">年</Option>
          </Select>


          <Select
            showSearch
            style={{width: 140}}
            placeholder="选择预付/后付"
            defaultValue={this.state.billingoption}
            optionFilterProp="children"
            onChange={this.changeBillingoption}
            filterOption={(input,option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="预付">预付</Option>
            <Option value="后付">后付</Option>
          </Select>

          <Select
            showSearch
            style={{width: 200}}
            placeholder="选择账期开关"
            optionFilterProp="children"
            defaultValue={this.state.cutoff}
            onChange={this.changeCutoff}
          >
            <Option value="early">自然月</Option>
            <Option value="later">非自然月</Option>
          </Select>
        </div>
        <br />



        <div style={{width: "590px",justifyContent: 'space-between',display: 'flex',paddingLeft: '20px'}}>
          <div style={{width: '160px'}} >
            机柜产品(F515):
          </div>
          <DatePicker placeholder='开始计费日期' onChange={this.ChangeRes1Start} />
          <DatePicker placeholder='结束计费日期' onChange={this.ChangeRes1End} />
        </div>
        <br />
        <div style={{width: "590px",justifyContent: 'space-between',display: 'flex',paddingLeft: '20px'}}>
          <div style={{width: '160px'}} >
            跳线产品(F517):
          </div>
          <DatePicker placeholder='开始计费日期' onChange={this.ChangeRes2Start} />
          <DatePicker placeholder='结束计费日期' onChange={this.ChangeRes2End} />
        </div>
        <br />


        <div style={{marginLeft: '20px'}}>
          <Button type="primary" onClick={event => this.testibm()}>计费模拟</Button>
        </div>
        {
          this.state.billjson.hasOwnProperty('contract_timeline') ?
            <div style={{marginLeft: '20px',marginTop: '20px'}}><OneContractBillReportCom onlyShowTimeLine="no" showSaveBillBtn="yes" billjson={this.state.billjson} /></div>
            :
            null
        }
      </div>
    );
  }
}

export default BillingDebuger;
