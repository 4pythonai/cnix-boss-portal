import React from "react";
import { Button, Collapse, Divider, Descriptions, Table } from "antd";
import "../flow.scss";
import { toJS } from "mobx";
// import Editor from '@/components/Uform_extends/wangeditor'

// 统一后台返回格式,方便渲染.

export default class GuideReferInfo extends React.Component {
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




    render() {
        return <div style={{padding: '10px'}} dangerouslySetInnerHTML={{ __html: this.state.xinfo}}></div>
    }
}
