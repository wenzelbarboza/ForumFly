import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "./asyncHandler";
import { ApiError } from "./apiError";
import { auth } from "../firebase/firebase-admin";

export const verifyUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) throw new ApiError(401, "verification failed");

    try {
      const decodeValue = await auth.verifyIdToken(token);
      if (decodeValue) {
        req.user = decodeValue;
        return next();
      }
    } catch (error) {
      throw error;
    }
  }
);
