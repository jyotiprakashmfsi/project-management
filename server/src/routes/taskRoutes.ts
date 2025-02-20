import { Router } from "express";
import {
    createTask,
    getAllTasks,
    getTaskById,
    getProjectTasks,
    getProjectTasksByStatus,
    updateTask,
    deleteTask
} from "../controller/taskController";
import { authMiddleware } from "../middleware/authMiddleware";

const tasksRoutes = Router();

/**
 * @swagger
 * /v1/api/tasks:
 *  get:
 *     tags:
 *     - Task Controller
 *     summary: Get all tasks with pagination
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
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tasks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       title:
 *                         type: string
 *                       description:
 *                         type: string
 *                       status:
 *                         type: string
 *                       end_time:
 *                         type: string
 *                         format: date-time
 *                 total:
 *                   type: integer
 *       500:
 *         description: Server Error
 */
tasksRoutes.get("/",authMiddleware, getAllTasks);

/**
 * @swagger
 * /v1/api/tasks/{id}:
 *  get:
 *     tags:
 *     - Task Controller
 *     summary: Get task by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Task ID
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
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 status:
 *                   type: string
 *                 end_time:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server Error
 */
tasksRoutes.get("/:id", authMiddleware, getTaskById);

/**
 * @swagger
 * /v1/api/tasks/project/{id}:
 *  get:
 *     tags:
 *     - Task Controller
 *     summary: Get all tasks for a project
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Project ID
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
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   status:
 *                     type: string
 *                   end_time:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Server Error
 */
tasksRoutes.get("/project/:id", authMiddleware, getProjectTasks);

/**
 * @swagger
 * /v1/api/tasks/project/{status}/{id}:
 *  get:
 *     tags:
 *     - Task Controller
 *     summary: Get project tasks by status
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Project ID
 *       - name: status
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           enum: [not-started, started, finished]
 *         description: Task status
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
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   status:
 *                     type: string
 *                   end_time:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Server Error
 */
tasksRoutes.get("/project/not-started/:id", authMiddleware, getProjectTasksByStatus);
tasksRoutes.get("/project/started/:id", authMiddleware, getProjectTasksByStatus);
tasksRoutes.get("/project/finished/:id", authMiddleware, getProjectTasksByStatus);

/**
 * @swagger
 * /v1/api/tasks:
 *  post:
 *     tags:
 *     - Task Controller
 *     summary: Create a new task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - status
 *               - end_time
 *               - project_id
 *               - assigned_to
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [not-started, started, finished]
 *               end_time:
 *                 type: string
 *                 format: date-time
 *               project_id:
 *                 type: integer
 *               assigned_to:
 *                 type: integer
 *               task_json:
 *                 type: object
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Server Error
 */
tasksRoutes.post("/", authMiddleware, createTask);

/**
 * @swagger
 * /v1/api/tasks/{id}:
 *  put:
 *     tags:
 *     - Task Controller
 *     summary: Update a task
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [not-started, started, finished]
 *               end_time:
 *                 type: string
 *                 format: date-time
 *               assigned_to:
 *                 type: integer
 *               task_json:
 *                 type: object
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server Error
 */
tasksRoutes.put("/:id", authMiddleware, updateTask);

/**
 * @swagger
 * /v1/api/tasks/{id}:
 *  delete:
 *     tags:
 *     - Task Controller
 *     summary: Delete a task
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server Error
 */
tasksRoutes.delete("/:id", authMiddleware, deleteTask);

export default tasksRoutes;