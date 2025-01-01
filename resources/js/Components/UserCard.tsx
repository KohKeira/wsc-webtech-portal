import { Role, User } from '@/types/user.entity';
import { Link, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { FaCheck, FaRegCopy } from 'react-icons/fa';
import SecondaryButton from './SecondaryButton';

const UserCard: React.FC<{ user: User }> = ({ user }) => {
    const { auth } = usePage().props;
    const [copy, setCopy] = useState(false);

    const { delete: destroy } = useForm();
    const deleteUser = (id: number) => {
        if (confirm('Do you want to delete this user?')) {
            destroy(route('users.destroy', { user: id }));
        }
    };
    const copyToClipboard = async () => {
        setCopy((prev) => !prev);
        await window.navigator.clipboard.writeText(user.email);
        setTimeout(() => {
            setCopy((prev) => !prev);
        }, 1000);
    };
    return (
        <div className="h-full w-64 rounded-lg bg-sky-100 text-center shadow">
            <div className="flex flex-col items-center overflow-hidden px-4 py-6">
                <img
                    className="mb-3 h-24 w-24 rounded-full object-contain shadow"
                    src={
                        user.avatar
                            ? 'storage/' + user.avatar
                            : 'images/user-profile.png'
                    }
                    alt={user.name}
                />
                <h5 className="mb-1 w-full break-words text-xl font-medium text-gray-900 dark:text-white">
                    {user.name}
                </h5>
                <span className="mt-1 w-full break-words text-sm text-gray-600 dark:text-gray-400">
                    {user.email}
                    {copy ? (
                        <FaCheck className="ms-1 inline cursor-pointer text-green-600" />
                    ) : (
                        <FaRegCopy
                            className="ms-1 inline cursor-pointer"
                            onClick={copyToClipboard}
                        />
                    )}
                </span>
                {auth.user.role === Role.Lecturer && (
                    <>
                        <span className="mt-1 w-full break-words text-sm text-gray-600 dark:text-gray-400">
                            {user.phone_number}
                        </span>
                        <div className="mt-4 flex">
                            <Link href={route('users.edit', { user: user.id })}>
                                <SecondaryButton className="mr-2 bg-amber-400 hover:bg-yellow-200">
                                    Edit
                                </SecondaryButton>
                            </Link>
                            <SecondaryButton
                                className="mr-2 bg-red-400 hover:bg-red-200"
                                onClick={() => deleteUser(user.id)}
                            >
                                Delete
                            </SecondaryButton>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
export default UserCard;
