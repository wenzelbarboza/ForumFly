import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import z from "zod";
import { newUserProps } from "../models/user.models";
import { db } from "../db/db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import { ApiError } from "../utils/apiError";

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

//Todo change from email to userId
const getUserSchema = z.object({
  email: z.string(),
});

type GetUser = z.infer<typeof getUserSchema>;

export const getUser = asyncHandler(
  async (req: Request<any, any, GetUser>, res: Response) => {
    console.log("inside the signup");

    try {
      let { email } = getUserSchema.parse(req.body);

      const user = await db.select().from(users).where(eq(users.email, email));

      if (!user.length) {
        throw new ApiError(400, "no user found");
      }

      return res.status(200).json({
        success: true,
        message: "user retrived successfully",
        data: user[0],
      });
    } catch (error) {
      throw error;
    }
  }
);
