/*
 * Interface: idioma, HUD, painel de seções e navegação entre planetas.
 */

const $ = sel => document.querySelector(sel);
const panel = $('#panel');
const dock = $('#dock');
const moonDock = $('#moon-dock');
const PROJECT_IDS = ['home-server', 'cardputer', 'marie'];
let lang = 'en';
let currentProject = null;
let projectOpener = null;
let current = null;
let currentMoon = null;

/* ---------- soundtrack ---------- */

const soundtrack = $('#portfolio-soundtrack');
const soundControl = $('#sound-control');
const soundToggle = $('#sound-toggle');
const soundVolume = $('#sound-volume');

const SOUNDTRACK_ENABLED_KEY = 'portfolio-soundtrack-enabled';
const SOUNDTRACK_VOLUME_KEY = 'portfolio-soundtrack-volume';
const SOUNDTRACK_DEFAULT_VOLUME = 0.70;

let soundtrackEnabled = false;
let soundtrackVolume = SOUNDTRACK_DEFAULT_VOLUME;
let soundtrackSuspended = false;
let soundtrackFadeToken = 0;
let soundtrackRestoreArmed = false;

function clampSoundtrackVolume(value) {
    return Math.min(1, Math.max(0, Number(value) || 0));
}

function readSoundtrackPreferences() {
    if (!soundtrack) return;

    try {
        const savedVolumeValue = localStorage.getItem(SOUNDTRACK_VOLUME_KEY);
        const savedVolume = Number(savedVolumeValue);

        if (
            savedVolumeValue !== null &&
            Number.isFinite(savedVolume) &&
            savedVolume >= 0 &&
            savedVolume <= 1
        ) {
            soundtrackVolume = savedVolume;
        }

        soundtrackEnabled = localStorage.getItem(SOUNDTRACK_ENABLED_KEY) === '1';
    } catch (error) {}

    soundtrack.volume = soundtrackVolume;
    if (soundVolume) soundVolume.value = String(Math.round(soundtrackVolume * 100));
}

function saveSoundtrackPreferences() {
    try {
        localStorage.setItem(SOUNDTRACK_ENABLED_KEY, soundtrackEnabled ? '1' : '0');
        localStorage.setItem(SOUNDTRACK_VOLUME_KEY, String(soundtrackVolume));
    } catch (error) {}
}

function updateSoundtrackUI() {
    if (!soundtrack || !soundControl || !soundToggle || !soundVolume) return;

    const t = UI[lang] || UI.en;
    const playing =
        soundtrackEnabled &&
        !soundtrackSuspended &&
        !soundtrack.paused &&
        soundtrack.volume > 0.001;

    soundControl.classList.toggle('is-enabled', soundtrackEnabled);
    soundControl.classList.toggle('is-playing', playing);
    soundControl.classList.toggle('is-suspended', soundtrackSuspended);

    soundToggle.setAttribute('aria-pressed', String(soundtrackEnabled));

    const toggleLabel = soundtrackEnabled ? t.soundOff : t.soundOn;
    soundToggle.setAttribute('aria-label', toggleLabel);
    soundToggle.title = toggleLabel;
    soundVolume.setAttribute('aria-label', t.soundVolume);
}

function fadeSoundtrackTo(target, duration, onComplete) {
    if (!soundtrack) return;

    const token = ++soundtrackFadeToken;
    const from = soundtrack.volume;
    const to = clampSoundtrackVolume(target);

    if (duration <= 0 || Math.abs(from - to) < 0.001) {
        soundtrack.volume = to;
        if (onComplete) onComplete();
        updateSoundtrackUI();
        return;
    }

    const started = performance.now();

    const step = now => {
        if (token !== soundtrackFadeToken) return;

        const progress = Math.min(1, (now - started) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        soundtrack.volume = from + (to - from) * eased;

        if (progress < 1) {
            requestAnimationFrame(step);
            return;
        }

        soundtrack.volume = to;
        if (onComplete) onComplete();
        updateSoundtrackUI();
    };

    requestAnimationFrame(step);
}

async function playSoundtrack({ fade = true } = {}) {
    if (!soundtrack || !soundtrackEnabled || soundtrackSuspended) {
        updateSoundtrackUI();
        return;
    }

    ++soundtrackFadeToken;

    if (soundtrack.paused) {
        soundtrack.volume = fade ? 0 : soundtrackVolume;

        try {
            await soundtrack.play();
        } catch (error) {
            soundtrack.volume = soundtrackVolume;
            updateSoundtrackUI();
            return;
        }
    }

    if (fade) {
        fadeSoundtrackTo(soundtrackVolume, 700);
    } else {
        soundtrack.volume = soundtrackVolume;
        updateSoundtrackUI();
    }
}

function pauseSoundtrack({ fade = true } = {}) {
    if (!soundtrack) return;

    ++soundtrackFadeToken;

    if (soundtrack.paused) {
        soundtrack.volume = soundtrackVolume;
        updateSoundtrackUI();
        return;
    }

    if (!fade) {
        soundtrack.pause();
        soundtrack.volume = soundtrackVolume;
        updateSoundtrackUI();
        return;
    }

    fadeSoundtrackTo(0, 450, () => {
        soundtrack.pause();
        soundtrack.volume = soundtrackVolume;
        updateSoundtrackUI();
    });
}

function setSoundtrackSuspended(suspended, { fade = true } = {}) {
    soundtrackSuspended = Boolean(suspended);

    if (soundtrackSuspended) {
        pauseSoundtrack({ fade });
    } else if (soundtrackEnabled) {
        playSoundtrack({ fade: true });
    } else {
        updateSoundtrackUI();
    }
}

function disarmSoundtrackRestore() {
    if (!soundtrackRestoreArmed) return;
    soundtrackRestoreArmed = false;
    document.removeEventListener('click', restoreSavedSoundtrack);
}

function restoreSavedSoundtrack(event) {
    if (!soundtrackEnabled) {
        disarmSoundtrackRestore();
        return;
    }

    if (event.target.closest?.('#sound-control')) return;

    disarmSoundtrackRestore();

    if (!soundtrackSuspended) {
        playSoundtrack({ fade: true });
    }
}

function armSoundtrackRestore() {
    if (!soundtrackEnabled || soundtrackRestoreArmed) return;
    soundtrackRestoreArmed = true;
    document.addEventListener('click', restoreSavedSoundtrack);
}

if (soundToggle && soundVolume && soundtrack) {
    readSoundtrackPreferences();
    updateSoundtrackUI();

    soundToggle.addEventListener('click', () => {
    disarmSoundtrackRestore();

    /*
     * A preferência já está habilitada, mas o navegador bloqueou
     * o autoplay. Neste caso, o primeiro clique deve iniciar
     * a trilha, e não desabilitá-la.
     */
    if (
        soundtrackEnabled &&
        soundtrack.paused &&
        !soundtrackSuspended
    ) {
        playSoundtrack({ fade: true });
        return;
    }

    soundtrackEnabled = !soundtrackEnabled;
    saveSoundtrackPreferences();

    if (soundtrackEnabled) {
        playSoundtrack({ fade: true });
    } else {
        pauseSoundtrack({ fade: true });
    }

    updateSoundtrackUI();

    });

    soundVolume.addEventListener('input', () => {
        soundtrackVolume = clampSoundtrackVolume(Number(soundVolume.value) / 100);
        saveSoundtrackPreferences();

        ++soundtrackFadeToken;

        if (!soundtrack.paused && !soundtrackSuspended) {
            soundtrack.volume = soundtrackVolume;
        }

        updateSoundtrackUI();
    });

    soundtrack.addEventListener('play', updateSoundtrackUI);
soundtrack.addEventListener('pause', updateSoundtrackUI);

if (soundtrackEnabled) {
    playSoundtrack({ fade: true }).then(() => {
        if (soundtrack.paused) {
            if (soundtrackEnabled) {
        playSoundtrack({ fade: true }).then(() => {
        if (soundtrack.paused) {
            armSoundtrackRestore();
        }
    });
}
        }
    });
}
}

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
    try { localStorage.setItem('language', lang); } catch (e) {}
    const t = UI[lang];
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';

    document.querySelectorAll('[data-ui]').forEach(el => {
        const translated = t[el.dataset.ui];
        if (typeof translated === 'string') el.textContent = translated;
    });

    $('#tagline-detail').innerHTML = t.taglineLines.map(line => `<span>${line}</span>`).join('<br>');

    $('#stats').innerHTML = t.stats().map(([v, k]) => `<div><dt>${v}</dt><dd>${k}</dd></div>`).join('');
    dock.querySelectorAll('button').forEach((b, i) => { b.querySelector('span').textContent = SECTIONS[i].name[lang]; });
    document.querySelectorAll('.lang button').forEach(b => { const active = b.dataset.lang === lang; b.classList.toggle('active', active); b.setAttribute('aria-pressed', String(active)); });
    document.querySelector('.lang').setAttribute('aria-label', t.language);
    dock.setAttribute('aria-label', t.navigation);
    moonDock.setAttribute('aria-label', t.moonNavigation);
    document.title = 'Bruno Almeida — ' + t.role;
    $('#panel-close').setAttribute('aria-label', t.close);
    $('#standby-close').setAttribute('aria-label', t.close);
    updateSoundtrackUI();
    Space.setLabels(lang);

    if (current === null || panel.getAttribute('aria-hidden') !== 'false') return;

    const section = SECTIONS[current];
    const content = $('#panel-content');
    const scroll = content.scrollTop;

    if (section.id === 'projects' && currentProject) {
        const backHadFocus = document.activeElement === $('.project-back');
        renderPanelHeading(current);
        openProject(currentProject);
        if (backHadFocus) $('.project-back').focus({ preventScroll: true });
    } else if (section.id === 'research' && currentMoon) {
        renderMoon(section, currentMoon);
    } else if (section.id === 'skills') {
        renderPanelHeading(current);
    } else {
        renderPanel(current);
    }

    content.scrollTop = scroll;
}

/* ---------- language buttons ---------- */

document.querySelectorAll('.lang button[data-lang]').forEach(button => {
    button.addEventListener('click', () => {
        setLanguage(button.dataset.lang);
    });
});

/* ---------- panel ---------- */

function renderPanelHeading(i) {
    const s = SECTIONS[i];

    $('#panel-orbit').textContent =
        i === 0 ? '☉ 00' : `${UI[lang].orbit} ${String(i).padStart(2, '0')}`;

    $('#panel-body').textContent = s.body[lang];
    $('#panel-title').textContent = s.name[lang];
}

function renderPanel(i) {
    const s = SECTIONS[i];
    currentProject = null;
    projectOpener = null;
    currentMoon = null;
    renderPanelHeading(i);

    if (s.id === 'research') {

        const researchText = SECTION_TEXT.research[lang];

        $('#panel-content').innerHTML = `
            <div class="research-intro">
                <p>${researchText.overviewIntro}</p>
            </div>

            <div class="research-moons">

                <button class="research-moon-card" data-moon="io">
                    <span class="research-moon-visual moon-io"></span>

                    <div class="research-moon-info">
                        <strong>IO</strong>
                        <span>${researchText.ioTitle}</span>
                    </div>

                    <span class="research-moon-arrow">→</span>
                </button>

                <button class="research-moon-card" data-moon="europa">
                    <span class="research-moon-visual moon-europa"></span>

                    <div class="research-moon-info">
                        <strong>EUROPA</strong>
                        <span>${researchText.europaTitle}</span>
                    </div>

                    <span class="research-moon-arrow">→</span>
                </button>

                <button class="research-moon-card" data-moon="ganymede">
                    <span class="research-moon-visual moon-ganymede"></span>

                    <div class="research-moon-info">
                        <strong>GANYMEDE</strong>
                        <span>${researchText.ganymedeTitle}</span>
                    </div>

                    <span class="research-moon-arrow">→</span>
                </button>

                <button class="research-moon-card" data-moon="callisto">
                    <span class="research-moon-visual moon-callisto"></span>

                    <div class="research-moon-info">
                        <strong>CALLISTO</strong>
                        <span>${researchText.callistoTitle}</span>
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
    /* Project cards */
    if (s.id === 'projects') {
        const content = $('#panel-content');
        content
            .querySelectorAll('.project-card-clickable')
            .forEach(card => {
                card.addEventListener('click', () => {
                    const projectId = card.dataset.project;

                    projectOpener = { id: projectId, scroll: content.scrollTop };
                    openProject(projectId);
                    $('.project-back')?.focus({ preventScroll: true });
                });

                card.addEventListener('keydown', event => {
                    if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        card.click();
                    }
                });
            });
    }
}

function backToProjects() {
    const opener = projectOpener;
    const projectId = opener?.id ?? currentProject;
    renderPanel(current);
    if (opener) $('#panel-content').scrollTop = opener.scroll;
    panel.querySelector(`[data-project="${projectId}"]`)?.focus({ preventScroll: true });
}

function openProject(projectId) {
    if (SECTIONS[current]?.id !== 'projects' || !PROJECT_IDS.includes(projectId)) return;
    currentProject = projectId;

    if (projectId === 'cardputer') return openCardputerProject();
    if (projectId === 'marie') return openMarieProject();

    const { [lang]: t, shared } = PROJECT_CONTENT.homeServer;
    $('#panel-title').textContent = SECTION_TEXT.projects[lang].name;

    $('#panel-content').innerHTML = `
        <div class="project-detail">

            <button class="project-back" type="button">
                ← ${UI[lang].backToProjects}
            </button>

            <header class="project-detail-header">

                <span class="eyebrow">
    ${t.header.eyebrow}
</span>

<h2>Home Server</h2>

<p class="project-detail-tagline">
    ${t.header.tagline}
</p>

                </header>

           <div class="project-detail-hero project-detail-hero-split">

    <div class="project-detail-device">
        <img
            src="files/Projects - Earth/home-server-cq40.png"
            alt="${t.hero.imageAlt}"
        >
    </div>

    <div class="project-detail-identity">

        <span class="project-detail-identity-label">
            ${t.hero.label}
        </span>

        <h3>HP Compaq Presario CQ40</h3>

        <div class="project-detail-tech">
            <span>Debian</span>
            <span>Celeron</span>
            <span>4 GB DDR2</span>
            <span>SATA SSD</span>
        </div>

        <div class="project-detail-active">
            <span class="project-detail-active-dot"></span>

            <span>
                ${t.status.active}
            </span>
        </div>


    </div>

</div>

            <section class="project-story-section">

    <span class="eyebrow">
        ${t.beginning.eyebrow}
    </span>

    <h3>
        ${t.beginning.title}
    </h3>

    <p>
        ${t.beginning.discovery}
    </p>

    <p>
        ${t.beginning.learning}
    </p>

</section>

<section class="project-evolution">

    <span class="eyebrow">
        ${t.timeline.eyebrow}
    </span>

    <h3>
        ${t.timeline.title}
    </h3>

    <div class="project-timeline">

        <div class="project-timeline-item">
            <span class="project-timeline-dot"></span>
            <div>
                <strong>${t.timeline.forgottenTitle}</strong>
                <p>${t.timeline.forgottenDescription}</p>
            </div>
        </div>

        <div class="project-timeline-item">
            <span class="project-timeline-dot"></span>
            <div>
                <strong>${t.timeline.upgradeTitle}</strong>
                <p>${t.timeline.upgradeDescription}</p>
            </div>
        </div>

        <div class="project-timeline-item">
            <span class="project-timeline-dot"></span>
            <div>
                <strong>Linux Mint</strong>
                <p>${t.timeline.linuxMintDescription}</p>
            </div>
        </div>

        <div class="project-timeline-item">
            <span class="project-timeline-dot"></span>
            <div>
                <strong>${t.timeline.explorationTitle}</strong>
                <p>${t.timeline.explorationDescription}</p>
            </div>
        </div>

        <div class="project-timeline-item">
            <span class="project-timeline-dot"></span>
            <div>
                <strong>Debian</strong>
                <p>${t.timeline.debianDescription}</p>
            </div>
        </div>

        <div class="project-timeline-item">
            <span class="project-timeline-dot"></span>
            <div>
                <strong>${t.timeline.headlessTitle}</strong>
                <p>${t.timeline.headlessDescription}</p>
            </div>
        </div>

        <div class="project-timeline-item">
            <span class="project-timeline-dot"></span>
            <div>
                <strong>${t.timeline.labTitle}</strong>
                <p>${t.timeline.labDescription}</p>
            </div>
        </div>

    </div>

</section>

<section class="project-explored">

    <span class="eyebrow">
        ${t.explored.eyebrow}
    </span>

    <h3>
        ${t.explored.title}
    </h3>

    <div class="project-explored-grid">

        <article class="project-explored-card">
            <strong>${t.explored.linuxTitle}</strong>
            <p>
                ${t.explored.linuxDescription}
            </p>
        </article>

        <article class="project-explored-card">
            <strong>${t.explored.networkTitle}</strong>
            <p>
                ${t.explored.networkDescription}
            </p>
        </article>

        <article class="project-explored-card">
            <strong>${t.explored.servicesLabel}</strong>
            <p>
                SSH · Apache · Samba · FTP · Syslog
            </p>
        </article>

        <article class="project-explored-card">
            <strong>${t.explored.offensiveTitle}</strong>
            <p>
                Nmap · Hydra · Metasploit · Nikto · Gobuster
            </p>
        </article>

        <article class="project-explored-card">
            <strong>${t.explored.webTitle}</strong>
            <p>
                ${t.explored.webDescription}
            </p>
        </article>

        <article class="project-explored-card">
            <strong>${shared.explored.defenseTitle}</strong>
            <p>
                UFW · iptables · Fail2ban · Lynis · chkrootkit · rkhunter
            </p>
        </article>

        <article class="project-explored-card">
            <strong>${t.explored.loggingTitle}</strong>
            <p>
                ${t.explored.loggingDescription}
            </p>
        </article>

        <article class="project-explored-card">
            <strong>${t.explored.automationLabel}</strong>
            <p>
                ${t.explored.automation}
            </p>
        </article>

    </div>

</section>

<section class="project-lab-environment">

    <span class="eyebrow">
        ${t.environment.eyebrow}
    </span>

    <h3>
        ${t.environment.title}
    </h3>

    <div class="project-lab-diagram">

        <div class="project-lab-node project-lab-network">
            <span class="project-lab-node-label">
                ${t.environment.networkLabel}
            </span>
            <strong>192.168.10.0/24</strong>
        </div>

        <div class="project-lab-connector"></div>

        <div class="project-lab-node project-lab-server">
            <span class="project-lab-node-label">
                ${t.environment.serverLabel}
            </span>
            <strong>HP Compaq Presario CQ40</strong>
            <small>Debian · Headless · Ethernet</small>
        </div>

        <div class="project-lab-branches">

            <div class="project-lab-service">
                <strong>SSH</strong>
                <span>${t.environment.remoteAdministration}</span>
            </div>

            <div class="project-lab-service">
                <strong>${t.environment.loggingLabel}</strong>
                <span>${t.environment.events}</span>
            </div>

            <div class="project-lab-service">
                <strong>${t.environment.webLabLabel}</strong>
                <span>Apache · DVWA</span>
            </div>

            <div class="project-lab-service">
                <strong>${t.environment.securityLabel}</strong>
                <span>Nmap · Metasploit</span>
            </div>

        </div>

    </div>

</section>

<section class="project-security-cycle">

    <span class="eyebrow">
        ${t.security.eyebrow}
    </span>

    <h3>
        ${t.security.title}
    </h3>

    <p class="project-security-intro">
        ${t.security.intro}
    </p>

    <div class="project-security-flow">

        <div class="project-security-step">
            <span class="project-security-number">01</span>

            <div>
                <strong>
                    ${t.security.attackLabel}
                </strong>

                <p>
                    ${t.security.attackDescription}
                </p>
            </div>
        </div>

        <span class="project-security-arrow">→</span>

        <div class="project-security-step">
            <span class="project-security-number">02</span>

            <div>
                <strong>
                    ${t.security.observeLabel}
                </strong>

                <p>
                    ${t.security.observeDescription}
                </p>
            </div>
        </div>

        <span class="project-security-arrow">→</span>

        <div class="project-security-step">
            <span class="project-security-number">03</span>

            <div>
                <strong>
                    ${t.security.defendLabel}
                </strong>

                <p>
                    ${t.security.defendDescription}
                </p>
            </div>
        </div>

    </div>

</section>

<section class="project-lesson">

    <span class="eyebrow">
        ${t.lesson.eyebrow}
    </span>

    <blockquote>
        ${t.lesson.quote}
    </blockquote>

    <p>
        ${t.lesson.description}
    </p>

</section>

<section class="project-status">

    <div class="project-status-header">
        <span class="eyebrow">
            ${t.status.eyebrow}
        </span>

        <span class="project-status-badge">
            <span class="project-status-dot"></span>
            ${t.status.active}
        </span>
    </div>

    <div class="project-status-lines">
        <span>
            ${t.status.running}
        </span>

        <span>
            ${t.status.learning}
        </span>

        <strong>${t.status.ddr2}</strong>
    </div>

</section>

        </div>
    `;

    $('.project-back').addEventListener('click', backToProjects);

    $('#panel-content').scrollTop = 0;
}

function openCardputerProject() {

    const t = PROJECT_CONTENT.cardputer[lang];
    $('#panel-title').textContent = SECTION_TEXT.projects[lang].name;

    $('#panel-content').innerHTML = `
        <div class="project-detail project-detail-cardputer">

            <button class="project-back" type="button">
                ← ${UI[lang].backToProjects}
            </button>

            <header class="project-detail-header">

                <span class="eyebrow">
                    ${t.header.eyebrow}
                </span>

                <h2>Cardputer ADV</h2>

                <p class="project-detail-tagline">
                    ${t.header.tagline}
                </p>

            </header>

            <div class="cardputer-hero">

    <div class="cardputer-hero-device">
        <img
            src="files/Projects - Earth/cardputer.png"
            alt="M5Stack Cardputer ADV"
        >
    </div>

    <div class="cardputer-hero-info">

        <span class="cardputer-hero-label">
            ${t.hero.label}
        </span>

        <h3>M5Stack Cardputer ADV</h3>

        <div class="cardputer-hero-tech">
            <span>ESP32-S3</span>
            <span>Wi-Fi</span>
            <span>Bluetooth LE</span>
            <span>GPIO</span>
        </div>

    </div>

</div>

<section class="cardputer-story-section">

    <span class="eyebrow">
        ${t.beginning.eyebrow}
    </span>

    <h3>
        ${t.beginning.title}
    </h3>

    <p>
        ${t.beginning.curiosity}
    </p>

    <p>
        ${t.beginning.discovery}
    </p>

</section>

<section class="cardputer-exploration">

    <span class="eyebrow">
        ${t.exploration.eyebrow}
    </span>

    <h3>
        ${t.exploration.title}
    </h3>

    <p class="cardputer-exploration-intro">
        ${t.exploration.intro}
    </p>

    <div class="cardputer-capabilities">

        <div class="cardputer-capability">
            <strong>Wi-Fi</strong>
            <span>${t.exploration.wifi}</span>
        </div>

        <div class="cardputer-capability">
            <strong>Bluetooth LE</strong>
            <span>${t.exploration.bluetooth}</span>
        </div>

        <div class="cardputer-capability">
            <strong>${t.exploration.infraredLabel}</strong>
            <span>${t.exploration.infrared}</span>
        </div>

        <div class="cardputer-capability">
            <strong>RF / RFID</strong>
            <span>${t.exploration.rfid}</span>
        </div>

        <div class="cardputer-capability">
            <strong>NRF24</strong>
            <span>${t.exploration.nrf24}</span>
        </div>

        <div class="cardputer-capability">
            <strong>GPIO</strong>
            <span>${t.exploration.gpio}</span>
        </div>

    </div>

</section>

<section class="cardputer-practice">

    <span class="eyebrow">
        ${t.practice.eyebrow}
    </span>

    <h3>
        ${t.practice.title}
    </h3>

    <p class="cardputer-practice-intro">
        ${t.practice.intro}
    </p>

    <div class="cardputer-practice-flow">

        <div class="cardputer-practice-step">
            <span>01</span>
            <strong>
                ${t.practice.studyLabel}
            </strong>
            <p>
                ${t.practice.studyDescription}
            </p>
        </div>

        <div class="cardputer-practice-arrow">→</div>

        <div class="cardputer-practice-step cardputer-practice-highlight">
            <span>02</span>
            <strong>RESPONDER</strong>
            <p>
                ${t.practice.responderDescription}
            </p>
        </div>

        <div class="cardputer-practice-arrow">→</div>

        <div class="cardputer-practice-step">
            <span>03</span>
            <strong>
                ${t.practice.understandLabel}
            </strong>
            <p>
                ${t.practice.understandDescription}
            </p>
        </div>

    </div>

</section>

<section class="cardputer-beyond">

    <span class="eyebrow">
        ${t.beyond.eyebrow}
    </span>

    <h3>
        ${t.beyond.title}
    </h3>

    <p class="cardputer-beyond-intro">
        ${t.beyond.intro}
    </p>

    <div class="cardputer-beyond-path">

        <div class="cardputer-beyond-item">
            <span>01</span>
            <strong>Arduino</strong>
            <p>
                ${t.beyond.arduinoDescription}
            </p>
        </div>

        <div class="cardputer-beyond-line"></div>

        <div class="cardputer-beyond-item">
            <span>02</span>
            <strong>ESP32</strong>
            <p>
                ${t.beyond.esp32Description}
            </p>
        </div>

        <div class="cardputer-beyond-line"></div>

        <div class="cardputer-beyond-item">
            <span>03</span>
            <strong>
                ${t.beyond.electronicsTitle}
            </strong>
            <p>
                ${t.beyond.electronicsDescription}
            </p>
        </div>

        <div class="cardputer-beyond-line"></div>

        <div class="cardputer-beyond-item">
            <span>04</span>
            <strong>
                ${t.beyond.wirelessTitle}
            </strong>
            <p>
                NRF24 · CC1101 · 2.4 GHz · Sub-GHz
            </p>
        </div>

    </div>

    <div class="cardputer-wireless-feature">

    <div class="cardputer-wireless-image">
        <img
            src="files/Projects - Earth/cardputer-wireless-expansion.png"
            alt="${t.wireless.imageAlt}"
        >
    </div>

    <div class="cardputer-wireless-copy">

        <span class="cardputer-wireless-label">
            ${t.wireless.eyebrow}
        </span>

        <strong>CC1101 + NRF24</strong>

        <p>
            ${t.wireless.description}
        </p>

        <div class="cardputer-wireless-tags">
            <span>CC1101</span>
            <span>NRF24</span>
            <span>Sub-GHz</span>
            <span>2.4 GHz</span>
        </div>

    </div>

</div>

</section>

<section class="cardputer-hardware-lab">

    <span class="eyebrow">
        ${t.hardwareLab.eyebrow}
    </span>

    <h3>
        ${t.hardwareLab.title}
    </h3>

    <div class="cardputer-lab-visual">

        <img
            src="files/Projects - Earth/cardputer-hardware-lab.png"
            alt="${t.hardwareLab.imageAlt}"
        >

        <div class="cardputer-lab-caption">

            <strong>
                ${t.hardwareLab.captionTitle}
            </strong>

            <p>
                ${t.hardwareLab.caption}
            </p>

        </div>

    </div>

</section>

<section class="cardputer-closing">

    <span class="eyebrow">
        ${t.closing.eyebrow}
    </span>

    <h3>
        ${t.closing.title}
    </h3>

    <p>
        ${t.closing.description}
    </p>

    <div class="cardputer-status">
        <span class="cardputer-status-dot"></span>

        <span>
            ${t.closing.status}
        </span>
    </div>

</section>

        </div>
    `;

    $('.project-back').addEventListener('click', backToProjects);

    $('#panel-content').scrollTop = 0;
}

function openMarieProject() {

    const { [lang]: t, shared } = PROJECT_CONTENT.marie;
    $('#panel-title').textContent = SECTION_TEXT.projects[lang].name;

    $('#panel-content').innerHTML = `
        <div class="project-detail project-detail-marie">

            <button class="project-back" type="button">
                ← ${UI[lang].backToProjects}
            </button>

            <header class="project-detail-header">

                <span class="eyebrow">
                    ${t.header.eyebrow}
                </span>

                <h2>Marie</h2>

                <p class="project-detail-tagline">
                    ${t.header.tagline}
                </p>

            </header>


            <!-- ==================================================
                 MARIE HERO
                 ================================================== -->

            <div class="marie-hero">

                <div class="marie-hero-concept">

                    <div class="marie-hero-mark">
                        M
                    </div>

                    <span class="marie-hero-name">
                        MARIE
                    </span>

                </div>

                <div class="marie-hero-info">

                    <span class="marie-hero-label">
                        ${t.hero.label}
                    </span>

                    <h3>
                        ${t.hero.title}
                    </h3>

                    <div class="marie-hero-tech">
                        <span>${t.hero.localLlm}</span>
                        <span>${shared.hero.persistentMemory}</span>
                        <span>SQLite</span>
                        <span>24/7</span>
                    </div>

                </div>

            </div>


            <!-- ==================================================
                 HOW IT STARTED
                 ================================================== -->

            <section class="marie-origin">

                <span class="eyebrow">
                    ${t.origin.eyebrow}
                </span>

                <h3>
                    ${t.origin.title}
                </h3>

                <p class="marie-origin-question">
                    ${t.origin.question}
                </p>

                <p>
                    ${t.origin.experiment}
                </p>

                <p>
                    ${t.origin.assistant}
                </p>

                <p class="marie-name-note">
                    <span>MARIE</span>
                    ${t.origin.tribute}
                </p>

            </section>


            <!-- ==================================================
                 A PLACE TO LIVE
                 ================================================== -->

            <section class="marie-home">

                <span class="eyebrow">
                    ${t.home.eyebrow}
                </span>

                <h3>
                    ${t.home.title}
                </h3>

                <p class="marie-home-intro">
                    ${t.home.intro}
                </p>

                <div class="marie-architecture">

                    <div class="marie-node">

                        <span class="marie-node-status"></span>

                        <span class="marie-node-label">
                            ${shared.architecture.homeServer}
                        </span>

                        <strong>infra-soc</strong>

                        <p>
                            ${t.home.serverDescription}
                        </p>

                        <small>
                            ${t.home.serverAvailability}
                        </small>

                    </div>


                    <div class="marie-connection">

                        <span>${t.architecture.localNetwork}</span>

                        <div class="marie-connection-line">
                            <span>↔</span>
                        </div>

                        <small>
                            ${t.architecture.distributedProcessing}
                        </small>

                    </div>


                    <div class="marie-node marie-node-worker">

                        <span class="marie-node-status"></span>

                        <span class="marie-node-label">
                            ${t.architecture.aiWorker}
                        </span>

                        <strong>i5-worker</strong>

                        <p>
                            ${t.home.workerDescription}
                        </p>

                        <small>
                            ${t.home.workerAvailability}
                        </small>

                    </div>

                </div>

                <p class="marie-architecture-note">
                    ${t.home.explanation}
                </p>

            </section>


            <!-- ==================================================
                 MEMORY · IDENTITY · CONTINUITY
                 ================================================== -->

            <section class="marie-continuity">

                <span class="eyebrow">
                    ${t.continuity.eyebrow}
                </span>

                <h3>
                    ${t.continuity.title}
                </h3>

                <p class="marie-continuity-intro">
                    ${t.continuity.intro}
                </p>


                <div class="marie-continuity-flow">

                    <div class="marie-continuity-item">

                        <span>01</span>

                        <strong>
                            ${t.continuity.identityTitle}
                        </strong>

                        <p>
                            ${t.continuity.identityDescription}
                        </p>

                    </div>


                    <div class="marie-continuity-arrow">
                        →
                    </div>


                    <div class="marie-continuity-item">

                        <span>02</span>

                        <strong>
                            ${t.continuity.memoryTitle}
                        </strong>

                        <p>
                            ${t.continuity.memoryDescription}
                        </p>

                    </div>


                    <div class="marie-continuity-arrow">
                        →
                    </div>


                    <div class="marie-continuity-item">

                        <span>03</span>

                        <strong>
                            ${t.continuity.historyTitle}
                        </strong>

                        <p>
                            ${t.continuity.historyDescription}
                        </p>

                    </div>


                    <div class="marie-continuity-arrow">
                        →
                    </div>


                    <div class="marie-continuity-item marie-continuity-highlight">

                        <span>04</span>

                        <strong>
                            ${t.continuity.continuityTitle}
                        </strong>

                        <p>
                            ${t.continuity.continuityDescription}
                        </p>

                    </div>

                </div>


                <blockquote class="marie-continuity-quote">
                    ${t.continuity.question}
                </blockquote>

            </section>


            <!-- ==================================================
                 LOCAL BY DESIGN
                 ================================================== -->

            <section class="marie-local">

                <span class="eyebrow">
                    ${t.local.eyebrow}
                </span>

                <h3>
                    ${t.local.title}
                </h3>

                <p class="marie-local-intro">
                    ${t.local.intro}
                </p>


                <div class="marie-local-grid">

                    <div class="marie-local-item">

                        <span>01</span>

                        <strong>${t.local.inference}</strong>

                        <p>
                            ${t.local.inferenceDescription}
                        </p>

                    </div>


                    <div class="marie-local-item">

                        <span>02</span>

                        <strong>${t.local.privacy}</strong>

                        <p>
                            ${t.local.privacyDescription}
                        </p>

                    </div>


                    <div class="marie-local-item">

                        <span>03</span>

                        <strong>${t.local.memory}</strong>

                        <p>
                            ${t.local.memoryDescription}
                        </p>

                    </div>


                    <div class="marie-local-item">

                        <span>04</span>

                        <strong>${t.local.access}</strong>

                        <p>
                            ${t.local.accessDescription}
                        </p>

                    </div>

                </div>


                <div class="marie-privacy-line">

                    <span>${t.local.environment}</span>

                    <div></div>

                    <strong>
                        ${t.local.statement}
                    </strong>

                </div>

            </section>

                        <!-- ==================================================
                 HOW FAR COULD THIS GO?
                 ================================================== -->

                             <!-- ==================================================
                 THE EXPERIMENT TODAY
                 ================================================== -->

            <section class="marie-today">

                <span class="eyebrow">
                    ${t.today.eyebrow}
                </span>

                <h3>
                    ${t.today.title}
                </h3>

                <p class="marie-today-intro">
                    ${t.today.intro}
                </p>


                    <div class="marie-system">

    <div class="marie-system-node marie-system-home">

        <span class="marie-system-role">${t.today.primaryNode}</span>

        <strong>infra-soc</strong>

        <small>Home Server · Celeron</small>

        <div class="marie-system-list">
            <span>${t.architecture.identity}</span>
            <span>${t.architecture.memory}</span>
            <span>${t.architecture.history}</span>
            <span>SQLITE</span>
        </div>

        <p>
            ${t.today.serverDescription}
        </p>

    </div>


    <div class="marie-system-link">

        <span>${t.architecture.localNetwork}</span>

        <div>
            <i></i>
            <strong>↔</strong>
            <i></i>
        </div>

        <small>
            ${t.architecture.distributedProcessing}
        </small>

    </div>


    <div class="marie-system-node marie-system-worker">

        <span class="marie-system-role">${t.architecture.aiWorker}</span>

        <strong>i5-worker</strong>

        <small>Intel Core i5-8265U</small>

        <div class="marie-system-list">
            <span>LLM</span>
            <span>${t.architecture.inference}</span>
            <span>${t.architecture.processing}</span>
        </div>

        <p>
            ${t.today.workerDescription}
        </p>

    </div>

</div>


<div class="marie-system-principle">

    <span>${t.today.principleLabel}</span>

    <p>
        ${t.today.principle}
    </p>

</div>

            </section>

            <section class="marie-future">

                <span class="eyebrow">
                    ${t.future.eyebrow}
                </span>

                <h3>
                    ${t.future.title}
                </h3>

                <p class="marie-future-intro">
                    ${t.future.intro}
                </p>

                <div class="marie-future-visual">

    <img
        src="files/Projects - Earth/marie-concept.jpg"
        alt="${t.future.imageAlt}"
    >

    <div class="marie-future-visual-caption">

        <span>
            ${t.future.conceptLabel}
        </span>

        <p>
            ${t.future.conceptCaption}
        </p>

    </div>

</div>

                <div class="marie-future-grid">

                    <div class="marie-future-item">
                        <span>${t.future.voice}</span>
                        <strong>
                            ${t.future.voiceTitle}
                        </strong>
                        <p>
                            ${t.future.voiceDescription}
                        </p>
                    </div>

                    <div class="marie-future-item">
                        <span>${t.future.continuity}</span>
                        <strong>
                            ${t.future.contextTitle}
                        </strong>
                        <p>
                            ${t.future.contextDescription}
                        </p>
                    </div>

                    <div class="marie-future-item">
                        <span>${t.future.access}</span>
                        <strong>
                            ${t.future.accessTitle}
                        </strong>
                        <p>
                            ${t.future.accessDescription}
                        </p>
                    </div>

                </div>

                <div class="marie-future-question">

                    <span>
                        ${t.future.questionLabel}
                    </span>

                    <p>
                        ${t.future.question}
                    </p>

                </div>

            </section>


        </div>
    `;


    $('.project-back').addEventListener('click', backToProjects);


    $('#panel-content').scrollTop = 0;
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

function renderMoon(research, moonId) {
    const moon = research.visual.moons.find(
        item => item.id === moonId
    );

    if (!moon) return false;

    const container = document.createElement("div");
    container.innerHTML = research.render(lang);

    const group = container.querySelector(
        `.research-group[data-moon="${moonId}"]`
    );

    if (!group) return false;

    $('#panel-orbit').textContent =
        `${research.body[lang].toUpperCase()} · ${(moon.name || moonId).toUpperCase()}`;

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

    return true;
}

function openMoon(target) {
    const researchIndex = SECTIONS.findIndex(section => section.id === 'research');
    const research = SECTIONS[researchIndex];
    if (!research || !renderMoon(research, target.id)) return;

    current = researchIndex;
    currentProject = null;
    currentMoon = target.id;
    $('#panel-content').scrollTop = 0;
    showMoonDock(currentMoon);

    $('#panel').dataset.section = "research";

    document.body.classList.add("focused");
    panel.setAttribute("aria-hidden", "false");

    dock.querySelectorAll("button").forEach((button, index) => {
        button.classList.toggle("active", index === researchIndex);
    });

    if (Space.focusMoon) Space.focusMoon(target);
    else Space.focus(researchIndex);

    history.replaceState(
        null,
        "",
        `#research-${currentMoon}`
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

function trackKaliScroll(workspace) {
    const screen = workspace.closest('.kali-terminal-screen');
    const scrollTop = screen?.scrollTop;
    return () => screen && screen.scrollTop === scrollTop ? screen : null;
}

function bindKaliRootMenu() {
    const output = document.querySelector('#kali-output');

    if (!output) return;

    output.querySelectorAll('.kali-root-dir').forEach(dir => {
        dir.addEventListener('click', () => {
            openSkillDirectory(dir.dataset.skill, dir);
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
                <button type="button" class="kali-root-dir" data-skill="investigate">investigate/</button>
                <button type="button" class="kali-root-dir" data-skill="hunt">hunt/</button>
                <button type="button" class="kali-root-dir" data-skill="exploit">exploit/</button>
                <button type="button" class="kali-root-dir" data-skill="engineer">engineer/</button>
            </div>
        </div>

        <div class="kali-workspace"></div>
    `;

    command.textContent = '';
    bindKaliRootMenu();
}

async function openSkillDirectory(skill, trigger) {
    const data = kaliSkills[skill];

    if (!data) return;

    const session = ++kaliTerminalSession;

    const workspace = document.querySelector('.kali-workspace');
    const command = document.querySelector('#kali-command');

    if (!workspace || !command) return;
    const followOutput = trackKaliScroll(workspace);

    const typed = await kaliType(
        `cd ${skill}/ && ls`,
        command,
        session,
        45
    );

    if (!typed) return;

    await kaliWait(200);

    if (session !== kaliTerminalSession) return;

    const moveFocus = document.activeElement === trigger && trigger.matches(':focus-visible');
    const scrollTarget = moveFocus ? null : followOutput();
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

                <button
                    type="button"
                    class="kali-tools-dir"
                    data-skill="${skill}"
                >
                    tools/
                </button>
            </div>

        </div>
    `;

    command.textContent = '';
    setKaliActivePath(`~/skills/${skill}`);

    const toolsDir = workspace.querySelector('.kali-tools-dir');

    if (toolsDir) {
        toolsDir.addEventListener('click', () => {
            openSkillTools(skill, toolsDir);
        });
        if (moveFocus) toolsDir.focus();
    }
    if (scrollTarget) scrollTarget.scrollTop = scrollTarget.scrollHeight;
}

async function openSkillTools(skill, trigger) {
    const data = kaliSkills[skill];

    if (!data) return;

    const session = ++kaliTerminalSession;

    const workspace = document.querySelector('.kali-workspace');
    const command = document.querySelector('#kali-command');

    if (!workspace || !command) return;
    const followOutput = trackKaliScroll(workspace);

    const typed = await kaliType(
        'cd tools/ && ls',
        command,
        session,
        45
    );

    if (!typed) return;

    await kaliWait(200);

    if (session !== kaliTerminalSession) return;

    const moveFocus = document.activeElement === trigger && trigger.matches(':focus-visible');
    const scrollTarget = moveFocus ? null : followOutput();
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

            <button
                type="button"
                class="kali-tools-back"
                data-skill="${skill}"
            >
                ../
            </button>

        </div>
    `;

    command.textContent = '';
    setKaliActivePath(`~/skills/${skill}/tools`);

    const back = workspace.querySelector('.kali-tools-back');

    if (back) {
        back.addEventListener('click', () => {
            returnToSkillDirectory(skill, back);
        });
        if (moveFocus) back.focus();
    }
    if (scrollTarget) scrollTarget.scrollTop = scrollTarget.scrollHeight;
}

async function returnToSkillDirectory(skill, trigger) {
    const data = kaliSkills[skill];

    if (!data) return;

    const session = ++kaliTerminalSession;

    const workspace = document.querySelector('.kali-workspace');
    const command = document.querySelector('#kali-command');

    if (!workspace || !command) return;
    const followOutput = trackKaliScroll(workspace);

    const typed = await kaliType(
        'cd ..',
        command,
        session,
        45
    );

    if (!typed) return;

    await kaliWait(150);

    if (session !== kaliTerminalSession) return;

    const moveFocus = document.activeElement === trigger && trigger.matches(':focus-visible');
    const scrollTarget = moveFocus ? null : followOutput();
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

                <button
                    type="button"
                    class="kali-tools-dir"
                    data-skill="${skill}"
                >
                    tools/
                </button>
            </div>

        </div>
    `;

    command.textContent = '';
    setKaliActivePath(`~/skills/${skill}`);

    const toolsDir = workspace.querySelector('.kali-tools-dir');

    if (toolsDir) {
        toolsDir.addEventListener('click', () => {
            openSkillTools(skill, toolsDir);
        });
        if (moveFocus) toolsDir.focus();
    }
    if (scrollTarget) scrollTarget.scrollTop = scrollTarget.scrollHeight;
}

function open(i) {
    hideMoonDock();
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
    const projectDockButton = currentProject ? dock.children[current] : null;
    currentProject = null;
    projectOpener = null;

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
    projectDockButton?.focus({ preventScroll: true });
}

/* ---------- easter egg: the deep-space probe ---------- */

const standby = $('#standby');

function resetVoyagerVideo() {
    const video = $('#voyager-video');
    if (!video) return;

    video.pause();
    video.currentTime = 0;
    video.controls = false;
    video.closest('.voyager-video-frame')?.classList.remove('is-started');
    setSoundtrackSuspended(false);
}

function showStandby() {
    close();
    document.body.classList.add('probe-view');
    standby.setAttribute('aria-hidden', 'false');
    Space.focus('probe');
    resetVoyagerVideo();
    $('#standby-close').focus({ preventScroll: true });
}

function hideStandby() {
    if (!document.body.classList.contains('probe-view')) return;
    resetVoyagerVideo();
    document.body.classList.remove('probe-view');
    standby.setAttribute('aria-hidden', 'true');
}

Space.onSelect = i => {
    const section = SECTIONS[i];

    if (section?.id === "research") {
        current = i;

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

/* ---------- Voyager video transmission ---------- */

const voyagerVideo = document.getElementById('voyager-video');
const voyagerStart = document.getElementById('voyager-start');
const voyagerFrame = voyagerVideo?.closest('.voyager-video-frame');

if (voyagerVideo && voyagerStart && voyagerFrame) {
    voyagerVideo.controls = false;

    voyagerVideo.addEventListener('play', () => {
        // Video audio takes priority: stop the portfolio soundtrack immediately.
        setSoundtrackSuspended(true, { fade: false });
    });

    voyagerStart.addEventListener('click', async () => {
        voyagerStart.disabled = true;

        try {
            await voyagerVideo.play();
            voyagerVideo.controls = true;
            voyagerFrame.classList.add('is-started');
        } catch (error) {
            console.error('Voyager video playback failed:', error);
            console.error('Video source:', voyagerVideo.currentSrc);
            console.error('Media error code:', voyagerVideo.error?.code);

            // Expose native controls if playback fails so the media can be diagnosed.
            voyagerVideo.controls = true;
            voyagerFrame.classList.add('is-started');
        } finally {
            voyagerStart.disabled = false;
        }
    });

    voyagerVideo.addEventListener('ended', resetVoyagerVideo);

    voyagerVideo.addEventListener('error', () => {
        console.error(
            'Voyager media load error:',
            voyagerVideo.error?.code,
            voyagerVideo.currentSrc
        );
    });
}

Space.onProbe = showStandby;
$('#standby-close').addEventListener('click', close);

document.addEventListener('click', e => {
    const go = e.target.closest('[data-go]');
    if (!go) return;
    if (go.dataset.go === 'home') close();
    else open(Number(go.dataset.go));
});
$('#panel-close').addEventListener('click', close);

function navigateProject(direction) {
    if (!currentProject) return false;

    const currentIndex = PROJECT_IDS.indexOf(currentProject);

    if (currentIndex === -1) return false;

    const nextIndex =
        (currentIndex + direction + PROJECT_IDS.length) % PROJECT_IDS.length;

    openProject(PROJECT_IDS[nextIndex]);

    return true;
}

$('#prev').addEventListener('click', () => {
    if (navigateProject(-1)) return;
    if (navigateMoon(-1)) return;
    open(current - 1);
});

$('#next').addEventListener('click', () => {
    if (navigateProject(1)) return;
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

/* ---------- readout (Brasília time) ---------- */

const fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'America/Sao_Paulo' });
function tick() {
    $('#readout').textContent = `${fmt.format(new Date())} BRT`;
}
tick();
setInterval(tick, 1000);

/* ---------- boot ---------- */

let savedLanguage;
try { savedLanguage = localStorage.getItem('language'); } catch (e) {}
setLanguage(savedLanguage);

const initialHash = location.hash;
const fromHash = SECTIONS.findIndex(s => '#' + s.id === initialHash);
if (fromHash >= 0) {
    setTimeout(() => {
        if (location.hash !== initialHash) return;
        open(fromHash);
    }, 400);
} else if (initialHash.startsWith('#research-')) {
    const researchIndex = SECTIONS.findIndex(s => s.id === 'research');
    const moon = SECTIONS[researchIndex]?.visual.moons.find(m => '#research-' + m.id === initialHash);

    if (moon) {
        setTimeout(() => {
            if (location.hash !== initialHash) return;
            document.body.classList.add('research-mode');
            // Use Jupiter's viewing angle before focusing the moon in 3D.
            if (Space.focusMoon) Space.focus(researchIndex);
            openMoon({ id: moon.id, parentIndex: researchIndex });
        }, 400);
    }
}
