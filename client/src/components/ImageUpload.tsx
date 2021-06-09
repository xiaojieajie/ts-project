import React, { Component } from 'react'
import { Upload } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { UploadChangeParam } from 'antd/lib/upload'
interface IProps {
  value?: string
  onChange?(): void
}
export default class ImageUpload extends Component<IProps> {
  state = {
    loading: false
  }
  handleChange = (info: UploadChangeParam) => {
    console.log('我来触发了');
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
    }
  }
  render() {
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <Upload
        name="imgfile"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="/api/upload"
        // beforeUpload={beforeUpload}
        onChange={this.props.onChange}
      >
        {this.props.value ? <img src={this.props.value} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    )
  }
}
