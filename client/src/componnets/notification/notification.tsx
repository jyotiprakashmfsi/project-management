import React, { useEffect, useState } from "react";
import { NotificationApi } from "../../services/notification/api";
import { useUser } from "../../context/UserContext";
import { tasksService } from "../../services/tasks/api";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoNotifications } from "react-icons/io5";
import { Task } from "../../types/task";

interface TaskWithType extends Task {
  notificationType: "approaching" | "overdue";
}

const NotificationComponent: React.FC = () => {
  const [notifications, setNotifications] = useState<TaskWithType[]>([]);
  const [selectedTask, setSelectedTask] = useState<TaskWithType | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { user, token } = useUser();

  const fetchNotifications = async () => {
    if (!user?.id || !token) return;

    try {
      const approaching = await NotificationApi.approachingTasks(
          user.id,
          token
        ),
        overdue = await NotificationApi.overdueTasks(user.id, token);

      const approachingWithType = approaching.map((task: Task) => ({
        ...task,
        notificationType: "approaching" as const,
      }));

      const overdueWithType = overdue.map((task: Task) => ({
        ...task,
        notificationType: "overdue" as const,
      }));

      setNotifications([...overdueWithType, ...approachingWithType]);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    // fetch notifications every minute
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, [user, token]);

  const handleTaskClick = (task: TaskWithType) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleMarkAsDone = async () => {
    if (!selectedTask?.id || !token) return;

    try {
      await tasksService.markDone(selectedTask.id, token);
      setShowModal(false);
      setSelectedTask(null);
      fetchNotifications();
    } catch (error) {
      console.error("Error marking task as done:", error);
    }
  };

  const handleCloseNotification = (taskId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setNotifications((prev) => prev.filter((task) => task.id !== taskId));
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  if (notifications.length === 0) return null;

  return (
    <>
      <div className="z-50 -mt-2">
        <div className="relative">
          <button
            className="notification-icon p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 relative"
            onClick={toggleNotifications}
          >
            {showNotifications ? (
              <IoNotifications className="w-6 h-6 text-gray-700" />
            ) : (
              <>
                <IoMdNotificationsOutline className="w-6 h-6 text-gray-700" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </>
            )}
          </button>

          {showNotifications && (
            <div className="notifications-container absolute top-full right-0 mt-2 w-80 md:w-xl bg-white rounded-lg shadow-xl max-h-[80vh] overflow-hidden">
              <div className="p-3 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-medium text-gray-900">Notifications</h3>
                <span className="text-sm text-gray-500">
                  {notifications.length} notifications
                </span>
              </div>

              <div className="overflow-y-auto max-h-[calc(80vh-4rem)]">
                <div className="p-2 space-y-2">
                  {notifications.map((task) => (
                    <div
                      key={task.id}
                      className={`bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors duration-200 border-l-4 relative ${
                        task.notificationType === "overdue"
                          ? "border-red-500"
                          : "border-yellow-500"
                      }`}
                    >
                      <div
                        onClick={() => handleTaskClick(task)}
                        className="cursor-pointer"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center  gap-2">
                            {task.colour && <div
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: task.colour }}
                            ></div>}
                            
                            <h3 className="font-medium text-gray-900">
                              {task.task_name}
                            </h3>
                            <div className=" flex items-center gap-2">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  task.notificationType === "overdue"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {task.notificationType === "overdue"
                                  ? "Overdue"
                                  : "Due Soon"}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={(e) =>
                              task.id && handleCloseNotification(task.id, e)
                            }
                            className="ml-2 p-1 hover:bg-gray-200 rounded-full transition-colors duration-200"
                          >
                            <svg
                              className="w-4 h-4 text-gray-500 hover:text-gray-700"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {task.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showModal && selectedTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-[90vw] md:max-w-md">
            <div className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
                <h2 className="text-lg md:text-xl font-semibold">
                  Task Details
                </h2>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full self-start md:self-center ${
                    selectedTask.notificationType === "overdue"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {selectedTask.notificationType === "overdue"
                    ? "Overdue"
                    : "Due Soon"}
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <div
                    className={`w-3 h-3 rounded-full mt-1.5 bg-${selectedTask.colour}`}
                  ></div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {selectedTask.task_name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {selectedTask.description}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-500">
                    Due: {new Date(selectedTask.end_time).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex flex-col-reverse md:flex-row justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors w-full md:w-auto"
                >
                  Dismiss
                </button>
                <button
                  onClick={handleMarkAsDone}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors w-full md:w-auto"
                >
                  Mark as Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationComponent;
