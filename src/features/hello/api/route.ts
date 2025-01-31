import { Hono } from "hono";
import { validator } from "hono/validator";
import { z } from "zod";

const app = new Hono()
  .get("/", async (c) => {
    return c.json({ message: "hello" });
  })
  .get(
    "/:postId",
    validator("param", (value, c) => {
      const schema = z.object({
        postId: z.coerce.number().min(1, "PostID is required"),
      });

      const result = schema.safeParse(value);

      if (!result.success) {
        return c.json(
          {
            success: false,
            message: "Validation failed",
            errors: result.error.errors,
          },
          400
        );
      }

      return result.data;
    }),
    async (c) => {
      const { postId } = c.req.valid("param");
      return c.json({
        success: true,
        message: `hello ${postId}`,
      });
    }
  );

export default app;
