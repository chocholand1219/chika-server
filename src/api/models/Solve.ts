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
} from 'typeorm'
import {IsNotEmpty, IsString, ValidateNested} from 'class-validator'
import {User} from '@models/User'
import {Question} from '@models/./Question'
import {Type} from 'class-transformer'
import {FileUrl} from '@models/FileUrl'

@Entity()
export class Solve {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ValidateNested({each: true})
  @Type(() => FileUrl)
  @OneToOne(() => FileUrl)
  @JoinColumn({name: 'fileId'})
  file: FileUrl

  @IsNotEmpty()
  @IsString()
  @Column()
  comment: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @DeleteDateColumn()
  deleted_at: Date

  @ManyToOne(() => User)
  user: User

  @ManyToOne(() => Question, (question) => question.solves)
  question: Question
}
