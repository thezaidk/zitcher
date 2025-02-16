"use client";

import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselNext,
  CarouselPrevious,
  CarouselItem,
  CarouselContent,
} from '@/components/ui/carousel';

type SlidesProps = {
  desc: string;
  heading: string;
  button: string;
  href: string;
}[];

export default function NewsCarousel({ slides, role }: { 
  slides: SlidesProps,
  role: string,
}) {
const router = useRouter();

return (
  <main
    className={`flex flex-col justify-between items-center py-3 rounded-lg md:py-10 ${role === "CANDIDATE" ? "bg-purple-800 text-white" : "bg-slate-300 text-black"}`}
  >
      <Carousel>
        <div className="relative flex items-center justify-center">
          <div className='hidden xl:block'>
            <CarouselPrevious className='text-black dark:text-white' />
          </div>
          <CarouselContent className={`max-w-[800px]`}>
            {slides.map((item) => (
              <CarouselItem className='flex justify-center items-center' key={item.heading}>
                <div className='grid grid-cols-6 px-3 w-full md:px-10'>
                    <div className='col-span-6 gap-5 space-y-2 lg:col-span-4 md:space-y-7'>
                        <div>
                            <p className='text-sm md:text-lg'>{item.desc}</p>
                            <h1 className='font-semibold text-xl md:text-2xl'>{item.heading}</h1>
                        </div>
                        <Button 
                          onClick={() => router.push(item.href)}
                          className='bg-zinc-50 hover:bg-zinc-200 text-zinc-800'
                        >
                          {item.button}
                        </Button>
                    </div>
                    <div className='hidden lg:flex lg:justify-center lg:col-span-2'>
                        <Image
                          src={"/news-img.png"}
                          width={200}
                          height={200}
                          alt="News Img"
                        />
                    </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className='hidden xl:block'>
            <CarouselNext className='text-black dark:text-white' />
          </div>
        </div>
      </Carousel>
  </main>
  );
}