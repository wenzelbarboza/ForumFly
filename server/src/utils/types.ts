import { JwtPayload } from "jsonwebtoken";
import { z } from "zod";
import { DecodedIdToken } from "firebase-admin/auth";

declare module "express-serve-static-core" {
  interface Request {
    user?: DecodedIdToken;
  }
}

export type MyJwtPayload = JwtPayload & {
  userId: number;
};
