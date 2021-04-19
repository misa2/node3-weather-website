const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url=`http://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=a48f43e8c7e435c97875500d7589bbbb`
    request({url, json:true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather services!', undefined)
        } else if (body.cod) {
            callback(body.message, undefined)
        } else {
            callback(undefined, 
                `It is currently ${Math.round((body.current.temp - 273.15))} degrees. There is ${body.daily[0].pop * 100}% chance of precipitation. The prognosis for the day is ${body.daily[0].weather[0].description}`
            )
        }
    })
}

module.exports = forecast