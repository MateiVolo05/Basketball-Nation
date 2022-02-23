import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import methodOverride from 'method-override'
import articlesRouter from './routes/article.js'

dotenv.config()
const app=express()
const port=process.env.PORT || 3000
const dburl=process.env.MONGODB_URL;

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));
app.use(methodOverride('_method'))
app.use('/',articlesRouter)

app.listen(port, ()=>{
    console.log(`Example app listening at http://localhost:${port}`)
    mongoose.connect(dburl)
})