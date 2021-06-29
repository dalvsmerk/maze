import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { MazeController } from './maze.controller';
import { MazeValidationPipe } from './pipes/maze-validation.pipe';

@Module({
  controllers: [MazeController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: MazeValidationPipe,
    }
  ]
})
export class MazeModule {}
