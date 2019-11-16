import React from 'react'
import { Table, Button, Popconfirm } from 'antd';
import { inject, observer } from 'mobx-react'

import commonTableStore from '@/store/commonTableStore'

@inject('userStore')
@inject('IDC_cfg_store')
@observer
export default class ContractTable extends React.Component {

  constructor(props) {
    super(props)
    this.commonTableStore = new commonTableStore();
    this.user = props.userStore;

  }

  componentDidMount() {
    this.props.getDataSource()
  }

  setCurrentPage(currentPage) {
    this.commonTableStore.setCurrentPage(currentPage);
    this.props.IDC_cfg_store.getContractList()
  }

  contractProgress(e, record) {
    record = {
      processkey: "idc_order",
      uuid: record.contract_no,
      ...record
    };
    this.props.FlowApprovalStore.FlowProgress(e, record)
  }

  getOptions(record) {

    // 状态为空 或者 中止
    if (record.process_state == undefined || record.process_state == '') {
      return <div className="options">
        <Button type="primary" htmlType="button" size="small" className="marginRihgt10" onClick={ (e) => this.props.editContractRow(e, record) }>编辑</Button>
        <Popconfirm
          title="您确定要删除么?"
          okText="删除"
          cancelText="取消"
          onConfirm={ event => this.props.deleteContractRow(event, record) } >
          <Button
            type="danger"
            htmlType="button" size="small"
          >删除</Button>
        </Popconfirm>
      </div>
    }


    return <div className="options">
      <Button type="primary" htmlType="button" className="marginRihgt10" size="small" onClick={ (e) => this.contractProgress(e, record) }>进度</Button>
      {
        (record.process_state == 'backOrigin' || record.process_state == 'backPrev') && this.user.userInfo.staff_text == record.user ?
          <Button type="primary" htmlType="button" className="marginRihgt10" size="small" onClick={ (e) => this.props.editContractRow(e, record) }>编辑</Button>
          :
          ''
      }
    </div>

  }

  getColumns() {
    let delButton = {
      title: '操作',
      dataIndex: '',
      width: 120,
      key: 'operation',
      fixed: 'right',
      render: (text, record) => this.getOptions(record)
    }

    return this.props.isShowOption ? [...this.props.columns, delButton] : this.props.columns;

  }

  render() {

    let options = {
      bordered: true,
      loading: this.commonTableStore.loading,
      scroll: this.props.scroll,
      dataSource: this.props.dataSource,
      columns: this.getColumns(),
      pagination: {
        total: this.commonTableStore.total,
        showLessItems: true,
        defaultCurrent: this.commonTableStore.currentPage,
        current: this.commonTableStore.currentPage,
        pageSize: this.commonTableStore.pageSize,
        showQuickJumper: true,
        showTotal: (count) => {
          let pageNum = Math.ceil(count / this.commonTableStore.pageSize);
          return '共 ' + pageNum + '页' + '/' + count + ' 条数据';
        },
        onShowSizeChange: (current, pageSize) => {
          console.log(current, pageSize);
        },
        onChange: (currentPage) => this.setCurrentPage(currentPage)
      }
    }

    if (this.props.ishowRowSelection) {
      options.rowSelection = {
        selectedRowKeys: this.props.selectedRowKeys,
        onChange: this.props.rowSelectChange
        // this.startUpTaskStore.changeContractList(p1, p2, p3)
      }
    }



    return (
      <Table { ...options } />
    )
  }

}
