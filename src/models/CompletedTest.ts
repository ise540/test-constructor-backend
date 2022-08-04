import { Column, Model, Table, Sequelize, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import type { Optional } from 'sequelize/types';
import type { CompletedTestSchema } from '../types/CompletedTestSchema';
import { Test } from './Test';
import { User } from './User';

type CompletedTestAttributesCreation = Optional<CompletedTestSchema, 'id'>;

@Table
export class CompletedTest extends Model<CompletedTestSchema, CompletedTestAttributesCreation> {
  @Column({
    type: DataType.UUID,
    defaultValue: Sequelize.literal('uuid_generate_v4()'),
    primaryKey: true,
    allowNull: false
  })
  id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID
  })
  userId: string;
  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Test)
  @Column({
    type: DataType.UUID
  })
  testId: string;
  @BelongsTo(() => Test)
  test: Test;

  @Column title: string;

  @Column right: number;

  @Column wrong: number;
}
