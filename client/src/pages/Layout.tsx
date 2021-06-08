import React from 'react'
import { NavLink, Route } from 'react-router-dom'
import Home from './Home'
import MovieList from './movie/MovieList'
import AddMovie from './movie/AddMovie'
import EditMovie from './movie/EditMovie'
import { Layout, Menu } from 'antd'
import '../index.css'
const { Header, Sider, Content } = Layout;

const _Layout: React.FC = () => {
    return (
        <div className='container'>
            <Layout>
                <Header className='header'>
                    <NavLink to="/">猫眼电影管理系统</NavLink>
                </Header>
                <Layout>
                    <Sider>
                        <Menu
                            mode="inline"
                            theme="dark"
                        >
                            <Menu.Item key="1" >
                                <NavLink to="/movie" >电影列表</NavLink>
                            </Menu.Item>
                            <Menu.Item key="2" >
                                <NavLink to="/movie/add" >添加电影</NavLink>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Content>
                        <div className='main'>
                            <Route path="/" exact component={Home}></Route>
                            <Route path="/movie" exact component={MovieList}></Route>
                            <Route path="/movie/add" component={AddMovie}></Route>
                            <Route path="/movie/edit/:id" component={EditMovie}></Route>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}

export default _Layout