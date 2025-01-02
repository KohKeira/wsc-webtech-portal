import { Training } from './training.entity';
import { User } from './user.entity';

export interface Attendance {
    id: number;
    user: User;
    training: Training;
    present: boolean;
}
