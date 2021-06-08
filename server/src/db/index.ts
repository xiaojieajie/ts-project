import Mongoose from 'mongoose'
import MovieModel from './MovieSchema'

Mongoose.connect('mongodb://localhost:27017/moviedb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(res => {
    console.log('链接数据库成功')
})

export { MovieModel }