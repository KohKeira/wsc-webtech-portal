import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import RadioButton from '@/Components/RadioButton';
import SelectInput from '@/Components/SelectInput';
import TextArea from '@/Components/TextArea';
import TextInput from '@/Components/TextInput';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Mode, Module, moduleOptions, Training } from '@/types/training.entity';
import { Role } from '@/types/user.entity';
import { Head, useForm, usePage } from '@inertiajs/react';
import React, { FormEventHandler, useState } from 'react';

const Edit: React.FC<{ training: Training }> = ({ training }) => {
    const { auth } = usePage().props;
    const { data, setData, errors, processing, post } = useForm<
        Partial<Training> & { _method: string }
    >({
        title: training.title,
        description: training.description,
        mode: training.mode,
        module: training.module,
        venue: training.venue,
        date: new Date(training.date),
        start_time: training.start_time.slice(0, 5),
        end_time: training.end_time.slice(0, 5),
        _method: 'put',
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
        post(route('trainings.update', { training: training.id }));
    };

    return (
        <Authenticated
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Edit Training
                </h2>
            }
        >
            <Head title="Edit Training" />
            <div className="mx-auto max-w-lg sm:p-6 lg:p-8">
                <form onSubmit={submit} className="space-y-4">
                    <div className="flex space-x-3">
                        <div className="flex-1">
                            <InputLabel htmlFor="title" value="Title" />
                            <TextInput
                                id="title"
                                className="w-full"
                                value={data.title}
                                maxLength={255}
                                onChange={(e) =>
                                    setData('title', e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.title}
                                className="mt-2"
                            />
                        </div>

                        <div className="w-auto min-w-14">
                            <InputLabel htmlFor="module" value="Module" />
                            <SelectInput
                                id="module"
                                className="w-full"
                                value={data.module}
                                options={moduleOptions}
                                onChange={(e) =>
                                    setData('module', e.target.value as Module)
                                }
                                required
                            />
                            <InputError
                                message={errors.module}
                                className="mt-2"
                            />
                        </div>
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
                    {auth.user.role === Role.Lecturer && (
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
                            <InputError
                                message={errors.mode}
                                className="mt-2"
                            />
                        </div>
                    )}

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
                            Edit
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </Authenticated>
    );
};
export default Edit;
