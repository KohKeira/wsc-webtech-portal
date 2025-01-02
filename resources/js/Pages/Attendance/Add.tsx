import Checkbox from '@/Components/Checkbox';
import PrimaryButton from '@/Components/PrimaryButton';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Attendance } from '@/types/attendance.entity';
import { Training } from '@/types/training.entity';
import { User } from '@/types/user.entity';
import { Head, useForm } from '@inertiajs/react';
import React, { FormEventHandler } from 'react';

const Add: React.FC<{ students: User[]; training: Training }> = ({
    students,
    training,
}) => {
    const { data, setData, processing, post } = useForm<{
        attendance: Partial<Attendance>[];
    }>({
        attendance: students.map((s) => ({
            user: s,
            present: false,
        })),
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log(data);
        post(route('attendances.store', { training: training.id }));
    };

    return (
        <Authenticated
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Training Attendance
                </h2>
            }
        >
            <Head title="Training Attendance" />
            <div className="mx-auto flex max-w-7xl flex-col gap-8 p-4 sm:p-6 md:flex-row lg:p-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        <div className="space-y-2 p-2 md:p-4">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {training.title}
                            </h3>
                            <p className="text-base leading-relaxed text-gray-800 dark:text-gray-400">
                                Description: {training.description}
                            </p>
                            <p className="text-base leading-relaxed text-gray-800 dark:text-gray-400">
                                Mode: {training.mode}
                            </p>
                            <p className="text-base leading-relaxed text-gray-800 dark:text-gray-400">
                                Module: {training.module}
                            </p>
                            <p className="text-base leading-relaxed text-gray-800 dark:text-gray-400">
                                Venue: {training.venue}
                            </p>
                            <p className="text-base leading-relaxed text-gray-800 dark:text-gray-400">
                                Date:{' '}
                                {new Date(training.date).toLocaleDateString(
                                    'en-GB',
                                )}
                            </p>
                            <p className="text-base leading-relaxed text-gray-800 dark:text-gray-400">
                                Time: {training.start_time.slice(0, 5)} -{' '}
                                {training.end_time.slice(0, 5)}
                            </p>
                        </div>
                    </div>
                </div>
                <form onSubmit={submit} className="flex-1 space-y-4">
                    <table className="w-full text-left text-gray-700 rtl:text-right dark:text-gray-400">
                        <thead className="bg-gray-200 text-sm uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Student
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Present
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.attendance.map((s) => (
                                <tr
                                    key={s.user!.id}
                                    className="border-b odd:bg-white even:bg-gray-100 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800"
                                >
                                    <th
                                        scope="row"
                                        className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                                    >
                                        {s.user!.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        <Checkbox
                                            onChange={() =>
                                                setData(
                                                    'attendance',
                                                    data.attendance.map(
                                                        (current) =>
                                                            current.user!.id ===
                                                            s.user!.id
                                                                ? {
                                                                      ...current,
                                                                      present:
                                                                          !current.present,
                                                                  }
                                                                : current,
                                                    ),
                                                )
                                            }
                                            checked={s.present}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-end">
                        <PrimaryButton className="" disabled={processing}>
                            Save
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </Authenticated>
    );
};
export default Add;
