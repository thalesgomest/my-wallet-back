import dotenv from 'dotenv';
import db from './../db.js';

dotenv.config();

export async function getRegisters(req, res) {
    const { user } = req.locals;

    const registers = await db
        .collection('registers')
        .find({ userId: user._id })
        .toArray();
    res.send(registers);
}
