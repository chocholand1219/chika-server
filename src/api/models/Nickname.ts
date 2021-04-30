import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'
import {IsNotEmpty, IsString} from 'class-validator'

@Entity()
export class Nickname {
  @PrimaryGeneratedColumn()
  id: number

  @IsNotEmpty()
  @IsString()
  @Column()
  name: string
}
