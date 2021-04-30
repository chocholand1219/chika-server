import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'
import {IsNotEmpty, IsString} from 'class-validator'

@Entity()
export class FamousSaying {
  @PrimaryGeneratedColumn()
  id: number

  @IsNotEmpty()
  @IsString()
  @Column()
  comment: string
}
