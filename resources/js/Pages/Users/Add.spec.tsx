import { Gender, Role, User } from '@/types/user.entity';
import { useForm, usePage } from '@inertiajs/react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Add from './Add';

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

interface UserForm extends Partial<User> {
    avatar_file: File | undefined; // Add avatarFile for file upload
}

const setup = () => {
    const utils = render(<Add />);

    // Query the inputs
    const nameInput = screen.getByLabelText('Name');
    const emailInput = screen.getByLabelText('Email');
    const phoneInput = screen.getByLabelText('Phone Number');
    const lecturerRadioButton = screen.getByLabelText('Lecturer');
    const studentRadioButton = screen.getByLabelText('Student');
    const maleRadioButton = screen.getByLabelText('Male');
    const femaleRadioButton = screen.getByLabelText('Female');
    const form = screen.getByRole('form');
    const fileInput = screen.getByLabelText('Avatar');
    const button = screen.getByRole('button', { name: 'Add' });

    // Return the inputs and utils for further actions
    return {
        form,
        nameInput,
        emailInput,
        phoneInput,
        lecturerRadioButton,
        studentRadioButton,
        maleRadioButton,
        femaleRadioButton,
        fileInput,
        button,
        ...utils,
    };
};
describe('Add User', () => {
    let mockSetData: jest.Mock;
    let mockPost: jest.Mock;
    let mockData: UserForm;

    beforeEach(() => {
        jest.clearAllMocks();
        mockSetData = mockSetData = jest.fn((field: keyof UserForm, value) => {
            mockData[field] = value; // Simulate data update
        });
        mockPost = jest.fn();
        mockData = {
            name: '',
            email: '',
            gender: undefined,
            phone_number: undefined,
            avatar: '',
            avatar_file: undefined,
            role: undefined,
        };

        (usePage as jest.Mock).mockReturnValue({
            props: { auth: mockLecturerAuth },
        });
        (useForm as jest.Mock).mockReturnValue({
            data: mockData,
            setData: mockSetData,
            errors: {}, // Mock errors as an empty object
            processing: false, // Mock processing as false
            post: mockPost, // Mock post function
        });
    });
    test('form exist and have the necesarry fields', () => {
        const {
            nameInput,
            emailInput,
            phoneInput,
            lecturerRadioButton,
            studentRadioButton,
            maleRadioButton,
            femaleRadioButton,
            fileInput,
            button,
        } = setup();
        // check if all input exist
        expect(lecturerRadioButton).toBeInTheDocument();
        expect(studentRadioButton).toBeInTheDocument();

        expect(nameInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();

        expect(maleRadioButton).toBeInTheDocument();
        expect(femaleRadioButton).toBeInTheDocument();

        expect(phoneInput).toBeInTheDocument();
        expect(fileInput).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    });
    test('test onChange event for inputs', async () => {
        const {
            nameInput,
            emailInput,
            phoneInput,
            lecturerRadioButton,
            studentRadioButton,
            maleRadioButton,
            femaleRadioButton,
        } = setup();
        const nameValue = 'James Tan';
        expect(nameInput).toHaveValue('');
        fireEvent.change(nameInput, {
            target: { value: nameValue },
        });
        expect(mockSetData).toHaveBeenLastCalledWith('name', nameValue);

        const emailValue = 'james_tan';
        expect(emailInput).toHaveValue('');

        fireEvent.change(emailInput, {
            target: { value: emailValue },
        });
        expect(mockSetData).toHaveBeenLastCalledWith('email', emailValue);

        const phoneValue = '81234567';
        expect(phoneInput).toHaveValue(null);

        fireEvent.change(phoneInput, {
            target: { value: phoneValue },
        });
        expect(mockSetData).toHaveBeenLastCalledWith(
            'phone_number',
            parseInt(phoneValue),
        );

        // click radio button
        fireEvent.click(lecturerRadioButton);
        expect(mockSetData).toHaveBeenLastCalledWith('role', Role.Lecturer);

        fireEvent.click(studentRadioButton);
        expect(mockSetData).toHaveBeenLastCalledWith('role', Role.Student);

        fireEvent.click(maleRadioButton);
        expect(mockSetData).toHaveBeenLastCalledWith('gender', Gender.Male);

        fireEvent.click(femaleRadioButton);
        expect(mockSetData).toHaveBeenLastCalledWith('gender', Gender.Female);
    });
    test('email helper text changes with user role', () => {
        const { lecturerRadioButton, rerender } = setup();
        fireEvent.click(lecturerRadioButton);
        // Re-render the component with updated mockData
        rerender(<Add />);

        expect(screen.getByText('@tp.edu.sg')).toBeInTheDocument();
    });
    test('email helper text changes with user role', () => {
        const { studentRadioButton, rerender } = setup();
        fireEvent.click(studentRadioButton);
        // Re-render the component with updated mockData
        rerender(<Add />);

        screen.debug(undefined, 30000);

        expect(screen.getByText('@student.tp.edu.sg')).toBeInTheDocument();
    });
    test('file upload for avatar', async () => {
        const { fileInput } = setup();
        const file = new File(['avatar image'], 'test.jpg', {
            type: 'image/jpeg',
        });
        fireEvent.change(fileInput, { target: { files: [file] } });
    });
    test('submit form with all required inputs for lecturer', () => {
        // fill up necessary inputs
        const {
            nameInput,
            emailInput,
            phoneInput,
            lecturerRadioButton,
            maleRadioButton,
            button,
            rerender,
        } = setup();

        fireEvent.click(lecturerRadioButton);
        fireEvent.change(nameInput, { target: { value: 'James Tan' } });
        fireEvent.change(emailInput, { target: { value: 'james_tan' } });
        fireEvent.change(phoneInput, { target: { value: '81234567' } });
        fireEvent.click(maleRadioButton);

        rerender(<Add />);
        fireEvent.click(button);

        expect(mockPost).toHaveBeenCalledTimes(1);
        expect(mockData).toMatchObject({
            name: 'James Tan',
            email: 'james_tan@tp.edu.sg',
            gender: Gender.Male,
            phone_number: 81234567,
            avatar: '',
            avatar_file: undefined,
            role: Role.Lecturer,
        });
    });
    test('submit form with all required inputs for student', () => {
        const {
            nameInput,
            emailInput,
            phoneInput,
            studentRadioButton,
            maleRadioButton,
            button,
            rerender,
        } = setup();

        fireEvent.click(studentRadioButton);
        fireEvent.change(nameInput, { target: { value: 'James Tan' } });
        fireEvent.change(emailInput, { target: { value: '2301442F' } });
        fireEvent.change(phoneInput, { target: { value: '81234567' } });
        fireEvent.click(maleRadioButton);

        rerender(<Add />);
        fireEvent.click(button);

        expect(mockPost).toHaveBeenCalledTimes(1);
        expect(mockData).toMatchObject({
            name: 'James Tan',
            email: '2301442F@student.tp.edu.sg',
            gender: Gender.Male,
            phone_number: 81234567,
            avatar: '',
            avatar_file: undefined,
            role: Role.Student,
        });
    });
    test('fail to submit form no inputs', () => {
        // fill up necessary inputs
        const { button } = setup();

        fireEvent.click(button);
        expect(mockPost).not.toHaveBeenCalled();
    });
});
