import { PrismaClient } from "@prisma/client";
import express from "express";
import { validate } from "../schemas/Categories";
const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const categories = await prisma.category.findMany();
  return res.send(categories);
});

router.get("/:id", async (req, res) => {
  const category = await prisma.category.findFirst({
    where: { id: req.params.id },
  });
  if (!category) return res.status(404).send("Category not found");
  return res.send(category);
});

router.post("/", async (req, res) => {
  const validation = validate(req.body);

  if (!validation.success)
    return res.status(400).send(validation.error.issues[0].message);

  const category = await prisma.category.findFirst({
    where: { name: req.body.name },
  });
  if (category) return res.status(409).send("Category already exists");

  const newCategory = await prisma.category.create({
    data: { name: req.body.name },
  });

  return res.status(201).send(newCategory);
});

router.put("/:id", async (req, res) => {
  const category = await prisma.category.findFirst({
    where: { id: req.params.id },
  });
  if (!category) return res.status(404).send("Category not found");

  const validation = validate(req.body);

  if (!validation.success)
    return res.status(400).send(validation.error.issues[0].message);

  const updateCategory = await prisma.category.update({
    where: { id: req.params.id },
    data: {
      name: req.body.name,
    },
  });
  return res.status(201).send(updateCategory);
});

router.delete("/:id", async (req, res) => {
  const category = await prisma.category.findFirst({
    where: { id: req.params.id },
  });
  if (!category) return res.status(404).send("Category not found");
  const articles = await prisma.article.findMany({
    where: { categoryId: req.params.id },
  });
  if (articles.length > 0)
    return res
      .status(400)
      .send("Category contains articles and cannot be deleted");

  const deletedCategory = await prisma.category.delete({
    where: { id: req.params.id },
  });

  res.send(deletedCategory);
});

export default router;
