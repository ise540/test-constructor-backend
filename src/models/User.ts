import {
  Column,
  Model,
  Table,
  Sequelize,
  DataType
} from 'sequelize-typescript';
import type { Optional } from 'sequelize/types';
import type { UserSchema } from '../types/UserSchema';

type UserAttributesCreation = Optional<UserSchema, 'id'>;

@Table
export class User extends Model<UserSchema, UserAttributesCreation> {
  @Column({
    type: DataType.UUID,
    defaultValue: Sequelize.literal('uuid_generate_v4()'),
    primaryKey: true,
    allowNull: false
  })
  id: string;

  @Column email: string;

  @Column password: string;

  @Column isActivated: boolean;

  @Column activationLink: string;
}
