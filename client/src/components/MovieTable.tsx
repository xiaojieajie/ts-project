import React, { Component } from 'react'
import { Button, Image, Switch, Table } from 'antd'
import { IMovieState } from '../redux/reducers/MovieReducer'
import { IMovie } from '../services/MovieService'
import { RouteComponentProps } from 'react-router'
import './movieTable.css'
import { SwitchType } from '../services/CommonTypes'

export interface IMovieTableEvents {
  onload(): void
  onSwitchChange(type: SwitchType, newState: boolean, id: string): void
  onPagiChange(newPage: number): void
}

export default class MovieTable extends Component<IMovieState & IMovieTableEvents & RouteComponentProps> {
  componentDidMount() {
    this.props.onload()
  }
  private getColumns(): object[] {
    return [
      { title: '电影名称', dataIndex: 'name', align: 'center' },
      { title: '封面', dataIndex: 'poster', align: 'center',
        render: (text: string, record: IMovie) => {
          return <Image width={60} src={text ? text : 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1183417802,3760407947&fm=26&gp=0.jpg'}  />
        }
      },
      { title: '电影类型', dataIndex: 'types', align: 'center' },
      { title: '上映地区', dataIndex: 'areas', align: 'center' },
      { title: '时长', dataIndex: 'timeLong', align: 'center',
        render(time: number) {
          return time + '分钟'
        }
      },
      { 
        title: '热映', dataIndex: 'isHot', align: 'center',
        render: (text: boolean, record: IMovie) => {
          return <Switch checked={text} onChange={(newVal) => { this.props.onSwitchChange(SwitchType.isHot, newVal, record._id!) }} />
        }
      },
      { 
        title: '即将上映', dataIndex: 'isComing', align: 'center',
        render: (text: boolean, record: IMovie) => {
          return <Switch checked={text} onChange={(newVal) => { this.props.onSwitchChange(SwitchType.isComing, newVal, record._id!) }} />
        }
      },
      { 
        title: '经典影片', dataIndex: 'isClasic', align: 'center',
        render: (text: boolean, record: IMovie) => {
          return <Switch checked={text} onChange={(newVal) => { this.props.onSwitchChange(SwitchType.isClasic, newVal, record._id!) }} />
        }
      },
      {
        title: '操作', dataIndex: 'handler', align: 'center',
        render: (text: undefined, record: IMovie) => {
          return (<div>
            <Button type="primary" size="small" style={{ marginRight: '10px' }} onClick={() => {
              this.props.history.push(`/movie/edit/${record._id}`)
            }}>编辑</Button>
            <Button type="primary" size="small" danger>删除</Button>
          </div>)
        }
      }
    ]
  }
  render() {
    return (
      <div className='tableOuter'>
        <Table 
          columns={this.getColumns()} 
          loading={this.props.isLoading} 
          dataSource={this.props.data} 
          rowKey='_id'
          pagination={{
            current: this.props.condition.page,
            pageSize: this.props.condition.limit,
            total: this.props.total,
            showSizeChanger: false,
            onChange: this.props.onPagiChange
          }}
        />
      </div>
    )
  }
}
