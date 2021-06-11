import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router';
import MovieForm from '../../components/MovieForm';
import MovieService, { IMovie } from '../../services/MovieService';

interface IParams {
    id: string
}

interface EditPageState {
    movie?: IMovie
}

export default class EditMovie extends Component<RouteComponentProps<IParams>, EditPageState> {
    state: EditPageState = {
        movie: undefined
    }

    async componentDidMount() {
        const resp = await MovieService.getMovieById(this.props.match.params.id)
        if (resp.data) {
            this.setState({
                movie: resp.data
            })
        }
    }
    render() {
        return (
            <>
            <h1>添加电影</h1>
            <MovieForm movie={this.state.movie as any} onFinish={async (movie) => {
                const result = await MovieService.edit(this.props.match.params.id, movie)
                return result.err
            }} />
        </>
        )
    }
}
