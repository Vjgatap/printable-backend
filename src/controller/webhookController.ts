import { Request, Response, NextFunction } from 'express';
import { handelWebhooks } from "../services/webhookService.ts";
import { nextTick } from "node:process";

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
   try {
    const response = await handelWebhooks(req,res)
    console.log(response);
    
   } catch (error) {
    next(error)
   }
}