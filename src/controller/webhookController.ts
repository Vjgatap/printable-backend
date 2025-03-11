import { Request, Response, NextFunction } from 'express';
import { createUserService } from "../services/webhookService.ts";

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newUser = await createUserService(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  };