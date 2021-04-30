import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
} from 'typeorm'
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator'
import {Question} from '@models/Question'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @IsNotEmpty()
  @IsEmail()
  @Column()
  email: string

  @IsNotEmpty()
  @IsString()
  @Column()
  name: string

  @IsOptional()
  @IsString()
  @Column({
    default: '',
  })
  nickname: string

  @IsNotEmpty()
  @IsString()
  @Column()
  phone: string

  @IsString()
  @Column()
  google_id: string

  @IsNotEmpty()
  @IsBoolean()
  @Column()
  is_subscribe: boolean

  @ManyToMany(() => Question, (question) => question.bookmark_users)
  bookmarked_questions: Question[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @DeleteDateColumn()
  deleted_at: Date
}
