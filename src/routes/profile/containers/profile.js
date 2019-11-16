import React from 'react'
import { Form, Input, Radio, message, Upload, Icon } from 'antd';
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
export default class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            department: '',
            role_name: '',
            user: '',
            email: '',
            mobile: '',
            receive_mail_notify: '',
            receive_sms_notify: '',
            receive_dingtalk_notify: '',
            loading: false,
            imageUrl: '',
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
    }
    async getprofile() {
        let res = await api.user.profile({ method: 'POST' })
        if (res.code == '200') {
            this.setState({
                department: res.data.department,
                role_name: res.data.role_name,
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
    render() {
        const uploadButton = (
            <div>
                <Icon type={ this.state.loading ? 'loading' : 'plus' } />
            </div>
        );
        const { imageUrl } = this.state;
        return (
            <div style={ { margin: '50px auto', width: '600px' } }>
                <Form labelCol={ { span: 7 } } wrapperCol={ { span: 10 } }>
                    <Form.Item label="修改头像" hasFeedback>
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={ false }
                            action={ api.auth.upload_url }
                            headers={ { Authorization: this.state.authorization } }
                            beforeUpload={ beforeUpload }
                            onChange={ this.handleChange }
                        >
                            { imageUrl ? <img src={ imageUrl } alt="avatar" style={ { width: '100%' } } /> : uploadButton }
                        </Upload>
                    </Form.Item>

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
                    </Form.Item>
                    <Form.Item style={ { padding: '0px 0px 0px 95px' } } label="是否接受邮件通知：" hasFeedback>
                        <Radio.Group name='receive_mail_notify' options={ plainOptions } onChange={ this.onChange } value={ this.state.receive_mail_notify } />
                    </Form.Item>
                    <Form.Item style={ { padding: '0px 0px 0px 95px' } } label="是否接受短信通知" hasFeedback>
                        <Radio.Group name='receive_sms_notify' options={ options } onChange={ this.onChange } value={ this.state.receive_sms_notify } />
                    </Form.Item>
                    <Form.Item style={ { padding: '0px 0px 0px 95px' } } label="是否接受钉钉通知" hasFeedback>
                        <Radio.Group name='receive_dingtalk_notify' options={ optionsWithDisabled } onChange={ this.onChange } value={ this.state.receive_dingtalk_notify } />
                    </Form.Item>
                </Form>
            </div>
        )
    }
}