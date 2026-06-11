import { Request, Response, NextFunction } from "express";
import AppError from "../utils/errors/AppErrors";
import ApiResponse from '../utils/ApiResponse';
// import HTTP_STATUS from "../constants/HttpStatus";
// import MESSAGES from "../constants/Messages";

const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction)=>{
    if(error instanceof AppError){
        return ApiResponse.error(res, error.statusCode, error.message)
    }
}

export default errorMiddleware;