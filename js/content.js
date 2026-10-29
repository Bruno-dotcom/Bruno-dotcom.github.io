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
        Cybersecurity professional focused on understanding threats, attack paths,
        and the security controls required to strengthen complex environments.
      </p>

      <p>
        Based in São Paulo, Brazil, with experience across Security Operations,
        Incident Response, Threat Hunting, Security Architecture, AppSec,
        and Penetration Testing. Current interests include Offensive Security,
        AI Security, and hands-on technical research.
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
    body: { en: "Venus \u00b7 Where my work converges" },
    visual: {
      kind: "gas",
      size: 1.35,
      orbit: 15.5,
      colors: ["#e8c88e", "#d6a65f", "#f5e3bd"],
    },
    html: '<article class="entry"><span class="eyebrow">01 \u00b7 DETECT & RESPOND</span><h3>Security Operations</h3><p>Investigating security events, correlating evidence, hunting threats, and improving the effectiveness of security controls.</p></article><article class="entry"><span class="eyebrow">02 \u00b7 TEST & UNDERSTAND</span><h3>Offensive Security & AppSec</h3><p>Vulnerability assessment, API security testing, and hands-on exploration of attack paths in controlled environments.</p></article><article class="entry"><span class="eyebrow">03 \u00b7 RESEARCH & LEARN</span><h3>AI Security</h3><p>Studying artificial intelligence and developing a research direction around model, application, and agent security.</p></article>',
  },
  {
    id: "projects",
    name: { en: "Projects" },
    body: { en: "Earth \u00b7 A growing body of work" },
    visual: {
      kind: "earth",
      size: 1.45,
      orbit: 20.5,
      moons: [{ color: 10328724, size: 0.38 }],
    },
    html: '<p class="lead">A space for experiments, technical write-ups, and reproducible research.</p><p>Project case studies will be added as their documentation and evidence are prepared.</p><article class="entry"><span class="eyebrow">PLANNED</span><h3>Cybersecurity Research Series</h3><p>A collection of laboratory projects organized around the fourteen domains in the Research Atlas. Each case study will document its question, environment, method, findings, and lessons learned.</p></article><button class="btn" data-go="4">Explore the Research Atlas \u2192</button>',
  },
  {
    id: "research",
    name: { en: "Research Atlas" },
    body: { en: "Mars \u00b7 Fourteen research frontiers" },
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
    html: '<p class="lead">Fourteen domains. One universe of exploration.</p><p>This atlas maps the areas I intend to explore through practical projects. All research tracks below are planned; published case studies will be linked as they become available.</p><div class="atlas-filters" role="group" aria-label="Filter research domains"><button class="filter selected" data-domain-filter="all">All 14</button><button class="filter " data-domain-filter="applications">Applications</button><button class="filter " data-domain-filter="infrastructure">Infrastructure</button><button class="filter " data-domain-filter="systems">Systems</button><button class="filter " data-domain-filter="intelligence">Intelligence</button></div><article class="domain-entry" data-category="systems"><span class="domain-number">01</span><div><h3>Wireless & RF</h3><p>Wi-Fi, Bluetooth, NFC, and software-defined radio.</p><span class="planned">Planned</span></div></article><article class="domain-entry" data-category="systems"><span class="domain-number">02</span><div><h3>Hardware & Firmware</h3><p>Debug interfaces, embedded devices, and firmware analysis.</p><span class="planned">Planned</span></div></article><article class="domain-entry" data-category="applications"><span class="domain-number">03</span><div><h3>Mobile Security</h3><p>Android and iOS applications, runtime behavior, and mobile APIs.</p><span class="planned">Planned</span></div></article><article class="domain-entry" data-category="systems"><span class="domain-number">04</span><div><h3>Reverse Engineering</h3><p>Static and dynamic analysis, binary formats, and program behavior.</p><span class="planned">Planned</span></div></article><article class="domain-entry" data-category="systems"><span class="domain-number">05</span><div><h3>Malware & Forensics</h3><p>Malware analysis, memory evidence, and disk forensics.</p><span class="planned">Planned</span></div></article><article class="domain-entry" data-category="infrastructure"><span class="domain-number">06</span><div><h3>Cloud & Containers</h3><p>Cloud identity, workloads, container security, and configuration.</p><span class="planned">Planned</span></div></article><article class="domain-entry" data-category="applications"><span class="domain-number">07</span><div><h3>AI Security</h3><p>LLM applications, models and data, agents, and AI red teaming.</p><span class="planned">Planned</span></div></article><article class="domain-entry" data-category="systems"><span class="domain-number">08</span><div><h3>Exploit Development</h3><p>Memory safety, mitigations, fuzzing, and proof-of-concept research.</p><span class="planned">Planned</span></div></article><article class="domain-entry" data-category="infrastructure"><span class="domain-number">09</span><div><h3>Network & Infrastructure</h3><p>Service discovery, protocols, infrastructure, and pivoting.</p><span class="planned">Planned</span></div></article><article class="domain-entry" data-category="applications"><span class="domain-number">10</span><div><h3>Web Apps & APIs</h3><p>Web vulnerabilities, session security, authentication, and APIs.</p><span class="planned">Planned</span></div></article><article class="domain-entry" data-category="infrastructure"><span class="domain-number">11</span><div><h3>Active Directory & Identity</h3><p>Directory services, Kerberos, NTLM, trust, and privilege paths.</p><span class="planned">Planned</span></div></article><article class="domain-entry" data-category="intelligence"><span class="domain-number">12</span><div><h3>OSINT & Social Engineering</h3><p>Public sources, intelligence analysis, and human factors.</p><span class="planned">Planned</span></div></article><article class="domain-entry" data-category="infrastructure"><span class="domain-number">13</span><div><h3>ICS / OT & Specialized</h3><p>Industrial systems, protocols, and specialized devices.</p><span class="planned">Planned</span></div></article><article class="domain-entry" data-category="systems"><span class="domain-number">14</span><div><h3>Cryptography & Cryptanalysis</h3><p>Cryptographic protocols, key management, PKI, and implementation analysis.</p><span class="planned">Planned</span></div></article>',
  },
  {
    id: "skills",
    name: { en: "Skills" },
    body: { en: "Jupiter \u00b7 Tools, systems & methods" },
    visual: {
      kind: "gas",
      size: 3.2,
      orbit: 37,
      colors: ["#d9a066", "#a3542a", "#f3dcb5", "#b5452a"],
      spot: true,
      moons: [
        { color: 16751467, size: 0.34, glow: 0.25 },
        { color: 8378623, size: 0.38, glow: 0.25 },
        { color: 12189562, size: 0.42, glow: 0.25 },
        { color: 15186175, size: 0.46, glow: 0.25 },
      ],
    },
    html: '<p class="lead">From the signal in a log to the behavior of a system.</p><article class="entry"><span class="eyebrow">SECURITY OPERATIONS</span><h3>Detection & Response</h3><p>SIEM \u00b7 EDR/XDR \u00b7 Incident Response \u00b7 Threat Hunting \u00b7 Log Analysis \u00b7 Detection Engineering</p></article><article class="entry"><span class="eyebrow">OFFENSIVE SECURITY</span><h3>Assessment & Application Security</h3><p>Nmap \u00b7 Burp Suite \u00b7 Metasploit \u00b7 Kali Linux \u00b7 Nessus \u00b7 API Security Testing \u00b7 Vulnerability Management</p></article><article class="entry"><span class="eyebrow">ENTERPRISE SECURITY</span><h3>Architecture & Controls</h3><p>Security by Design \u00b7 Firewalls \u00b7 Anti-DDoS \u00b7 DLP \u00b7 Microsoft 365 \u00b7 Entra ID \u00b7 Cloud Security</p></article><article class="entry"><span class="eyebrow">FOUNDATIONS</span><h3>Operating Systems & Networks</h3><p>Windows \u00b7 Linux \u00b7 TCP/IP \u00b7 Security Architecture</p></article>',
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
    body: { en: "Uranus \u00b7 Certifications & additional training" },
    visual: {
      kind: "ice",
      size: 1.95,
      orbit: 54,
      colors: ["#9fe3e6", "#7fcfd6", "#c8f4f4"],
      tilt: 1.7,
      faintRing: true,
    },
    html: '<p class="lead">A foundation across offensive security, security analysis, and service management.</p><article class="entry"><span class="eyebrow">CERTIFICATION</span><h3>CompTIA PenTest+</h3><p>PT0-003 \u00b7 CompTIA</p></article><article class="entry"><span class="eyebrow">CERTIFICATION</span><h3>CompTIA CySA+</h3><p>CS0-003 \u00b7 CompTIA</p></article><article class="entry"><span class="eyebrow">CERTIFICATION</span><h3>CompTIA Security+</h3><p>SY0-701 \u00b7 CompTIA</p></article><article class="entry"><span class="eyebrow">CERTIFICATION</span><h3>ISO/IEC 27001 (ISFS)</h3><p>EXIN</p></article><article class="entry"><span class="eyebrow">CERTIFICATION</span><h3>ITIL 4 Foundation</h3><p>PeopleCert</p></article><article class="entry"><span class="eyebrow">ADDITIONAL TRAINING</span><h3>Continued learning</h3><p>Kaspersky Endpoint Security and Management \u00b7 Kaspersky<br>Cybersecurity Specialization \u00b7 Google<br>Junior Cybersecurity Analyst \u00b7 Cisco</p></article>',
  },
  {
    id: "contact",
    name: { en: "Contact" },
    body: { en: "Neptune \u00b7 Open a channel" },
    visual: {
      kind: "gas",
      size: 1.9,
      orbit: 61,
      colors: ["#3d6fe0", "#2442a8", "#8fb3ff"],
    },
    html: '<p class="lead">Let\u2019s connect.</p><p>For professional opportunities, research conversations, or collaboration on cybersecurity projects.</p><div class="contact-links"><a class="btn solid" href="mailto:brunoalmeida438@gmail.com">Email Bruno \u2197</a><a class="btn" href="https://www.linkedin.com/in/bruno-almeida-bruno" target="_blank" rel="noopener noreferrer">LinkedIn \u2197</a><a class="btn" href="files/Bruno_Almeida_Resume.pdf" download>Download r\u00e9sum\u00e9 \u2193</a></div><dl class="facts"><div><dt>Email</dt><dd><a href="mailto:brunoalmeida438@gmail.com">brunoalmeida438@gmail.com</a></dd></div><div><dt>Based in</dt><dd>S\u00e3o Paulo, Brazil</dd></div></dl>',
  },
];
