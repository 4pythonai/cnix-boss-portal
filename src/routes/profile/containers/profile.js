import React from 'react'
<<<<<<< HEAD
import { Form, Input, Radio, message, Upload, Icon,Select,Button } from 'antd';
=======
import { Form, Input, Radio, message, Upload, Icon } from 'antd';
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
import 'antd/dist/antd.css';
import api from '../../../api/api'
const plainOptions = [
    { label: '是', value: 'y' },
    { label: '否', value: 'n' },
];
const options = [
    { label: '是', value: 'y' },
    { label: '否', value: 'n' },
];
const optionsWithDisabled = [
    { label: '是', value: 'y' },
    { label: '否', value: 'n' },
];
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;


}
<<<<<<< HEAD
class Profile extends React.Component {
=======
export default class Profile extends React.Component {
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
    constructor(props) {
        super(props)
        this.state = {
            department: '',
<<<<<<< HEAD
            role_code: '',
=======
            role_name: '',
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
            user: '',
            email: '',
            mobile: '',
            receive_mail_notify: '',
            receive_sms_notify: '',
            receive_dingtalk_notify: '',
            loading: false,
            imageUrl: '',
<<<<<<< HEAD
            authorization: '',
            roleList:[],
            deptList:[]
        }
        this.submit = this.submit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.roleonChange=this.roleonChange.bind(this)
        this.deptonChange=this.deptonChange.bind(this)
    }
    async componentDidMount() {
        this.getprofile()
        let auth_code = localStorage.getItem('token');
        this.setState({
            authorization: auth_code
        })
        let params={data:{currentPage: 1,pageSize: 1000},method:'POST'}
        let res=await api.permission.getRoleList(params) 
        if(res.code==200){
            this.setState({
                roleList:res.data
            })
        }
        let param={data:{isFilterSelfData: "n",actcode: "nanx_organization",currentPage: 1,pageSize: 1000,query_cfg: null,role: sessionStorage.getItem('role_code'),user: sessionStorage.getItem('user')},method:'POST'}
        let resp=await api.curd.getDept(param) 
        if(resp.code==200){

            this.setState({
                deptList:resp.data
            })
        }
=======
            authorization: ''
        }
        this.submit = this.submit.bind(this)
        this.onChange = this.onChange.bind(this)
    }
    componentDidMount() {
        this.getprofile()
        let auth_code = localStorage.getItem('token');
        console.log('查看token', auth_code);
        this.setState({
            authorization: auth_code
        })
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
    }
    async getprofile() {
        let res = await api.user.profile({ method: 'POST' })
        if (res.code == '200') {
            this.setState({
<<<<<<< HEAD
                department: res.data.deptid,
                role_code: res.data.role_code,
=======
                department: res.data.department,
                role_name: res.data.role_name,
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
                user: res.data.user,
                email: res.data.email,
                mobile: res.data.mobile,
                receive_mail_notify: res.data.receive_mail_notify != null ? res.data.receive_mail_notify : "",
                receive_sms_notify: res.data.receive_sms_notify != null ? res.data.receive_sms_notify : "",
                receive_dingtalk_notify: res.data.receive_dingtalk_notify != null ? res.data.receive_dingtalk_notify : "",
                imageUrl: res.data.head_portrait
            })
        }
    }
    onChange(e) {
<<<<<<< HEAD
        this.setState({
            [e.target.name]: e.target.value,
        });

    };
    async submit() {
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if(err){
                return             
            }
            let data={deptid:this.state.department,role_code:this.state.role_code,email:this.state.email,"receive_mail_notify": this.state.receive_mail_notify, "receive_sms_notify": this.state.receive_sms_notify, "receive_dingtalk_notify": this.state.receive_dingtalk_notify}
        let params = { method: 'POST', data: data }
        let res = await api.user.updateUserInformation(params)
        
        })
        
    }

    
=======
        console.log(e);
        this.setState({
            [e.target.name]: e.target.value,
        }, () => { this.submit() });

    };
    async submit() {
        let params = { method: 'POST', data: { "receive_mail_notify": this.state.receive_mail_notify, "receive_sms_notify": this.state.receive_sms_notify, "receive_dingtalk_notify": this.state.receive_dingtalk_notify } }
        let res = await api.user.setnotify(params)
        console.log(res)
        if (res.code == '200') {
            message.success("保存通知成功")
        }
    }
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
    handleChange = info => {
        console.log(info.file)
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };
<<<<<<< HEAD
    roleonChange(e){
        this.setState({
            role_code:e
        })
        
    }
    roleonSearch(){

    }
    deptonChange(e){
        this.setState({
            department:e
        })
    }
    checkAccount(rule, value, callback) {
        var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;

       if (re.test(value)) {
           callback();
       } else {
           callback('请输入正确格式');
       }
   };
=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
    render() {
        const uploadButton = (
            <div>
                <Icon type={ this.state.loading ? 'loading' : 'plus' } />
            </div>
        );
        const { imageUrl } = this.state;
<<<<<<< HEAD
        const { getFieldDecorator } = this.props.form
=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        return (
            <div style={ { margin: '50px auto', width: '600px' } }>
                <Form labelCol={ { span: 7 } } wrapperCol={ { span: 10 } }>
                    <Form.Item label="修改头像" hasFeedback>
                        <Upload
<<<<<<< HEAD
                            data={{"source":"avatar"}}
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={ false }
                            action={ api.file.uploadFile }
=======
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={ false }
                            action={ api.auth.upload_url }
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
                            headers={ { Authorization: this.state.authorization } }
                            beforeUpload={ beforeUpload }
                            onChange={ this.handleChange }
                        >
                            { imageUrl ? <img src={ imageUrl } alt="avatar" style={ { width: '100%' } } /> : uploadButton }
                        </Upload>
                    </Form.Item>
<<<<<<< HEAD
                    <Form.Item label="部门：" hasFeedback>
                    {getFieldDecorator('dept_name', {
                                    rules: [{
                                        required: true, message: '部门不能为空',
                                    }],
                                    initialValue:this.state.department
                                    
                                })(
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            optionFilterProp="children"
                            onChange={this.deptonChange}
                            onSearch={this.deptonSearch}
                            // value={this.state.department }
                        >
                            {this.state.deptList.map((item)=>{
                                return <Select.Option key={item.id}>{item.dept_name}</Select.Option>
                            })}
                        </Select>
                                )}
                    </Form.Item>
                    <Form.Item label="角色：" hasFeedback>
                    {getFieldDecorator('role_code', {
                                    rules: [{
                                        required: true, message: '角色不能为空',
                                    }],
                                    initialValue:this.state.role_code
                                    
                                })(
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            optionFilterProp="children"
                            onChange={this.roleonChange}
                            onSearch={this.roleonSearch}
                            // value={this.state.role_code}
                        >
                            {this.state.roleList.map((item)=>{
                                return <Select.Option name='role_code' key={item.role_code}>{item.role_name}</Select.Option>
                            })}
                        </Select>
                                )}
                    </Form.Item>
                    <Form.Item label="邮箱：" hasFeedback>
                    {getFieldDecorator('email', {
                                    rules: [{
                                        required: true, message: '邮箱不能为空',
                                    },{
                                        validator: this.checkAccount,
                                    }],
                                    initialValue:this.state.email
                                    
                                })(
                        <Input name='email' onChange={this.onChange}/>
                                )}
                    </Form.Item>
                    <Form.Item label="手机号：" hasFeedback>
                    {getFieldDecorator('mobile', {
                                    rules: [{
                                        required: true, message: '手机号不能为空',
                                    }],
                                    initialValue:this.state.mobile
                                    
                                })(
                        <Input disabled />
                                )}
=======

                    <Form.Item label="部门：" hasFeedback>
                        <Input disabled value={ this.state.department } />
                    </Form.Item>
                    <Form.Item label="角色：" hasFeedback>
                        <Input disabled value={ this.state.role_name } />
                    </Form.Item>
                    <Form.Item label="内部userID" hasFeedback>
                        <Input disabled value={ this.state.user } />
                    </Form.Item>
                    <Form.Item label="邮箱：" hasFeedback>
                        <Input disabled value={ this.state.email } />
                    </Form.Item>
                    <Form.Item label="手机号：" hasFeedback>
                        <Input disabled value={ this.state.mobile } />
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
                    </Form.Item>
                    <Form.Item style={ { padding: '0px 0px 0px 95px' } } label="是否接受邮件通知：" hasFeedback>
                        <Radio.Group name='receive_mail_notify' options={ plainOptions } onChange={ this.onChange } value={ this.state.receive_mail_notify } />
                    </Form.Item>
                    <Form.Item style={ { padding: '0px 0px 0px 95px' } } label="是否接受短信通知" hasFeedback>
                        <Radio.Group name='receive_sms_notify' options={ options } onChange={ this.onChange } value={ this.state.receive_sms_notify } />
                    </Form.Item>
<<<<<<< HEAD
                    {/* <Form.Item style={ { padding: '0px 0px 0px 95px' } } label="是否接受钉钉通知" hasFeedback>
                        <Radio.Group name='receive_dingtalk_notify' options={ optionsWithDisabled } onChange={ this.onChange } value={ this.state.receive_dingtalk_notify } />
                    </Form.Item> */}
                    <Form.Item style={ { padding: '0px 0px 0px 220px' } }>
                    <Button type="primary" onClick={this.submit}>保存</Button>
                    </Form.Item>
                    
=======
                    <Form.Item style={ { padding: '0px 0px 0px 95px' } } label="是否接受钉钉通知" hasFeedback>
                        <Radio.Group name='receive_dingtalk_notify' options={ optionsWithDisabled } onChange={ this.onChange } value={ this.state.receive_dingtalk_notify } />
                    </Form.Item>
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
                </Form>
            </div>
        )
    }
<<<<<<< HEAD
}
export default Form.create()(Profile);
=======
}
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
