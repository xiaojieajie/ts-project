import React, { Component } from 'react'
import MovieForm from '../../components/MovieForm'
import MovieService from '../../services/MovieService'
export default class AddMovie extends Component {
    render() {
        return (
            <>
                <h1>添加电影</h1>
                <MovieForm onFinish={async (movie) => {
                    const result = await MovieService.add(movie)
                    return result.err
                }} />
            </>
        )
    }
}
