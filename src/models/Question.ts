import { Column, Model, Table, Sequelize, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import type { Optional } from 'sequelize/types';
import type { QuestionSchema } from '../types/QuestionSchema';
import { Test } from './Test';

type QuestionSchemaAttributesCreation = Optional<QuestionSchema, 'id'>;

@Table
export class Question extends Model<QuestionSchema, QuestionSchemaAttributesCreation> {
  @Column({
    type: DataType.UUID,
    defaultValue: Sequelize.literal('uuid_generate_v4()'),
    primaryKey: true,
    allowNull: false
  })
  id: string;

  @Column({ type: DataType.ENUM('CHECKBOX', 'RADIO', 'TEXT') })
  type: 'CHECKBOX' | 'RADIO' | 'TEXT';

  @Column order: number;

  @ForeignKey(() => Test)
  @Column({
    type: DataType.UUID
  })
  testId: string;
  @BelongsTo(() => Test)
  test: Test;
}
