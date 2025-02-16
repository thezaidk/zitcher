import HireDesc from "../_components/HireDesc";
import HireFeatures from "../_components/HireFeatures";
import HireIntro from "../_components/HireIntro";

export default function hire() {
    return ( 
        <div className="flex flex-col items-center px-4 overflow-hidden">
            <HireIntro />
            <HireFeatures />
            <HireDesc />
        </div>
    )
}