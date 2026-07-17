import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../../shared/utils/Jwt";

export interface jwtPayload {
  userId: string;
  role: string;
}
export interface AuthRequest extends Request {
  user?: jwtPayload;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Token not provided",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Invalid token format",
      });
    }

    const decoded = verifyToken(token);

    req.user = decoded as jwtPayload;

    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};
