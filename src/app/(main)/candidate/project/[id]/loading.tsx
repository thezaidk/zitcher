import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <main className="flex justify-center mx-3 md:mx-10 xl:mx-20 md:my-5 overflow-hidden">
            <div className="container grid grid-cols-8 w-full max-w-[1536px]">
                <div className="col-span-8 md:col-span-6 md:border-r-[1.1px]">
                    <div className="px-5 py-8 space-y-3 border-b-[1.1px]">
                        <Skeleton className="h-6 w-2/3" />
                        <div className="flex items-center gap-5">
                            <Skeleton className="h-4 w-1/3" />
                            <div className="flex gap-1 items-center">
                                <Skeleton className="h-4 w-1/6" />
                            </div>
                        </div>
                    </div>
                    <div className="px-5 py-8 border-b-[1.1px]">
                        <Skeleton className="h-4 w-full" />
                    </div>
                    <div className="flex gap-20 px-5 py-8 border-b-[1.1px]">
                        <div className="flex gap-2">
                            <Skeleton className="h-4 w-8" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-12" />
                                <Skeleton className="h-3 w-16" />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Skeleton className="h-4 w-8" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-12" />
                                <Skeleton className="h-3 w-16" />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Skeleton className="h-4 w-8" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-12" />
                                <Skeleton className="h-3 w-16" />
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-1 px-5 py-8 border-b-[1.1px]">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                    <div className="px-5 py-8 space-y-3 border-b-[1.1px]">
                        <Skeleton className="h-5 w-48" />
                        <div className="flex flex-wrap gap-3 w-[30rem]">
                            {[...Array(5)].map((_, i) => (
                                <Skeleton key={i} className="h-6 w-24 rounded-full" />
                            ))}
                        </div>
                    </div>
                    <div className="space-y-2 px-5 py-8">
                        <Skeleton className="h-5 w-48" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                </div>
                <aside className="hidden md:block md:col-span-2 px-10 pt-8 space-y-10">
                    <div className="relative flex flex-col items-center gap-3">
                        <Skeleton className="h-10 w-full rounded-xl" />
                        <Skeleton className="h-10 w-full rounded-xl" />
                        <Skeleton className="h-10 w-full rounded-xl" />
                    </div>
                    <div>
                        <Skeleton className="h-4 w-48" />
                    </div>
                    <div className="space-y-3 pt-4">
                        <Skeleton className="h-5 w-48" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-4 w-64" />
                            <Skeleton className="h-4 w-32" />
                        </div>
                    </div>
                    <div className="space-y-3">
                        <Skeleton className="h-5 w-48" />
                        <Skeleton className="h-4 w-full" />
                    </div>
                </aside>
            </div>
        </main>
    );
}
