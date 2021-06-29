import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { MazeController } from './maze.controller';
import { MazeService } from './maze.service';
import { MazeValidationPipe } from './pipes/maze-validation.pipe';

@Module({
  controllers: [MazeController],
  providers: [
    // {
    //   provide: APP_PIPE,
    //   useClass: MazeValidationPipe,
    // },
    MazeService,
  ]
})
export class MazeModule {}
