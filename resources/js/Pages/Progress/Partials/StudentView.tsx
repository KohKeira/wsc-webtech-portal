import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import SuccessAlert from '@/Components/SuccessAlert';
import { Progress, ProgressFilters } from '@/types/progress.entity';
import { Link, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Filter from './Filter';

const StudentView: React.FC<{ progress: Progress[] }> = ({ progress }) => {
    const { auth, flash } = usePage().props;
    const [filteredProgress, setFilteredProgress] =
        useState<Progress[]>(progress);

    const [filters, setFilters] = useState<ProgressFilters>({
        year: '',
        module: '',
        status: '',
        review: '',
    });
    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        const updatedFilters = { ...filters, [name]: value };
        setFilters(updatedFilters);
        let filtered = progress;
        for (const [key, value] of Object.entries(updatedFilters)) {
            if (value === '') continue;
            filtered = filtered.filter(
                (item) => item[key as keyof Progress] == value,
            );
        }
        setFilteredProgress(filtered);
    };
    const resetFilters = () => {
        setFilters({
            year: '',
            module: '',
            status: '',
            review: '',
        });
        setFilteredProgress(progress);
    };
    useEffect(() => {
        setFilteredProgress(progress);
    }, [progress]);

    const { delete: destroy } = useForm();
    const deleteProgress = (id: number) => {
        if (confirm('Do you want to delete this?')) {
            destroy(route('progresses.destroy', { progress: id }));
        }
    };
    return (
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            {flash?.message && <SuccessAlert>{flash.message}</SuccessAlert>}
            <Link href={route('users.progresses.create', [auth.user.id])}>
                <PrimaryButton>Add Progress</PrimaryButton>
            </Link>
            <div className="mt-6 flex flex-col gap-2 md:flex-row md:gap-6">
                <div
                    className="flex justify-center overflow-hidden rounded bg-white shadow-sm sm:rounded-lg dark:bg-gray-800"
                    style={{ height: 'fit-content', minWidth: 180 }}
                >
                    <div className="w-full shrink-0 p-6 text-gray-900 dark:text-gray-100">
                        <Filter
                            filters={filters}
                            handleChange={handleFilterChange}
                            resetFilters={resetFilters}
                        />
                    </div>
                </div>
                <div className="grow overflow-hidden rounded bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        {filteredProgress.length === 0 ? (
                            <p>No progress yet.</p>
                        ) : (
                            <div className="relative my-4 overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-full text-left text-gray-700 rtl:text-right dark:text-gray-400">
                                    <thead className="bg-gray-200 text-sm uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Year
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Country
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Module
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Complete Status
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Needs Review
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                GitHub Repository
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            ></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredProgress.map((p) => (
                                            <tr
                                                key={p.id}
                                                className="border-b odd:bg-white even:bg-gray-100 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800"
                                            >
                                                <th
                                                    scope="row"
                                                    className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                                                >
                                                    {p.year}
                                                </th>
                                                <td className="px-6 py-4">
                                                    {p.country}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {p.module}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {p.status}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {p.review
                                                        ? 'True'
                                                        : 'False'}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {p.repository ? (
                                                        <a
                                                            href={p.repository}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                        >
                                                            <SecondaryButton className="bg-green-300 hover:bg-green-100">
                                                                View
                                                            </SecondaryButton>
                                                        </a>
                                                    ) : (
                                                        '-'
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Link
                                                        href={route(
                                                            'progresses.edit',
                                                            {
                                                                progress: p,
                                                            },
                                                        )}
                                                    >
                                                        <SecondaryButton className="mr-2 bg-amber-400 hover:bg-yellow-200 md:mb-1">
                                                            Edit
                                                        </SecondaryButton>
                                                    </Link>
                                                    <SecondaryButton
                                                        className="bg-red-400 hover:bg-red-200"
                                                        onClick={() =>
                                                            deleteProgress(p.id)
                                                        }
                                                    >
                                                        Delete
                                                    </SecondaryButton>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default StudentView;
