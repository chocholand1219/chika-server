import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import {IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator'
import {Contents} from '@models/Contents'

@Entity()
export class Theme {
  @PrimaryGeneratedColumn()
  id: number

  @IsNotEmpty()
  @IsString()
  @Column()
  name: string

  @IsNumber()
  @IsOptional()
  @Column({
    nullable: true,
  })
  order: number

  @CreateDateColumn()
  created_at: Date

  @OneToMany(() => Contents, (contents) => contents.theme)
  contents: Contents[]
}
