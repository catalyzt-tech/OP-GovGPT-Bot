FROM node:18-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm -g install pnpm && pnpm install && pnpm add dotenv

COPY . .

EXPOSE 3001

RUN pnpm build

CMD ["pnpm", "dev"]