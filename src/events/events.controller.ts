import { AuthGuardJwt } from './../auth/auth-guard.jwt';
import { ListEvents } from './input/list.events';
import { EventsService } from './events.service';
// import { Attendee } from 'src/events/atendee.entity';
import { UpdateEventDto } from './input/update-event.dto';
import { CreateEventDto } from './input/create-events.dto';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Logger,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
// import { Event } from './event.entity';
// import { Like, MoreThan, Repository } from 'typeorm';
// import { InjectRepository } from '@nestjs/typeorm';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('/events')
@SerializeOptions({ strategy: 'excludeAll' })
export class EventsController {
  private readonly logger = new Logger(EventsController.name);

  constructor(
    // @InjectRepository(Event)
    // private readonly eventRepository: Repository<Event>,

    // @InjectRepository(Attendee)
    // private readonly attendeeRepository: Repository<Attendee>,

    private readonly eventsService: EventsService,
  ) {}

  // @Get('/practice')
  // async practice() {
  //   return await this.eventRepository.find({
  //     select: ['id', 'when'], // select show field
  //     // filter with some spesific condition
  //     where: [
  //       {
  //         id: MoreThan(3),
  //         when: MoreThan(new Date('2021-02-12T13:00:00')),
  //       },
  //       { description: Like('%meet%') },
  //     ],
  //     take: 2, // limit the amount of results
  // sorting
  //     order: {
  //       id: 'DESC',
  //     },
  //   });
  // }

  // @Get('/practice2')
  // async practice2() {
  // using relations
  // return await this.repository.findOne(1, {
  //   relations: ['attendees'],
  // });

  // add value table attendee
  // const event = await this.repository.findOne(1);
  // const attendee = new Attendee();
  // attendee.name = 'Fandi';
  // attendee.event = event;
  // await this.attendeeRepository.save(attendee);
  // return event;

  //   return await this.eventRepository
  //     .createQueryBuilder('d')
  //     .select(['d.id', 'd.name'])
  //     .orderBy('d.name', 'ASC')
  //     .take(2)
  //     .getMany();
  // }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll(@Query() filter: ListEvents) {
    this.logger.debug(filter);
    const events =
      await this.eventsService.getEventsWithAttendeeCountFilteredPaginated(
        filter,
        {
          total: true,
          currentPage: filter.page,
          perPage: filter.perPage,
        },
      );
    return events;
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const event = await this.eventsService.getEvent(id);
    if (!event) {
      throw new NotFoundException();
    }
    return event;
  }

  @Post()
  @UseGuards(AuthGuardJwt)
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() input: CreateEventDto, @CurrentUser() user: User) {
    return await this.eventsService.createEvent(input, user);
  }

  @Patch(':id')
  @UseGuards(AuthGuardJwt)
  @UseInterceptors(ClassSerializerInterceptor)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() input: UpdateEventDto,
    @CurrentUser() user: User,
  ) {
    const event = await this.eventsService.getEvent(id);
    if (!event) {
      throw new NotFoundException();
    }
    if (event.organizerId !== user.id) {
      throw new ForbiddenException(
        null,
        'You are not authorized to change this event',
      );
    }
    return await this.eventsService.updateEvent(event, input);
  }

  @Delete(':id')
  @UseGuards(AuthGuardJwt)
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: User,
  ) {
    const event = await this.eventsService.getEvent(id);
    if (!event) {
      throw new NotFoundException();
    }
    if (event.organizerId !== user.id) {
      throw new ForbiddenException(
        null,
        'You are not authorized to delete this event',
      );
    }
    await this.eventsService.deleteEvent(id);
  }
}
