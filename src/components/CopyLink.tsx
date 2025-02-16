"use client"

import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function CopyLink({ link }: { link: string}) {
    const { toast } = useToast();

    const handleCopyLink = () => {
        navigator.clipboard.writeText(link)
            .then(() => {
                toast({
                    title: "Link copied to clipboard!",
                })
            })
            .catch((err) => {
                toast({
                    title: err || "Internal server error",
                    variant: "destructive",
                });
            });
    };

    return (
        <div className="space-y-1">
            <Input 
                readOnly
                value={link}
            />
            <Button
                variant={"link"}
                className="p-1"
                size={"sm"}
                onClick={handleCopyLink}
            >
                Copy Link
            </Button>
        </div>
    )
}