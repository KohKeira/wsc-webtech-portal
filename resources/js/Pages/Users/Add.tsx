import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import RadioButton from '@/Components/RadioButton';
import TextInput from '@/Components/TextInput';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Gender, Role, User } from '@/types/user.entity';
import { Head, useForm } from '@inertiajs/react';
import React, { FormEventHandler } from 'react';

const Add: React.FC = () => {
    interface UserForm extends Partial<User> {
        avatar_file: File | undefined; // Add avatarFile for file upload
    }

    const { data, setData, errors, processing, post } = useForm<UserForm>({
        name: '',
        email: '',
        gender: undefined,
        phone_number: undefined,
        avatar: '',
        avatar_file: undefined,
        role: Role.Student,
    });
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (data.email && !data.email.includes('@')) {
            data.email +=
                Role.Student === data.role
                    ? '@student.tp.edu.sg'
                    : '@tp.edu.sg';
        }
        console.log(data);
        post(route('users.store'));
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
                    Add User
                </h2>
            }
        >
            <Head title="Add User" />
            <div className="mx-auto max-w-lg sm:p-6 lg:p-8">
                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <div className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Role
                        </div>

                        <div
                            className="grid grid-cols-2 gap-x-2"
                            id="roleRadioButtonGroup"
                        >
                            <RadioButton
                                id="studentRadioButton"
                                value="student"
                                label="Student"
                                name="role"
                                checked={data.role === Role.Student}
                                onChange={(e) =>
                                    setData('role', e.target.value as Role)
                                }
                                required
                            />
                            <RadioButton
                                id="lecturerRadioButton"
                                value="lecturer"
                                label="Lecturer"
                                name="role"
                                checked={data.role === Role.Lecturer}
                                onChange={(e) =>
                                    setData('role', e.target.value as Role)
                                }
                                required
                            />
                        </div>
                        <InputError
                            message={errors.role}
                            className="mt-2"
                            data-cy="role-error"
                        />
                    </div>
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
                                data.role === Role.Student
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
                            Add
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </Authenticated>
    );
};

export default Add;
