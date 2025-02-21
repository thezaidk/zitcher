"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export default function CategoryItem({ Icon, title, desc }: { 
    Icon: React.ElementType, 
    title: string, 
    desc: string 
}) {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["0 1", "1.33 1"]
    })
    const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1])
    const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1])

    return (
        <motion.div
            ref={ref}
            style={{
                scale: scaleProgress,
                opacity: opacityProgress,
            }}
            className="bg-secondary sm:h-52 px-5 py-8 rounded-lg w-62 shadow overflow-hidden"
        >
            <Icon strokeWidth={2} color="#9a8dfe" />
            <h2 className="font-bold text-lg mt-1">{title}</h2>
            <p className="text-sm mt-2 font-medium">{desc}</p>
        </motion.div>
    )
}