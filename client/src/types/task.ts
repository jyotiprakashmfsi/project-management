export interface Task {
    id?: number;
    task_name?: string;
    description: string;
    status: string;
    end_time: string;
    start_time: string;
    tags: string;
    repeat_freq: number;
    remind_time: number;
    colour: string;
    user_id: number;
    createdAt?: string;
    updatedAt?: string;
}
