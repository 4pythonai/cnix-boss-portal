import { Modal, message, Upload, Spin, Icon, Button } from 'antd';
import { observer } from 'mobx-react';
import React from 'react';
import { api_root } from '@/api/api_config/base_config';

@observer
export default class UploadBankExcel extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
        this.uploadPaymentExcel = this.uploadPaymentExcel.bind(this);
        this.getModalProps = this.getModalProps.bind(this);
        this.showLoading = this.showLoading.bind(this);
        this.hideLoading = this.hideLoading.bind(this);
    }

    state = {
        visible: false,
        working: false
    };

    init() {
        this.setState({ visible: true, working: false });
    }

    showLoading = () => {
        this.setState({ working: true });
    };

    hideLoading = () => {
        this.setState({ working: false });
    };

    onCancel = () => {
        this.setState({
            visible: false,
            working: false
        });
    };

    uploadPaymentExcel = () => {
        const that = this;
        const props = {
            name: 'file',
            action: `${api_root}/File/uploadPaymentExcel`,
            loading: true,
            accept: 'application/vnd.ms-excel',
            headers: {
                Authorization: localStorage.getItem('token')
            },
            onChange(info) {
                that.showLoading();
                console.log('上传结果');
                console.log(info);

                if (info.file.status === 'error') {
                    that.hideLoading();
                    message.success(`${info.file.name} 上传失败！`);
                }

                if (info.file.status === 'done') {
                    that.hideLoading();

                    if (info.file.response.code === 200) {
                        message.success(`${info.file.name} 上传成功！`);
                        that.props.refreshTable();
                    }

                    if (info.file.response.code === 500) {
                        message.error(info.file.response.msg, 10);
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
            title: '上传付款记录',
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
                    <div>付款账单,账单编号格式化: 北京-地区|北京共建恒业通信技术有限责任公司2021-10-26/2022-10-25 账单编号, 地区-</div>
                    <div>重复上传文件会导致数据库"数据重复错误"</div>
                    <div>"文件名"+"交易时间"必须唯一</div>
                    <br />

                    {this.state.working ? <Spin tip="上传中..."></Spin> : ''}
                    <br />
                    <br />

                    <Upload {...this.uploadPaymentExcel()} showUploadList={false}>
                        <Button>
                            <Icon type="upload" /> 选择付款记录excel
                        </Button>
                    </Upload>
                </div>
            </Modal>
        );
    }
}
