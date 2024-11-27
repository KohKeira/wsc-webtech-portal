import '@testing-library/jest-dom';
import { route } from 'ziggy-js';

// mock Ziggy route function
global.route = jest.fn((name: string) => ({
    current: () => name === 'dashboard',
    url: `/mocked/${name}`,
})) as unknown as jest.MockedFunction<typeof route>;

// mock Inertia hooks
jest.mock('@inertiajs/react', () => ({
    ...jest.requireActual('@inertiajs/react'),
    Head: jest.fn(() => null),
    usePage: jest.fn(() => ({
        props: {},
    })),
}));
