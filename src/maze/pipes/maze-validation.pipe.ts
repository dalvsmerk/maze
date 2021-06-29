import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { MazeDTO } from '../dto/maze.dto';

@Injectable()
export class MazeValidationPipe implements PipeTransform {
  transform(value: MazeDTO): MazeDTO {
    if (value.grid.length === 0) {
      throw new BadRequestException('Maze should not be empty');
    }

    if (this.wallEntrance(value)) {
      throw new BadRequestException('Maze should have an empty cell in the upmost top left cell');
    }

    if (this.wallExit(value)) {
      throw new BadRequestException('Maze should have an empty cell in the undermost bottom right cell');
    }

    if (this.tooSmall(value)) {
      throw new BadRequestException('Maze should have at least 2 rows and 2 columns');
    }

    if (this.tooLarge(value)) {
      throw new BadRequestException('Maze should not exceed 30x30 cells in size');
    }

    return value;
  }

  private tooSmall(maze: MazeDTO): boolean {
    const { grid } = maze;
    return (
      grid.length < 2 &&
      grid.every((row: string[]) => row.length < 2)
    );
  }

  private tooLarge(maze: MazeDTO): boolean {
    const { grid } = maze;
    return (
      grid.length > 30 &&
      grid.every((row: string[]) => row.length > 30)
    );
  }

  private wallEntrance(maze: MazeDTO): boolean {
    const { grid } = maze;
    return grid[0][0] === '#';
  }

  private wallExit(maze: MazeDTO): boolean {
    const { grid } = maze;
    return grid[grid.length - 1][grid[0].length - 1] === '#';
  }
}
