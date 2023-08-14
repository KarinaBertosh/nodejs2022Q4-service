import { HttpException, HttpStatus } from '@nestjs/common';

export class EntityNotExist extends HttpException {
  constructor(type: string) {
    super(`${type} not exist`, HttpStatus.NOT_FOUND);
  }
}

export class EntityNotContent extends HttpException {
  constructor(type: string) {
    super(`${type} not exists`, 204);
  }
}

export class PasswordNotRight extends HttpException {
  constructor() {
    super('Password not right', 403);
  }
}

export class EntityNotFound extends HttpException {
  constructor(type: string) {
    super(`${type} id not found`, 422);
  }
}

export class EntityNotCreate extends HttpException {
  constructor(type: string) {
    super(`${type} not create`, 400);
  }
}
