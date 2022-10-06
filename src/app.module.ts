import { Module } from '@nestjs/common';
import { MoviesController } from './movies/movies.controller';
import { MoviesService } from './movies/movies.service';

@Module({
  imports: [],
  controllers: [MoviesController], // 라우터에서 호출한 url을 가져오고 처리 function을 실행하는 파일
  providers: [MoviesService], //
})
export class AppModule {}
