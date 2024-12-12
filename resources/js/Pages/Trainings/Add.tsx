import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import RadioButton from '@/Components/RadioButton';
import TextArea from '@/Components/TextArea';
import TextInput from '@/Components/TextInput';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Mode, Training } from '@/types/training.entity';
import { Head, useForm } from '@inertiajs/react';
import React, { FormEventHandler, useState } from 'react';

const Index: React.FC = () => {
    const { data, setData, errors, processing, post } = useForm<
        Partial<Training>
    >({
        title: '',
        description: '',
        mode: Mode.Virtual,
        venue: 'MsTeams',
        date: undefined,
        start_time: '',
        end_time: '',
    });
    const [physicalVenue, setPhysicalVenue] = useState('');

    const calculateMinEndTime = (startTime: string): string => {
        // Minimum end time is 15 minutes after the start time
        const [startHours, startMinutes] = startTime.split(':').map(Number);
        const startDate = new Date();
        startDate.setHours(startHours, startMinutes);
        startDate.setMinutes(startDate.getMinutes() + 15);

        const minEndHours = String(startDate.getHours()).padStart(2, '0');
        const minEndMinutes = String(startDate.getMinutes()).padStart(2, '0');
        return `${minEndHours}:${minEndMinutes}`;
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('trainings.store'));
    };

    return (
        <Authenticated
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Add Training
                </h2>
            }
        >
            <Head title="Add Training" />
            <div className="mx-auto max-w-lg sm:p-6 lg:p-8">
                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <InputLabel htmlFor="title" value="Title" />
                        <TextInput
                            id="title"
                            className="w-full"
                            value={data.title}
                            maxLength={255}
                            onChange={(e) => setData('title', e.target.value)}
                            required
                        />
                        <InputError message={errors.title} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="description" value="Description" />
                        <TextArea
                            id="description"
                            className="w-full"
                            value={data.description}
                            maxLength={2000}
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                            required
                        />
                        <InputError
                            message={errors.description}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <div className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Mode
                        </div>
                        <div
                            className="grid grid-cols-2 gap-x-2"
                            id="modeRadioButtonGroup"
                        >
                            <RadioButton
                                id="virtualRadioButton"
                                value="virtual"
                                label="Virtual"
                                name="mode"
                                checked={data.mode === Mode.Virtual}
                                onChange={(e) => {
                                    setData('venue', 'MsTeams');
                                    setData((prevData) => ({
                                        ...prevData,
                                        mode: e.target.value as Mode,
                                        venue: 'MsTeams',
                                    }));
                                }}
                                required
                            />
                            <RadioButton
                                id="physicalRadioButton"
                                value="physical"
                                label="Physical"
                                name="mode"
                                checked={data.mode === Mode.Physical}
                                onChange={(e) => {
                                    setData((prevData) => ({
                                        ...prevData,
                                        mode: e.target.value as Mode,
                                        venue: physicalVenue,
                                    }));
                                }}
                                required
                            />
                        </div>
                        <InputError message={errors.mode} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="venue" value="Venue" />
                        <TextInput
                            id="venue"
                            className="w-full"
                            value={data.venue}
                            readOnly={data.mode === Mode.Virtual}
                            onChange={(e) => {
                                setPhysicalVenue(e.target.value);
                                setData('venue', e.target.value);
                            }}
                            required
                        />
                        <InputError message={errors.venue} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="date" value="Date" />
                        <TextInput
                            id="date"
                            type="date"
                            className="w-full"
                            value={
                                data.date
                                    ? data.date.toISOString().split('T')[0]
                                    : ''
                            }
                            min={new Date().toISOString().split('T')[0]}
                            onChange={(e) =>
                                setData('date', new Date(e.target.value))
                            }
                            required
                        />
                        <InputError message={errors.date} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="start_time" value="Start Time" />
                        <TextInput
                            id="start_time"
                            type="time"
                            className="w-full"
                            value={data.start_time}
                            min={'09:00'}
                            max={'18:00'}
                            step={'900'} // 15 minutes
                            onChange={(e) =>
                                setData('start_time', e.target.value)
                            }
                            required
                        />
                        <InputError
                            message={errors.start_time}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="end_time" value="End Time" />
                        <TextInput
                            id="end_time"
                            type="time"
                            className="w-full"
                            value={data.end_time}
                            min={
                                data.start_time
                                    ? calculateMinEndTime(data.start_time)
                                    : '09:15'
                            }
                            max={'18:00'}
                            step={'900'} // 15 minutes
                            onChange={(e) =>
                                setData('end_time', e.target.value)
                            }
                            required
                        />
                        <InputError
                            message={errors.end_time}
                            className="mt-2"
                        />
                    </div>

                    <div className="flex justify-end">
                        <PrimaryButton className="" disabled={processing}>
                            Add
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </Authenticated>
    );
};
export default Index;
