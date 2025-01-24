import { Link } from '@inertiajs/react';
import { FaArrowRight } from 'react-icons/fa';

const DashboardCard: React.FC<{
    icon: React.ReactNode;
    percentage?: number;
    number?: number;
    label: string;
    link: string;
}> = ({ icon, percentage, number, label, link }) => {
    return (
        <Link href={route(link)}>
            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                <div className="flex items-center gap-4 p-6 text-gray-900 dark:text-gray-100">
                    <div>{icon}</div>
                    <div className="grow">
                        {(percentage || percentage === 0) && (
                            <h3 className="text-2xl font-bold">
                                {percentage}%
                            </h3>
                        )}
                        {(number || number === 0) && (
                            <h3 className="text-2xl font-bold">{number}</h3>
                        )}
                        {label}
                    </div>
                    <div>
                        <FaArrowRight size={20} />
                    </div>
                </div>
            </div>
        </Link>
    );
};
export default DashboardCard;
