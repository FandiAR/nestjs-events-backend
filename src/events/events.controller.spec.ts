import { User } from './../auth/user.entity';
import { Repository } from 'typeorm';
import { Event } from './event.entity';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { ListEvents } from './input/list.events';
import { NotFoundException } from '@nestjs/common';

// group testing
describe('EventsController', () => {
  let eventsController: EventsController;
  let eventsService: EventsService;
  let eventsRepository: Repository<Event>;

  /**
   * run once for the group
   */
  beforeAll(() => console.log('this logged once'));

  /**
   * will be called everytime a tes is run inside this group
   */
  beforeEach(() => {
    eventsService = new EventsService(eventsRepository);
    eventsController = new EventsController(eventsService);
    console.log('this would logged twice');
  });

  // it() === test()
  it('should return a list of events', async () => {
    const result = {
      first: 1,
      last: 1,
      limit: 10,
      data: [],
    };

    // Mock: jest.fn()
    eventsService.getEventsWithAttendeeCountFilteredPaginated = jest
      .fn()
      .mockImplementation((): any => result);

    const spy = jest
      .spyOn(eventsService, 'getEventsWithAttendeeCountFilteredPaginated')
      .mockImplementation((): any => result);

    // example expect using simple mock
    expect(await eventsController.findAll(new ListEvents())).toEqual(result);

    // example expect using spy, cant call X times
    expect(spy).toBeCalledTimes(1);
  });

  it("should not delete an event when it's not found", async () => {
    const deleteSpy = jest.spyOn(eventsService, 'deleteEvent');
    const findSpy = jest
      .spyOn(eventsService, 'findOne')
      .mockImplementation((): any => undefined);

    try {
      await eventsController.remove(1, new User());
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }

    expect(deleteSpy).toBeCalledTimes(0);
    expect(findSpy).toHaveBeenCalledTimes(1);
  });
});
