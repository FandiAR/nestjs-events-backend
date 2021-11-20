import { AttendeesService } from './attendees.service';
import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';

@Controller('events/:eventId/attendees')
@SerializeOptions({ strategy: 'excludeAll' })
export class EventAttendeesController {
  constructor(private readonly attendeesService: AttendeesService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll(@Param('eventId') eventId: number) {
    return await this.attendeesService.findByEventId(eventId);
  }
}
