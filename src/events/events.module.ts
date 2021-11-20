import { EventsService } from './events.service';
import { Attendee } from 'src/events/atendee.entity';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Event } from './event.entity';
import { AttendeesService } from './attendees.service';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Attendee])],
  controllers: [EventsController],
  providers: [EventsService, AttendeesService],
})
export class EventsModule {}
