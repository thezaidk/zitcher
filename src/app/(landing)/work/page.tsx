import WorkFeatures from "../_components/workFeatures";
import WorkIntro from "../_components/WorkIntro";

export default function work() {
    return ( 
        <div className="flex flex-col items-center px-4 overflow-hidden">
            <WorkIntro />
            <WorkFeatures />
        </div>
    )
}