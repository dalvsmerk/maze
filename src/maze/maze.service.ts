import { Injectable } from '@nestjs/common';
import { MazeDTO } from './dto/maze.dto';
const Snake = require('snake');

@Injectable()
export class MazeService {
  // TODO: Caching
  public findMinimumStepsToPass(mazeDTO: MazeDTO): number {
    const { grid } = mazeDTO;

    const stringCellToBinary = (row: string[]): number[] =>
      row.map((cell: string): number => {
        if (cell === '#') return 1;
        else return 0;
      });

    const binaryGrid = grid.map(stringCellToBinary);

    const mazeSolver = new Snake();
    const solution = mazeSolver.solve({
      maze: binaryGrid,
      start: [0, 0],
      end: [grid[0].length - 1, grid.length - 1],
      heuristic: 'manhattan',
    });

    return solution.cost;
  }
}
