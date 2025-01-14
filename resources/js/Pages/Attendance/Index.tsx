import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Attendance } from '@/types/attendance.entity';
import { Role } from '@/types/user.entity';
import { Head, usePage } from '@inertiajs/react';
import React from 'react';
import StudentAttendanceView from './Partials/StudentAttendanceView';

const Index: React.FC<{ attendances: Attendance[] }> = ({ attendances }) => {
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
                <div className="mx-auto flex max-w-7xl flex-col gap-6 px-2 sm:px-6 md:flex-row lg:px-8">
                    {user.role === Role.Student ? (
                        <StudentAttendanceView attendances={attendances} />
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </Authenticated>
    );
};

export default Index;
