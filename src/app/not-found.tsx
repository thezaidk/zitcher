import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { DEFAULT_LOGIN_REDIRECT_CANDIDATE, DEFAULT_LOGIN_REDIRECT_RECRUITER } from "@/config/path.config";

export default async function NotFound() {
  const session = await getServerSession();

  if (session) {
    if(session.user.role === "CANDIDATE"){
        redirect(DEFAULT_LOGIN_REDIRECT_CANDIDATE);
    }

    if(session.user.role === "RECRUITER"){
        return redirect(DEFAULT_LOGIN_REDIRECT_RECRUITER);
    }
  } else {
    redirect("/auth/signin");
  }

  return null;
}
