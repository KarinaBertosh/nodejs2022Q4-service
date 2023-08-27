import { IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string;
}

export class RefreshDto {
  id: string;
  login: string;
}

export class UpdateDto {
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
