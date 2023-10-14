// custom error handler

const errorHandler = ( error, req, res, next ) => {

    const errorStatus = error.status || 500;
    const message = error.message || 'Internal server error'

    res.status(errorStatus).json({
        success: false,
        message,
        errorStatus,
        stack : error.stack
    })

};

export default errorHandler