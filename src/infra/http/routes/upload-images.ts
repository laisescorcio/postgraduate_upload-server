import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const uploadImagesRoute: FastifyPluginAsyncZod = async server => {
  server.post("/uploads", {
    schema: {
      summary: "Upload images",
      consumes: ['multipart/form-data'],
      response: {
        201: z.object({ uploadId: z.string() }),
        409: z.object({ message: z.string() }).describe("Upload already exists"),
      }
    },
  }, async (request, reply) => {
    const uploadedFile = await request.file({
      limits: { fileSize: 1024 * 1024 * 2 } // 2MB
    })

    console.log(uploadedFile);

    return reply.status(201).send({ uploadId: "teste" });
  }
);
}