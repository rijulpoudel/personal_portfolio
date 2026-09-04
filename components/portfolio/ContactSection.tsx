import { FaCamera, FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { siteConfig } from "@/data/siteConfig";

const NAV = [
  { label: "About", href: "/about" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const SOCIALS = [
  { label: "LinkedIn", href: siteConfig.author.linkedin, Icon: FaLinkedinIn },
  { label: "GitHub", href: siteConfig.author.github, Icon: FaGithub },
  { label: "Email Rijul", href: `mailto:${siteConfig.author.email}`, Icon: HiOutlineEnvelope },
  { label: "Crafteako photography", href: "https://crafteako.com", Icon: FaCamera },
];

export default function ContactSection() {
  return (
    <footer id="contact" className="contact-section" aria-labelledby="contact-title">
      <div className="portfolio-shell">
        <div className="contact-section__grid">
          <div>
            <h2 id="contact-title">
              Say hello and let&apos;s work
              <br />
              together.
            </h2>
            <a
              className="contact-section__email"
              href={`mailto:${siteConfig.author.email}`}
            >
              <HiOutlineEnvelope aria-hidden="true" />
              Email me
            </a>
          </div>

          <nav className="contact-section__nav" aria-label="Footer">
            {NAV.map((item) => (
              <a key={item.label} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <ul className="contact-section__socials" aria-label="Social links">
            {SOCIALS.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                >
                  <Icon aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="contact-section__base">
          <span>© 2026 Rijul Poudel</span>
          <a className="contact-section__top" href="#top">
            Back to top
            <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
