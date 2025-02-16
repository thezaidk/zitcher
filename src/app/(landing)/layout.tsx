import Footer from "./_components/Footer";
import { Header } from "./_components/Header";

export default function LandingRoot({
    children
}: { children: React.ReactNode}) {
    return (
        <div className="landing font-sans min-h-screen flex flex-col text-gray-950 !scroll-smooth">
            {/* Background effects */}
            <div className="bg-[#fbe2e3] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-[#946263]"></div>
            <div className="bg-[#dbd7fb] absolute top-[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-[#676394]"></div>

            <Header />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    )
}