import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotExist extends HttpException {
  constructor() {
    super('User not exist', HttpStatus.NOT_FOUND);
  }
}

export class TrackNotExist extends HttpException {
  constructor() {
    super('Track not exist', HttpStatus.NOT_FOUND);
  }
}

export class UserNotCreate extends HttpException {
  constructor() {
    super('User not create', 400);
  }
}

export class TrackNotCreate extends HttpException {
  constructor() {
    super('Track not create', 400);
  }
}

export class PasswordNotCorrect extends HttpException {
  constructor() {
    super('Password not correct', 403);
  }
}
