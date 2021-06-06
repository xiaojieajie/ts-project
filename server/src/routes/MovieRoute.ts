import express from 'express'
import SearchCondition from '../entities/SearchCondition'
import MovieService from '../services/MovieService'
import ResponseHelper from './ResponseHelper'
const router = express.Router()

router.get('/:id', async (req, res) => {
    try {
        const movieid = req.params.id
        const movie = await MovieService.findById(movieid)
        ResponseHelper.sendData(movie, res)
    } catch (err) {
        ResponseHelper.sendData(null, res)
    }
})

router.get('/', async (req, res) => {
    const result = await MovieService.find(req.query as any)
    ResponseHelper.sendPageData(result, res)
})

router.post('/', async (req, res) => {
    const result = await MovieService.add(req.body)
    if (Array.isArray(result)) {
        ResponseHelper.sendError(result, res)
        return
    }
    ResponseHelper.sendData(result, res)
})

router.put('/:id', async (req, res) => {
    try {
        const result = await MovieService.edit(req.body, req.params.id)
        if (result.length > 0) {
            ResponseHelper.sendError(result, res)
            return
        }
        ResponseHelper.sendData(true, res)
    } catch (err) {
        ResponseHelper.sendError('id错误', res)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        await MovieService.delete(req.params.id)
        ResponseHelper.sendData(true, res)
    } catch (err) {
        ResponseHelper.sendError('id错误', res)
    }
})

export default router