import { connect } from 'mongoose';
require('dotenv').config();

export async function run() {
    await connect(process.env.MONGO_URI);
}
