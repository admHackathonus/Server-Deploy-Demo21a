FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install --production --silent

COPY . .

# нужен curl для healthcheck
RUN apk add --no-cache curl

ENV NODE_ENV=production
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/status || exit 1

CMD ["node", "index.js"]