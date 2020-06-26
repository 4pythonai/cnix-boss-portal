import React from 'react';
import { Table } from 'antd'
export default class ContractSelectTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedRowKeys:[],
            selectedRows:[]
        }
        this.selectChange=this.selectChange.bind(this)

    }

    componentDidMount() {
        console.log(67,this.props.selectedKeys)
        if(this.props.selectedKeys.length>0){
            this.setState({
                selectedRowKeys:this.props.selectedKeys
            })
        }
    }
    onChange(e) {

    }
    selectChange(selectedRowKeys,selectedRows){
        console.log(selectedRowKeys,selectedRows)
        this.setState({
            selectedRowKeys:selectedRowKeys,
            selectedRows:selectedRows
        })
            this.props.getcharageSelectedId(selectedRows[0].id)

        }
    render() {
        const dataSource = this.props.chargeData
        for(var i=0;i<dataSource.length;i++){
            dataSource[i].details='所在机房：'+dataSource[i].loc+'运营商：'+dataSource[i].carrier+'类型：'+dataSource[i].line_type+'限速(M)：'+dataSource[i].line_speed_limit+'地区：'+dataSource[i].area
        }
        const data=[]
        for(var j=0;j<dataSource.length;j++){
            
            if(dataSource[j].resname.indexOf('机柜')==-1){
                data.push(dataSource[j])
            }
        }
        const columns = [
            {
                title: '收费类型',
                dataIndex: 'charge_fee_type',
                key: 'charge_fee_type',
            },
            {
                title: '收费项',
                dataIndex: 'resname',
                key: 'resname',
            },
            {
                title: '单价',
                dataIndex: 'price',
                key: 'price',
            },
            {
                title: '数量',
                dataIndex: 'amount',
                key: 'amount',
            },
            {
                title: '详细信息',
                dataIndex: 'details',
                key: 'details',
            },
            {
                title: '备注',
                dataIndex: 'customer_name',
                key: 'customer_name',
            }
        ];
        
        const selectedRowKeys = this.state.selectedRowKeys
        const rowSelection = {
            selectedRowKeys,
            onChange: this.selectChange,
            type:'radio'

        }
        return (
            <div style={{ marginBottom: '10px' }}>
                <Table rowKey={item=>item.id} pagination={false} style={{marginLeft: '-125px',marginRight:'-40px'}} scroll={ { x: '1000px' } } rowSelection={rowSelection} columns={columns} dataSource={data} />,
            </div>
        );
    }
}