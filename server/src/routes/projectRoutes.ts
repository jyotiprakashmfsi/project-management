import { Router } from "express";
import {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
    getProjectsByStatus
} from "../controller/projectController";
import { authMiddleware } from "../middleware/authMiddleware";

const projectRoute = Router();

/**
 * @swagger
 * /v1/api/projects:
 *  get:
 *     tags:
 *     - Project Controller
 *     summary: Get all projects with pagination
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *       - in: header
 *         name: Authorisation
 *         required: true
 *         schema:
 *           type: string
 *         description: JWT token
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 projects:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       created_by:
 *                         type: integer
 *                 total:
 *                   type: integer
 *       500:
 *         description: Server Error
 */
projectRoute.get("/",authMiddleware, getAllProjects);

/**
 * @swagger
 * /v1/api/projects/{id}:
 *  get:
 *     tags:
 *     - Project Controller
 *     summary: Get project by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Project ID
 *       - in: header
 *         name: Authorisation
 *         required: true
 *         schema:
 *           type: string
 *         description: JWT token
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 created_by:
 *                   type: integer
 *       404:
 *         description: Project not found
 *       500:
 *         description: Server Error
 */
projectRoute.get("/:id",authMiddleware, getProjectById);

/**
 * @swagger
 * /v1/api/projects/status/{status}:
 *  get:
 *     tags:
 *     - Project Controller
 *     summary: Get projects by status
 *     parameters:
 *       - name: status
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           enum: [active, completed, on-hold]
 *         description: Project status
 *       - in: header
 *         name: Authorisation
 *         required: true
 *         schema:
 *           type: string
 *         description: JWT token
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   created_by:
 *                     type: integer
 *       500:
 *         description: Server Error
 */
projectRoute.get("/status/:status",authMiddleware, getProjectsByStatus);

/**
 * @swagger
 * /v1/api/projects:
 *  post:
 *     tags:
 *     - Project Controller
 *     summary: Create a new project
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - status
 *               - created_by
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [active, completed, on-hold]
 *               created_by:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Project created successfully
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Server Error
 */
projectRoute.post("/", createProject);

/**
 * @swagger
 * /v1/api/projects/{id}:
 *  put:
 *     tags:
 *     - Project Controller
 *     summary: Update a project
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Project ID
 *       - in: header
 *         name: Authorisation
 *         required: true
 *         schema:
 *           type: string
 *         description: JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [active, completed, on-hold]
 *     responses:
 *       200:
 *         description: Project updated successfully
 *       404:
 *         description: Project not found
 *       500:
 *         description: Server Error
 */
projectRoute.put("/:id", authMiddleware, updateProject);

/**
 * @swagger
 * /v1/api/projects/{id}:
 *  delete:
 *     tags:
 *     - Project Controller
 *     summary: Delete a project
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Project ID
 *       - in: header
 *         name: Authorisation
 *         required: true
 *         schema:
 *           type: string
 *         description: JWT token
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *       404:
 *         description: Project not found
 *       500:
 *         description: Server Error
 */
projectRoute.delete("/:id", authMiddleware, deleteProject);

export default projectRoute;