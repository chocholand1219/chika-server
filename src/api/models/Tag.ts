import {
  Index,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
} from 'typeorm'
import {IsEnum, IsNotEmpty, IsOptional, IsString} from 'class-validator'
import {Contents} from '@models/Contents'

export enum TagType {
  대분류 = 'classification',
  키워드 = 'keyword',
}

@Entity()
@Index(['type', 'name'], {unique: true})
export class Tag {
  @IsOptional()
  @PrimaryGeneratedColumn()
  id: number

  @IsEnum(TagType)
  @Column()
  @IsOptional()
  type: TagType

  @IsNotEmpty()
  @IsString()
  @Column()
  name: string

  @ManyToMany(() => Contents, (contents) => contents.classifications)
  classificationsContents: Contents[]

  @ManyToMany(() => Contents, (contents) => contents.keywords)
  keywordsContents: Contents[]

  @CreateDateColumn()
  created_at: Date
}
