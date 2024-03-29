import { Column, Model, Table, Sequelize, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import type { Optional } from 'sequelize/types';
import type { UserAnswerSchema } from '../types/UserAnswerSchema';
import { Answer } from './Answer';
import  { Question } from './Question';
import { Test } from './Test';
import { User } from './User';

type UserAnswersAttributesCreation = Optional<UserAnswerSchema, 'id'>;

@Table
export class UserAnswer extends Model<UserAnswerSchema, UserAnswersAttributesCreation> {
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

  @ForeignKey(() => Question)
  @Column({
    type: DataType.UUID
  })
  questionId: string;
  @BelongsTo(() => Question)
  question: Question;

  @ForeignKey(() => Test)
  @Column({
    type: DataType.UUID
  })
  testId: string;
  @BelongsTo(() => Test)
  test: Test;

  @ForeignKey(() => Answer)
  @Column({
    type: DataType.UUID
  })
  answerId: string;
  @BelongsTo(() => Answer)
  answer: Answer;

  @Column value: string;
}
