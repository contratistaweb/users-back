FROM node:18.12.0
WORKDIR /back
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*","./"]
COPY . .
RUN cd /back/ && npm i -g fastify-cli && npm install --production --silent && mv node_modules ../
RUN chown -R node /back/
USER node
CMD ["npm", "start"]
EXPOSE 3003