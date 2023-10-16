import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('offers')
export class OfferEntity {
  @PrimaryGeneratedColumn({})
  id: number;
  @Column({ type: 'text', nullable: true })
  name: string;
  @Column({ type: 'text' })
  url: string;
  @Column({ type: 'text' })
  domain: string;
  @Column({ type: 'text' })
  offer: string;
  @Column({ type: 'text' })
  auths: string;
}
