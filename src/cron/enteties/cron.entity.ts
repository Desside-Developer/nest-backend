import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('offers')
export class CronEntity {
  @PrimaryGeneratedColumn({})
  id: number;
}
