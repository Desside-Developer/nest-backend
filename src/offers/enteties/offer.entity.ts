import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('offers')
export class OfferEntity {
  @PrimaryGeneratedColumn({})
  id: number;
  @Column({ type: 'text' })
  OfferId: string;
  @Column({ type: 'text' })
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
