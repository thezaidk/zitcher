import { getProject } from "@/actions/Projects";

import ProjectDetails from "@/components/ProjectDetails";

export default async function Project({ params } : { params : { id: string}}) {
    const projectId = params.id;
    const { success, project } = await getProject(projectId);

    if (!success || !project) {
        return (
            <main className="flex justify-center mx-5 my-10">
                <p className="text-red-500">Failed to load project details. Please try again later.</p>
            </main>
        );
    }
    
    return <ProjectDetails project={project} />
}