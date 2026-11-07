import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import TypingText from '../components/TypingText.jsx'
import Carousel from '../components/Carousel.jsx'
import Reveal from '../components/Reveal.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import Accordion from '../components/Accordion.jsx'

const features = [
  { icon: '💬', title: 'Chat in your editor', text: 'Ask about any file, function or error without leaving VS Code.' },
  { icon: '🧠', title: 'Understands your project', text: 'Claude explores your codebase to give answers that fit how your code actually works.' },
  { icon: '🛠️', title: 'Makes real edits', text: 'Multi-file changes, refactors and new features, shown as diffs you approve.' },
  { icon: '⚡', title: 'Runs commands', text: 'Tests, builds, linters and git: Claude can run them and react to the output.' },
  { icon: '🔌', title: 'Extensible with MCP', text: 'Connect tools and data sources through the Model Context Protocol.' },
  { icon: '🔒', title: 'You stay in charge', text: 'Permission prompts and modes let you decide what Claude is allowed to do.' },
]

const extensionSteps = [
  {
    title: 'Install VS Code',
    text: 'Download Visual Studio Code for Windows, macOS or Linux from code.visualstudio.com and keep it up to date.',
  },
  {
    title: 'Add the Claude Code extension',
    text: 'Open the Extensions view (Ctrl+Shift+X on Windows/Linux, Cmd+Shift+X on Mac), search for “Claude Code”, and install the extension published by Anthropic.',
  },
  {
    title: 'Open Claude and sign in',
    text: 'Click the Claude spark icon in the editor toolbar or sidebar, or run “Claude Code” from the Command Palette (Ctrl/Cmd+Shift+P). Sign in with your Claude account or an Anthropic Console API key.',
  },
  {
    title: 'Give it some context',
    text: 'Open your project folder and ask Claude to create a CLAUDE.md file with your conventions and commands. Claude reads it at the start of every session.',
    code: '/init',
    label: 'claude chat',
  },
]

const cliSteps = [
  {
    title: 'Install Node.js 18+',
    text: 'The command-line version is installed through npm, so you’ll need a recent Node.js from nodejs.org.',
    code: 'node --version',
  },
  {
    title: 'Install Claude Code globally',
    text: 'Run this once in any terminal. It adds the claude command to your system.',
    code: 'npm install -g @anthropic-ai/claude-code',
  },
  {
    title: 'Start it in VS Code’s terminal',
    text: 'Open the integrated terminal (Ctrl+`), go to your project folder and launch Claude. The first run walks you through signing in.',
    code: 'cd my-project\nclaude',
  },
  {
    title: 'Ask for something',
    text: 'Describe what you want in plain English. Claude plans, edits files, runs commands, and asks before doing anything risky.',
    code: '> explain how authentication works in this repo',
    label: 'claude',
  },
]

const tips = [
  { n: '01', title: 'Write a great CLAUDE.md', text: 'List build and test commands, code style, and “never do X” rules. It’s the single biggest boost to answer quality.' },
  { n: '02', title: 'Plan before you build', text: 'For bigger tasks, ask Claude to outline a plan first. Agree on the approach, then let it write the code.' },
  { n: '03', title: 'Point at the right files', text: 'Mention specific files or selected code so Claude starts in the right place instead of searching.' },
  { n: '04', title: 'Work in small steps', text: 'Small, reviewable changes are easier to check and easier to undo. Commit often.' },
  { n: '05', title: 'Let it run the tests', text: 'Ask Claude to run your test suite after changes so it can catch and fix its own mistakes.' },
  { n: '06', title: 'Create custom commands', text: 'Save prompts you reuse as slash commands so your whole team can run them in one go.' },
]

const faqs = [
  { q: 'Do I need a paid plan?', a: 'Claude Code works with a paid Claude subscription (such as Pro or Max) or with pay-as-you-go API credits from the Anthropic Console. Check Anthropic’s pricing page for the current options.' },
  { q: 'Should I use the extension or the terminal?', a: 'Both use the same Claude Code under the hood. The extension gives you a graphical chat panel and inline diffs; the terminal version suits people who live on the command line. Many developers use both.' },
  { q: 'Does it work on Windows, macOS and Linux?', a: 'Yes. VS Code and Claude Code both run on all three. On Windows you can run it natively or through WSL.' },
  { q: 'Can Claude change my files without asking?', a: 'By default Claude asks for permission before editing files or running commands. You can loosen or tighten that with permission settings and modes.' },
  { q: 'Where can I find the official documentation?', a: 'Anthropic publishes full Claude Code documentation at docs.anthropic.com. This site is an independent, beginner-friendly companion to it.' },
]

function Steps({ steps }) {
  return (
    <ol className="steps">
      {steps.map((s, i) => (
        <Reveal key={s.title} from={i % 2 ? 'right' : 'left'} delay={i * 0.08} className="step">
          <div className="step-num">{i + 1}</div>
          <div className="step-body">
            <h3>{s.title}</h3>
            <p>{s.text}</p>
            {s.code && <CodeBlock code={s.code} label={s.label} />}
          </div>
        </Reveal>
      ))}
    </ol>
  )
}

export default function Home() {
  const [tab, setTab] = useState('extension')

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container hero-inner">
          <motion.span className="pill" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <span className="pill-dot" /> Your guide to AI-assisted coding
          </motion.span>
          <h1 className="hero-title">
            <TypingText phrases="Claude + VS Code," speed={70} />
            <br />
            <span className="gradient-text">
              <TypingText
                phrases={['set up right.', 'explained simply.', 'working for you.']}
                loop
                startDelay={1400}
                speed={65}
              />
            </span>
          </h1>
          <motion.p className="hero-sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }}>
            Step-by-step setup, practical tips and honest answers for bringing Claude into Visual Studio Code.
          </motion.p>
          <motion.div className="hero-ctas" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
            <a href="#setup" className="btn btn-primary">Start the setup guide →</a>
            <Link to="/about" className="btn btn-ghost">Why this site?</Link>
          </motion.div>
        </div>

        <motion.div
          className="container"
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Carousel />
        </motion.div>
      </section>

      {/* FEATURES */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">What you get</span>
            <h2>An AI teammate inside your editor</h2>
            <p>Claude Code brings Anthropic’s Claude models straight into your development workflow.</p>
          </Reveal>
          <div className="grid-3">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.07}>
                <motion.div className="card" whileHover={{ y: -6 }}>
                  <div className="card-icon">{f.icon}</div>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SETUP */}
      <section className="section section--alt" id="setup">
        <div className="container narrow">
          <Reveal className="section-head">
            <span className="eyebrow">Setup guide</span>
            <h2>Get Claude running in VS Code</h2>
            <p>Pick the route that suits you. Both take only a few minutes.</p>
          </Reveal>

          <div className="tabs" role="tablist">
            {[
              { id: 'extension', label: 'VS Code extension' },
              { id: 'cli', label: 'Terminal (CLI)' },
            ].map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                className={`tab ${tab === t.id ? 'is-active' : ''}`}
                onClick={() => setTab(t.id)}
              >
                {tab === t.id && <motion.span layoutId="tab-bg" className="tab-bg" transition={{ type: 'spring', stiffness: 300, damping: 28 }} />}
                <span className="tab-label">{t.label}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <Steps steps={tab === 'extension' ? extensionSteps : cliSteps} />
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* TIPS */}
      <section className="section" id="tips">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Pro tips</span>
            <h2>Get better results, faster</h2>
            <p>Habits that make a real difference once you’re up and running.</p>
          </Reveal>
          <div className="grid-3">
            {tips.map((t, i) => (
              <Reveal key={t.n} delay={i * 0.07} from={i % 3 === 0 ? 'left' : i % 3 === 2 ? 'right' : 'up'}>
                <div className="tip">
                  <span className="tip-num">{t.n}</span>
                  <h3>{t.title}</h3>
                  <p>{t.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section--alt" id="faq">
        <div className="container narrow">
          <Reveal className="section-head">
            <span className="eyebrow">FAQ</span>
            <h2>Common questions</h2>
          </Reveal>
          <Reveal><Accordion items={faqs} /></Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="cta">
              <h2>Stuck, or have a tip to share?</h2>
              <p>We’d love to hear from you. Questions, corrections and ideas are all welcome.</p>
              <Link to="/contact" className="btn btn-light">Get in touch</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
