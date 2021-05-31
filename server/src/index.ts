import 'reflect-metadata'
import { validate } from "class-validator";
import Movie from "./entities/Movie";
import { plainToClass } from 'class-transformer'

const m: any = {}

m.name = 2342
m.types = [1, 2, 3]
m.areas = ['广东']
m.isClasic = true
m.isComing = true
m.isHot = true
m.timeLong = 2

const movie = plainToClass(Movie, m)
console.log(movie.types, typeof movie.types)
validate(movie).then(res => {
    console.log(res)
})