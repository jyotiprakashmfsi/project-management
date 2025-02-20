import React, { useEffect, useState } from "react";
import { RiAddFill } from "react-icons/ri";
import { useUser } from "../../context/UserContext";
import { tasksService } from "../../services/tasks/api";
import { getLocalTimeString } from "../../utils/date/date";
import { Task } from "../../types/task";
import TaskList from "./task-list";
import TaskModal from "./task-modal";

/**
 * Component to display, modify, and delete tasks
 * User must be logged in to view this component
 */

export default function TaskComponent() {
  const { user, token } = useUser();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const formatDateForAPI = (dateStr: string) => {
    return new Date(dateStr).toISOString();
  };

  const [newTask, setNewTask] = useState<Task>({
    task_name: "",
    description: "",
    end_time: getLocalTimeString(new Date(Date.now() + 5 * 60000)),
    start_time: getLocalTimeString(new Date()),
    tags: "",
    repeat_freq: 0,
    remind_time: 5,
    colour: "#87CEEB",
    user_id: user?.id || 0,
    status: "pending",
  });

  const handleNewTask = () => {
    setIsModalOpen(true);
    setEditingTask(null);
    setNewTask({
      task_name: "",
      description: "",
      end_time: getLocalTimeString(new Date(Date.now() + 5 * 60000)),
      start_time: getLocalTimeString(new Date()),
      tags: "",
      repeat_freq: 0,
      remind_time: 5,
      colour: "#87CEEB",
      user_id: user?.id || 0,
      status: "pending",
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const taskToSend = {
      ...newTask,
      start_time: formatDateForAPI(newTask.start_time),
      end_time: formatDateForAPI(newTask.end_time),
      user_id: user?.id || 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      if (editingTask?.id) {
        await tasksService.updateTask(taskToSend, editingTask.id, token || "");
      } else {
        await tasksService.createTask(taskToSend, token || "");
      }
      fetchTasks();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const handleEditClick = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
    setNewTask({
      ...task,
      start_time: task.start_time.slice(0, 16),
      end_time: task.end_time.slice(0, 16),
    });
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      await tasksService.deleteTask(taskId, token || "");
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleMarkDone = async (taskId: number) => {
    try {
      await tasksService.markDone(taskId, token || "");
      fetchTasks();
    } catch (error) {
      console.error("Error marking task as done:", error);
    }
  };

  const handleUnmarkDone = async (taskId: number) => {
    try {
      await tasksService.unmarkDone(taskId, token || "");
      fetchTasks();
    } catch (error) {
      console.error("Error unmarking task:", error);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchTasks();
    }
  }, [user?.id, currentPage]);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const response = await tasksService.getTasks(user?.id || 0, token || "", currentPage);
      setTasks(response.tasks);
      setTotalPages(response.pagination.total_pages);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if(isLoading){
    return (
      <div>
        Loading...
      </div>
    )
  }

  return (
    <div className="w-full text-black">
      <div className="flex justify-between items-center flex-row mb-6">
        <h1 className="text-2xl text-black font-bold">Tasks</h1>
        <button
          className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
          onClick={handleNewTask}
        >
          <RiAddFill />
          Add Task
        </button>
      </div>

      <TaskList
        tasks={tasks}
        onEdit={handleEditClick}
        onDelete={handleDeleteTask}
        onMarkDone={handleMarkDone}
        onUnmarkDone={handleUnmarkDone}
      />

      <TaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        task={newTask}
        onSubmit={handleSubmit}
        onChange={handleInputChange}
        isEditing={!!editingTask}
      />

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-100 rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-3 py-1">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-100 rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
