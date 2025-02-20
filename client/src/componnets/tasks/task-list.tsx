import React from 'react';
import { Task } from '../../types/task';
import { getLocalTimeString, isOverdue } from "../../utils/date/date";
import { RiMoreLine } from "react-icons/ri";

/**
 * Lists for tasks component
 * User must be logged in to view this component
 */

interface TaskListProps {
    tasks: Task[];
    onEdit: (task: Task) => void;
    onDelete: (taskId: number) => void;
    onMarkDone: (taskId: number) => void;
    onUnmarkDone: (taskId: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({
    tasks,
    onEdit,
    onDelete,
    onMarkDone,
    onUnmarkDone
}) => {
    return (
        <div className="grid grid-cols-1 gap-4 mt-6">
            {tasks.length > 0 && tasks.map((task) => (
                <TaskItem 
                    key={task.id}
                    task={task}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onMarkDone={onMarkDone}
                    onUnmarkDone={onUnmarkDone}
                />
            ))}
        </div>
    );
};

interface TaskItemProps {
    task: Task;
    onEdit: (task: Task) => void;
    onDelete: (taskId: number) => void;
    onMarkDone: (taskId: number) => void;
    onUnmarkDone: (taskId: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
    task,
    onEdit,
    onDelete,
    onMarkDone,
    onUnmarkDone
}) => {
    const [showDropdown, setShowDropdown] = React.useState(false);

    return (
        <div className="border border-gray-200 p-4 rounded-lg hover:shadow-lg bg-white">
            <div className="flex flex-col justify-between items-start gap-4 md:flex-row">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                        <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: task.colour }}
                        ></div>
                        <h2 className="font-semibold text-lg truncate">
                            {task.task_name}
                        </h2>
                        <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                                task.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-green-100 text-green-800"
                            }`}
                        >
                            {task.status === "pending" ? "Pending" : "Completed"}
                        </span>
                        {isOverdue(task.end_time) && task.status === "pending" && (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                Overdue
                            </span>
                        )}
                    </div>

                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {task.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                            <span>{getLocalTimeString(new Date(task.start_time))}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span>{getLocalTimeString(new Date(task.end_time))}</span>
                        </div>
                        {task.tags && (
                            <div className="flex items-center gap-1">
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                    />
                                </svg>
                                <span>{task.tags}</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="relative">
                    <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="p-2 hover:bg-gray-100 rounded-full"
                    >
                        <RiMoreLine className="w-5 h-5" />
                    </button>

                    {showDropdown && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                            <div className="py-1">
                                <button
                                    onClick={() => {
                                        onEdit(task);
                                        setShowDropdown(false);
                                    }}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Edit
                                </button>
                                {task.status === "pending" ? (
                                    <button
                                        onClick={() => {
                                            onMarkDone(task.id!);
                                            setShowDropdown(false);
                                        }}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Mark as Done
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => {
                                            onUnmarkDone(task.id!);
                                            setShowDropdown(false);
                                        }}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Mark as Pending
                                    </button>
                                )}
                                <button
                                    onClick={() => {
                                        onDelete(task.id!);
                                        setShowDropdown(false);
                                    }}
                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TaskList;