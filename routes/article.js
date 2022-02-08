import express from 'express'
import {Article,Category} from '../models/Models.js'
const router=express.Router()

router.get('/',async (req,res)=>{
    const articles= await Article.find().sort({createdAt:"desc"})
    const categories= await Category.find()
    res.render('index',{articles:articles,categories:categories})
})

router.get('/new',async(req,res)=>{
    const categories= await Category.find()
    res.render('new', {article: new Article(),categories:categories})
})

router.get('/edit/:id',async(req,res)=>{
    const categories= await Category.find()
    try {
        const article=await Article.findById(req.params.id)
        res.render('edit', {article:article,categories:categories})
    } catch (error) {
        res.render('error',{categories:categories})
    }
})

router.get('/read/:id',async (req,res)=>{
    const categories= await Category.find()
    try {
        const article=await Article.find({_id:req.params.id})
        if(article){
            res.render('show', {article:article[0],categories:categories})
        }
    } catch (error) {
        res.render('error',{categories:categories})
    }
})

router.get('/:name',async (req,res)=>{
    const categories= await Category.find()
    try {
        const articles= await Article.find({category:req.params.name}).sort({createdAt:"desc"})
        let current=req.params.name;
        let currentId=await Category.find({name:current});
        currentId=String(currentId[0]._id);
        res.render('category',{articles:articles,categories:categories,current:current,currentId:currentId})
    } catch (error) {
        res.render('error',{categories:categories})
    }
})

router.post('/',async(req,res)=>{
    let article=new Article({
        title:req.body.title,
        description:req.body.description,
        category:req.body.category,
        content:req.body.content,
        link:req.body.link,
        createdAt:new Date(),
        image:req.body.image
    })
    try {
        article=await article.save()
        res.redirect(`/read/${article.id}`)
    } catch (error) {
        res.redirect('/new',{article:article})
    }  
})

router.post('/nc',async(req,res)=>{
    let category=new Category({
        name:req.body.name
    })
    try {
        category=await category.save()
        res.redirect('/')
    } catch (error) {
        res.redirect('/')
    }  
})

router.patch('/:id',async(req,res)=>{
    try {
        const article=await Article.findOneAndUpdate({_id:req.params.id},req.body)
        if(article){
            res.redirect('/')
        }
        else res.status(404).send()
    } catch (error) {
        const categories= await Category.find()
        res.render('error',{categories:categories})
    }
    
})

router.delete('/:id',async(req,res)=>{
    try {
        const article=await Article.findOneAndDelete({_id:req.params.id})
        if(article){
            res.redirect('/')
        }
        else{
            res.status(404)
        }  
    } catch (error) {
        const categories= await Category.find()
        res.render('error',{categories:categories})
    }
    
})

router.delete('/category/:id',async(req,res)=>{
    const categories= await Category.find()
    try {
        const category=await Category.findOneAndDelete({_id:req.params.id})
        for(let i=0;i<=categories.length;i++){
            const article=await Article.findOneAndDelete({category:category.name})
        }
        if(category){
            res.redirect('/')
        }
        else{
            res.status(404)
        }  
    } catch (error) {
        res.render('error',{categories:categories})
    }
    
})

export default router;