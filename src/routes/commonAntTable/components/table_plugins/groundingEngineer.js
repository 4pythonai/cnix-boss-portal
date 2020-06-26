import React from "react";
import { Modal, Table, message } from "antd";
import CommonTable from '@/routes/commonAntTable/components/commonTableCom/commonTable'
import api from "@/api/api";

export default class GroundingEngineer extends React.Component {
  constructor(props) {
    super(props);
    this.store = props.commonTableStore;
    this.state = {
      visible: false,
      selectedRows:[]
    };
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  init() {
    
    this.setState({
        visible:true
    })
  }
  async handleOk() {
      
      
            this.setState({
                visible: false
              });
            this.props.refreshTable()
        

   
  }
  handleCancel() {
    this.setState({
      visible: false
    });
  }
  sendData(selectedRows) {
    this.setState({
        selectedRows: selectedRows,
    })
}
  render() {
    return (
      <Modal
        title="客户人员列表："
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        width="1000px"
        visible={this.state.visible}
      >
          <CommonTable
                        ref="commonTableRef"
                        key='customerlist_engineer'
                        action_code='customerlist_engineer'
                        sendData={(res) => this.sendData(res)}
                        onCancel={this.handleOk}
                    />
      </Modal>
    );
  }
}
