import { Request, Response } from "express";
import ProfileService from "../../services/profiles/profile.service";
import { GraphQLResolveInfo } from "graphql";
import { responseHandler } from "../../utils/responseHandler";
import { handleApiResponse } from "../../utils/responseHandler";

class ProfileController {
  private static instance: ProfileController;
  private profileService: ProfileService;
  constructor() {
    this.profileService = ProfileService.getInstance();
  }
  static getInstance(): ProfileController {
    if (!ProfileController.instance) {
      ProfileController.instance = new ProfileController();
    }
    return ProfileController.instance;
  }

  // Get profile by graphQl
  async getProfile(
    parent: any,
    args: {
      userId: string;
    },
    context: { req: Request; res: Response },
    info: GraphQLResolveInfo
  ): Promise<responseHandler> {
    const userId = args.userId ? args.userId : context.req.curUser?.userId;
    const result = await this.profileService.getProfile(userId, info);
    if (!result.success) return result;
    return result;
  }

  // Get all profile by graphQl
  async getAllProfiles(
    parent: any,
    args: {
      page: number;
      limit: number;
    },
    context: { req: Request; res: Response },
    info: GraphQLResolveInfo
  ): Promise<responseHandler> {
    const result = await this.profileService.getAllProfiles(args, info);
    if (!result.success) result;
    return result;
  }

  // Get profile by link and using rst api
  async getProfileByLink(req: Request, res: Response): Promise<Response> {
    const query = req.params.profileId
      ? { profileLink: process.env.BACKEND_URL +req.originalUrl }
      : { profileLink: req.curUser?.profileLink };
    const result = await this.profileService.getProfileByLink(query);
    return handleApiResponse(res, result);
  }

  // Update profile by rest api
  async updateProfile(req: Request, res: Response): Promise<Response> {
    const query = req.params.profileId
      ? { _id: req.params.profileId }
      : { userId: req.curUser?.userId };
    const result = await this.profileService.updateProfile(req.body, query);
    return handleApiResponse(res, result);
  }
}

export default ProfileController;
