import InputLabel from '@/Components/InputLabel';
import SecondaryButton from '@/Components/SecondaryButton';
import SelectInput from '@/Components/SelectInput';
import {
    ProgressFilters,
    statusOptions,
    yearOptions,
} from '@/types/progress.entity';
import { moduleOptions } from '@/types/training.entity';

const Filter: React.FC<{
    filters: ProgressFilters;
    handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    resetFilters: () => void;
}> = ({ filters, handleChange, resetFilters }) => {
    return (
        <div className="flex w-full flex-col gap-3">
            <div>
                <InputLabel htmlFor="year" value="Year" />
                <SelectInput
                    id="year"
                    name="year"
                    className="w-full"
                    value={filters.year}
                    options={[{ label: 'All', value: '' }, ...yearOptions]}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <InputLabel htmlFor="module" value="Module" />
                <SelectInput
                    id="module"
                    name="module"
                    className="w-full"
                    value={filters.module}
                    options={[{ label: 'All', value: '' }, ...moduleOptions]}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <InputLabel htmlFor="status" value="Status" />
                <SelectInput
                    id="status"
                    name="status"
                    className="w-full"
                    value={filters.status}
                    options={[{ label: 'All', value: '' }, ...statusOptions]}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <InputLabel htmlFor="review" value="Review" />
                <SelectInput
                    id="review"
                    name="review"
                    className="w-full"
                    value={filters.review}
                    options={[
                        { label: 'All', value: '' },
                        { label: 'True', value: '1' },
                        { label: 'False', value: '0' },
                    ]}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <SecondaryButton
                    className="bg-blue-300 hover:bg-blue-100"
                    onClick={resetFilters}
                >
                    Reset
                </SecondaryButton>
            </div>
        </div>
    );
};
export default Filter;
