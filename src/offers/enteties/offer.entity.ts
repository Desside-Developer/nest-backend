import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('offers')
export class OfferEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'int', nullable: true })
  OfferId: number;
  @Column({ type: 'boolean', nullable: true })
  active: boolean;
  @Column({ type: 'text', nullable: true })
  name: string;
  @Column({ type: 'text', nullable: true })
  info: string;
  @Column({ type: 'int', nullable: true })
  nid: number;
  @Column({ type: 'text', nullable: true })
  network: string;
  @Column({ type: 'text', nullable: true })
  url: string;
  @Column({ type: 'boolean', nullable: true })
  add: boolean;
  @Column({ type: 'int', nullable: true })
  time: number;
  @Column({ type: 'datetime', nullable: true })
  date: string;
  @Column({ type: 'int', nullable: true })
  first: number;
  @Column({ type: 'boolean', nullable: true })
  sub: boolean;
  @Column({ type: 'int', nullable: true })
  goal: number;
  @Column({ type: 'int', nullable: true })
  goals: number;
  @Column({ type: 'text', nullable: true })
  geo: string;
  @Column({ type: 'boolean', nullable: true })
  private: boolean;
}
