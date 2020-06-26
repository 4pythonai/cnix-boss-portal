import React from 'react'
import { Modal } from 'antd';
import { inject, observer } from 'mobx-react'

@inject('commonTableStore')
@observer
export default class CommonModal extends React.Component {
    constructor(props) {
        super(props)
        this.commonTableStore = props.commonTableStore
    }

    state = {
        visible: false
    }

    onCancelHandle() {
        // this.commonTableStore.hideCommonModal();
        this.setState({
            visible: false
        })
    }

    showModal() {
        this.setState({
            visible: true
        })
    }

    getModalProps() {
        return {
            footer: this.props.footer,
            destroyOnClose: true,
            // title: this.commonTableStore.commonModalTitle,
            title: this.props.title,
            bodyStyle: {
                height: "600px",
<<<<<<< HEAD
=======
                width: "1000px",

>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
                overflow: 'auto',
                bottom: 0
            },
            cancelText: '取消',
            okText: "保存",
            visible: this.state.visible,
            onOk: this.onCancelHandle,
            onCancel: () => this.onCancelHandle()
        }
    }

    render() {
        let modalProps = this.getModalProps();
<<<<<<< HEAD
        return <Modal maskClosable={false} width={this.props.layoutcfg=='2'?'1100px':this.props.layoutcfg=='3'?'1300px':'650px'} { ...modalProps }>{ this.props.children }</Modal>
=======
        return <Modal width={ this.props.layoutcfg == '2' ? '1000px' : '1000px' } { ...modalProps }>{ this.props.children }</Modal>
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
    }
}
