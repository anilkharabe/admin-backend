import jwt from "jsonwebtoken";
import { Response } from "express";
import ApiResponse from "../utils/ApiResponse";
import HTTP_STATUS from "../constants/HttpStatus";
import MESSAGES from "../constants/Messages";

function authMiddleware(req: any, res: Response, next: any) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return ApiResponse.error(
      res,
      HTTP_STATUS.UNAUTHORIZED,
      MESSAGES.UNAUTHORIZED
    );
  }

  let token = req.headers.authorization.split(" ");
  token = token[1];

  if (!token) {
    return ApiResponse.error(res, HTTP_STATUS.FORBIDDEN, MESSAGES.UNAUTHORIZED);
  }

  try {
    const decodeData = jwt.verify(token, "your-secret-key");
    console.log("decodeData", decodeData);
    req.user = decodeData;
    next();
  } catch (error) {
    return ApiResponse.error(res, HTTP_STATUS.BAD_REQUEST, MESSAGES.INVALID_TOKEN);
  }
}

export default authMiddleware;
