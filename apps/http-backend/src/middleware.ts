import { NextFunction,Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "./config";
import type {Request} from "./custom";

export function middleware(req: Request, res: Response, next: NextFunction){
  const token = req.header("authorization") || "";

  const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

  if(decoded){
    req.userId = decoded.userId ;
    next();
  } else {
    res.status(403).json({
      message: "unauthorized"
    })
  }
}