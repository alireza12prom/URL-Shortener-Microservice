ARG WORKING_DIRECTORY=/session-service

FROM node:alpine3.19 as Build
WORKDIR $WORKING_DIRECTORY
COPY ./package*.json .
RUN npm set progress=false
RUN npm config set registry https://registry.npmjs.org/
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build


FROM node:alpine3.19 as Deploy
WORKDIR $WORKING_DIRECTORY
COPY --from=Build $WORKING_DIRECTORY/dist,node_modules,package*.json .
CMD [ "npm", "run", "start:prod" ]