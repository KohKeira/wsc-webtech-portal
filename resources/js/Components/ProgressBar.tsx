export default function ProgressBar({
    className = '',
    percentage,
    label,
}: {
    className: string;
    percentage: number;
    label: string;
}) {
    return (
        <>
            <div className="mb-1 flex justify-between">
                <span className="text-base font-medium text-blue-700 dark:text-white">
                    {label}
                </span>
                <span className="text-sm font-medium text-blue-700 dark:text-white">
                    {percentage}%
                </span>
            </div>
            <div className="mb-4 h-4 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                    className={'h-4 rounded-full ' + className}
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </>
    );
}
