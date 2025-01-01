import PrimaryButton from '@/Components/PrimaryButton';
import SuccessAlert from '@/Components/SuccessAlert';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Training } from '@/types/training.entity';
import { Head, Link } from '@inertiajs/react';
import React from 'react';
import ComplusoryTrainingTable from './Partials/ComplusoryTrainingTable';

const Index: React.FC<
    PageProps & {
        lecturerTrainings: Training[];
        studentTrainings: Training[];
    }
> = ({ flash, lecturerTrainings }) => {
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
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {flash?.message && (
                        <SuccessAlert>{flash.message}</SuccessAlert>
                    )}
                    {
                        <Link href={route('trainings.create')}>
                            <PrimaryButton>Add Training</PrimaryButton>
                        </Link>
                    }
                    <h3 className="mt-6 text-2xl font-bold">Complusory</h3>
                    <ComplusoryTrainingTable trainings={lecturerTrainings} />
                </div>
            </div>
        </Authenticated>
    );
};

export default Index;
