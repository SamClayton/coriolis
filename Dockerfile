#syntax=docker/dockerfile:1.4
# Run this from within this directory. Change the location of coriolis-data repo and image name/tag as needed.
# docker buildx build --build-context data=../coriolis-data --tag coriolis .

FROM node:18-alpine

# TODO: For a production build, we may want to just build the bundle and copy that in. No need for local copy of source.
WORKDIR /app
ADD . .
COPY --from=data . /coriolis-data/
WORKDIR /app/coriolis-data
RUN npm install
WORKDIR /app
RUN npm install
# Bundle for production config with webpack & log
RUN npm run build > >(tee -a stdout.log) 2> >(tee -a stderr.log >&2)

# Optimally, this will start a static asset server like nginx/apache. Currently, this will start dev webpack server.
CMD ["npm", "start"]
EXPOSE 3300
