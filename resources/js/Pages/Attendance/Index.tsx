import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Attendance } from '@/types/attendance.entity';
import { Role, User } from '@/types/user.entity';
import { Head, usePage } from '@inertiajs/react';
import React from 'react';
import LecturerAttendanceView from './Partials/LecturerAttendanceView';
import StudentAttendanceView from './Partials/StudentAttendanceView';

const Index: React.FC<{
    attendances: Attendance[];
    students: User[];
}> = ({ attendances, students }) => {
    const user = usePage().props.auth.user;
    console.log(attendances);
    return (
        <Authenticated
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Attendances
                </h2>
            }
        >
            <Head title="Training" />
            <div className="py-12">
                {user.role === Role.Student ? (
                    <StudentAttendanceView attendances={attendances} />
                ) : (
                    <LecturerAttendanceView
                        attendances={attendances}
                        students={students}
                    />
                )}
            </div>
        </Authenticated>
    );
};

export default Index;
