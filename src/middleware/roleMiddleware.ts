import { Response } from "express";
import ApiResponse from "../utils/ApiResponse";
import HTTP_STATUS from "../constants/HttpStatus";
import MESSAGES from "../constants/Messages";

const roleMiddleware = (...roles: string[]) => {
  return (req: any, res: Response, next: any) => {

    const userRole = req.user.role;

    if (!roles.includes(userRole)) {
      return ApiResponse.error(
        res,
        HTTP_STATUS.FORBIDDEN,
        MESSAGES.FORBIDDEN
      );
    }

    next();
  };
};

export default roleMiddleware;