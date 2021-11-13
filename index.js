var PORT = process.env.PORT || 4500;
const express = require('express');
//The express() syntax is the equivalent of saying new express(). 
//It creates a new instance of express that you can assign to a variable.
var app = express();

var bodyParser = require("body-parser");
//A new body object containing the parsed data is populated 
//on the request object after the middleware (i.e. req.body). 
//This object will contain key-value pairs, 
app.use(bodyParser.json());

var cors = require('cors')
app.use(cors())

const mymongoose  = require('./DatabaseConnect.js')
const userApi = require('./controller/User_API')

app.use('/user',userApi);




app.listen(PORT, () => console.log('EXPRESS Server Started at Port No: '+`${PORT}`));
