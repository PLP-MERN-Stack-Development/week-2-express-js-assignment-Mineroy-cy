const log = require('../utilities/logger');

const errorHandler = (err,req,res,next) =>{
    const statusCode = res.statusCode?res.statusCode : 500;

    log.error(`Route Error: ${err.message}`);//logs what was thrown in this case its an error
res.status(statusCode).json({message:err.message ,stack: process.env.NODE_ENV === 'production' ? null : err.stack // Hide stack trace in production
    });
};

 module.exports ={
        errorHandler,
    }