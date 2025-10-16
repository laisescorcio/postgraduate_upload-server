import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const uploadImagesRoute: FastifyPluginAsyncZod = async server => {
  server.post("/uploads", () => {
    return 'Hello World';
  });
}