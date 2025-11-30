# project structure
MERN Naval Management — Minimal scaffold

Backend:
  - Node/Express app in /backend
  - Models: User, Officer, Sailor, Division
  - Middlewares: authMiddleware, roleMiddleware, errorMiddleware
  - RBAC helper: utils/rbac.js
  - Use .env.example to create .env and set MONGODB_URI and JWT_SECRET
  - npm install && npm run dev

Frontend:
  - Vite + React in /frontend
  - AuthContext for auth state
  - src/utils/axios.js custom axios instance that attaches JWT
  - npm install && npm run dev

Notes:
  - This is a scaffold. Field-level RBAC is implemented as a helper but you should enforce policies in controllers for your needs.
  - Add validation and more robust error handling before production.


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
