import React from 'react';
import { Modal, message, Divider, DatePicker } from 'antd';
import { observer } from 'mobx-react';
import api from '@/api/api';
import { toJS } from 'mobx';
const { MonthPicker } = DatePicker;

@observer
export default class SetLocateYearAndMonth extends React.Component {
    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
    }

    state = {
        paperbillid: -1,
        visible: false,
        locateyearmonth: ''
    };

    async init() {
        if (this.props.commonTableStore.selectedRowKeys.length == 0) {
            message.error('请选择一个客户账单');
            return;
        }
        let current_row = toJS(this.props.commonTableStore.selectedRows[0]);
        console.log(current_row);
        this.setState({ visible: true, paperbillid: current_row.id });
    }

    getModalProps() {
        return {
            width: 1200,
            destroyOnClose: true,
            ref: 'billrpt',
            title: '设置客户账单落地时间',
            bodyStyle: {
                width: 1200,
                height: 'auto',
                overflow: 'auto',
                bottom: 0
            },
            cancelText: '取消',
            okText: '确定',
            visible: this.state.visible,
            onOk: this.saveLocateYearMonth,
            onCancel: () => this.onCancel()
        };
    }

    saveLocateYearMonth = async () => {
        let params = { method: 'POST', data: { paperbillid: this.state.paperbillid, locateyearmonth: this.state.locateyearmonth } };
        let json = await api.billingSale.savePaperBillLocateYearMonth(params);
        this.props.refreshTable();
    };

    onCancel = (e, f) => {
        this.setState({
            visible: false
        });
    };

    onChangeLocateYearAndMonth = (xdate, datestring) => {
        this.setState({
            locateyearmonth: datestring
        });
    };

    render() {
        let modalProps = this.getModalProps();
        return (
            <Modal {...modalProps}>
                <div>
                    客户账单ID={this.state.paperbillid}
                    <Divider />
                    <div>生成应收报表时,如果未设置"落地月份",则以客户账单中所包含的所有合同账单内,最晚的账期结束时间为准, 否则以当前设置的'年/月'为准</div>
                    <Divider />
                    <MonthPicker onChange={this.onChangeLocateYearAndMonth} placeholder="选择账期的年/月" />
                </div>
            </Modal>
        );
    }
}
