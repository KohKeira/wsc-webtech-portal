import SecondaryButton from '@/Components/SecondaryButton';
import { Training } from '@/types/training.entity';
import { Role } from '@/types/user.entity';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import TrainingModal from './TrainingModal';

const StudentTrainingTable: React.FC<{ trainings: Training[] }> = ({
    trainings,
}) => {
    const user = usePage().props.auth.user;
    const [selectedTraining, setSelectedTraining] = useState<Training | null>(
        null,
    );

    return (
        <div className="relative my-4 overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-left text-gray-700 rtl:text-right dark:text-gray-400">
                <thead className="bg-gray-200 text-sm uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Title
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Time
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Student
                        </th>{' '}
                        <th scope="col" className="px-6 py-3">
                            Module
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Mode
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Location
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Remarks
                        </th>
                        {user.role === Role.Student && (
                            <th scope="col" className="px-6 py-3"></th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {trainings.map((t) => (
                        <tr
                            key={t.id}
                            className="border-b odd:bg-white even:bg-gray-100 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800"
                        >
                            <th
                                scope="row"
                                className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                            >
                                {t.title}
                            </th>
                            <td className="px-6 py-4">
                                {t.start_time.slice(0, 5)} -{' '}
                                {t.end_time.slice(0, 5)}
                            </td>
                            <td className="px-6 py-4">
                                {new Date(t.date).toLocaleDateString('en-GB')}
                            </td>
                            <td className="px-6 py-4">{t.user.name}</td>
                            <td className="px-6 py-3">{t.module}</td>
                            <td className="px-6 py-3">{t.mode}</td>
                            <td className="px-6 py-3">{t.venue}</td>
                            <td className="px-6 py-3">{t.description}</td>
                            {user.role === Role.Student && (
                                <td className="px-6 py-3">
                                    {user.id === t.user.id ? (
                                        <>
                                            {' '}
                                            <Link
                                                href={route('trainings.edit', {
                                                    training: t.id,
                                                })}
                                            >
                                                <SecondaryButton className="mr-2 bg-amber-400 hover:bg-yellow-200 md:mb-1">
                                                    Edit
                                                </SecondaryButton>
                                            </Link>
                                            <SecondaryButton className="bg-red-400 hover:bg-red-200">
                                                Delete
                                            </SecondaryButton>
                                        </>
                                    ) : (
                                        <p>-</p>
                                    )}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedTraining && (
                <TrainingModal
                    training={selectedTraining}
                    onClose={() => setSelectedTraining(null)}
                />
            )}
        </div>
    );
};
export default StudentTrainingTable;
