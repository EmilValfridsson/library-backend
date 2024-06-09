import { z } from "zod";

const schema = z.object({
  name: z.string(),
  username: z.string().email({ message: "Email is required" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(5, { message: "Password too short." }),
});
type FormData = z.infer<typeof schema>;

export function validate(body: FormData) {
  return schema.safeParse(body);
}
