import { Column, Model, Table, Sequelize, DataType, HasMany } from 'sequelize-typescript';
import type { Optional } from 'sequelize/types';
import type { UserSchema } from '../types/UserSchema';
import { Test } from './Test';

type UserAttributesCreation = Optional<UserSchema, 'id' | 'resetPassLink'>;

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

  @Column({ defaultValue: null,
    type: DataType.STRING, })
  resetPassLink: string | null;

  @HasMany(() => Test)
  tests: Test[];
}
