import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn({})
  id:number;
  @Column({type: "longtext"})
  username: string;
  @Column({})
  password: string;
}
