import { Router } from "express";
import { checkApproachingTasks, checkOverdueTasks } from "../controller/notificationController";


const notifRouter = Router();

/**
* @swagger
* /v1/api/notifications/approaching/{id}:
*   get:
*     tags:
*       - Notification Routes
*     summary: Get approaching tasks
*     parameters:
*       - name: id
*         in: path
*         description: The unique Id of the user
*         required: true
*       - in: header
*         name: Authorisation
*         required: true
*         schema:
*           type: string
*         description: JWT token
*     responses:
*       200:
*         description: Successfully accessed protected route
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                 user:
*                   type: object
*                 authMethod:
*                   type: string
*                   enum: [header, stored]
*       401:
*         description: Unauthorized - No token provided or invalid token
*       404:
*         description: User not found
*       500:
*         description: Internal server error
* /v1/api/notifications/overdue/{id}:
*   get:
*     tags:
*       - Notification Routes
*     summary: Get overdue tasks
*     parameters:
*       - name: id
*         in: path
*         description: The unique Id of the user
*         required: true
*       - in: header
*         name: Authorisation
*         required: true
*         schema:
*           type: string
*         description: JWT token
*     responses:
*       200:
*         description: Successfully accessed protected route
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                 user:
*                   type: object
*                 authMethod:
*                   type: string
*                   enum: [header, stored]
*       401:
*         description: Unauthorized - No token provided or invalid token
*       404:
*         description: User not found
*       500:
*         description: Internal server error
*/

notifRouter.get('/approaching/:id', checkApproachingTasks);
notifRouter.get('/overdue/:id', checkOverdueTasks);

export default notifRouter;