import { Column, Model, Table, Sequelize, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import type { Optional } from 'sequelize/types';
import type { AnswerSchema } from '../types/AnwerSchema';
import { Question } from './Question';


type AnswerAttributesCreation = Optional<AnswerSchema, 'id'>;

@Table
export class Answer extends Model<AnswerSchema, AnswerAttributesCreation> {
  @Column({
    type: DataType.UUID,
    defaultValue: Sequelize.literal('uuid_generate_v4()'),
    primaryKey: true,
    allowNull: false
  })
  id: string;

  @Column value:string;

  @Column correct: boolean;

  @ForeignKey(()=> Question)
  @Column({
    type: DataType.UUID
  })
  questionId: string;
  @BelongsTo(() => Question)
  test: Question;
}
