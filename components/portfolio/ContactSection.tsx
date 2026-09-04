import { FaCamera, FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { siteConfig } from "@/data/siteConfig";

const NAV = [
  { label: "Lately", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#project-index" },
  { label: "Photos", href: "/photos" },
  { label: "Writing", href: "/writing" },
];

const SOCIALS = [
  { label: "LinkedIn", href: siteConfig.author.linkedin, Icon: FaLinkedinIn },
  { label: "GitHub", href: siteConfig.author.github, Icon: FaGithub },
  { label: "Email Rijul", href: `mailto:${siteConfig.author.email}`, Icon: HiOutlineEnvelope },
  { label: "Crafteako photography", href: "https://crafteako.com", Icon: FaCamera },
];

function FooterSkyline() {
  return (
    <svg
      className="contact-section__skyline"
      viewBox="0 0 1200 200"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      <g fill="none" stroke="#f5ece3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {/* stars + moon */}
        <path d="M120 30 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3 Z" />
        <path d="M260 60 l2 6 6 2 -6 2 -2 6 -2 -6 -6 -2 6 -2 Z" />
        <path d="M640 26 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3 Z" />
        <path d="M930 52 l2 6 6 2 -6 2 -2 6 -2 -6 -6 -2 6 -2 Z" />
        <path d="M1080 24 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3 Z" />
        <path d="M576 18 a14 14 0 1 0 11 23 a10.5 10.5 0 1 1 -11 -23" />

        {/* ground */}
        <path d="M0 182 C200 176 400 186 600 181 C800 176 1000 186 1200 180" />

        {/* little house */}
        <path d="M60 182 L60 130 L110 130 L110 182" />
        <path d="M50 132 L85 104 L120 132" />
        <path d="M78 182 L78 158 L94 158 L94 182" />
        <rect className="sky-win" x="64" y="140" width="10" height="10" />
        <rect className="sky-win sky-win--late" x="96" y="140" width="10" height="10" />

        {/* pines */}
        <path d="M170 182 L170 150 M170 150 L152 150 L170 128 L188 150 Z M170 138 L158 138 L170 120 L182 138" />
        <path d="M215 182 L215 158 M215 158 L201 158 L215 140 L229 158 Z" />

        {/* corner shop */}
        <path d="M270 182 L270 120 L370 120 L370 182" />
        <path d="M262 120 L262 108 L378 108 L378 120" />
        <path d="M270 108 q12 -12 25 0 q13 -12 25 0 q13 -12 25 0 q12 -12 25 0" />
        <path d="M292 182 L292 148 L348 148 L348 182" />
        <path d="M292 148 L292 140 M310 148 L310 140 M328 148 L328 140 M348 148 L348 140" />
        <rect className="sky-win" x="278" y="128" width="12" height="10" />
        <rect className="sky-win sky-win--late" x="350" y="128" width="12" height="10" />

        {/* tall house */}
        <path d="M430 182 L430 90 L530 90 L530 182" />
        <path d="M420 92 L480 60 L540 92" />
        <rect className="sky-win" x="444" y="104" width="12" height="12" />
        <rect x="474" y="104" width="12" height="12" />
        <rect className="sky-win sky-win--late" x="444" y="128" width="12" height="12" />
        <rect x="474" y="128" width="12" height="12" />
        <path d="M470 182 L470 156 L492 156 L492 182" />

        {/* ferris wheel */}
        <circle cx="660" cy="110" r="52" />
        <circle cx="660" cy="110" r="4" />
        <path d="M660 110 L660 58 M660 110 L697 73 M660 110 L712 110 M660 110 L697 147 M660 110 L660 162 M660 110 L623 147 M660 110 L608 110 M660 110 L623 73" />
        <path d="M618 182 L648 114 M702 182 L672 114" />
        <rect x="652" y="52" width="14" height="10" rx="2" />
        <rect x="704" y="104" width="14" height="10" rx="2" />
        <rect x="652" y="156" width="14" height="10" rx="2" />
        <rect x="600" y="104" width="14" height="10" rx="2" />

        {/* round tree + bench */}
        <path d="M800 182 L800 150" />
        <path d="M778 150 a22 22 0 1 0 44 0 a22 22 0 1 0 -44 0" />
        <path d="M850 182 L850 170 M880 182 L880 170 M844 172 L886 172" />

        {/* house with chimney */}
        <path d="M940 182 L940 124 L1040 124 L1040 182" />
        <path d="M930 126 L990 92 L1050 126" />
        <path d="M1010 104 L1010 88 L1020 88 L1020 98" />
        <rect className="sky-win" x="954" y="138" width="12" height="12" />
        <rect x="984" y="138" width="12" height="12" />
        <rect className="sky-win sky-win--late" x="1014" y="138" width="12" height="12" />

        {/* bushes */}
        <path d="M1100 182 q4 -14 16 -14 q4 -8 12 -8 q10 0 12 8 q12 0 16 14" />
        <path d="M20 182 q4 -12 14 -12 q4 -7 11 -7 q9 0 11 7 q10 0 14 12" />
      </g>
    </svg>
  );
}

export default function ContactSection() {
  return (
    <footer id="contact" className="contact-section" aria-labelledby="contact-title">
      <FooterSkyline />
      <div className="portfolio-shell">
        <h2 id="contact-title" className="contact-section__title">
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

        <div className="contact-section__grid">
          <nav className="contact-section__nav" aria-label="Footer">
            {NAV.map((item) => (
              <a key={item.label} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="contact-section__connect">
            <p className="contact-section__connect-label">connect</p>
            <ul className="contact-section__socials" aria-label="Social links">
              {SOCIALS.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={label}
                  >
                    <svg className="footer-orbit" viewBox="0 0 44 44" aria-hidden="true">
                      <circle cx="22" cy="22" r="20" fill="none" stroke="#e85749" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="6 7" />
                    </svg>
                    <Icon aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="contact-section__base">
          <span>© 2026 Rijul Poudel · Made with too much coffee</span>
          <a className="contact-section__top" href="#top">
            Back to top
            <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
