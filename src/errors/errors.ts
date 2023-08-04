import { HttpException, HttpStatus } from '@nestjs/common';

export class EntityNotExist extends HttpException {
  constructor(type: string) {
    super(`${type} not exist`, HttpStatus.NOT_FOUND);
  }
}

// export class BadRequest extends HttpException {
//   constructor() {
//     super('id is invalid (not uuid)', HttpStatus.BAD_REQUEST);
//   }
// }

// export class EntityNotFound extends HttpException {
//   constructor(type: string) {
//     super(`${type} id not found`, 422);
//   }
// }

export class EntityNotCreate extends HttpException {
  constructor(type: string) {
    super(`${type} not create`, 400);
  }
}

// ////////////
