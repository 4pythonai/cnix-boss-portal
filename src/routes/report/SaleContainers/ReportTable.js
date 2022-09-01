import React from 'react';
import { Table } from 'antd';

export default class ReportTable extends React.Component {
    render() {
        return (
            <Table
                rowKey={'ID'}
                title={() => {
                    return (
                        <div style={{ marginLeft: '500px' }}>
                            <h2>{this.props.tabletitle} </h2>
                        </div>
                    );
                }}
                columns={this.props.columns}
                pagination={this.props.pagination}
                dataSource={this.props.reportrows}
            />
        );
    }
}
