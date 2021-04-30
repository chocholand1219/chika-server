import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm'
import {IsEnum, IsNotEmpty, IsString, ValidateNested} from 'class-validator'
import {User} from '@models/User'
import {FileUrl} from '@models/FileUrl'
import {Contents} from '@models/Contents'
import {Type} from 'class-transformer'
import {Solve} from '@models/Solve'

export enum SubmitType {
  TEXT = 'text',
  FILE = 'file',
}

@Entity()
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @IsNotEmpty()
  @IsString()
  @Column()
  title: string

  @IsEnum(SubmitType)
  @Column()
  submitType: SubmitType

  @ValidateNested({each: true})
  @Type(() => FileUrl)
  @OneToOne(() => FileUrl)
  @JoinColumn({name: 'fileId'})
  file: FileUrl

  @ManyToOne(() => Contents, (content) => content.questions)
  content: Contents

  @ManyToOne(() => User)
  user: User

  @ManyToMany(() => User, (user) => user.bookmarked_questions)
  @JoinTable()
  bookmark_users: User[]

  @OneToMany(() => Solve, (solve) => solve.question)
  solves: Solve[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @DeleteDateColumn()
  deleted_at: Date
}
