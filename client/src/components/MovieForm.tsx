
import { Button, Form, Input } from 'antd'
import React, { Component } from 'react'
import ImageUpload from './ImageUpload'

const publicLayout = {
  labelCol: {span: 2},
  wrapperCol: {span: 22}
}
const onFinish = (values: any) => {
  console.log(values);
} 
class MovieForm extends Component {
  render() {
    console.log(this.props);
    return (
      <>
        <Form name='MovieForm' {...publicLayout} onFinish={onFinish}>
          <Form.Item
            label="名字"
            name="name"
            wrapperCol={{span: 8}}
            rules={[{ required: true, message: '必须填写电影名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="封面图"
            name='poster'
          >
            <ImageUpload />
          </Form.Item>
          <Form.Item label=' ' colon={false}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </>
    )
  }
}

export default MovieForm