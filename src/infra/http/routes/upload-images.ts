import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const uploadImagesRoute: FastifyPluginAsyncZod = async server => {
  server.post("/uploads", {
    schema: {
      summary: "Upload images",
      body: z.object({
        name: z.string(),
        password: z.string().optional()
      }),
      response: {
        201: z.object({ uploadId: z.string() }),
        409: z.object({ message: z.string() }).describe("Upload already exists"),
      }
    },
  }, async (request, reply) => {
    await db.insert(schema.uploads).values({
      name: 'teste.jpg',
      remoteKey: 'teste.jpg',
      remoteUrl: 'http://asdasd.com'
  })

    return reply.status(201).send({ uploadId: "teste" });
  }
);
}