import React from 'react';
import { Form } from 'antd';
import { observer, inject } from 'mobx-react';
@inject('dmStore')
@observer
class Gridinfo extends React.Component {
    constructor(props) {
        super(props);
        this.dmstore = props.dmStore;
    }

    render() {
        let xtitle = '字段管理:' + this.dmstore.current_actname + '/' + this.dmstore.current_actcode;
        return <div> {xtitle} </div>;
    }
}
export default Form.create()(Gridinfo);
