import 'reflect-metadata'
import MovieRouter from './routes/MovieRoute'
import UploadRoute from './routes/UploadRoute'
import Express from 'express'

const app = Express()

app.use('/upload', Express.static('public/upload'))
   .use(Express.json())
   .use('/api/movie', MovieRouter)
   .use('/api/upload', UploadRoute)

app.listen(3000)

