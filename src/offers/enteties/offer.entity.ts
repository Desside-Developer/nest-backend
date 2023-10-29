import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('offers')
export class OfferEntity {
  @PrimaryGeneratedColumn({})
  id: number;
  @Column({ type: 'text', nullable: true })
  OfferId: string;
  @Column({ type: 'text', nullable: true })
  active: string;
  @Column({ type: 'text', nullable: true })
  name: string;
  @Column({ type: 'text', nullable: true })
  info: string;
  @Column({ type: 'text', nullable: true })
  nid: string;
  @Column({ type: 'text', nullable: true })
  network: string;
  @Column({ type: 'text', nullable: true })
  url: string;
  @Column({ type: 'text', nullable: true })
  add: string;
  @Column({ type: 'text', nullable: true })
  time: string;
  @Column({ type: 'text', nullable: true })
  date: string;
  @Column({ type: 'text', nullable: true })
  first: string;
  @Column({ type: 'text', nullable: true })
  sub: string;
  @Column({ type: 'text', nullable: true })
  goal: string;
  @Column({ type: 'text', nullable: true })
  goals: string;
  @Column({ type: 'text', nullable: true })
  geo: string;
  @Column({ type: 'text', nullable: true })
  private: string;
}
