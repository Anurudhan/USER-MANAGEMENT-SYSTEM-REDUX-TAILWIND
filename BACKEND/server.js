const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('./config/mongoDb')

const app = express();
dotenv.config();

const userRouter = require('./Routes/userRouter')
const adminRouter = require('./Routes/adminRouter')

const PORT = process.env.PORT || 4000;

app.use(express.static('./View/Public'));
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin:[process.env.FRONTEND_URL],
    credentials:true
}))

app.use('/profileimages',express.static('./View/Public'));
app.use('/',userRouter)
app.use('/admin',adminRouter)

app.use((err,req,res,next) => {
    console.error(err.stack);
    res.status(500).send('something is went wrong!')
})

app.listen(PORT,(error) => {
    if(error){
        console.error('error starting now',error);
    }
    else{
        console.log(`server running at http://localhost:${PORT}`);
    }
})



