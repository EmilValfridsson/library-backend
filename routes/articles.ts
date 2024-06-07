import { PrismaClient } from "@prisma/client";
import express from "express";
const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const articles = await prisma.article.findMany({
    include: { category: true },
  });
  return res.send(articles);
});

export default router;
