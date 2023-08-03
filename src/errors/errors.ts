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

export class ArtistNotExist extends HttpException {
  constructor() {
    super('Artist not exist', HttpStatus.NOT_FOUND);
  }
}

export class BadRequest extends HttpException {
  constructor() {
    super('id is invalid (not uuid)', HttpStatus.BAD_REQUEST);
  }
}

export class AlbumNotExist extends HttpException {
  constructor() {
    super('Album not exist', HttpStatus.NOT_FOUND);
  }
}

export class FavNotExist extends HttpException {
  constructor() {
    super('Favorites not exist', HttpStatus.NOT_FOUND);
  }
}

export class NotFound extends HttpException {
  constructor() {
    super('This id not found', 422);
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
