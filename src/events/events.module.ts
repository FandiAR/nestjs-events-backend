import { EventAttendeesController } from './event-attendees.controller';
import { EventsService } from './events.service';
import { Attendee } from 'src/events/atendee.entity';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Event } from './event.entity';
import { AttendeesService } from './attendees.service';
import { EventsOrganizedByUserController } from './events-organized-by-user.controller';
import { CurrentUserEventAttendanceController } from './current-user-event-attendance.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Attendee])],
  controllers: [
    EventsController,
    EventAttendeesController,
    EventsOrganizedByUserController,
    CurrentUserEventAttendanceController,
  ],
  providers: [EventsService, AttendeesService],
})
export class EventsModule {}
