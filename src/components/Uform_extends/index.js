import React from 'react';
import { registerFormFields, connect } from '@uform/react'
import { Input } from 'antd'

import CheckBoxTest from './checkBoxTest'
import Fileuploader from './fileuploader'
import Assocselect from './assocSelect'
import AssocSelectSimple from './assocSelectSimple'
 
 
import GetLander from './getLander'
import GetDepart from './getDepart'
import GetLoginuser from './getLoginuser'
import YesOrNo from './yesOrNo'
import Dropdownlist from './dropdownList'
import SelectLimitDate from './selectLimitDate'
import GetDate from './getDate'
import WorkloadTableeditor from './workloadTableeditor.js'
import GetActionCode from './getActionCode.js'
import CheckBox from './checkbox'
import GetRadio from './getRadio'
import Wangeditor from './wangeditor'
import SelectExactDate from './selectExactDate'
import Dropdowncombox from './dropdowncombox'
import PortSpeedDropdown from './PortSpeedDropdown'
import PortTypeDropdown from './PortTypeDropdown'
import YnSelect from './YnSelect'
import CommonTable from '@/routes/commonAntTable/components/commonTableCom/commonTable'
import UbitLocation from './UbitLocation'
import EditgetDate from './editgetDate'
import CategoryDropDown from './categoryDropDown'
import QuitInput from './quitInput'
import DeviceDroplist from './deviceDroplist'
import DeviceNumber from './deviceNumber'
import ProviderList from './providerList'
import SearchUser from './searchUser'






registerFormFields({
    YesOrNo: connect()(props => <YesOrNo      { ...props } getComponentValue={ props.onChange } value={ props.value || '' } />),
    checkBoxTest: connect()(props => <CheckBoxTest { ...props } getComponentValue={ props.onChange } value={ props.value || '' } />),
    fileuploader: connect()(props => <Fileuploader { ...props } value={ props.value || '' } />),

    com_cabinet: connect()(props => <ComCabinet { ...props } value={ props.value || '' } />),
 
    Assocselect: connect()(props => <Assocselect { ...props } value={ props.value || '' } />),
    AssocSelectSimple: connect()(props => <AssocSelectSimple{ ...props } value={ props.value || '' } />),
    text_area: connect()(props => <Input.TextArea { ...props } value={ props.value || '' } />),
    tableEditor: connect()(props => <CommonTable { ...props } value={ 'aaaa' } />),
    Dropdownlist: connect()(props => <Dropdownlist      { ...props } getComponentValue={ props.onChange } value={ props.value || '' } />),
    WorkloadTableeditor: connect()(props => <WorkloadTableeditor      { ...props } getComponentValue={ props.onChange } value={ props.value || '' } />),
    CategoryDropDown: connect()(props => <CategoryDropDown      { ...props } getComponentValue={ props.onChange } value={ props.value || '' } />),

    GetLander: connect()(props => <GetLander { ...props } value={ props.value || '' } />),
    GetLoginuser: connect()(props => <GetLoginuser { ...props } value={ props.value || '' } />),
    GetDepart: connect()(props => <GetDepart { ...props } value={ props.value || '' } />),
    SelectLimitDate: connect()(props => <SelectLimitDate { ...props } value={ props.value || '' } />),
    GetDate: connect()(props => <GetDate { ...props } value={ props.value || '' } />),
    GetActionCode: connect()(props => <GetActionCode { ...props } value={ props.value || '' } />),
    CustomerSelect: connect()(props => <CustomerSelect { ...props } value={ props.value || '' } />),
    CheckBox: connect()(props => <CheckBox { ...props } value={ props.value || '' } />),
    Wangeditor: connect()(props => <Wangeditor { ...props } value={ props.value || '' } />),
    SelectExactDate: connect()(props => <SelectExactDate { ...props } value={ props.value || '' } />),

    Dropdowncombox: connect()(props => <Dropdowncombox { ...props } value={ props.value || '' } />),

    QuitInput: connect()(props => <QuitInput { ...props } value={ props.value || '' } />),

    GetRadio: connect()(props => <GetRadio { ...props } value={ props.value || '' } />),
    PortSpeedDropdown: connect()(props => <PortSpeedDropdown { ...props } value={ props.value || '' } />),
    PortTypeDropdown: connect()(props => <PortTypeDropdown  { ...props } value={ props.value || '' } />),
    YnSelect: connect()(props => <YnSelect { ...props } value={ props.value || '' } />),
    CabinetPowerQuantity: connect()(props => <CabinetPowerQuantity { ...props } value={ props.value || '' } />),
    UbitLocation:connect()(props => <UbitLocation { ...props } value={ props.value || '' } />),
    EditgetDate:connect()(props => <EditgetDate { ...props } value={ props.value || '' } />),
    DeviceDroplist:connect()(props => <DeviceDroplist { ...props } value={ props.value || '' } />),
    DeviceNumber:connect()(props => <DeviceNumber { ...props } value={ props.value || '' } />),
    ProviderList:connect()(props => <ProviderList { ...props } value={ props.value || '' } />),
    SearchUser:connect()(props => <SearchUser { ...props } value={ props.value || '' } />)


})
