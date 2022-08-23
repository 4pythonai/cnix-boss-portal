// import React from 'react';
// import CommonTable from '@/routes/commonAntTable/components/commonTableCom/commonTable';
// import { toJS } from 'mobx';

// export default class ComGridSelect extends React.Component {
//     constructor(props) {
//         super(props);
//         console.log(props.uform_para);
//         this.state = {
//             selectedRows: []
//         };
//     }

//     sendData(selectedRows) {
//         if (selectedRows.length) {
//             let current_row = toJS(selectedRows[0]);
//             console.log(current_row);
//             this.props.onChange(current_row.id);
//         }
//         this.setState({
//             selectedRows: selectedRows
//         });
//     }

//     render() {
//         return <CommonTable ref="commonTableRef" key="key_salesout_prod" action_code={this.props.uform_para} sendData={(res) => this.sendData(res)} />;
//     }
// }

import React from 'react';
import { Input, Modal } from 'antd';
import CommonTable from '@/routes/commonAntTable/components/commonTableCom/commonTable';
import { toJS } from 'mobx';

export default class ComGridSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            selectedRows: []
        };
        // this.handleOk = this.handleOk.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    handleOk = () => {
        this.setState({
            visible: false
        });
    };

    onCancel() {
        this.setState({
            visible: true
        });
        // this.props.onchanged();
    }

    sendData(selectedRows) {
        if (selectedRows.length) {
            let current_row = toJS(selectedRows[0]);
            console.log(current_row);
            this.props.onChange(current_row.id);
        }
        this.setState({
            selectedRows: selectedRows
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            visible: false
        });
    }

    onClick = (value) => {
        this.setState({
            visible: true
        });
    };

    render() {
        if (this.props.editable === false) {
            return this.props.value;
        }

        return (
            <div>
                <Input readOnly value={this.props.value} {...this.props} onClick={this.onClick} />
                <Modal title="修改密码" onOk={this.handleOk} onCancel1={this.props.onchanged} onCancel={this.onCancel} okText="确认" width="1400px" visible={this.state.visible}>
                    <CommonTable ref="commonTableRef" key="key_salesout_prod" action_code={this.props.uform_para} sendData={(res) => this.sendData(res)} />
                </Modal>
            </div>
        );
    }
}
