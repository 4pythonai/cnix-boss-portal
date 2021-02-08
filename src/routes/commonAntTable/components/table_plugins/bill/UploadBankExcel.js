import {Modal,message,Upload,Icon,Button} from 'antd';
import {observer} from 'mobx-react';
import api from '@/api/api';
import React from 'react';

@observer
export default class UploadBankExcel extends React.Component {
  constructor(props) {
    super(props);
    this.init = this.init.bind(this);
  }

  state = {
    visible: false
  };

  init() {
    this.setState({visible: true});
  }

  onCancel = () => {
    this.setState({
      visible: false
    });
  };

  getExcelUrl = () => {
    const that = this;
    const props = {
      name: 'file',
      action: api.filehandler.uploadBankExcel,
      accept: 'application/vnd.ms-excel',
      headers: {
        Authorization: localStorage.getItem('token')
      },
      onChange(info) {
        console.log('上传结果');
        console.log(info);

        if(info.file.status === 'error') {
          message.success(`${info.file.name} 上传失败！`);
        }

        if(info.file.status === 'done') {
          if(info.file.response.code === 200) {
            message.success(`${info.file.name} 上传成功！`);
            that.props.refreshTable();
          }

          if(info.file.response.code === 500) {
            message.error(info.file.response.msg,10);
          }
        }
      }
    };
    return props;
  };

  getModalProps() {
    return {
      width: 1200,
      destroyOnClose: true,
      title: '上传银行流水',
      bodyStyle: {
        width: 1200,
        height: 'auto',
        overflow: 'auto',
        bottom: 0
      },
      cancelText: '取消',
      okText: '确定',
      visible: this.state.visible,
      onCancel: () => this.onCancel()
    };
  }

  render() {
    const modalProps = this.getModalProps();
    return (
      <Modal {...modalProps}>
        <div>

          <div>重复上传文件会导致数据库"数据重复错误"</div>
          <div>"文件名"+"交易时间"必须唯一</div>

          <br />

          <Upload {...this.getExcelUrl()} showUploadList={false}>
            <Button>
              <Icon type="upload" /> 选择银行流水文件
                        </Button>
          </Upload>
        </div>
      </Modal>
    );
  }
}
