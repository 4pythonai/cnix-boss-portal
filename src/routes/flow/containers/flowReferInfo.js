import React from "react";
import { Button, Collapse, Divider, Descriptions, Table } from "antd";
import "../flow.scss";
import { toJS } from "mobx";

// 统一后台返回格式,方便渲染.

export default class FlowReferInfo extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            xinfo: null
        };
    }

    componentWillMount() {
        this.setState({ xinfo: this.props.xinfo });
    }
    componentWillUnmount() {
        this.setState({ xinfo: null });
    }
    getDescSpan(text, fields, order_index) {
        if (order_index + 1 == fields.length && fields.length % 3 != 0) {
            return fields.length == 1 ? 3 : fields.length % 3;
        }

        if (!text) {
            if (order_index + 1 == fields.length && fields.length % 3 != 0) {
                return fields.length == 1 ? 3 : fields.length % 3;
            }
            return 1;
        }
        if (text.length > 40) {
            return 3;
        }

    }
    createReferRowOne = row => {
        let obj = Object.keys(row);
        
        console.log(obj)
        obj.map((item, index) => {
            var tap = "";
            if (typeof row[item] == "object" && row[item] != null) {
                row[item].map(items => {
                    tap = tap + items.url;
                });
                row[item] = tap;
            }
        });
        let longobj={}
        let shortobj={}
        for(let objitem in row){
            
            if(row[objitem]==null||row[objitem].length>30){
                longobj[objitem]=row[objitem]
            }else{
                shortobj[objitem]=row[objitem]
            }
        }
        
        
        console.log(longobj)
        console.log(shortobj)
        
        
        
        let longkeys=Object.keys(longobj)
        let shortkeys=Object.keys(shortobj)
        
        
        console.log(longkeys)
        console.log(shortkeys)
        
        
        
        
        
        return (
            <div className='description'>
            <Descriptions
                key={ obj }
                key={ shortobj }
                column={ this.props.canprinter?2:3 }
                bordered
                style={ { marginLeft: "10px" } }
            >
               
                { shortkeys.map((item, index) =>
                    shortobj[item] &&
                    shortobj[item].indexOf &&
                    shortobj[item].indexOf("href") == -1 ? (
                            <Descriptions.Item
                                span={ this.getDescSpan(row[item], obj, index) }
                                span={ 1 }
                                key={ item }
                                label={ item }
                            >
                                {this.renderrows(item,shortobj[item])}
                            </Descriptions.Item>
                        ) : (
                            <Descriptions.Item
                                span={ this.getDescSpan(row[item], obj, index) }
                                span={ 1 }
                                key={ item }
                                label={ item }
                            >
                                <p dangerouslySetInnerHTML={ { __html: shortobj[item] } }></p>
                            </Descriptions.Item>
                        )
                ) }
            </Descriptions>
            <Descriptions
            key={ longobj }
            column={ 3 }
            bordered
            style={ { marginLeft: "10px" } }
        >
            { longkeys.map((item, index) =>

                longobj[item] &&
                longobj[item].indexOf &&
                longobj[item].indexOf("href") == -1 ? (
                        <Descriptions.Item
                            span={ 3}
                            key={ item }
                            label={ item }
                        >
                            {this.renderrows(item,longobj[item])}
                        </Descriptions.Item>
                    ) : (
                        <Descriptions.Item
                            span={ 3}
                            key={ item }
                            label={ item }
                        >
                            <p dangerouslySetInnerHTML={ { __html: longobj[item] } }></p>
                        </Descriptions.Item>
                    )
            ) }
        </Descriptions>
        </div>

        );
    };

    renderrows(item, data) {
        
        if (item == '机柜编号') {

            return data != null && data != '' ? data.replace(/,/g, "；") : ''
        }
        if(data.indexOf('name')!=-1&&data.indexOf('url')!=-1){
            let annexs=JSON.parse(data)
            return annexs.map((item,index)=>{
            return <a download={item.name} style={ { display: 'block' } } key={ index } href={item.url}>{item.name}</a>
            })
        }

        if(item=='合同属性'){
            return data=='1'?'收款':data=='2'?'付款':data=='3'?'终止协议':''
        }
        return data
        
    }

    createTableByRows = row => {
        let data = Object.keys(row[0]);

        let columns = [];
        for (var i = 0; i < data.length; i++) {
            var obj = {
                title: data[i],
                dataIndex: data[i],
                key: data[i]
            };
            columns.push(obj);
        }
        let newrow = JSON.stringify(row);
        newrow = JSON.parse(newrow);
        let num = 0;
        for (var j = 0; j < newrow.length; j++) {
            num++;
            newrow[j]["key"] = num;
        }
        return (
            <div>
                <Table
                    dataSource={ newrow }
                    columns={ columns }
                    size="small"
                    pagination={false}
                    style={ { marginBottom: "20px", marginLeft: "10px" } }
                />
            </div>
        );
    };


    renderRowsFormatData = rows => {
        if (rows.length == undefined) {
            let arr = [];
            arr.push(rows);
            rows = arr;
        }
        if (rows.length > 1) {
            return this.createTableByRows(rows);
        } else {
            return this.createReferRowOne(rows[0]);
        }
    };
    renderImproperRowsFormatData = rows => {
        if (rows.length != 0) {
            return rows.map((item, index) => {
                return <div>
                    <div style={ ref_title }><span style={ { fontSize: '11px' } }>{ item.title }</span></div>
                    { this.createReferRowOne(item.data) }
                </div>
            })


        }


    }
    render() {
        let xinfo = this.state.xinfo;
        let numstr = "0123456789";
        return (
            <div>
                { xinfo.bigdata.map((info, xxkey) => {
                    if (info._type == "sql") {
                        {
                            return (
                                <div key={ xxkey }>
                                    { info.rows.length != 0 ? (
                                        <div style={ ref_title }>
                                            { xinfo.bigtitle != null &&
                                                numstr.indexOf(xinfo.bigtitle.substring(0, 1)) != -1
                                                ? xinfo.bigtitle.substring(1)
                                                : xinfo.bigtitle }
                                        </div>
                                    ) : null }
                                    { info.rows.length != 0
                                        ? this.renderRowsFormatData(info.rows)
                                        : null }
                                </div>
                            );
                        }
                    }

                    if (info._type == "add_as_ref") {
                        {
                            return (
                                <div key={ xxkey }>
                                    { info.rows.length != 0 ? (
                                        <div style={ ref_title }>
                                            { xinfo.bigtitle != null &&
                                                numstr.indexOf(xinfo.bigtitle.substring(0, 1)) != -1
                                                ? xinfo.bigtitle.substring(1)
                                                : xinfo.bigtitle }
                                        </div>
                                    ) : null }
                                    { info.rows.length != 0
                                        ? this.renderRowsFormatData(info.rows)
                                        : null }
                                </div>
                            );
                        }
                    }

                    if (info._type == "service") {
                        {
                            return (
                                <div key={ xxkey }>
                                    { info.rows != null && info.rows.length != 0 ? (
                                        <div style={ ref_title }>
                                            { xinfo.bigtitle != null &&
                                                numstr.indexOf(xinfo.bigtitle.substring(0, 1)) != -1
                                                ? xinfo.bigtitle.substring(1)
                                                : xinfo.bigtitle }
                                        </div>
                                    ) : null }


                                    { info._dataformat == 'normal' && info.rows != null && info.rows.length != 0
                                        ? this.renderRowsFormatData(info.rows)
                                        : null }
                                    { info._dataformat == 'abnormal' && info.rows != null && info.rows.length != 0
                                        ? <div style={ { borderTop: '#ccc solid 1px', borderBottom: '#ccc solid 1px', paddingBottom: '15px' } }>{ this.renderImproperRowsFormatData(info.rows) }</div>
                                        : null }

                                </div>
                            );
                        }
                    }



                }) }
            </div>
        );
    }
}

const ref_title = {
    marginBottom: "9px",
    marginLeft: "10px",
    marginTop: "10px",
    fontWeight: "bold"
};
