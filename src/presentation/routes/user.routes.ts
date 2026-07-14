import express from 'express'
import { UserService } from '../../application/services/UserService.js'
import { UserRepository } from '../../infrastructure/repositories/UserRepository.js'
import { AuditLogRepository } from '../../infrastructure/repositories/AuditLogRepostory.js'
import { UserController } from '../controllers/UserController.js'
import { authorize } from '../middlewares/role.middleware.js'

const router = express.Router()

const userService = new UserService(new UserRepository(), new AuditLogRepository())

const userController = new UserController(userService)

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users fetched successfully
 */
router.get(
  "/",
  userController.getUsers
);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User fetched successfully
 */
router.get(
  "/:id",
  userController.findUserById
);

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Update user
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *
 *     responses:
 *       200:
 *         description: User updated successfully
 */
router.patch(
  "/:id",
  userController.updateUser
);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete user
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 */
router.delete(
  "/:id",
  userController.deleteUser
);


export default router