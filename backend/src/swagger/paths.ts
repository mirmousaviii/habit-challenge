import { authPaths } from "./paths/auth.paths";
import { habitsPaths } from "./paths/habits.paths";

export const paths = {
  ...authPaths,
  ...habitsPaths,
}; 