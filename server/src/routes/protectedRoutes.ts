import { Router, Request, Response } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';

const protectedRouter = Router();

/**
* @swagger
* /v1/api/testAuth/test:
*   get:
*     tags:
*       - Protected Routes
*     summary: Test protected route
*     parameters:
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
*             example:
*               message: "Protected route accessed"
*               user: { "user_id": 1, "email": "user@example.com" }
*               authMethod: "header"
*       401:
*         description: Unauthorized - No token provided or invalid token
*     description: |
*       Protected route that requires valid JWT token. Token can be provided in either:
*       1. Authorization header (Bearer token)
*       2. X-Stored-Token header (raw token)
*/

protectedRouter.get('/test', authMiddleware, (req: Request, res: Response) => {
  res.status(200).json({ 
    message: 'Protected route accessed',
    user: req,
    authMethod: req
  });
});

export default protectedRouter;