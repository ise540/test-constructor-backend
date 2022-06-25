import {
  Column,
  Model,
  Table,
  Sequelize,
  DataType,
  ForeignKey,
  CreatedAt,
  BelongsTo
} from 'sequelize-typescript';
import type { Optional } from 'sequelize/types';
import type { TestSchema } from '../types/TestSchema';
import { User } from './User';

type TestAttributesCreation = Optional<TestSchema, 'id'>;

@Table
export class Test extends Model<TestSchema, TestAttributesCreation> {
  @Column({
    type: DataType.UUID,
    defaultValue: Sequelize.literal('uuid_generate_v4()'),
    primaryKey: true,
    allowNull: false
  })
  id: string;

  @Column title: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID
  })
  authorId: string;
  @BelongsTo(()=>User)
  user: User
}
