import { Request, Response, NextFunction } from "express";
import { EsignService } from "../services/esignService.ts";
const esignService = new EsignService();
export const sendSigningRequest = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const order = await esignService.sendSigningRequest();

    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};
export const getSignedNotification = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!id) res.status(400).json({ error: "order id is required" });
  } catch (error) {
    next(error);
  }
};
