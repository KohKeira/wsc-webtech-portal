import { Progress, Status, statusOptions } from '@/types/progress.entity';
import { moduleOptions } from '@/types/training.entity';
import { BarChart } from '@mui/x-charts';

const ProgressModuleView: React.FC<{ progress: Progress[] }> = ({
    progress,
}) => {
    const dataset = moduleOptions.map((module) => {
        const moduleProgress = progress.filter(
            (p) => p.module === module.value,
        );

        return {
            module: module.value,
            'Not Done': moduleProgress.reduce(
                (n, p) => (p.status === Status['Not Done'] ? n + 1 : n),
                0,
            ),
            'In Progress': moduleProgress.reduce(
                (n, p) => (p.status === Status['In Progress'] ? n + 1 : n),
                0,
            ),
            Completed: moduleProgress.reduce(
                (n, p) => (p.status === Status.Completed ? n + 1 : n),
                0,
            ),
        };
    });

    const statusColors = ['#f87171', '#facc15', '#16a34a'];
    return (
        <BarChart
            xAxis={[
                {
                    scaleType: 'band',
                    dataKey: 'module',
                },
            ]}
            series={statusOptions.map((status, i) => {
                return {
                    dataKey: status.value,
                    label: status.label,
                    color: statusColors[i],
                };
            })}
            dataset={dataset}
            height={300}
            slotProps={{
                legend: {
                    direction: 'column',
                    position: { vertical: 'top', horizontal: 'right' },
                    padding: 0,
                },
            }}
        />
    );
};
export default ProgressModuleView;
