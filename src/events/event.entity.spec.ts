import { Event } from './event.entity';

test('Event should be initialized though constructor', () => {
  const event = new Event({
    name: 'Unit Test Event',
    description: 'For Unit Test Purpose',
  });

  expect(event).toEqual({
    name: 'Unit Test Event',
    description: 'For Unit Test Purpose',
    id: undefined,
    when: undefined,
    address: undefined,
    attendees: undefined,
    organizer: undefined,
    organizerId: undefined,
    event: undefined,
    attendeeCount: undefined,
    attendeeRejected: undefined,
    attendeeMaybe: undefined,
    attendeeAccepted: undefined,
  });
});
