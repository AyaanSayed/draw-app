import { NextFunction,Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
// import { JWT_SECRET } from "./config";
import type {Request} from "./custom";
import {JWT_SECRET} from "@repo/backend-common/config"

// interface DecodedToken {
//   userId: string;
// }

export function middleware(req: Request, res: Response, next: NextFunction){
  const token = req.header("Authorization") || "";

  const decoded = jwt.verify(token, JWT_SECRET);

  if(typeof(decoded) === "string"){
    res.status(503).json({
      message: "unauthorized"
    })
    return;
  }

  if(decoded){
    req.userId = decoded.userId ;
    next();
  } else {
    res.status(403).json({
      message: "unauthorized"
    })
  }
}