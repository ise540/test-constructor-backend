import { Column, Model, Table, DataType, ForeignKey, BelongsTo, Sequelize } from 'sequelize-typescript';
import type { Optional } from 'sequelize/types';
import type { UserTokenSchema } from '../types/UserTokenSchema';
import { User } from './User';

type UserTokenAttributesCreation = Optional<UserTokenSchema, 'id'>;

@Table
export class UserToken extends Model<UserTokenSchema, UserTokenAttributesCreation> {
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

  @Column refreshToken: string;
}
