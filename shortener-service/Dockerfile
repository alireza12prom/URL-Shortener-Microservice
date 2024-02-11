FROM node:alpine3.19 as Build
WORKDIR /shortener-service
COPY ./package*.json .
RUN npm set progress=false
RUN npm config set registry https://registry.npmjs.org/
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build


FROM node:alpine3.19 as Deploy
WORKDIR /shortener-service
COPY ./package*.json .
COPY ./prisma ./prisma
COPY --from=Build /shortener-service/node_modules ./node_modules
COPY --from=Build /shortener-service/dist ./dist
CMD [ "npm", "run", "start:prod" ]