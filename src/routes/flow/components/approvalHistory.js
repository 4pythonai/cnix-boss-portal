import React from 'react'
import { inject, observer } from 'mobx-react'

@inject('FlowApprovalStore')
@observer
export default class ApprovalHistory extends React.Component {
    constructor(props) {
        super(props)
        this.store = props.FlowApprovalStore;
    }

    renderSuggestionRow() {
        return (
            this.store.approvaSuggestion.map((item,index) => {
                return (
                    <div className="suggestionRow" key={index + 1}>
                        <div className="suggestionCol sortCol">{index + 1}</div>    
                        <div className="suggestionCol">{ item.option }</div>
                        <div className="suggestionCol">{ item.note }</div>
                        <div className="suggestionCol">{ item.operator }</div>
                        <div className="suggestionCol">{ item.operatorDuty }</div>
                        <div className="suggestionCol">{ item.operatorDep }</div>
                        <div className="suggestionCol">{ item.nextOperator }</div>
                        <div className="suggestionCol">{ item.date }</div>
                    </div>
                )
            })
        )
    }

    render() {
        if(this.store.approvaSuggestion.length == 0){
            return null
        }
        return (
            <div className="suggestionWrapper">
                <div className="suggestionHeader suggestionRow">
                    <div className="suggestionCol sortCol">序号</div>
                    <div className="suggestionCol">操作</div>
                    <div className="suggestionCol">审批意见</div>
                    <div className="suggestionCol">操作人</div>
                    <div className="suggestionCol">操作人职务</div>
                    <div className="suggestionCol">操作人部门</div>
                    <div className="suggestionCol">下一步操作人</div>
                    <div className="suggestionCol">审批时间</div>
                </div>
                {this.renderSuggestionRow()}
            </div>

        )
    }

}
