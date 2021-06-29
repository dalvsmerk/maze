import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { MazeDTO } from './dto/maze.dto';
import { MazeValidationPipe } from './pipes/maze-validation.pipe';

@Controller('maze')
export class MazeController {
  @Post()
  @UsePipes(new MazeValidationPipe())
  getMinimumStepsToPass(@Body() dto: MazeDTO) {
    return 0;
  }
}
