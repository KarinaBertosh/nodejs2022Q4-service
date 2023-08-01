import { Global, Module } from '@nestjs/common';
import { DB } from './db.servise';

@Global()
@Module({
  providers: [DB],
  exports: [DB],
})
export class DbModule {}
