import { Form, Input, Card, Select, Row, Col, Button, Checkbox, message, Table, AutoComplete, Divider } from 'antd';
import React from 'react';
import { observer, inject } from 'mobx-react';
import api from '@/api/api';
const CheckboxGroup = Checkbox.Group;
const { Option } = Select;

@inject('dmStore')
@observer
export default class FiledVisible extends React.Component {
    constructor(props) {
        super(props);
        console.log('FiledVisible props: ', props);
        this.state = {
            maintableColumns: [],
            roles: [],
            selectedRole: '',
            selectedColumns: [],
            selectedroles: [],
            hiddens: []
        };
    }

    onChangeColumnSelection = (selectedColumns) => {
        this.setState({
            selectedColumns
        });
    };

    async componentDidMount() {
        try {
            let params = { method: 'POST', data: { actcode: this.props.location.state.actioncode } };
            let json = await api.activity.getActCols(params);

            let params2 = { data: { currentPage: 1, pageSize: 1000 }, method: 'POST' };
            let json2 = await api.permission.getRoleList(params2);

            let params3 = { method: 'POST', data: { actcode: this.props.location.state.actioncode } };
            let json3 = await api.permission.getRoleFieldVisible(params3);

            this.setState({ roles: json2.data, maintableColumns: json.data, hiddens: json3.data });
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    }

    handleRoleChange = (event) => {
        this.setState({ selectedRole: event.target.value });
    };

    handleColumnChange = (event) => {
        const value = event.target.value;
        this.setState((prevState) => {
            const selectedColumns = [...prevState.selectedColumns];
            if (selectedColumns.includes(value)) {
                return { selectedColumns: selectedColumns.filter((column) => column !== value) };
            } else {
                selectedColumns.push(value);
                return { selectedColumns };
            }
        });
    };

    handleSave = () => {
        const { selectedRole, selectedColumns } = this.state;
        console.log('Selected Role:', selectedRole);
        console.log('Selected Columns:', selectedColumns);
        let params = {
            method: 'POST',
            data: {
                actcode: this.props.location.state.actioncode,
                role: selectedRole,
                columns: selectedColumns
            }
        };
        api.permission.saveRoleFieldVisible(params);

        // 这里可以添加保存数据的逻辑
    };

    render() {
        return (
            <div style={{ margin: '40px' }}>
                <h2>
                    已设置隐藏字段:{this.props.location.state.actioncode}/ {this.props.location.state.grid_title}
                </h2>
                {this.state.hiddens.length > 0 ? (
                    <div style={{ margin: '8px 0 0 2px' }}>
                        <table style={{ border: '2px solid black' }}>
                            <tr style={{ padding: '8px', textAlign: 'left', border: '1px solid #ddd' }}>
                                <td style={{ padding: '8px', textAlign: 'left', border: '1px solid #ddd' }}>角色</td>
                                <td style={{ padding: '8px', textAlign: 'left', border: '1px solid #ddd' }}> 隐藏的字段</td>
                            </tr>
                            {this.state.hiddens.map((item, index) => (
                                <tr style={{ padding: '8px', textAlign: 'left', border: '1px solid #ddd' }} key={index}>
                                    <td style={{ padding: '8px', textAlign: 'left', border: '1px solid #ddd' }}>
                                        {item.role_code}/{item.role_name}
                                    </td>
                                    <td style={{ padding: '8px', textAlign: 'left', border: '1px solid #ddd' }}> {item.field} </td>
                                </tr>
                            ))}
                        </table>
                    </div>
                ) : (
                    <div>Loading...</div>
                )}
                <br />
                <h2>
                    设置隐藏字段:{this.props.location.state.actioncode}/ {this.props.location.state.grid_title}
                </h2>
                <br />
                选择角色:
                {this.state.roles.length > 0 ? (
                    <div style={{ margin: '8px 0 0 2px' }}>
                        <select value={this.state.selectedRole} onChange={this.handleRoleChange}>
                            <option value="">Select a role</option>
                            {this.state.roles.map((role, index) => (
                                <option key={index} value={role.role_code}>
                                    {role.role_name}
                                </option>
                            ))}
                        </select>
                    </div>
                ) : (
                    <div>Loading...</div>
                )}
                <br />
                <br />
                要隐藏的字段:
                <CheckboxGroup value={this.state.selectedColumns} onChange={this.onChangeColumnSelection}>
                    {this.state.maintableColumns
                        ? this.state.maintableColumns.map((item, index) => {
                              return (
                                  <Checkbox style={{ width: '180px', marginLeft: '10px' }} key={index} value={item.Field}>
                                      {item.Field}
                                  </Checkbox>
                              );
                          })
                        : null}
                </CheckboxGroup>
                <br />
                <br />
                <br />
                <button onClick={this.handleSave}>Save</button>
            </div>
        );
    }
}
