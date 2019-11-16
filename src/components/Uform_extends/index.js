import React from 'react';
import { registerFormFields, connect } from '@uform/react'
import { Input } from 'antd'

import CheckBoxTest from './checkBoxTest'
import Fileuploader from './fileuploader'
import CandidateSelector from './CandidateSelector'
import Assocselect from './assocSelect'
import SelectCabinet from './selectCabinet'
import CabinetSelector from './CabinetSelector'
import ContractSelect from './contractSelect'
import GetLander from './getLander'
import GetDepart from './getDepart'
import YesOrNo from './yesOrNo'
import Dropdownlist from './dropdownList'
import SelectLimitData from './selectLimitData'

import WorkloadTableeditor from './workloadTableeditor.js'




import CommonTable from '@/routes/commonAntTable/components/commonTableCom/commonTable'

registerFormFields({
    YesOrNo: connect()(props => <YesOrNo      { ...props } getComponentValue={ props.onChange } value={ props.value || '' } />),
    checkBoxTest: connect()(props => <CheckBoxTest { ...props } getComponentValue={ props.onChange } value={ props.value || '' } />),
    fileuploader: connect()(props => <Fileuploader { ...props } value={ props.value || '' } />),

    selectCabinet: connect()(props => <SelectCabinet { ...props } value={ props.value || '' } />),
    com_cabinet: connect()(props => <ComCabinet { ...props } value={ props.value || '' } />),
    contractSelect: connect()(props => <ContractSelect { ...props } value={ props.value || '' } />),
    cabinetselector: connect()(props => <CabinetSelector { ...props } getComponentValue={ props.onChange } value={ props.value || '' } />),

    CandidateSelector: connect()(props => <CandidateSelector { ...props } value={ props.value || '' } />),

    Assocselect: connect()(props => <Assocselect { ...props } value={ props.value || '' } />),
    text_area: connect()(props => <Input.TextArea { ...props } value={ props.value || '' } />),
    tableEditor: connect()(props => <CommonTable { ...props } value={ 'aaaa' } />),
    Dropdownlist: connect()(props => <Dropdownlist      { ...props } getComponentValue={ props.onChange } value={ props.value || '' } />),
    WorkloadTableeditor: connect()(props => <WorkloadTableeditor      { ...props } getComponentValue={ props.onChange } value={ props.value || '' } />),

    GetLander: connect()(props => <GetLander { ...props } value={ props.value || '' } />),
    GetDepart: connect()(props => <GetDepart { ...props } value={ props.value || '' } />),
    SelectLimitData: connect()(props => <SelectLimitData { ...props } value={ props.value || '' } />)



})