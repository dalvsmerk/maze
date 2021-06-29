import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes } from '@nestjs/common';
import { MazeDTO } from './dto/maze.dto';
import { MazeSolutionRO } from './entities/maze-solution';
import { MazeService } from './maze.service';
import { MazeValidationPipe } from './pipes/maze-validation.pipe';

@Controller('maze')
export class MazeController {

  constructor(private readonly mazeService: MazeService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @UsePipes(new MazeValidationPipe())
  async getMinimumStepsToPass(@Body() mazeDTO: MazeDTO): Promise<MazeSolutionRO> {
    const minStepsToPass = await this.mazeService.findMinimumStepsToPass(mazeDTO);
    return { minStepsToPass };
  }
}
