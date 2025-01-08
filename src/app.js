
const geocode= require('./utils/geocode')
const forecast = require('./utils/forecast')
const path=require('path')
const express=require('express')
//console.log(__dirname)
//console.log(path.join(__dirname,"../public"))
const publicdirectory=path.join(__dirname,"../public")
console.log(path.join(__dirname,"../view"))
const app=express()
app.set('view engine','hbs')//allows you to set value for any given express setting. 
app.use(express.static(publicdirectory))
app.get('',(req,res)=>{
    res.send('Hello express')
})
app.get('/help',(req,res)=>{
    res.send('Help page')
})
app.get('/about',(req,res)=>{
    res.send('About page')
})
app.get('/weather',(req,res)=>{
    if (!req.query.address){
        return res.send({
            error:"You must provide an address!"
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if (error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if (error){
                res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
        })
    })
    //res.send({
        //address:req.query.address

       //})
})
})
app.get("/products",(req,res)=>{
    if (!req.query.search){
            return res.send({
                error:'You must provide a search term.'
            })

    }
    console.log(req.query.search)
    res.send({
        product:[]
    })
})
app.get('/help/*',(req,res)=>{
    res.send("Help article not found")

})
app.get('*',(req,res)=>{
    res.send('My 404 page')

})
app.listen(3000,()=>{
    console.log('server is up on port 3000.')

})
