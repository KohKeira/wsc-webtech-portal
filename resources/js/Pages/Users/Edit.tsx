import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import RadioButton from '@/Components/RadioButton';
import TextInput from '@/Components/TextInput';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Gender, Role, User } from '@/types/user.entity';
import { Head, useForm } from '@inertiajs/react';
import React, { FormEventHandler } from 'react';

const Edit: React.FC<{ user: User }> = ({ user }) => {
    interface UserForm extends Partial<User> {
        avatar_file: File | undefined; // Add avatarFile for file upload
        _method: string;
    }

    const { data, setData, errors, processing, post } = useForm<UserForm>({
        name: user.name,
        email: user.email,
        gender: user.gender,
        phone_number: user.phone_number,
        avatar: '',
        avatar_file: undefined,
        _method: 'put',
    });
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (data.email && !data.email.includes('@')) {
            data.email +=
                Role.Student === user.role
                    ? '@student.tp.edu.sg'
                    : '@tp.edu.sg';
        }
        console.log(data);

        post(route('users.update', { user: user.id }));
    };

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setData('avatar_file', e.target.files[0]);
        }
    };

    return (
        <Authenticated
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Edit User
                </h2>
            }
        >
            <Head title="Edit User" />
            <div className="mx-auto max-w-lg sm:p-6 lg:p-8">
                <form onSubmit={submit} className="space-y-4" aria-label="form">
                    <div>
                        <InputLabel htmlFor="name" value="Name" />

                        <TextInput
                            id="name"
                            type="text"
                            name="name"
                            value={data.name}
                            className="block w-full"
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />

                        <InputError
                            message={errors.name}
                            className="mt-2"
                            data-cy="name-error"
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="email" value="Email" />

                        <TextInput
                            id="email"
                            type="text"
                            name="email"
                            value={data.email?.split('@')[0]}
                            className="block w-full"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                            trailingHelperText={
                                user.role === Role.Student
                                    ? '@student.tp.edu.sg'
                                    : '@tp.edu.sg'
                            }
                            required
                        />

                        <InputError
                            message={errors.email}
                            className="mt-2"
                            data-cy="email-error"
                        />
                    </div>
                    <div>
                        <div className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Gender
                        </div>
                        <div
                            className="grid grid-cols-2 gap-x-2"
                            id="genderRadioButtonGroup"
                        >
                            <RadioButton
                                id="femaleRadioButton"
                                value="female"
                                label="Female"
                                name="gender"
                                checked={data.gender === Gender.Female}
                                onChange={(e) =>
                                    setData('gender', e.target.value as Gender)
                                }
                                required
                            />
                            <RadioButton
                                id="maleRadioButton"
                                value="male"
                                label="Male"
                                name="gender"
                                checked={data.gender === Gender.Male}
                                onChange={(e) =>
                                    setData('gender', e.target.value as Gender)
                                }
                                required
                            />
                        </div>
                        <InputError
                            message={errors.gender}
                            className="mt-2"
                            data-cy="gender-error"
                        />
                    </div>
                    <div>
                        <InputLabel
                            htmlFor="phoneNumber"
                            value="Phone Number"
                        />

                        <TextInput
                            id="phoneNumber"
                            type="number"
                            name="phone_number"
                            value={
                                data.phone_number === undefined
                                    ? ''
                                    : data.phone_number
                            }
                            leadingHelperText="+65"
                            className="block w-full"
                            isFocused={true}
                            onChange={(e) =>
                                setData(
                                    'phone_number',
                                    parseInt(e.target.value) || undefined,
                                )
                            }
                            required
                        />

                        <InputError
                            message={errors.phone_number}
                            className="mt-2"
                            data-cy="phone-error"
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="avatar" value="Avatar" />

                        <TextInput
                            id="avatar"
                            type="file"
                            name="avatar_file"
                            className="block w-full border bg-white p-2 text-sm text-gray-900 file:p-1 focus:outline-none"
                            isFocused={true}
                            onChange={handleFile}
                            accept=".png,.jpg,.jpeg"
                        />
                        <InputError
                            message={errors.avatar_file}
                            className="mt-2"
                            data-cy="avatar-error"
                        />
                    </div>

                    <div className="flex justify-end">
                        <PrimaryButton
                            className=""
                            disabled={processing}
                            data-cy="add-button"
                        >
                            Edit
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </Authenticated>
    );
};

export default Edit;
