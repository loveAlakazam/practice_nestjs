import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { APP_INTERCEPTOR } from '@nestjs/core';
// import { redisStore } from 'cache-manager-redis-yet';
import { redisStore } from 'cache-manager-redis-store';
// import type { ClientOpts } from 'redis';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    CacheModule.registerAsync<any>({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async () => {
        const store = await redisStore({
          socket: { host: 'localhost', port: 6379 },
          ttl: 60,
        });

        return { store: () => store };
      },
      inject: [ConfigService],
    }),
    // CacheModule.register({
    //   /**
    //    * ttl: time to live : lifespan or lifetime of data in a computer or network.
    //    * max: maximum number of item in cache
    //    * isGlobal: 다른모듈에서 cachemodule을 사용할경우에는 isGlobal을 true로 설정.
    //    */

    //   isGlobal: true,
    //   ttl: 60, // default: 5 seconds / time-unit: seconds
    //   max: 100,
    // }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
