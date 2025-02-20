import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { deleteUser, getUserById, update } from "../controller/usersController";

const userRoutes= Router();

/**
* @swagger
* /v1/api/users/{id}:
*  delete:
*     tags:
*     - User Controller
*     summary: Delete user by Id
*     parameters:
*       - name: id
*         in: path
*         description: Task ID
*         required: true
*         schema:
*           type: integer
*       - in: header
*         name: Authorisation
*         required: true
*         schema:
*           type: string
*         description: JWT token
*     responses:
*      200:
*        description: Removed
*      400:
*        description: Bad request
*      404:
*        description: Not Found
*      500:
*        description: Server Error  
*/

userRoutes.delete("/:id", authMiddleware, deleteUser)


/**
* @swagger
* /v1/api/users/{id}:
*  put:
*     tags:
*     - User Controller
*     summary: Update user by Id
*     parameters:
*       - name: id
*         in: path
*         description: Task ID
*         required: true
*         schema:
*           type: integer
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
*               email:
*                 type: string
*                 format: email
*                 description: User's email address
*               fname:
*                 type: string
*                 description: User's full name
*               contact:
*                 type: string
*                 description: User's contact number
*               dob:
*                 type: string
*                 format: date
*                 description: User's date of birth
*     responses:
*      200:
*        description: Updated
*      400:
*        description: Bad request
*      404:
*        description: Not Found
*      500:
*        description: Server Error
*/
userRoutes.put("/:id", authMiddleware, update)

/**
* @swagger
* /v1/api/users/{id}:
*  get:
*     tags:
*     - User Controller
*     summary: Get user by Id
*     parameters:
*       - name: id
*         in: path
*         description: Task ID
*         required: true
*         schema:
*           type: integer
*       - in: header
*         name: Authorisation
*         required: true
*         schema:
*           type: string
*         description: JWT token
*     responses:
*      200:
*        description: Successfully accessed protected route
*      401:
*        description: Unauthorized - No token provided or invalid token
*      404: 
*        description: User not found
*      500:
*        description: Internal server error
*/

userRoutes.get("/:id", authMiddleware, getUserById)

export default userRoutes;