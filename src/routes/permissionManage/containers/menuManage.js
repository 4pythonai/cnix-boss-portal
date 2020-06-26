
import React from 'react'
import { inject, observer } from 'mobx-react'
import MenuModalContent from '../components/menuModalContent'
<<<<<<< HEAD
import ShowMenuUser from '../components/showMenuUser'
=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
import PriviligeTable from '../../../components/antdComponents/table'
import getColumnSearchProps from '../../commonAntTable/components/commonTableCom/getColumnSearchProps'
import MenuModal from '../../../components/antdComponents/modal'
import { Button, Popconfirm, Input, Icon } from 'antd'
import '../privilige.scss'

@inject('permissionManageStore')
@observer
export default class MenuManage extends React.Component {
    constructor(props) {
        super(props)
        this.store = props.permissionManageStore
    }

    async componentDidMount() {
        await this.store.getTableMenuList();
    }
    componentWillUnmount() {
        this.store.clearPagination();
    }

<<<<<<< HEAD
    toMenuDetail = (text,record) => {
        this.refs.showMenuUserRef.showModal(text,record)
    }

=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
    getOptionButtons(record) {
        return (<div className="options">
            <Button
                className="marginRihgt10"
<<<<<<< HEAD
                onClick={event => this.toMenuDetail(event, record)}
=======
                onClick={ event => this.store.toMenuDetail(event, record) }
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
                size="small"
                type="primary" >查看详情</Button>
            <Button
                className="marginRihgt10"
<<<<<<< HEAD
                onClick={event => this.store.editRowMenuButton(event, record)}
=======
                onClick={ event => this.store.editRowMenuButton(event, record) }
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
                size="small"
                type="primary" >编辑</Button>
            <Popconfirm
                title="您确定要删除么?"
                okText="删除"
                cancelText="取消"
<<<<<<< HEAD
                onConfirm={event => this.store.deleteMenuRow(event, record)} >
=======
                onConfirm={ event => this.store.deleteMenuRow(event, record) } >
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
                <Button type="danger" size="small" htmlType="button"   >删除</Button>
            </Popconfirm>
        </div>)
    }

    columnsRender(text) {
        return text ? text : null
    }

    iconRender(text) {
<<<<<<< HEAD
        return text ? <Icon type={text} size="20"></Icon> : null
=======
        return text ? <Icon type={ text } size="20"></Icon> : null
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
    }

    getTableColumns() {
        let columns = [{
            title: '名称',
            dataIndex: 'text',
            key: 'text',
            className: 'text',
            width: 150,
            sorter: (a, b) => a.text.length - b.text.length,
            onFilter: (value, record) => record.text.includes(value),
            ...getColumnSearchProps('text', this.store),
            render: (text, record) => this.columnsRender(text)
        }, {
            title: '菜单编码',
            dataIndex: 'menu',
            key: 'menu',
            className: 'menu',
            width: 150,
            sorter: (a, b) => a.menu.length - b.menu.length,
            onFilter: (value, record) => record.menu.includes(value),
            ...getColumnSearchProps('menu', this.store),
            render: (text, record) => this.columnsRender(text)
        }, {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            className: 'type',
            width: 100,
            sorter: (a, b) => a.type.length - b.type.length,
            onFilter: (value, record) => record.type.includes(value),
            ...getColumnSearchProps('type', this.store),

            render: (text, record) => this.columnsRender(text)
        },
        {
            title: 'action_code',
            dataIndex: 'action_code',
            key: 'action_code',
            width: 100,
            sorter: (a, b) => a.action_code.length - b.action_code.length,
            onFilter: (value, record) => record.action_code.includes(value),
            ...getColumnSearchProps('action_code', this.store),

            render: (text, record) => this.columnsRender(text)
        }, {
            title: '流程key',
            dataIndex: 'process_key',
            key: 'process_key',
            className: 'process_key',
            width: 150,
            sorter: (a, b) => a.process_key - b.process_key,
            onFilter: (value, record) => record.process_key.includes(value),
            ...getColumnSearchProps('process_key', this.store),

            render: (text, record) => this.columnsRender(text)
        }, {
            title: '小图标',
            dataIndex: 'icon',
            key: 'icon',
            className: 'icon',
            width: 150,
            sorter: (a, b) => a.icon.length - b.icon.length,
            onFilter: (value, record) => record.icon.includes(value),
            ...getColumnSearchProps('icon', this.store),
            render: (text, record) => this.iconRender(text)
        }, {
            title: '路由',
            dataIndex: 'router',
            key: 'router',
            className: 'router',
            width: 200,
            sorter: (a, b) => a.router.length - b.router.length,
            onFilter: (value, record) => record.router.includes(value),
            ...getColumnSearchProps('router', this.store),
            render: (text, record) => this.columnsRender(text)
        }, {
            title: '父菜单',
            dataIndex: 'parent_text',
            key: 'parent_text',
            className: 'parent_text',
            width: 150,
            sorter: (a, b) => a.parent_text.length - b.parent_text.length,
            onFilter: (value, record) => record.parent_text.includes(value),
            ...getColumnSearchProps('parent_text', this.store),
            render: (text, record) => this.columnsRender(text)
        }, {
            title: '菜单等级',
            dataIndex: 'menu_level',
            key: 'menu_level',
            className: 'menu_level',
            width: 100,
            sorter: (a, b) => a.menu_level.length - b.menu_level.length,
            onFilter: (value, record) => record.menu_level.includes(value),
            ...getColumnSearchProps('menu_level', this.store),
        }, {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            width: 250,
            fixed: 'right',
            className: 'chargeStyle',
            render: (text, record) => this.getOptionButtons(record)
        }];
        return columns;
    }



    getTableProps() {

        return {
            bordered: true,
            dataSource: this.store.menuList,

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
                onChange: this.store.setMenuCurrentPage
            },
            scroll: { x: 1650 },
            columns: this.getTableColumns(),

        }
    }

    getSearchMenuButtonGrp() {
        return <div className="roleButtonGroup">
            <Button
                className="marginRihgt10"
<<<<<<< HEAD
                onClick={event => this.store.addMenuButton(event)}
                size="small"
                type="primary"
                style={{ margin: '15px 20px' }}>新增菜单</Button>
=======
                onClick={ event => this.store.addMenuButton(event) }
                size="small"
                type="primary"
                style={ { margin: '15px 20px' } }>新增菜单</Button>
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
            <div className="searchWrapper">
                <div className="searForm">
                    <div className="searchInfo">菜单编码:</div>
                    <div className="searcControl">
<<<<<<< HEAD
                        <Input onPressEnter={event=>this.store.searchMenuHandle(event)} onChange={event => this.store.setSearMenuValue(event, 'menu')} />
=======
                        <Input defaultValue={ this.store.roleSearchData.role_code } onChange={ event => this.store.setSearMenuValue(event, 'menu') } />
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
                    </div>
                </div>
                <div className="searForm">
                    <div className="searchInfo">菜单名称：</div>
                    <div className="searcControl">
<<<<<<< HEAD
                        <Input onPressEnter={event=>this.store.searchMenuHandle(event)} onChange={event => this.store.setSearMenuValue(event, 'text')} />
=======
                        <Input defaultValue={ this.store.roleSearchData.role_name } onChange={ event => this.store.setSearMenuValue(event, 'text') } />
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
                    </div>
                </div>
                <Button
                    className="marginRihgt10"
<<<<<<< HEAD
                    onClick={event => this.store.searchMenuHandle(event)}
                    size="small"
                    type="primary"
                    style={{ margin: '15px 20px' }}>搜索</Button>
=======
                    onClick={ event => this.store.searchMenuHandle(event) }
                    size="small"
                    type="primary"
                    style={ { margin: '15px 20px' } }>搜索</Button>
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
            </div>
        </div>
    }

    getMenuModalContent() {
        return
    }


    render() {
        let tableProps = this.getTableProps();

        return (
            <div className="custServiceContent">

<<<<<<< HEAD
                {this.getSearchMenuButtonGrp()}

                <PriviligeTable {...tableProps} />
                <ShowMenuUser ref="showMenuUserRef"/>
                <MenuModal
                    modalTitle={this.store.modalTitle}
                    destroyOnClose={true}
                    hideModal={this.store.hideModal}
                    visiblModal={this.store.visibleModal}
                    saveHandle={this.store.saveMenuHandle}
                    setRowData={this.store.setMenuRowData}
                    width={600}
=======
                { this.getSearchMenuButtonGrp() }

                <PriviligeTable { ...tableProps } />

                <MenuModal
                    modalTitle={ this.store.modalTitle }
                    destroyOnClose={ true }
                    hideModal={ this.store.hideModal }
                    visiblModal={ this.store.visibleModal }
                    saveHandle={ this.store.saveMenuHandle }
                    setRowData={ this.store.setMenuRowData }
                    width={ 600 }
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
                >
                    <MenuModalContent />
                </MenuModal>

            </div>
        )
    }
}
