import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotExist extends HttpException {
  constructor() {
    super('User not exist', HttpStatus.NOT_FOUND);
  }
}
