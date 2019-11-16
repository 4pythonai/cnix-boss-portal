
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
        
    }

    async componentDidMount() {
        await this.store.getButtonList();
        
        //  await this.store.getTableMenuList();
    }

    componentWillUnmount() {
        this.store.clearPagination();
    }

    getOptionButtons(record) {
        return (<div className="options">
            <Button
                className="marginRihgt10"
                onClick={event => this.store.editRowButtonBtn(event, record)}
                size="small"
                type="primary" >编辑</Button>
            <Popconfirm
                title="您确定要删除么?"
                okText="删除"
                cancelText="取消"
                onConfirm={event => this.store.deleteButtonRow(event, record)} >
                <Button type="danger" size="small" htmlType="button"   >删除</Button>
            </Popconfirm>
        </div>)
    }

    iconRender(text) {
        return text ? <Icon type={text} size="20"></Icon> : null
    }
    // standardRender(text){
    //     return text=="y"?'是':'否'
    // }
    getTableColumns() {
        let columns = [{
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            onFilter: (value, record) => record.name.includes(value),
            ...getColumnSearchProps('name',this.store),
        }, {
            title: '按钮编码',
            dataIndex: 'button_code',
            key: 'button_code',
            sorter: (a, b) => a.button_code.length - b.button_code.length,
            onFilter: (value, record) => record.button_code.includes(value),
            ...getColumnSearchProps('button_code',this.store),
        },
        {
            title: '图标',
            dataIndex: 'icon',
            key: 'icon',
            sorter: (a, b) => a.icon.length - b.icon.length,
            onFilter: (value, record) => record.icon.includes(value),
            ...getColumnSearchProps('icon',this.store),
            render: (text, record) => this.iconRender(text)
        }, 
        {
            title: '风格',
            dataIndex: 'style',
            key: 'style',
            sorter: (a, b) => a.style.length - b.style.length,
            onFilter: (value, record) => record.style.includes(value),
            ...getColumnSearchProps('style',this.store),
        },
        {
            title: '文件路径',
            dataIndex: 'file_path',
            key: 'file_path',
            sorter: (a, b) => a.file_path.length - b.file_path.length,
            onFilter: (value, record) => record.file_path.includes(value),
            ...getColumnSearchProps('file_path',this.store),
        },
        {
            title: '入口函数',
            dataIndex: 'entry_function',
            key: 'entry_function',
            sorter: (a, b) => a.entry_function.length - b.entry_function.length,
            onFilter: (value, record) => record.entry_function.includes(value),
            ...getColumnSearchProps('entry_function',this.store),
        },
        // {
        //     title: '是否使用组件',
        //     dataIndex: 'using_component',
        //     key: 'using_component',
        //     sorter: (a, b) => a.using_component.length - b.using_component.length,
        //     onFilter: (value, record) => record.using_component.includes(value),
        //     ...getColumnSearchProps('using_component'),
        // },
        // {
        //     title: '组件名称',
        //     dataIndex: 'component_name',
        //     key: 'component_name',
        //     sorter: (a, b) => a.component_name.length - b.component_name.length,
        //     onFilter: (value, record) => record.component_name.includes(value),
        //     ...getColumnSearchProps('component_name'),
        // },
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
                onClick={event => this.store.addButtonBtn(event)}
                size="small"
                type="primary"
                style={{ margin: '15px 20px' }}>新增按钮</Button>
            <div className="searchWrapper">
                <div className="searForm">
                    <div className="searchInfo">按钮编码:</div>
                    <div className="searcControl">
                        <Input defaultValue={this.store.roleSearchData.role_code} onChange={event => this.store.setSearButtonValue(event, 'button_code')} />
                    </div>
                </div>
                <div className="searForm">
                    <div className="searchInfo">按钮名称：</div>
                    <div className="searcControl">
                        <Input defaultValue={this.store.roleSearchData.role_name} onChange={event => this.store.setSearButtonValue(event, 'name')} />
                    </div>
                </div>
                <Button
                    className="marginRihgt10"
                    onClick={event => this.store.searchButtonHandle(event)}
                    size="small"
                    type="primary"
                    style={{ margin: '15px 20px' }}>搜索</Button>
            </div>
        </div>
    }

    render() {
        let tableProps = this.getTableProps();
        console.log(666,this.store.buttonList)
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
                </ButtonModal>
            </div>
        )
    }
}
