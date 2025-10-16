import { env } from "@/env";
import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import { serializerCompiler, validatorCompiler, hasZodFastifySchemaValidationErrors, jsonSchemaTransform } from "fastify-type-provider-zod";
import { uploadImagesRoute } from "./routes/upload-images";
import fastifyMultipart from "@fastify/multipart";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

const server = fastify();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

// erros inesperados -- incluindo erros de validação
server.setErrorHandler((error, request, reply) => {
  console.error(error);
  reply.status(500).send({ message: "Internal server error" });


  // erros de validação
  if(hasZodFastifySchemaValidationErrors(error)) {
    return reply.status(400).send({
      message: "Validation error", 
      issues: error.validation
    });
  }

  // Envia o erro para alguma ferramentade observabilidade (Sentry/Datadog/NewRelic/etc)

  console.error(error);

  return reply.status(500).send({ message: "Internal server error" });
});

server.register(fastifyCors, {
  origin: "*",
});

server.register(fastifyMultipart)

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Upload Server",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform
});

server.register(fastifySwaggerUi, {
  routePrefix: "/docs",
})

server.register(uploadImagesRoute);

console.log(env.DATABASE_URL);

server.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  console.log(`HTTP server running`);
});