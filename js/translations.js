/* Portuguese localization for the approved portfolio. Scene and layout are unchanged. */

Object.assign(UI.en, {
  pause: "Pause motion",
  resume: "Resume motion",
  standbyTitle: "Stay curious. Keep exploring.",
  probeLabel: "BA · DEEP SPACE",
  navigation: "Portfolio destinations",
  language: "Language",
});

UI.pt = {
  role: "Profissional de Cibersegurança",
  tagline: "Operações de Segurança · Segurança Ofensiva · Segurança de IA",

  lead: "Investigando ameaças. Explorando caminhos de ataque. Construindo conhecimento pelo universo da cibersegurança.",

  explore: "Explore meu universo",
  cv: "Currículo em inglês",

  hint: "Arraste para girar · Role para aproximar · Selecione um planeta",

  prev: "Anterior",
  next: "Próximo",
  orbit: "Órbita",
  close: "Fechar",

  status: "CIBERSEGURANÇA · PESQUISA · EXPLORAÇÃO",

  standbySignal: "um sinal do além",

  standbyNote:
    "Toda descoberta começa com uma pergunta. Continue explorando além do conhecido.",

  pause: "Pausar movimento",
  resume: "Retomar movimento",

  standbyTitle: "Mantenha a curiosidade. Continue explorando.",

  probeLabel: "BA · ESPAÇO PROFUNDO",

  navigation: "Seções do portfólio",

  language: "Idioma",

  stats: () => [
    ["14", "domínios de pesquisa"],
    ["03", "certificações CompTIA"],
  ],
};
const PORTUGUESE_SECTIONS = {
  about: {
  name: "Sobre",
  body: "Sol · O centro do meu universo",
  html: `
    <div class="about-layout">

      <div class="about-copy">

        <p class="lead">
          Cibersegurança, segurança ofensiva e inteligência artificial convergem em uma trajetória construída entre investigação, análise e exploração técnica.
        </p>

        <p>
          Profissional de cibersegurança com experiência em Operações de Segurança, resposta a incidentes, threat hunting, AppSec e testes de intrusão, com interesse crescente em Segurança Ofensiva e Segurança de IA.
        </p>

        <dl class="about-facts">
          <div>
            <dt>Cargo atual</dt>
            <dd>Analista de Segurança da Informação · V.tal</dd>
          </div>

          <div>
            <dt>Idiomas</dt>
            <dd>Português · Inglês · Espanhol</dd>
          </div>
        </dl>

      </div>

      <div class="about-portrait">
        <div class="about-portrait-glow"></div>

        <img
          src="files/About - Sun/bruno-about.png"
          alt="Bruno Almeida"
          class="about-portrait-image"
        >
      </div>

    </div>
  `,
},

experience: {
  name: "Experiência",
  body: "Vênus · Experiência na prática",

  html: `
    <div class="experience-timeline">

      <!-- V.TAL -->
      <article class="entry experience-entry experience-company">
        <div class="experience-main">

          <div class="experience-logo experience-logo-vtal">
            <img src="files/Experience - Venus/vtal-logo.png" alt="V.tal">
          </div>

          <div class="experience-copy">

            <div class="experience-role">
              <span class="eyebrow">JUL 2026 — ATUAL</span>
              <h3>V.tal · Analista de Segurança da Informação</h3>
              <p>
                Atuação como analista pleno em Operações de Segurança. Investigação de eventos
                e incidentes, análise de IoCs, threat hunting e melhoria de detecções em
                ambientes corporativos. Experiência complementar em AppSec, testes de segurança
                de APIs, análise de riscos e coordenação de testes de intrusão externos.
              </p>
            </div>

            <div class="experience-role experience-role-secondary">
              <span class="eyebrow">NOV 2025 — JUN 2026</span>
              <h3>V.tal · Analista de Segurança da Informação Júnior</h3>
              <p>
                Triagem de alertas SIEM e EDR, análise de logs, coleta de evidências e
                escalonamento de incidentes. Revisão de políticas de firewall e DLP;
                monitoramento em Microsoft 365, Entra ID, Google Workspace, Datadog,
                Grafana e Zabbix.
              </p>
            </div>

          </div>
        </div>
      </article>


      <!-- BAYER -->
      <article class="entry experience-entry">
        <div class="experience-main">

          <div class="experience-logo">
            <img src="files/Experience - Venus/bayer-logo.png" alt="Bayer">
          </div>

          <div class="experience-copy">
            <span class="eyebrow">NOV 2023 — OUT 2024</span>
            <h3>Bayer Brasil / Suhai · Analista SOC Júnior</h3>
            <p>
              Investigação de alertas SIEM, EDR e de segurança de perímetro.
              Documentação de incidentes e relatórios técnicos para apoiar auditorias
              e melhorias de segurança.
            </p>
          </div>

        </div>
      </article>


      <!-- EXPERIÊNCIAS ANTERIORES -->
      <article class="entry experience-entry experience-earlier">
        <span class="eyebrow">EXPERIÊNCIAS ANTERIORES</span>
        <h3>Risco, inteligência e comunicação</h3>

        <div class="earlier-career-list">

          <div class="earlier-career-item">
            <div class="experience-logo">
              <img src="files/Experience - Venus/meta-logo.png" alt="Meta">
            </div>

            <span>
              Meta / Haganá · Agente de Risco e Inteligência (2021–2023).
            </span>
          </div>

          <div class="earlier-career-item">
            <div class="experience-logo">
              <img src="files/Experience - Venus/itau-logo.png" alt="Itaú">
            </div>

            <span>
              Itaú Unibanco / Belfort · Operador de Monitoramento de Segurança Bilíngue (2016–2021).
            </span>
          </div>

          <div class="earlier-career-item">
            <div class="experience-logo">
              <img src="files/Experience - Venus/wizard-logo.png" alt="Wizard by Pearson">
            </div>

            <span>
              Wizard by Pearson · Professor de Inglês (2012–2016).
            </span>
          </div>

          <div class="earlier-career-item">
            <div class="experience-logo">
              <img src="files/Experience - Venus/ymca-logo.png" alt="YMCA">
            </div>

            <span>
              YMCA · Monitor de Acampamento · Work & Travel · Carolina do Norte, Estados Unidos (Jun–Dez 2011).
            </span>
          </div>

        </div>
      </article>

    </div>
  `,
},

  focus: {
    name: "Foco",
    body: "Mercúrio · Onde meu trabalho converge",

    html: `
        <div class="focus-grid">

            <article class="focus-card">
                <div class="focus-image">
                    <img
                        src="files/Focus - Mercury/Escudo_Cybersecurity_Neon.png"
                        alt="Operações de Segurança"
                    >
                </div>

                <div class="focus-card-content">
                    <span class="eyebrow">01 · DETECTAR E RESPONDER</span>
                    <h3>Operações de Segurança</h3>
                    <p>
                        Investigar eventos de segurança, correlacionar evidências,
                        buscar ameaças e melhorar a eficácia dos controles de segurança.
                    </p>
                </div>
            </article>

            <article class="focus-card">
                <div class="focus-image">
                    <img
                        src="files/Focus - Mercury/Chapeu_Hacker_Neon.png"
                        alt="Segurança Ofensiva e AppSec"
                    >
                </div>

                <div class="focus-card-content">
                    <span class="eyebrow">02 · TESTAR E ENTENDER</span>
                    <h3>Segurança Ofensiva &amp; AppSec</h3>
                    <p>
                        Avaliação de vulnerabilidades, testes de segurança de APIs
                        e exploração prática de caminhos de ataque em ambientes controlados.
                    </p>
                </div>
            </article>

            <article class="focus-card">
                <div class="focus-image">
                    <img
                        src="files/Focus - Mercury/Robo_IA_Neon.png"
                        alt="Segurança de IA"
                    >
                </div>

                <div class="focus-card-content">
                    <span class="eyebrow">03 · PESQUISAR E APRENDER</span>
                    <h3>Segurança de IA</h3>
                    <p>
                        Estudar inteligência artificial e desenvolver uma direção
                        de pesquisa em segurança de modelos, aplicações e agentes.
                    </p>
                </div>
            </article>

        </div>
    `,
},
  projects: {
    name: "Projetos",
    body: "Terra · Construído no mundo real",

    html: `
        <p class="lead">
            Projetos pessoais onde cibersegurança, infraestrutura,
            hardware e inteligência artificial se encontram na experimentação prática.
        </p>

        <div class="project-grid">

            <article class="project-card">
                <div class="project-image">
                    <img src="files/Projects - Earth/home-server-cq40.png"
                         alt="HP Compaq Presario CQ40 Home Server">
                </div>

                <div class="project-card-content">
                    <span class="eyebrow">HOME LAB · INFRAESTRUTURA</span>
                    <h3>Home Server</h3>
                    <p class="project-device">HP Compaq Presario CQ40</p>
                    <p>
                        Hardware legado reaproveitado executando Debian Server
                        como núcleo do meu laboratório doméstico de cibersegurança
                        e infraestrutura de rede.
                    </p>
                </div>
            </article>

            <article class="project-card">
                <div class="project-image project-image-cardputer">
                    <img src="files/Projects - Earth/cardputer.png"
                         alt="M5Stack Cardputer ADV">
                </div>

                <div class="project-card-content">
                    <span class="eyebrow">HARDWARE · WIRELESS</span>
                    <h3>Cardputer ADV</h3>
                    <p class="project-device">M5Stack · ESP32-S3</p>
                    <p>
                        Plataforma embarcada portátil utilizada para experimentação
                        com hardware, comunicação sem fio e segurança.
                    </p>
                </div>
            </article>

            <article class="project-card project-card-marie">
                <div class="project-image project-image-placeholder">
                    <span>MARIE</span>
                </div>

                <div class="project-card-content">
                    <span class="eyebrow">INTELIGÊNCIA ARTIFICIAL</span>
                    <h3>Marie</h3>
                    <p class="project-device">Projeto de IA Local</p>
                    <p>
                        Sistema experimental de IA local explorando memória persistente,
                        reflexão autônoma e inteligência privada executada localmente.
                    </p>
                </div>
            </article>

        </div>
    `,
},

skills: {
    name: "Habilidades",
    body: "Marte · Ferramentas, sistemas & métodos",
    html: null

},

research: {
    name: "Atlas de Pesquisa",
    body: "Júpiter",

    html: `
        <p class="lead">Explore o Atlas de Pesquisa através das luas de Júpiter.</p>

        <div class="research-groups">

            <section class="research-group" data-moon="io">
                <span class="eyebrow">IO</span>
                <h3>Segurança Ofensiva</h3>

                <article class="domain-entry">
                    <div>
                        <h3>Segurança Mobile</h3>
                        <p>Aplicações Android e iOS, comportamento em execução e APIs móveis.</p>
                        <span class="planned">Planejado</span>
                    </div>
                </article>

                <article class="domain-entry">
                    <div>
                        <h3>Engenharia Reversa</h3>
                        <p>Análise estática e dinâmica, formatos binários e comportamento de programas.</p>
                        <span class="planned">Planejado</span>
                    </div>
                </article>

                <article class="domain-entry">
                    <div>
                        <h3>Desenvolvimento de Exploits</h3>
                        <p>Segurança de memória, mitigações, fuzzing e pesquisa de provas de conceito.</p>
                        <span class="planned">Planejado</span>
                    </div>
                </article>

                <article class="domain-entry">
                    <div>
                        <h3>Aplicações Web & APIs</h3>
                        <p>Vulnerabilidades web, segurança de sessões, autenticação e APIs.</p>
                        <span class="planned">Planejado</span>
                    </div>
                </article>
            </section>

            <section class="research-group" data-moon="europa">
                <span class="eyebrow">EUROPA</span>
                <h3>Sistemas & Infraestrutura</h3>

                <article class="domain-entry">
                    <div>
                        <h3>Nuvem & Contêineres</h3>
                        <p>Identidade em nuvem, cargas de trabalho, segurança de contêineres e configuração.</p>
                        <span class="planned">Planejado</span>
                    </div>
                </article>

                <article class="domain-entry">
                    <div>
                        <h3>Redes & Infraestrutura</h3>
                        <p>Descoberta de serviços, protocolos, infraestrutura e pivoting.</p>
                        <span class="planned">Planejado</span>
                    </div>
                </article>

                <article class="domain-entry">
                    <div>
                        <h3>Active Directory & Identidade</h3>
                        <p>Serviços de diretório, Kerberos, NTLM, relações de confiança e caminhos de privilégio.</p>
                        <span class="planned">Planejado</span>
                    </div>
                </article>

                <article class="domain-entry">
                    <div>
                        <h3>Criptografia & Criptoanálise</h3>
                        <p>Protocolos criptográficos, gestão de chaves, PKI e análise de implementações.</p>
                        <span class="planned">Planejado</span>
                    </div>
                </article>
            </section>

            <section class="research-group" data-moon="ganymede">
                <span class="eyebrow">GANYMEDE</span>
                <h3>Hardware & Wireless</h3>

                <article class="domain-entry">
                    <div>
                        <h3>Wireless & RF</h3>
                        <p>Wi-Fi, Bluetooth, NFC e rádio definido por software.</p>
                        <span class="planned">Planejado</span>
                    </div>
                </article>

                <article class="domain-entry">
                    <div>
                        <h3>Hardware & Firmware</h3>
                        <p>Interfaces de depuração, dispositivos embarcados e análise de firmware.</p>
                        <span class="planned">Planejado</span>
                    </div>
                </article>

                <article class="domain-entry">
                    <div>
                        <h3>ICS / OT & Especializados</h3>
                        <p>Sistemas industriais, protocolos e dispositivos especializados.</p>
                        <span class="planned">Planejado</span>
                    </div>
                </article>
            </section>

            <section class="research-group" data-moon="callisto">
                <span class="eyebrow">CALLISTO</span>
                <h3>Inteligência & Análise</h3>

                <article class="domain-entry">
                    <div>
                        <h3>Malware & Forense</h3>
                        <p>Análise de malware, evidências em memória e análise forense de disco.</p>
                        <span class="planned">Planejado</span>
                    </div>
                </article>

                <article class="domain-entry">
                    <div>
                        <h3>Segurança de IA</h3>
                        <p>Aplicações com LLMs, modelos e dados, agentes e red teaming de IA.</p>
                        <span class="planned">Planejado</span>
                    </div>
                </article>

                <article class="domain-entry">
                    <div>
                        <h3>OSINT & Engenharia Social</h3>
                        <p>Fontes abertas, análise de inteligência e fatores humanos.</p>
                        <span class="planned">Planejado</span>
                    </div>
                </article>

            </section>

        </div>
    `,
},
 education: {
    name: "Formação",
    body: "Saturno · Bases para novas descobertas",

    html: `
        <div class="education-list">

            <article class="education-item">
                <div class="education-logo">
                    <img src="files/Education - Saturn/daryus-logo.png" alt="Instituto Daryus">
                </div>

                <div class="education-copy">
                    <span class="eyebrow">PÓS-GRADUAÇÃO · EM ANDAMENTO</span>
                    <h3>Cyber Threat Intelligence</h3>
                    <p>Instituto Daryus</p>
                </div>
            </article>

            <article class="education-item">
                <div class="education-logo">
                    <img src="files/Education - Saturn/unasp-logo.jpg" alt="UNASP">
                </div>

                <div class="education-copy">
                    <span class="eyebrow">FORMAÇÃO ACADÊMICA</span>
                    <h3>Segurança da Informação</h3>
                    <p>Centro Universitário Adventista de São Paulo (UNASP)</p>
                </div>
            </article>

        </div>

        <p class="education-note">
            Meu aprendizado combina formação acadêmica, certificações profissionais e exploração prática.
        </p>
    `,

},
   courses: {
    name: "Credenciais",
    body: "Urano · Certificações e formação complementar",

    html: `
        <p class="lead">
            Uma base em segurança ofensiva, análise de segurança,
            segurança da informação e gestão de serviços.
        </p>

        <div class="credentials-grid">

            <article class="credential-card">
                <img class="credential-badge"
                     src="files/Credentials - Uranus/CompTIA_PenTest_Plus.png"
                     alt="CompTIA PenTest+">
                <div class="credential-info">
                    <span class="eyebrow">CERTIFICAÇÃO</span>
                    <h3>CompTIA PenTest+</h3>
                    <p>PT0-003 · CompTIA</p>
                </div>
            </article>

            <article class="credential-card">
                <img class="credential-badge"
                     src="files/Credentials - Uranus/CompTIA_CySA_Plus.png"
                     alt="CompTIA CySA+">
                <div class="credential-info">
                    <span class="eyebrow">CERTIFICAÇÃO</span>
                    <h3>CompTIA CySA+</h3>
                    <p>CS0-003 · CompTIA</p>
                </div>
            </article>

            <article class="credential-card">
                <img class="credential-badge"
                     src="files/Credentials - Uranus/CompTIA_Security_Plus.png"
                     alt="CompTIA Security+">
                <div class="credential-info">
                    <span class="eyebrow">CERTIFICAÇÃO</span>
                    <h3>CompTIA Security+</h3>
                    <p>SY0-701 · CompTIA</p>
                </div>
            </article>

            <article class="credential-card">
                <img class="credential-badge"
                     src="files/Credentials - Uranus/EXIN_ISO_27001.png"
                     alt="EXIN ISO IEC 27001">
                <div class="credential-info">
                    <span class="eyebrow">CERTIFICAÇÃO</span>
                    <h3>ISO/IEC 27001 (ISFS)</h3>
                    <p>EXIN</p>
                </div>
            </article>

            <article class="credential-card">
                <img class="credential-badge"
                     src="files/Credentials - Uranus/ITIL_4_Foundation.png"
                     alt="ITIL 4 Foundation">
                <div class="credential-info">
                    <span class="eyebrow">CERTIFICAÇÃO</span>
                    <h3>ITIL 4 Foundation</h3>
                    <p>PeopleCert</p>
                </div>
            </article>

            <article class="credential-card">
                <img class="credential-badge"
                     src="files/Credentials - Uranus/Kaspersky_Endpoint_Security.png"
                     alt="Kaspersky Endpoint Security and Management">
                <div class="credential-info">
                    <span class="eyebrow">FORMAÇÃO COMPLEMENTAR</span>
                    <h3>Kaspersky Endpoint Security and Management</h3>
                    <p>Kaspersky</p>
                </div>
            </article>

            <article class="credential-card">
                <img class="credential-badge"
                     src="files/Credentials - Uranus/Google_Cybersecurity.png"
                     alt="Google Cybersecurity">
                <div class="credential-info">
                    <span class="eyebrow">FORMAÇÃO COMPLEMENTAR</span>
                    <h3>Especialização em Cibersegurança</h3>
                    <p>Google</p>
                </div>
            </article>

            <article class="credential-card">
                <img class="credential-badge"
                     src="files/Credentials - Uranus/Cisco_Junior_Cybersecurity_Analyst.png"
                     alt="Cisco Junior Cybersecurity Analyst">
                <div class="credential-info">
                    <span class="eyebrow">FORMAÇÃO COMPLEMENTAR</span>
                    <h3>Junior Cybersecurity Analyst</h3>
                    <p>Cisco</p>
                </div>
            </article>

        </div>
    `,
},
  contact: {
    name: "Contato",
    body: "Netuno · Abra um canal",
    html: '<p class="lead">Vamos nos conectar.</p><p>Para oportunidades profissionais, conversas sobre pesquisa ou colaboração em projetos de cibersegurança.</p><div class="contact-links"><a class="btn" href="mailto:brunoalmeida438@gmail.com"><svg class="contact-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="#FFFFFF" d="M3.5 5h17A2.5 2.5 0 0 1 23 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-17A2.5 2.5 0 0 1 1 16.5v-9A2.5 2.5 0 0 1 3.5 5Z"/><path fill="#4285F4" d="M1 7.3 4.5 10v9h-1A2.5 2.5 0 0 1 1 16.5V7.3Z"/><path fill="#34A853" d="M23 7.3 19.5 10v9h1a2.5 2.5 0 0 0 2.5-2.5V7.3Z"/><path fill="#EA4335" d="M2 6.1A2.5 2.5 0 0 1 5.2 5.4L12 10.5l6.8-5.1a2.5 2.5 0 0 1 3.2.7L12 13.6 2 6.1Z"/><path fill="#FBBC04" d="M4.5 10 1 7.3v-.8c0-.3.05-.6.15-.87L4.5 8.15V10Z"/><path fill="#C5221F" d="M19.5 10 23 7.3v-.8c0-.3-.05-.6-.15-.87L19.5 8.15V10Z"/></svg>Enviar e-mail</a><a class="btn" href="https://www.linkedin.com/in/bruno-almeida-bruno" target="_blank" rel="noopener noreferrer"><svg class="contact-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="#0A66C2" d="M20.45 2H3.55A1.55 1.55 0 0 0 2 3.55v16.9A1.55 1.55 0 0 0 3.55 22h16.9A1.55 1.55 0 0 0 22 20.45V3.55A1.55 1.55 0 0 0 20.45 2Z"/><path fill="#fff" d="M5.34 9.49h2.86V18H5.34V9.49Zm1.43-4.23a1.66 1.66 0 1 1 0 3.32 1.66 1.66 0 0 1 0-3.32ZM9.86 9.49h2.74v1.16h.04c.38-.72 1.31-1.48 2.7-1.48 2.89 0 3.42 1.9 3.42 4.37V18H15.9v-3.95c0-.94-.02-2.15-1.31-2.15-1.31 0-1.51 1.02-1.51 2.08V18H9.86V9.49Z"/></svg>LinkedIn</a><a class="btn" href="files/Contact - Neptune/Bruno Almeida - Segurança da Informação.pdf" download><svg class="contact-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 2.75h7l5 5V12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M13 2.75V8h5M6 2.75v18.5h6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M16.5 13v8M13.5 18l3 3 3-3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>Baixar currículo</a></div><dl class="facts"><div><dt>E-mail</dt><dd><a href="mailto:brunoalmeida438@gmail.com">brunoalmeida438@gmail.com</a></dd></div><div><dt>Localização</dt><dd>São Paulo, Brasil</dd></div></dl>',
},
};
SECTIONS.forEach((section) => {
  const pt = PORTUGUESE_SECTIONS[section.id];

  if (!pt) {
    console.warn(
      `[translations] Missing Portuguese translation for: ${section.id}`,
    );
    return;
  }

  section.name.pt = pt.name;
  section.body.pt = pt.body;
  section.htmlPt = pt.html;

  section.render = (language) => {
    return language === "pt" ? section.htmlPt : section.html;
  };
});
