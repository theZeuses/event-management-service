import { EventEntity } from '@modules/event/entities/event.entity';
import { ReservationEntity } from '@modules/reservation/entities/reservation.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('workshops')
export class WorkShopEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  start_at: Date;

  @Column()
  end_at: Date;

  @Column()
  event_id: number;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @ManyToOne(() => EventEntity, (event) => event.workshops)
  @JoinColumn({
    name: 'event_id',
  })
  event?: EventEntity;

  @OneToMany(() => ReservationEntity, (reservation) => reservation.workshop)
  reservations?: ReservationEntity[];
}
