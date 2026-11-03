const UI = {
  en: {
    ...{
      role: "Cybersecurity Professional",
      tagline:
        "Security Operations ·\u00A0Offensive\u00A0Security · AI Security",
      lead: "Investigating threats. Exploring attack paths. Building knowledge across the cybersecurity universe.",
      explore: "Explore my universe",
      cv: "Download résumé",
      hint: "Drag to orbit · Scroll to zoom · Select a planet",
      prev: "Previous",
      next: "Next",
      orbit: "Orbit",
      close: "Close",
      status: "CYBERSECURITY · RESEARCH · EXPLORATION",
      standbySignal: "a signal from beyond",
      standbyNote:
        "Every discovery starts with a question. Keep looking beyond the familiar.",
      cvFile: "files/Bruno_Almeida_Resume.pdf",
    },
    stats: () => [
      ["14", "research domains"],
      ["03", "CompTIA certifications"],
    ],
  },
};
const SECTIONS = [
  {
    id: "about",
    name: { en: "About" },
    body: { en: "Sun · The center of my universe" },
    visual: { kind: "sun", size: 6 },

    html: `
      <p class="lead">
    Cybersecurity, offensive security, and artificial intelligence converge in a career shaped by investigation, analysis, and technical exploration.
</p>

<p>
    Cybersecurity professional with experience in Security Operations, incident response, threat hunting, AppSec, and penetration testing, with a growing focus on Offensive Security and AI Security.
</p>

      <dl class="facts">
        <div>
          <dt>Current role</dt>
          <dd>Information Security Analyst · V.tal</dd>
        </div>

        <div>
          <dt>Focus</dt>
          <dd>Offensive Security · Security Architecture · AppSec · AI Security</dd>
        </div>

        <div>
          <dt>Languages</dt>
          <dd>Portuguese · English · Spanish</dd>
        </div>

        <div>
          <dt>Approach</dt>
          <dd>Observe. Understand. Test. Document.</dd>
        </div>
      </dl>
    `,
  },

  {
    id: "experience",
    name: { en: "Experience" },
    body: { en: "Mercury · Field experience" },
    visual: {
      kind: "rocky",
      size: 0.9,
      orbit: 11,
      colors: ["#8f8984", "#6a645f", "#c2bbb3"],
    },

    html: `
    <article class="entry">
      <span class="eyebrow">JUL 2026 — PRESENT</span>
      <h3>V.tal · Information Security Analyst</h3>
      <p>
        Mid-level role in Security Operations. Security event and incident
        investigation, IoC analysis, threat hunting, and detection improvements
        across enterprise environments. Complementary work in AppSec, API security
        testing, risk assessments, and coordination of external penetration tests.
      </p>
    </article>

    <article class="entry">
      <span class="eyebrow">NOV 2025 — JUN 2026</span>
      <h3>V.tal · Junior Information Security Analyst</h3>
      <p>
        SIEM and EDR alert triage, log analysis, evidence collection, and incident
        escalation. Firewall and DLP policy reviews; monitoring across Microsoft 365,
        Entra ID, Google Workspace, Datadog, Grafana, and Zabbix.
      </p>
    </article>

    <article class="entry">
      <span class="eyebrow">NOV 2023 — OCT 2024</span>
      <h3>Bayer Brasil / Suhai · Junior SOC Analyst</h3>
      <p>
        Investigation of SIEM, EDR, and perimeter security alerts. Incident
        documentation and technical reporting to support audits and security
        improvements.
      </p>
    </article>

    <article class="entry">
      <span class="eyebrow">EARLIER EXPERIENCE</span>
      <h3>Risk, intelligence & communication</h3>

      <p class="career-list">
        <span>Meta / Haganá · Risk and Intelligence Agent (2021–2023).</span>
        <span>Itaú Unibanco / Belfort · Bilingual Security Monitoring Operator (2016–2021).</span>
        <span>Wizard by Pearson · English Teacher (2012–2016).</span>
      </p>
    </article>
  `,
  },
  {
    id: "focus",
    name: { en: "Focus" },
    body: { en: "Venus · Where my work converges" },

    visual: {
        kind: "gas",
        size: 1.35,
        orbit: 15.5,
        colors: ["#e8c88e", "#d6a65f", "#f5e3bd"],
    },

    html: `
        <div class="focus-grid">

            <article class="focus-card">
                <div class="focus-image">
                    <img
                        src="files/Escudo_Cybersecurity_Neon.png"
                        alt="Security Operations"
                    >
                </div>

                <div class="focus-card-content">
                    <span class="eyebrow">01 · DETECT & RESPOND</span>
                    <h3>Security Operations</h3>
                    <p>
                        Investigating security events, correlating evidence,
                        hunting threats, and improving the effectiveness of
                        security controls.
                    </p>
                </div>
            </article>

            <article class="focus-card">
                <div class="focus-image">
                    <img
                        src="files/Chapeu_Hacker_Neon.PNG"
                        alt="Offensive Security and AppSec"
                    >
                </div>

                <div class="focus-card-content">
                    <span class="eyebrow">02 · TEST & UNDERSTAND</span>
                    <h3>Offensive Security & AppSec</h3>
                    <p>
                        Vulnerability assessment, API security testing,
                        and hands-on exploration of attack paths in
                        controlled environments.
                    </p>
                </div>
            </article>

            <article class="focus-card">
                <div class="focus-image">
                    <img
                        src="files/Robo_IA_Neon.PNG"
                        alt="AI Security"
                    >
                </div>

                <div class="focus-card-content">
                    <span class="eyebrow">03 · RESEARCH & LEARN</span>
                    <h3>AI Security</h3>
                    <p>
                        Studying artificial intelligence and developing
                        a research direction around model, application,
                        and agent security.
                    </p>
                </div>
            </article>

        </div>
    `,
},
  {
    id: "projects",
    name: { en: "Projects" },
    body: { en: "Earth · Built in the real world" },

    visual: {
        kind: "earth",
        size: 1.45,
        orbit: 20.5,
        moons: [{ color: 10328724, size: 0.38 }],
    },

    html: `
        <p class="lead">Personal projects where cybersecurity, infrastructure, hardware and artificial intelligence meet hands-on experimentation.</p>

        <div class="project-grid">

            <article class="project-card">
                <div class="project-image">
                   <img src="files/home-server-cq40.png" alt="HP Compaq Presario CQ40 Home Server">
                </div>

                <div class="project-card-content">
                    <span class="eyebrow">HOME LAB · INFRASTRUCTURE</span>
                    <h3>Home Server</h3>
                    <p class="project-device">HP Compaq Presario CQ40</p>
                    <p>Repurposed legacy hardware running Debian Server as the core of my home cybersecurity laboratory and network infrastructure.</p>
                </div>
            </article>

            <article class="project-card">
                <div class="project-image project-image-cardputer">
                    <img src="files/cardputer.png" alt="M5Stack Cardputer ADV">
                </div>

                <div class="project-card-content">
                    <span class="eyebrow">HARDWARE · WIRELESS</span>
                    <h3>Cardputer ADV</h3>
                    <p class="project-device">M5Stack · ESP32-S3</p>
                    <p>A portable embedded platform used for hardware, wireless and security experimentation.</p>
                </div>
            </article>

            <article class="project-card project-card-mavie">
                <div class="project-image project-image-placeholder">
                    <span>MARIE</span>
                </div>

                <div class="project-card-content">
                    <span class="eyebrow">ARTIFICIAL INTELLIGENCE</span>
                    <h3>Marie</h3>
                    <p class="project-device">Local AI Project</p>
                    <p>An experimental local AI system exploring persistent memory, autonomous reflection and private on-device intelligence.</p>
                </div>
            </article>

        </div>
    `,
},
  {
    id: "skills",
    name: { en: "Skills" },
    body: { en: "Mars · Tools, systems & methods" },
    visual: {
        kind: "rocky",
        size: 1.05,
        orbit: 25,
        colors: ["#b8431c", "#e0703a", "#6e2410", "#f3e6dc"],
        polar: true,
        moons: [
            { color: 10129286, size: 0.2 },
            { color: 9076857, size: 0.16 },
        ],
    },
    html: '<p class="lead">From the signal in a log to the behavior of a system.</p><article class="entry"><span class="eyebrow">SECURITY OPERATIONS</span><h3>Detection & Response</h3><p>SIEM · EDR/XDR · Incident Response · Threat Hunting · Log Analysis · Detection Engineering</p></article><article class="entry"><span class="eyebrow">OFFENSIVE SECURITY</span><h3>Assessment & Exploitation</h3><p>Penetration Testing · Vulnerability Assessment · API Security · Web Security · Attack Path Analysis</p></article><article class="entry"><span class="eyebrow">SECURITY ENGINEERING</span><h3>Platforms & Controls</h3><p>Cloud Security · DLP · WAF · Identity · Endpoint Security · Security Architecture</p></article>',
},
    {
    id: "research",
    name: { en: "Research Atlas" },
    body: { en: "Jupiter" },

    visual: {
    kind: "gas",
    size: 3.2,
    orbit: 37,
    colors: ["#d9a066", "#a3542a", "#f3dcb5", "#b5452a"],
    spot: true,

    moons: [
        {
            id: "io",
            name: "Io",
            group: "offensive",
            kind: "io",
            color: 0xe7bd58,
            size: 0.34,
            glow: 0.12
        },
        {
    id: "europa",
    name: "Europa",
    group: "infrastructure",
    kind: "europa",
    color: 0xd8c7a3,
    size: 0.38,
    glow: 0.10
},
        {
    id: "ganymede",
    name: "Ganymede",
    group: "hardware",
    kind: "ganymede",
    color: 0x8f806f,
    size: 0.42,
    glow: 0.08
},
        {
    id: "callisto",
    name: "Callisto",
    group: "intelligence",
    kind: "callisto",
    color: 0x665b50,
    size: 0.46,
    glow: 0.06
}
    ],
},

    html: `
        <p class="lead">Explore the Research Atlas through Jupiter's moons.</p>

        <div class="research-groups">

            <section class="research-group" data-moon="io">
                <span class="eyebrow">IO</span>
                <h3>Offensive Security</h3>

                <article class="domain-entry">
                    <div>
                        <h3>Mobile Security</h3>
                        <p>Android and iOS applications, runtime behavior, and mobile APIs.</p>
                        <span class="planned">Planned</span>
                    </div>
                </article>

                <article class="domain-entry">
                    <div>
                        <h3>Reverse Engineering</h3>
                        <p>Static and dynamic analysis, binary formats, and program behavior.</p>
                        <span class="planned">Planned</span>
                    </div>
                </article>

                <article class="domain-entry">
                    <div>
                        <h3>Exploit Development</h3>
                        <p>Memory safety, mitigations, fuzzing, and proof-of-concept research.</p>
                        <span class="planned">Planned</span>
                    </div>
                </article>

                <article class="domain-entry">
                    <div>
                        <h3>Web Apps & APIs</h3>
                        <p>Web vulnerabilities, session security, authentication, and APIs.</p>
                        <span class="planned">Planned</span>
                    </div>
                </article>
            </section>

            <section class="research-group" data-moon="europa">
                <span class="eyebrow">EUROPA</span>
                <h3>Systems & Infrastructure</h3>

                <article class="domain-entry">
                    <div>
                        <h3>Cloud & Containers</h3>
                        <p>Cloud identity, workloads, container security, and configuration.</p>
                        <span class="planned">Planned</span>
                    </div>
                </article>

                <article class="domain-entry">
                    <div>
                        <h3>Network & Infrastructure</h3>
                        <p>Service discovery, protocols, infrastructure, and pivoting.</p>
                        <span class="planned">Planned</span>
                    </div>
                </article>

                <article class="domain-entry">
                    <div>
                        <h3>Active Directory & Identity</h3>
                        <p>Directory services, Kerberos, NTLM, trust, and privilege paths.</p>
                        <span class="planned">Planned</span>
                    </div>
                </article>

                <article class="domain-entry">
                    <div>
                        <h3>Cryptography & Cryptanalysis</h3>
                        <p>Cryptographic protocols, key management, PKI, and implementation analysis.</p>
                        <span class="planned">Planned</span>
                    </div>
                </article>
            </section>

            <section class="research-group" data-moon="ganymede">
                <span class="eyebrow">GANYMEDE</span>
                <h3>Hardware & Wireless</h3>

                <article class="domain-entry">
                    <div>
                        <h3>Wireless & RF</h3>
                        <p>Wi-Fi, Bluetooth, NFC, and software-defined radio.</p>
                        <span class="planned">Planned</span>
                    </div>
                </article>

                <article class="domain-entry">
                    <div>
                        <h3>Hardware & Firmware</h3>
                        <p>Debug interfaces, embedded devices, and firmware analysis.</p>
                        <span class="planned">Planned</span>
                    </div>
                </article>

                <article class="domain-entry">
                    <div>
                        <h3>ICS / OT & Specialized</h3>
                        <p>Industrial systems, protocols, and specialized devices.</p>
                        <span class="planned">Planned</span>
                    </div>
                </article>
            </section>

            <section class="research-group" data-moon="callisto">
                <span class="eyebrow">CALLISTO</span>
                <h3>Intelligence & Analysis</h3>

                <article class="domain-entry">
                    <div>
                        <h3>Malware & Forensics</h3>
                        <p>Malware analysis, memory evidence, and disk forensics.</p>
                        <span class="planned">Planned</span>
                    </div>
                </article>

                <article class="domain-entry">
                    <div>
                        <h3>AI Security</h3>
                        <p>LLM applications, models and data, agents, and AI red teaming.</p>
                        <span class="planned">Planned</span>
                    </div>
                </article>

                <article class="domain-entry">
                    <div>
                        <h3>OSINT & Social Engineering</h3>
                        <p>Public sources, intelligence analysis, and human factors.</p>
                        <span class="planned">Planned</span>
                    </div>
                </article>

            </section>

        </div>
    `,
},
  {
    id: "education",
    name: { en: "Education" },
    body: { en: "Saturn \u00b7 Foundations for further discovery" },
    visual: {
      kind: "ringed",
      size: 2.6,
      orbit: 46,
      colors: ["#d9c38f", "#b89a5e", "#f1e2b8"],
    },
    html: '<article class="entry"><span class="eyebrow">IN PROGRESS</span><h3>Postgraduate Program in Artificial Intelligence</h3><p>Anhembi Morumbi University</p></article><article class="entry"><span class="eyebrow">ACADEMIC BACKGROUND</span><h3>Information Security</h3><p>Adventist University of S\u00e3o Paulo (UNASP)</p></article><p>My learning combines formal education, professional certifications, and practical exploration.</p>',
  },
  {
    id: "courses",
    name: { en: "Credentials" },
    body: { en: "Uranus · Certifications & additional training" },

    visual: {
        kind: "ice",
        size: 1.95,
        orbit: 54,
        colors: ["#9fe3e6", "#7fcfd6", "#c8f4f4"],
        tilt: 1.7,
        faintRing: true,
    },

    html: `
        <p class="lead">
            A foundation across offensive security, security analysis,
            information security and service management.
        </p>

        <div class="credentials-grid">

            <article class="credential-card">
                <img class="credential-badge" src="files/CompTIA_PenTest_Plus.png" alt="CompTIA PenTest+">
                <div class="credential-info">
                    <span class="eyebrow">CERTIFICATION</span>
                    <h3>CompTIA PenTest+</h3>
                    <p>PT0-003 · CompTIA</p>
                </div>
            </article>

            <article class="credential-card">
                <img class="credential-badge" src="files/CompTIA_CySA_Plus.png" alt="CompTIA CySA+">
                <div class="credential-info">
                    <span class="eyebrow">CERTIFICATION</span>
                    <h3>CompTIA CySA+</h3>
                    <p>CS0-003 · CompTIA</p>
                </div>
            </article>

            <article class="credential-card">
                <img class="credential-badge" src="files/CompTIA_Security_Plus.png" alt="CompTIA Security+">
                <div class="credential-info">
                    <span class="eyebrow">CERTIFICATION</span>
                    <h3>CompTIA Security+</h3>
                    <p>SY0-701 · CompTIA</p>
                </div>
            </article>

            <article class="credential-card">
                <img class="credential-badge" src="files/EXIN_ISO_27001.png" alt="EXIN ISO IEC 27001">
                <div class="credential-info">
                    <span class="eyebrow">CERTIFICATION</span>
                    <h3>ISO/IEC 27001 (ISFS)</h3>
                    <p>EXIN</p>
                </div>
            </article>

            <article class="credential-card">
                <img class="credential-badge" src="files/ITIL_4_Foundation.png" alt="ITIL 4 Foundation">
                <div class="credential-info">
                    <span class="eyebrow">CERTIFICATION</span>
                    <h3>ITIL 4 Foundation</h3>
                    <p>PeopleCert</p>
                </div>
            </article>

            <article class="credential-card">
                <img class="credential-badge" src="files/Kaspersky_Endpoint_Security.png" alt="Kaspersky Endpoint Security and Management">
                <div class="credential-info">
                    <span class="eyebrow">ADDITIONAL TRAINING</span>
                    <h3>Kaspersky Endpoint Security and Management</h3>
                    <p>Kaspersky</p>
                </div>
            </article>

            <article class="credential-card">
                <img class="credential-badge" src="files/Google_Cybersecurity.png" alt="Google Cybersecurity">
                <div class="credential-info">
                    <span class="eyebrow">ADDITIONAL TRAINING</span>
                    <h3>Cybersecurity Specialization</h3>
                    <p>Google</p>
                </div>
            </article>

            <article class="credential-card">
                <img class="credential-badge" src="files/Cisco_Junior_Cybersecurity_Analyst.png" alt="Cisco Junior Cybersecurity Analyst">
                <div class="credential-info">
                    <span class="eyebrow">ADDITIONAL TRAINING</span>
                    <h3>Junior Cybersecurity Analyst</h3>
                    <p>Cisco</p>
                </div>
            </article>

        </div>
    `,
},
  {
    id: "contact",
    name: { en: "Contact" },
    body: { en: "Neptune · Open a channel" },

    visual: {
        kind: "gas",
        size: 1.9,
        orbit: 61,
        colors: ["#3d6fe0", "#2442a8", "#8fb3ff"],
    },

    html: '<p class="lead">Let’s connect.</p><p>For professional opportunities, research conversations, or collaboration on cybersecurity projects.</p><div class="contact-links"><a class="btn solid" href="mailto:brunoalmeida438@gmail.com">Email Bruno ↗</a><a class="btn" href="https://www.linkedin.com/in/bruno-almeida-bruno" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a class="btn" href="files/Bruno_Almeida_Resume.pdf" download>Download Resumé ↓</a></div><dl class="facts"><div><dt>Email</dt><dd><a href="mailto:brunoalmeida438@gmail.com">brunoalmeida438@gmail.com</a></dd></div><div><dt>Based in</dt><dd>São Paulo, Brazil</dd></div></dl>',
},
];
