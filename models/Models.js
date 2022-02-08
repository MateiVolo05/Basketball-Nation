import mongoose from "mongoose";

const articleSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    category:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    link:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    image:{
        type:Array
    }
},{collection:'articles'})

const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
},{collection:'categories'})

export const Article=mongoose.model('Article',articleSchema)
export const Category=mongoose.model('Category',categorySchema)
