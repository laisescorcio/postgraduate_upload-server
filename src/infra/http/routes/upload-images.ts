import { uploadImage } from "@/app/functions/upload-image";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const uploadImagesRoute: FastifyPluginAsyncZod = async server => {
  server.post("/uploads", {
    schema: {
      summary: "Upload images",
      consumes: ['multipart/form-data'],
      response: {
        201: z.object({ uploadId: z.string() }),
        400: z.object({ message: z.string() }),
      }
    },
  }, async (request, reply) => {
    const uploadedFile = await request.file({
      limits: { fileSize: 1024 * 1024 * 2 } // 2MB
    })

    if(!uploadedFile) {
      return reply.status(400).send({message: 'File is required.'})
    }

    /**
     * IMPORTANTE: Não utilizamos uploadedFile.toBuffer() aqui para evitar carregar
     * o arquivo inteiro na memória RAM.
     * 
     *   const file = await uploadedFile.toBuffer()
     * 
     * Problema com toBuffer():
     * - Carrega todo o conteúdo do arquivo em um Buffer na memória
     * - Para um arquivo de 2MB, consome 2MB de RAM por requisição
     * - Em alta concorrência (ex: 100 uploads simultâneos), consumiria 200MB de RAM
     * - Pode causar Out of Memory (OOM) em ambientes com memória limitada
     * - Aumenta pressure no Garbage Collector, degradando performance
     * 
     * Solução com Streams (uploadedFile.file):
     * - Processa o arquivo em chunks pequenos (geralmente 64KB)
     * - Consome memória constante, independente do tamanho do arquivo
     * - Permite upload de arquivos grandes sem overhead de memória
     * - Melhor performance e escalabilidade
     * - Ideal para ambientes serverless e containers com recursos limitados
     */
    
    await uploadImage({
      fileName: uploadedFile.filename,
      contentType: uploadedFile.mimetype,
      contentStream: uploadedFile.file,
    })
    
    return reply.status(201).send({ uploadId: "teste" });
  }
);
}