import { Request, Response, NextFunction } from "express";
import { UserService, UserUpdatePayload } from "../services/userService.ts";


export const updateUserController = async (
  req: Request<{}, {}, UserUpdatePayload>,
  res: Response,
  next: NextFunction
) => {
  try {
    const payload = req.body;
    const userService = new UserService();
    const result = await userService.updateUser(payload);

    res.status(200).json({
      message: "User updated successfully",
      updated: result,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    next(error);
  }
};
