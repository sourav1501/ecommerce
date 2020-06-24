const express=require('express')
const mongoose = require("mongoose")
require('dotenv').config()
const morgan=require('morgan')
const bodyParser=require('body-parser')
 const cookieParser=require('cookie-parser')
const expressValidator=require('express-validator')
const app=express()
const authRoutes=require("./routes/auth")
const userRoutes=require("./routes/user")
const categoryRoutes=require("./routes/category")
const productRoutes=require("./routes/product")
const braintreeroutes= require('./routes/braintree')
const orderRoutes= require('./routes/order')

const cors=require('cors')
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressValidator())
app.use(cors())

//routes middleware

app.use('/api',authRoutes);
app.use('/api',userRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);
app.use('/api',braintreeroutes);
app.use('/api',orderRoutes);

// db connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => console.log("DB connected"))
.catch((err) => console.log(err))


const port=process.env.PORT||8000;

app.listen(port,()=>{
    console.log(`server run on ${port}`)
})