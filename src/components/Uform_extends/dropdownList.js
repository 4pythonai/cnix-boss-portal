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



        let defv = ''
        if (dropdownoptions.length > 0) {
            defv = dropdownoptions[0]
        }


        return (
            <div>

                <Select defaultValue={ defv } style={ { width: 120 } } onChange={ this.onChange }>
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