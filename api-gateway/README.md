<h1 style="text-align: center;">Api Gateway</h1>

### ⚙️ ENV

Create a file named `.env` in the root and set these variables:

```env
####################
####### APP #######
####################
TZ='UTC'
PORT=''
NODE_ENV=''

####################
##### RabbitMQ #####
####################
RABBITMQ_URL=''

####################
###### TOKENS ######
####################
JWT_SECRET=''
JWT_ACCESS_TOKEN_EXPIRE_IN=''
JWT_REFRESH_TOKEN_EXPIRE_IN=''
```

### 🛠️ Dependency
- [x] Nodejs v21+
- [x] Nestjs v10.3+
- [x] Typescript v5.3+
- [x] RabbitMQ v3+ 