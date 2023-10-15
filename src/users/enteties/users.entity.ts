import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn({})
  id: number;
  @Column({ type: 'text', nullable: true })
  login: string;
  @Column({ type: 'text' })
  username: string;
  @Column({ type: 'text' })
  email: string;
  @Column({ type: 'text' })
  password: string;
  // Для паботы почтового сервиса
  @Column({ nullable: true })
  confirmationToken: string;
}
