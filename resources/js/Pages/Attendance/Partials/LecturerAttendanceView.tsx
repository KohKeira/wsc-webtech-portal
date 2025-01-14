import InputLabel from '@/Components/InputLabel';
import SecondaryButton from '@/Components/SecondaryButton';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import TrainingModal from '@/Pages/Trainings/Partials/TrainingModal';
import { Attendance } from '@/types/attendance.entity';
import { Training } from '@/types/training.entity';
import { User } from '@/types/user.entity';
import { useState } from 'react';
import {
    buildStyles,
    CircularProgressbarWithChildren,
} from 'react-circular-progressbar';

const LecturerAttendanceView: React.FC<{
    attendances: Attendance[];
    students: User[];
}> = ({ attendances, students }) => {
    const [selectedTraining, setSelectedTraining] = useState<Training | null>(
        null,
    );
    const [selectedValue, setSelectedValue] = useState<string>('');
    const [filteredAttendance, setFilteredAttendance] =
        useState<Attendance[]>(attendances);

    const handleChange = (
        e:
            | React.ChangeEvent<HTMLSelectElement>
            | React.ChangeEvent<HTMLInputElement>,
    ) => {
        const value = e.target.value;
        setSelectedValue(value);
        let filtered: Attendance[] = attendances;
        if (value !== '') {
            if (trainingMode) {
                console.log(value);
                filtered = filtered.filter((a) => {
                    return (
                        new Date(a.training.date).toDateString() ===
                        new Date(value).toDateString()
                    );
                });
            } else {
                filtered = filtered.filter(
                    (a) => a.user.id.toString() === value,
                );
            }
        }

        setFilteredAttendance(filtered);
    };
    const [trainingMode, setTrainingMode] = useState<boolean>(true);

    const toggleMode = () => {
        setFilteredAttendance(attendances);
        setTrainingMode((prev) => !prev);
    };
    const percentage = filteredAttendance.length
        ? (filteredAttendance.filter((a) => a.present).length /
              filteredAttendance.length) *
          100
        : 0;

    return (
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-2 sm:px-6 lg:px-8">
            <ul
                className={
                    'flex flex-wrap text-center text-sm font-medium text-gray-500 dark:text-gray-400'
                }
                id="default-tab"
                data-tabs-toggle="#default-tab-content"
                role="tablist"
            >
                <li className="me-2" role="presentation">
                    <button
                        className={`inline-block rounded-lg px-4 py-3 ${
                            trainingMode
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-400 hover:text-black dark:hover:text-black'
                        }`}
                        type="button"
                        role="tab"
                        onClick={toggleMode}
                    >
                        Training
                    </button>
                </li>
                <li className="me-2" role="presentation">
                    <button
                        className={`inline-block rounded-lg px-4 py-3 ${
                            !trainingMode
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-400 hover:text-black dark:hover:text-black'
                        }`}
                        type="button"
                        role="tab"
                        onClick={toggleMode}
                    >
                        Student
                    </button>
                </li>
            </ul>
            <div className="flex flex-col gap-6 md:flex-row">
                <div
                    className="overflow-hidden rounded bg-white shadow-sm sm:rounded-lg dark:bg-gray-800"
                    style={{ height: 'fit-content' }}
                >
                    <div
                        className="p-6 text-gray-900 dark:text-gray-100"
                        style={{ width: 180 }}
                    >
                        <h3 className="mb-5 text-center text-xl font-bold">
                            Summary
                        </h3>
                        <CircularProgressbarWithChildren
                            value={percentage}
                            strokeWidth={10}
                            styles={buildStyles({
                                pathColor: `rgba(10, 204, 255, ${percentage / 100})`,
                                textColor: '#000',
                                trailColor: '#d6d6d6',
                                strokeLinecap: 'round',
                            })}
                        >
                            <div className="text-2xl font-bold">
                                <strong>{percentage}%</strong>
                            </div>
                        </CircularProgressbarWithChildren>
                    </div>
                </div>
                <div className="grow overflow-hidden rounded bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        {trainingMode ? (
                            <>
                                <InputLabel
                                    htmlFor="training"
                                    value="Training"
                                />
                                <TextInput
                                    id="training"
                                    type="date"
                                    className="mt-2 w-full"
                                    value={selectedValue}
                                    maxLength={255}
                                    onChange={handleChange}
                                    required
                                />{' '}
                            </>
                        ) : (
                            <>
                                <InputLabel htmlFor="student" value="Student" />
                                <SelectInput
                                    id="student"
                                    className="mt-2 w-full"
                                    value={selectedValue}
                                    options={[
                                        { label: 'All', value: '' },
                                        ...students.map((student) => ({
                                            label: student.name,
                                            value: student.id.toString(),
                                        })),
                                    ]}
                                    onChange={handleChange}
                                    required
                                />
                            </>
                        )}

                        <div className="relative my-4 overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-left text-gray-700 rtl:text-right dark:text-gray-400">
                                <thead className="bg-gray-200 text-sm uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Training
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Date
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Lecturer
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Attendance
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            More Details
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Student
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredAttendance.map((a) => (
                                        <tr
                                            key={a.id}
                                            className="border-b odd:bg-white even:bg-gray-100 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800"
                                        >
                                            <th
                                                scope="row"
                                                className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                                            >
                                                {a.training.title}
                                            </th>
                                            <td className="px-6 py-4">
                                                {new Date(
                                                    a.training.date,
                                                ).toLocaleDateString('en-GB')}
                                            </td>
                                            <td className="px-6 py-4">
                                                {a.training.user.name}
                                            </td>
                                            <td
                                                className={
                                                    'px-6 py-4 ' +
                                                    (!a.present
                                                        ? 'text-red-400'
                                                        : '')
                                                }
                                            >
                                                {a.present
                                                    ? 'Present'
                                                    : 'Absent'}
                                            </td>
                                            <td className="px-6 py-3">
                                                <SecondaryButton
                                                    className="bg-green-300 hover:bg-green-100"
                                                    onClick={() =>
                                                        setSelectedTraining(
                                                            a.training,
                                                        )
                                                    }
                                                >
                                                    View
                                                </SecondaryButton>
                                            </td>
                                            <td className="px-6 py-4">
                                                {a.user.name}
                                            </td>
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
                    </div>
                </div>
            </div>
        </div>
    );
};
export default LecturerAttendanceView;
