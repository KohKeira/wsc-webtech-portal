import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import { Task } from '@/types/task.entity';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { BiPlus, BiSave } from 'react-icons/bi';

const Index: React.FC<{ tasks: Task[] }> = ({ tasks }) => {
    const [showInput, setShowInput] = useState(false);

    const { data, setData, errors, post } = useForm<Partial<Task>>({
        title: '',
    });
    const addTask: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('tasks.store'), {
            onSuccess: () => {
                setShowInput(false);
                setData({ title: '' });
            },
        });
    };

    const { delete: destroy } = useForm();
    const deleteTask = (id: number) => {
        if (confirm('Do you want to delete this task?')) {
            destroy(route('tasks.destroy', { task: id }));
        }
    };
    return (
        <div className="h-fit flex grow overflow-x-auto bg-white shadow-sm sm:rounded-lg md:w-80 md:grow-0 md:justify-center dark:bg-gray-800">
            <div className="w-full max-w-3xl p-4 md:p-6">
                <h3 className="mb-2 flex text-2xl font-bold">
                    Tasks
                    <BiPlus
                        className="ms-auto inline"
                        size={30}
                        onClick={() => setShowInput((prev) => !prev)}
                    />
                </h3>
                {showInput && (
                    <>
                        <div className="mb-4 mt-2 flex h-10 items-center gap-2">
                            <div className="grow">
                                <TextInput
                                    placeholder="Enter your task"
                                    onChange={(e) =>
                                        setData('title', e.target.value)
                                    }
                                    value={data.title}
                                />
                            </div>

                            <button
                                className="mt-1 flex h-full w-10 items-center justify-center rounded bg-black text-white"
                                onClick={addTask}
                            >
                                <BiSave size={30} />
                            </button>
                        </div>
                        <InputError message={errors.title} className="my-2" />
                    </>
                )}

                {tasks.length > 0 ? (
                    tasks.map((t) => (
                        <div key={t.id} className="my-1 flex items-center">
                            <Checkbox
                                checked={false}
                                onChange={() => deleteTask(t.id)}
                            />
                            <p className="ms-2 text-lg">{t.title}</p>
                        </div>
                    ))
                ) : (
                    <div>No Tasks yet.</div>
                )}
            </div>
        </div>
    );
};
export default Index;
