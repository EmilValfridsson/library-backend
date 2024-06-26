import z from "zod";

const schema = z.object({
  id: z.string().optional(),
  title: z.string().min(3),
  author: z.string().optional(),
  nbrPages: z.number().gte(1).optional(),
  runTimeMinutes: z.number().gte(1).optional(),
  type: z.string().min(3),
  isBorrowable: z.boolean(),
  categoryId: z.string().cuid(),
  borrow: z.string().optional(),
  borrowDate: z.number().optional(),
});

export type ArticleFormData = z.infer<typeof schema>;

export function validate(body: ArticleFormData) {
  return schema.safeParse(body);
}
