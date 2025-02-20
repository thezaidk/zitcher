"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function About() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center px-3 md:px-10 overflow-hidden">
      <section className="w-full flex justify-center mt-[7rem] sm:mt-[10rem] mx-2 sm:mx-5">
        <div className="w-full max-w-[50rem]">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-purple-700">About Us</h1>
            <h3 className="text-lg sm:text-xl font-bold mt-2">
              The World&apos;s Software Marketplace
            </h3>
          </div>

          <div className="flex items-center mt-8">
            <Image
              src="/images/founder.jpg"
              alt="Founder Zaid Karigar"
              width={90}
              height={90}
              className="rounded-full shadow-lg"
            />
            <div className="ml-5">
              <h2 className="text-xl sm:text-2xl font-bold">Zaid Karigar</h2>
              <h4 className="text-md sm:text-lg font-semibold text-gray-600">
                Founder &amp; CEO
              </h4>
            </div>
          </div>

          <div className="mt-10 sm:text-lg space-y-10">
            <div className="space-y-3">
              <p>
                Our journey started with a simple idea: to bridge the gap between talented software professionals and businesses in need of cutting-edge solutions. Over the years, we&apos;ve grown into a platform that empowers innovation and brings opportunities to both individuals and companies around the globe.
              </p>
              <p className="text-lg sm:text-xl font-semibold text-purple-700">
                Our mission is to create a space where software talent thrives and businesses find the expertise they need to accelerate their growth. From startups to enterprises, we&apos;re dedicated to helping you achieve your goals with the freedom, flexibility, and security you deserve.
              </p>
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold">A Platform Built for Software Talent</h4>
                <p>
                  As a company founded by professionals who know the industry, we understand the importance of great relationships. Whether you&apos;re looking for quick bug fixes, full-scale development, or technical consulting, our platform connects you with skilled software developers, engineers, and IT experts who are passionate about their craft.
                  <br />
                  We&apos;re here to support both sides of the collaboration, giving businesses access to top talent and software professionals the tools they need to build, grow, and deliver exceptional work.
                </p>
              </div>
              <div>
                <h4 className="font-semibold">Transform Your Business, Realize Your Potential</h4>
                <p>
                  For businesses, we offer a dynamic pool of software specialists ready to tackle your most complex projects. For software professionals, we offer a gateway to meaningful work that lets you showcase your skills, grow your career, and take control of your professional journey.
                </p>
              </div>
              <div>
                <h4 className="font-semibold">We&apos;re More Than a Platform. We&apos;re Your Partner in Success</h4>
                <p>
                  Every day, we&apos;re inspired by the incredible work that happens here. We&apos;ve designed this platform to ensure that both businesses and talent can connect, collaborate, and create value together. Whether you&apos;re looking to scale a project or scale your career, we provide the tools and support to help you succeed.
                </p>
              </div>
            </div>

            <p>
              We&apos;re excited to be part of your journey and can&apos;t wait to see the impact you&apos;ll make.
            </p>

            <div className="flex gap-3 font-semibold">
              <h3 className="text-2xl">~</h3>
              <div>
                <h3>Zaid Karigar,</h3>
                <h3 className="text-zinc-500">Founder and CEO</h3>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <h1 className="text-4xl sm:text-5xl font-semibold text-purple-700">Start Your Journey</h1>
            <div className="mt-5 space-x-0 sm:space-x-5 flex flex-col sm:flex-row">
              <Button 
                size="lg" 
                className="bg-purple-700 mb-3 sm:mb-0"
                onClick={() => {
                  router.push("/auth/signin")
                }}
              >
                Find Talent
              </Button>
              <Button 
                size="lg" 
                className="bg-purple-700 mb-3 sm:mb-0"
                onClick={() => {
                  router.push("/auth/signin")
                }}
              >
                Find Work
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
