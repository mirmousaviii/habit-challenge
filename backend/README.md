# Habit Challenge

A simple habit tracker

## Backend

### Tech Stack

- **Node.js** – JavaScript runtime
- **TypeScript** – Strong typing and modern syntax
- **Express** – Web server and routing
- **uuid** – ID generation for habits and tokens
- **date-fns** – Streak and date utilities
- **dotenv** – Environment variable management
- **fs/promises** – File-based storage

### Installation & Running

#### Prerequisites

- Node.js 18+
- npm 9+

#### Setup & Start

```bash
git clone https://github.com/mirmousaviii/habit-challenge.git
cd habit-challenge/backend

npm install
cp .env.example .env
# (Optional) Edit .env to adjust port, repo type, or auth credentials

npm run dev    # for development
# or
npm run build && npm start  # for production
```

The API will be accessible at `http://localhost:3000` (or your configured PORT)

### Testing

This project uses [Jest](https://jestjs.io/) and [Supertest](https://github.com/ladjs/supertest) for backend testing.

```bash
npm test
```

### TODO

- [x] TypeScript + Express API setup
- [x] Modular folder structure (controller, service, repository, etc.)
- [x] Habit functionality
- [x] Toggle today's completion
- [x] Streak calculation logic
- [x] Last completed date (habit history)
- [x] In-memory & file-based repositories
- [x] Configurable repo type via `.env`
- [x] Authorization middleware (Bearer token)
- [x] Token memory store
- [x] Add base config by `.env.example`
- [x] Simple doc by README
- [x] Add unit tests
- [ ] Use a real authentication system (JWT + refresh token)
- [ ] Add user registration and habit ownership
- [ ] Add pagination to GET /habits
- [ ] Add timestamps (createdAt / updatedAt) to habits
- [ ] Use a real database (e.g. PostgreSQL)
- [ ] Dockerize the backend
- [ ] Add GitHub Actions for CI (lint, test, build, publish)
- [ ] Document the API using Swagger

### FAQ

##### What kind of project structure is used here?

This project uses a **Layered + Modular structure**, sometimes also referred to as **"Flat Layered Structure"**.  
The code is organized by technical responsibility:

- `controllers/` handle HTTP logic
- `services/` contain business logic
- `repositories/` manage persistence
- `auth/` is treated as a self-contained feature folder (hybrid)

##### Why not use a fully feature-based structure?

In a **feature-based structure**, code is organized by feature instead of layer.  

While this approach works well for larger teams or apps with many features, it can add **unnecessary complexity** in smaller projects or coding challenges.  

**This project uses a layered structure** to keep it:

- Simple and readable
- Familiar for most developers
- Easy to explain and extend

> However, the auth module is organized as a **feature folder** to demonstrate flexibility and show that feature-based architecture is also possible.

##### Why not use a fully Feature-Based folder structure (e.g., `habit/`, `auth/` as self-contained modules)?

A full Feature-Based Architecture is ideal when:

- You have many distinct domains or modules
- Teams are working in parallel on isolated features
- The application has grown in complexity

In this project, I used Feature-Based structure **selectively** (e.g., for `auth/`) where it made sense. Habit logic is more layered and cohesive, so a layered structure was a better fit for clarity and separation of concerns.

If the project grows further (e.g., adds users, analytics, scheduling), it can easily be refactored into full feature modules without major restructuring.

##### Why is the `auth.controller.ts` placed in a separate `auth/` folder and not in `controllers/`?

Because authentication is treated as a self-contained feature module. It includes not only a controller, but also user config and token management. Grouping these under `auth/` follows the feature-based organization principle.

##### How does the repository switching between memory and file work?

The repository type is controlled by the `REPO_TYPE` variable in the `.env` file. The app dynamically chooses the appropriate implementation (`InMemoryHabitRepository` or `FileHabitRepository`) at runtime.

##### Why are the habit route paths defined as `/habits` instead of just `/`?

To make the route definitions self-contained and clear. This approach improves readability and makes the routes reusable if mounted at different base paths.

##### Why is the folder name `services/` plural, but `config/` is singular?

Plural folder names like `services/`, `controllers/`, and `repositories/` hold multiple related files of the same type. `config/` is singular because it's a single entry point for project-wide configuration and doesn't represent a collection of similar components.

##### Why not use one big file for routes and logic?

While possible for small scripts, combining all logic into one file leads to tight coupling, poor readability, and difficulties in testing or extending the codebase. This project aims to reflect best practices in real-world development.

##### Why use a separate `config.ts` instead of directly reading from `process.env`?

Using a centralized `config.ts` file improves maintainability, helps avoid typos in environment variable names, and makes testing or mocking configurations easier.

## References

This project was inspired and guided by modern JavaScript and backend architecture practices. Notable references include:

- [Express.js Documentation](https://expressjs.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Clean Architecture Principles](https://dev.to/thatanjan/clean-architecture-in-node-js-2ehf)
- [Jest](https://jestjs.io/) – JavaScript testing framework
- [Supertest](https://github.com/ladjs/supertest) – HTTP assertions for integration testing
- [dotenv](https://github.com/motdotla/dotenv) – Environment variable support
- [date-fns](https://date-fns.org/) – Modern date utility library
- [Conventional Commits](https://www.conventionalcommits.org/) – For consistent commit messages
