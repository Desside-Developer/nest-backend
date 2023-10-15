import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('offers')
export class OfferEntity {
  @PrimaryGeneratedColumn({})
  id: number;
  @Column({ type: 'text', nullable: true })
  show: string;
  @Column({ type: 'text' })
  info: string;
}
