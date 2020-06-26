import React from 'react'
import { Upload, message, Button, Icon } from 'antd'
import api from '../../../api/api'
import { observer, inject } from "mobx-react"
import { toJS, } from "mobx"

@inject("IDC_cfg_store")
@observer
export default class UpLoad extends React.Component {

    constructor(props) {
        super(props)
        this.store = props.IDC_cfg_store
        this.onChange = this.onChange.bind(this)
    }

    async deleteFile(info) {
        this.store.deleteAttachmentUrl(info.file.response.data);
        let params = {
            data: {
                url: info.file.response.data,
                attachment_url: this.store.saveContractData.attachment_url,
                contract_no: this.store.saveContractData.contract_no,
                status: this.store.contractTableSource
            },
            method: 'POST'
        }
        
        let res = await api.contract_api.deleteFile(params)
        if (res.code == 200) {
            this.store.updateFileList(info.file.response.data);
            message.success('文件删除成功');
        }
        else {
            message.error('文件删除失败');
        }
    }

    async onChange(info) {
        console.log(info)
        if (info.file.status == 'uploading') {
            this.store.setFileList(info.fileList);
            return;
        }
        if (info.file.status == 'removed') {
            console.log("删除");
            this.deleteFile(toJS(info))
            return;
        }

        if (info.file.status == 'done') {
            this.store.setAttachmentUrl(info.file.response.data)
            this.store.setFileList(toJS(info.fileList));
            return;
        }
        if (info.file.status == 'error') {
            message.error(`${info.file.name} 文件上传失败.`);
            this.store.setFileList([]);
        }
    }

    beforeUpload = (file) => {
        return new Promise((resolve, reject) => {
            let arrtype = [
                'application/vnd.ms-excel',
                'docs',
                'text/plain',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'text/plain',
                'doc',
                'xlsx',
                'xls',
                'docx',
                'txt',
                'application/pdf',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'application/msword']
            if (arrtype.includes(file.type)) {
                resolve()
            } else {
                message.error(`暂时还不支持上传${file.type}类型的文件`)
                reject()
            }
        })
    }

    render() {
        let headers = {
            'Authorization': localStorage.getItem('token')
        }
        return (
            <div className="upLoadWrapper">
                <Upload
                    disabled={this.props.disabled}
                    data={{"source":"contract_attachment"}}
                    multiple={true}
                    headers={headers}
                    action={api.file.uploadFile}
                    onChange={this.onChange}
                    directory={false}
                    fileList={this.store.fileList}
                    beforeUpload={this.beforeUpload}
                >
                    <Button> <Icon type="upload" />合同附件上传</Button>
                </Upload>
            </div>
        )
    }
}



