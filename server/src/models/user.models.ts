import { string, z } from "zod";

export const newUserProps = z.object({
  name: z.string(),
  email: z.string().email(),
});
