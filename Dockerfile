FROM node:19
WORKDIR /NejahApp
COPY package.json package.json
RUN npm i
COPY . .
CMD [ "npm", "start" ]