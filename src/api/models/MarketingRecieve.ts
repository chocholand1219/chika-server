import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  UpdateDateColumn,
} from 'typeorm'
import {IsNotEmpty} from 'class-validator'
import {User} from '@models/User'

@Entity()
export class MarketingRecieve {
  @PrimaryGeneratedColumn()
  id: number

  @IsNotEmpty()
  @Column()
  is_agree: boolean

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @OneToOne(() => User)
  user: User
}
