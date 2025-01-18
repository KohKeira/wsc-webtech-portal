import ProgressBar from '@/Components/ProgressBar';
import { Progress, Status } from '@/types/progress.entity';

const ProgressBarsView: React.FC<{ progress: Progress[] }> = ({ progress }) => {
    const notDonePercentage =
        (progress.reduce(
            (n, p) => (p.status === Status['Not Done'] ? n + 1 : n),
            0,
        ) /
            progress.length) *
        100;
    const inProgressPercentage =
        (progress.reduce(
            (n, p) => (p.status === Status['In Progress'] ? n + 1 : n),
            0,
        ) /
            progress.length) *
        100;
    const completedPercentage =
        (progress.reduce(
            (n, p) => (p.status === Status.Completed ? n + 1 : n),
            0,
        ) /
            progress.length) *
        100;

    return (
        <>
            <ProgressBar
                label="Not Done"
                percentage={notDonePercentage}
                className="bg-red-400"
            />
            <ProgressBar
                label="In Progress"
                percentage={inProgressPercentage}
                className="bg-yellow-400"
            />
            <ProgressBar
                label="Completed"
                percentage={completedPercentage}
                className="bg-green-600"
            />
        </>
    );
};
export default ProgressBarsView;
