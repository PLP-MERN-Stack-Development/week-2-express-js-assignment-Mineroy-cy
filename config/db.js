const mongoose = require('mongoose');
const log = require('../utilities/logger');
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        
        log.db(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    } catch (error) {
        log.error(`Error: ${error.message}`);
        process.exit(1); // Exit the process with failure
    }
}
module.exports = connectDB;