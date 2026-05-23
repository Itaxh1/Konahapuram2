"use client"

import Link from "next/link"
import Image from "next/image"
import { motion, useMotionValueEvent, useScroll } from "framer-motion"
import { Monitor, Moon, Sun, Terminal, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

const sections = ["about", "experience"] as const
type SectionId = (typeof sections)[number]
type ThemeChoice = "light" | "dark" | "system"

const themeOptions: Array<{
  value: ThemeChoice
  label: string
  icon: typeof Sun
}> = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
]

const experiences = [
  {
    period: "2025 — Present",
    role: "Founding Engineer",
    company: "HiringBae",
    description: "Building OZ: AI employees that handle end-to-end workflows. From integrations to onboarding to support, helping teams ship faster with intelligent automation.",
    link: "#",
  },
  {
    period: "2024 — 2025",
    role: "Web Developer",
    company: "Oregon State University",
    description: "Developed and maintained university web applications, improving accessibility and user experience for thousands of students and faculty.",
  },
  {
    period: "2022 — 2023",
    role: "Associate Software Developer",
    company: "Agrosperity Kivi",
    description: "Built scalable backend systems for agricultural technology platform. Implemented real-time data processing pipelines and API integrations.",
  },
  {
    period: "2022",
    role: "Data Analyst Consultant",
    company: "Genworks Healthcare",
    description: "Analyzed healthcare data to derive actionable insights. Built dashboards and automated reporting systems.",
  },
]

const photos = [
  { src: "/photos/photo-1.png", alt: "Ashwin outdoors" },
  { src: "/photos/photo-2.png", alt: "Ashwin portrait outdoors" },
  { src: "/photos/photo-3.png", alt: "Ashwin landscape moment" },
]

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const activeTheme = mounted ? theme ?? "system" : "system"

  return (
    <div className="inline-flex rounded-lg border border-[#dcdcd4] bg-[#eeeeea] p-1 dark:border-[#222] dark:bg-[#111]">
      {themeOptions.map((option) => {
        const Icon = option.icon
        const isActive = activeTheme === option.value

        return (
          <button
            key={option.value}
            type="button"
            aria-label={`Use ${option.label.toLowerCase()} theme`}
            aria-pressed={isActive}
            onClick={() => setTheme(option.value)}
            className={`flex h-8 w-8 items-center justify-center rounded-md transition-colors ${
              isActive
                ? "bg-white text-[#111] shadow-sm dark:bg-[#1f1f1f] dark:text-white"
                : "text-[#77776f] hover:text-[#111] dark:text-[#666] dark:hover:text-white"
            }`}
          >
            <Icon className="h-4 w-4" />
          </button>
        )
      })}
    </div>
  )
}

export default function HomePage() {
  const [hoveredExp, setHoveredExp] = useState<number | null>(null)
  const [activeSection, setActiveSection] = useState<SectionId>("about")
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", () => {
    const triggerLine = window.innerHeight * 0.35
    let currentSection: SectionId = sections[0]

    for (const section of sections) {
      const element = document.getElementById(section)

      if (element && element.getBoundingClientRect().top <= triggerLine) {
        currentSection = section
      }
    }

    setActiveSection((current) =>
      current === currentSection ? current : currentSection
    )
  })

  return (
    <div className="min-h-screen bg-[#f7f7f4] text-[#181818] selection:bg-[#3b82f6] selection:text-white dark:bg-[#0a0a0a] dark:text-[#e5e5e5]">
      {/* Fixed Left Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-[280px] p-10 hidden lg:flex flex-col justify-between border-r border-[#dfdfd8] dark:border-[#1a1a1a]">
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-medium tracking-tight"
          >
            Itaxh1
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[#666] mt-1"
          >
            Builder & Engineer
          </motion.p>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="text-[#73736b] text-sm mt-4 leading-relaxed dark:text-[#444]"
          >
            I build practical software for real workflows.
            <br />
            Currently Building OZ at HiringBae.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.18 }}
            className="mt-8"
          >
            <ThemeToggle />
          </motion.div>

          {/* Navigation */}
          <nav className="mt-16 space-y-1">
            {sections.map((section, i) => {
              const isActive = activeSection === section

              return (
                <motion.a
                  key={section}
                  href={`#${section}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  onClick={() => setActiveSection(section)}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center gap-3 py-2 text-sm uppercase tracking-widest transition-colors ${
                    isActive
                      ? "text-[#111] dark:text-white"
                      : "text-[#8a8a82] hover:text-[#555] dark:text-[#555] dark:hover:text-[#888]"
                  }`}
                >
                  <motion.span
                    layout
                    transition={{ type: "spring", stiffness: 360, damping: 32 }}
                    className={`h-px transition-all ${
                      isActive ? "w-16 bg-[#111] dark:bg-white" : "w-8 bg-[#d0d0c8] dark:bg-[#333]"
                    }`}
                  />
                  {section}
                </motion.a>
              )
            })}
          </nav>
        </div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-5"
        >
          <Link
            href="https://github.com/Itaxh1"
            target="_blank"
            className="text-[#77776f] hover:text-[#111] transition-colors dark:text-[#555] dark:hover:text-white"
          >
            <Github className="w-5 h-5" />
          </Link>
          <Link
            href="https://linkedin.com/in/ashwinkumar99"
            target="_blank"
            className="text-[#77776f] hover:text-[#111] transition-colors dark:text-[#555] dark:hover:text-white"
          >
            <Linkedin className="w-5 h-5" />
          </Link>
          <Link
            href="mailto:ufoundashwin@gmail.com"
            className="text-[#77776f] hover:text-[#111] transition-colors dark:text-[#555] dark:hover:text-white"
          >
            <Mail className="w-5 h-5" />
          </Link>
          <Link
            href="/terminal"
            className="text-[#77776f] hover:text-[#16a34a] transition-colors dark:text-[#555] dark:hover:text-[#22c55e]"
            title="Terminal Mode"
          >
            <Terminal className="w-5 h-5" />
          </Link>
        </motion.div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#f7f7f4]/90 backdrop-blur-sm border-b border-[#dfdfd8] px-6 py-4 dark:bg-[#0a0a0a]/90 dark:border-[#1a1a1a]">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-medium">Itaxh1</h1>
            <p className="text-[#73736b] text-sm dark:text-[#666]">Builder & Engineer</p>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/terminal"
              className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-[#dfdfd8] hover:border-[#16a34a] transition-colors dark:bg-[#111] dark:border-[#222] dark:hover:border-[#22c55e]"
            >
              <Terminal className="w-4 h-4 text-[#16a34a] dark:text-[#22c55e]" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="lg:ml-[280px] px-6 lg:px-16 py-24 lg:py-16 max-w-4xl">
        {/* About Section */}
        <section id="about" className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg lg:text-xl leading-relaxed text-[#55554f] dark:text-[#999]">
              Hi, I&apos;m Ashwin. I&apos;m a builder and engineer from Chennai, now based in Phoenix.
            </p>

            <p className="text-lg lg:text-xl leading-relaxed text-[#55554f] mt-6 dark:text-[#999]">
              I like building things from zero.
            </p>

            <p className="text-lg lg:text-xl leading-relaxed text-[#55554f] mt-6 dark:text-[#999]">
              I enjoy the part where I do not know the answer yet: debugging, figuring things out, and staying with a problem until it starts to make sense.
            </p>

            <p className="text-lg lg:text-xl leading-relaxed text-[#55554f] mt-6 dark:text-[#999]">
              I&apos;ve worked across university websites, agriculture, healthcare, and now I&apos;m working on{" "}
              <span className="text-[#111] font-medium dark:text-white">OZ at HiringBae</span>.
            </p>

            <p className="text-lg lg:text-xl leading-relaxed text-[#55554f] mt-6 dark:text-[#999]">
              Different spaces, same instinct: learn fast, build carefully, and make something people can rely on.
            </p>
          </motion.div>

          {/* Photo Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-16 grid grid-cols-3 gap-2 lg:gap-3"
          >
            {photos.map((photo) => (
              <div
                key={photo.alt}
                className="aspect-[4/5] bg-[#ecece7] rounded-lg overflow-hidden relative group border border-[#deded6] hover:border-[#c9c9c0] transition-colors dark:bg-[#111] dark:border-[#1a1a1a] dark:hover:border-[#333]"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 180px, 33vw"
                  className="object-cover opacity-95 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
                />
              </div>
            ))}
          </motion.div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="mb-24">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm uppercase tracking-widest text-[#8a8a82] mb-10 lg:hidden dark:text-[#555]"
          >
            Experience
          </motion.h2>

          <div className="space-y-2">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredExp(index)}
                onMouseLeave={() => setHoveredExp(null)}
                className={`group p-6 rounded-lg border transition-all duration-300 cursor-default ${
                  hoveredExp === index
                    ? "bg-white border-[#deded8] dark:bg-[#111] dark:border-[#222]"
                    : "bg-transparent border-transparent hover:bg-white/60 dark:hover:bg-[#0d0d0d]"
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  <span className="text-sm leading-relaxed text-[#8a8a82] lg:w-36 shrink-0 dark:text-[#555]">
                    {exp.period}
                  </span>
                  <div className="flex-1">
                    <h3 className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-lg font-medium leading-snug text-[#111] lg:text-xl dark:text-white">
                      {exp.role}
                      <span className="text-[#999991] dark:text-[#555]">·</span>
                      <span className={`${hoveredExp === index ? "text-[#2563eb] dark:text-[#3b82f6]" : "text-[#6b6b64] dark:text-[#888]"} transition-colors`}>
                        {exp.company}
                      </span>
                      {exp.link && (
                        <ArrowUpRight className="w-4 h-4 text-[#8a8a82] group-hover:text-[#2563eb] transition-colors dark:text-[#555] dark:group-hover:text-[#3b82f6]" />
                      )}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-[#55554f] lg:text-lg dark:text-[#999]">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8"
          >
            <Link
              href="/Ashwin_Kumar_Resume.pdf"
              target="_blank"
              className="inline-flex items-center gap-2 text-sm text-[#6b6b64] hover:text-[#111] transition-colors group dark:text-[#666] dark:hover:text-white"
            >
              View Full Resume
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="border-t border-[#dfdfd8] pt-10 dark:border-[#1a1a1a]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-6 lg:hidden">
              <Link href="https://github.com/Itaxh1" target="_blank" className="text-[#77776f] hover:text-[#111] transition-colors dark:text-[#555] dark:hover:text-white">
                <Github className="w-5 h-5" />
              </Link>
              <Link href="https://linkedin.com/in/ashwinkumar99" target="_blank" className="text-[#77776f] hover:text-[#111] transition-colors dark:text-[#555] dark:hover:text-white">
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link href="mailto:ufoundashwin@gmail.com" className="text-[#77776f] hover:text-[#111] transition-colors dark:text-[#555] dark:hover:text-white">
                <Mail className="w-5 h-5" />
              </Link>
            </div>
            <p className="text-sm text-[#73736b] dark:text-[#444]">Still learning. Still building. Trying to make useful things a little better each time.</p>
            <p className="text-sm text-[#73736b] dark:text-[#444]">
              Phoenix, USA
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}
