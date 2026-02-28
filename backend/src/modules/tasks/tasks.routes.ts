import { Router } from "express";
import {
  getTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  toggleTask,
} from "./tasks.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

// Apply auth middleware
router.use(authMiddleware);

// Task routes
router.get("/", getTasks);                // GET all tasks
router.post("/", createTask);             // CREATE a task
router.get("/:id", getTaskById);          // GET single task by id
router.put("/:id", updateTask);           // UPDATE a task (matches frontend PUT)
router.delete("/:id", deleteTask);        // DELETE a task
router.patch("/:id/toggle", toggleTask);  // TOGGLE completion

export default router;