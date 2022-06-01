import { Router } from "express";

import { createUserController } from "../modules/users/useCases/createUser";
import { listAllUsersController } from "../modules/users/useCases/listAllUsers";
import { showUserProfileController } from "../modules/users/useCases/showUserProfile";
import { turnUserAdminController } from "../modules/users/useCases/turnUserAdmin";

const usersRoutes = Router();




/**
 * @swagger
 * components:
 *   schemas:
 *     UserRequest:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:                
 *         name:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           description: email of the user        
 *       example:
 *         name: Diego
 *         email: diego@email.com
 *     UserResponse:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         id:
 *           type: string
 *           description: The UUID of the user
 *         admin:
 *           type: boolean
 *           description: If user is admin        
 *         name:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           description: email of the user        
 *       example:
 *         id: 6f80003e-4582-4d7c-87e9-0295985e13e5
 *         admin: true
 *         name: Diego
 *         email: diego@email.com
 *         created_at: 2022-06-01T12:40:54.327Z
 *         updated_at: 2022-06-01T12:41:05.351Z
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: The error description               
 *       example:
 *         error: mensagem do erro
 *
 */

/**
 * @swagger
 *  tags:
 *    name: Users
 *    description: CRUD users
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a user
 *     tags: [Users]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UserRequest'
 *     responses:
 *       201:
 *         description: the user who was registred
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserResponse'
 */
usersRoutes.post("/", (request, response) =>
  createUserController.handle(request, response)
);

/**
 * @swagger
 * /users/{user_id}/admin:
 *   patch:
 *     summary: Turn user admin
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         description: uuid of the user
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       201:
 *         description: The user become admin
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       404:
 *        description: The error response
 *        content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 */
usersRoutes.patch("/:user_id/admin", (request, response) =>
  turnUserAdminController.handle(request, response)
);

/**
 * @swagger
 * /users/{user_id}:
 *   get:
 *     summary: Show user profile
 *     tags: [Users]
 *     parameters:
 *       - in : path
 *         name: user_id
 *         description: uuid of the user
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: The user information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: The error response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

usersRoutes.get("/:user_id", (request, response) =>
  showUserProfileController.handle(request, response)
);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Show all user profile
 *     tags: [Users]
 *     parameters:
 *       - in : header
 *         name: user_id
 *         description: uuid of the user
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: The users information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: The error response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
usersRoutes.get("/", (request, response) =>
  listAllUsersController.handle(request, response)
);

export { usersRoutes };
