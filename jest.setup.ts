import '@testing-library/jest-dom';
import { route } from 'ziggy-js';

// mock Ziggy route function
global.route = jest.fn((name: string) => ({
    current: () => name === 'dashboard',
    url: `/mocked/${name}`,
})) as unknown as jest.MockedFunction<typeof route>;

// mock Inertia hooks
jest.mock('@inertiajs/react', () => {
    // ...jest.requireActual('@inertiajs/react'),

    // useForm: jest.fn(),
    const originalModule = jest.requireActual('@inertiajs/react');
    return {
        __esModule: true,
        ...originalModule, // Keep other exports intact
        useForm: jest.fn(),
        Head: jest.fn(() => null),
        usePage: jest.fn(() => ({
            props: {},
        })), // Mock useForm
    };
});
