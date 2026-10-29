/*
 * Interface: idioma, HUD, painel de seções e navegação entre planetas.
 */

const $ = sel => document.querySelector(sel);
const panel = $('#panel');
const dock = $('#dock');
let lang = 'en';
let current = null;

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

    document.querySelectorAll('[data-ui]').forEach(el => { el.textContent = t[el.dataset.ui]; });
    const tagline = document.querySelector('#tagline-detail');

tagline.innerHTML = lang === 'pt'
    ? 'Operações de Segurança <span class="tagline-group">· Segurança Ofensiva</span> · Segurança de IA'
    : 'Security Operations <span class="tagline-group">· Offensive Security</span> · AI Security';
    $('#cv').href = t.cvFile;
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
        $('#panel-content').scrollTop = scroll;
    }

    try { localStorage.setItem('language', lang); } catch (e) {}
}

/* ---------- panel ---------- */

function renderPanel(i) {
    const s = SECTIONS[i];
    const t = UI[lang];
    $('#panel-orbit').textContent = i === 0 ? '☉ 00' : `${t.orbit} ${String(i).padStart(2, '0')}`;
    $('#panel-body').textContent = s.body[lang];
    $('#panel-title').textContent = s.name[lang];
    $('#panel-content').innerHTML = s.render(lang);
    $('#panel').dataset.section = s.id;
    bindForm();
}

function open(i) {
    hideStandby();
    i = (i + SECTIONS.length) % SECTIONS.length;
    const changed = current !== i;
    current = i;
    renderPanel(i);
    if (changed) $('#panel-content').scrollTop = 0;

    document.body.classList.add('focused');
    panel.setAttribute('aria-hidden', 'false');
    dock.querySelectorAll('button').forEach((b, k) => b.classList.toggle('active', k === i));
    dock.children[i].scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
    history.replaceState(null, '', '#' + SECTIONS[i].id);
    Space.focus(i);
}

function close() {
    hideStandby();
    current = null;
    document.body.classList.remove('focused');
    panel.setAttribute('aria-hidden', 'true');
    dock.querySelectorAll('button').forEach(b => b.classList.remove('active'));
    history.replaceState(null, '', location.pathname + location.search);
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

Space.onSelect = i => open(i);
Space.onProbe = showStandby;
$('#standby-close').addEventListener('click', close);

document.addEventListener('click', e => {
    const go = e.target.closest('[data-go]');
    if (!go) return;
    if (go.dataset.go === 'home') close();
    else open(Number(go.dataset.go));
});
$('#panel-close').addEventListener('click', close);
$('#prev').addEventListener('click', () => open(current - 1));
$('#next').addEventListener('click', () => open(current + 1));
document.querySelectorAll('.lang button').forEach(b => b.addEventListener('click', () => setLanguage(b.dataset.lang)));

addEventListener('keydown', e => {
    if (e.target.closest('input, textarea')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') open(current === null ? 0 : current + 1);
    if (e.key === 'ArrowLeft') open(current === null ? SECTIONS.length - 1 : current - 1);
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

let initialLanguage = 'en';
try { initialLanguage = localStorage.getItem('language') || 'en'; } catch (e) {}
setLanguage(initialLanguage);

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
