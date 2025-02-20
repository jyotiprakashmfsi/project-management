import { Request, Response } from "express";
import { ProjectService } from "../service/projectService";

const projectService = new ProjectService();

export const createProject = async (req: Request, res: Response): Promise<any> => {
    try {
        const project = await projectService.createProject(req.body);
        res.status(201).json({ message: "Project created successfully", project });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create project", error });
    }
};

export const getAllProjects = async (req: Request, res: Response): Promise<any> => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        
        const result = await projectService.getAllProjects(page, limit);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch projects", error });
    }
};

export const getProjectById = async (req: Request, res: Response): Promise<any> => {
    try {
        const projectId = parseInt(req.params.id);
        const project = await projectService.getProjectById(projectId);
        
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        
        res.status(200).json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch project", error });
    }
};

export const updateProject = async (req: Request, res: Response): Promise<any> => {
    try {
        const projectId = parseInt(req.params.id);
        const updatedProject = await projectService.updateProject(projectId, req.body);
        
        if (!updatedProject) {
            return res.status(404).json({ message: "Project not found" });
        }
        
        res.status(200).json({ message: "Project updated successfully", project: updatedProject });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update project", error });
    }
};

export const deleteProject = async (req: Request, res: Response): Promise<any> => {
    try {
        const projectId = parseInt(req.params.id);
        const deleted = await projectService.deleteProject(projectId);
        
        if (!deleted) {
            return res.status(404).json({ message: "Project not found" });
        }
        
        res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete project", error });
    }
};

export const getProjectsByStatus = async (req: Request, res: Response): Promise<any> => {
    try {
        const { status } = req.params;
        const projects = await projectService.getProjectsByStatus(status);
        res.status(200).json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch projects by status", error });
    }
};