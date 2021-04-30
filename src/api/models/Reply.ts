import {
  Column,
  TreeChildren,
  TreeParent,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import {Question} from '@models/Question'

@Entity()
export class Reply {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  comment: string

  @Column()
  like_count: number

  @TreeChildren()
  children: Reply[]

  @TreeParent()
  parent: Reply

  @ManyToOne(() => Question)
  question: Question

  @CreateDateColumn()
  created_at: Date
}
