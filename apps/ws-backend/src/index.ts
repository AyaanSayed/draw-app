import { WebSocketServer } from "ws";
const wss = new WebSocketServer({port : 8080});
import jwt, { JwtPayload } from "jsonwebtoken"
import { JWT_SECRET } from "./config";

wss.on("connection" , function connection(ws, request){
  const url = request.url;
  if(!url){
    return;
  }

  const queryParams = new URLSearchParams(url.split("?")[1]);

  const token = queryParams.get("token") || "";

  const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

  if(!decoded || !decoded.userId){
    ws.close();
    return;
  }

  ws.on("message" , function message(data){
    ws.send('pong');
  });
})