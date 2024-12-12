export enum Mode {
    Virtual = 'virtual',
    Physical = 'physical',
}

export interface Training {
    id: number;
    title: string;
    description: string;
    mode: Mode;
    venue: string;
    date: Date;
    start_time: string;
    end_time: string;
    user_id: number;
}
