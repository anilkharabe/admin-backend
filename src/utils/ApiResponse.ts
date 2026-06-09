import { Response } from "express";
import HttpStatus from "../constants/HttpStatus";
import Messages from "../constants/Messages";

class ApiResponse {
  static success(
    res: Response,
    statusCode: number,
    message: string,
    data: any = null,
  ) {
    return res.status(statusCode).json({
      success: true,
      message: message, // older way
      data, // new update as ES6 => data: data
    });
  }

  static error(res: Response, statusCode: number, message: string) {
    return res.status(statusCode).json({
      success: false,
      message, // older way
    });
  }
}

export default ApiResponse;
