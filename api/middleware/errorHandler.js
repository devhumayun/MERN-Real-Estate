// custom error handler
const errorHandler = ( err, req, res, next ) => {

    const errStatus = err.status || 500;
    const message = err.message || 'Internal server error'

    res.status(errStatus).json({
        success: false,
        message,
        errStatus,
    })

};

export default errorHandler