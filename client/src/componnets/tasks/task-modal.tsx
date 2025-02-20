import React from 'react';
import { Task } from '../../types/task';

/**
 * Modal for tasks component
 * User must be logged in to view this component
 */

interface TaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    task: Task;
    onSubmit: (e: React.FormEvent) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    isEditing: boolean;
}

const TaskModal: React.FC<TaskModalProps> = ({
    isOpen,
    onClose,
    task,
    onSubmit,
    onChange,
    isEditing
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">
                    {isEditing ? "Edit Task" : "Add New Task"}
                </h2>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Task Name
                        </label>
                        <input
                            type="text"
                            name="task_name"
                            value={task.task_name}
                            onChange={onChange}
                            className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={task.description}
                            onChange={onChange}
                            className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            rows={3}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Start Time
                            </label>
                            <input
                                type="datetime-local"
                                name="start_time"
                                value={task.start_time}
                                onChange={onChange}
                                className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                End Time
                            </label>
                            <input
                                type="datetime-local"
                                name="end_time"
                                value={task.end_time}
                                onChange={onChange}
                                className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Tags
                        </label>
                        <input
                            type="text"
                            name="tags"
                            value={task.tags}
                            onChange={onChange}
                            className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="Separate tags with commas"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Remind Time (minutes)
                        </label>
                        <input
                            type="number"
                            name="remind_time"
                            value={task.remind_time}
                            onChange={onChange}
                            min="0"
                            className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Color
                        </label>
                        <input
                            type="color"
                            name="colour"
                            value={task.colour}
                            onChange={onChange}
                            className="w-full h-10 p-1 rounded-md"
                        />
                    </div>

                    <div className="flex justify-end gap-4 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
                        >
                            {isEditing ? "Update Task" : "Create Task"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskModal;
