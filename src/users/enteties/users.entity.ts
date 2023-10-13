import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn({})
  id: number;
  @Column({ type: 'text' })
  login: string;
  @Column({ type: 'text' })
  username: string;
  @Column({ type: 'text' })
  email: string;
  @Column({ type: 'text' })
  password: string;
}
