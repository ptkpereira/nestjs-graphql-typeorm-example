import { ObjectType, Field, Int, HideField } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @HideField()
  password: string;
}
