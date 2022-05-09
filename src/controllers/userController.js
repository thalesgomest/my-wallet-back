import dotenv from 'dotenv';
import db from './../db.js';
import { ObjectId } from 'mongodb';
dotenv.config();

export async function getRegisters(req, res) {
    const { user } = res.locals;

    const registers = await db
        .collection('registers')
        .find({ userId: user._id })
        .toArray();

    registers.forEach((register) => delete register.userId);
    res.send(registers);
}

export async function postRegister(req, res) {
    const register = req.body;
    const { user } = res.locals;

    try {
        await db.collection('registers').insertOne({
            ...register,
            userId: user._id,
        });
        res.sendStatus(200);
    } catch (error) {
        res.status(500).send('error while inserting register');
    }
}

export async function deleteRegister(req, res) {
    const { id } = req.params;

    try {
        await db.collection('registers').deleteOne({ _id: new ObjectId(id) });
        return res.status(200).send('Transaction deleted');
    } catch (error) {
        return res.status(500).send(error);
    }
}

export async function updateRegister(req, res) {
    const { id } = req.params;
    const { value, description, date, type } = req.body;

    try {
        await db.collection('registers').updateOne(
            { _id: new ObjectId(id) },
            {
                $set: { value, description, date, type },
            }
        );
        return res.status(200).send('Register updated');
    } catch (error) {
        return res.status(500).send(error);
    }
}
