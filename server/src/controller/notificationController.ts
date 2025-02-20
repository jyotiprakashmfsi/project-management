import { Response, Request } from "express";
import { NotificationService } from "../service/notificationService";

const notificationService = new NotificationService();

export const checkApproachingTasks = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const tasks = await notificationService.getApproachingTasks(id);
    res.status(200).json({ data: tasks });
  } catch (error) {
    console.error('Error checking approaching tasks:', error);
    res.status(500).json({ error: 'Failed to check approaching tasks' });
  }
};

export const checkOverdueTasks = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const tasks = await notificationService.getOverdueTasks(id);
    res.status(200).json({ data: tasks });
  } catch (error) {
    console.error('Error checking overdue tasks:', error);
    res.status(500).json({ error: 'Failed to check overdue tasks' });
  }
};
