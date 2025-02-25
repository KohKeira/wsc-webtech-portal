import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Progress } from '@/types/progress.entity';
import { Role, User } from '@/types/user.entity';
import { Head, usePage } from '@inertiajs/react';
import React from 'react';
import LecturerView from './Partials/LecturerView';
import StudentView from './Partials/StudentView';

const Index: React.FC<{ progress: Progress[]; students: User[] }> = ({
    progress,
    students,
}) => {
    const user = usePage().props.auth.user;
    return (
        <Authenticated
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Progress
                </h2>
            }
        >
            <Head title="Training" />
            <div className="py-12">
                {user.role === Role.Student ? (
                    <StudentView progress={progress} />
                ) : (
                    <LecturerView progress={progress} students={students} />
                )}
            </div>
        </Authenticated>
    );
};

export default Index;
