import React from 'react';
import { Radio } from 'antd'
import { Select } from 'antd';

import api from '@/api/api'
const { Option } = Select;


export default class Dropdownlist extends React.Component {
    constructor(props) {

        super(props)
        console.log(props)
    }



    state = {
        opts: ['aa', 'bb', 'cc', 'dd']
    }


    componentDidMount() {
        //dropdownoptions
    }

    onChange = e => {
        // console.log(e)
        this.props.getComponentValue(e)
    };


    render() {

        let dropdownoptions = this.props.dropdownoptions.split(',')
        // console.log(dropdownoptions)

        // debugger;



<<<<<<< HEAD
        // let defv = ''
        // if (dropdownoptions.length > 0) {
        //     defv = dropdownoptions[0]
            // this.onChange(defv)
        // }
=======
        let defv = ''
        if (dropdownoptions.length > 0) {
            defv = dropdownoptions[0]
            this.onChange(defv)
        }
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778


        return (
            <div>

<<<<<<< HEAD
                <Select placeholder='请选择' style={ { width: 120 } } onChange={ this.onChange }>
=======
                <Select defaultValue={ defv } style={ { width: 120 } } onChange={ this.onChange }>
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
                    {
                        dropdownoptions ?
                            dropdownoptions.map((item, index) => {
                                return (
                                    <Option key={ index } value={ item }>{ item }</Option>
                                )
                            })
                            :
                            null
                    }

                </Select>



            </div>










        );
    }
}