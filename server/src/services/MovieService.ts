import { MovieModel } from '../db'
import Movie from '../entities/Movie'
import SearchCondition from '../entities/SearchCondition'
import { IMovie } from '../db/MovieSchema'
import { ISearchResult } from '../entities/CommonTypes'

type MovieOrCondition = Movie | SearchCondition

function transFormClass(target: new () => object, propertyName: string, description: TypedPropertyDescriptor<Function>) {
    const prevMethod = description.value // addMovie这个函数
    description.value = async function (movieOrCondition: MovieOrCondition, id: string): Promise<IMovie | string[]> {
        let transMovieOrCondition: Movie; // 转换后的类
        switch (propertyName) {
            case 'find':
                transMovieOrCondition = Movie.transform(movieOrCondition)
                return prevMethod!.apply(this, [transMovieOrCondition, id, movieOrCondition])
            case 'edit':
                transMovieOrCondition = Movie.transform(movieOrCondition)
                return prevMethod!.apply(this, [transMovieOrCondition, id, movieOrCondition])
            default:
                transMovieOrCondition = Movie.transform(movieOrCondition)
                return prevMethod!.apply(this, [transMovieOrCondition, id, movieOrCondition])
        }
    }
}

function validate(target: new () => object, propertyName: string, description: TypedPropertyDescriptor<Function>) {
    const prevMethod = description.value // addMovie这个函数
    description.value = async function (transMovieOrCondition: MovieOrCondition, id: string, movieOrCondition: MovieOrCondition): Promise<IMovie | string[] | ISearchResult<IMovie>> {
        let errors: string[];
        switch (propertyName) {
            case 'find':
                errors = await transMovieOrCondition.validateThis()
                if (errors.length) {
                    return {
                        errors,
                        total: 0,
                        data: []
                    } as ISearchResult<IMovie>
                }
                return prevMethod!.apply(this, [transMovieOrCondition])
            case 'edit':
                errors = await transMovieOrCondition.validateThis(true)
                if (errors.length) {
                    return errors
                }
                return prevMethod!.apply(this, [movieOrCondition, id])
            default:
                errors = await transMovieOrCondition.validateThis()
                if (errors.length) {
                    return errors
                }
                return prevMethod!.apply(this, [transMovieOrCondition])
        }
    }
}



export default class MovieService {
    @transFormClass
    @validate
    // @vali<Movie> @trans<Movie>
    public static async add(movie: Movie): Promise<IMovie | string[]> {
        // 1. 转换类型(已经抽离)
        // 2. 数据验证(已经抽离)
        // 3.添加到数据库
        return await MovieModel.create(movie)
    }

    @transFormClass
    @validate
    public static async edit(movie: Movie, id: string): Promise<string[] | string> {
        // 1. 转换类型(已经抽离)
        // 2. 数据验证(已经抽离)
        // 3. 修改数据库
        try {
            await MovieModel.updateOne({ _id: id }, movie)
            return []
        } catch {
            return '修改失败'
        }
    }

    public static async delete(id: string): Promise<Boolean> {
        const result = await MovieModel.deleteOne({ _id: id })
        return result.deletedCount! > 0
    }

    public static async findById(id: string): Promise<IMovie | null> {
        return await MovieModel.findById(id);
    }
    /**
     *
     * @param condition page、limit、key
     */
    @transFormClass
    public static async find(condition: SearchCondition): Promise<ISearchResult<IMovie>> {
        // 1. 转换类型(已经抽离)
        const conObj = SearchCondition.transform(condition)
        // 2. 数据验证(已经抽离)
        const errors = await conObj.validateThis(true)
        if (errors.length > 0) {
            return {
                total: 0,
                data: [],
                errors
            }
        }
        // 3.从数据库里面查找
        const movies = await MovieModel.find({
            name: {
                $regex: new RegExp(conObj.key)
            }
        }).skip((conObj.page - 1) * conObj.limit).limit(conObj.limit)

        const total = await MovieModel.find({name: {
            $regex: new RegExp(conObj.key)
        }}).countDocuments()
        return {
            data: movies,
            total,
            errors: []
        }
    }
}


const m = new MovieService()
