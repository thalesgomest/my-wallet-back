import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import db from './../db.js';

dotenv.config();

export async function signIn(req, res) {
    try {
        const { email, password } = req.body;
        const user = await db.collection('users').findOne({ email });
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = uuidv4();
            await db.collection('sessions').insertOne({
                userId: user._id,
                token,
                lastStatus: Date.now(),
            });
            res.status(200).send({ name: user.name, token });
        } else {
            res.status(401).send({ message: 'Invalid email or password' });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: 'Internal server error' });
    }
}

export async function signUp(req, res) {
    const { name, email, password } = req.body;
    try {
        const user = await db.collection('users').findOne({ email });
        if (user) {
            return res.status(404).send({ message: 'User already registered' });
        }
        const passwordHash = bcrypt.hashSync(
            password,
            parseInt(process.env.BCRYPT_SALT)
        );
        const newUser = await db
            .collection('users')
            .insertOne({ name, email, password: passwordHash });
        res.status(200).send({ message: 'User created successfully' });
    } catch (err) {
        console.log(err);
    }
}

export async function logOut(req, res) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '').trim();

    if (!token) {
        return res.status(401).send('Unauthorized');
    }

    try {
        await db.collection('sessions').deleteOne({ token });
        res.status(200).send('Logged out');
    } catch (err) {
        console.log(err);
    }
}
