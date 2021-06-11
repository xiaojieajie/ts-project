import React, { Component } from 'react'
import { Upload, message, Modal } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { UploadChangeParam } from 'antd/lib/upload'
import { IResponseData, IResponseError } from '../services/CommonTypes'
import { UploadFile } from 'antd/lib/upload/interface'
interface IProps {
  value?: string
  onChange?(img: string): void
}
interface IState {
  loading: boolean,
  fileList: Array<UploadFile>,
  previewVisible: boolean
}
export default class ImageUpload extends Component<IProps, IState> {
  state: IState = {
    loading: false,
    fileList: [],
    previewVisible: false
  }
  private handleChange = (info: UploadChangeParam) => {
    if (info.file.response) {
      this.props.onChange && this.props.onChange(info.file.response.data)
    }
    this.setState({ fileList: info.fileList })
  }
  private handlePreview = (info: UploadFile) => {
    this.setState({
      previewVisible: true
    })
  }
  private async handlerRequest(p: any) {
    const form = new FormData()
    form.append(p.filename, p.file)
    const request = new Request(p.action, {
      method: 'post',
      body: form
    })
    const result: IResponseData<string> | IResponseError = await fetch(request).then(resp => resp.json())
    if (result.err) {
      message.error(result.err)
      return
    }
    this.props.onChange!(result.data!)
  }
  componentDidUpdate(prevProps: IProps) {
    if (this.props.value !== prevProps.value) {
      this.setState({
        fileList: [
          { url: this.props.value, name: this.props.value, uid: this.props.value }
        ]
      })
    }
  }
  render() {
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          name="imgfile"
          listType="picture-card"
          className="avatar-uploader"
          accept='.jpg,.png,.gif'
          action="/api/upload"
          fileList={this.state.fileList}
          showUploadList={true}
          // beforeUpload={beforeUpload}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          // customRequest={this.handlerRequest}
        >
          {this.props.value ? null : uploadButton}
        </Upload>
        <Modal
          visible={this.state.previewVisible}
          footer={null}
          onCancel={() => {
            this.setState({
              previewVisible: false
            })
          }}
        >
          <img alt="example" style={{ width: '100%' }} src={this.props.value!} />
        </Modal>
      </>
    )
  }
}
