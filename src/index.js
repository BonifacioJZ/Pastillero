const express = require('express')
const morgan = require('morgan')
//initialization
const app = express();

//settings 

app.set('port',process.env.PORT ||3000)

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}))
app.use(express.json())

//Global Variables
app.use((req,res,next)=>{
    
    next()
})

//Routes
app.use(require('./routes'))

//Starting the server
app.listen(app.get('port'), () => {
    console.log('App listening on port 3000!');
});
