import { Module } from './training.entity';
import { User } from './user.entity';

// progress for papers of past 10 years
const currentYear = new Date().getFullYear();
const pastYears = [];
for (let i = 0; i < 10; i++) {
    pastYears.push((currentYear - i).toString());
}

export enum Status {
    Completed = 'Completed',
    'In Progress' = 'In Progress',
    'Not Done' = 'Not Done',
}
export const statusOptions = Object.values(Status).map((value) => ({
    value,
    label: value,
}));

export const yearOptions = pastYears.map((value) => ({
    value,
    label: value,
}));
export interface Progress {
    id: number;
    country: string;
    module: Module;
    year: string;
    status: Status;
    repository: string;
    user: User;
    review: boolean;
}
