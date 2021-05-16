const notFound = (req, res, next) => {
    const error = new Error(`URL Not Found - '${req.originalUrl}'`);
    res.status(404);
    next(error);
};

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode == 200 ? '500' : res.statusCode;
    const errorMsg = res.statusCode == 200 && process.env.NODE_ENV == 'production' ? 'Internal Server error' : err.message;
    
    res.status(statusCode);
    res.json({
        message: errorMsg,
    });
};

export { notFound, errorHandler };