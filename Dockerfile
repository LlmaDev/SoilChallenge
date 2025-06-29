# Etapa 1: build da aplicação
FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# ⚠️ IMPORTANTE: gerar Prisma Client antes de compilar
RUN npx prisma generate

RUN npm run build

# Etapa 2: imagem final, para execução
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

EXPOSE 3000

CMD ["node", "dist/main"]
