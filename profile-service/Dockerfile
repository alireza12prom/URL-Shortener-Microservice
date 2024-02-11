FROM node:alpine3.19 as Build
WORKDIR /profile-service
COPY ./package*.json .
RUN npm set progress=false
RUN npm config set registry https://registry.npmjs.org/
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build


FROM node:alpine3.19 as Deploy
WORKDIR /profile-service
COPY ./package*.json .
COPY ./prisma ./prisma
COPY --from=Build /profile-service/dist ./dist
COPY --from=Build /profile-service/node_modules ./node_modules
CMD [ "npm", "run", "start:prod" ]