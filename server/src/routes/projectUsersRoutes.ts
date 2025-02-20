import { Router } from "express";
import {
    addUserToProject,
    getProjectUsers,
    getUserProjects,
    updateProjectUserRole,
    removeUserFromProject,
    isUserInProject
} from "../controller/projectUserController";
import { authMiddleware } from "../middleware/authMiddleware";

const projectUserRoute = Router();

/**
 * @swagger
 * /v1/api/project-users:
 *  post:
 *     tags:
 *     - Project User Controller
 *     summary: Add a user to a project
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - project_id
 *               - user_id
 *               - role
 *             properties:
 *               project_id:
 *                 type: integer
 *               user_id:
 *                 type: integer
 *               role:
 *                 type: string
 *                 enum: [admin, member, viewer]
 *     responses:
 *       201:
 *         description: User added to project successfully
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Server Error
 */
projectUserRoute.post("/", authMiddleware, addUserToProject);

/**
 * @swagger
 * /v1/api/project-users/project/{projectId}:
 *  get:
 *     tags:
 *     - Project User Controller
 *     summary: Get all users in a project
 *     parameters:
 *       - name: projectId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Project ID
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
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       project_id:
 *                         type: integer
 *                       user_id:
 *                         type: integer
 *                       role:
 *                         type: string
 *                       fname:
 *                         type: string
 *                       email:
 *                         type: string
 *                 total:
 *                   type: integer
 *       500:
 *         description: Server Error
 */
projectUserRoute.get("/project/:projectId", authMiddleware, getProjectUsers);

/**
 * @swagger
 * /v1/api/project-users/user/{userId}:
 *  get:
 *     tags:
 *     - Project User Controller
 *     summary: Get all projects for a user
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
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
 *                   project_id:
 *                     type: integer
 *                   user_id:
 *                     type: integer
 *                   role:
 *                     type: string
 *                   project_name:
 *                     type: string
 *                   project_description:
 *                     type: string
 *       500:
 *         description: Server Error
 */
projectUserRoute.get("/user/:userId", authMiddleware, getUserProjects);

/**
 * @swagger
 * /v1/api/project-users/{id}/role:
 *  put:
 *     tags:
 *     - Project User Controller
 *     summary: Update user's role in a project
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Project User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [admin, member, viewer]
 *     responses:
 *       200:
 *         description: Role updated successfully
 *       404:
 *         description: Project user not found
 *       500:
 *         description: Server Error
 */
projectUserRoute.put("/:id/role", authMiddleware, updateProjectUserRole);

/**
 * @swagger
 * /v1/api/project-users/project/{projectId}/user/{userId}:
 *  delete:
 *     tags:
 *     - Project User Controller
 *     summary: Remove a user from a project
 *     parameters:
 *       - name: projectId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Project ID
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: User removed from project successfully
 *       404:
 *         description: Project user not found
 *       500:
 *         description: Server Error
 */
projectUserRoute.delete("/project/:projectId/user/:userId", authMiddleware, removeUserFromProject);

/**
 * @swagger
 * /v1/api/project-users/project/{projectId}/user/{userId}/check:
 *  get:
 *     tags:
 *     - Project User Controller
 *     summary: Check if a user is in a project
 *     parameters:
 *       - name: projectId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Project ID
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isInProject:
 *                   type: boolean
 *       500:
 *         description: Server Error
 */
projectUserRoute.get("/project/:projectId/user/:userId/check", authMiddleware, isUserInProject);

export default projectUserRoute;