import { Module } from '@nestjs/common';
import { MyLogger } from './LoggerService';

@Module({
  providers: [MyLogger],
  exports: [MyLogger],
})
export class LoggerModule { }