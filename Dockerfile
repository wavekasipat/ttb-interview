FROM node:20

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json yarn.lock ./

RUN yarn install

# Bundle app source
COPY . .

# generate prisma client
RUN yarn generate

EXPOSE 3000

CMD [ "yarn", "start" ]
