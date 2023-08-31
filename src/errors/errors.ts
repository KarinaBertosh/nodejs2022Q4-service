import { HttpException, HttpStatus } from '@nestjs/common';
import { BaseError } from './BaseError';

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

export class NotCorrect extends HttpException {
  constructor() {
    super('Password or login not correct', 403);
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

export class EntityAlreadyExists extends HttpException {
  constructor(type: string) {
    super(`${type} already exists`, 400);
  }
}

export class NotFoundError extends BaseError {
  constructor(content = 'Not found this entity') {
    super('NOT FOUND', content, true);
  }
}

export class Forbidden extends BaseError {
  constructor(content = 'Authentication') {
    super('AUTHENTICATION', content, true);
  }
}

export class BadRequest extends BaseError {
  constructor(content = 'Bad Request') {
    super('BAD REQUEST', content, true);
  }
}

