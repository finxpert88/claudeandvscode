import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Logo from './Logo.jsx'
import { GitHubIcon, XIcon, LinkedInIcon, YouTubeIcon, DiscordIcon, MailIcon } from './Icons.jsx'

// Placeholder profile URLs: swap in the real handles when ready.
const socials = [
  { label: 'GitHub', href: 'https://github.com/', Icon: GitHubIcon },
  { label: 'X (Twitter)', href: 'https://x.com/', Icon: XIcon },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/', Icon: LinkedInIcon },
  { label: 'YouTube', href: 'https://www.youtube.com/', Icon: YouTubeIcon },
  { label: 'Discord', href: 'https://discord.com/', Icon: DiscordIcon },
  { label: 'Email', href: 'mailto:hello@claudeandvscode.com', Icon: MailIcon },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo size={38} />
          <p>Friendly, practical guides for getting the most out of Claude inside Visual Studio Code.</p>
          <div className="socials">
            {socials.map(({ label, href, Icon }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                aria-label={label}
                className="social"
                whileHover={{ y: -4, scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon />
              </motion.a>
            ))}
          </div>
        </div>

        <div>
          <h4>Explore</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/#setup">Setup guide</Link></li>
            <li><Link to="/#tips">Pro tips</Link></li>
            <li><Link to="/#faq">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h4>Site</h4>
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><a href="mailto:hello@claudeandvscode.com">hello@claudeandvscode.com</a></li>
          </ul>
        </div>

        <div>
          <h4>Official docs</h4>
          <ul>
            <li><a href="https://docs.anthropic.com/en/docs/claude-code/overview" target="_blank" rel="noreferrer">Claude Code docs</a></li>
            <li><a href="https://code.visualstudio.com/docs" target="_blank" rel="noreferrer">VS Code docs</a></li>
            <li><a href="https://marketplace.visualstudio.com/vscode" target="_blank" rel="noreferrer">VS Code Marketplace</a></li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} ClaudeAndVSCode.com. All rights reserved.</span>
        <span className="footer-note">An independent community site. Not affiliated with Anthropic or Microsoft.</span>
      </div>
    </footer>
  )
}
