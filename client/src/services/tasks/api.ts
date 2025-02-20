// import.meta.env.VITE_API_BASE_URL

import { Task } from "../../types/task";

const api_url = import.meta.env.VITE_API_BASE_URL


interface PaginatedResponse {
  tasks: Task[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    total_pages: number;
  };
}

export class tasksService {
  static async createTask(data: Task, jwt: string) {
    try {
      const response = await fetch(`${api_url}/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorisation: `Bearer ${jwt}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      return result;
    } catch (error) {
        console.log(error)
        return error;
    }
  }

  static async getTasks(id: number, jwt: string, page: number = 1, limit: number = 10): Promise<PaginatedResponse> {
    try {
      const response = await fetch(`${api_url}/api/tasks/all/${id}?page=${page}&limit=${limit}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorisation: `Bearer ${jwt}`,
        },
      });

      const result = await response.json();
      return result;
    } catch (error) {
        console.log(error)
        throw error;
    }
  }

  static async getTaskById(id: number, jwt: string) {
    try {
      const response = await fetch(`${api_url}/api/tasks/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorisation: `Bearer ${jwt}`,
        },
      });

      const result = await response.json();
      return result;
    } catch (error) {
        console.log(error)
        return error;
    }
  }

  static async updateTask(data: Task, id: number, jwt: string) {
    try {
      const response = await fetch(`${api_url}/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorisation: `Bearer ${jwt}`,
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      return result;
    } catch (error) {
        console.log(error)
        return error;
    }
  }

  static async deleteTask(id: number, jwt: string) {
    try {
      const response = await fetch(`${api_url}/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorisation: `Bearer ${jwt}`,
        },
      });

      const result = await response.json();
      return result;
    } catch (error) {
        console.log(error)
        return error;
    }
  }

  static async markDone(id: number, jwt: string) {
    try {
      const response = await fetch(`${api_url}/api/tasks/${id}/mark-done`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorisation: `Bearer ${jwt}`,
        },
      });

      const result = await response.json();
      return result;
    } catch (error) {
        console.log(error)
        return error;
    }
  }

  static async unmarkDone(id: number, jwt: string) {
    try {
      const response = await fetch(`${api_url}/api/tasks/${id}/unmark-done`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorisation: `Bearer ${jwt}`,
        },
      });

      const result = await response.json();
      return result;
    } catch (error) {
        console.log(error)
        return error;
    }
  }
}
