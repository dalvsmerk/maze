# Maze

## Description

NodeJS REST API based on NestJS framework

## REST API

TODO

## Installation using Docker

```bash
# build an image in development mode (for testing purposes)
$ docker build -t votendo/maze . --target development

# or in production mode (for running purposes)
$ docker build -t votendo/maze .
```

## Running

```bash
# run container
$ docker run -p 3000:3000 -d votendo/maze
```

## Testing

```bash
# run unit tests after installed in development mode
$ docker run --rm=false votendo/maze npm run test

# run e2e after installed in development mode
$ docker run --rm=false votendo/maze npm run test:e2e
```
