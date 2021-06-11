
import { Button, Checkbox, CheckboxOptionType, Form, FormInstance, Input, InputNumber, message, Switch } from 'antd'
import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { IMovie } from '../services/MovieService'
import ImageUpload from './ImageUpload'

const publicLayout = {
  labelCol: {span: 2},
  wrapperCol: {span: 22}
}
const { TextArea } = Input
const allTypes: Array<CheckboxOptionType | string> = [
  { label: '喜剧', value: '喜剧' },
  { label: '灾难', value: '灾难' },
  { label: '动作', value: '动作' },
  { label: '爱情', value: '爱情' },
]
const allAreas: Array<CheckboxOptionType | string> = [
  { label: '中国大陆', value: '中国大陆' },
  { label: '美国', value: '美国' },
  { label: '中国台湾', value: '中国台湾' },
  { label: '中国香港', value: '中国香港' },
]
interface IProps extends RouteComponentProps {
  onFinish(movie: IMovie): Promise<string>
  movie?: IMovie
}
class MovieForm extends Component<IProps> {

  private formRef: React.RefObject<FormInstance<IMovie>> = React.createRef()
  private onFinish = async (values: IMovie) => {
    const err = await this.props.onFinish(values)
    if (err) {
      message.error(err)
      return
    }
    message.success('处理成功', 1, () => {
      this.props.history.goBack()
    })
  }
  componentDidUpdate() {
    this.formRef.current.setFieldsValue({
      ...this.props.movie
    })
  }
  render() {
    return (
      <>
        <Form ref={this.formRef} name='MovieForm' {...publicLayout} onFinish={this.onFinish}>
          <Form.Item label="名字" name="name" wrapperCol={{span: 8}}
            rules={[{ required: true, message: '必须填写电影名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="封面图" name='poster' >
            <ImageUpload />
          </Form.Item>
          <Form.Item label="电影类型" name='types' rules={[{ required: true, message: '必须选择电影类型' }]}>
            <Checkbox.Group options={allTypes} />
          </Form.Item>
          <Form.Item label="地区" name='areas' rules={[{ required: true, message: '必须选择地区' }]}>
            <Checkbox.Group options={allAreas} />
          </Form.Item>
          <Form.Item label="时长" name='timeLong' rules={[{ required: true, message: '必须选择地区' }]}>
            <InputNumber min={1} max={9999} />
          </Form.Item>
          <Form.Item label="是否热映" name='isHot' initialValue={false} valuePropName='checked'>
            <Switch />
          </Form.Item>
          <Form.Item label="即将上映" name='isComing' initialValue={false} valuePropName='checked'>
            <Switch />
          </Form.Item>
          <Form.Item label="经典影片" name='isClasic' initialValue={false} valuePropName='checked'>
            <Switch />
          </Form.Item>
          <Form.Item label="描述" name='description' wrapperCol={{span: 8}}>
            <TextArea placeholder="请输入描述" autoSize={{ minRows: 3, maxRows: 5 }} />
          </Form.Item>
          <Form.Item label=' ' colon={false}  >
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </>
    )
  }
}

export default withRouter(MovieForm)

