import express, { request, response } from "express";
import mongoose from "mongoose";
import { Book } from './models/bookModel.js';
import dotenv from "dotenv";
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON request bodies
app.use(express.json());

app.use(cors());

//app.use(
//    cors({
//        origin: 'http://localhost:3000',
//        methods: ['GET', 'POST', 'PUT', 'DELETE'],
//        allowedHeaders: ['Content-Type'],
//    })
//);

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome To MERN Stack Tutorial');
});

app.use('/books',booksRoute);

// Connect to MongoDB and start server
mongoose.connect(process.env.mongoDBURL,{
    //useNewUrlParser:true,
    //useUnifiedTopology:true,
})
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App listening to port:${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
