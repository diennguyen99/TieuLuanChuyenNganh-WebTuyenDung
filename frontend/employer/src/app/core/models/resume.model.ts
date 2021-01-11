import { User } from './user.model';

export interface Resume {
  id: number;
  avatar: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}
