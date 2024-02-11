FROM node:alpine3.19 as Build
WORKDIR /api-gateway
COPY ./package*.json .
RUN npm set progress=false
RUN npm config set registry https://registry.npmjs.org/
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build


FROM node:alpine3.19 as Deploy
WORKDIR /api-gateway
COPY ./package*.json .
COPY --from=Build /api-gateway/node_modules ./node_modules
COPY --from=Build /api-gateway/dist ./dist
CMD [ "npm", "run", "start:prod" ]