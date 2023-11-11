import { WorkShopEntity } from '@modules/workshop/entities/workshop.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('reservations')
export class ReservationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  workshop_id: number;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @ManyToOne(() => WorkShopEntity, (workshop) => workshop.reservations)
  @JoinColumn({
    name: 'workshop_id',
  })
  workshop?: WorkShopEntity;
}
