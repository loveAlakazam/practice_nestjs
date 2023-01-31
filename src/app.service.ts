import { Injectable, Logger } from '@nestjs/common';
import { CreateUserRequest } from './dto/create-user.request';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { UserCreatedEvent } from './events/user-created.event';
import { v4 as uuidv4 } from 'uuid';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    private readonly eventEmitter: EventEmitter2,
    private schedulerRegistry: SchedulerRegistry,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async createUser(body: CreateUserRequest) {
    this.logger.log('Createing User...', body);
    const newId = uuidv4();
    const newEvent = new UserCreatedEvent(newId, body.email);
    this.eventEmitter.emit('user.created', newEvent);

    // 타임아웃을 정의 : 5초후에 establishWsConnection 함수를 수행
    const establishWsTimeout = setTimeout(
      () => this.establishWsConnection(newId),
      5000,
    );

    //establishWsTimeout을 실행함.
    this.schedulerRegistry.addTimeout(
      `${newId}_establish_ws`,
      establishWsTimeout,
    );
  }
  private establishWsConnection(userId: string) {
    this.logger.log('Establishing WS connection with user...', userId);
    // this.schedulerRegistry.deleteCronJob('delete_expired_users');
  }

  @OnEvent('user.created')
  welcomeNewUser(payload: UserCreatedEvent) {
    this.logger.log('Welcoming new user...', payload.email);
  }

  // user.created 라는 키값에 해당하는 이벤트에 대해서 호출, asynchronous처리
  @OnEvent('user.created', { async: true })
  async sendWelcomeGift(payload: UserCreatedEvent) {
    this.logger.log('Sending Welcome gift to...', payload.email);
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 3000));
    this.logger.log('Welcome gift sent finished.', payload.email);
  }

  // 10초마다 호출
  @Cron(CronExpression.EVERY_10_SECONDS, { name: 'delete_expired_users' })
  deleteExpiredUsers() {
    this.logger.log('Deleting Expired Users');
  }
}
