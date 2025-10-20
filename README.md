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

## UUIDv7: A Melhor Escolha para Identificadores Únicos

UUIDv7 é a versão mais recente e moderna da especificação UUID (Universally Unique Identifier), aprovada em 2024 como parte da RFC 9562. É considerada a melhor opção para identificadores primários em bancos de dados modernos, especialmente quando comparada com UUIDv4, auto-increment e outras alternativas.

### O que é UUIDv7?

UUIDv7 combina timestamp com dados aleatórios, gerando identificadores únicos que são **ordenados cronologicamente**. Cada UUID contém:
- **48 bits**: Timestamp Unix em milissegundos
- **12 bits**: Sequência aleatória para evitar colisões no mesmo milissegundo
- **62 bits**: Dados aleatórios adicionais

Formato: `018d2c8a-3b7f-7000-8000-123456789abc`

### Por que UUIDv7 é a melhor opção?

#### 1. **Ordenação Temporal Natural**
- UUIDs são gerados em ordem cronológica crescente
- Facilita consultas por intervalo de tempo: `WHERE id > '018d2c8a-0000-7000-0000-000000000000'`
- Permite paginação eficiente sem campos adicionais de `created_at`

#### 2. **Performance Superior em Índices B-Tree**
Diferente do UUIDv4 (aleatório), o UUIDv7:
- ✅ Evita fragmentação de índices
- ✅ Mantém dados adjacentes no disco fisicamente próximos
- ✅ Reduz operações de I/O em inserções
- ✅ Melhora cache hit ratio
- ❌ UUIDv4 causa "page splits" constantes, degradando performance

**Impacto real**: Em tabelas grandes, UUIDv7 pode ser até 50% mais rápido que UUIDv4 para inserções.

#### 3. **Distribuição em Sistemas Distribuídos**
- Geração descentralizada sem coordenação
- Não requer acesso ao banco de dados
- Ideal para microserviços e aplicações serverless
- Evita race conditions em ambientes concorrentes

#### 4. **Segurança e Previsibilidade Controlada**
- Não expõe contadores sequenciais (diferente de auto-increment)
- Impossível inferir quantidade de registros
- Dificulta enumeração de recursos: `/api/users/123` → `/api/users/018d2c8a-3b7f-7000-8000-123456789abc`
- Mantém aleatoriedade suficiente para evitar colisões

#### 5. **Compatibilidade Global**
- Funciona nativamente com PostgreSQL (tipo `uuid`)
- Aceito em APIs REST, GraphQL, mensageria
- Portable entre diferentes bancos de dados
- Não depende de sequências específicas do banco

#### 6. **Debugabilidade**
- Timestamp embutido permite rastreamento temporal
- Facilita debugging: é possível saber quando o registro foi criado apenas olhando o ID
- Útil em logs e rastreamento de eventos

### Comparação com Outras Opções

| Característica | UUIDv7 | UUIDv4 | Auto-increment | ULID |
|----------------|--------|--------|----------------|------|
| Ordenado | ✅ Sim | ❌ Não | ✅ Sim | ✅ Sim |
| Performance B-Tree | ⚡ Excelente | 🐌 Ruim | ⚡ Excelente | ⚡ Excelente |
| Distribuído | ✅ Sim | ✅ Sim | ❌ Não | ✅ Sim |
| Seguro | ✅ Sim | ✅ Sim | ❌ Não | ✅ Sim |
| Padrão RFC | ✅ Sim | ✅ Sim | ❌ Não | ❌ Não |
| Tamanho | 128 bits | 128 bits | 32/64 bits | 128 bits |
| Legibilidade | ✅ Boa | ⚠️ Média | ✅ Ótima | ✅ Boa |

### Quando NÃO usar UUIDv7?

- **Chaves estrangeiras de alta cardinalidade**: 16 bytes vs 4-8 bytes de integer pode impactar espaço
- **Sistemas legados**: Se já usa auto-increment e migração é complexa
- **Performance extrema em writes**: Em casos raros, integers puros ainda são marginalmente mais rápidos

### Exemplo de Uso

```typescript
import { pgTable, uuid, timestamp, text } from 'drizzle-orm/pg-core';
import { uuidv7 } from 'uuidv7';

export const uploads = pgTable('uploads', {
  id: uuid('id').primaryKey().$defaultFn(() => uuidv7()),
  filename: text('filename').notNull(),
  uploadedAt: timestamp('uploaded_at').defaultNow(),
});
```

### Conclusão

UUIDv7 representa a evolução dos identificadores únicos, combinando as vantagens de UUIDs distribuídos com a performance de IDs ordenados. Para aplicações modernas, especialmente aquelas que precisam escalar horizontalmente ou operar em ambientes distribuídos, **UUIDv7 é a escolha recomendada**.

