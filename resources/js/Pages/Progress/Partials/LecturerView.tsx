import InputLabel from '@/Components/InputLabel';
import SecondaryButton from '@/Components/SecondaryButton';
import SelectInput from '@/Components/SelectInput';
import ProgressBarsView from '@/Pages/Trainings/Partials/ProgressBarsView';
import ProgressModuleView from '@/Pages/Trainings/Partials/ProgressModuleView';
import { Progress, ProgressFilters } from '@/types/progress.entity';
import { User } from '@/types/user.entity';
import { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import Filter from './Filter';

const LecturerView: React.FC<{ progress: Progress[]; students: User[] }> = ({
    progress,
    students,
}) => {
    const [filteredProgress, setFilteredProgress] =
        useState<Progress[]>(progress);

    const [toggleFilter, setToggleFilter] = useState<boolean>(
        window.innerWidth >= 768,
    );
    const [filters, setFilters] = useState<ProgressFilters & { user_id: '' }>({
        year: '',
        module: '',
        status: '',
        review: '',
        user_id: '',
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
            user_id: '',
        });
        setFilteredProgress(progress);
    };

    return (
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-2 sm:px-6 md:gap-6 lg:px-8">
            <div className="flex flex-col gap-2 md:flex-row md:gap-6">
                <div className="flex grow justify-center overflow-hidden rounded bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                    <div className="w-full p-6 text-gray-900 dark:text-gray-100">
                        <h3 className="mb-5 text-lg font-bold md:text-xl">
                            Overall Summary
                        </h3>
                        <ProgressBarsView progress={progress} />
                    </div>
                </div>
                <div className="flex grow justify-center overflow-hidden rounded bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                    <div
                        className="w-full p-6 text-gray-900 dark:text-gray-100"
                        style={{ maxWidth: '700px' }}
                    >
                        <h3 className="mb-5 text-lg font-bold md:text-xl">
                            Overall Summary by Modules
                        </h3>
                        <ProgressModuleView progress={progress} />
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-2 md:flex-row md:gap-6">
                <div
                    className="flex justify-center overflow-hidden rounded bg-white shadow-sm sm:rounded-lg dark:bg-gray-800"
                    style={{ height: 'fit-content', minWidth: 180 }}
                >
                    <div className="w-full shrink-0 p-6 text-gray-900 dark:text-gray-100">
                        <div className="flex items-center justify-between">
                            <h1 className="mb-2 text-xl font-bold">Filters</h1>
                            {toggleFilter ? (
                                <IoIosArrowUp
                                    size={20}
                                    onClick={() =>
                                        setToggleFilter((prev) => !prev)
                                    }
                                />
                            ) : (
                                <IoIosArrowDown
                                    size={20}
                                    onClick={() =>
                                        setToggleFilter((prev) => !prev)
                                    }
                                />
                            )}
                        </div>
                        {toggleFilter && (
                            <Filter
                                filters={filters}
                                handleChange={handleFilterChange}
                                resetFilters={resetFilters}
                            />
                        )}
                    </div>
                </div>
                <div className="grow overflow-hidden rounded bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        <div>
                            <InputLabel htmlFor="student" value="Students" />
                            <SelectInput
                                id="student"
                                name="user_id"
                                className="w-full"
                                value={filters.user_id}
                                options={[
                                    { label: 'All', value: '' },
                                    ...students.map((student) => ({
                                        label: student.name,
                                        value: student.id.toString(),
                                    })),
                                ]}
                                onChange={handleFilterChange}
                                required
                            />
                        </div>
                        {filteredProgress.length === 0 ? (
                            <p className="my-4">No progress yet.</p>
                        ) : (
                            <>
                                {' '}
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
                                                >
                                                    Student
                                                </th>
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
                                                                href={
                                                                    p.repository
                                                                }
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
                                                        {p.user.name}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default LecturerView;
