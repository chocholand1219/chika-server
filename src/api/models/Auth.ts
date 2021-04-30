import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from 'typeorm'
import {IsNotEmpty, IsNumberString, IsString} from 'class-validator'

@Entity()
export class Auth {
  @PrimaryGeneratedColumn()
  id: number

  @IsNotEmpty()
  @IsString()
  @Column()
  code: string

  @IsNotEmpty()
  @IsNumberString()
  @Column()
  phone: string

  @CreateDateColumn()
  created_at: Date
}
