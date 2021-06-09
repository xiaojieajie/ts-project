import React, { Component } from 'react'
import { Button, Image, Input, message, Popconfirm, Space, Switch, Table } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import { IMovieState } from '../redux/reducers/MovieReducer'
import { IMovie } from '../services/MovieService'
import { RouteComponentProps } from 'react-router'
import './movieTable.css'
import { SwitchType } from '../services/CommonTypes'
import { ColumnType, TablePaginationConfig } from 'antd/lib/table'
import { FilterDropdownProps } from 'antd/lib/table/interface'

export interface IMovieTableEvents {
  onload(): void
  onSwitchChange(type: SwitchType, newState: boolean, id: string): void
  onPagiChange(newPage: number): void
  onDelete(id: string): Promise<void>
  onKeyChange(key: string): void
  onSearch: () => void
}

export default class MovieTable extends Component<IMovieState & IMovieTableEvents & RouteComponentProps> {
  componentDidMount() {
    this.props.onload()
  }
  private getFilterDropDown = (p: FilterDropdownProps) => {
    return (
      <div style={{ padding: 8 }}>
        <Input
          style={{ marginBottom: 8, display: 'block' }}
          value={this.props.condition.key}
          onChange={e => this.props.onKeyChange(e.target.value)}
          onPressEnter={this.props.onSearch}
        />
        <Space>
          <Button
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
            onClick={this.props.onSearch}
          >
            搜索
          </Button>
          <Button
            size="small"
            type='primary'
            onClick={() => {
              this.props.onKeyChange('')
              this.props.onSearch()
            }}
          >
            重置
          </Button>
        </Space>
      </div>
    )
  }
  private getColumns(): ColumnType<IMovie>[] {
    return [
      { 
        title: '电影名称', dataIndex: 'name', align: 'center',
        filterDropdown: this.getFilterDropDown,
        filterIcon: <SearchOutlined />
      },
      {
        title: '封面', dataIndex: 'poster', align: 'center',
        render: (text: string, record: IMovie) => {
          return <Image width={60} preview={true} src={text ? text : 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1183417802,3760407947&fm=26&gp=0.jpg'} />
        }
      },
      { title: '电影类型', dataIndex: 'types', align: 'center' },
      { title: '上映地区', dataIndex: 'areas', align: 'center' },
      {
        title: '时长', dataIndex: 'timeLong', align: 'center',
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
        title: '操作', dataIndex: '_id', align: 'center',
        render: (id: string) => {
          return (<div>
            <Button type="primary" size="small" style={{ marginRight: '10px' }} onClick={() => {
              this.props.history.push(`/movie/edit/${id}`)
            }}>编辑</Button>
            <Popconfirm title="确定要删除吗？" onConfirm={async () => {
                await this.props.onDelete(id)
                message.success('删除成功')
              }} okText="确定" cancelText="取消" >
              <Button type ="primary" size="small" danger >删除</Button>
            </Popconfirm>
          </div>)
        }
      }
    ]
  }

  private getPageConfig(): TablePaginationConfig | false {
    if (this.props.total === 0) {
      return false
    }
    return {
      current: this.props.condition.page,
      pageSize: this.props.condition.limit,
      total: this.props.total,
      showSizeChanger: false,
      onChange: this.props.onPagiChange
    }
  }
  render() {
    return (
      <div className='tableOuter'>
        <Table
          columns={this.getColumns()}
          loading={this.props.isLoading}
          dataSource={this.props.data}
          rowKey='_id'
          pagination={this.getPageConfig()}
        />
      </div>
    )
  }
}
