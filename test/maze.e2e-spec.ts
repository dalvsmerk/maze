import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MazeModule } from './../src/maze/maze.module';
import { MazeDTO } from 'src/maze/dto/maze.dto';

describe('MazeController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MazeModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('POST /maze should respond with error if maze is empty', () => {
    return request(app.getHttpServer())
      .post('/maze')
      .send({ grid: [] })
      .expect(400)
      .expect({
        statusCode: 400,
        message: 'Maze should not be empty',
        error: 'Bad Request',
    });
  });

  it('POST /maze should respond with error if maze size exceeds 30x30', () => {
    const tooLargeMaze: MazeDTO = {
      grid: new Array(31).fill(
        new Array(31).fill('.')
      ),
    };

    return request(app.getHttpServer())
      .post('/maze')
      .send(tooLargeMaze)
      .expect(400)
      .expect({
        statusCode: 400,
        message: 'Maze should not exceed 30x30 cells in size',
        error: 'Bad Request',
    });
  });

  it('POST /maze should respond with error if maze consists of only 1 cell', () => {
    const tooSmallMaze: MazeDTO = { grid: [['.']] };

    return request(app.getHttpServer())
      .post('/maze')
      .send(tooSmallMaze)
      .expect(400)
      .expect({
        statusCode: 400,
        message: 'Maze should have at least 2 rows and 2 columns',
        error: 'Bad Request',
    });
  });

  it('POST /maze should respond with error if maze has a wall instead of entrance in the upmost top left cell', () => {
    const wallEntranceMaze: MazeDTO = {
      grid: [['#', '.', '.'],
             ['#', '#', '.'],
             ['.', '#', '.']],
    };

    return request(app.getHttpServer())
      .post('/maze')
      .send(wallEntranceMaze)
      .expect(400)
      .expect({
        statusCode: 400,
        message: 'Maze should have an empty cell in the upmost top left cell',
        error: 'Bad Request',
    });
  });

  it('POST /maze should respond with error if maze has a wall instead of entrance in the upmost top left cell', () => {
    const wallExitMaze: MazeDTO = {
      grid: [['.', '.', '.'],
             ['#', '#', '.'],
             ['.', '#', '#']],
    };

    return request(app.getHttpServer())
      .post('/maze')
      .send(wallExitMaze)
      .expect(400)
      .expect({
        statusCode: 400,
        message: 'Maze should have an empty cell in the undermost bottom right cell',
        error: 'Bad Request',
    });
  });

  it('POST /maze should return 2 steps to pass for maze #1 (2x2)', () => {
    const maze: MazeDTO = {
      grid: [['.', '.'],
             ['.', '.']],
    };

    return request(app.getHttpServer())
      .post('/maze')
      .send(maze)
      .expect(200)
      .expect({
        min_steps_to_pass: 2,
    });
  });

  it('POST /maze should return 4 steps to pass for maze #2 (3x3)', () => {
    const maze: MazeDTO = {
      grid: [['.', '#', '.'],
             ['.', '.', '#'],
             ['#', '.', '.']]
    };

    return request(app.getHttpServer())
      .post('/maze')
      .send(maze)
      .expect(200)
      .expect({
        min_steps_to_pass: 4,
    });
  });

  it('should return 9 steps to pass for maze #3 (4x4)', () => {
    const maze: MazeDTO = {
      grid: [['.', '.', '.', '.'],
             ['#', '.', '#', '.'],
             ['#', '#', '.', '.'],
             ['.', '.', '.', '#'],
             ['#', '#', '.', '.']],
    };

    return request(app.getHttpServer())
      .post('/maze')
      .send(maze)
      .expect(200)
      .expect({
        min_steps_to_pass: 9,
    });
  });

  it('should return 12 steps to pass for maze #4 (3x7)', () => {
    const maze: MazeDTO = {
      grid: [['.', '.', '#'],
             ['.', '#', '.'],
             ['.', '.', '.'],
             ['#', '#', '.'],
             ['.', '.', '.'],
             ['.', '#', '#'],
             ['.', '.', '.']],
    };

    return request(app.getHttpServer())
      .post('/maze')
      .send(maze)
      .expect(200)
      .expect({
        min_steps_to_pass: 12,
    });
  });
});
