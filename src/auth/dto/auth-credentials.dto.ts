import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4, { message: 'Username too short' })
  @MaxLength(20, { message: 'Username too long' })
  username: string;

  @IsString()
  @MinLength(8, { message: 'Password too short' })
  @MaxLength(32, { message: 'Password too long' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'Password too weak' })
  password: string;
}
