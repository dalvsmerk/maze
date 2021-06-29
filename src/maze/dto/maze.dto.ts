import { ArrayNotEmpty, IsNotEmpty } from 'class-validator';

export class MazeDTO {
  @IsNotEmpty()
  @ArrayNotEmpty()
  readonly grid: string[][];
}
