import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from 'typeorm'
import {IsNotEmpty, IsString} from 'class-validator'

@Entity()
export class FileUrl {
  @PrimaryGeneratedColumn()
  id: number

  @IsNotEmpty()
  @IsString()
  @Column()
  name: string

  @IsNotEmpty()
  @IsString()
  @Column()
  url: string

  @CreateDateColumn()
  created_at: Date
}
