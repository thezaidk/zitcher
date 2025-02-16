"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { isUser, updateRole } from "@/actions/auth";
import { Spinner } from "@/components/Spinner";

export default function SelectRolePage() {
  return (
    <Suspense fallback={<div className="flex justify-center h-screen pt-20"><Spinner size={"lg"} /></div>}>
      <SelectRoleContent />
    </Suspense>
  );
}

function SelectRoleContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { toast } = useToast();

    const email = searchParams.get("email");
    const oauthId = searchParams.get("oauthId");
    
    const [role, setRole] = useState<"CANDIDATE" | "RECRUITER">("CANDIDATE");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      async function checkUser () {
        console.log("email, oauthid:", email, oauthId)
        if (!email || !oauthId) {
          router.push("/auth/signin");
          return;
        }

        setLoading(true);

        try {
          const { success, message, user } = await isUser(email, oauthId);
          console.log("success, message, user:", success, message, user);
          if(!success) {
            toast({
              title: message,
            })
    
            router.push("/auth/signin");
          } else if(user?.role !== "UNASSIGNED") {
            router.push("/auth/signin");
          }
        } finally {
          setLoading(false);
        }
      }

      checkUser()
    }, [email, oauthId, router, toast]);

    const handleRoleSelection = async () => {
      if (!email || !oauthId) {
        toast({
          title: "Missing user data",
          variant: "destructive",
        });
        return;
      }

      try {
        const { success } = await updateRole(email, oauthId, role);

        if(success) {
          toast({
            title: "Successfully signed up.",
          })

          router.push(role === "CANDIDATE" ? "/candidate/find-project" : "/recruiter/find-candidate");
        } else {
          toast({
            title: "An error occurred",
            variant: "destructive",
          })
        }
      } catch (error) {
        toast({
            title: "An error occurred",
            description: error instanceof Error ? error.message : "Please try again.",
            variant: "destructive",
        });
      }
  };

  if(loading) {
    return (
      <div className="flex justify-center h-screen pt-20">
        <Spinner size={"lg"} />
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Select Your Role</h1>
      <div className="flex gap-4">
        <Button
          variant={role === "CANDIDATE" ? "default" : "outline"}
          onClick={() => setRole("CANDIDATE")}
        >
          Candidate
        </Button>
        <Button
          variant={role === "RECRUITER" ? "default" : "outline"}
          onClick={() => setRole("RECRUITER")}
        >
          Recruiter
        </Button>
      </div>
      <Button className="mt-6" onClick={handleRoleSelection}>
        Continue
      </Button>
    </div>
  );
}