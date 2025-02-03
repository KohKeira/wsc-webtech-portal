import DashboardCard from '@/Components/DashboardCard';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Task } from '@/types/task.entity';
import { Training } from '@/types/training.entity';
import { Role } from '@/types/user.entity';
import { Head } from '@inertiajs/react';
import moment from 'moment';
import { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { GiProgression } from 'react-icons/gi';
import { LiaChalkboardTeacherSolid } from 'react-icons/lia';
import { MdCalendarMonth } from 'react-icons/md';
import { PiStudent } from 'react-icons/pi';
import TrainingModal from '../Trainings/Partials/TrainingModal';
import Index from './Tasks/Index';

const localizer = momentLocalizer(moment);

export default function Dashboard({
    auth,
    trainings,
    data,
    tasks,
}: PageProps & {
    data: Record<string, number>;
    trainings: Training[];
    tasks: Task[];
}) {
    const [selectedTraining, setSelectedTraining] = useState<Training | null>(
        null,
    );
    const startTime = new Date();
    startTime.setHours(8, 30, 0, 0);

    const endTime = new Date();
    endTime.setHours(19, 30, 0, 0);

    const trainingData = trainings.map((t) => {
        const startDateTime = `${t.date}T${t.start_time}`;
        const endDateTime = `${t.date}T${t.end_time}`;

        // Convert to Date objects
        const startDate = new Date(startDateTime);
        const endDate = new Date(endDateTime);

        return { title: t.title, start: startDate, end: endDate, id: t.id };
    });
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {auth.user.role === Role.Student ? (
                            <>
                                <DashboardCard
                                    link="progresses.index"
                                    percentage={data['progress'] ?? 0}
                                    label="Progress Completed"
                                    icon={<GiProgression size={40} />}
                                />
                                <DashboardCard
                                    link="attendances.index"
                                    percentage={data['attendance'] ?? 0}
                                    label="Attendance Rate"
                                    icon={<MdCalendarMonth size={40} />}
                                />
                                <DashboardCard
                                    link="trainings.index"
                                    number={data['initiatedTraining'] ?? 0}
                                    label="Initiated Trainings"
                                    icon={<PiStudent size={40} />}
                                />
                                <DashboardCard
                                    link="trainings.index"
                                    number={data['trainingCompleted'] ?? 0}
                                    label="Trainings Attended"
                                    icon={
                                        <LiaChalkboardTeacherSolid size={40} />
                                    }
                                />
                            </>
                        ) : (
                            <>
                                <DashboardCard
                                    link="progresses.index"
                                    percentage={data['progress'] ?? 0}
                                    label="Student Progress"
                                    icon={<GiProgression size={40} />}
                                />
                                <DashboardCard
                                    link="users.index"
                                    number={data['students'] ?? 0}
                                    label="Students"
                                    icon={<PiStudent size={40} />}
                                />
                                <DashboardCard
                                    link="attendances.index"
                                    percentage={data['attendance'] ?? 0}
                                    label="Student Attendance"
                                    icon={<MdCalendarMonth size={40} />}
                                />
                                <DashboardCard
                                    link="trainings.index"
                                    number={data['trainingCompleted'] ?? 0}
                                    label="Trainings Completed"
                                    icon={
                                        <LiaChalkboardTeacherSolid size={40} />
                                    }
                                />
                            </>
                        )}
                    </div>
                    <div className="my-4 flex w-full flex-col gap-4 md:flex-row">
                        <div className="flex grow overflow-x-auto bg-white shadow-sm sm:rounded-lg md:justify-center dark:bg-gray-800">
                            <div
                                className="w-full max-w-3xl p-4 md:p-6"
                                style={{
                                    minWidth: 500,
                                }}
                            >
                                <Calendar
                                    localizer={localizer}
                                    events={trainingData}
                                    onSelectEvent={(event) => {
                                        const training =
                                            trainings.find(
                                                (t) => t.id === event.id,
                                            ) ?? null;
                                        setSelectedTraining(training);
                                    }}
                                    startAccessor="start"
                                    endAccessor="end"
                                    min={startTime}
                                    max={endTime}
                                    style={{
                                        height: 500,
                                        width: '100%', // Ensures the calendar respects its parent's width
                                    }}
                                />
                            </div>
                        </div>
                        <Index tasks={tasks} />
                    </div>
                </div>
                {selectedTraining && (
                    <TrainingModal
                        training={selectedTraining}
                        onClose={() => setSelectedTraining(null)}
                    />
                )}
            </div>
        </AuthenticatedLayout>
    );
}
