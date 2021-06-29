import { CacheModule, Module } from '@nestjs/common';
import { MazeController } from './maze.controller';
import { MazeService } from './maze.service';

@Module({
  imports: [CacheModule.register()],
  controllers: [MazeController],
  providers: [MazeService]
})
export class MazeModule {}
