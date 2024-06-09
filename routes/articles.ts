import { PrismaClient } from "@prisma/client";
import express from "express";
import { validate } from "../schemas/Articles";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const articles = await prisma.article.findMany({
    include: { category: true },
  });
  return res.send(articles);
});
router.get("/:id", async (req, res) => {
  const article = await prisma.article.findFirst({
    where: { id: req.params.id },
  });

  if (!article) return res.status(404).send("Article not found");
  return res.send(article);
});

router.post("/item", async (req, res) => {
  const validation = validate(req.body);
  if (!validation.success)
    return res.status(400).send(validation.error.issues[0].message);
  const category = await prisma.category.findFirst({
    where: { id: req.body.categoryId },
  });
  if (!category) return res.status(400).send("Category not found");

  const newItem = await prisma.article.create({
    data: {
      type: req.body.type,
      title: req.body.title,
      categoryId: req.body.categoryId,
      isborrowable: req.body.isborrowable,
      runtimeminutes: req.body.runtimeminutes,
    },
  });
  return res.status(201).send(newItem);
});

router.post("/book", async (req, res) => {
  const validation = validate(req.body);
  if (!validation.success)
    return res.status(400).send(validation.error.issues[0].message);
  const category = await prisma.category.findFirst({
    where: { id: req.body.categoryId },
  });
  if (!category) return res.status(400).send("Category not found");

  const newBook = await prisma.article.create({
    data: {
      type: req.body.type,
      title: req.body.title,
      categoryId: req.body.categoryId,
      isborrowable: req.body.isborrowable,
      author: req.body.author,
      nbrpages: req.body.nbrpages,
    },
  });
  return res.status(201).send(newBook);
});

router.put("/:id", async (req, res) => {
  const article = await prisma.article.findFirst({
    where: { id: req.params.id },
  });

  if (!article) return res.status(404).send("Article not found");

  const validation = validate(req.body);

  if (!validation.success)
    return res.status(400).send(validation.error.issues[0].message);

  const category = await prisma.category.findFirst({
    where: { id: req.body.categoryId },
  });

  if (!category) return res.status(404).send("category not found");

  const updateArticle = await prisma.article.update({
    where: { id: req.params.id },
    data: {
      author: req.body.author,
      categoryId: req.body.categoryId,
      title: req.body.title,
      isborrowable: req.body.isborrowable,
      nbrpages: req.body.nbrpages,
      runtimeminutes: req.body.runtimeminutes,
      type: req.body.type,
      borrower: req.body.borrower,
      borrowDate: req.body.borrowDate,
    },
  });

  return res.status(201).send(updateArticle);
});

router.put("/borrow/:id", async (req, res) => {
  const article = await prisma.article.findUnique({
    where: { id: req.params.id },
  });
  console.log(req.body);
  if (!article) return res.status(404).send("Article not found");

  if (article.type === "Dictionary")
    return res.status(400).send("Cannot borrow dictionary");

  if (req.body.borrower) {
    const articleOnLoan = await prisma.article.update({
      where: { id: req.params.id },
      data: {
        borrower: req.body.borrower,
        borrowDate: new Date(),
        isborrowable: false,
      },
    });
    return res.status(201).send(articleOnLoan);
  }

  const returnedArticle = await prisma.article.update({
    where: { id: req.params.id },
    data: { borrower: null, borrowDate: null, isborrowable: true },
  });

  return res.status(201).send(returnedArticle);
});

router.delete("/:id", async (req, res) => {
  const article = await prisma.article.findFirst({
    where: { id: req.params.id },
  });

  if (!article) return res.status(404).send("Article not found");

  const deletedArticle = await prisma.article.delete({
    where: { id: req.params.id },
  });
  return res.send(deletedArticle);
});

export default router;
