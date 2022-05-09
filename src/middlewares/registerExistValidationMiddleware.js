import db from './../db.js';
import { ObjectId } from 'mongodb';

export default async function registerExistValidate(req, res, next) {
    const { id } = req.params;

    try {
        const register = await db.collection('registers').findOne({
            _id: new ObjectId(id),
        });
        if (!register) {
            return res.status(400).send('Register does not exist');
        }
    } catch (error) {
        return res.status(500).send(error);
    }
    next();
}
