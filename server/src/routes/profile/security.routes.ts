import express from "express";
import SecurityController from "../../controllers/profiles/security.controller";
import {
  expressValidator,
  validateOptionalUserIdMiddleware,
} from "../../middlewares/validator.middleware";
import { asyncHandler } from "../../middlewares/handleError.middleware";
import {
  validateUserSecurityUpdate,
  validateSecurityEmail,
  validateSecurityUpdatePass,
  validateSecurityStatus,
  validateCode2AF,
} from "../../validation/profiles/security.validator";
import {
  adminAuthorizationMiddlewares,
  userAuthorizationMiddlewares,
} from "../../utils/authorizationRole.util";
const controller = SecurityController.getInstance();
const router = express.Router();

/**
 * @swagger
 * /security/update:
 *   put:
 *     tags: [User]
 *     summary: Update user security
 *     description: Update user's password or other security information.
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *              allOf:
 *                - $ref: '#/components/schemas/UserId'
 *                - $ref: '#/components/schemas/SecurityUpdateComponents'
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/BaseResponse'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.put(
  "/update",
  ...adminAuthorizationMiddlewares,
  validateOptionalUserIdMiddleware(),
  expressValidator(validateUserSecurityUpdate),
  asyncHandler(controller.updateSecurity.bind(controller))
);

/**
 * @swagger
 * /security/count:
 *   get:
 *     tags: [Security]
 *     summary: Get count of user security records
 *     description: Returns the total count of user security records in the system.
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/BaseResponse'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.get(
  "/count",
  ...adminAuthorizationMiddlewares,
  asyncHandler(controller.countSecurity.bind(controller))
);

/**
 * @swagger
 * /security/block-delete:
 *   post:
 *     tags: [Security]
 *     summary: Block or delete user account
 *     description: Block or mark a user account as deleted by user ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             allOf:
 *              - $ref: '#/components/schemas/UserId'
 *              - type: object
 *                properties:
 *                 isAccountBlocked:
 *                   type: boolean
 *                   example: true
 *                 isAccountDeleted:
 *                   type: boolean
 *                   example: false
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/BaseResponse'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.post(
  "/block-delete",
  ...adminAuthorizationMiddlewares,
  validateOptionalUserIdMiddleware(),
  expressValidator(validateSecurityStatus),
  asyncHandler(controller.deleteBlockUser.bind(controller))
);

/**
 * @swagger
 * /security/reset:
 *   post:
 *     tags: [Security]
 *     summary: Request password reset
 *     description: Send a password reset email to the user.
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
 *                 example: amr5179520@gmail.com
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/BaseResponse'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.post(
  "/reset",
  expressValidator(validateSecurityEmail),
  asyncHandler(controller.resetPassword.bind(controller))
);

/**
 * @swagger
 * /security/update-password:
 *   post:
 *     tags: [Security]
 *     summary: Update the user's password
 *     description: Update the password of the currently authenticated user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 example: OldPassword123
 *               newPassword:
 *                 type: string
 *                 example: NewPassword456
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/BaseResponse'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.post(
  "/update-password",
  ...userAuthorizationMiddlewares,
  expressValidator(validateSecurityUpdatePass),
  asyncHandler(controller.updatePassword.bind(controller))
);

/**
 * @swagger
 * /security/request-email-verification:
 *   post:
 *     tags: [Security]
 *     summary: Send email verification
 *     description: Send a verification email to confirm the user's email address.
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
 *                 example: amr5179520@gmail.com
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/BaseResponse'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.post(
  "/request-email-verification",
  expressValidator(validateSecurityEmail),
  asyncHandler(controller.sendEmail.bind(controller))
);

/**
 * @swagger
 * /security/generate/2fa:
 *   post:
 *     tags: [Security]
 *     summary: Generate Two-Factor Authentication QR code
 *     description: Generate a QR code for setting up Two-Factor Authentication (2FA).
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/BaseResponse'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.post(
  "/generate/2fa",
  ...userAuthorizationMiddlewares,
  asyncHandler(controller.generateTwoFactorAuth.bind(controller))
);

/**
 * @swagger
 * /security/confirm/2fa:
 *   post:
 *     tags: [Security]
 *     summary: Confirm Two-Factor Authentication (2FA) code
 *     description: Verify the 2FA code entered by the user after scanning the QR code.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/BaseResponse'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.post(
  "/confirm/2fa",
  ...userAuthorizationMiddlewares,
  expressValidator(validateCode2AF),
  asyncHandler(controller.verifyTwoFactorAuth.bind(controller))
);
export default router;
