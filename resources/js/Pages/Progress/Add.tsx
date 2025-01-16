import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import {
    Progress,
    Status,
    statusOptions,
    yearOptions,
} from '@/types/progress.entity';
import { Module, moduleOptions } from '@/types/training.entity';
import { Head, useForm, usePage } from '@inertiajs/react';
import React, { FormEventHandler } from 'react';

const Index: React.FC = () => {
    const { auth } = usePage().props;
    const { data, setData, errors, processing, post } = useForm<
        Partial<Progress>
    >({
        country: '',
        module: Module.A,
        year: yearOptions[0].value,
        status: Status['Not Done'],
        review: false,
        repository: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log(data);
        post(route('users.progresses.store', [auth.user]));
    };

    return (
        <Authenticated
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Add Progress
                </h2>
            }
        >
            <Head title="Add Progress" />
            <div className="mx-auto max-w-lg sm:p-6 lg:p-8">
                <form onSubmit={submit} className="space-y-4">
                    <div className="flex space-x-3">
                        <div className="flex-1">
                            <InputLabel htmlFor="country" value="Country" />
                            <TextInput
                                id="country"
                                className="w-full"
                                value={data.country}
                                maxLength={255}
                                onChange={(e) =>
                                    setData('country', e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.country}
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
                        <InputLabel htmlFor="year" value="Year" />
                        <SelectInput
                            id="year"
                            className="w-full"
                            value={data.year}
                            options={yearOptions}
                            onChange={(e) => setData('year', e.target.value)}
                            required
                        />
                        <InputError message={errors.year} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="status" value="Status" />
                        <SelectInput
                            id="status"
                            className="w-full"
                            value={data.status}
                            options={statusOptions}
                            onChange={(e) =>
                                setData('status', e.target.value as Status)
                            }
                            required
                        />
                        <InputError message={errors.status} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel
                            htmlFor="repository"
                            value="GitHub Repository Link"
                        />
                        <TextInput
                            id="repository"
                            className="w-full"
                            value={data.repository}
                            maxLength={255}
                            onChange={(e) =>
                                setData('repository', e.target.value)
                            }
                        />

                        <InputError
                            message={errors.repository}
                            className="mt-2"
                        />
                    </div>
                    <div className="mt-4 block">
                        <label className="flex items-center">
                            <Checkbox
                                name="review"
                                checked={data.review}
                                onChange={(e) =>
                                    setData('review', e.target.checked)
                                }
                            />
                            <span className="ms-2 text-gray-600 dark:text-gray-400">
                                Requires Review
                            </span>
                        </label>
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
