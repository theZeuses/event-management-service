import { WorkShopEntity } from '@modules/workshop/entities/workshop.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('events')
export class EventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  start_at: Date;

  @Column()
  end_at: Date;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @OneToMany(() => WorkShopEntity, (workShop) => workShop.event)
  workshops?: WorkShopEntity[];
}
