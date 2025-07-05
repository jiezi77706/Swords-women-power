"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
    opacity: 0.1 + i * 0.03,
    duration: 20 + (i % 10), // 简化随机性
  }))

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full text-slate-950 dark:text-white" viewBox="0 0 696 316" fill="none">
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={path.opacity}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: path.duration,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  )
}

const SECTIONS = [
  {
    key: "home",
    label: "首页",
    render: (router: any, words: string[]) => (
      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-12 tracking-tight leading-tight">
            {words.map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block mr-3 last:mr-0">
                {word.split("").map((letter, letterIndex) => (
                  <motion.span
                    key={`${wordIndex}-${letterIndex}`}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: wordIndex * 0.1 + letterIndex * 0.03,
                      type: "spring",
                      stiffness: 150,
                      damping: 25,
                    }}
                    className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 to-neutral-700/80 dark:from-white dark:to-white/80"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="inline-block group relative bg-gradient-to-b from-black/10 to-white/10 dark:from-white/10 dark:to-black/10 p-px rounded-2xl backdrop-blur-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <Button
              onClick={() => router.push("/quotes")}
              variant="ghost"
              className="rounded-[1.15rem] px-8 py-6 text-lg font-semibold backdrop-blur-md bg-white/95 hover:bg-white/100 dark:bg-black/95 dark:hover:bg-black/100 text-black dark:text-white transition-all duration-300 group-hover:-translate-y-0.5 border border-black/10 dark:border-white/10 hover:shadow-md dark:hover:shadow-neutral-800/50"
            >
              <span className="opacity-90 group-hover:opacity-100 transition-opacity">Explore more</span>
              <span className="ml-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all duration-300">
                →
              </span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    ),
  },
  {
    key: "daily-draw",
    label: "Daily Draw",
    render: (router: any) => (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <h2 className="text-4xl font-bold mb-6">每日抽签</h2>
        <p className="text-lg mb-8">每天抽取一句格言或一本好书，开启你的灵感之旅。</p>
        <Button onClick={() => router.push("/daily-draw")}>进入每日抽签</Button>
      </div>
    ),
  },
  {
    key: "books",
    label: "Books",
    render: (router: any) => (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <h2 className="text-4xl font-bold mb-6">书籍世界</h2>
        <p className="text-lg mb-8">探索哲学、文学、社会学等领域的精选书籍。</p>
        <Button onClick={() => router.push("/books")}>进入书籍世界</Button>
      </div>
    ),
  },
  {
    key: "women",
    label: "Women",
    render: (router: any) => (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <h2 className="text-4xl font-bold mb-6">杰出女性</h2>
        <p className="text-lg mb-8">致敬在文学、学术、社会运动中做出卓越贡献的女性。</p>
        <Button onClick={() => router.push("/women")}>进入女性专题</Button>
      </div>
    ),
  },
  {
    key: "comment",
    label: "Comments",
    render: (router: any) => (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <h2 className="text-4xl font-bold mb-6">友好评论</h2>
        <p className="text-lg mb-8">基于区块链的去中心化评论系统，永久保存你的思想。</p>
        <Button onClick={() => router.push("/friendly-comments")}>进入评论系统</Button>
      </div>
    ),
  },
  {
    key: "resources",
    label: "Resources",
    render: (router: any) => (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <h2 className="text-4xl font-bold mb-6">学习资源</h2>
        <p className="text-lg mb-8">汇集优质学习资源，助你深入探索女性主义、哲学和社会学。</p>
        <Button onClick={() => router.push("/resources")}>进入学习资源</Button>
      </div>
    ),
  },
  {
    key: "subscribe",
    label: "Subscribe",
    render: (router: any) => (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <h2 className="text-4xl font-bold mb-6">订阅更新</h2>
        <p className="text-lg mb-8">订阅邮件，获取最新格言、书籍推荐和活动信息。</p>
        <Button onClick={() => router.push("/subscribe")}>进入订阅</Button>
      </div>
    ),
  },
]

export default function HomePage() {
  const router = useRouter()
  const quote = "The master's tools will never dismantle the master's house."
  const words = quote.split(" ")
  const [page, setPage] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const isScrolling = useRef(false)

  // 滚轮/触摸滑动切换页面
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling.current) return
      if (e.deltaY > 40 && page < SECTIONS.length - 1) {
        setPage((p) => Math.min(p + 1, SECTIONS.length - 1))
        isScrolling.current = true
        setTimeout(() => (isScrolling.current = false), 700)
      } else if (e.deltaY < -40 && page > 0) {
        setPage((p) => Math.max(p - 1, 0))
        isScrolling.current = true
        setTimeout(() => (isScrolling.current = false), 700)
      }
    }
    const node = containerRef.current
    node?.addEventListener("wheel", handleWheel, { passive: false })
    return () => node?.removeEventListener("wheel", handleWheel)
  }, [page])

  // 触摸滑动
  useEffect(() => {
    let startY = 0
    let endY = 0
    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY
    }
    const handleTouchEnd = (e: TouchEvent) => {
      endY = e.changedTouches[0].clientY
      if (isScrolling.current) return
      if (startY - endY > 50 && page < SECTIONS.length - 1) {
        setPage((p) => Math.min(p + 1, SECTIONS.length - 1))
        isScrolling.current = true
        setTimeout(() => (isScrolling.current = false), 700)
      } else if (endY - startY > 50 && page > 0) {
        setPage((p) => Math.max(p - 1, 0))
        isScrolling.current = true
        setTimeout(() => (isScrolling.current = false), 700)
      }
    }
    const node = containerRef.current
    node?.addEventListener("touchstart", handleTouchStart)
    node?.addEventListener("touchend", handleTouchEnd)
    return () => {
      node?.removeEventListener("touchstart", handleTouchStart)
      node?.removeEventListener("touchend", handleTouchEnd)
    }
  }, [page])

  return (
    <div ref={containerRef} className="relative min-h-screen w-full overflow-hidden bg-white dark:bg-neutral-950">
      {/* 右上角按钮组 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="fixed top-6 right-6 z-20 flex gap-3"
      >
        {/* Daily Draw Button - First */}
        <div className="group relative bg-gradient-to-b from-purple-500/20 to-pink-500/20 dark:from-purple-400/20 dark:to-pink-400/20 p-px rounded-2xl backdrop-blur-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Button
            onClick={() => router.push("/daily-draw")}
            variant="ghost"
            className="rounded-[1.15rem] px-4 py-2 text-sm font-semibold backdrop-blur-md bg-purple-50/95 hover:bg-purple-100/100 dark:bg-purple-950/95 dark:hover:bg-purple-900/100 text-purple-700 dark:text-purple-300 transition-all duration-300 group-hover:-translate-y-0.5 border border-purple-200/50 dark:border-purple-800/50 hover:shadow-md hover:shadow-purple-200/50 dark:hover:shadow-purple-800/50"
          >
            <span className="opacity-90 group-hover:opacity-100 transition-opacity">Daily Draw</span>
            <span className="ml-2 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
              🎲
            </span>
          </Button>
        </div>

        {/* 格言墙按钮 - Second */}
        <div className="group relative bg-gradient-to-b from-indigo-500/20 to-blue-500/20 dark:from-indigo-400/20 dark:to-blue-400/20 p-px rounded-2xl backdrop-blur-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Button
            onClick={() => router.push("/quotes")}
            variant="ghost"
            className="rounded-[1.15rem] px-4 py-2 text-sm font-semibold backdrop-blur-md bg-indigo-50/95 hover:bg-indigo-100/100 dark:bg-indigo-950/95 dark:hover:bg-indigo-900/100 text-indigo-700 dark:text-indigo-300 transition-all duration-300 group-hover:-translate-y-0.5 border border-indigo-200/50 dark:border-indigo-800/50 hover:shadow-md hover:shadow-indigo-200/50 dark:hover:shadow-indigo-800/50"
          >
            <span className="opacity-90 group-hover:opacity-100 transition-opacity">格言墙</span>
            <span className="ml-2 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
              💭
            </span>
          </Button>
        </div>

        {/* Books Button - Third */}
        <div className="group relative bg-gradient-to-b from-slate-500/20 to-slate-600/20 dark:from-slate-400/20 dark:to-slate-500/20 p-px rounded-2xl backdrop-blur-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Button
            onClick={() => router.push("/books")}
            variant="ghost"
            className="rounded-[1.15rem] px-4 py-2 text-sm font-semibold backdrop-blur-md bg-slate-50/95 hover:bg-slate-100/100 dark:bg-slate-950/95 dark:hover:bg-slate-900/100 text-slate-700 dark:text-slate-300 transition-all duration-300 group-hover:-translate-y-0.5 border border-slate-200/50 dark:border-slate-800/50 hover:shadow-md hover:shadow-slate-200/50 dark:hover:shadow-slate-800/50"
          >
            <span className="opacity-90 group-hover:opacity-100 transition-opacity">Books</span>
            <span className="ml-2 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
              📚
            </span>
          </Button>
        </div>

        {/* Women Button - Fourth */}
        <div className="group relative bg-gradient-to-b from-rose-500/20 to-pink-500/20 dark:from-rose-400/20 dark:to-pink-400/20 p-px rounded-2xl backdrop-blur-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Button
            onClick={() => router.push("/women")}
            variant="ghost"
            className="rounded-[1.15rem] px-4 py-2 text-sm font-semibold backdrop-blur-md bg-rose-50/95 hover:bg-rose-100/100 dark:bg-rose-950/95 dark:hover:bg-rose-900/100 text-rose-700 dark:text-rose-300 transition-all duration-300 group-hover:-translate-y-0.5 border border-rose-200/50 dark:border-rose-800/50 hover:shadow-md hover:shadow-rose-200/50 dark:hover:shadow-rose-800/50"
          >
            <span className="opacity-90 group-hover:opacity-100 transition-opacity">Women</span>
            <span className="ml-2 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
              🌹
            </span>
          </Button>
        </div>

        {/* Friendly Comments Button - Fifth */}
        <div className="group relative bg-gradient-to-b from-blue-500/20 to-indigo-500/20 dark:from-blue-400/20 dark:to-indigo-400/20 p-px rounded-2xl backdrop-blur-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Button
            onClick={() => router.push("/friendly-comments")}
            variant="ghost"
            className="rounded-[1.15rem] px-4 py-2 text-sm font-semibold backdrop-blur-md bg-blue-50/95 hover:bg-blue-100/100 dark:bg-blue-950/95 dark:hover:bg-blue-900/100 text-blue-700 dark:text-blue-300 transition-all duration-300 group-hover:-translate-y-0.5 border border-blue-200/50 dark:border-blue-800/50 hover:shadow-md hover:shadow-blue-200/50 dark:hover:shadow-blue-800/50"
          >
            <span className="opacity-90 group-hover:opacity-100 transition-opacity">Comments</span>
            <span className="ml-2 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
              💬
            </span>
          </Button>
        </div>

        {/* Resources Button - Sixth */}
        <div className="group relative bg-gradient-to-b from-orange-500/20 to-amber-500/20 dark:from-orange-400/20 dark:to-amber-400/20 p-px rounded-2xl backdrop-blur-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Button
            onClick={() => router.push("/resources")}
            variant="ghost"
            className="rounded-[1.15rem] px-4 py-2 text-sm font-semibold backdrop-blur-md bg-orange-50/95 hover:bg-orange-100/100 dark:bg-orange-950/95 dark:hover:bg-orange-900/100 text-orange-700 dark:text-orange-300 transition-all duration-300 group-hover:-translate-y-0.5 border border-orange-200/50 dark:border-orange-800/50 hover:shadow-md hover:shadow-orange-200/50 dark:hover:shadow-orange-800/50"
          >
            <span className="opacity-90 group-hover:opacity-100 transition-opacity">Resources</span>
            <span className="ml-2 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
              🌐
            </span>
          </Button>
        </div>

        {/* Subscribe Button - Seventh */}
        <div className="group relative bg-gradient-to-b from-amber-500/20 to-orange-500/20 dark:from-amber-400/20 dark:to-orange-400/20 p-px rounded-2xl backdrop-blur-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Button
            onClick={() => router.push("/subscribe")}
            variant="ghost"
            className="rounded-[1.15rem] px-4 py-2 text-sm font-semibold backdrop-blur-md bg-amber-50/95 hover:bg-amber-100/100 dark:bg-amber-950/95 dark:hover:bg-amber-900/100 text-amber-700 dark:text-amber-300 transition-all duration-300 group-hover:-translate-y-0.5 border border-amber-200/50 dark:border-amber-800/50 hover:shadow-md hover:shadow-amber-200/50 dark:hover:shadow-amber-800/50"
          >
            <span className="opacity-90 group-hover:opacity-100 transition-opacity">Subscribe</span>
            <span className="ml-2 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
              📧
            </span>
          </Button>
        </div>

        {/* Profile Button - Eighth (最右边) */}
        <div className="group relative bg-gradient-to-b from-emerald-500/20 to-teal-500/20 dark:from-emerald-400/20 dark:to-teal-400/20 p-px rounded-2xl backdrop-blur-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Button
            onClick={() => router.push("/profile")}
            variant="ghost"
            className="rounded-[1.15rem] px-4 py-2 text-sm font-semibold backdrop-blur-md bg-emerald-50/95 hover:bg-emerald-100/100 dark:bg-emerald-950/95 dark:hover:bg-emerald-900/100 text-emerald-700 dark:text-emerald-300 transition-all duration-300 group-hover:-translate-y-0.5 border border-emerald-200/50 dark:border-emerald-800/50 hover:shadow-md hover:shadow-emerald-200/50 dark:hover:shadow-emerald-800/50"
          >
            <span className="opacity-90 group-hover:opacity-100 transition-opacity">Profile</span>
            <span className="ml-2 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
              👤
            </span>
          </Button>
        </div>
      </motion.div>

      {/* 左侧点导航（6个点，首页不显示点） */}
      <div className="fixed left-6 top-1/2 z-30 flex flex-col gap-4 -translate-y-1/2">
        {SECTIONS.slice(1).map((s, idx) => (
          <button
            key={s.key}
            onClick={() => setPage(idx + 1)}
            className={`w-4 h-4 rounded-full border-2 ${page === idx + 1 ? 'bg-slate-900 dark:bg-white border-slate-900 dark:border-white' : 'bg-slate-300 dark:bg-slate-700 border-slate-400 dark:border-slate-600'} transition-all`}
            aria-label={s.label}
          />
        ))}
      </div>

      {/* 滑动内容区 */}
      <div className="w-full h-screen flex flex-col items-center justify-center transition-colors duration-700">
        <motion.div
          key={page}
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -80 }}
          transition={{ duration: 0.7 }}
          className={`w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br transition-colors duration-700`}
        >
          <div className="absolute inset-0 pointer-events-none">
            <FloatingPaths position={1} />
            <FloatingPaths position={-1} />
          </div>
          <div className="relative z-10 max-w-2xl mx-auto text-center px-4 h-full flex flex-col justify-center">
            {SECTIONS[page].render(router, words)}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
