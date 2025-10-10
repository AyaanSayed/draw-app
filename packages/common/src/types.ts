import {email, string, z} from "zod";

export const CreateUserSchema = z.object({
  name : string().min(3).max(20),
  email : email(),
  password : string(),
}) 

export const SignInSchema = z.object({
  email : email(),
  password : string()
})

export const CreateRoomSchema = z.object({
  name : string().min(3).max(30)
})