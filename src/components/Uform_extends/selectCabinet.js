import React from 'react';
import CommonTable from '@/routes/commonAntTable/components/commonTableCom/commonTable';
import { toJS } from 'mobx';

export default class SelectCabinet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRows: []
        };
    }

    sendData(selectedRows) {
        console.log('sendData');

        if (selectedRows.length) {
            let current_row = toJS(selectedRows[0]);
            console.log(current_row);
            this.props.onChange(current_row.id);
        }
        this.setState({
            selectedRows: selectedRows
        });
    }

    render() {
        return (
            <div>
                <CommonTable ref="commonTableRef" key="key_salesout_prod" action_code="buyinprodlist" sendData={(res) => this.sendData(res)} />
            </div>
        );
    }
}
