import { sequelize } from "../db/config";
import { Task, TaskCreateData, PaginationParams } from "../types/task";
import { getLocalTimeString } from "../helper/date";

export class TaskRepository {
    async createTask(taskData: TaskCreateData): Promise<Task | null> {
        const mysqlEndTime = getLocalTimeString(new Date(taskData.end_time));
        const currentTime = getLocalTimeString(new Date());
        
        const [result] = await sequelize.query(
            `INSERT INTO tasks (project_id, title, description, status, end_time, assigned_to, task_json, priority, createdAt, updatedAt)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            {
                replacements: [
                    taskData.project_id,
                    taskData.title,
                    taskData.description,
                    taskData.status,
                    mysqlEndTime,
                    taskData.assigned_to,
                    JSON.stringify(taskData.task_json),
                    taskData.priority,
                    currentTime,
                    currentTime
                ]
            }
        );
        return this.getTaskById((result as any).insertId);
    }

    async getAllTasks(pagination: PaginationParams): Promise<{ tasks: Task[], total: number }> {
        const offset = (pagination.page - 1) * pagination.limit;
        const [tasks, metadata] = await sequelize.query(
            `SELECT * FROM tasks LIMIT ? OFFSET ?`,
            {
                replacements: [pagination.limit, offset]
            }
        );
        
        const [totalCount] = await sequelize.query(
            `SELECT COUNT(*) as count FROM tasks`
        );
        
        return {
            tasks: tasks as Task[],
            total: (totalCount as any)[0].count
        };
    }

    async getTaskById(id: number): Promise<Task | null> {
        const [tasks] = await sequelize.query(
            `SELECT * FROM tasks WHERE id = ?`,
            {
                replacements: [id]
            }
        );
        return (tasks as Task[])[0] || null;
    }

    async getTasksByProjectId(projectId: number, status?: string): Promise<Task[]> {
        let query = `SELECT * FROM tasks WHERE project_id = ?`;
        const replacements: any[] = [projectId];

        if (status) {
            query += ` AND status = ?`;
            replacements.push(status);
        }

        const [tasks] = await sequelize.query(query, { replacements });
        return tasks as Task[];
    }

    async updateTask(id: number, taskData: Partial<TaskCreateData>): Promise<Task | null> {
        const currentTime = getLocalTimeString(new Date());
        const updates: string[] = [];
        const values: any[] = [];

        Object.entries(taskData).forEach(([key, value]) => {
            if (value !== undefined) {
                if (key === 'end_time') {
                    value = getLocalTimeString(new Date());
                }
                if (key === 'task_json') {
                    value = JSON.stringify(value);
                }
                updates.push(`${key} = ?`);
                values.push(value);
            }
        });

        updates.push('updatedAt = ?');
        values.push(currentTime);
        values.push(id);

        await sequelize.query(
            `UPDATE tasks SET ${updates.join(', ')} WHERE id = ?`,
            { replacements: values }
        );

        return this.getTaskById(id);
    }

    async deleteTask(id: number): Promise<boolean> {
        const [result] = await sequelize.query(
            `DELETE FROM tasks WHERE id = ?`,
            {
                replacements: [id]
            }
        );
        return (result as any).affectedRows > 0;
    }
}
