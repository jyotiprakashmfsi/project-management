import { Router } from "express";
import authRoutes from "./authRoutes";
import protectedRoutes from "./protectedRoutes";
import userRoutes from "./userRoutes";
import notifRouter from "./notifRoutes";
import projectUsersRoutes from "./projectUsersRoutes";
import projectRoute from "./projectRoutes";
import tasksRoutes from "./taskRoutes";

const appRouter = Router();

appRouter.use("/auth", authRoutes);
appRouter.use("/tasks", tasksRoutes);
appRouter.use("/testAuth", protectedRoutes);
appRouter.use("/users", userRoutes);
appRouter.use("/notifications", notifRouter);
appRouter.use("/project-users", projectUsersRoutes)
appRouter.use("/projects", projectRoute)


export default appRouter;