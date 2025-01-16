import PrimaryButton from '@/Components/PrimaryButton';
import SuccessAlert from '@/Components/SuccessAlert';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Role } from '@/types/user.entity';
import { Head, Link } from '@inertiajs/react';
import React from 'react';

const Index: React.FC<PageProps> = ({ flash, auth }) => {
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
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {flash?.message && (
                        <SuccessAlert>{flash.message}</SuccessAlert>
                    )}
                    {auth.user.role === Role.Student && (
                        <Link
                            href={route('users.progresses.create', [auth.user])}
                        >
                            <PrimaryButton>Add Progress</PrimaryButton>
                        </Link>
                    )}
                </div>
            </div>
        </Authenticated>
    );
};

export default Index;
