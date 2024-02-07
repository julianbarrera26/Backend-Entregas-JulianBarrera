const errorMiddleware = (error, req, res, next) => {
    const statusCode = typeof error.code === 'number' ? error.code : 500;
  
    res
      .status(statusCode)
      .json({ message: error.message, name: error.name });
  };
  
  export { errorMiddleware };
  