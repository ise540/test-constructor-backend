export type UserSchema = {
  id: string;
  email: string;
  password: string;
  isActivated: boolean;
  activationLink: string;
};
