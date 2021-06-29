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

    // Snake uses cartesian coordinates, [0,0] is bottom left, not top left
    const mazeSolver = new Snake();
    const solution = mazeSolver.solve({
      maze: binaryGrid,
      start: [0, grid.length - 1],
      end: [grid[0].length - 1, 0],
      heuristic: 'manhattan',
    });

    // Cost includes the initial position
    return solution.cost - 1;
  }
}
