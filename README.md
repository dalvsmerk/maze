# Maze

## Description

NodeJS REST API based on NestJS framework to solve mazes up to 30x30 in size

## REST API

### `POST /maze`

Request parameters:
| Name | Type       | Description                                                                                                                                                                                    | Default value | Constrains     |
|------|------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|----------------|
| grid | string[][] | Grid of maze, where cells are represented as walls and empty spaces, "#" and "." respectively. The top left and the bottom right are entrance and exit respectively and should be empty cells. | None          | > 1x1, < 31x31 |

Example request:
```json
{
    "grid": [[".", ".", "#"],["#", ".", "#"], ["#", ".", "."]]
}
```

Response:
```json
{
    "minStepsToPass": 4
}
```

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
# run e2e after installed in development mode
$ docker run --rm=false votendo/maze npm run test:e2e
```
