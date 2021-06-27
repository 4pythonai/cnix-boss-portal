import { Button } from 'antd';
import api from '@/api/api';
import React from 'react';
import ReactJson from 'react-json-view';
export default class TabToken extends React.Component {
    state = {
        visible: false,
        alreadyused: 0,
        jsonstr: {},
        pops: []
    };

    getToken = async () => {
        let params = { method: 'POST' };
        let json = await api.sdwan.GetToken(params);
        console.log(json);
        this.setState({ jsonstr: json });
    };

    render() {
        return (
            <div>
                <Button style={{ marginRight: '10px', marginBottom: '20px' }} type="danger" onClick={(event) => this.getToken(event)}>
                    XgetToken
                </Button>
                <ReactJson src={this.state.jsonstr} theme="twilight" />
            </div>
        );
    }
}
