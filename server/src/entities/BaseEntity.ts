import { ClassConstructor, plainToClass } from "class-transformer"
import { validate } from "class-validator"

export default abstract class BaseEntity {
    /**
     * 验证当前电影对象
     */
     public async validateThis(skipMissing = false): Promise<string[]> {
        const errors = await validate(this, {
            skipMissingProperties: skipMissing
        })
        const temp = errors.map(e => Object.values(e.constraints!))
        return temp.flat(20)
    }
    /**
     * 类型转换
     */
    // new (...args: any[]) => T
    protected static baseTransform<T>(cls: ClassConstructor<T> , plainObject: object): T {
        if (plainObject instanceof cls) {
            return plainObject
        }
        return plainToClass(cls, plainObject)
    }
}