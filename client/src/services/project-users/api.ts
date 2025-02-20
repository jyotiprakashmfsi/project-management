import { getHeaders } from '../../utils/header';

const API_URL = import.meta.env.VITE_API_BASE_URL

export interface ProjectUser {
    id: number;
    project_id: number;
    user_id: number;
    role: string;
    fname?: string;
    email?: string;
}

export interface ProjectUserCreateData {
    project_id: number;
    user_id: number;
    role: string;
}

export const projectUserApi = {
    addUserToProject: async (data: ProjectUserCreateData) => {
        const response = await fetch(`${API_URL}/project-users`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to add user to project');
        return response.json();
    },

    getProjectUsers: async (projectId: number, page: number = 1, limit: number = 10) => {
        const response = await fetch(`${API_URL}/project-users/project/${projectId}?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: getHeaders()
        });
        if (!response.ok) throw new Error('Failed to fetch project users');
        return response.json();
    },

    getUserProjects: async (userId: number) => {
        const response = await fetch(`${API_URL}/project-users/user/${userId}`, {
            method: 'GET',
            headers: getHeaders()
        });
        if (!response.ok) throw new Error('Failed to fetch user projects');
        return response.json();
    },

    updateUserRole: async (id: number, role: string) => {
        const response = await fetch(`${API_URL}/project-users/${id}/role`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify({ role })
        });
        if (!response.ok) throw new Error('Failed to update user role');
        return response.json();
    },

    removeUserFromProject: async (projectId: number, userId: number) => {
        const response = await fetch(`${API_URL}/project-users/project/${projectId}/user/${userId}`, {
            method: 'DELETE',
            headers: getHeaders()
        });
        if (!response.ok) throw new Error('Failed to remove user from project');
        return response.json();
    },

    checkUserInProject: async (projectId: number, userId: number) => {
        const response = await fetch(`${API_URL}/project-users/project/${projectId}/user/${userId}/check`, {
            method: 'GET',
            headers: getHeaders()
        });
        if (!response.ok) throw new Error('Failed to check user in project');
        return response.json();
    }
};
