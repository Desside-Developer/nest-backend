import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn({type:'number'})
  id: number;
  @Column({type:'string'})
  firstName: string;
  @Column({type:'string'})
  lastName: string;
  @Column({default:true})
  isActive: boolean;
  @Column({unique:true,type:'string'})
  email: string;
}
