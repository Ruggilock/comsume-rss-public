FROM oven/bun

WORKDIR /app

COPY . .
RUN bun install --production


COPY tsconfig.json .
# COPY public public

ENV NODE_ENV production
CMD ["bun", "src/index.ts"]

EXPOSE 3000