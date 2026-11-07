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

  cvFile: "files/Bruno_Almeida_Resume.pdf",

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
          src="files/bruno-about.png"
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
    <article class="entry">
      <span class="eyebrow">JUL 2026 — ATUAL</span>
      <h3>V.tal · Analista de Segurança da Informação</h3>
      <p>
        Atuação como analista pleno em Operações de Segurança. Investigação de eventos
        e incidentes, análise de IoCs, threat hunting e melhoria de detecções em
        ambientes corporativos. Experiência complementar em AppSec, testes de segurança
        de APIs, análise de riscos e coordenação de testes de intrusão externos.
      </p>
    </article>

    <article class="entry">
      <span class="eyebrow">NOV 2025 — JUN 2026</span>
      <h3>V.tal · Analista de Segurança da Informação Júnior</h3>
      <p>
        Triagem de alertas SIEM e EDR, análise de logs, coleta de evidências e
        escalonamento de incidentes. Revisão de políticas de firewall e DLP;
        monitoramento em Microsoft 365, Entra ID, Google Workspace, Datadog,
        Grafana e Zabbix.
      </p>
    </article>

    <article class="entry">
      <span class="eyebrow">NOV 2023 — OUT 2024</span>
      <h3>Bayer Brasil / Suhai · Analista SOC Júnior</h3>
      <p>
        Investigação de alertas SIEM, EDR e de segurança de perímetro.
        Documentação de incidentes e relatórios técnicos para apoiar auditorias
        e melhorias de segurança.
      </p>
    </article>

    <article class="entry">
      <span class="eyebrow">EXPERIÊNCIAS ANTERIORES</span>
      <h3>Risco, inteligência e comunicação</h3>

      <p class="career-list">
        <span>Meta / Haganá · Agente de Risco e Inteligência (2021–2023).</span>
        <span>Itaú Unibanco / Belfort · Operador de Monitoramento de Segurança Bilíngue (2016–2021).</span>
        <span>Wizard by Pearson · Professor de Inglês (2012–2016).</span>
      </p>
    </article>
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
                        src="files/Escudo_Cybersecurity_Neon.png"
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
                        src="files/Chapeu_Hacker_Neon.png"
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
                        src="files/Robo_IA_Neon.png"
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
                    <img src="files/home-server-cq40.png"
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
                    <img src="files/cardputer.png"
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
    html: '<article class="entry"><span class="eyebrow">EM ANDAMENTO</span><h3>Pós-graduação em Inteligência Artificial</h3><p>Universidade Anhembi Morumbi</p></article><article class="entry"><span class="eyebrow">FORMAÇÃO ACADÊMICA</span><h3>Segurança da Informação</h3><p>Centro Universitário Adventista de São Paulo (UNASP)</p></article><p>Meu aprendizado combina formação acadêmica, certificações profissionais e exploração prática.</p>',

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
                     src="files/CompTIA_PenTest_Plus.png"
                     alt="CompTIA PenTest+">
                <div class="credential-info">
                    <span class="eyebrow">CERTIFICAÇÃO</span>
                    <h3>CompTIA PenTest+</h3>
                    <p>PT0-003 · CompTIA</p>
                </div>
            </article>

            <article class="credential-card">
                <img class="credential-badge"
                     src="files/CompTIA_CySA_Plus.png"
                     alt="CompTIA CySA+">
                <div class="credential-info">
                    <span class="eyebrow">CERTIFICAÇÃO</span>
                    <h3>CompTIA CySA+</h3>
                    <p>CS0-003 · CompTIA</p>
                </div>
            </article>

            <article class="credential-card">
                <img class="credential-badge"
                     src="files/CompTIA_Security_Plus.png"
                     alt="CompTIA Security+">
                <div class="credential-info">
                    <span class="eyebrow">CERTIFICAÇÃO</span>
                    <h3>CompTIA Security+</h3>
                    <p>SY0-701 · CompTIA</p>
                </div>
            </article>

            <article class="credential-card">
                <img class="credential-badge"
                     src="files/EXIN_ISO_27001.png"
                     alt="EXIN ISO IEC 27001">
                <div class="credential-info">
                    <span class="eyebrow">CERTIFICAÇÃO</span>
                    <h3>ISO/IEC 27001 (ISFS)</h3>
                    <p>EXIN</p>
                </div>
            </article>

            <article class="credential-card">
                <img class="credential-badge"
                     src="files/ITIL_4_Foundation.png"
                     alt="ITIL 4 Foundation">
                <div class="credential-info">
                    <span class="eyebrow">CERTIFICAÇÃO</span>
                    <h3>ITIL 4 Foundation</h3>
                    <p>PeopleCert</p>
                </div>
            </article>

            <article class="credential-card">
                <img class="credential-badge"
                     src="files/Kaspersky_Endpoint_Security.png"
                     alt="Kaspersky Endpoint Security and Management">
                <div class="credential-info">
                    <span class="eyebrow">FORMAÇÃO COMPLEMENTAR</span>
                    <h3>Kaspersky Endpoint Security and Management</h3>
                    <p>Kaspersky</p>
                </div>
            </article>

            <article class="credential-card">
                <img class="credential-badge"
                     src="files/Google_Cybersecurity.png"
                     alt="Google Cybersecurity">
                <div class="credential-info">
                    <span class="eyebrow">FORMAÇÃO COMPLEMENTAR</span>
                    <h3>Especialização em Cibersegurança</h3>
                    <p>Google</p>
                </div>
            </article>

            <article class="credential-card">
                <img class="credential-badge"
                     src="files/Cisco_Junior_Cybersecurity_Analyst.png"
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
    html: '<p class="lead">Vamos conversar.</p><p>Para oportunidades profissionais, conversas sobre pesquisa ou colaboração em projetos de cibersegurança.</p><div class="contact-links"><a class="btn solid" href="mailto:brunoalmeida438@gmail.com">Enviar e-mail ↗</a><a class="btn" href="https://www.linkedin.com/in/bruno-almeida-bruno" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a class="btn" href="files/Bruno_Almeida_Curriculo.pdf" download>Baixar currículo ↓</a></div><dl class="facts"><div><dt>E-mail</dt><dd><a href="mailto:brunoalmeida438@gmail.com">brunoalmeida438@gmail.com</a></dd></div><div><dt>Localização</dt><dd>São Paulo, Brasil</dd></div></dl>',
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
