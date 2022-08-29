//添加采购的资源占用项, 因为采购资源只能手工添加,无法从工单生成

import React from 'react';
import { observer } from 'mobx-react';
import { Modal } from 'antd';
import BuyInItemCom from './BuyInItemCom';

@observer
export default class BuyinItemAdd extends React.Component {
    constructor(props) {
        super(props);
        console.log('🚀 ~ file: BuyinItemAdd.js ~ line 12 ~ BuyinItemAdd ~ constructor ~ props', props.refreshTable);
        this.init = this.init.bind(this);
    }

    state = {
        visible: false
    };

    init() {
        this.setState({
            visible: true
        });
    }

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false
        });
    };

    render() {
        console.log(this.init);
        return (
            <Modal visible={this.state.visible} title={'采购资源占用项录入'} onOk={this.handleOk} onCancel={this.handleOk} width={1320}>
                <div>
                    <BuyInItemCom refreshTable={this.props.refreshTable} />
                </div>
            </Modal>
        );
    }
}
