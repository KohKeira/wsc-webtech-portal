import PrimaryButton from '@/Components/PrimaryButton';
import SuccessAlert from '@/Components/SuccessAlert';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Training } from '@/types/training.entity';
import { Head, Link } from '@inertiajs/react';
import React from 'react';
import ComplusoryTrainingTable from './Partials/ComplusoryTrainingTable';
import StudentTrainingTable from './Partials/StudentTrainingTable';

const Index: React.FC<
    PageProps & {
        lecturerTrainings: (Training & { attendance_exist: boolean })[];
        studentTrainings: Training[];
    }
> = ({ flash, lecturerTrainings, studentTrainings }) => {
    return (
        <Authenticated
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Trainings
                </h2>
            }
        >
            <Head title="Training" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    {flash?.message && (
                        <SuccessAlert>{flash.message}</SuccessAlert>
                    )}
                    {
                        <Link href={route('trainings.create')}>
                            <PrimaryButton>Add Training</PrimaryButton>
                        </Link>
                    }
                    <h3 className="mt-6 text-2xl font-bold">Complusory</h3>
                    {lecturerTrainings.length > 0 ? (
                        <ComplusoryTrainingTable
                            trainings={lecturerTrainings}
                        />
                    ) : (
                        <div className="mt-6">No Trainings.</div>
                    )}
                    <h3 className="mt-10 text-2xl font-bold">
                        Student-Initiated
                    </h3>
                    {studentTrainings.length > 0 ? (
                        <StudentTrainingTable trainings={studentTrainings} />
                    ) : (
                        <div className="mt-6">No Trainings.</div>
                    )}
                </div>
            </div>
        </Authenticated>
    );
};

export default Index;
