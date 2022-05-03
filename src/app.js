import express, { json } from 'express';
import chalk from 'chalk';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(json());

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db = null;

mongoClient
    .connect()
    .then(() => {
        db = mongoClient.db('my-wallet');
        console.log(chalk.bold.red('Connected to MongoDB'));
    })
    .catch((err) => {
        console.log(chalk.bold.red('Error connecting to MongoDB', err));
    });

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(chalk.bold.green(`Server running on port ${port}`));
});
