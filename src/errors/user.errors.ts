import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotExist extends HttpException {
  constructor() {
    super('User not exist', HttpStatus.NOT_FOUND);
  }
}

export class PasswordNotCorrect extends HttpException {
  constructor() {
    super('Password not correct', 403);
  }
}
