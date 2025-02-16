import Navbar from "./Navbar";
import Link from "next/link";
import Searchbar from "./Searchbar";
import ProfileDropdown from "./ProfileDropdown";
import { ModeToggle } from "./ModeToggle";
import { SidebarTrigger } from "./ui/sidebar";

type HeaderProps = {
  title: string;
  links: {
      linkName: string;
      linkPath: string;
  }[];
}[];

export default async function Header({ navLinks, role }: { navLinks: HeaderProps, role: string }) {
  const searchValues = navLinks.flatMap(nav => (
    nav.links.map(link => ({
      label: link.linkName,
      link: link.linkPath,
    }))
  ));

  return (
    <header className="flex justify-center sticky top-0 z-50 bg-background/60 backdrop-blur w-full border shadow-sm">
    <div className="container max-w-[1536px] w-full mx-5 md:mx-10 xl:mx-20">
      <div className="flex justify-between items-center py-5">
        <SidebarTrigger className="block md:hidden hover:bg-background" />
        <div className="hidden md:flex items-center gap-10">
          <Link href="/candidate/find-project">
            <h1 className={`px-2 xl:px-0 font-bold font-cal text-2xl drop-shadow-md ${role === "CANDIDATE" ? "text-purple-900 dark:text-purple-600" : "text-slate-900 dark:text-slate-400" }`}>
              ZITCHER
            </h1>
          </Link>
          <div>
            <Navbar navLinks={navLinks} role={role} />
          </div>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="w-full md:w-40 lg:w-64">
            <Searchbar
              commands={{
                topic: "Search pages...",
                data: searchValues,
                ktag: true,
              }}
            />
          </div>
          <div>
            <ModeToggle />
          </div>
          <div>
            <ProfileDropdown />
          </div>
        </div>
      </div>
    </div>
  </header>
  )
}