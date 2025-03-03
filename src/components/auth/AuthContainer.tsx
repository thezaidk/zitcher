import { ReactNode } from "react";

interface authContainerProps {
    heading: string,
    description: string,
    children: ReactNode
}

export default function AuthContainer({
    heading,
    description,
    children,
} : authContainerProps) {

    return (
        <div className="w-full px-6">
            <div className="mx-auto sm:max-w-[30rem] bg-background  py-6 px-4 rounded-lg sm:px-10 sm:pb-6 sm:shadow border">
                <div className="sm:mx-auto w-full sm:max-w-md mb-8 text-center">
                    {typeof heading === 'string' ? (
                        <h1 className="text-3xl font-bold mb-2">{heading}</h1>
                    ) : (
                        heading
                    )}
                    {typeof description === 'string' ? (
                        <p className="text-muted-foreground text-sm">{description}</p>
                    ) : (
                        description
                    )}
                </div>
                {children}
            </div>
        </div>
    )
}