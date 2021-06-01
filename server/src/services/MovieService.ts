import { MovieModel } from '../db'
import Movie from '../entities/Movie'
import { IMovie } from '../db/MovieSchema'
export default class MovieService {
    @transFormClass
    @validate
    // @vali<Movie> @trans<Movie>
    public static async addMovie(movie: Movie): Promise<IMovie | string[]> {
        // 1. 转换类型(已经抽离)
        // 2. 数据验证(已经抽离)
        // 3.添加到数据库
        return await MovieModel.create(movie)
    }
}

function transFormClass(target: new () => object, propertyName: string, description: TypedPropertyDescriptor<Function>) {
    const prevMethod = description.value // addMovie这个函数
    description.value = async function (movie: Movie): Promise<IMovie | string[]> {
        console.log('转换之前', movie)
        movie = Movie.transform(movie)
        console.log('转换之后', movie)
        return prevMethod!.call(this, movie)
    }
}

function validate(target: new () => object, propertyName: string, description: TypedPropertyDescriptor<Function>) {
    const prevMethod = description.value // addMovie这个函数
    description.value = async function (movie: Movie): Promise<IMovie | string[]> {
        const errors = await movie.validateThis()
        console.log('我要开始验证了')
        if (errors.length) {
            return errors
        }
        console.log('验证结束了')
        return prevMethod!.call(this, movie)
    }
}

const m = new MovieService()
