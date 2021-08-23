// import React from 'react'
// import { Form, Radio, message, Modal, Popover } from 'antd'
// import api from '@/api/api'
// import navigationStore from '@/store/navigationStore'

// export default class buttonDetail extends React.Component {
//     constructor(props) {
//         super(props);
//         this.commonTableStore = props.commonTableStore
//         this.state = {
//             button_code: '',
//             visible: false,
//         }
//     }

//     async init() {
//         if (this.props.commonTableStore.selectedRows.length <= 0) {
//             message.error('请选择一条数据');
//             return
//         }

//         let currentrow = this.props.commonTableStore.selectedRows[0]
//         console.log(currentrow)
//         console.log(currentrow.ghost_button_code)

//         this.setState({
//             visible: true,
//             button_code: currentrow.ghost_button_code
//         })

//     }

//     handleOk = async () => {

//     }

//     handleCancel = () => {
//         this.setState({
//             visible: false,
//         })
//     }

//     render() {

//         return (
//             <div>

//                 <Modal
//                     title="按钮详情"
//                     onOk={ this.handleOk }
//                     onCancel={ this.handleCancel }
//                     okText="确认"
//                     cancelText="取消"
//                     width="1200px"
//                     visible={ this.state.visible }
//                     destroyOnClose={ true }
//                 >
//                     <div style={ { fontSize: '16px' } }> { this.state.button_code }<br /></div>

//                 </Modal>
//             </div>

//         )
//     }

// }

import React from 'react';
import { message, Modal } from 'antd';
import api from '@/api/api';
import { useState, useEffect } from 'react';

const BtnDetailRetrieve = (props) => {
    const [btnDetail, setBtnDetail] = useState({});

    const getBtnDetailInfo = async (btncode) => {
        let params = { method: 'POST', data: { btncode: btncode } };
        const httpobj = await api.button.getBtnDetail(params);
        console.log(httpobj);
        if (httpobj.btn) {
            setBtnDetail(httpobj.btn);
        }
    };

    useEffect(() => {
        getBtnDetailInfo(props.btncode);
    }, [props.btncode]);

    return (
        <div>
            文件路径:{btnDetail.file_path} <br />
            入口函数:{btnDetail.entry_function}
            <br />
        </div>
    );
};

export default class buttonDetail extends React.Component {
    constructor(props) {
        super(props);
        this.commonTableStore = props.commonTableStore;
        this.state = {
            button_code: '',
            visible: false
        };
    }

    async init() {
        if (this.props.commonTableStore.selectedRows.length <= 0) {
            message.error('请选择一个按钮条目');
            return;
        }

        let currentrow = this.props.commonTableStore.selectedRows[0];

        this.setState({
            visible: true,
            button_code: currentrow.ghost_button_code
        });
    }

    handleOk = async () => {};

    handleCancel = () => {
        this.setState({
            visible: false
        });
    };

    render() {
        return (
            <div>
                <Modal title="按钮详情" onOk={this.handleOk} onCancel={this.handleCancel} okText="确认" cancelText="取消" width="1200px" visible={this.state.visible} destroyOnClose={true}>
                    <div style={{ fontSize: '14px' }}>
                        {' '}
                        {this.state.button_code}
                        <br />
                    </div>
                    <BtnDetailRetrieve btncode={this.state.button_code} />
                </Modal>
            </div>
        );
    }
}
