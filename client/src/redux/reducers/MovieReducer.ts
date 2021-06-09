import { Reducer } from 'react'
import { ISearchCondition } from '../../services/CommonTypes'
import { IMovie } from '../../services/MovieService'
import { DeleteAction, MovieActions, MovieChangeSwitchAction, SaveMoviesAction, SetConditionAction, SetLoadingAction } from '../actions/MovieAction'

export type IMovieCondition = Required<ISearchCondition>

export interface IMovieState {
    /**
     * 电影数组
     */
    data: IMovie[]
    /**
     * 查询条件
     */
    condition: IMovieCondition
    /**
     * 总记录数
     */
    total: number

    /**
     * 是否正在加载数据
     */
    isLoading: boolean

    /**
     * 总页数
     */
    totalPage: number
}

const initialState: IMovieState = {
    data: [],
    condition: {
        page: 1,
        limit: 10,
        key: ''
    },
    total: 0,
    isLoading: false,
    totalPage: 0
}

type MovieReduce<A> = Reducer<IMovieState, A>

const saveMovie: MovieReduce<SaveMoviesAction> = (state, { payload: { movies, total } }) => {
    return { ...state, data: movies, total, totalPage: Math.ceil(total / state.condition.limit) }
}

const setCondition: MovieReduce<SetConditionAction> = (state, { payload }) => {
    const newState = { 
        ...state, 
        condition: {
            ...state.condition,
            ...payload
        },
    }
    newState.totalPage = Math.ceil(newState.total / newState.condition.limit)
    return newState
}

const setLoading: MovieReduce<SetLoadingAction> = (state, { payload }) => {
    return { ...state, isLoading: payload }
}

const deleteMovie: MovieReduce<DeleteAction> = (state, { payload }) => {
    return { 
        ...state, 
        data: state.data.filter(movie => movie._id !== payload),
        total: state.total - 1,
        totalPage: Math.ceil((state.total - 1) / state.condition.limit)
    }
}

const changeSwitch: MovieReduce<MovieChangeSwitchAction> = (state, action) => {
    // 1. 根据id找到对象
    const movie = state.data.find(d => d._id === action.payload.id)
    if (!movie) {
        return state
    }
    // 2. 对象克隆
    const newMovie = { ...movie }
    newMovie[action.payload.type] = action.payload.newVal
    // 3. 将对象重新放入到数组
    return {
        ...state,
        data: state.data.map(movie => {
            if (movie._id === action.payload.id) return newMovie
            return movie
        })
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state: IMovieState = initialState, action: MovieActions) => {
    switch (action.type) {
        case 'move_setLoading':
            return setLoading(state, action)
        case 'movie_delete':
            return deleteMovie(state, action)
        case 'movie_save':
            return saveMovie(state, action)
        case "movie_setCondition":
            return setCondition(state, action)
        case "movie_switch":
            return changeSwitch(state, action)
        default:
            return state
        }
}
