
import React from 'react'
import { Button } from 'antd'
import '../contract.scss'
import { inject, observer } from 'mobx-react'
import Print from '../../../utils/print'


@inject('IDC_cfg_store')
@observer
export default class PrintContract extends React.Component {
    constructor(props) {
        super();

        this.store = props.IDC_cfg_store
    }

    printContractHandle(e) {
        e.stopPropagation();
        this.store.setDefaultActiveCollapse(['1','2','3']);
        setTimeout(() => {
            Print('.contractDetailContent', { 'no-print': '.no-print' });
        }, 1000)
    }


    render() {
        return (
            <Button className="print-button no-print" onClick={(e) => this.printContractHandle(e)} size="default" type="primary">打印</Button>
        )
    }
}
