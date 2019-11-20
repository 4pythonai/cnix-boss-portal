import React from 'react'
import { Modal } from 'antd'
import SearchFormContainer from './searchFormContainer'



export default class SearchTableModal extends React.Component {
    constructor(props) {
        super(props)
        this.init = this.init.bind(this)
        this.state = {
            visible: false
        }
    }

    init() {
        this.showModal()
    }

    onCancelHandle = () => {
        this.setState({
            visible: false
        })
    }

    showModal() {
        this.setState({
            visible: true
        })
    }

    saveFormData = () => {
        this.refs.searchFormContainerRef.getFormValue()
    }

    getModalProps() {
        return {
            destroyOnClose: true,
            title: '搜索',
            bodyStyle: {
                height: "auto",
                overflow: 'auto',
                bottom: 0
            },
            cancelText: '取消',
            okText: "确定",
            visible: this.state.visible,
            onOk: this.saveFormData,
            onCancel: () => this.onCancelHandle()
        }
    }

    render() {
        let modalProps = this.getModalProps();
        return <Modal
            width={800}
            {...modalProps}>
            <SearchFormContainer
                ref="searchFormContainerRef"
                hideModal={this.onCancelHandle}
                refreshTable={this.props.refreshTable}
                setQueryCfg={this.props.setQueryCfg}
                formCfg={this.props.commonTableStore.formCfg}
                tableColumnsJson={this.props.commonTableStore.tableColumnsJson} />
        </Modal>
    }
}
