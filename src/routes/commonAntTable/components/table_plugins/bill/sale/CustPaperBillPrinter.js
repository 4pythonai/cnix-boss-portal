// PDF pdf  客户账单打印功能

import api from '@/api/api';
import { Button, Divider, message, Modal, Select } from 'antd';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import React from 'react';
import './paper_bill_style.scss';
import downloadpdf from '@/utils/Pdfhelper';
import CustPaperMainContent from './CustPaperMainContent';
@inject('billingSummaryStore')
@observer
export default class CustPaperBillPrinter extends React.Component {
    constructor(props) {
        super(props);
        this.pdfRef = React.createRef();
        this.store = props.billingSummaryStore;
        this.init = this.init.bind(this);
    }

    state = {
        visible: false,
        paper_id: 0,
        paperinfo: {},
        custinfo: {},
        zones: [],
        zone: null
    };

    async init() {
        if (this.props.commonTableStore.selectedRowKeys.length === 0) {
            message.error('请选择一个账单');
            return;
        }

        const current_rec = toJS(this.props.commonTableStore.selectedRows[0]);
        const params = { method: 'GET', data: { paperid: current_rec.id } };
        const json = await api.billingSale.getPaperInfoById(params);

        this.setState({
            visible: true,
            custinfo: json.custinfo,
            paperinfo: json.paperinfo
        });

        const json_zone = await api.billingSale.getZones();
        this.setState({ zones: json_zone.zones });
        console.log(this.state);
    }

    onCancel = () => {
        this.setState({
            visible: false
        });
    };

    getModalProps() {
        return {
            width: 1600,
            destroyOnClose: true,
            ref: 'billrpt',
            title: '账单打印',
            bodyStyle: {
                width: 1590,
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

    async handleZoneChange(value) {
        console.log(`selected ${value}`);
        let found = null;
        found = this.state.zones.find((element) => element.id === value);
        await this.setState({ zone: found });
    }

    // 要打印的主体内容

    render() {
        const modalProps = this.getModalProps();
        const { Option } = Select;
        const sourceList = this.state.zones;

        return (
            <Modal {...modalProps}>
                <div>
                    <div>
                        <Button type="primary" onClick={() => downloadpdf(this.pdfRef.current, this.state.paperinfo.paperno + '.pdf')}>
                            下载PDF
                        </Button>
                    </div>

                    <Divider />

                    {sourceList.length == 0 ? (
                        <span></span>
                    ) : (
                        <Select defaultValue={sourceList[0].zone} style={{ width: 140 }} onChange={this.handleZoneChange.bind(this)}>
                            {sourceList.map((item) => (
                                <Option value={item.id} key={item.id}>
                                    {item.zone}
                                </Option>
                            ))}
                        </Select>
                    )}

                    {this.state.zone && this.state.zone.id ? (
                        <CustPaperMainContent
                            pdfRef={this.pdfRef}
                            zone={this.state.zone}
                            visible={this.state.visible}
                            paperinfo={this.state.paperinfo}
                            custinfo={this.state.custinfo}
                        />
                    ) : (
                        <div>请选择节点 </div>
                    )}
                </div>
            </Modal>
        );
    }
}
