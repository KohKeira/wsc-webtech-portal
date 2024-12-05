import { Gender, Role } from '@/types/user.entity';
import { usePage } from '@inertiajs/react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Index from './Index';

const mockLecturerAuth = {
    user: {
        id: 1,
        name: 'James',
        email: '2302112E@student.tp.edu.sg',
        gender: Gender.Male,
        phone_number: 91234567,
        role: Role.Lecturer,
    },
};
const mockStudentAuth = {
    user: {
        id: 1,
        name: 'James',
        email: '2302112E@student.tp.edu.sg',
        gender: Gender.Male,
        phone_number: 91234567,
        role: Role.Student,
    },
};

describe('Index', () => {
    test('renders Add User button', async () => {
        (usePage as jest.Mock).mockReturnValue({
            props: { auth: mockLecturerAuth },
        });
        render(<Index auth={mockLecturerAuth} />);
        const addButton = screen.getByRole('button', { name: 'Add User' });

        expect(addButton).toBeInTheDocument();
    });
    test('does not render button with student role', async () => {
        (usePage as jest.Mock).mockReturnValue({
            props: { auth: mockStudentAuth },
        });
        render(<Index auth={mockStudentAuth} />);
        const addButton = screen.queryByText('Add User');

        expect(addButton).toBeNull();
    });
    test('show success message', async () => {
        (usePage as jest.Mock).mockReturnValue({
            props: {
                auth: mockLecturerAuth,
                flash: {
                    message: 'Add User Success',
                },
            },
        });
        render(
            <Index
                auth={mockStudentAuth}
                flash={{ message: 'Add User Success' }}
            />,
        );
        const successMessge = screen.getByRole('alert');

        expect(successMessge).toHaveTextContent('Add User Success');
    });
    test('not show success message', async () => {
        (usePage as jest.Mock).mockReturnValue({
            props: {
                auth: mockLecturerAuth,
            },
        });
        render(<Index auth={mockStudentAuth} />);
        const successMessge = screen.queryByRole('alert');

        expect(successMessge).toBeNull();
    });
});
