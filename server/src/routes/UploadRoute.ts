import express from 'express'
import path from 'path'
import multer, { MulterError } from 'multer'
import ResponseHelper from './ResponseHelper'

const router = express.Router()

const storage = multer.diskStorage({
    destination: path.resolve(__dirname,'../../public/upload'),
    filename(req, file, cb) {
        const time = new Date().getTime()
        const extname = path.extname(file.originalname)
        cb(null, `${time}${extname}`)
    }
})

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024, // 最大大小1M
    },
    fileFilter(req, file, cb) {
        const ext = path.extname(file.originalname)
        if(['.jpg', '.png', '.gif', '.bmp', '.jiff'].includes(ext)) {
            cb(null, true)
            return
        }
        cb(new Error('文件类型不正确'))
    }
}).single('imgfile')

router.post('/', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            // 发生错误
            ResponseHelper.sendError(err.message, res)
            return
        }
        // 正确
        const url = `/upload/${req.file.filename}`
        ResponseHelper.sendData(url, res)
    })
})

export default router