import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import bcrypt from "bcrypt";
import {
  CreateUserSchema,
  SignInSchema,
  CreateRoomSchema,
} from "@repo/common/types";
import { prismaClient } from "@repo/db/client";

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  const parsedData = CreateUserSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(403).json({
      message: "Incorrect inputs",
    });
    return;
  }

  const { email, name, password } = parsedData.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prismaClient.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    res.json({
      userId: user.id, // Return actual user ID instead of "123"
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating user",
    });
  }
});

app.post("/signin", async (req, res) => {
  const parsedData = SignInSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(403).json({
      message: "Incorrect inputs",
    });
    return;
  }

  const { email, password } = parsedData.data;
  try {
    const user = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) {
      res.status(500).json({
        message: "invalid credentials",
      });
      return;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(403).json({ message: "Incorrect password" });
      return;
    }
    const token = jwt.sign(
      {
        userId: user.id,
      },
      JWT_SECRET
    );
    res.json({
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error signing in",
    });
  }

  const userId = 1;
  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );

  res.json({
    token,
  });
});

app.post("/room", middleware, async (req, res) => {
  const parsedData = CreateRoomSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(403).json({
      message: "Incorrect inputs",
    });
    return;
  }
  // db call
  // @ts-ignore
  const userId = req.userId;

  try {
    const room = await prismaClient.room.create({
      data: {
        slug: parsedData.data.name,
        adminId: userId,
      },
    });

    res.json({
      roomId: room.id,
      message: "room created succesfully",
    });
  } catch (error) {
    res.status(403).json({
      message: "room already exist",
    });
  }

  res.json({
    roomId: "123",
  });
});

app.get("/chat", middleware, async (req, res) => {
  try {
    // @ts-ignore
    const userId = req.userId;
    const chats = prismaClient.chat.findMany({
      where: {
        userId,
      },
    });
    res.json({
      chats,
    });
  } catch (error) {}
});

app.listen(3001);
