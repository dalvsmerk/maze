import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MazeModule } from './maze/maze.module';

@Module({
  imports: [MazeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
