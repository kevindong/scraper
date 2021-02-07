FROM node:15-alpine
WORKDIR /app
COPY package*.json app.ts ./
RUN npm install && npm install -g ts-node
COPY crontab.txt /etc/crontabs/root
CMD ["crond", "-f"]
