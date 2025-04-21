export const authPaths = {
  "/auth/login": {
    post: {
      tags: ["Authentication"],
      summary: "Login user",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/LoginDto",
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Login successful",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  token: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        "401": {
          description: "Invalid credentials",
        },
      },
    },
  },
}; 