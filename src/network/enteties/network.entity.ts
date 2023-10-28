import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('networks')
export class NetworkEntity {
    @PrimaryGeneratedColumn({})
    id: number;
    @Column({ type: 'longtext', nullable: true })
    OfferId: string;
    @Column({ type: 'text', nullable: true })
    name: string;
    @Column({ type: 'text', nullable: true })
    domain: string;
    @Column({ type: 'boolean', nullable: true })
    offer: boolean;
    @Column({ type: 'json', nullable: true })
    auths: Record<string, any>;
}
