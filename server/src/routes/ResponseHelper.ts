import { Response } from 'express'
import { ISearchResult } from '../entities/CommonTypes'
export default class ResponseHelper {
    // 相应一个错误
    public static sendError(error: string | string[], res: Response) {
        let err: string
        Array.isArray(error) ? err = error.join(';') : err = error
        res.send({
            err,
            data: null
        })
    }
    /**
     * 响应一个普通数据
     * @param data
     * @param res
     */
    public static sendData(data: any, res: Response) {
        res.send({
            err: '',
            data
        })
    }

    public static sendPageData<T>(result: ISearchResult<T>, res: Response) {
        if (result.errors.length > 0) {
            this.sendError(result.errors, res)
            return
        }
        res.send({
            err: '',
            data: result.data,
            total: result.total
        })
    }
}