import { Request, Response } from "express";
import EducationService from "../../services/client/education.service";
import { controllerResponse } from "../../utils/response.util";

class EducationController {
  private static instance: EducationController;
  private educationService: EducationService;
  constructor() {
    this.educationService = EducationService.getInstance();
  }
  static getInstance(): EducationController {
    if (!EducationController.instance) {
      EducationController.instance = new EducationController();
    }
    return EducationController.instance;
  }

  async addEducation(req: Request, res: Response): Promise<Response> {
    const result = await this.educationService.addEducation(
      req.body,
      req.curUser?.userId
    );
    return controllerResponse(res, result);
  }

  async getEducation(req: Request, res: Response): Promise<Response> {
    const result = await this.educationService.getEducation(
      req.body.data,
      req.curUser.role
    );
    return controllerResponse(res, result);
  }

  async getAllEducations(req: Request, res: Response): Promise<Response> {
    const result = await this.educationService.getAllEducations(
      req.params.userId,
      req.curUser.role
    );
    return controllerResponse(res, result);
  }

  async updateEducation(req: Request, res: Response): Promise<Response> {
    const result = await this.educationService.updateEducation(
      req.body,
      req.params.id
    );
    return controllerResponse(res, result);
  }

  async deleteEducation(req: Request, res: Response): Promise<Response> {
    const result = await this.educationService.deleteEducation(req.params.id);
    return controllerResponse(res, result);
  }
}

export default EducationController;
