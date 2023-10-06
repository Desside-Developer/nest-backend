import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn({})
  id: number;
  @Column({ type: 'longtext' })
  username: string;
  @Column({ type: 'longtext' })
  password: string;
  @Column({ type: 'longtext', unique: true })
  email: string;
}
