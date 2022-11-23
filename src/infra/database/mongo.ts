import { connect } from 'mongoose';
// eslint-disable-next-line no-use-before-define
require('dotenv').config();

export async function run() {
    await connect(process.env.MONGO_URI);
}
