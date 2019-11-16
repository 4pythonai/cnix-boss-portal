import React from 'react'
import { DatePicker } from 'antd';
const format = "YYYY-MM-DD";

export default class DatePickerCustom extends React.Component {
    constructor(props) {
        super();
        this.state = {
            endOpen: false
        }
    }

    disabledStartDate = startValue => {
        if (!startValue || !this.props.endValue) {
            return false;
        }
        return startValue.valueOf() > this.props.endValue.valueOf();
    };

    disabledEndDate = endValue => {
        if (!endValue || !this.props.startValue) {
            return false;
        }
        return endValue.valueOf() <= this.props.startValue.valueOf();
    };


    handleStartOpenChange = open => {
        if (!open) {
            this.setState({ endOpen: true });
        }
    };

    handleEndOpenChange = open => {
        this.setState({ endOpen: open });
    };

    render() {

        const { endOpen } = this.state;
        return (
            <div className="dateWrapper">
                <div className="dataInputBox">
                    <section className="contractFormGroup">
                        <label className="label contractFormInfo">
                            {
                                this.props.require
                                    ?
                                    <span className="requireIcon">*</span>
                                    :
                                    ''
                            }
                            {this.props.startText}：</label>
                        <div className="contractFormValue">

                                <DatePicker
                                    disabled={this.props.disabled}
                                    className="datePicker"
                                    disabledDate={this.disabledStartDate}
                                    format={format}
                                    value={this.props.startValue}
                                    placeholder={"请选择" + this.props.startText}
                                    onChange={this.props.onStartChange}
                                    onOpenChange={this.handleStartOpenChange}
                                />
                        </div>
                    </section>
                    <section className="contractFormGroup">
                        <label className="label contractFormInfo">

                            {
                                this.props.require
                                    ?
                                    <span className="requireIcon">*</span>
                                    :
                                    ''
                            }
                            {this.props.endText}：</label>
                        <div className="contractFormValue">

                            <DatePicker
                                disabled={this.props.disabled}

                                className="datePicker"
                                disabledDate={this.disabledEndDate}
                                format={format}
                                value={this.props.endValue}
                                placeholder={"请选择" + this.props.endText}
                                onChange={this.props.onEndChange}
                                open={endOpen}
                                onOpenChange={this.handleEndOpenChange}
                            />
                        </div>
                    </section>
                </div>

                {
                    this.props.sumValue ?
                        <div className="dateSum">
                            <span>{this.props.sumValue}天</span>
                        </div>
                        :
                        ''
                }

            </div>
        );
    }
}
