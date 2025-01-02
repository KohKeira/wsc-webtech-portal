import { Training } from '@/types/training.entity';

const TrainingModal: React.FC<{ training: Training; onClose: () => void }> = ({
    training,
    onClose,
}) => {
    return (
        <div
            id="information-modal"
            tabIndex={-1}
            className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-50/75 md:inset-0"
        >
            <div className="relative max-h-full w-full max-w-2xl p-4">
                <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between rounded-t border-b p-4 md:p-5 dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {training.title}
                        </h3>
                        <button
                            type="button"
                            onClick={onClose}
                            className="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            <svg
                                className="h-3 w-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="space-y-4 p-4 md:p-5">
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
                        <p className="text-base leading-relaxed text-gray-800 dark:text-gray-400">
                            Lecturer: {training.user.name}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default TrainingModal;
