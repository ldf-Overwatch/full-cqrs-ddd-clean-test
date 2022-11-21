import { connect } from 'mongoose';

export async function run() {
    const conn = await connect('mongodb://localhost:27017/test');
    await conn.connection.db.dropDatabase();
    await connect('mongodb://localhost:27017/test');
}
