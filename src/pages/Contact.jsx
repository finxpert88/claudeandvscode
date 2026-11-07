import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import TypingText from '../components/TypingText.jsx'
import Reveal from '../components/Reveal.jsx'
import { MailIcon } from '../components/Icons.jsx'

const EMAIL = 'hello@claudeandvscode.com'
const topics = ['General question', 'Setup help', 'Suggest a guide', 'Report an error', 'Partnership']

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', topic: topics[0], message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const [copied, setCopied] = useState(false)

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Please enter your name'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Please enter a valid email'
    if (form.message.trim().length < 10) errs.message = 'A little more detail, please (10+ characters)'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  // No backend yet: open the visitor's email app with the message pre-filled.
  const submit = (e) => {
    e.preventDefault()
    if (!validate()) return
    const subject = encodeURIComponent(`[${form.topic}] from ${form.name}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
    setSent(true)
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      // ignore
    }
  }

  return (
    <>
      <section className="page-hero">
        <div className="container narrow center">
          <span className="eyebrow">Contact</span>
          <h1><TypingText phrases="Let’s talk." speed={80} /></h1>
          <Reveal delay={0.3}>
            <p className="lead">Questions, feedback, guide ideas or corrections: drop us a line and we’ll get back to you.</p>
          </Reveal>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container contact-grid">
          <Reveal from="left">
            <div className="contact-card">
              <div className="contact-icon"><MailIcon /></div>
              <h3>Email us directly</h3>
              <a href={`mailto:${EMAIL}`} className="contact-email">{EMAIL}</a>
              <button className="btn btn-ghost btn-sm" onClick={copyEmail}>{copied ? 'Copied ✓' : 'Copy address'}</button>
              <hr />
              <h4>Good to include</h4>
              <ul className="checklist">
                <li>Your operating system (Windows, macOS, Linux)</li>
                <li>Whether you use the extension or the terminal</li>
                <li>Any error message, copied exactly</li>
              </ul>
              <p className="muted">We aim to reply within 2–3 working days.</p>
            </div>
          </Reveal>

          <Reveal from="right">
            <div className="form-card">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div key="done" className="form-done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                    <motion.div className="form-done-icon" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.15 }}>✓</motion.div>
                    <h3>Your email app should be open</h3>
                    <p>Just hit send there. If nothing opened, email us at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>
                    <button className="btn btn-ghost" onClick={() => { setSent(false); setForm({ name: '', email: '', topic: topics[0], message: '' }) }}>
                      Write another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={submit} noValidate exit={{ opacity: 0 }}>
                    <div className="field-row">
                      <Field label="Your name" error={errors.name}>
                        <input name="name" value={form.name} onChange={update} placeholder="Ada Lovelace" />
                      </Field>
                      <Field label="Your email" error={errors.email}>
                        <input name="email" type="email" value={form.email} onChange={update} placeholder="ada@example.com" />
                      </Field>
                    </div>
                    <Field label="Topic">
                      <select name="topic" value={form.topic} onChange={update}>
                        {topics.map((t) => <option key={t}>{t}</option>)}
                      </select>
                    </Field>
                    <Field label="Message" error={errors.message}>
                      <textarea name="message" rows="6" value={form.message} onChange={update} placeholder="How can we help?" />
                    </Field>
                    <motion.button type="submit" className="btn btn-primary btn-block" whileTap={{ scale: 0.97 }}>
                      Send message →
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

function Field({ label, error, children }) {
  return (
    <label className={`field ${error ? 'has-error' : ''}`}>
      <span>{label}</span>
      {children}
      <AnimatePresence>
        {error && (
          <motion.small initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
            {error}
          </motion.small>
        )}
      </AnimatePresence>
    </label>
  )
}
