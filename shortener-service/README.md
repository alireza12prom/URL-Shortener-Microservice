<h1 style="text-align: center;">Shortener Service</h1>

### ⚙️ ENV

Create a file named `.env` in the root and set these variables:

```env
####################
####### APP #######
####################
TZ='UTC'
NODE_ENV=''

####################
##### Database #####
####################
DATABASE_URL=''

####################
##### RabbitMQ #####
####################
RABBITMQ_URL=''
```

### 🥁 Prisma
To sync tables, run this command:

```shell
npx prisma migrate dev --name init
```


### 🛠️ Dependency
- [x] Nodejs v21+
- [x] Nestjs v10.3+
- [x] Typescript v5.3+
- [x] RabbitMQ v3+ 
- [x] MySQL 8.3+