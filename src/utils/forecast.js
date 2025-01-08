const request=require('request')

const forecast=(latitude,longitude,callback)=>{
    const url='https://api.weatherstack.com/current?access_key=5b70ebd7ed663846c67c46269619ca6a&query='+latitude +','+longitude+'&units=f'
    request({url,json:true},(error,{body}={})=>{
        if (error){
            callback('Unable to connect to weather services!',undefined)

        }else if (body.error){
            callback('unable to find location.',undefined)

        }else{
            

            
            callback(undefined,body.current["weather_descriptions"][0]+"  temperature:"+body.current.temperature)
        }
    })
}
module.exports=forecast