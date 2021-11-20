import { IsEmail, Length } from 'class-validator';

export class CreateUserDTO {
  @Length(5) // just check minimum length
  username: string;

  @Length(8)
  password: string;

  @Length(8)
  retypedPassword: string;

  @Length(2)
  firstName: string;

  @Length(2)
  lastName: string;

  @IsEmail()
  email: string;
}