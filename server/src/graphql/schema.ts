import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { registerResolver } from "./resolvers/auth/register.resolver";
import { registerTypeDefs } from "./schemas/auth/register.schema";
import { profileTypeDefs } from "./schemas/client/profile.schema";
import { userTypeDefs } from "./schemas/client/user.schema";
import { securityTypeDefs } from "./schemas/client/security.schema";
import { userResolver } from "./resolvers/profiles/user.resolver";
import { profileResolver } from "./resolvers/profiles/profile.resolver";
import { SecurityResolver } from "./resolvers/profiles/security.resolver";
import { interestResolver } from "./resolvers/profiles/interest.resolver";
import { interestTypDefs } from "./schemas/client/interest.schema";

export const typeDefs = mergeTypeDefs([
  registerTypeDefs,
  userTypeDefs,
  profileTypeDefs,
  securityTypeDefs,
  interestTypDefs,
]);

export const resolvers = mergeResolvers([
  registerResolver,
  userResolver,
  profileResolver,
  SecurityResolver,
  interestResolver,
]);

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
