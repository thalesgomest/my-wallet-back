import { MongoClient } from 'mongodb';
import chalk from 'chalk';
import dotenv from 'dotenv';
dotenv.config();

let db = null;
const mongoClient = new MongoClient(process.env.MONGO_URI);

try {
    await mongoClient.connect();
    db = mongoClient.db(process.env.MONGO_DATABASE);
    console.log(
        chalk.bold.green(
            `Connected to MongoDB on ${process.env.MONGO_DATABASE} database`
        )
    );
} catch (err) {
    console.log(chalk.bold.red('Error connecting to MongoDB', err));
}

export default db;
