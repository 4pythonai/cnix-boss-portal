import React from 'react';
import { Checkbox, Button, Modal } from 'antd'
import api from '@/api/api'

const CheckboxGroup = Checkbox.Group;

export default class CabinetSelector extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            selectedUsers: [],
            visibleModal: false
        }
    }

    async componentDidMount() {
        let res = await api.user.getAllRoles();
        this.setState({
            users: res.data
        })
    }

    onChange = checkedList => {
        this.setState({
            selectedUsers: checkedList
        });

        this.props.getComponentValue(this.state.selectedUsers)
    };

    showModal = () => {
        this.setState({
            visibleModal: true
        })
    }

    hideRoleModal = () => {
        this.setState({
            visibleModal: false
        })
    }

    render() {
        return <div>
            <Button onClick={ event => this.showModal(event) }>选择机柜</Button>
            <Modal
                title="选择机柜"
                title="Modal"
                visible={ this.state.visibleModal }
                onOk={ this.hideRoleModal }
                onCancel={ this.hideRoleModal }
                okText="确认"
                cancelText="取消"
            >
                <CheckboxGroup
                    options={ this.state.users }
                    value={ this.state.selectedUsers }
                    onChange={ this.onChange }
                />
            </Modal>
            <ul>
                {
                    this.state.selectedUsers.map(item => {
                        return <li key={ item }>{ item }</li>
                    })
                }
            </ul>


        </div>
    }
}
