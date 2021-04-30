import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm'
import {IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator'
import {User} from '@models/User'
import {Tag} from '@models/Tag'
import {Theme} from '@models/Theme'
import {Question} from '@models/Question'

export enum ContentsStatusType {
  활성상태 = 'active',
  비활성상태 = 'inactive',
}

@Entity()
export class Contents {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @IsNotEmpty()
  @IsString()
  @Column({
    comment: '이름',
  })
  title: string

  @IsNotEmpty()
  @IsNumber()
  @Column({
    comment: '난이도',
  })
  level: number

  @IsNotEmpty()
  @IsString()
  @Column()
  goal: string

  @IsString()
  @Column()
  link: string

  @IsNotEmpty()
  @IsString()
  @Column({
    type: 'text',
  })
  introduce: string

  @ManyToMany(() => Tag, (tag) => tag.classificationsContents)
  @JoinTable()
  classifications: Tag[]

  @ManyToMany(() => Tag, (tag) => tag.keywordsContents)
  @JoinTable()
  keywords: Tag[]

  @Column({
    default: ContentsStatusType.비활성상태,
    type: 'enum',
    enum: ContentsStatusType,
  })
  status: ContentsStatusType

  @IsNumber()
  @IsOptional()
  @Column({
    nullable: true,
  })
  order: number

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @DeleteDateColumn()
  deleted_at: Date

  @ManyToOne(() => User)
  user: User

  @ManyToOne(() => Theme)
  theme: Theme

  @OneToMany(() => Question, (question) => question.content)
  questions: Question[]
}
