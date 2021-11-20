import { IsEnum } from 'class-validator';
import { AttendeeAnswerEnum } from '../atendee.entity';

export class CreateAttendeeDto {
  @IsEnum(AttendeeAnswerEnum)
  answer: AttendeeAnswerEnum;
}
