const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 8080;

var app = express();
const request = require('request');

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => {
    response.render('main.hbs');
});

// var result='';
// var country = 'canada'
// var errormessage = ''
// var getWeather = async function()
// {
//     try{
//         capitalResult =  await from_api.getcapital(country);
//         weatherResult = await from_api.getWeather(capitalResult,country);
//         result = `the weather in ${capitalResult}, capital of ${country} is
//         ${JSON.stringify(Weatherresult.temp)} with wind speed of ${JSON.stringify(Weatherresult.wind)}`;
//     }
//     catch(error) {
//         result = error;
//     }
// }


var result='';
var image = 'earth';
var getimage = ((image) => {
    return new Promise((resolve, reject) =>{
        request({
            url: `https://images-api.nasa.gov/search?q=earth`,
            json: true
        }, (error, response, body) => {

            if(error) {
                reject(error);
            }
            else if (body.status == '404')
            {
                reject(body.message);
            }
            else
            {
                resolve(body);
            }
        });
    });
});

var getWeather = ((search) => {
    return new Promise((resolve, reject) => {
        request({
            url: `https://images-api.nasa.gov/search?q=${search}`,
            json:true
        }, (error, response, body) => {
            resolve({
                image: body
            });
        });
    });
})
getimage(image).then((capital) =>{
    getImage(capital, image).then((image) =>{
        result = `the image is ${image}
        ${JSON.stringify(nasa.image)} with wind speed of ${JSON.stringify(nasa.image)}`;
    })
}).catch((error) =>{
    result = error;
})

app.get('/nasa', (request, response)=> {
    response.render('nasa.hbs', {
        nasa :result
    });
});

app.get('/info', (request, response) => {
    response.send('my info page');
});

app.get('/404', (request, response) => {
    response.send({
        error: "page not found"

    })
})
app.listen(port, () => {
    console.log(`server is up on the port ${port}`);
});