import DashboardCard from '@/Components/DashboardCard';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Role } from '@/types/user.entity';
import { Head } from '@inertiajs/react';
import { GiProgression } from 'react-icons/gi';
import { LiaChalkboardTeacherSolid } from 'react-icons/lia';
import { MdCalendarMonth } from 'react-icons/md';
import { PiStudent } from 'react-icons/pi';

export default function Dashboard({
    auth,
    data,
}: PageProps & { data: Record<string, number> }) {
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
                <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-2 sm:px-6 md:grid-cols-4 lg:px-8">
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
                                icon={<LiaChalkboardTeacherSolid size={40} />}
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
                                icon={<LiaChalkboardTeacherSolid size={40} />}
                            />
                        </>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
