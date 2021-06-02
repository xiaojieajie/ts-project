import 'reflect-metadata'
import MovieService from './services/MovieService'

const cond: any = {
    page: 1,
    limit: 10,
}

MovieService.find(cond).then(res => {
    if (res.errors.length > 0) {
        console.log(res.errors)
    } else {
        res.data.forEach(it => console.log(it.name))
    }
})