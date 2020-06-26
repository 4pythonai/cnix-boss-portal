
import React from 'react'
import { inject, observer } from 'mobx-react'
import ButtonModalContent from '../components/buttonModalContent'
import PriviligeTable from '../../../components/antdComponents/table'
import getColumnSearchProps from '../../commonAntTable/components/commonTableCom/getColumnSearchProps'
import ButtonModal from '../../../components/antdComponents/modal'
import { Button, Popconfirm, Input, Icon } from 'antd'
import '../privilige.scss'

@inject('permissionManageStore')
@observer
export default class ButtonManage extends React.Component {
    constructor(props) {
        super(props)
        this.store = props.permissionManageStore
<<<<<<< HEAD
        
=======

>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
    }

    async componentDidMount() {
        await this.store.getButtonList();
<<<<<<< HEAD
=======

>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
    }

    componentWillUnmount() {
        this.store.clearPagination();
    }

    getOptionButtons(record) {
        return (<div className="options">
            <Button
                className="marginRihgt10"
<<<<<<< HEAD
                onClick={event => this.store.editRowButtonBtn(event, record)}
                size="small"
                htmlType= 'button'
=======
                onClick={ event => this.store.editRowButtonBtn(event, record) }
                size="small"
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
                type="primary" >编辑</Button>
            <Popconfirm
                title="您确定要删除么?"
                okText="删除"
                cancelText="取消"
<<<<<<< HEAD
                onConfirm={event => this.store.deleteButtonRow(event, record)} >
                <Button type="danger" size="small" htmlType="button" htmlType= 'button' >删除</Button>
=======
                onConfirm={ event => this.store.deleteButtonRow(event, record) } >
                <Button type="danger" size="small" htmlType="button"   >删除</Button>
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
            </Popconfirm>
        </div>)
    }

    iconRender(text) {
<<<<<<< HEAD
        return text ? <Icon type={text} size="20"></Icon> : null
    }
    
=======
        return text ? <Icon type={ text } size="20"></Icon> : null
    }

>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
    getTableColumns() {
        let columns = [{
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            onFilter: (value, record) => record.name.includes(value),
<<<<<<< HEAD
            ...getColumnSearchProps('name',this.store),
=======
            ...getColumnSearchProps('name', this.store),
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        }, {
            title: '按钮编码',
            dataIndex: 'button_code',
            key: 'button_code',
            sorter: (a, b) => a.button_code.length - b.button_code.length,
            onFilter: (value, record) => record.button_code.includes(value),
<<<<<<< HEAD
            ...getColumnSearchProps('button_code',this.store),
=======
            ...getColumnSearchProps('button_code', this.store),
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        },
        {
            title: '图标',
            dataIndex: 'icon',
            key: 'icon',
            sorter: (a, b) => a.icon.length - b.icon.length,
            onFilter: (value, record) => record.icon.includes(value),
<<<<<<< HEAD
            ...getColumnSearchProps('icon',this.store),
            render: (text, record) => this.iconRender(text)
        }, 
=======
            ...getColumnSearchProps('icon', this.store),
            render: (text, record) => this.iconRender(text)
        },
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        {
            title: '风格',
            dataIndex: 'style',
            key: 'style',
            sorter: (a, b) => a.style.length - b.style.length,
            onFilter: (value, record) => record.style.includes(value),
<<<<<<< HEAD
            ...getColumnSearchProps('style',this.store),
=======
            ...getColumnSearchProps('style', this.store),
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        },
        {
            title: '文件路径',
            dataIndex: 'file_path',
            key: 'file_path',
            sorter: (a, b) => a.file_path.length - b.file_path.length,
            onFilter: (value, record) => record.file_path.includes(value),
<<<<<<< HEAD
            ...getColumnSearchProps('file_path',this.store),
=======
            ...getColumnSearchProps('file_path', this.store),
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        },
        {
            title: '入口函数',
            dataIndex: 'entry_function',
            key: 'entry_function',
            sorter: (a, b) => a.entry_function.length - b.entry_function.length,
            onFilter: (value, record) => record.entry_function.includes(value),
<<<<<<< HEAD
            ...getColumnSearchProps('entry_function',this.store),
=======
            ...getColumnSearchProps('entry_function', this.store),
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            width: 250,
            render: (text, record) => this.getOptionButtons(record)
        }];
        return columns;
    }

    getTableProps() {

        return {
            bordered: true,
<<<<<<< HEAD
=======
            rowKey: "id",

>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
            dataSource: this.store.buttonList,
            pagination: {
                total: this.store.pagination.total,
                showLessItems: true,
                defaultCurrent: this.store.pagination.currentPage,
                current: this.store.pagination.currentPage,
                pageSize: this.store.pagination.pageSize,
                showQuickJumper: true,
                showTotal: (count) => {
                    let pageNum = Math.ceil(count / this.store.pagination.pageSize);
                    return '共 ' + pageNum + '页' + '/' + count + ' 条数据';
                },
                onShowSizeChange: this.store.onShowSizeChange,
                onChange: this.store.setButtonCurrentPage
            },
            columns: this.getTableColumns(),
        }
    }

    getSearchButtonButtonGrp() {
        return <div className="roleButtonGroup">
            <Button
                className="marginRihgt10"
<<<<<<< HEAD
                onClick={event => this.store.addButtonBtn(event)}
                size="small"
                type="primary"
                style={{ margin: '15px 20px' }}>新增按钮</Button>
=======
                onClick={ event => this.store.addButtonBtn(event) }
                size="small"
                type="primary"
                style={ { margin: '15px 20px' } }>新增按钮</Button>
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
            <div className="searchWrapper">
                <div className="searForm">
                    <div className="searchInfo">按钮编码:</div>
                    <div className="searcControl">
<<<<<<< HEAD
                        <Input onPressEnter={event=>this.store.searchButtonHandle(event)} onChange={event => this.store.setSearButtonValue(event, 'button_code')} />
=======
                        <Input defaultValue={ this.store.roleSearchData.role_code } onChange={ event => this.store.setSearButtonValue(event, 'button_code') } />
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
                    </div>
                </div>
                <div className="searForm">
                    <div className="searchInfo">按钮名称：</div>
                    <div className="searcControl">
<<<<<<< HEAD
                        <Input onPressEnter={event=>this.store.searchButtonHandle(event)} onChange={event => this.store.setSearButtonValue(event, 'name')} />
=======
                        <Input defaultValue={ this.store.roleSearchData.role_name } onChange={ event => this.store.setSearButtonValue(event, 'name') } />
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
                    </div>
                </div>
                <Button
                    className="marginRihgt10"
<<<<<<< HEAD
                    onClick={event => this.store.searchButtonHandle(event)}
                    size="small"
                    type="primary"
                    style={{ margin: '15px 20px' }}>搜索</Button>
=======
                    onClick={ event => this.store.searchButtonHandle(event) }
                    size="small"
                    type="primary"
                    style={ { margin: '15px 20px' } }>搜索</Button>
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
            </div>
        </div>
    }

    render() {
        let tableProps = this.getTableProps();
<<<<<<< HEAD
        return (
            <div className="custServiceContent">

                {this.getSearchButtonButtonGrp()}

                <PriviligeTable {...tableProps}/>

                <ButtonModal
                    modalTitle={this.store.modalTitle}
                    hideModal={this.store.hideModal}
                    visiblModal={this.store.visibleModal}
                    saveHandle={this.store.saveButtonHandle}
                    setRowData={this.store.setButtonRowData}
                    width={600}
                >
                    <ButtonModalContent/>
=======
        console.log(666, this.store.buttonList)
        return (
            <div className="custServiceContent">

                { this.getSearchButtonButtonGrp() }

                <PriviligeTable { ...tableProps } />

                <ButtonModal
                    modalTitle={ this.store.modalTitle }
                    hideModal={ this.store.hideModal }
                    visiblModal={ this.store.visibleModal }
                    saveHandle={ this.store.saveButtonHandle }
                    setRowData={ this.store.setButtonRowData }
                    width={ 600 }
                >
                    <ButtonModalContent />
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
                </ButtonModal>
            </div>
        )
    }
}
