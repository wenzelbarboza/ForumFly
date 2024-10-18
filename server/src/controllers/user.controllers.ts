import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import z from "zod";
import { newUserProps } from "../models/user.models";
import { db } from "../db/db";
import { users } from "../db/schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/tokenUtils";
import { ApiError } from "../utils/apiError";
import { JwtPayload } from "jsonwebtoken";
import { MyJwtPayload, refreshProps } from "../utils/types";
import { date } from "drizzle-orm/mysql-core";

type newUserPropsType = z.infer<typeof newUserProps>;

export const signUp = asyncHandler(
  async (req: Request<any, any, newUserPropsType>, res: Response) => {
    // return res.status(200).send({
    //   message: "welcome to ForumFly signIn route",
    // });
    console.log("inside the signup");
    try {
      let zUser = newUserProps.parse(req.body);

      console.log(zUser);

      // check if user exists with email if exists return the user details from db
      // else create a record in db and return the details

      const oldUser = await db
        .select()
        .from(users)
        .where(eq(users.email, zUser.email));

      if (oldUser.length) {
        return res.status(200).send({
          success: true,
          message: "user found",
          data: oldUser[0],
        });
      }

      const newUser = await db.insert(users).values(zUser).returning();

      console.log(newUser);

      return res.status(200).json({
        success: true,
        message: "Registration successfull",
        data: newUser[0],
      });
    } catch (error) {
      throw error;
    }
  }
);

// type loginPropsType = z.infer<typeof newUserProps>;
// export const login = asyncHandler(
//   async (req: Request<any, any, loginPropsType>, res: Response) => {
//     try {
//       let { email, password } = loginProps.parse(req.body);
//       const user = await db
//         .select()
//         .from(users)
//         .where(eq(users.email, email))
//         .limit(1);

//       if (user.length === 0) {
//         console.log("invalid user");
//       }
//       if (user.length === 0) throw new ApiError(401, "Invalid credentials");

//       const validPassword = await bcrypt.compare(
//         password,
//         user[0].password as string
//       );

//       if (!validPassword) throw new ApiError(401, "Invalid credentials");

//       const accessToken = generateAccessToken({
//         userId: user[0].id,
//         name: user[0].name as string,
//         role: user[0].role,
//       });
//       const refreshToken = generateRefreshToken(user[0].id);

//       await db
//         .update(users)
//         .set({ refreshToken })
//         .where(eq(users.id, user[0].id));

//       res.cookie("refreshToken", refreshToken, {
//         httpOnly: true,
//         secure: true,
//         sameSite: "lax",
//         maxAge: 7 * 24 * 60 * 60 * 1000,
//       });

//       res.json({ accessToken });
//     } catch (error) {
//       throw new ApiError(500, "Login failes");
//     }
//   }
// );

// export const refresh = asyncHandler(async (req: Request, res: Response) => {
//   const refreshTokenOld = req.cookies.refreshToken;

//   if (!refreshTokenOld) throw new ApiError(401, "invalid credentials");

//   try {
//     const decoded = verifyRefreshToken(refreshTokenOld) as MyJwtPayload;

//     console.log("This is decoded refresh Token: ", decoded);

//     const user = await db
//       .select()
//       .from(users)
//       .where(eq(users.id, decoded.userId))
//       .limit(1);

//     if (user.length === 0 || user[0].refreshToken !== refreshTokenOld)
//       throw new ApiError(400, "invalid refresh token");

//     const accessToken = generateAccessToken({
//       userId: user[0].id,
//       name: user[0].name as string,
//       role: user[0].role as string,
//     });
//     const refreshToken = generateRefreshToken(user[0].id);

//     await db
//       .update(users)
//       .set({ refreshToken })
//       .where(eq(users.id, user[0].id));

//     res.cookie("refreshToken", refreshToken, {
//       httpOnly: true,
//       secure: true,
//       sameSite: "lax",
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });

//     res.json({ accessToken });
//   } catch (error) {
//     throw error;
//   }
// });

// export const logout = asyncHandler(async (req: Request, res: Response) => {
//   const refreshToken = req.cookies.refreshToken;

//   try {
//     if (!refreshToken) {
//       throw new ApiError(500, "logout failed");
//     }

//     const decoded = verifyRefreshToken(refreshToken) as MyJwtPayload;

//     await db
//       .update(users)
//       .set({ refreshToken: null })
//       .where(eq(users.id, decoded.userId));

//     res.clearCookie("refreshToken", {
//       sameSite: "lax",
//     });

//     res.json({
//       success: true,
//       message: "Logged out successfully",
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Logout failed" });
//   }
// });

// export const setRole = asyncHandler(
//   async (req: Request<any, any, refreshProps>, res: Response) => {
//     const data = req.body;

//     try {
//       const { id, role } = refreshType.parse(data);

//       await db.update(users).set({ role }).where(eq(users.id, id));

//       res.status(200).json({
//         success: true,
//         message: "role updated successfully",
//         data: {
//           role,
//         },
//       });
//     } catch (error) {
//       res.status(400).json({ error: "role update failed" });
//     }
//   }
// );