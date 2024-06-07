import { PrismaClient } from "@prisma/client";
import express from "express";
const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const categories = await prisma.category.findMany();
  return res.send(categories);
});

export default router;
