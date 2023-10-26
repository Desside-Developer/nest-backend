import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('networks')
export class NetworkEntity {
    @PrimaryGeneratedColumn({})
    id: number;
    @Column({ type: 'text', nullable: true })
    OfferId: string;
    @Column({ type: 'text' })
    name: string;
    @Column({ type: 'text' })
    domain: string;
    @Column({ type: 'text' })
    offer: string;
    @Column({ type: 'text' })
    auths: string;
}
