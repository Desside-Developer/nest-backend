import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn({})
  id: number;
  @Column({ type: 'text' })
  username: string;
  @Column({ type: 'text', unique: true })
  email: string;
  @Column({ type: 'text' })
  password: string;
  @Column({ type: 'text' })
  ApiToken: string;
  // Для паботы почтового сервиса
  @Column({ nullable: true })
  confirmationToken: string;
}
