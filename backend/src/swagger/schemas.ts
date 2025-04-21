export const schemas = {
  LoginDto: {
    type: "object",
    properties: {
      username: {
        type: "string",
        example: "admin",
      },
      password: {
        type: "string",
        example: "admin123",
      },
    },
    required: ["username", "password"],
  },
  HabitCreateDto: {
    type: "object",
    properties: {
      name: {
        type: "string",
        example: "Reading",
      },
      description: {
        type: "string",
        example: "Read 30 minutes every day",
      },
    },
    required: ["name"],
  },
  Habit: {
    type: "object",
    properties: {
      id: {
        type: "string",
        example: "123e4567-e89b-12d3-a456-426614174000",
      },
      name: {
        type: "string",
        example: "Reading",
      },
      description: {
        type: "string",
        example: "Read 30 minutes every day",
      },
      completed: {
        type: "boolean",
        example: false,
      },
      createdAt: {
        type: "string",
        format: "date-time",
      },
      updatedAt: {
        type: "string",
        format: "date-time",
      },
    },
  },
}; 