import { Dispatch } from 'react'
import { connect } from 'react-redux'
import MovieTable, { IMovieTableEvents } from '../../components/MovieTable'
import { changeSwitch, deleteMovie, fetchMovie, setConditionAction } from '../../redux/actions/MovieAction'
import { IRootState } from '../../redux/reducers/RootReducer'

const mapStateToProps = (state: IRootState) => {
    return state.movie
}

const mapDispatchToProps = (dispatch: Dispatch<any>): IMovieTableEvents => {
    return {
        onload() {
            dispatch(fetchMovie({
                page: 1
            }))
        },
        onPagiChange(newPage) {
            dispatch(fetchMovie({
                page: newPage
            }))
        },
        onSwitchChange(type, newVal, id) {
            dispatch(changeSwitch(type, newVal, id))
        },
        async onDelete(id) {
            await dispatch(deleteMovie(id))
        },
        onKeyChange(key) {
            dispatch(setConditionAction({
                key
            }))
        },
        onSearch() {
            dispatch(fetchMovie({
                page: 1
            }))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieTable)
