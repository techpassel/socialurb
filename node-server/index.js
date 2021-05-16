import express from 'express';
import path from 'path';
import cors from 'cors';
import connectDB from './configs/dbConnection.js';
import authRoute from './routes/authRoute.js';
import userRoute from './routes/userRoute.js';
import adminRoute from './routes/adminRoute.js';
import postRoute from './routes/postRoute.js';
import dotenv from 'dotenv';
import {notFound, errorHandler} from './middlewares/expressMiddleware.js';
import protect from './middlewares/authMiddleware.js'

const app = express();
const __dirname = path.resolve();
//Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.
dotenv.config();
const PORT = process.env.PORT || 5550;
connectDB();

//The express.json() function is a built-in middleware function in Express.It parses incoming requests with JSON payloads and is based on body-parser.
//i.e if we don't write following line(or any similar code) and suppose if we send some data in JSON format in request body,then we won't be able to access that.
app.use(express.json());

//Serves all the request which includes /images in the url from 'public' folder
app.use('/images', express.static(__dirname + '/public'));

//Cors configuration using "cors" middleware.
var corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

//Test Url - To check if node server is accessible;
app.get("/", (req, res) => res.send("Node server is working properly"));


app.listen(PORT, () => console.log(`Node server is running on port: ${PORT}`)).on('error', (err) => {
    if (err.errno === 'EADDRINUSE') {
        console.log(`Error : Port ${PORT} is busy,Please check and Retry`);
    } else {
        console.log(err);
    }
})

//Routes
app.use("/auth", authRoute);
app.use("/post", postRoute);
app.use("/user", protect, userRoute);
app.use("/admin", protect, adminRoute);

app.use(notFound);

app.use(errorHandler);