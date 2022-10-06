import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';

@Module({
  imports: [MoviesModule],
  controllers: [AppController], // 라우터에서 호출한 url을 가져오고 처리 function을 실행하는 파일
  providers: [], // service
})
export class AppModule {}
