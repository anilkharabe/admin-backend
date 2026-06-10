class AppError extends Error{
    public statusCode: number;
    public isOperational: boolean;

    constructor(message: string, statusCode: number){
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;

        if ("captureStackTrace" in Error) {
            (Error as any).captureStackTrace(this, this.constructor);
        }
    }
}

export default AppError;