import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() // router.get() 과 같음.
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/hello/:name')
  sayHello(name: string): string {
    return this.appService.sayHello(name);
  }
}
