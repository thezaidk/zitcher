import Category from "./_components/Category";
import Contributor from "./_components/Contributor";
import Recruiter from "./_components/Recruiter";
import Features from "./_components/Features";
import Intro from "./_components/Intro";

export default function Home() {
  return (
    <div className="flex flex-col items-center px-4 overflow-hidden">
        <Intro />
        <Features />
        <Category />
        <Recruiter />
        <Contributor />
    </div>
  );
}
