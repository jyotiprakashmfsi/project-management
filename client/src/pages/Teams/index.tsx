import Sidebar from "../../componnets/sidebar";
import TeamsComponent from "../../componnets/teams/teams-component";

export default function TeamsPage() {
  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      <div >
        <Sidebar />
      </div>
      <div className="flex-1 w-full">
        <div className="p-8">
          <div className="flex justify-between">
            <div className="text-black/70 flex gap-2 items-center mb-6">
              <span className="hover:text-black">Tasks Scheduler</span>
              <span>/</span>
              <span className="text-black">Teams</span>
            </div>
            {/* <NotificationComponent /> */}
          </div>
          <TeamsComponent/>
        </div>
      </div>
    </div>
  );
}
