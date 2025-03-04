import Sidebar from "../../componnets/sidebar";
import TaskDetails from "../../componnets/tasks/task-details";

export default function TasksPage() {
  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      <div>
        <Sidebar />
      </div>
      <div className="flex-1 w-full">
        <div className="p-8">
          <div className="flex justify-between">
            <div className="text-black/70 flex gap-2 items-center mb-6">
              <span className="hover:text-black">Tasks Scheduler</span>
              <span>/</span>
              <span className="text-black">Tasks</span>
            </div>
          </div>
          <TaskDetails />
        </div>
      </div>
    </div>
  );
}
