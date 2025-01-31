import { Hono } from "hono";

const app = new Hono()
  .get("/", async (c) => {
    return c.json({ message: "hello" });
  })
  .get("/:postId", async (c) => {
    const { postId } = c.req.param();
    return c.json({ message: `hello ${postId}` });
  });

export default app;
