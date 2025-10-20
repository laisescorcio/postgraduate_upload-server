# postgraduate_upload-server

## Tecnologias Utilizadas

### Fastify
Fastify é um framework web altamente focado em performance e baixo overhead para Node.js. Oferece um sistema de plugins poderoso, validação de schemas integrada com JSON Schema, e é uma das opções mais rápidas para construção de APIs REST e aplicações web.

### Biome
Biome é uma ferramenta moderna de linting e formatação de código para projetos JavaScript/TypeScript. É uma alternativa rápida ao ESLint e Prettier, oferecendo análise estática de código e formatação automática com desempenho superior.

### PostgreSQL
PostgreSQL é um sistema de gerenciamento de banco de dados relacional (SGBD) open-source e robusto. É conhecido por sua confiabilidade, recursos avançados e conformidade com os padrões SQL.

### Docker
Docker é uma plataforma de containerização que permite empacotar aplicações e suas dependências em containers isolados. Facilita a portabilidade, consistência entre ambientes de desenvolvimento e produção, e simplifica o processo de deploy.

### Swagger
Swagger é um conjunto de ferramentas open-source para documentação de APIs REST. Permite criar documentação interativa e visual das rotas da API, facilitando testes e integração. Segue a especificação OpenAPI e oferece uma interface gráfica onde desenvolvedores podem visualizar endpoints, parâmetros e testar requisições diretamente no navegador.

### Vitest
Vitest é um framework de testes unitários moderno e extremamente rápido, construído especificamente para projetos Vite. Oferece compatibilidade com a API do Jest, suporte nativo a TypeScript e ESM, execução paralela de testes e hot module replacement (HMR) para testes, proporcionando uma experiência de desenvolvimento ágil e eficiente.

## Drizzle ORM

Drizzle ORM é um TypeScript ORM (Object-Relational Mapping) moderno e leve, projetado para ser type-safe e performático. Diferente de outros ORMs tradicionais, o Drizzle mantém-se próximo ao SQL, oferecendo uma experiência de desenvolvimento que combina a segurança de tipos do TypeScript com a flexibilidade e controle do SQL nativo.

### Características Principais:

- **Type-Safe**: Oferece inferência de tipos completa em tempo de compilação, garantindo que as consultas sejam validadas antes da execução
- **SQL-Like**: Mantém a sintaxe próxima ao SQL, facilitando a migração de desenvolvedores acostumados com SQL puro
- **Zero Runtime Overhead**: Gera código SQL otimizado sem adicionar overhead significativo em runtime
- **Schema-First**: Permite definir schemas de banco de dados de forma declarativa e type-safe
- **Migrations**: Sistema robusto de migrações com suporte a rollback e versionamento
- **Multi-Database**: Suporte nativo para PostgreSQL, MySQL, SQLite e outros SGBDs
- **Query Builder**: Interface fluida para construção de consultas complexas com IntelliSense completo

### Vantagens sobre outros ORMs:

- **Performance**: Menor overhead comparado a ORMs como Prisma ou TypeORM
- **Controle**: Mantém o controle total sobre as consultas SQL geradas
- **Simplicidade**: API limpa e intuitiva, sem abstrações excessivas
- **Flexibilidade**: Permite usar SQL raw quando necessário, mantendo type-safety

## Migration para banco de dados

Migrations (Migrações) são uma forma controlada e versionada de gerenciar mudanças no schema do banco de dados ao longo do tempo. Funcionam como um sistema de controle de versão (similar ao Git) especificamente para a estrutura do banco de dados, permitindo que a equipe de desenvolvimento evolua o schema de forma organizada e rastreável.

### O que são Migrations?

Migrations são arquivos que contém instruções para modificar a estrutura do banco de dados, como:
- Criar, alterar ou remover tabelas
- Adicionar, modificar ou remover colunas
- Criar ou remover índices
- Definir constraints e relacionamentos
- Modificar tipos de dados

Cada migration possui duas operações principais:
- **UP (Aplicar)**: Aplica as mudanças no banco de dados
- **DOWN (Reverter)**: Desfaz as mudanças, revertendo o banco ao estado anterior

### Por que usar Migrations?

- **Versionamento**: Mantém um histórico completo de todas as alterações no schema do banco
- **Reprodutibilidade**: Garante que todos os ambientes (desenvolvimento, homologação, produção) tenham o mesmo schema
- **Colaboração**: Facilita o trabalho em equipe, permitindo que múltiplos desenvolvedores sincronizem mudanças no banco
- **Reversibilidade**: Permite desfazer alterações caso algo dê errado
- **Automatização**: Integra com CI/CD para aplicar mudanças automaticamente em deploys
- **Documentação**: Serve como documentação viva da evolução do schema
- **Segurança**: Previne alterações manuais inconsistentes no banco de dados

### Como funcionam?

1. **Criar Migration**: Desenvolvedores criam arquivos de migration quando precisam alterar o schema
2. **Versionamento**: Cada migration recebe um identificador único (timestamp ou número sequencial)
3. **Aplicar**: As migrations são aplicadas em ordem cronológica no banco de dados
4. **Rastreamento**: O sistema mantém registro de quais migrations já foram executadas
5. **Sincronização**: Outros membros da equipe executam as mesmas migrations em seus ambientes

### Exemplo de uso com Drizzle:

```typescript
// Criar uma migration
npm run drizzle-kit generate

// Aplicar migrations pendentes
npm run drizzle-kit migrate

// Reverter última migration
npm run drizzle-kit drop
```

Isso garante que mudanças no código da aplicação estejam sempre sincronizadas com a estrutura do banco de dados, evitando erros em produção e facilitando o desenvolvimento colaborativo.