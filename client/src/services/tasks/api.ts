// import.meta.env.VITE_API_BASE_URL

import { getHeaders } from '../../utils/header';

const API_URL = import.meta.env.VITE_API_BASE_URL

export interface Task {
    id: number;
    title: string;
    description: string;
    status: string;
    end_time: string;
    project_id: number;
    assigned_to: number;
    task_json?: any;
    priority?: string;
}

export interface TaskCreateData {
    title: string;
    description: string;
    status: string;
    end_time: string;
    project_id: number;
    assigned_to: number;
    task_json?: any;
    priority?: string;
}

export interface PaginatedTaskResponse {
    tasks: Task[];
    total: number;
}

export const taskApi = {
    getAllTasks: async (page: number = 1, limit: number = 10): Promise<PaginatedTaskResponse> => {
        const response = await fetch(`${API_URL}/tasks?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: getHeaders()
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch tasks');
        }
        return response.json();
    },

    getTaskById: async (id: number): Promise<Task> => {
        const response = await fetch(`${API_URL}/tasks/${id}`, {
            method: 'GET',
            headers: getHeaders()
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch task');
        }
        return response.json();
    },

    getProjectTasks: async (projectId: number): Promise<Task[]> => {
        const response = await fetch(`${API_URL}/tasks/project/${projectId}`, {
            method: 'GET',
            headers: getHeaders()
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch project tasks');
        }
        return response.json();
    },

    getProjectTasksByStatus: async (projectId: number, status: 'not-started' | 'started' | 'finished'): Promise<Task[]> => {
        const response = await fetch(`${API_URL}/tasks/project/${status}/${projectId}`, {
            method: 'GET',
            headers: getHeaders()
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch project tasks by status');
        }
        return response.json();
    },

    createTask: async (taskData: TaskCreateData): Promise<Task> => {
        const response = await fetch(`${API_URL}/tasks`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(taskData)
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to create task');
        }
        return response.json();
    },

    updateTask: async (id: number, taskData: Partial<TaskCreateData>): Promise<Task> => {
        const response = await fetch(`${API_URL}/tasks/${id}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(taskData)
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to update task');
        }
        return response.json();
    },

    deleteTask: async (id: number): Promise<void> => {
        const response = await fetch(`${API_URL}/tasks/${id}`, {
            method: 'DELETE',
            headers: getHeaders()
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to delete task');
        }
    }
};
