/**
 * NOTE:
 * This file currently includes both the main Auth model and the DTO for login functionality.
 * In a future cleanup step, it is recommended to split them into:
 *
 * - auth.model.ts         → contains the main Auth entity/interface
 * - auth.dto.ts           → contains LoginDto and other data transfer objects
 * - auth.types.ts         → contains extended types like AuthWithMeta, etc.
 */

export interface LoginDto {
  username: string;
  password: string;
}
