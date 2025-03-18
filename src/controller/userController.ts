import { Request, Response, NextFunction } from "express";
import { UserService, UserUpdatePayload } from "../services/userService.ts";

const userService = new UserService();

export const getUserController = async (
  req: Request<{ id: string }>, 
  res: Response, 
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
       res.status(400).json({ error: "User ID is required" });
    }
    const user = await userService.getUser(id);
    if (!user) {
       res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    next(error);
  }
};

export const updateUserController = async (
  req: Request<{ id: string }, {}, UserUpdatePayload>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    if (!id) {
      res.status(400).json({ error: "User ID is required" });
    }
    const updatedUser = await userService.updateUser( {...payload}, id );
    if (!updatedUser) {
      res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({
      message: "User updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    next(error);
  }
};


