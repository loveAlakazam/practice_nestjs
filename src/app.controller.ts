import {
  Controller,
  Get,
  CacheInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';

@UseInterceptors(CacheInterceptor)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
