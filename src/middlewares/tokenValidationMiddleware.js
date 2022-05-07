export default async function tokenValidate(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).send('Unauthorized');
    }

    try {
        const session = await db.collection('sessions').findOne({ token });
        if (!session) {
            return res.status(401).send("session doesn't exist");
        }

        const user = await db
            .collection('users')
            .findOne({ _id: session.userId });
        if (!user) {
            return res.sendStatus(401);
        }
        res.locals.user = user;
    } catch (e) {
        return res.status(500).send('error while validating token');
    }
    next();
}
