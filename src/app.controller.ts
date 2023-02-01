import {
  Body,
  Controller,
  Get,
  Post,
  CacheInterceptor,
  UseInterceptors,
  CacheKey,
  CacheTTL,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserRequest } from './dto/create-user.request';

@UseInterceptors(CacheInterceptor)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('redis')
  @CacheKey('some_route')
  @CacheTTL(10)
  async getHelloRedis() {
    return await this.appService.getHelloRedis();
  }

  @Post()
  async createUser(@Body() body: CreateUserRequest): Promise<void> {
    return this.appService.createUser(body);
  }
}
