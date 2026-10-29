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
    <p class="lead">
      Cibersegurança, segurança ofensiva e inteligência artificial convergem em uma trajetória construída entre investigação, análise e exploração técnica.
    </p>

    <p>
      Profissional de cibersegurança com experiência em Operações de Segurança, resposta a incidentes, threat hunting, AppSec e testes de intrusão, com interesse crescente em Segurança Ofensiva e Segurança de IA.
    </p>

    <dl class="facts">
      <div>
        <dt>Cargo atual</dt>
        <dd>Analista de Segurança da Informação · V.tal</dd>
      </div>
      <div>
        <dt>Foco</dt>
        <dd>Operações de Segurança · Segurança Ofensiva · Segurança de IA</dd>
      </div>
      <div>
        <dt>Idiomas</dt>
        <dd>Português · Inglês · Espanhol</dd>
      </div>
      <div>
        <dt>Abordagem</dt>
        <dd>Observar. Entender. Testar. Documentar.</dd>
      </div>
    </dl>
  `,
},

experience: {
  name: "Experiência",
  body: "Mercúrio · Experiência na prática",
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
  experience: {
    name: "Experiência",
    body: "Mercúrio · Experiência na prática",
    html: '<article class="entry"><span class="eyebrow">JUL 2026 — ATUAL</span><h3>V.tal · Analista de Segurança da Informação</h3><p>Atuação como analista pleno em Operações de Segurança. Investigação de eventos e incidentes, análise de IoCs, threat hunting e melhoria de detecções em ambientes corporativos. Experiência complementar em AppSec, testes de segurança de APIs, análise de riscos e coordenação de testes de intrusão externos.</p></article><article class="entry"><span class="eyebrow">NOV 2025 — JUN 2026</span><h3>V.tal · Analista de Segurança da Informação Júnior</h3><p>Triagem de alertas SIEM e EDR, análise de logs, coleta de evidências e escalonamento de incidentes. Revisão de políticas de firewall e DLP; monitoramento em Microsoft 365, Entra ID, Google Workspace, Datadog, Grafana e Zabbix.</p></article><article class="entry"><span class="eyebrow">NOV 2023 — OUT 2024</span><h3>Bayer Brasil / Suhai · Analista SOC Júnior</h3><p>Investigação de alertas SIEM, EDR e de segurança de perímetro. Documentação de incidentes e relatórios técnicos para apoiar auditorias e melhorias de segurança.</p></article><article class="entry"><span class="eyebrow">EXPERIÊNCIAS ANTERIORES</span><h3>Risco, inteligência e comunicação</h3><p>Meta / Haganá · Agente de Risco e Inteligência (2021–2023). Itaú Unibanco / Belfort · Operador de Monitoramento de Segurança Bilíngue (2016–2021). Wizard by Pearson · Professor de Inglês (2012–2016).</p></article>',
  },
  focus: {
    name: "Foco",
    body: "Vênus · Onde meu trabalho converge",
    html: '<article class="entry"><span class="eyebrow">01 · DETECTAR E RESPONDER</span><h3>Operações de Segurança</h3><p>Investigar eventos de segurança, correlacionar evidências, buscar ameaças e melhorar a eficácia dos controles de segurança.</p></article><article class="entry"><span class="eyebrow">02 · TESTAR E ENTENDER</span><h3>Segurança Ofensiva &amp; AppSec</h3><p>Avaliação de vulnerabilidades, testes de segurança de APIs e exploração prática de caminhos de ataque em ambientes controlados.</p></article><article class="entry"><span class="eyebrow">03 · PESQUISAR E APRENDER</span><h3>Segurança de IA</h3><p>Estudar inteligência artificial e desenvolver uma direção de pesquisa em segurança de modelos, aplicações e agentes.</p></article>',
  },
  projects: {
    name: "Projetos",
    body: "Terra · Um conjunto de projetos em evolução",
    html: '<p class="lead">Um espaço para experimentos, relatos técnicos e pesquisas reproduzíveis.</p><p>Os estudos de caso dos projetos serão adicionados conforme sua documentação e evidências forem preparadas.</p><article class="entry"><span class="eyebrow">PLANEJADO</span><h3>Série de Pesquisas em Cibersegurança</h3><p>Uma coleção de projetos de laboratório organizada nos quatorze domínios do Atlas de Pesquisa. Cada estudo de caso documentará sua pergunta, ambiente, método, descobertas e lições aprendidas.</p></article><button class="btn" data-go="4">Explore o Atlas de Pesquisa →</button>',
  },
  research: {
    name: "Atlas de Pesquisa",
    body: "Marte · Quatorze fronteiras de pesquisa",
    html: '<p class="lead">Quatorze domínios. Um universo de exploração.</p><p>Este atlas mapeia as áreas que pretendo explorar em projetos práticos. Todas as trilhas abaixo estão planejadas; os estudos de caso publicados serão vinculados conforme estiverem disponíveis.</p><div class="atlas-filters" role="group" aria-label="Filtrar domínios de pesquisa"><button class="filter selected" data-domain-filter="all">Todos os 14</button><button class="filter " data-domain-filter="applications">Aplicações</button><button class="filter " data-domain-filter="infrastructure">Infraestrutura</button><button class="filter " data-domain-filter="systems">Sistemas</button><button class="filter " data-domain-filter="intelligence">Inteligência</button></div><article class="domain-entry" data-category="systems"><span class="domain-number">01</span><div><h3>Wireless &amp; RF</h3><p>Wi-Fi, Bluetooth, NFC e rádio definido por software.</p><span class="planned">Planejado</span></div></article><article class="domain-entry" data-category="systems"><span class="domain-number">02</span><div><h3>Hardware &amp; Firmware</h3><p>Interfaces de depuração, dispositivos embarcados e análise de firmware.</p><span class="planned">Planejado</span></div></article><article class="domain-entry" data-category="applications"><span class="domain-number">03</span><div><h3>Segurança Mobile</h3><p>Aplicações Android e iOS, comportamento em execução e APIs móveis.</p><span class="planned">Planejado</span></div></article><article class="domain-entry" data-category="systems"><span class="domain-number">04</span><div><h3>Engenharia Reversa</h3><p>Análise estática e dinâmica, formatos binários e comportamento de programas.</p><span class="planned">Planejado</span></div></article><article class="domain-entry" data-category="systems"><span class="domain-number">05</span><div><h3>Malware &amp; Forense</h3><p>Análise de malware, evidências em memória e análise forense de disco.</p><span class="planned">Planejado</span></div></article><article class="domain-entry" data-category="infrastructure"><span class="domain-number">06</span><div><h3>Nuvem &amp; Contêineres</h3><p>Identidade em nuvem, cargas de trabalho, segurança de contêineres e configuração.</p><span class="planned">Planejado</span></div></article><article class="domain-entry" data-category="applications"><span class="domain-number">07</span><div><h3>Segurança de IA</h3><p>Aplicações com LLMs, modelos e dados, agentes e red teaming de IA.</p><span class="planned">Planejado</span></div></article><article class="domain-entry" data-category="systems"><span class="domain-number">08</span><div><h3>Desenvolvimento de Exploits</h3><p>Segurança de memória, mitigações, fuzzing e pesquisa de provas de conceito.</p><span class="planned">Planejado</span></div></article><article class="domain-entry" data-category="infrastructure"><span class="domain-number">09</span><div><h3>Redes &amp; Infraestrutura</h3><p>Descoberta de serviços, protocolos, infraestrutura e pivoting.</p><span class="planned">Planejado</span></div></article><article class="domain-entry" data-category="applications"><span class="domain-number">10</span><div><h3>Aplicações Web &amp; APIs</h3><p>Vulnerabilidades web, segurança de sessões, autenticação e APIs.</p><span class="planned">Planejado</span></div></article><article class="domain-entry" data-category="infrastructure"><span class="domain-number">11</span><div><h3>Active Directory &amp; Identidade</h3><p>Serviços de diretório, Kerberos, NTLM, relações de confiança e caminhos de privilégio.</p><span class="planned">Planejado</span></div></article><article class="domain-entry" data-category="intelligence"><span class="domain-number">12</span><div><h3>OSINT &amp; Engenharia Social</h3><p>Fontes abertas, análise de inteligência e fatores humanos.</p><span class="planned">Planejado</span></div></article><article class="domain-entry" data-category="infrastructure"><span class="domain-number">13</span><div><h3>ICS / OT &amp; Especializados</h3><p>Sistemas industriais, protocolos e dispositivos especializados.</p><span class="planned">Planejado</span></div></article><article class="domain-entry" data-category="systems"><span class="domain-number">14</span><div><h3>Criptografia &amp; Criptoanálise</h3><p>Protocolos criptográficos, gestão de chaves, PKI e análise de implementações.</p><span class="planned">Planejado</span></div></article>',
  },
  skills: {
    name: "Habilidades",
    body: "Júpiter · Ferramentas, sistemas e métodos",
    html: '<p class="lead">Do sinal em um log ao comportamento de um sistema.</p><article class="entry"><span class="eyebrow">OPERAÇÕES DE SEGURANÇA</span><h3>Detecção &amp; Resposta</h3><p>SIEM · EDR/XDR · Resposta a Incidentes · Threat Hunting · Análise de Logs · Engenharia de Detecção</p></article><article class="entry"><span class="eyebrow">SEGURANÇA OFENSIVA</span><h3>Avaliação &amp; Segurança de Aplicações</h3><p>Nmap · Burp Suite · Metasploit · Kali Linux · Nessus · Testes de Segurança de APIs · Gestão de Vulnerabilidades</p></article><article class="entry"><span class="eyebrow">SEGURANÇA CORPORATIVA</span><h3>Arquitetura &amp; Controles</h3><p>Security by Design · Firewalls · Anti-DDoS · DLP · Microsoft 365 · Entra ID · Segurança em Nuvem</p></article><article class="entry"><span class="eyebrow">FUNDAMENTOS</span><h3>Sistemas Operacionais &amp; Redes</h3><p>Windows · Linux · TCP/IP · Arquitetura de Segurança</p></article>',
  },
  education: {
    name: "Formação",
    body: "Saturno · Bases para novas descobertas",
    html: '<article class="entry"><span class="eyebrow">EM ANDAMENTO</span><h3>Pós-graduação em Inteligência Artificial</h3><p>Universidade Anhembi Morumbi</p></article><article class="entry"><span class="eyebrow">FORMAÇÃO ACADÊMICA</span><h3>Segurança da Informação</h3><p>Centro Universitário Adventista de São Paulo (UNASP)</p></article><p>Meu aprendizado combina formação acadêmica, certificações profissionais e exploração prática.</p>',
  },
  courses: {
    name: "Credenciais",
    body: "Urano · Certificações e formação complementar",
    html: '<p class="lead">Uma base em segurança ofensiva, análise de segurança e gestão de serviços.</p><article class="entry"><span class="eyebrow">CERTIFICAÇÃO</span><h3>CompTIA PenTest+</h3><p>PT0-003 · CompTIA</p></article><article class="entry"><span class="eyebrow">CERTIFICAÇÃO</span><h3>CompTIA CySA+</h3><p>CS0-003 · CompTIA</p></article><article class="entry"><span class="eyebrow">CERTIFICAÇÃO</span><h3>CompTIA Security+</h3><p>SY0-701 · CompTIA</p></article><article class="entry"><span class="eyebrow">CERTIFICAÇÃO</span><h3>ISO/IEC 27001 (ISFS)</h3><p>EXIN</p></article><article class="entry"><span class="eyebrow">CERTIFICAÇÃO</span><h3>ITIL 4 Foundation</h3><p>PeopleCert</p></article><article class="entry"><span class="eyebrow">FORMAÇÃO COMPLEMENTAR</span><h3>Aprendizado contínuo</h3><p>Kaspersky Endpoint Security and Management · Kaspersky<br>Especialização em Cibersegurança · Google<br>Junior Cybersecurity Analyst · Cisco</p></article>',
  },
  contact: {
    name: "Contato",
    body: "Netuno · Abra um canal",
    html: '<p class="lead">Vamos conversar.</p><p>Para oportunidades profissionais, conversas sobre pesquisa ou colaboração em projetos de cibersegurança.</p><div class="contact-links"><a class="btn solid" href="mailto:brunoalmeida438@gmail.com">Enviar e-mail ↗</a><a class="btn" href="https://www.linkedin.com/in/bruno-almeida-bruno" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a class="btn" href="files/Bruno_Almeida_Resume.pdf" download>Baixar currículo em inglês ↓</a></div><dl class="facts"><div><dt>E-mail</dt><dd><a href="mailto:brunoalmeida438@gmail.com">brunoalmeida438@gmail.com</a></dd></div><div><dt>Localização</dt><dd>São Paulo, Brasil</dd></div></dl>',
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
