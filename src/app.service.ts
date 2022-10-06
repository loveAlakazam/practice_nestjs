import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Eunkang!';
  }

  sayHello(name: string): string {
    if (name) {
      return `Hello ${name}`;
    }
    return 'Hello';
  }
}
