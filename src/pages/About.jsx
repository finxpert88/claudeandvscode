import { Link } from 'react-router-dom'
import TypingText from '../components/TypingText.jsx'
import Reveal from '../components/Reveal.jsx'

const values = [
  { icon: '🧭', title: 'Clear over clever', text: 'Plain-English explanations, with jargon explained the first time it appears.' },
  { icon: '✅', title: 'Accurate and current', text: 'Tools change quickly. We test what we publish and update guides as things move.' },
  { icon: '🤝', title: 'Independent', text: 'We’re not affiliated with Anthropic or Microsoft. We just like tools that work well together.' },
  { icon: '🌱', title: 'Beginner friendly', text: 'Whether it’s your first line of code or your ten-thousandth, there’s a place to start.' },
]

const timeline = [
  { when: 'The problem', what: 'Getting Claude working inside VS Code meant piecing together docs, forum threads and videos.' },
  { when: 'The idea', what: 'One friendly place with the setup steps, tips and answers, all in one spot.' },
  { when: 'Today', what: 'ClaudeAndVSCode.com: a growing collection of guides, built with the very tools it covers.' },
  { when: 'Next', what: 'Video walkthroughs, workflow recipes, and community-submitted tips.' },
]

export default function About() {
  return (
    <>
      <section className="page-hero">
        <div className="container narrow center">
          <span className="eyebrow">About</span>
          <h1><TypingText phrases="Why this site exists" speed={65} /></h1>
          <Reveal delay={0.4}>
            <p className="lead">
              AI coding assistants are powerful, but getting started can feel confusing. ClaudeAndVSCode.com was set up
              to make the first steps simple and to help people get real value from Claude in the editor they already use.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <Reveal from="left">
            <h2>The story</h2>
            <p>
              Like a lot of developers, we started using Claude for coding and quickly realised how much time it could
              save. The setup, though, wasn’t obvious to everyone: which extension, which plan, terminal or sidebar,
              and how to get good results once it was running.
            </p>
            <p>
              Friends and colleagues kept asking the same questions, so we wrote the answers down. That list of notes
              became this site.
            </p>
          </Reveal>
          <Reveal from="right">
            <div className="timeline">
              {timeline.map((t) => (
                <div key={t.when} className="timeline-item">
                  <span className="timeline-dot" />
                  <strong>{t.when}</strong>
                  <p>{t.what}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">What we care about</span>
            <h2>Our principles</h2>
          </Reveal>
          <div className="grid-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="card">
                  <div className="card-icon">{v.icon}</div>
                  <h3>{v.title}</h3>
                  <p>{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="cta">
              <h2>Want to help shape the site?</h2>
              <p>Suggest a guide, report something out of date, or just say hello.</p>
              <Link to="/contact" className="btn btn-light">Contact us</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
