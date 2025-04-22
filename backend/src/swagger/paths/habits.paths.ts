export const habitsPaths = {
  "/habits": {
    get: {
      tags: ["Habits"],
      summary: "Get all habits",
      security: [{ bearerAuth: [] }],
      responses: {
        "200": {
          description: "List of habits",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/Habit",
                },
              },
            },
          },
        },
      },
    },
    post: {
      tags: ["Habits"],
      summary: "Create a new habit",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/HabitCreateDto",
            },
          },
        },
      },
      responses: {
        "201": {
          description: "Habit created successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Habit",
              },
            },
          },
        },
        "400": {
          description: "Bad request - Missing required fields",
        },
      },
    },
  },
  "/habits/{id}/toggle": {
    patch: {
      tags: ["Habits"],
      summary: "Toggle habit completion status for today",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        "200": {
          description: "Habit status updated successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Habit",
              },
            },
          },
        },
        "404": {
          description: "Habit not found",
        },
      },
    },
  },
  "/habits/{id}": {
    delete: {
      tags: ["Habits"],
      summary: "Delete a habit",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        "204": {
          description: "Habit deleted successfully",
        },
        "404": {
          description: "Habit not found",
        },
      },
    },
  },
}; 