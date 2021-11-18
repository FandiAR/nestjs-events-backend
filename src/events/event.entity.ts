import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Attendee } from './atendee.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  when: Date;

  @Column()
  address: string;

  @OneToMany(() => Attendee, (attendee) => attendee.event)
  attendees: Attendee[];

  // without @Column() because never loaded or nevet stored from database
  attendeeCount?: number;
  attendeeRejceted?: number;
  attendeeMaybe?: number;
  attendeeAccepted?: number;
}
