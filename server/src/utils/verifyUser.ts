import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "./asyncHandler";
import { ApiError } from "./apiError";
import { auth } from "../firebase/firebase-admin";
import { db } from "../db/db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

// export const verifyUser = asyncHandler(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const authHeader = req.headers.authorization;
//     const token = authHeader && authHeader.split(" ")[1];

//     if (!token) throw new ApiError(401, "verification failed");

//     try {
//       const decodeValue = await auth.verifyIdToken(token);
//       if (decodeValue) {
//         req.user = decodeValue;
//         return next();
//       }
//     } catch (error) {
//       throw error;
//     }
//   }
// );

export const verifyUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.body.userId;

    if (!userId) {
      return new ApiError(404, "you are not authorised to access this route");
    }

    const resUser = await db.select().from(users).where(eq(users.id, userId));

    if (!resUser.length) {
      return new ApiError(404, "you are not authorised to access this route");
    }

    return next();
  }
);
