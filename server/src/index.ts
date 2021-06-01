import 'reflect-metadata'
import MovieService from './services/MovieService'
import Movie from './entities/Movie'


const m: any = {
    name: '123',
    types: ['1'],
    areas: ['1'],
    timeLong: 2,
    isHot: true,
    isClasic: true,
    isComing: true
}
MovieService.addMovie(m).then(res => {
    if (Array.isArray(res)) {
        console.log(res)
        return
    }
    console.log(res._id)
})