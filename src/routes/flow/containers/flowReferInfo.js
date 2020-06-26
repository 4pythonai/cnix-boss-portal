import React from 'react'
import { Button, Collapse, Divider, Descriptions, Table } from "antd";
import '../flow.scss'

import { toJS } from 'mobx'

export default class FlowReferInfo extends React.Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            xinfo: null,
        }
    }

    componentWillMount() {
        this.setState({ xinfo: this.props.xinfo })
    }
    componentWillUnmount() {
        this.setState({ xinfo: null })
    }
    createReferRowOne = (row) => {

        let obj = Object.keys(row)
        return <Descriptions key={obj} bordered style={{ marginLeft: '10px' }}>
            {
                obj.map(item =>
                    <Descriptions.Item key={item} label={item}>{row[item]}</Descriptions.Item>
                )
            }
        </Descriptions>
    }

    renderOneField = (item) => {
        let rows = item.data.rows
        let jkey = item.jkey
        if (rows.length != 0) {
            return rows.map(item =>
                <Descriptions.Item key={jkey} label={jkey}><div title={item.author}>{item.jvalue}</div></Descriptions.Item>
            )
        }
    }
    createTableByRows = (row) => {
        let data = Object.keys(row[0])

        let columns = []
        for (var i = 0; i < data.length; i++) {
            var obj = {
                title: data[i],
                dataIndex: data[i],
                key: data[i]
            }
            columns.push(obj)
        }
        let newrow = JSON.stringify(row)
        newrow = JSON.parse(newrow)
        let num = 0
        for (var j = 0; j < newrow.length; j++) {
            num++
            newrow[j]['key'] = num
        }
        return (
            <div>
                <Table
                    dataSource={newrow}
                    columns={columns}
                    size="small"
                    pagination={{
                        hideOnSinglePage: true
                    }}
                    style={{ marginBottom: '20px', marginLeft: '10px' }}
                />
            </div>
        )
    }
    renderAddAsRef = (data) => {
        return (
            < Descriptions bordered key={data} style={{ marginLeft: '10px', marginBottom: '5px' }}>
                {
                    data.map((info, index) => { return this.renderOneField(info) }
                    )
                }
            </Descriptions >

        )
    }
    getTitle(info, title) {
        let numstr = '0123456789'
        console.log(info.data)
        for (var i = 0; i < info.length; i++) {
            if (info[i].data.rows.length != 0) {
                return <div style={ref_title}>{title != null && numstr.indexOf(title.substring(0, 1)) != -1 ? title.substring(1) : title}</div>
            }
        }
        console.log(980, info, title)
    }
    renderRowsFormatData = (rows) => {
        if (rows.length > 1) {
            return (
                this.createTableByRows(rows)
            )
        } else {
            return (
                this.createReferRowOne(rows[0])
            )
        }
    }
    render() {
        let xinfo = this.state.xinfo
        let numstr = '0123456789'
        return (
            <div>
                {xinfo.bigdata.map(info => {
                    if (info._type == 'sql') {

                        {
                            return <div>{info.rows.length != 0 ? <div style={ref_title}>{xinfo.bigtitle != null && numstr.indexOf(xinfo.bigtitle.substring(0, 1)) != -1 ? xinfo.bigtitle.substring(1) : xinfo.bigtitle}</div> : null}
                                {info.rows.length != 0 ? this.renderRowsFormatData(info.rows) : null}
                            </div>
                        }
                    }

                    if (info._type == 'add_as_ref') {

                        {
                            return <div>{info.data.length != 0 ? this.getTitle(info.data, xinfo.bigtitle) : null}
                                {this.renderAddAsRef(info.data)}</div>
                        }
                    }

                    if (info._type == 'service') {

                        {
                            return <div>{info.rows.length != 0 ? <div style={ref_title}>{xinfo.bigtitle != null && numstr.indexOf(xinfo.bigtitle.substring(0, 1)) != -1 ? xinfo.bigtitle.substring(1) : xinfo.bigtitle}</div> : null}
                                {info.rows.length != 0 ? this.renderRowsFormatData(info.rows) : null}
                            </div>
                        }
                    }
                    if (info._type == 'static') {
                        return (
                            <div style={{ marginLeft: '10px', marginBottom: '4px' }}>{info.text}</div>
                        )

                    }
                })
                }

            </div>
        )



        // if (xinfo._type == 'tableref' || xinfo._type == 'sql' || xinfo._type == 'service') {

        //     return (
        //         <div>
        //             <div style={ ref_title }>{ xinfo.title }</div>
        //             { xinfo.rows.length > 1 ? this.createReferRow(xinfo.rows) : this.createReferRowOne(xinfo.rows) }
        //         </div>
        //     )
        // }


        // if (xinfo._type == 'add_as_ref') {
        //     console.log(899, xinfo.data)
        //     return (
        //         xinfo.data.map(info => {
        //             return <div>
        //                 <div style={ ref_title }>{ info.title }</div>
        //                 <div style={ { marginLeft: '20px' } }>
        //                     {
        //                         info.data.map(item => {

        //                             return <div key={ item.jkey } style={ { display: 'inline-block', width: '50%' } }>
        //                                 { this.createReferRowOne(item) }

        //                             </div>

        //                         })
        //                     }
        //                 </div>
        //             </div >
        //         })
        //     )
        // }



        // if (xinfo._type == 'static') {
        //     console.log('static', xinfo)
        //     return (
        //         <div>
        //             <h4>{ xinfo.text }</h4>
        //         </div>
        //     )
        // }


    }
}




const ref_title = {
    marginBottom: '9px',
    marginLeft: '10px',
    marginTop: '10px',
    fontWeight: 'bold'
};