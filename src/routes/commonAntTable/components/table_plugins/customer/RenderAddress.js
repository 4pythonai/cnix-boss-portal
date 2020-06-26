
import React, { useState, useEffect } from 'react';
import { List, Icon, Popconfirm } from 'antd'

const RenderAddress = props => {
    let userInfo = sessionStorage.getItem('userInfo')
    userInfo = JSON.parse(userInfo)
    return <List
        size="small"
        style={{ marginBottom: '20px' }}
        header={<div style={{ fontSize: '16px', fontWeight: 'bold' }}>地址列表</div>}
        footer={null}
        bordered
        dataSource={props.addressList}
        renderItem={item => <List.Item
            avatar={
                <Icon type="environment" style={{ width: '25px', height: '25px' }} />
            }
        >
            <div style={{ overflow: 'hidden',width: '100%' }}>
                <div style={{ float: 'left' }}>{item.address}</div>
                {
                    item.userId == userInfo.staff_id && props.isDelete === true
                        ?
                        <div style={{ float: 'right' }}>
                            <Popconfirm title="确定要删除吗?" onConfirm={() => props.removeAddressList(item)}>
                                <a>删除</a>
                            </Popconfirm>

                        </div>

                        : null
                }
            </div>
        </List.Item>}
    />
}


export default RenderAddress

