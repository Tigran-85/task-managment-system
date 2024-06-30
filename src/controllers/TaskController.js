import TaskService from "../services/TaskService.js";

class TaskController {

  constructor() {
    this.taskService = new TaskService()
  }

  async createTask(req, res, next) {
    const data = await this.taskService.createTask(req, res, next);
    if (data) {
      res.status(data.statusCode).json(data);
    }
  }

  async getTasks(req, res, next) {
    const data = await this.taskService.getTasks(req, res, next);
    if (data) {
      res.status(data.statusCode).json(data);
    }
  }

  async getTaskById(req, res, next) {
    const data = await this.taskService.getTaskById(req, res, next);
    if (data) {
      res.status(data.statusCode).json(data);
    }
  }

  async updateTask(req, res, next) {
    const data = await this.taskService.updateTask(req, res, next);
    if (data) {
      res.status(data.statusCode).json(data);
    }
  }

  async updateTaskStatus(req, res, next) {
    const data = await this.taskService.updateTaskStatus(req, res, next);
    if (data) {
      res.status(data.statusCode).json(data);
    }
  }

  async deleteTask(req, res, next) {
    const data = await this.taskService.deleteTask(req, res, next);
    if (data) {
      res.status(data.statusCode).json(data);
    }
  }

}

export default TaskController;