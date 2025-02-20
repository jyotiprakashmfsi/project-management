import { sequelize } from "../db/config";
import { Task } from "../types/task";

export class NotificationRepository {
    async getApproachingTasks(userId: string): Promise<Task[]> {
        const now = new Date();
        const fiveMinsFromNow = new Date(now.getTime() + 5 * 60 * 1000);

        const tasks = await sequelize.query(
            'SELECT * FROM tasks WHERE status = "pending" AND end_time BETWEEN ? AND ? AND user_id = ?',
            {
                replacements: [now, fiveMinsFromNow, userId],
                type: sequelize.QueryTypes.SELECT
            }
        ) as Task[];

        return tasks;
    }

    async getOverdueTasks(userId: string): Promise<Task[]> {
        const now = new Date();

        const tasks = await sequelize.query(
            'SELECT * FROM tasks WHERE status = "pending" AND end_time < ? AND user_id = ?',
            {
                replacements: [now, userId],
                type: sequelize.QueryTypes.SELECT
            }
        ) as Task[];

        return tasks;
    }
}
