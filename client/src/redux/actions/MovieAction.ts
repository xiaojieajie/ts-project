import { ThunkAction } from "redux-thunk"
import { ISearchCondition, SwitchType } from "../../services/CommonTypes"
import MovieService, { IMovie } from "../../services/MovieService"
import { IRootState } from "../reducers/RootReducer"
import { IAction } from "./ActionTypes"

// action创建函数
export type SaveMoviesAction = IAction<'movie_save', {
    movies: IMovie[],
    total: number
}>
export function saveMoviesAction(movies: IMovie[], total: number): SaveMoviesAction {
    return {
        type: 'movie_save',
        payload: {
            movies,
            total
        }
    }
}

export type SetLoadingAction = IAction<"move_setLoading", boolean>

export function setLoadingAction(isLoading: boolean): SetLoadingAction {
    return {
        type: 'move_setLoading',
        payload: isLoading
    }
}

export type SetConditionAction = IAction<"movie_setCondition", ISearchCondition>

export function setConditionAction(condition: ISearchCondition): SetConditionAction {
    return {
        type: 'movie_setCondition',
        payload: condition
    }
}

export type DeleteAction = IAction<"movie_delete", string>

export type MovieChangeSwitchAction = IAction<"movie_switch", {
    type: SwitchType, newVal: boolean, id: string
}>
export function changeSwitchAction(type: SwitchType, newVal: boolean, id: string): MovieChangeSwitchAction {
    return {
        type: 'movie_switch',
        payload: {
            type,
            newVal,
            id
        }
    }
}

export type MovieActions = SaveMoviesAction | SetLoadingAction | SetConditionAction | DeleteAction | MovieChangeSwitchAction

export function fetchMovie(condition: ISearchCondition): ThunkAction<Promise<void>, IRootState, any, MovieActions> {
    return async (dispatch, getState) => {
        // 1.设置加载状态
        dispatch(setLoadingAction(true))
        // 2.设置条件
        dispatch(setConditionAction(condition))
        // 3. 获取服务器设置
        const curCondition = getState().movie.condition
        const resp = await MovieService.getMovies(curCondition)
        // 4. 更改仓库中的数据
        dispatch(saveMoviesAction(resp.data, resp.total))
        // 3.取消加载效果
        dispatch(setLoadingAction(false))
    }
}

export function deleteMovie(id: string): ThunkAction<Promise<void>, IRootState, any, MovieActions> {
    return async (dispatch) => {
        dispatch(setLoadingAction(true))
        await MovieService.delete(id)
        dispatch(deleteAction(id)) // 删除本地仓库中的数据
        dispatch(setLoadingAction(false))
    }
}
export function changeSwitch(type: SwitchType, newVal: boolean, id: string): ThunkAction<Promise<void>, IRootState, any, MovieActions> {
    return async dispatch => {
        dispatch(changeSwitchAction(type, newVal, id))
        await MovieService.edit(id, {
            [type]: newVal
        })
    }
}
export function deleteAction(id: string): DeleteAction {
    return {
        type: 'movie_delete',
        payload: id
    }
}