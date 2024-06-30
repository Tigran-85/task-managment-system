import TaskController from "../controllers/TaskController.js";
const taskController = new TaskController();

// validators
import TaskValidation from "../common/validation/TaskValidation.js";
import authMiddleware from "../middlewares/authMiddleware.js";

import { Router } from "express";
const router = Router();

router.get(
    '/',
    authMiddleware,
    taskController
      .getTasks.bind(taskController)
);

router.post(
    '/create',
    authMiddleware,
    taskController
      .createTask.bind(taskController)
);

router.get(
    '/:id',
    authMiddleware,
    taskController
      .getTaskById.bind(taskController)
);

router.put(
    '/update/:id',
    authMiddleware,
    taskController
      .updateTask.bind(taskController)
);

router.put(
  '/update/status/:id',
  authMiddleware,
  TaskValidation,
  taskController
    .updateTaskStatus.bind(taskController)
);

router.delete(
    '/delete/:id',
    authMiddleware,
    taskController
      .deleteTask.bind(taskController)
);


export default router;