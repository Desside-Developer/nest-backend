import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn({type:'number'})
  id:number;
  @Column({type:'string'})
  username: string;
  @Column({type:'string'})
  password: string;
  @Column({type:'string', nullable:true})
  user: string;
  @Column({default:true, nullable: true})
  isActive: boolean;
  @Column({unique:true,type:'string'})
  email: string;
}
