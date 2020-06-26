import React from 'react'
import { message, Table, Tree, Modal } from 'antd'
import api from '@/api/api'
import { inject, observer } from 'mobx-react'
import SearchTree from './newsearchtree'
// import permissionManageStore from '@/store/permissionManageStore'

// @inject('permissionManageStore')
// @inject('dmStore')
const { TreeNode } = Tree;
@observer
export default class IdcLookview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            value: '',
            dataList: [],
            loadData: [],
            dataSource: [],
            dataTitle: [],
            ownerTypeData:[],
            poweredData:[],
            value: "",
            category: "",
            current: 1,
            pageSize: 5,
            total: 24,
        }
        this.lookview = this.lookview.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.changePage = this.changePage.bind(this)
    }
    componentDidMount() {
        this.onClickTreeNode('', '', 4, 1)
    }
    async getFirstNode() {
        let params = {
            method: 'POST',
            data: {
                category_to_use: "sinnet",
                value: "sinnet",
                node: "1",
            }
        }
        let res = await api.cabinet_api.getCabinetData(params)
        this.setState({
            orgOriginData: res.server_resp,
            dataList: res.server_resp
        })
    }
    onLoadData = treeNode =>
        new Promise(resolve => {
            if (treeNode.props.dataRef.category == "hostroom") {
                message.info('已经是最后一级')
                resolve();
                return;

            } else {
                if (treeNode.props.children) {
                    resolve();
                    return;
                }
                setTimeout(async () => {
                    let params = {
                        method: 'POST',
                        data: {
                            category_to_use: treeNode.props.dataRef.category,
                            value: treeNode.props.dataRef.value,
                            node: treeNode.props.dataRef.id_value,
                        }
                    }

                    let res = await api.cabinet_api.getCabinetData(params)
                    treeNode.props.dataRef.children = res.server_resp
                    this.setState({
                        dataList: [...this.state.dataList],
                    });
                    resolve();
                }, 1000);
            }
        });
    async onClickTreeNode(value, category) {
        console.log(value, category)
        if (category != '' && category != undefined) {
            if (category.selectedNodes) {
                if (category.selectedNodes.length == 0) {
                    return
                }
                category = category.selectedNodes[0].props.dataRef.category
            } else {
                category = category
            }

        } else {
            category = ""
        }
        if (value != '' && value != undefined) {
            if (typeof value == 'string') {                
                if (value.indexOf('-') !=-1) {
                     value = value.split('-')[0]
                    // var lastvalue = newvalue[0]
                } else {
                     value = value
                }
            } else {
                if (value[0].indexOf('-') != -1) {
                    value = value[0].split('-')[0]
                    // var newvalue = newvalue.split('-')
                    // var lastvalue = newvalue[0]
                } else {
                    var value = value[0]
                }
                
            }
        } else {
            value = ""
        }
        let params = {
            data: {
                representative: category,
                value: value,
                size: this.state.pageSize,
                page: this.state.current

            },
            method: 'POST'
        }
        let res = await api.cabinet_api.getCabinetTableData(params);
        this.setState({
            dataTitle: res.rent_type,
            dataSource: res.data,
            total: res.total,
            category: category,
            value: value,
            ownerTypeData:res.owner_type,
            poweredData:res.powered
        })
    }

    getTreeProps() {
        return {
            dataList: this.state.dataList,
            getFirstNode: this.getFirstNode.bind(this),
            onSelect: this.onClickTreeNode.bind(this),
            loadData: this.onLoadData.bind(this),
            multiple: false,
        }
    }

    async handleCancel() {
        this.setState({
            visible: false
        })
    }

    lookview() {
        this.setState({
            visible: true
        })

    }
    onSelect = (selectedKeys, info) => {
    };
    changePage(e) {
        this.setState({
            current: e
        }, () => {
            this.onClickTreeNode(this.state.value, this.state.category)
        })
    }
    render() {
        let treeProps = this.getTreeProps()
        const columns = [
            {
                title: '机柜编号',
                dataIndex: 'cabinet_no',
                key: 'cabinet_no',
            },
            {
                title: '所属IDC',
                dataIndex: 'idc_site',
                key: 'idc_site',
            },
            {
                title: '所属楼宇',
                dataIndex: 'build_name',
                key: 'build_name',
            },
            {
                title: '所属楼层',
                dataIndex: 'floor_name',
                key: 'floor_name',
            },
            {
                title: '所属区域',
                dataIndex: 'no',
                key: 'no',
            },
            {
                title: '客户名称',
                dataIndex: 'customer_name',
                key: 'customer_name',
            },
            {
                title: '租赁状态',
                dataIndex: 'rent_type',
                key: 'rent_type',
            },
            {
                title: '加电状态',
                dataIndex: 'powered',
                key: 'powered',
            },
            {
                title: '机柜U数',
                dataIndex: 'u_number',
                key: 'u_number',
            },
            {
                title: '机柜资产归属',
                dataIndex: 'owner_type',
                key: 'owner_type',
            },
        ];
        const dataSource = this.state.dataSource
        let getDataTitle = this.state.dataTitle
        let ownerTypeData= this.state.ownerTypeData
        let poweredData=this.state.poweredData
        let countTotal=this.state.total
        let getDataTitles = getDataTitle.map(getDataTitle => { return (<span key={getDataTitle.display_text} style={{ marginRight: '20px' }}><span>{getDataTitle.display_text}</span>:<span>{getDataTitle.count}</span></span>) })
        let getownerTypeData=ownerTypeData.map(ownerTypeData => { return (<span key={ownerTypeData.display_text} style={{ marginRight: '20px' }}><span>{ownerTypeData.display_text}</span>:<span>{ownerTypeData.count}</span></span>) })
        let getpoweredData=poweredData.map(poweredData => { return (<span key={poweredData.display_text} style={{ marginRight: '20px' }}><span>{poweredData.display_text}</span>:<span>{poweredData.count}</span></span>) })
        return (
            <Modal
                title="查看总览图："
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                width="1000px"
                visible={this.state.visible}
                okButtonProps={{ disabled: true }}
                cancelButtonProps={{ disabled: true }}
            >
                <div style={{ height: '650px' }}>
                    <div style={{ width: '20%', float: 'left', borderRight: 'solid 1px #ccc', height: '100%', overflowY: 'scroll' }}>
                        <SearchTree {...treeProps}></SearchTree>
                    </div>
                    <div style={{ width: '80%', float: 'right', height: '100%', textAlign: 'center' }}>
                        <div style={{ height: '180px', borderBottom: 'solid 1px #ccc' }}>
                            <div style={{marginBottom:'20px',textAlign:'left',paddingLeft:'50px'}}><span style={{marginRight:'20px',fontWeight:'bold'}}>机柜总数:</span>{countTotal}</div>
                            <div style={{marginBottom:'20px',textAlign:'left',paddingLeft:'50px'}}><span style={{marginRight:'20px',fontWeight:'bold'}}>租赁状态:</span>{getDataTitles}</div>
                            <div style={{marginBottom:'20px',textAlign:'left',paddingLeft:'50px'}}><span style={{marginRight:'20px',fontWeight:'bold'}}>机柜资产归属:</span>{getownerTypeData}</div>
                            <div style={{textAlign:'left',paddingLeft:'50px'}}><span style={{marginRight:'20px',fontWeight:'bold'}}>加电状态:</span>{getpoweredData}</div>                           
                        </div>
                        <div style={{ height: '400px' }}>
                            <Table
                                rowKey={item => item.id}
                                dataSource={dataSource}
                                scroll={{ x: '2300px' }}
                                columns={columns}
                                pagination={{  // 分页
                                    // simple: true,
                                    current: this.state.current,
                                    pageSize: this.state.pageSize,
                                    total: this.state.total,
                                    onChange: this.changePage,
                                }}
                            />
                    </div>
                    </div>
                </div>
            </Modal>
        )
    }

}