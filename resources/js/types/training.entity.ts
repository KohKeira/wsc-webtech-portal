export enum Mode {
    Virtual = 'virtual',
    Physical = 'physical',
}
export enum Module {
    A = 'A',
    B = 'B',
    C = 'C',
    D = 'D',
    E = 'E',
    F = 'F',
}
export const moduleOptions = Object.values(Module).map((value) => ({
    value,
    label: value,
}));
export interface Training {
    id: number;
    title: string;
    description: string;
    mode: Mode;
    module: Module;
    venue: string;
    date: Date;
    start_time: string;
    end_time: string;
    user_id: number;
}
