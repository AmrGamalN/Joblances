import express from "express";
import CertificateController from "../../controllers/company/certificate.controller";
import { asyncHandler } from "../../middlewares/handleError.middleware";
import {
  expressValidator,
  validateQueryMiddleware,
  requiredParamMiddleware,
} from "../../middlewares/validator.middleware";
import {
  validateCertificateAdd,
  validateCertificateUpdate,
} from "../../validation/company/certificate.validator";
import {
  companyAdminRoleMiddlewares,
  companyViewerRoleMiddlewares,
} from "../../utils/authorizationRole.util";
import {
  validateQueryCertificateCount,
  validateQueryCertificateGetAll,
} from "../../validation/query/company/certificate.validator";
const controller = CertificateController.getInstance();
const router = express.Router();

/**
 * @swagger
 * /company/certificate/add:
 *   post:
 *     tags: [Certificate]
 *     summary: Add certificate
 *     description: Add a new certificate
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CertificateAddComponents'
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/BaseResponse'
 *       400:
 *         description: Failed to add certificate
 *       403:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post(
  "/add",
  ...companyAdminRoleMiddlewares,
  expressValidator(validateCertificateAdd),
  asyncHandler(controller.addCertificate.bind(controller))
);

/**
 * @swagger
 * /company/certificate/count:
 *   get:
 *     tags: [Certificate]
 *     summary: Get the count of certificate
 *     description: Returns the total count of certificate
 *     parameters:
 *      - $ref: '#/components/parameters/Title'
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/BaseResponse'
 *       400:
 *         description: Failed to get count certificate
 *       403:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get(
  "/count",
  ...companyAdminRoleMiddlewares,
  expressValidator(validateQueryCertificateCount()),
  asyncHandler(controller.countCertificate.bind(controller))
);

/**
 * @swagger
 * /company/certificate/get/{id}:
 *   get:
 *     tags: [Certificate]
 *     summary: Get certificate
 *     description: Get certificate data by id
 *     parameters:
 *      - $ref: '#/components/parameters/Id'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/CertificateResponse'
 *       400:
 *         description: Failed to fetch certificate data
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server Error
 */
router.get(
  "/get/:id",
  ...companyViewerRoleMiddlewares,
  requiredParamMiddleware(),
  asyncHandler(controller.getCertificate.bind(controller))
);

/**
 * @swagger
 * /company/certificate:
 *   get:
 *     tags: [Certificate]
 *     summary: Get all certificate
 *     description: Retrieve certificate  by its id
 *     parameters:
 *      - $ref: '#/components/parameters/Page'
 *      - $ref: '#/components/parameters/Limit'
 *      - $ref: '#/components/parameters/Title'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/CertificateResponse'
 *       400:
 *         description: Failed to fetch certificate data
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server Error
 */
router.get(
  "/",
  ...companyViewerRoleMiddlewares,
  validateQueryMiddleware(),
  expressValidator(validateQueryCertificateGetAll()),
  asyncHandler(controller.getAllCertificates.bind(controller))
);

/**
 * @swagger
 * /company/certificate/update/{id}:
 *   put:
 *     tags: [Certificate]
 *     summary: Update certificate
 *     description: Update specific certificate information by id
 *     parameters:
 *      - $ref: '#/components/parameters/Id'
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CertificateAddComponents'
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/BaseResponse'
 *       400:
 *         description: Failed to update certificate
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server Error
 */
router.put(
  "/update/:id",
  ...companyAdminRoleMiddlewares,
  requiredParamMiddleware(),
  expressValidator(validateCertificateUpdate),
  asyncHandler(controller.updateCertificate.bind(controller))
);

/**
 * @swagger
 * /company/certificate/delete/{id}:
 *   delete:
 *     tags: [Certificate]
 *     summary: Delete certificate
 *     description: Delete specific certificate  by id
 *     parameters:
 *      - $ref: '#/components/parameters/Id'
 *     responses:
 *       200:
 *         $ref: '#/components/schemas/BaseResponse'
 *       400:
 *         description: Failed to delete certificate
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal Server Error
 */
router.delete(
  "/delete/:id",
  ...companyAdminRoleMiddlewares,
  requiredParamMiddleware(),
  asyncHandler(controller.deleteCertificate.bind(controller))
);
export default router;
