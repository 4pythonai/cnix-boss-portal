import React from 'react'
import { Button, Input } from 'antd';
import { inject, observer } from 'mobx-react'


@inject('IDC_cfg_store')
@observer
export default class ContractHighSearch extends React.Component {
    constructor(props) {
        super(props)
        this.store = props.IDC_cfg_store
    }

    getSearchOption() {
        return (
            <div className="searchRow">
                <div className="searchGroup">
                    <div className="searchInfo">合同号：</div>
                    <div className="searchValue">
                        <Input defaultValue={this.store.searchContractData.contract_no}
                            onChange={event => this.store.setSearchContractData(event.target.value, 'contract_no')} />
                    </div>
                </div>
                <div className="searchGroup">
                    <div className="searchInfo">合同名称：</div>
                    <div className="searchValue">
                        <Input defaultValue={this.store.searchContractData.contract_name}
                            onChange={event => this.store.setSearchContractData(event.target.value, 'contract_name')} />
                    </div>
                </div>

                <div className="searchGroup">
                    <div className="searchInfo">客户名称：</div>
                    <div className="searchValue">
                        <Input defaultValue={this.store.searchContractData.custome_name}
                            onChange={event => this.store.setSearchContractData(event.target.value, 'custome_name')} />
                    </div>
                </div>
                <div className="searchGroup">
                    <div className="searchInfo"></div>
                    <div className="searchValue">
                        <Button type="primary"
                            className="marginRihgt10"
                            onClick={this.store.getContractList}>查询</Button>
                    </div>
                </div>
            </div>
        )
    }

    render() {

        return (
            <div className="contractSearchOption">
                {
                    this.getSearchOption()
                }
            </div>
        );
    }
}
