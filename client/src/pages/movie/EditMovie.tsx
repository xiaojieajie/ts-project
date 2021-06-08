import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router';

interface IParams {
    id: string
}

export default class EditMovie extends Component<RouteComponentProps<IParams>> {
    render() {
        console.log(this.props.match.params.id);
        return (
            <div>
                修改电影
                {this.props.match.params.id}
            </div>
        )
    }
}
