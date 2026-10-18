import { useState, useRef, useEffect, useMemo, type ComponentType } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Check,
  Cpu,
  Sparkles,
  Server,
  Code,
  Database,
  Layout,
  Wrench,
  Layers,
  MonitorSmartphone,
  Cable,
  FileCode2,
  SlidersHorizontal,
} from 'lucide-react'
import {
  SiPython,
  SiCplusplus,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss,
  SiSpringboot,
  SiSpring,
  SiSpringsecurity,
  SiHibernate,
  SiReact,
  SiTailwindcss,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiGit,
  SiGithub,
  SiDocker,
  SiPostman,
  SiApachemaven,
  SiIntellijidea,
  SiGithubcopilot,
  SiGooglegemini,
  SiClaude,
  SiCursor,
} from 'react-icons/si'
import { FaJava } from 'react-icons/fa6'
import { VscVscode } from 'react-icons/vsc'
import { ChatGptIcon, MicrosoftCopilotIcon, AntigravityIcon } from '@/components/brandIcons'
import { gsap } from '@/lib/gsap'

export interface SkillItem {
  name: string
  category: string
  detail: string
  icon: ComponentType<{ className?: string }>
}

export const CATEGORIES = [
  { id: 'all', title: 'All', icon: Layers },
  { id: 'languages', title: 'Programming Languages', icon: Code },
  { id: 'backend', title: 'Backend', icon: Server },
  { id: 'frontend', title: 'Frontend', icon: Layout },
  { id: 'database', title: 'Database', icon: Database },
  { id: 'tools', title: 'Tools', icon: Wrench },
  { id: 'ai-tools', title: 'AI Tools', icon: Sparkles },
] as const

export const ALL_SKILLS: SkillItem[] = [
  // 1. Programming Languages
  {
    name: 'Java',
    category: 'Programming Languages',
    detail: 'Java 17/21 LTS · Core OOP, Collections, Concurrency & Stream APIs',
    icon: FaJava,
  },
  {
    name: 'Python',
    category: 'Programming Languages',
    detail: 'Research model inference, scripting & prototype data pipelines',
    icon: SiPython,
  },
  {
    name: 'C++',
    category: 'Programming Languages',
    detail: 'Algorithmic problem solving, memory structures & object-oriented programming',
    icon: SiCplusplus,
  },
  {
    name: 'JavaScript',
    category: 'Programming Languages',
    detail: 'ES6+ modern syntax, asynchronous execution & Fetch API',
    icon: SiJavascript,
  },
  {
    name: 'TypeScript',
    category: 'Programming Languages',
    detail: 'Strict static type definitions, interfaces & compile-time safety',
    icon: SiTypescript,
  },
  {
    name: 'HTML5',
    category: 'Programming Languages',
    detail: 'Semantic structuring, document accessibility & standard layouts',
    icon: SiHtml5,
  },
  {
    name: 'CSS3',
    category: 'Programming Languages',
    detail: 'Responsive CSS3, Grid, Flexbox architecture & modern variables',
    icon: SiCss,
  },
  {
    name: 'SQL',
    category: 'Programming Languages',
    detail: 'Relational query construction, joins, aggregation & indexing',
    icon: Database,
  },

  // 2. Backend
  {
    name: 'Spring Boot',
    category: 'Backend',
    detail: 'Primary enterprise framework for scalable, production REST services',
    icon: SiSpringboot,
  },
  {
    name: 'Spring MVC',
    category: 'Backend',
    detail: 'Controller routing, request mapping & architectural separation',
    icon: SiSpring,
  },
  {
    name: 'Spring Security',
    category: 'Backend',
    detail: 'Authentication filters, role authorization & stateless JWT security',
    icon: SiSpringsecurity,
  },
  {
    name: 'REST APIs',
    category: 'Backend',
    detail: 'Stateless resource endpoints, HTTP semantics & JSON contracts',
    icon: Server,
  },
  {
    name: 'Hibernate',
    category: 'Backend',
    detail: 'ORM persistence, HQL queries, caching & relational mapping',
    icon: SiHibernate,
  },
  {
    name: 'JPA',
    category: 'Backend',
    detail: 'Jakarta Persistence API, entity lifecycles & declarative queries',
    icon: Layers,
  },
  {
    name: 'JDBC',
    category: 'Backend',
    detail: 'Direct SQL execution, connection pooling & ACID transaction control',
    icon: Cable,
  },
  {
    name: 'Servlets',
    category: 'Backend',
    detail: 'Java EE HTTP lifecycle, filter pipelines & request handling',
    icon: Cpu,
  },
  {
    name: 'JSP',
    category: 'Backend',
    detail: 'Server-side templating, dynamic pages & Java web architecture',
    icon: FileCode2,
  },

  // 3. Frontend
  {
    name: 'React',
    category: 'Frontend',
    detail: 'Component-based architecture, modern hooks & state workflows',
    icon: SiReact,
  },
  {
    name: 'Tailwind CSS',
    category: 'Frontend',
    detail: 'Utility-first responsive layouts, tokens & design systems',
    icon: SiTailwindcss,
  },
  {
    name: 'Responsive Web Design',
    category: 'Frontend',
    detail: 'Cross-device fluid grids, mobile-first breakpoints & typography',
    icon: MonitorSmartphone,
  },

  // 4. Database
  {
    name: 'MySQL',
    category: 'Database',
    detail: 'Relational database engine, schema design & transactional storage',
    icon: SiMysql,
  },
  {
    name: 'PostgreSQL',
    category: 'Database',
    detail: 'Enterprise relational database, advanced constraints & indexing',
    icon: SiPostgresql,
  },
  {
    name: 'MongoDB',
    category: 'Database',
    detail: 'Document-oriented NoSQL storage, BSON collections & aggregation',
    icon: SiMongodb,
  },
  {
    name: 'Relational Database Design',
    category: 'Database',
    detail: 'Entity relationships, 3NF normalization, keys & ACID integrity',
    icon: Database,
  },
  {
    name: 'SQL Query Optimization',
    category: 'Database',
    detail: 'Query planning, index tuning, execution analysis & join tuning',
    icon: SlidersHorizontal,
  },

  // 5. Tools
  {
    name: 'Git',
    category: 'Tools',
    detail: 'Distributed version control, atomic commits & branch workflows',
    icon: SiGit,
  },
  {
    name: 'GitHub',
    category: 'Tools',
    detail: 'Remote repository hosting, pull requests & code collaboration',
    icon: SiGithub,
  },
  {
    name: 'Docker',
    category: 'Tools',
    detail: 'Containerized environments, Dockerfile builds & container isolation',
    icon: SiDocker,
  },
  {
    name: 'Postman',
    category: 'Tools',
    detail: 'REST endpoint testing, payload inspection & environment configs',
    icon: SiPostman,
  },
  {
    name: 'Maven',
    category: 'Tools',
    detail: 'Java build lifecycle, dependency management & packaging',
    icon: SiApachemaven,
  },
  {
    name: 'IntelliJ IDEA',
    category: 'Tools',
    detail: 'Primary enterprise Java IDE, profiling, testing & refactoring',
    icon: SiIntellijidea,
  },
  {
    name: 'VS Code',
    category: 'Tools',
    detail: 'Extensible editor for TypeScript, web frontend & rapid scripting',
    icon: VscVscode,
  },

  // 6. AI Tools
  {
    name: 'ChatGPT',
    category: 'AI Tools',
    detail: 'Architecture design exploration, test scaffolding & code review',
    icon: ChatGptIcon,
  },
  {
    name: 'GitHub Copilot',
    category: 'AI Tools',
    detail: 'Contextual inline code assistance & algorithmic scaffolding',
    icon: SiGithubcopilot,
  },
  {
    name: 'Google Gemini',
    category: 'AI Tools',
    detail: 'Deep technical reasoning, documentation analysis & research',
    icon: SiGooglegemini,
  },
  {
    name: 'Claude',
    category: 'AI Tools',
    detail: 'Complex code refactoring, system architecture & design analysis',
    icon: SiClaude,
  },
  {
    name: 'Microsoft Copilot',
    category: 'AI Tools',
    detail: 'Enterprise workflow assistance & productivity acceleration',
    icon: MicrosoftCopilotIcon,
  },
  {
    name: 'Antigravity',
    category: 'AI Tools',
    detail: 'Autonomous agentic coding, multi-agent development & automation',
    icon: AntigravityIcon,
  },
  {
    name: 'Cursor',
    category: 'AI Tools',
    detail: 'AI-first code editor with deep codebase indexing & semantic editing',
    icon: SiCursor,
  },
]

export function Skills() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all')
  const containerRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)

  // Find the selected category object
  const activeCategory = CATEGORIES.find((c) => c.id === selectedCategoryId) || CATEGORIES[0]

  // Filter skills based on selection
  const filteredSkills = useMemo(() => {
    if (selectedCategoryId === 'all') {
      return ALL_SKILLS
    }
    return ALL_SKILLS.filter((s) => s.category === activeCategory.title)
  }, [selectedCategoryId, activeCategory])

  // Count skills per category
  const counts = useMemo(() => {
    const map: Record<string, number> = { all: ALL_SKILLS.length }
    CATEGORIES.forEach((cat) => {
      if (cat.id !== 'all') {
        map[cat.id] = ALL_SKILLS.filter((s) => s.category === cat.title).length
      }
    })
    return map
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
          },
        }
      )

      if (tabsRef.current) {
        gsap.fromTo(
          tabsRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: tabsRef.current,
              start: 'top 85%',
              end: 'bottom 15%',
              toggleActions: 'play reverse play reverse',
            },
          }
        )
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      id="skills"
      aria-label="Technical Skills Matrix"
      className="w-full bg-canvas border-t border-border-subtle scroll-mt-24 py-16 sm:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 w-full">
        {/* Header - Editorial Title & Scope with Selective Color */}
        <div ref={headerRef} className="space-y-3 mb-10 sm:mb-12">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-accent-green">
            <Cpu className="w-4 h-4 text-accent-green" />
            <span>Technical Skills</span>
          </div>

          <h2 className="font-display font-bold text-display text-text-primary tracking-tight leading-tight">
            Competencies &amp; <span className="text-accent-green">Technologies</span>
          </h2>

          <p className="font-sans text-sm sm:text-base text-text-secondary max-w-2xl leading-relaxed">
            Organized across programming languages, backend systems, modern frontend, relational &amp; NoSQL databases,
            engineering workflows, and verified AI productivity tools.
          </p>
        </div>

        {/* Filter Tabs & Skill Showcase */}
        <div ref={tabsRef} className="space-y-8">
          {/* Category Filter Pills in Exact Requested Order */}
          <div
            role="tablist"
            aria-label="Skill categories"
            className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none"
          >
            {CATEGORIES.map((cat) => {
              const isActive = cat.id === selectedCategoryId
              const Icon = cat.icon
              const count = counts[cat.id]

              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={isActive}
                  id={`skill-tab-${cat.id}`}
                  aria-controls="skills-grid"
                  type="button"
                  onClick={() => setSelectedCategoryId(cat.id)}
                  className={`group relative flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs font-mono font-medium whitespace-nowrap transition-all duration-200 border focus-visible:ring-2 focus-visible:ring-accent-green cursor-pointer ${
                    isActive
                      ? 'bg-accent-green text-white border-accent-green shadow-sm'
                      : 'bg-surface-1 text-text-secondary border-border-medium hover:border-accent-green hover:text-text-primary'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-text-muted group-hover:text-accent-green'}`} />
                  <span>{cat.title}</span>
                  <span
                    className={`ml-1 text-[11px] px-1.5 py-0.5 rounded-full font-mono ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-surface-2 text-text-muted group-hover:text-text-secondary'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Active Category Meta Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-border-subtle text-xs font-mono text-text-muted">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-green" />
              <span className="text-text-primary font-semibold">
                {activeCategory.title === 'All' ? 'All Technical Competencies' : activeCategory.title}
              </span>
            </div>
            <span>
              Showing {filteredSkills.length} {filteredSkills.length === 1 ? 'technology' : 'technologies'}
            </span>
          </div>

          {/* Skills Grid with Verified Brand / Technology Icons */}
          <div id="skills-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill) => {
                const SkillIcon = skill.icon

                return (
                  <motion.div
                    layout
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="p-5 rounded-2xl bg-surface-1 border border-border-subtle hover:border-accent-green hover:shadow-surface-card transition-all duration-200 flex flex-col justify-between space-y-3.5 group"
                    tabIndex={0}
                    role="article"
                    aria-label={`Skill: ${skill.name}, Category: ${skill.category}`}
                  >
                    <div className="space-y-3">
                      {/* Top Row: Icon + Name + Category Pill */}
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Distinctive Logo / Icon Container */}
                          <div
                            className="w-10 h-10 rounded-xl bg-surface-2 border border-border-subtle flex items-center justify-center text-text-primary group-hover:text-accent-green group-hover:border-accent-green group-hover:bg-surface-1 transition-all duration-200 shrink-0"
                            aria-hidden="true"
                          >
                            <SkillIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
                          </div>

                          <h3 className="font-display font-bold text-base text-text-primary group-hover:text-accent-green transition-colors truncate">
                            {skill.name}
                          </h3>
                        </div>

                        <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-surface-2 text-text-muted border border-border-subtle shrink-0">
                          {skill.category}
                        </span>
                      </div>

                      <p className="font-sans text-xs text-text-secondary leading-relaxed pl-0.5">
                        {skill.detail}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-border-subtle/60 flex items-center justify-between text-[11px] font-mono text-text-muted">
                      <span className="text-[10px] uppercase tracking-wider">Verified Skill</span>
                      <Check className="w-3.5 h-3.5 text-accent-green" aria-hidden="true" />
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
