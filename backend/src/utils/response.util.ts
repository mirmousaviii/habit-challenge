
/**
 * @todo Refactor this utility to use a library for standardized HTTP responses.
 * @todo Implement this functionality as a middleware for better integration with Express.
 */

import { Response } from 'express';

interface ErrorResponse {
  error: {
    code?: string;
    message: string;
    details?: unknown;
  };
}

interface SuccessResponse<T = unknown> {
  data?: T;
  message?: string;
}

/**
 * Sends a standardized error response.
 *
 * @param res - Express response object
 * @param status - HTTP status code
 * @param message - Error message
 * @param code - Optional error code
 * @param details - Optional additional error details
 * @returns The Express response object
 */
export const errorResponse = (
  res: Response,
  status: number,
  message: string,
  code?: string,
  details?: unknown
): Response => {
  const response: ErrorResponse = {
    error: {
      message,
      code,
      details,
    },
  };

  return res.status(status).json(response);
};

/**
 * Sends a standardized success response.
 *
 * @param res - Express response object
 * @param status - HTTP status code (default: 200)
 * @param data - Optional data to return
 * @param message - Optional success message
 * @returns The Express response object
 */
export const successResponse = <T = unknown>(
  res: Response,
  status = 200,
  data?: T,
  message?: string
): Response => {
  const response: SuccessResponse<T> = {};
  
  if (data !== undefined) {
    response.data = data;
  }
  
  if (message) {
    response.message = message;
  }

  return res.status(status).json(response);
};

/**
 * Sends a standardized 201 Created response.
 * This is an alias for successResponse with status 201.
 *
 * @param res - Express response object
 * @param data - Optional data to return
 * @param message - Optional success message
 * @returns The Express response object
 */
export const createdResponse = <T = unknown>(
  res: Response,
  data?: T,
  message?: string
): Response => {
  return successResponse(res, 201, data, message);
};

/**
 * Sends a proper RESTful 204 No Content response.
 * This is typically used for successful DELETE operations.
 *
 * @param res - Express response object
 * @returns The Express response object
 */
export const noContentResponse = (res: Response): Response => {
  return res.status(204).send();
};

/**
 * Sends a standardized 404 Not Found error response.
 * This is an alias for errorResponse with status 404.
 *
 * @param res - Express response object
 * @param message - Error message (default: "Resource not found")
 * @param code - Optional error code (default: "NOT_FOUND")
 * @returns The Express response object
 */
export const notFoundResponse = (
  res: Response,
  message = "Resource not found",
  code = "NOT_FOUND"
): Response => {
  return errorResponse(res, 404, message, code);
};

/**
 * Sends a standardized 401 Unauthorized error response.
 * This is an alias for errorResponse with status 401.
 *
 * @param res - Express response object
 * @param message - Error message (default: "Unauthorized")
 * @param code - Optional error code (default: "UNAUTHORIZED")
 * @returns The Express response object
 */
export const unauthorizedResponse = (
  res: Response,
  message = "Unauthorized",
  code = "UNAUTHORIZED"
): Response => {
  return errorResponse(res, 401, message, code);
};

/**
 * Sends a standardized 403 Forbidden error response.
 * This is an alias for errorResponse with status 403.
 *
 * @param res - Express response object
 * @param message - Error message (default: "Forbidden")
 * @param code - Optional error code (default: "FORBIDDEN")
 * @returns The Express response object
 */
export const forbiddenResponse = (
  res: Response,
  message = "Forbidden",
  code = "FORBIDDEN"
): Response => {
  return errorResponse(res, 403, message, code);
};

/**
 * Sends a standardized 409 Conflict error response.
 * This is typically used when the request conflicts with the current state of the server.
 *
 * @param res - Express response object
 * @param message - Error message (default: "Conflict")
 * @param code - Optional error code (default: "CONFLICT")
 * @returns The Express response object
 */
export const conflictResponse = (
  res: Response,
  message = "Conflict",
  code = "CONFLICT"
): Response => {
  return errorResponse(res, 409, message, code);
};

/**
 * Sends a standardized 422 Unprocessable Entity error response.
 * This is typically used for validation errors.
 *
 * @param res - Express response object
 * @param message - Error message (default: "Validation failed")
 * @param code - Optional error code (default: "VALIDATION_ERROR")
 * @param details - Optional validation error details
 * @returns The Express response object
 */
export const validationErrorResponse = (
  res: Response,
  message = "Validation failed",
  code = "VALIDATION_ERROR",
  details?: unknown
): Response => {
  return errorResponse(res, 422, message, code, details);
};

/**
 * Sends a standardized 429 Too Many Requests error response.
 * This is typically used for rate limiting.
 *
 * @param res - Express response object
 * @param message - Error message (default: "Too many requests")
 * @param code - Optional error code (default: "RATE_LIMIT_EXCEEDED")
 * @returns The Express response object
 */
export const tooManyRequestsResponse = (
  res: Response,
  message = "Too many requests",
  code = "RATE_LIMIT_EXCEEDED"
): Response => {
  return errorResponse(res, 429, message, code);
};

/**
 * Sends a standardized 503 Service Unavailable error response.
 * This is typically used when the service is temporarily unavailable.
 *
 * @param res - Express response object
 * @param message - Error message (default: "Service unavailable")
 * @param code - Optional error code (default: "SERVICE_UNAVAILABLE")
 * @returns The Express response object
 */
export const serviceUnavailableResponse = (
  res: Response,
  message = "Service unavailable",
  code = "SERVICE_UNAVAILABLE"
): Response => {
  return errorResponse(res, 503, message, code);
};

/**
 * Sends a standardized 400 Bad Request error response.
 * This is typically used for invalid requests.
 *
 * @param res - Express response object
 * @param message - Error message (default: "Bad request")
 * @param code - Optional error code (default: "BAD_REQUEST")
 * @param details - Optional error details
 * @returns The Express response object
 */
export const badRequestResponse = (
  res: Response,
  message = "Bad request",
  code = "BAD_REQUEST",
  details?: unknown
): Response => {
  return errorResponse(res, 400, message, code, details);
};

/**
 * Sends a standardized 405 Method Not Allowed error response.
 * This is typically used when the HTTP method is not allowed.
 *
 * @param res - Express response object
 * @param message - Error message (default: "Method not allowed")
 * @param code - Optional error code (default: "METHOD_NOT_ALLOWED")
 * @returns The Express response object
 */
export const methodNotAllowedResponse = (
  res: Response,
  message = "Method not allowed",
  code = "METHOD_NOT_ALLOWED"
): Response => {
  return errorResponse(res, 405, message, code);
};

/**
 * Sends a standardized 408 Request Timeout error response.
 * This is typically used when the request times out.
 *
 * @param res - Express response object
 * @param message - Error message (default: "Request timeout")
 * @param code - Optional error code (default: "REQUEST_TIMEOUT")
 * @returns The Express response object
 */
export const requestTimeoutResponse = (
  res: Response,
  message = "Request timeout",
  code = "REQUEST_TIMEOUT"
): Response => {
  return errorResponse(res, 408, message, code);
};

/**
 * Sends a standardized 413 Payload Too Large error response.
 * This is typically used when the request payload is too large.
 *
 * @param res - Express response object
 * @param message - Error message (default: "Payload too large")
 * @param code - Optional error code (default: "PAYLOAD_TOO_LARGE")
 * @returns The Express response object
 */
export const payloadTooLargeResponse = (
  res: Response,
  message = "Payload too large",
  code = "PAYLOAD_TOO_LARGE"
): Response => {
  return errorResponse(res, 413, message, code);
};

/**
 * Sends a standardized 415 Unsupported Media Type error response.
 * This is typically used when the content type is not supported.
 *
 * @param res - Express response object
 * @param message - Error message (default: "Unsupported media type")
 * @param code - Optional error code (default: "UNSUPPORTED_MEDIA_TYPE")
 * @returns The Express response object
 */
export const unsupportedMediaTypeResponse = (
  res: Response,
  message = "Unsupported media type",
  code = "UNSUPPORTED_MEDIA_TYPE"
): Response => {
  return errorResponse(res, 415, message, code);
};

/**
 * Sends a standardized 500 Internal Server Error response.
 * This is typically used for server errors.
 *
 * @param res - Express response object
 * @param message - Error message (default: "Internal server error")
 * @param code - Optional error code (default: "INTERNAL_SERVER_ERROR")
 * @param details - Optional error details
 * @returns The Express response object
 */
export const internalServerErrorResponse = (
  res: Response,
  message = "Internal server error",
  code = "INTERNAL_SERVER_ERROR",
  details?: unknown
): Response => {
  return errorResponse(res, 500, message, code, details);
};

/**
 * Sends a standardized 502 Bad Gateway error response.
 * This is typically used for gateway errors.
 *
 * @param res - Express response object
 * @param message - Error message (default: "Bad gateway")
 * @param code - Optional error code (default: "BAD_GATEWAY")
 * @returns The Express response object
 */
export const badGatewayResponse = (
  res: Response,
  message = "Bad gateway",
  code = "BAD_GATEWAY"
): Response => {
  return errorResponse(res, 502, message, code);
};

/**
 * Sends a standardized 504 Gateway Timeout error response.
 * This is typically used for gateway timeouts.
 *
 * @param res - Express response object
 * @param message - Error message (default: "Gateway timeout")
 * @param code - Optional error code (default: "GATEWAY_TIMEOUT")
 * @returns The Express response object
 */
export const gatewayTimeoutResponse = (
  res: Response,
  message = "Gateway timeout",
  code = "GATEWAY_TIMEOUT"
): Response => {
  return errorResponse(res, 504, message, code);
};
