/*
 * Interface: idioma, HUD, painel de seções e navegação entre planetas.
 */

const $ = sel => document.querySelector(sel);
const panel = $('#panel');
const dock = $('#dock');
const moonDock = $('#moon-dock');
let lang = 'en';
let current = null;
let currentMoon = null;

/* ---------- dock ---------- */

SECTIONS.forEach((s, i) => {
    const b = document.createElement('button');
    b.dataset.go = i;
    b.innerHTML = `<small>${String(i).padStart(2, '0')}</small><span></span>`;
    dock.appendChild(b);
});

/* ---------- language ---------- */

function setLanguage(next) {
    lang = next === 'pt' ? 'pt' : 'en';
    const t = UI[lang];
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';

    document.querySelectorAll('[data-ui]').forEach(el => {
        el.textContent = t[el.dataset.ui];
    });

    const tagline = document.querySelector('#tagline-detail');

 tagline.innerHTML = lang === 'pt'
  ? '<span>· PROFISSIONAL DE CIBERSEGURANÇA · OPERAÇÕES DE SEGURANÇA</span><br><span>· SEGURANÇA OFENSIVA · SEGURANÇA DE IA</span>'
  : '<span>· CYBERSECURITY PROFESSIONAL · SECURITY OPERATIONS</span><br><span>· OFFENSIVE SECURITY · AI SECURITY</span>';

    $('#stats').innerHTML = t.stats().map(([v, k]) => `<div><dt>${v}</dt><dd>${k}</dd></div>`).join('');
    dock.querySelectorAll('button').forEach((b, i) => { b.querySelector('span').textContent = SECTIONS[i].name[lang]; });
    document.querySelectorAll('.lang button').forEach(b => { const active = b.dataset.lang === lang; b.classList.toggle('active', active); b.setAttribute('aria-pressed', String(active)); });
    document.querySelector('.lang').setAttribute('aria-label', t.language);
    dock.setAttribute('aria-label', t.navigation);
    $('#standby-title').textContent = t.standbyTitle;
    document.querySelector('.standby-meta > span').textContent = t.probeLabel;
    document.title = 'Bruno Almeida — ' + t.role;
    $('#panel-close').setAttribute('aria-label', t.close);
    $('#standby-close').setAttribute('aria-label', t.close);
    Space.setLabels(lang);
   if (current !== null) {
    const scroll = $('#panel-content').scrollTop;
    const activeFilter = document.querySelector('[data-domain-filter].selected')?.dataset.domainFilter || 'all';

    renderPanel(current);
    applyDomainFilter(activeFilter);

    if (SECTIONS[current].id === 'skills') {
        runKaliSkillsTerminal();
    } else {
        $('#panel-content').scrollTop = scroll;
    }
}

    try { localStorage.setItem('language', lang); } catch (e) {}
}

/* ---------- language buttons ---------- */

document.querySelectorAll('.lang button[data-lang]').forEach(button => {
    button.addEventListener('click', () => {
        setLanguage(button.dataset.lang);
    });
});

/* ---------- panel ---------- */

function renderPanel(i) {
    const s = SECTIONS[i];
    const t = UI[lang];

    if (s.id !== 'research') {
        currentMoon = null;
        hideMoonDock();
    }

    $('#panel-orbit').textContent =
        i === 0 ? '☉ 00' : `${t.orbit} ${String(i).padStart(2, '0')}`;

    $('#panel-body').textContent = s.body[lang];
    $('#panel-title').textContent = s.name[lang];

    if (s.id === 'research') {

    $('#panel-title').textContent =
        lang === 'pt' ? 'Atlas de Pesquisa' : 'Research Atlas';

    const researchText = lang === 'pt'
        ? {
                intro: 'Explore os domínios técnicos que orientam minha pesquisa, experimentação e aprendizado contínuo.',
                io: 'Segurança Ofensiva',
                europa: 'Sistemas & Infraestrutura',
                ganymede: 'Hardware & Wireless',
                callisto: 'Inteligência & Análise'
            }
            : {
                intro: 'Explore the technical domains that shape my research, experimentation and continuous learning.',
                io: 'Offensive Security',
                europa: 'Systems & Infrastructure',
                ganymede: 'Hardware & Wireless',
                callisto: 'Intelligence & Analysis'
            };

        $('#panel-content').innerHTML = `
            <div class="research-intro">
                <p>${researchText.intro}</p>
            </div>

            <div class="research-moons">

                <button class="research-moon-card" data-moon="io">
                    <span class="research-moon-visual moon-io"></span>

                    <div class="research-moon-info">
                        <strong>IO</strong>
                        <span>${researchText.io}</span>
                    </div>

                    <span class="research-moon-arrow">→</span>
                </button>

                <button class="research-moon-card" data-moon="europa">
                    <span class="research-moon-visual moon-europa"></span>

                    <div class="research-moon-info">
                        <strong>EUROPA</strong>
                        <span>${researchText.europa}</span>
                    </div>

                    <span class="research-moon-arrow">→</span>
                </button>

                <button class="research-moon-card" data-moon="ganymede">
                    <span class="research-moon-visual moon-ganymede"></span>

                    <div class="research-moon-info">
                        <strong>GANYMEDE</strong>
                        <span>${researchText.ganymede}</span>
                    </div>

                    <span class="research-moon-arrow">→</span>
                </button>

                <button class="research-moon-card" data-moon="callisto">
                    <span class="research-moon-visual moon-callisto"></span>

                    <div class="research-moon-info">
                        <strong>CALLISTO</strong>
                        <span>${researchText.callisto}</span>
                    </div>

                    <span class="research-moon-arrow">→</span>
                               </button>

            </div>

            <div class="research-observer">
    <img src="files/Atlas - Jupiter/bruno-telescope-night.png" alt="">
</div>
        `;

    } else if (s.id === 'skills') {
    $('#panel-content').innerHTML = s.html;
} else {
    $('#panel-content').innerHTML = s.render(lang);
}

    $('#panel').dataset.section = s.id;
    bindForm();

    /* Research Atlas cards */
    if (s.id === 'research') {
        $('#panel-content')
            .querySelectorAll('.research-moon-card')
            .forEach(card => {
                card.addEventListener('click', () => {
                    const moonId = card.dataset.moon;

                    const moon = s.visual.moons.find(
                        item => item.id === moonId
                    );

                    if (!moon) return;

                    openMoon({
                        type: 'moon',
                        id: moon.id,
                        name: moon.name,
                        group: moon.group,
                        parentIndex: i
                    });
                });
            });
    }
}

function showMoonDock(activeMoon = null) {
    moonDock.classList.add('visible');
    moonDock.setAttribute('aria-hidden', 'false');

    moonDock.querySelectorAll('button').forEach(button => {
        button.classList.toggle(
            'active',
            button.dataset.moon === activeMoon
        );
    });
}

function hideMoonDock() {
    moonDock.classList.remove('visible');
    moonDock.setAttribute('aria-hidden', 'true');

    moonDock.querySelectorAll('button').forEach(button => {
        button.classList.remove('active');
    });
}

function openMoon(target) {
    const researchIndex = SECTIONS.findIndex(
        section => section.id === "research"
    );

    if (researchIndex === -1) return;

    const research = SECTIONS[researchIndex];
    const moonId = target.id;

    const moon = research.visual.moons.find(
        item => item.id === moonId
    );

    if (!moon) return;

    const source = research.render
        ? research.render(lang)
        : research.html;

    const container = document.createElement("div");
    container.innerHTML = source;

    const group = container.querySelector(
        `.research-group[data-moon="${moonId}"]`
    );

    if (!group) return;

    current = researchIndex;
    currentMoon = moonId;

    showMoonDock(moonId);

    $('#panel-orbit').textContent =
        `JUPITER · ${(moon.name || moonId).toUpperCase()}`;

    $('#panel-body').textContent =
        moon.name || moonId;

    const groupTitle = group.querySelector(":scope > h3");

    $('#panel-title').textContent =
        groupTitle?.textContent || moon.name || moonId;

    $('#panel-content').innerHTML = group.innerHTML;

    $('#panel-content')
        .querySelector(":scope > .eyebrow")
        ?.remove();

    $('#panel-content')
        .querySelector(":scope > h3")
        ?.remove();

    $('#panel').dataset.section = "research";

    document.body.classList.add("focused");
    panel.setAttribute("aria-hidden", "false");

    dock.querySelectorAll("button").forEach((button, index) => {
        button.classList.toggle("active", index === researchIndex);
    });

    Space.focusMoon(target);

    history.replaceState(
        null,
        "",
        `#research-${moonId}`
    );
}

// ============================================================
// MARS — SKILLS / KALI TERMINAL
// ============================================================

let kaliTerminalSession = 0;

const kaliSkills = {
    investigate: {
        capabilities: [
            'incident-investigation',
            'log-analysis',
            'ioc-analysis',
            'evidence-correlation',
            'incident-response'
        ],
        tools: [
            'wazuh',
            'crowdstrike',
            'microsoft-defender',
            'netskope'
        ]
    },

    hunt: {
        capabilities: [
            'threat-hunting',
            'detection-engineering',
            'behavior-analysis',
            'detection-tuning',
            'threat-intelligence'
        ],
        tools: [
            'elastic',
            'crowdstrike',
            'mitre-att&ck',
            'threat-intelligence'
        ]
    },

    exploit: {
        capabilities: [
            'penetration-testing',
            'web-api-security',
            'vulnerability-assessment',
            'attack-path-analysis',
            'controlled-exploitation'
        ],
        tools: [
            'burp-suite',
            'nmap',
            'metasploit',
            'impacket',
            'wireshark',
            'kali-linux'
        ]
    },

    engineer: {
        capabilities: [
            'security-controls',
            'endpoint-security',
            'identity-security',
            'data-protection',
            'cloud-security'
        ],
        tools: [
            'entra-id',
            'microsoft-purview',
            'intune',
            'f5',
            'cyberark',
            'qualys'
        ]
    }
};

const kaliWait = ms =>
    new Promise(resolve => setTimeout(resolve, ms));

async function kaliType(text, element, session, speed = 70) {
    element.textContent = '';

    for (const char of text) {
        if (session !== kaliTerminalSession) return false;

        element.textContent += char;
        await kaliWait(speed);
    }

    return true;
}

function kaliPrompt(path, command) {
    return `
        <div class="kali-history-prompt">
            <div>
                ┌──(<span class="kali-user">bruno㉿kali</span>)-[<span class="kali-path">${path}</span>]
            </div>

            <div>
                <span class="kali-prompt-frame">└─</span><span class="kali-prompt-symbol">$</span>
                <span>${command}</span>
            </div>
        </div>
    `;
}

function setKaliActivePath(path) {
    const activePath = document.querySelector(
        '#kali-active-prompt .kali-path'
    );

    if (activePath) {
        activePath.textContent = path;
    }
}

function bindKaliRootMenu() {
    const output = document.querySelector('#kali-output');

    if (!output) return;

    output.querySelectorAll('.kali-root-dir').forEach(dir => {
        dir.addEventListener('click', () => {
            openSkillDirectory(dir.dataset.skill);
        });
    });
}

async function runKaliSkillsTerminal() {
    const session = ++kaliTerminalSession;

    const output = document.querySelector('#kali-output');
    const command = document.querySelector('#kali-command');

    if (!output || !command) return;

    output.innerHTML = '';
    command.textContent = '';
    setKaliActivePath('~/skills');

    await kaliWait(600);

    if (session !== kaliTerminalSession) return;

    const typed = await kaliType(
        'ls',
        command,
        session,
        150
    );

    if (!typed) return;

    await kaliWait(250);

    if (session !== kaliTerminalSession) return;

    output.innerHTML = `
        <div class="kali-root">
            ${kaliPrompt('~/skills', 'ls')}

            <div class="kali-root-directories">
                <span class="kali-root-dir" data-skill="investigate">investigate/</span>
                <span class="kali-root-dir" data-skill="hunt">hunt/</span>
                <span class="kali-root-dir" data-skill="exploit">exploit/</span>
                <span class="kali-root-dir" data-skill="engineer">engineer/</span>
            </div>
        </div>

        <div class="kali-workspace"></div>
    `;

    command.textContent = '';
    bindKaliRootMenu();
}

async function openSkillDirectory(skill) {
    const data = kaliSkills[skill];

    if (!data) return;

    const session = ++kaliTerminalSession;

    const workspace = document.querySelector('.kali-workspace');
    const command = document.querySelector('#kali-command');

    if (!workspace || !command) return;

    const typed = await kaliType(
        `cd ${skill}/ && ls`,
        command,
        session,
        45
    );

    if (!typed) return;

    await kaliWait(200);

    if (session !== kaliTerminalSession) return;

    workspace.innerHTML = `
        <div class="kali-directory-view">

            ${kaliPrompt(
                '~/skills',
                `cd ${skill}/ && ls`
            )}

            <div class="kali-skill-list">
                ${data.capabilities
                    .map(item => `<span>${item}</span>`)
                    .join('')}

                <span
                    class="kali-tools-dir"
                    data-skill="${skill}"
                >
                    tools/
                </span>
            </div>

        </div>
    `;

    command.textContent = '';
    setKaliActivePath(`~/skills/${skill}`);

    const toolsDir = workspace.querySelector('.kali-tools-dir');

    if (toolsDir) {
        toolsDir.addEventListener('click', () => {
            openSkillTools(skill);
        });
    }
}

async function openSkillTools(skill) {
    const data = kaliSkills[skill];

    if (!data) return;

    const session = ++kaliTerminalSession;

    const workspace = document.querySelector('.kali-workspace');
    const command = document.querySelector('#kali-command');

    if (!workspace || !command) return;

    const typed = await kaliType(
        'cd tools/ && ls',
        command,
        session,
        45
    );

    if (!typed) return;

    await kaliWait(200);

    if (session !== kaliTerminalSession) return;

    workspace.innerHTML = `
        <div class="kali-tools-view">

            ${kaliPrompt(
                `~/skills/${skill}`,
                'cd tools/ && ls'
            )}

            <div class="kali-tools-list">
                ${data.tools
                    .map(tool => `<span>${tool}</span>`)
                    .join('')}
            </div>

            <span
                class="kali-tools-back"
                data-skill="${skill}"
            >
                ../
            </span>

        </div>
    `;

    command.textContent = '';
    setKaliActivePath(`~/skills/${skill}/tools`);

    const back = workspace.querySelector('.kali-tools-back');

    if (back) {
        back.addEventListener('click', () => {
            returnToSkillDirectory(skill);
        });
    }
}

async function returnToSkillDirectory(skill) {
    const data = kaliSkills[skill];

    if (!data) return;

    const session = ++kaliTerminalSession;

    const workspace = document.querySelector('.kali-workspace');
    const command = document.querySelector('#kali-command');

    if (!workspace || !command) return;

    const typed = await kaliType(
        'cd ..',
        command,
        session,
        45
    );

    if (!typed) return;

    await kaliWait(150);

    if (session !== kaliTerminalSession) return;

    workspace.innerHTML = `
        <div class="kali-directory-view">

            ${kaliPrompt(
                `~/skills/${skill}/tools`,
                'cd ..'
            )}

            <div class="kali-skill-list">
                ${data.capabilities
                    .map(item => `<span>${item}</span>`)
                    .join('')}

                <span
                    class="kali-tools-dir"
                    data-skill="${skill}"
                >
                    tools/
                </span>
            </div>

        </div>
    `;

    command.textContent = '';
    setKaliActivePath(`~/skills/${skill}`);

    const toolsDir = workspace.querySelector('.kali-tools-dir');

    if (toolsDir) {
        toolsDir.addEventListener('click', () => {
            openSkillTools(skill);
        });
    }
}

function open(i) {
    currentMoon = null;
    document.body.classList.remove('research-mode');
    hideStandby();
    i = (i + SECTIONS.length) % SECTIONS.length;
    const changed = current !== i;
    current = i;
    renderPanel(i);
    if (changed) $('#panel-content').scrollTop = 0;

    // Mars / Skills — initialize Kali terminal
    if (SECTIONS[i].id === 'skills') {
    runKaliSkillsTerminal();
    }
    document.body.classList.add('focused');
    panel.setAttribute('aria-hidden', 'false');
    dock.querySelectorAll('button').forEach((b, k) => b.classList.toggle('active', k === i));
    dock.children[i].scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
    history.replaceState(null, '', '#' + SECTIONS[i].id);
    Space.focus(i);
}

function close() {
    hideStandby();

    // If a Jupiter moon is open, return to Jupiter first.
    if (currentMoon) {
        currentMoon = null;

        panel.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('focused');

        showMoonDock();

        const researchIndex = SECTIONS.findIndex(
            section => section.id === 'research'
        );

        if (researchIndex !== -1) {
            current = researchIndex;
            Space.focus(researchIndex);
        }

        history.replaceState(null, '', '#research');
        return;
    }

    // Otherwise return to the Solar System overview.
current = null;

hideMoonDock();

document.body.classList.remove('research-mode');
document.body.classList.remove('focused');
panel.setAttribute('aria-hidden', 'true');

    dock.querySelectorAll('button').forEach(
        b => b.classList.remove('active')
    );

    history.replaceState(
        null,
        '',
        location.pathname + location.search
    );

    Space.focus(null);
}

/* ---------- easter egg: the deep-space probe ---------- */

const standby = $('#standby');

function showStandby() {
    close();
    document.body.classList.add('probe-view');
    standby.setAttribute('aria-hidden', 'false');
    Space.focus('probe');
    $('#standby-close').focus({ preventScroll: true });
}

function hideStandby() {
    if (!document.body.classList.contains('probe-view')) return;
    document.body.classList.remove('probe-view');
    standby.setAttribute('aria-hidden', 'true');
}

Space.onSelect = i => {
    const section = SECTIONS[i];

    if (section?.id === "research") {
        current = i;
        currentMoon = null;

        showMoonDock();
        hideStandby();

        document.body.classList.add("research-mode");
        document.body.classList.add("focused");

        renderPanel(i);
        $('#panel-content').scrollTop = 0;
        panel.setAttribute("aria-hidden", "false");

        Space.focus(i);

        history.replaceState(null, "", "#research");
        return;
    }

    document.body.classList.remove("research-mode");
    hideMoonDock();

    open(i);
};

moonDock.querySelectorAll('button[data-moon]').forEach(button => {
    button.addEventListener('click', () => {
        const moonId = button.dataset.moon;

        const researchIndex = SECTIONS.findIndex(
            section => section.id === 'research'
        );

        if (researchIndex === -1) return;

        const moon = SECTIONS[researchIndex].visual.moons.find(
            item => item.id === moonId
        );

        if (!moon) return;

        openMoon({
            type: 'moon',
            id: moon.id,
            name: moon.name,
            group: moon.group,
            parentIndex: researchIndex
        });
    });
});

function navigateMoon(direction) {
    if (!currentMoon) return false;

    const researchIndex = SECTIONS.findIndex(
        section => section.id === 'research'
    );

    if (researchIndex === -1) return false;

    const moons = SECTIONS[researchIndex].visual.moons;

    const currentIndex = moons.findIndex(
        moon => moon.id === currentMoon
    );

    if (currentIndex === -1) return false;

    // Circular navigation:
    // Io ←→ Europa ←→ Ganymede ←→ Callisto ←→ Io
    const nextIndex =
        (currentIndex + direction + moons.length) % moons.length;

    const moon = moons[nextIndex];

    openMoon({
        type: 'moon',
        id: moon.id,
        name: moon.name,
        group: moon.group,
        parentIndex: researchIndex
    });

    return true;
}

Space.onMoonSelect = target => openMoon(target);
Space.onProbe = showStandby;
$('#standby-close').addEventListener('click', close);

document.addEventListener('click', e => {
    const go = e.target.closest('[data-go]');
    if (!go) return;
    if (go.dataset.go === 'home') close();
    else open(Number(go.dataset.go));
});
$('#panel-close').addEventListener('click', close);
$('#prev').addEventListener('click', () => {
    if (navigateMoon(-1)) return;
    open(current - 1);
});

$('#next').addEventListener('click', () => {
    if (navigateMoon(1)) return;
    open(current + 1);
});

addEventListener('keydown', e => {
    if (e.target.closest('input, textarea')) return;

    if (e.key === 'Escape') {
        close();
        return;
    }

    if (e.key === 'ArrowRight') {
        if (navigateMoon(1)) return;

        open(current === null ? 0 : current + 1);
        return;
    }

    if (e.key === 'ArrowLeft') {
        if (navigateMoon(-1)) return;

        open(
            current === null
                ? SECTIONS.length - 1
                : current - 1
        );
    }
});

/* ---------- contact form ---------- */

function bindForm() {
    const form = $('#contact-form');
    if (!form) return;
    form.addEventListener('submit', async e => {
        e.preventDefault();
        const msg = FORM_MESSAGES[lang];
        const status = form.querySelector('.form-status');
        const button = form.querySelector('button');
        status.textContent = msg.sending;
        button.disabled = true;
        try {
            const res = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { Accept: 'application/json' },
                body: new FormData(form)
            });
            if (!res.ok) throw new Error(res.status);
            form.reset();
            status.textContent = msg.ok;
            status.className = 'form-status ok';
        } catch (err) {
            status.textContent = msg.fail;
            status.className = 'form-status fail';
        } finally {
            button.disabled = false;
        }
    });
}

/* ---------- readout (Brasília time + a pseudo coordinate) ---------- */

const fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'America/Sao_Paulo' });
function tick() {
    $('#readout').textContent = `${fmt.format(new Date())} BRT`;
}
tick();
setInterval(tick, 1000);

/* ---------- boot ---------- */

setLanguage('en');

const fromHash = SECTIONS.findIndex(s => '#' + s.id === location.hash);
if (fromHash >= 0) setTimeout(() => open(fromHash), 400);

function applyDomainFilter(category) {
 document.querySelectorAll('[data-domain-filter]').forEach(b => { const active = b.dataset.domainFilter === category; b.classList.toggle('selected', active); b.setAttribute('aria-pressed', String(active)); });
 document.querySelectorAll('.domain-entry').forEach(d => { d.hidden = category !== 'all' && d.dataset.category !== category; });
}
document.addEventListener('click', e => {
 const filter = e.target.closest('[data-domain-filter]');
 if (filter) applyDomainFilter(filter.dataset.domainFilter);
});
