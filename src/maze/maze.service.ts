import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { MazeDTO } from './dto/maze.dto';
const Snake = require('snake');

@Injectable()
export class MazeService {

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  public async findMinimumStepsToPass(mazeDTO: MazeDTO): Promise<number> {
    const { grid } = mazeDTO;

    const mazeCacheKey = this.mazeToCacheKey(grid);
    const cachedCost: number | undefined = await this.cacheManager.get(mazeCacheKey);

    if (cachedCost) return cachedCost;

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
    const cost = solution.cost - 1;

    if (!cachedCost) {
      await this.cacheManager.set(mazeCacheKey, cachedCost, { ttl: null });
    }

    return cost;
  }

  private mazeToCacheKey(grid: string[][]): string {
    return grid.reduce((acc: string, row: string[]): string => acc + row.join(''), '');
  }
}
