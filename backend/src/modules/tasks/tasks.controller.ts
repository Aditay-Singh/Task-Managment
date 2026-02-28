import { Request, Response } from "express";
import prisma from "../../config/prisma";

/* ============================= */
/* GET ALL TASKS */
/* ============================= */
export const getTasks = async (req: any, res: Response) => {
  try {
    const { page = "1", limit = "10", status, search } = req.query;

    const skip = (Number(page) - 1) * Number(limit);

    const where: any = {
      userId: req.user.id,
    };

    if (status === "completed") {
      where.completed = true;
    }

    if (status === "pending") {
      where.completed = false;
    }

    if (search) {
      where.title = {
        contains: String(search),
        mode: "insensitive",
      };
    }

    const tasks = await prisma.task.findMany({
      where,
      skip,
      take: Number(limit),
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ============================= */
/* CREATE TASK */
/* ============================= */
export const createTask = async (req: any, res: Response) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        userId: req.user.id,
      },
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ============================= */
/* GET TASK BY ID */
/* ============================= */
export const getTaskById = async (req: any, res: Response) => {
  try {
    const task = await prisma.task.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ============================= */
/* UPDATE TASK */
/* ============================= */
export const updateTask = async (req: any, res: Response) => {
  try {
    const { title, description } = req.body;

    const existingTask = await prisma.task.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!existingTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    const updated = await prisma.task.update({
      where: { id: req.params.id },
      data: { title, description },
    });

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ============================= */
/* DELETE TASK */
/* ============================= */
export const deleteTask = async (req: any, res: Response) => {
  try {
    const existingTask = await prisma.task.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!existingTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    await prisma.task.delete({
      where: { id: req.params.id },
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ============================= */
/* TOGGLE TASK */
/* ============================= */
export const toggleTask = async (req: any, res: Response) => {
  try {
    const existingTask = await prisma.task.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!existingTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    const updated = await prisma.task.update({
      where: { id: req.params.id },
      data: { completed: !existingTask.completed },
    });

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};