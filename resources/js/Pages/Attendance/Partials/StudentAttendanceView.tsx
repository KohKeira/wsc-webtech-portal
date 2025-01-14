import SecondaryButton from '@/Components/SecondaryButton';
import TrainingModal from '@/Pages/Trainings/Partials/TrainingModal';
import { Attendance } from '@/types/attendance.entity';
import { Training } from '@/types/training.entity';
import { useState } from 'react';
import {
    buildStyles,
    CircularProgressbarWithChildren,
} from 'react-circular-progressbar';

const StudentAttendanceView: React.FC<{ attendances: Attendance[] }> = ({
    attendances,
}) => {
    const [selectedTraining, setSelectedTraining] = useState<Training | null>(
        null,
    );
    const percentage = attendances.length
        ? (attendances.filter((a) => a.present).length / attendances.length) *
          100
        : 0;

    return (
        <>
            <div className="overflow-hidden rounded bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                <div
                    className="p-6 text-gray-900 dark:text-gray-100"
                    style={{ width: 180, height: 'fit-content' }}
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
                                </tr>
                            </thead>
                            <tbody>
                                {attendances.map((a) => (
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
                                            {a.present ? 'Present' : 'Absent'}
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
        </>
    );
};
export default StudentAttendanceView;
