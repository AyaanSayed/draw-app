import {string, z} from "zod";

export const CreateUserSchema = z.object({
  username : string().min(3).max(20),
  password : string(),
  name : string()
}) 

export const SignInSchema = z.object({
  username : string().min(3).max(20),
  password : string()
})

export const CreateRoomSchema = z.object({
  name : string().min(3).max(30)
})