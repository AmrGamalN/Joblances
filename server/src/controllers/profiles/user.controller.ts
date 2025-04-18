import { Request, Response } from "express";
import UserService from "../../services/profiles/user.service";
import { GraphQLResolveInfo } from "graphql";
import { responseHandler } from "../../utils/responseHandler";
import { controllerResponse } from "../../utils/responseHandler";

class UserController {
  private static instance: UserController;
  private userService: UserService;
  constructor() {
    this.userService = UserService.getInstance();
  }
  static getInstance(): UserController {
    if (!UserController.instance) {
      UserController.instance = new UserController();
    }
    return UserController.instance;
  }

  // Get user by graphQl
  async getUser(
    parent: any,
    args: {
      userId: string;
    },
    context: { req: Request; res: Response },
    info: GraphQLResolveInfo
  ): Promise<responseHandler> {
    const userId = args.userId ? args.userId : context.req.curUser?.userId;
    const result = await this.userService.getUser(userId, info);
    if (!result.success) return result;
    return result;
  }

  // Get all user by graphQl
  async getAllUsers(
    parent: any,
    args: {
      page: number;
      limit: number;
    },
    context: { req: Request; res: Response },
    info: GraphQLResolveInfo
  ): Promise<responseHandler> {
    const result = await this.userService.getAllUsers(args, info);
    if (!result.success) result;
    return result;
  }

  // Update user by rest api
  async updateUser(req: Request, res: Response): Promise<Response> {
    const query = req.params.userId
      ? { _id: req.params.userId }
      : { userId: req.curUser?.userId };
    const result = await this.userService.updateUser(req.body, query);
    return controllerResponse(res, result);
  }
}

export default UserController;
