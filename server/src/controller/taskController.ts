import { Request, Response } from "express";
import { TaskService } from "../service/taskService";

const taskService = new TaskService();

export const createTask = async (req: Request, res: Response) => {
    try {
        const task = await taskService.createTask(req.body);
        res.status(201).json({ message: "Task created successfully", task });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create task", error });
    }
};

export const getAllTasks = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        
        const result = await taskService.getAllTasks(page, limit);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch tasks", error });
    }
};

export const getTaskById = async (req: Request, res: Response): Promise<any> => {
    try {
        const taskId = parseInt(req.params.id);
        const task = await taskService.getTaskById(taskId);
        
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        
        res.status(200).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch task", error });
    }
};

export const getProjectTasks = async (req: Request, res: Response) => {
    try {
        const projectId = parseInt(req.params.id);
        const tasks = await taskService.getTasksByProjectId(projectId);
        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch project tasks", error });
    }
};

export const getProjectTasksByStatus = async (req: Request, res: Response) => {
    try {
        const projectId = parseInt(req.params.id);
        const { status } = req.params;
        const tasks = await taskService.getTasksByProjectStatus(projectId, status);
        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch project tasks", error });
    }
};

export const updateTask = async (req: Request, res: Response): Promise<any> => {
    try {
        const taskId = parseInt(req.params.id);
        // console.log("Request Body:", req.body)
        const updatedTask = await taskService.updateTask(taskId, req.body);
        
        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        
        res.status(200).json({ message: "Task updated successfully", task: updatedTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update task", error });
    }
};

export const deleteTask = async (req: Request, res: Response): Promise<any> => {
    try {
        const taskId = parseInt(req.params.id);
        const deleted = await taskService.deleteTask(taskId);
        
        if (!deleted) {
            return res.status(404).json({ message: "Task not found" });
        }
        
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete task", error });
    }
}; 