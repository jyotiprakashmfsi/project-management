import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { deleteUser, update } from "../controller/usersController";
// import * as fn from "../services/usersManage";
import { signup, login } from '../controller/authController';

const authRoutes= Router();

/**
* @swagger
* components:
*   securitySchemes:
*     Authorization:
*       type: string
*       scheme: bearer
*       bearerFormat: JWT
* /v1/api/auth/signup:
*   post:
*     tags:
*     - Auth Controller
*     summary: Create a user
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - fname
*              - email
*              - password
*            properties:
*              fname:
*                type: string
*                default: johndoe 
*              email:
*                type: string
*                default: johndoe@gmail.com
*              password:
*                type: string
*                default: johnDoe20!@      
*     responses:
*      201:
*        description: Created
*      409:
*        description: Conflict
*      404:
*        description: Not Found
*      500:
*        description: Server Error
* /v1/api/auth/login:
*   post:
*     tags:
*     - Auth Controller
*     summary: Login as a user
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*            type: object
*            required:
*              - email
*              - password
*            properties:
*              email:
*                type: string
*                default: johndoe@gmail.com
*              password:
*                type: string
*                default: johnDoe20!@ 
*     responses:
*      201:
*        description: Logged in
*      409:
*        description: Conflict
*      404:
*        description: Not Found
*      500:
*        description: Server Error
*/
authRoutes.post("/signup", signup)
authRoutes.post("/login", login)

export default authRoutes;