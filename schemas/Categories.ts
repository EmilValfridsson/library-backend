import { z } from "zod";
const schema = z
  .object({
    id: z.string().optional(),
    name: z.string().min(1, { message: "Must be a category" }),
  })
  .strict();

export type CategoryFormData = z.infer<typeof schema>;

export function validate(body: CategoryFormData) {
  return schema.safeParse(body);
}
