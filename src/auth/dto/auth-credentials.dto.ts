import { IsString, MaxLength, MinLength, Matches } from 'class-validator';
import { MinKey } from 'typeorm';

export class AuthCredentialsDto {
  @IsString()
  @MaxLength(20)
  @MinLength(4)
  username: string;

  @IsString()
  @MaxLength(20)
  @MinLength(6)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;
}
