import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MazeDTO } from './dto/maze.dto';
import { MazeController } from './maze.controller';

describe('MazeController', () => {
  let controller: MazeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MazeController],
    }).compile();

    controller = module.get<MazeController>(MazeController);
  });

  describe('root', () => {
    it('should throw error if maze is empty', () => {
      const emptyMaze: MazeDTO = { grid: [] };

      expect(controller.getMinimumStepsToPass(emptyMaze)).toThrowError(
        new HttpException('Maze should not be empty', HttpStatus.BAD_REQUEST)
      );
    });

    it('should throw error if maze size exceeds 30x30', () => {
      const tooLargeMaze: MazeDTO = {
        grid: new Array(31).fill(
          new Array(31).fill('.')
        ),
      };

      expect(controller.getMinimumStepsToPass(tooLargeMaze)).toThrowError(
        new HttpException('Maze should not exceed 30x30 cells in size', HttpStatus.BAD_REQUEST)
      );
    });

    it('should throw error if maze consists of only 1 cell', () => {
      const tooSmallMaze: MazeDTO = { grid: [['.']] };

      expect(controller.getMinimumStepsToPass(tooSmallMaze)).toThrowError(
        new HttpException('Maze should have at least 2 rows and 2 columns', HttpStatus.BAD_REQUEST)
      );
    });

    it('should throw error if maze has a wall instead of entrance in the upmost top left cell', () => {
      const wallEntranceMaze: MazeDTO = {
        grid: [['#', '.', '.'],
               ['#', '#', '.'],
               ['.', '#', '.']],
      };

      expect(controller.getMinimumStepsToPass(wallEntranceMaze)).toThrowError(
        new HttpException('Maze should have an empty cell in the upmost top left cell', HttpStatus.BAD_REQUEST)
      );
    });

    it('should throw error if maze has a wall instead of exit in the undermost bottom right cell', () => {
      const wallExitMaze: MazeDTO = {
        grid: [['.', '.', '.'],
               ['#', '#', '.'],
               ['.', '#', '#']],
      };

      expect(controller.getMinimumStepsToPass(wallExitMaze)).toThrowError(
        new HttpException('Maze should have an empty cell in the undermost bottom right cell', HttpStatus.BAD_REQUEST)
      );
    });

    it('should return 2 steps to pass for maze #1 (2x2)', () => {
      const maze: MazeDTO = {
        grid: [['.', '.'],
               ['.', '.']],
      };
      expect(controller.getMinimumStepsToPass(maze)).toBe(2);
    });

    it('should return 4 steps to pass for maze #2 (3x3)', () => {
      const maze: MazeDTO = {
        grid: [['.', '#', '.'],
               ['.', '.', '#'],
               ['#', '.', '.']]
      };

      expect(controller.getMinimumStepsToPass(maze)).toBe(4);
    });

    it('should return 9 steps to pass for maze #3 (4x4)', () => {
      const maze: MazeDTO = {
        grid: [['.', '.', '.', '.'],
               ['#', '.', '#', '.'],
               ['#', '#', '.', '.'],
               ['.', '.', '.', '#'],
               ['#', '#', '.', '.']],
      };

      expect(controller.getMinimumStepsToPass(maze)).toBe(9);
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

      expect(controller.getMinimumStepsToPass(maze)).toBe(12);
    });

    // TODO: Check whether a maze is traversable, i.e. it's possible to find a way out in finite time
  });
});
