import { IsDateString, IsString, Length } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @Length(5, 255, { message: 'The length is wrong!!!' })
  name: string;

  @IsString()
  description: string;

  @IsDateString()
  when: string;

  @IsString()
  address: string;
}
