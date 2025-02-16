import { getAllTechnologies } from "@/actions/Projects";

import ManageProject from "@/components/ManageProject";

export default async function CreateProject() {
    const allTechnologies = await getAllTechnologies();

    return (
        <div className="flex justify-center mx-5 my-5 md:mx-10 xl:mx-20">
            <div className="flex flex-col border rounded-lg h-full w-full max-w-[1536px]">
                <ManageProject
                    createNew={true}
                    allTechnologies={allTechnologies}
                />
            </div>
        </div>
    )
}