import { User } from './user.entity';

export interface Task {
    id: number;
    user: User;
    title: string;
}
