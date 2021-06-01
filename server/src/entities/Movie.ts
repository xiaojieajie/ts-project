import { plainToClass, Type } from 'class-transformer'
import { ArrayMinSize, IsArray, IsInt, IsNotEmpty, Max, Min, validate, ValidationError} from 'class-validator'

export default class Movie {
    @IsNotEmpty({ message: '电影名称不能为空' })
    @Type(() => String)
    public name: string

    @IsNotEmpty({ message: '电影类型不能为空' })
    @ArrayMinSize(1, { message: '电影类型长度至少有一个' })
    @IsArray({ message: '电影类型必须是数组' })
    @Type(() => String)
    public types: string[]

    @IsNotEmpty({ message: '上映地区不能为空' })
    @ArrayMinSize(1, { message: '上映地区至少有一个' })
    @IsArray({ message: '电影地区必须是数组' })
    @Type(() => String)
    public areas: string[]

    @IsNotEmpty({ message: '时长不可以为空' })
    @IsInt({ message: '时长必须是整数' })
    @Min(1, { message: '时长最小1分钟' })
    @Max(9999, { message: '时长过长' })
    @Type(() => Number)
    public timeLong: number

    @IsNotEmpty({ message: '是否热映不可以为空' })
    @Type(() => Boolean)
    public isHot: boolean

    @IsNotEmpty({ message: '是否即将上映不可以为空' })
    @Type(() => Boolean)
    public isComing: boolean

    @IsNotEmpty({ message: '是否是经典影片不可以为空' })
    @Type(() => Boolean)
    public isClasic: boolean

    @Type(() => Boolean)
    public description?: boolean

    @Type(() => Boolean)
    public poster?: string

    /**
     * 验证当前电影对象
     */
    public async validateThis(): Promise<string[]> {
        const errors = await validate(this)
        const temp = errors.map(e => Object.values(e.constraints!))
        return temp.flat(20)
    }

    /**
     * 类型转换
     */
    public static transform(plainObject: object): Movie {
        if (plainObject instanceof Movie) {
            return plainObject
        }
        return plainToClass(Movie, plainObject)
    }
}
