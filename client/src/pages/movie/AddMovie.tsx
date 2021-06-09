import React, { Component } from 'react'
import MovieForm from '../../components/MovieForm'
export default class AddMovie extends Component {
    render() {
        return (
            <>
                <h1>添加电影</h1>
                <MovieForm />
            </>
        )
    }
}
