#syntax=docker/dockerfile:1.4
#Run this from within this directory. Change the location of coriolis-data repo and image name/tag as needed.
#docker buildx build --build-context data=../coriolis-data --tag coriolis .

FROM node:18-alpine

WORKDIR /app
ADD . .
COPY --from=data . /coriolis-data/
WORKDIR /app/coriolis-data
RUN npm install
WORKDIR /app
RUN npm install

CMD ["npm", "start"]

EXPOSE 3300
