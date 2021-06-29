import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'isValidMaze', async: false })
export class MazeIsNotTooLarge implements ValidatorConstraintInterface {
  validate(maze: string[][], args: ValidationArguments): boolean {
    const [ width, height ]: [number, number] = args.constraints as [number, number];

    const isNotTooLarge = (
      maze.length <= height &&
      maze.every((row: string[]) => row.length <= width)
    );

    const isNotTooSmall =
      maze.length > 1 &&
      maze.every((row: string[]) => row.length > 1);

    return isNotTooLarge && isNotTooSmall;
  }

  defaultMessage(args: ValidationArguments): string {
    const [ width, height ]: [number, number] = args.constraints as [number, number];

    return `Maze should be larger that 1x1 and smaller than ${width + 1}x${height + 1}`;
  }
}
