import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { projectApi } from '../../services/project/api';
import { projectUserApi } from '../../services/project-users/api';
import { taskApi } from '../../services/tasks/api';
import toast from 'react-hot-toast';
import { RiTeamLine, RiTaskLine } from 'react-icons/ri';
import ProjectTasks from "./project-tasks";

interface ProjectDetails {
    id: number;
    name: string;
    description: string;
    status: string;
    created_by: number;
}

interface ProjectStats {
    totalTasks: number;
    completedTasks: number;
    teamMembers: number;
}

export default function ProjectComponent() {
    const { projectId } = useParams();
    const [project, setProject] = useState<ProjectDetails | null>(null);
    const [stats, setStats] = useState<ProjectStats>({
        totalTasks: 0,
        completedTasks: 0,
        teamMembers: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (projectId) {
            fetchProjectDetails();
        }
    }, [projectId]);

    const fetchProjectDetails = async () => {
        try {
            setLoading(true);
            
            const projectData = await projectApi.getProjectById(parseInt(projectId!));
            setProject(projectData);
            console.log("projectData", projectData)

            const tasks = await taskApi.getProjectTasks(parseInt(projectId!));
            const completedTasks = tasks.filter(task => task.status === 'finished').length;
            
            const teamMembers = await projectUserApi.getProjectUsers(parseInt(projectId!));
            console.log("teamMembers", teamMembers)
            

            setStats({
                totalTasks: tasks.length,
                completedTasks,
                teamMembers: teamMembers.total,
            });

        } catch (error: any) {
            toast.error(error.message || 'Failed to fetch project details');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-center text-gray-500">Project not found</div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
                <p className="mt-2 text-gray-600">{project.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <RiTaskLine className="text-indigo-500 text-2xl" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Total Tasks</p>
                            <p className="text-2xl font-semibold text-gray-900">{stats.totalTasks}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <RiTeamLine className="text-green-500 text-2xl" />
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Team Members</p>
                            <p className="text-2xl font-semibold text-gray-900">{stats.teamMembers}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-600 font-medium">
                                {project.status.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Project Status</p>
                            <p className="text-2xl font-semibold text-gray-900 capitalize">{project.status}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <ProjectTasks projectId={parseInt(projectId ?? '0')} />
            </div>
        </div>
    );
}
