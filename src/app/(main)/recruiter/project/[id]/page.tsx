import { getAllTechnologies, getProject } from "@/actions/Projects";

import ManageProject from "@/components/ManageProject";
import SubmissionTab from "@/components/SubmissionTab";

export default async function Project({ params } : { params : { id: string}}) {
    const projectId = params.id;
    const { success, project } = await getProject(projectId);
    const allTechnologies = await getAllTechnologies();

    if (!success || !project) {
        return (
            <main className="flex justify-center mx-5 my-10">
                <p className="text-red-500">Failed to load project details. Please try again later.</p>
            </main>
        );
    }

    return (
        <div className="flex justify-center">
            <div className="flex flex-col border rounded-lg h-full w-full max-w-[1536px] lg:mx-20 lg:my-10">
                <ManageProject
                    id={project.id} 
                    title={project.title} 
                    description={project.description} 
                    codeLink={project.codeLink} 
                    deadline={project.deadline}
                    bounty={project.bounty} 
                    difficulty={project.difficulty} 
                    status={project.status}
                    technologies={project.technologies}
                    allTechnologies={allTechnologies}
                    createNew={false}
                />
                <div className="p-5">
                    <SubmissionTab projectId={project.id} />
                </div>
            </div>
        </div>
    )
}