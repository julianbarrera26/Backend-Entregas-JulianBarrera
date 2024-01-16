class CustomError {


    static generateError(message, code) {

        const error = new Error(message);
        error.code = code;
        throw error

    }

}

export { CustomError }