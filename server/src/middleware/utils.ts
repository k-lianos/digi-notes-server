import { NextFunction, Request, Response } from "express";
import database from "../../../simple-db/src";

export const checkIfExists =
  (model: string) => (req: Request, res: Response, next: NextFunction) => {
    if (!database.get(model, req.params.id)) {
      res.status(404).json({ message: "Resource not found" });
      return;
    }

    next(); // Continue to the route handler
  };
