export interface Task {
    id: number;
    title: string;
    description: string;
    status: string;
    end_time: string;
    project_id: number;
    assigned_to: number;
    task_json?: {
        messages: { posted_at: string; content?: string; posted_by: number; files?: any }[];
    };
    priority?: string;
}

export interface TaskCreateData {
    title: string;
    description: string;
    status: string;
    end_time: string;
    project_id: number;
    assigned_to: number;
    task_json?: {
        messages: { posted_at: string; content?: string; posted_by: number; files?: any }[];
    };
    priority?: string;
}

export interface PaginatedTaskResponse {
    tasks: Task[];
    total: number;
}