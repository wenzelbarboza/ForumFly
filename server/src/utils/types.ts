import { JwtPayload } from "jsonwebtoken";
import { refreshType } from "../models/user.models";
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

export enum roleEnum {
  candidate = "candidate",
  recruiter = "recruiter",
}

export type refreshProps = z.infer<typeof refreshType>;
