import { Request, Response } from "express";
import { ProjectUserService } from "../service/projectUserService";

const projectUserService = new ProjectUserService();

export const addUserToProject = async (req: Request, res: Response): Promise<any> => {
    try {
        const projectUser = await projectUserService.addUserToProject(req.body);
        res.status(201).json({ message: "User added to project successfully", projectUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to add user to project", error });
    }
};

export const getProjectUsers = async (req: Request, res: Response): Promise<any> => {
    try {
        const projectId = parseInt(req.params.projectId);
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        
        const result = await projectUserService.getProjectUsers(projectId, { page, limit });
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch project users", error });
    }
};

export const getUserProjects = async (req: Request, res: Response): Promise<any> => {
    try {
        const userId = parseInt(req.params.userId);
        const projects = await projectUserService.getUserProjects(userId);
        res.status(200).json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch user's projects", error });
    }
};

export const updateProjectUserRole = async (req: Request, res: Response): Promise<any> => {
    try {
        const id = parseInt(req.params.id);
        const { role } = req.body;
        
        const updatedProjectUser = await projectUserService.updateProjectUserRole(id, role);
        
        if (!updatedProjectUser) {
            return res.status(404).json({ message: "Project user not found" });
        }
        
        res.status(200).json({ message: "Project user role updated successfully", projectUser: updatedProjectUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update project user role", error });
    }
};

export const removeUserFromProject = async (req: Request, res: Response): Promise<any> => {
    try {
        const projectId = parseInt(req.params.projectId);
        const userId = parseInt(req.params.userId);
        
        const removed = await projectUserService.removeUserFromProject(projectId, userId);
        
        if (!removed) {
            return res.status(404).json({ message: "Project user not found" });
        }
        
        res.status(200).json({ message: "User removed from project successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to remove user from project", error });
    }
};

export const isUserInProject = async (req: Request, res: Response): Promise<any> => {
    try {
        const projectId = parseInt(req.params.projectId);
        const userId = parseInt(req.params.userId);
        
        const isInProject = await projectUserService.isUserInProject(projectId, userId);
        res.status(200).json({ isInProject });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to check user project membership", error });
    }
};

export const getAllTeamMembers = async (req: Request, res: Response): Promise<any> => {
    try {
        const userId = parseInt(req.params.userId);
        if (isNaN(userId)) {
            return res.status(400).json({ error: "Invalid user ID" });
        }

        const teamMembers = await projectUserService.getAllTeamMembers(userId);
        res.json(teamMembers);
    } catch (error) {
        console.error("Error getting team members:", error);
        res.status(500).json({ error: "Failed to get team members" });
    }
};