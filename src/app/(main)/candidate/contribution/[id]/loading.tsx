import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <main className="flex justify-center mx-3 md:mx-10 xl:mx-20 md:my-5 h-screen">
            <div className="container grid grid-cols-8 w-full max-w-[1536px]">
                <div className="col-span-8 md:col-span-6 md:border-r-[1.1px]">
                    <div className="px-5 py-8 space-y-3 border-b-[1.1px] md:hover:bg-secondary rounded-lg">
                        <Skeleton className="h-6 w-2/3" />
                        <Skeleton className="h-4 w-full" />
                    </div>
                    <div className="flex items-center gap-2 p-5 text-xs border-b-[1.1px]">
                        <Skeleton className="h-6 w-24 rounded-full" />
                        <Skeleton className="h-6 w-8" />
                        <Skeleton className="h-6 w-32 rounded-full" />
                    </div>
                    <div className="px-5 py-8 space-y-10">
                        <div className="space-y-2">
                            <Skeleton className="h-5 w-24" />
                            <Skeleton className="h-10 w-48 rounded-lg" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-5 w-48" />
                            <Skeleton className="h-24 w-full rounded-lg" />
                        </div>
                    </div>
                </div>
                <aside className="hidden md:block md:col-span-2 px-10 pt-8 space-y-10">
                    <div className="flex flex-col gap-8">
                        <div className="space-y-5">
                            <Skeleton className="h-5 w-24" />
                            <Skeleton className="h-10 w-32 rounded-full" />
                        </div>
                        <div className="space-y-5">
                            <Skeleton className="h-5 w-48" />
                            <Skeleton className="h-5 w-48" />
                        </div>
                    </div>
                </aside>
            </div>
        </main>
    );
}
