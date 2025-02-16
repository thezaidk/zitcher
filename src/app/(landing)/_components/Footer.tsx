
export default function Footer() {
    return (
        <footer className="flex justify-center relative w-full overflow-auto mt-[8rem]">
            <div className="sm:w-[89rem] pt-10 sm:mb-2 sm:mx-2 bg-black text-neutral-100 sm:rounded-xl">
                <div className="hidden sm:block absolute left-1/2 -top-10 transform -translate-x-1/2 text-gray-500 shadow-white font-bold text-9xl">
                    ZITCHER
                </div>
                <div className="flex justify-around w-full py-20 sm:p-20">
                    <div>
                        <h3>For Recruiter</h3>
                        <ul className="pt-2">
                            <li>How to hire</li>
                            <li>Talent Marketplace</li>
                            <li>Project Catalog</li>
                            <li>Enterprise</li>
                            <li>Any Hire</li>
                            <li>Hire worldwide</li>
                        </ul>
                    </div>
                    <div>
                        <h3>For Contributor</h3>
                        <ul className="pt-2">
                            <li>How to find work</li>
                            <li>Direct Contracts</li>
                            <li>Find freelance jobs worldwide</li>
                            <li>Find freelance jobs in india</li>
                        </ul>
                    </div>
                </div>
                <hr className="h-[1px] bg-gray-100 mt-10 mx-2 sm:mx-20 sm:mt-10" />
                <div className="flex justify-center py-5 mx-2">
                    <ul className="flex gap-10 text-sm text-neutral-300">
                        <li>&copy; 2024-2030 Zitcher Inc.</li>
                        <li>Term of Service</li>
                        <li>Privacy Policy</li>
                        <li>Accessibility</li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}