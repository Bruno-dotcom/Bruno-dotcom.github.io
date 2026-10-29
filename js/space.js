/*
 * Cena 3D do sistema solar (Three.js).
 * Expõe window.Space com focus(index | null), setLabels(lang) e o callback onSelect.
 */

(function () {
  const Space = (window.Space = {
    onSelect: () => {},
    focus: () => {},
    setLabels: () => {},
    ready: false,
  });

  // same breakpoint as the CSS: the panel becomes a bottom sheet
  const SHEET = matchMedia(
    "(max-width: 719px), (max-width: 1024px) and (orientation: portrait)",
  );
  Space.isSheet = () => SHEET.matches;

  if (!window.THREE) {
    document.body.classList.add("no-webgl");
    return;
  }

  const canvas = document.getElementById("space");
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
  } catch (e) {
    document.body.classList.add("no-webgl");
    return;
  }

  Space.paused = false;
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.setClearColor(0x04050a, 1);

  const scene = new THREE.Scene();
  const FOG = 0.0018;
  scene.fog = new THREE.FogExp2(0x04050a, FOG);
  const FOV = 45;
  const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 3000);
  const anisotropy = renderer.capabilities.getMaxAnisotropy();

  /* ---------- procedural textures ---------- */

  function rng(seed) {
    return () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
  }

  function makeCanvas(w, h) {
    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    return [c, c.getContext("2d")];
  }

  function planetTexture(v, seed) {
    const [c, g] = makeCanvas(512, 256);
    const r = rng(seed);
    const colors = v.colors || [];
    const blob = (x, y, rad, color, alpha) => {
      g.globalAlpha = alpha;
      g.fillStyle = color;
      for (const dx of [0, -512, 512]) {
        if (dx && Math.abs(x + dx - 256) > 256 + rad) continue;
        g.beginPath();
        g.arc(x + dx, y, rad, 0, Math.PI * 2);
        g.fill();
      }
    };
    const streak = (color, alpha) => {
      g.globalAlpha = alpha;
      g.fillStyle = color;
      g.beginPath();
      g.ellipse(
        r() * 512,
        r() * 256,
        10 + r() * 50,
        1 + r() * 4,
        0,
        0,
        Math.PI * 2,
      );
      g.fill();
    };

    if (v.kind === "earth") {
      g.fillStyle = "#1b4f9c";
      g.fillRect(0, 0, 512, 256);
      for (let i = 0; i < 400; i++)
        blob(
          r() * 512,
          r() * 256,
          4 + r() * 20,
          r() > 0.5 ? "#2263b8" : "#143c80",
          0.2,
        );
      const land = ["#3f7d3a", "#5b8f3e", "#8a7a4a", "#2f6a35"];
      for (let k = 0; k < 7; k++) {
        const cx = r() * 512,
          cy = 55 + r() * 146,
          spread = 22 + r() * 38;
        for (let i = 0; i < 70; i++) {
          blob(
            cx + (r() - 0.5) * spread * 2,
            cy + (r() - 0.5) * spread,
            3 + r() * 11,
            land[Math.floor(r() * 4)],
            0.9,
          );
        }
      }
      for (let i = 0; i < 150; i++) streak("#ffffff", 0.15 + r() * 0.3);
      g.globalAlpha = 0.9;
      g.fillStyle = "#eef6ff";
      g.fillRect(0, 0, 512, 14);
      g.fillRect(0, 242, 512, 14);
    } else if (v.kind === "rocky") {
      g.fillStyle = colors[0];
      g.fillRect(0, 0, 512, 256);
      for (let i = 0; i < 900; i++)
        blob(
          r() * 512,
          r() * 256,
          2 + r() * 16,
          colors[Math.floor(r() * 3)],
          0.05 + r() * 0.15,
        );
      g.strokeStyle = colors[2];
      g.lineWidth = 1;
      for (let i = 0; i < 50; i++) {
        g.globalAlpha = 0.35;
        g.beginPath();
        g.arc(r() * 512, r() * 256, 1 + r() * 6, 0, Math.PI * 2);
        g.stroke();
      }
      if (v.polar) {
        g.globalAlpha = 0.85;
        g.fillStyle = colors[3];
        g.fillRect(0, 0, 512, 12);
        g.fillRect(0, 247, 512, 9);
      }
    } else {
      // gas, ringed and ice giants: horizontal bands
      const soft = v.kind === "ice";
      g.fillStyle = colors[0];
      g.fillRect(0, 0, 512, 256);
      let y = 0;
      while (y < 256) {
        const hgt = soft ? 12 + r() * 30 : 4 + r() * 22;
        g.fillStyle = colors[Math.floor(r() * colors.length)];
        g.globalAlpha = soft ? 0.12 + r() * 0.18 : 0.35 + r() * 0.5;
        g.fillRect(0, y, 512, hgt);
        y += hgt;
      }
      for (let i = 0; i < (soft ? 60 : 260); i++)
        streak(colors[Math.floor(r() * colors.length)], 0.08 + r() * 0.12);
      if (v.spot) {
        g.globalAlpha = 0.85;
        g.fillStyle = colors[3];
        g.beginPath();
        g.ellipse(330, 165, 26, 12, 0, 0, Math.PI * 2);
        g.fill();
      }
    }
    g.globalAlpha = 1;
    const tex = new THREE.CanvasTexture(c);
    tex.encoding = THREE.sRGBEncoding;
    tex.anisotropy = anisotropy; // sharper surfaces at grazing angles
    return tex;
  }

  function glowTexture(inner, outer) {
    const [c, g] = makeCanvas(256, 256);
    const grad = g.createRadialGradient(128, 128, 0, 128, 128, 128);
    grad.addColorStop(0, inner);
    grad.addColorStop(0.25, outer);
    grad.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 256, 256);
    return new THREE.CanvasTexture(c);
  }

  function sunTexture() {
    const [c, g] = makeCanvas(512, 256);
    const r = rng(7);
    g.fillStyle = "#ff9a2e";
    g.fillRect(0, 0, 512, 256);
    const pal = ["#ffd36b", "#ff7a1a", "#ffe9a8", "#e0520f"];
    for (let i = 0; i < 1600; i++) {
      g.globalAlpha = 0.08 + r() * 0.2;
      g.fillStyle = pal[Math.floor(r() * pal.length)];
      g.beginPath();
      g.arc(r() * 512, r() * 256, 1 + r() * 9, 0, Math.PI * 2);
      g.fill();
    }
    const tex = new THREE.CanvasTexture(c);
    tex.encoding = THREE.sRGBEncoding;
    tex.anisotropy = anisotropy;
    return tex;
  }

  function ringMesh(inner, outer, color, alpha, seed) {
    const [c, g] = makeCanvas(256, 8);
    const r = rng(seed);
    for (let x = 0; x < 256; x++) {
      const fade = Math.min(1, x / 20, (255 - x) / 20);
      g.fillStyle = `rgba(${color},${(0.15 + r() * 0.6) * alpha * fade})`;
      g.fillRect(x, 0, 1, 8);
    }
    const geo = new THREE.RingGeometry(inner, outer, 96, 1);
    const uv = geo.attributes.uv,
      p = geo.attributes.position;
    for (let k = 0; k < uv.count; k++) {
      uv.setXY(
        k,
        (Math.hypot(p.getX(k), p.getY(k)) - inner) / (outer - inner),
        0.5,
      );
    }
    const map = new THREE.CanvasTexture(c);
    map.anisotropy = anisotropy; // rings are seen almost edge-on
    const ring = new THREE.Mesh(
      geo,
      new THREE.MeshBasicMaterial({
        map,
        side: THREE.DoubleSide,
        transparent: true,
        depthWrite: false,
      }),
    );
    ring.rotation.x = -Math.PI / 2;
    return ring;
  }

  /* ---------- stars ---------- */

  function starLayer(count, minR, maxR, size, seed) {
    const r = rng(seed);
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const tints = [
      [1, 1, 1],
      [0.75, 0.85, 1],
      [1, 0.9, 0.75],
      [1, 0.75, 0.7],
    ];
    for (let i = 0; i < count; i++) {
      const u = r() * 2 - 1,
        th = r() * Math.PI * 2,
        rad = minR + r() * (maxR - minR);
      const s = Math.sqrt(1 - u * u);
      pos.set([rad * s * Math.cos(th), rad * u, rad * s * Math.sin(th)], i * 3);
      const t = tints[Math.floor(r() * tints.length)],
        b = 0.5 + r() * 0.5;
      col.set([t[0] * b, t[1] * b, t[2] * b], i * 3);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
    const mat = new THREE.PointsMaterial({
      size,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      fog: false,
      sizeAttenuation: true,
    });
    return new THREE.Points(geo, mat);
  }

  // the sky travels with the camera, so even a huge zoom out never flies through the stars
  const sky = new THREE.Group();
  const stars = new THREE.Group();
  stars.add(starLayer(2600, 500, 1100, 1.6, 3));
  stars.add(starLayer(500, 400, 900, 3.2, 11));
  sky.add(stars);
  scene.add(sky);

  [
    [-300, 150, -800, "rgba(120,80,255,0.35)", "rgba(60,30,160,0.12)"],
    [500, -200, -700, "rgba(255,90,120,0.25)", "rgba(160,30,80,0.08)"],
  ].forEach(([x, y, z, a, b]) => {
    const nebula = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTexture(a, b),
        transparent: true,
        depthWrite: false,
        fog: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    nebula.scale.set(1400, 700, 1);
    nebula.position.set(x, y, z);
    sky.add(nebula);
  });

  /* ---------- sun ---------- */

  const bodies = [];
  const sunSize = SECTIONS[0].visual.size;
  const sun = new THREE.Mesh(
    new THREE.SphereGeometry(sunSize, 64, 64),
    new THREE.MeshBasicMaterial({ map: sunTexture() }),
  );
  sun.userData.index = 0;
  scene.add(sun);

  [
    [34, "rgba(255,220,150,0.9)", "rgba(255,140,40,0.35)"],
    [70, "rgba(255,170,80,0.35)", "rgba(255,90,20,0.08)"],
  ].forEach(([s, a, b]) => {
    const glow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTexture(a, b),
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    glow.scale.set(s, s, 1);
    sun.add(glow);
  });

  scene.add(new THREE.PointLight(0xfff0dd, 2.2, 0, 0));
  scene.add(new THREE.AmbientLight(0x3a3f5c, 0.55));

  bodies.push({
    mesh: sun,
    index: 0,
    radius: sunSize,
    orbit: 0,
    angle: 0,
    speed: 0,
    moons: [],
  });

  /* ---------- planets ---------- */

  SECTIONS.slice(1).forEach((sec, i) => {
    const v = sec.visual;
    const index = i + 1;

    // the pivot carries the axial tilt; the mesh spins inside it
    const pivot = new THREE.Group();
    pivot.rotation.z = v.tilt !== undefined ? v.tilt : 0.1 + (i % 3) * 0.08;
    scene.add(pivot);

    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(v.size, 48, 48),
      new THREE.MeshStandardMaterial({
        map: planetTexture(v, 17 + index * 31),
        roughness: 0.9,
        metalness: 0,
      }),
    );
    mesh.userData.index = index;
    pivot.add(mesh);

    if (v.kind === "ringed") {
      const ring = ringMesh(v.size * 1.4, v.size * 2.4, "230,210,160", 1, 99);
      ring.rotation.x += 0.45;
      pivot.add(ring);
    }
    if (v.faintRing) {
      pivot.add(ringMesh(v.size * 1.6, v.size * 1.9, "200,240,245", 0.35, 41));
    }

    const pts = [];
    for (let a = 0; a <= 160; a++) {
      const t = (a / 160) * Math.PI * 2;
      pts.push(
        new THREE.Vector3(Math.cos(t) * v.orbit, 0, Math.sin(t) * v.orbit),
      );
    }
    const orbitLine = new THREE.LineLoop(
      new THREE.BufferGeometry().setFromPoints(pts),
      new THREE.LineBasicMaterial({
        color: 0x8c93c9,
        transparent: true,
        opacity: 0.16,
      }),
    );
    scene.add(orbitLine);

    const body = {
      mesh,
      pivot,
      index,
      radius: v.size,
      orbit: v.orbit,
      orbitLine,
      angle: (index * 2.4) % (Math.PI * 2),
      speed: 10.8 / Math.pow(v.orbit, 1.5),
      moons: [],
    };

    (v.moons || []).forEach((m, k) => {
      const moon = new THREE.Mesh(
        new THREE.SphereGeometry(m.size, 20, 20),
        new THREE.MeshStandardMaterial({
          color: m.color,
          roughness: 0.85,
          emissive: m.color,
          emissiveIntensity: m.glow || 0.02,
        }),
      );
      moon.userData.index = index;
      scene.add(moon);
      body.moons.push({
        mesh: moon,
        dist: v.size * 1.8 + k * (v.size * 0.45 + 0.4),
        speed: 1.3 - k * 0.2,
        phase: k * 1.9,
        tilt: 0.25 - k * 0.14,
      });
    });

    bodies.push(body);
  });

  const outerOrbit = Math.max(...bodies.map((b) => b.orbit));

  /* ---------- asteroid belt (between Mars and Jupiter) ---------- */

  const marsOrbit = SECTIONS.find((s) => s.id === "research").visual.orbit;
  const jupiterOrbit = SECTIONS.find((s) => s.id === "skills").visual.orbit;
  const beltIn = marsOrbit + (jupiterOrbit - marsOrbit) * 0.35;
  const beltOut = marsOrbit + (jupiterOrbit - marsOrbit) * 0.62;
  const beltCount = 800;
  const belt = new THREE.InstancedMesh(
    new THREE.DodecahedronGeometry(0.12, 0),
    new THREE.MeshStandardMaterial({ color: 0x5a544e, roughness: 1 }),
    beltCount,
  );
  {
    const r = rng(5),
      m = new THREE.Matrix4(),
      q = new THREE.Quaternion(),
      s = new THREE.Vector3(),
      e = new THREE.Euler();
    for (let i = 0; i < beltCount; i++) {
      const a = r() * Math.PI * 2,
        rad = beltIn + r() * (beltOut - beltIn);
      e.set(r() * 3, r() * 3, r() * 3);
      q.setFromEuler(e);
      const k = 0.4 + r() * 1.6;
      s.set(k, k * (0.6 + r() * 0.6), k);
      m.compose(
        new THREE.Vector3(
          Math.cos(a) * rad,
          (r() - 0.5) * 0.9,
          Math.sin(a) * rad,
        ),
        q,
        s,
      );
      belt.setMatrixAt(i, m);
    }
  }
  scene.add(belt);

  /* ---------- deep-space probe (easter egg) ---------- */

  // far above the plane and way past Neptune: only a big zoom out brings it into view
  const PROBE_POS = new THREE.Vector3(330, 200, -390);
  const FAR_DIST = 1500; // how far the camera may back off in the overview
  const probe = new THREE.Group();
  probe.position.copy(PROBE_POS);
  probe.lookAt(0, 0, 0); // the dish (+z) keeps pointing home
  scene.add(probe);
  {
    const white = new THREE.MeshStandardMaterial({
      color: 0xe9e6dc,
      roughness: 0.45,
      metalness: 0.15,
      side: THREE.DoubleSide,
    });
    const foil = new THREE.MeshStandardMaterial({
      color: 0x9a8454,
      roughness: 0.35,
      metalness: 0.7,
    });
    const dark = new THREE.MeshStandardMaterial({
      color: 0x3b3d44,
      roughness: 0.6,
      metalness: 0.5,
    });
    const gold = new THREE.MeshStandardMaterial({
      color: 0xd9ad4f,
      roughness: 0.25,
      metalness: 1,
      emissive: 0x3a2808,
    });
    const up = new THREE.Vector3(0, 1, 0);
    const rod = (from, to, radius, mat) => {
      const dir = new THREE.Vector3().subVectors(to, from);
      const m = new THREE.Mesh(
        new THREE.CylinderGeometry(radius, radius, dir.length(), 6),
        mat,
      );
      m.position.copy(from).addScaledVector(dir, 0.5);
      m.quaternion.setFromUnitVectors(up, dir.normalize());
      probe.add(m);
      return m;
    };
    const v = (x, y, z) => new THREE.Vector3(x, y, z);

    // high-gain antenna: a shallow parabolic dish
    const profile = [];
    for (let i = 0; i <= 18; i++)
      profile.push(new THREE.Vector2((1.85 * i) / 18, 0.42 * (i / 18) ** 2));
    const dishGeo = new THREE.LatheGeometry(profile, 48);
    dishGeo.rotateX(Math.PI / 2);
    probe.add(new THREE.Mesh(dishGeo, white));
    rod(v(0, 0, 0), v(0, 0, 1.05), 0.05, white);
    [0, 2.09, 4.19].forEach((a) =>
      rod(
        v(Math.cos(a) * 1.5, Math.sin(a) * 1.5, 0.3),
        v(0, 0, 1.05),
        0.015,
        white,
      ),
    );

    // decagonal bus wrapped in gold blanket, with the Golden Record on its side
    const bus = new THREE.Mesh(
      new THREE.CylinderGeometry(0.8, 0.8, 0.5, 10),
      foil,
    );
    bus.rotation.x = Math.PI / 2;
    bus.position.z = -0.35;
    probe.add(bus);
    const record = new THREE.Mesh(
      new THREE.CylinderGeometry(0.24, 0.24, 0.03, 32),
      gold,
    );
    record.rotation.z = Math.PI / 2;
    record.position.set(0.8, 0, -0.35);
    probe.add(record);

    // RTG boom with the three power generators
    rod(v(0.7, -0.2, -0.45), v(3.2, -0.9, -0.55), 0.035, dark);
    [0, 1, 2].forEach((k) => {
      const t = 0.45 + k * 0.22;
      rod(
        v(0.7 + 2.5 * t - 0.2, -0.2 - 0.7 * t + 0.06, -0.45 - 0.1 * t),
        v(0.7 + 2.5 * t + 0.2, -0.2 - 0.7 * t - 0.06, -0.45 - 0.1 * t),
        0.17,
        dark,
      );
    });

    // science boom with the scan platform
    rod(v(-0.7, 0.1, -0.45), v(-2.6, 0.5, -0.6), 0.035, dark);
    const platform = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.4, 0.4), foil);
    platform.position.set(-2.8, 0.55, -0.6);
    probe.add(platform);
    rod(v(-2.8, 0.55, -0.4), v(-2.8, 0.55, 0.05), 0.08, dark);

    // the long magnetometer boom
    rod(v(0, 0.7, -0.5), v(-2.2, 6.4, -1.4), 0.018, white);
  }

  // a slow beacon keeps the probe findable from far away (constant size on screen)
  const beacon = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: glowTexture("rgba(235,245,255,1)", "rgba(120,190,255,0.35)"),
      transparent: true,
      depthWrite: false,
      fog: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: false,
    }),
  );
  beacon.scale.set(0.035, 0.035, 1);
  beacon.position.set(0, 0, 1.1);
  probe.add(beacon);

  // an invisible, generous hit area: the probe is a few pixels wide from far away
  const probeHit = new THREE.Mesh(
    new THREE.SphereGeometry(1, 8, 8),
    new THREE.MeshBasicMaterial({ visible: false }),
  );
  probeHit.userData.index = "probe";
  probe.add(probeHit);

  const probeBody = {
    mesh: probeHit,
    pivot: probe,
    index: "probe",
    radius: 3.4,
    moons: [],
    orbit: Math.hypot(PROBE_POS.x, PROBE_POS.z),
    angle: Math.atan2(PROBE_POS.z, PROBE_POS.x),
  };

  /* ---------- labels ---------- */

  const labelLayer = document.getElementById("labels");
  bodies.forEach((b) => {
    const el = document.createElement("button");
    el.className = "label";
    el.innerHTML = "<i></i><span></span>";
    el.addEventListener("click", () => Space.onSelect(b.index));
    labelLayer.appendChild(el);
    b.label = el;
  });

  Space.setLabels = (lang) => {
    bodies.forEach((b) => {
      b.label.querySelector("span").textContent = SECTIONS[b.index].name[lang];
      b.label.setAttribute("aria-label", SECTIONS[b.index].name[lang]);
      b.w = 0;
    });
    relayout();
  };

  /* ---------- framing ---------- */

  const intro = document.getElementById("intro");
  const panel = document.getElementById("panel");
  const dock = document.getElementById("dock");
  const header = document.querySelector(".hud-top");
  const standby = document.getElementById("standby");

  // measuring the HUD forces a layout, so the free rectangle is cached and only
  // re-measured on resize, font/language changes and while the UI is animating
  let cachedRect = null;
  let layoutUntil = 0;
  function relayout() {
    cachedRect = null;
    layoutUntil = performance.now() + 1200; // covers the panel/intro/standby transitions
  }
  if (window.ResizeObserver) {
    const ro = new ResizeObserver(relayout);
    [header, dock, panel, intro, standby].forEach((el) => el && ro.observe(el));
  }
  if (document.fonts) document.fonts.ready.then(relayout);

  // the free rectangle of the screen where the scene should be centered
  function freeRect() {
    const w = innerWidth,
      h = innerHeight;
    const top = header.getBoundingClientRect().bottom + 28; // room for a label above the body
    const bottom = dock.getBoundingClientRect().top - 8;
    const rect = { left: 0, right: w, top, bottom };
    if (focused === probeBody) {
      if (standby)
        rect.bottom = Math.min(
          rect.bottom,
          standby.getBoundingClientRect().top - 8,
        );
    } else if (focused) {
      const p = panel.getBoundingClientRect();
      if (Space.isSheet()) rect.bottom = Math.min(rect.bottom, p.top);
      else rect.right = p.left;
    } else if (!document.body.classList.contains("focused")) {
      const it = intro.getBoundingClientRect();
      // intro on the left (wide screens) or on top (narrow screens)
      if (it.right < w * 0.62) rect.left = it.right;
      else rect.top = Math.max(rect.top, it.bottom);
    }
    if (rect.bottom - rect.top < 120) rect.top = Math.max(0, rect.bottom - 120);
    return rect;
  }

  // camera distance so a sphere of `radius` fits inside the free rectangle
  function fitDist(radius, rect, squash) {
    const h = innerHeight;
    const t = Math.tan(THREE.MathUtils.degToRad(FOV / 2));
    const availW = Math.max(80, rect.right - rect.left) * 0.92;
    const availH = Math.max(80, rect.bottom - rect.top) * 0.92;
    const byW = (radius * h) / (t * availW);
    const byH = (radius * squash * h) / (t * availH);
    return Math.max(byW, byH);
  }

  /* ---------- camera rig ---------- */

  const rig = {
    target: new THREE.Vector3(),
    theta: -0.6,
    phi: 1.12,
    dist: 140,
    want: { theta: -0.6, phi: 1.12, dist: 140 },
    offX: 0,
    offY: 0,
  };
  let focused = null;
  let timeScale = 1;
  let userZoom = 1;

  Space.onProbe = () => {};
  Space.focus = (index) => {
    focused =
      index === null ? null : index === "probe" ? probeBody : bodies[index];
    userZoom = 1;
    relayout();
    if (focused) {
      rig.want.phi = 1.25;
      if (focused.orbit) {
        // look from the sunlit side, with the sun off to one side behind the camera
        const a = focused.angle;
        let theta = Math.atan2(-Math.cos(a), -Math.sin(a)) + 0.9;
        while (theta - rig.theta > Math.PI) theta -= Math.PI * 2;
        while (theta - rig.theta < -Math.PI) theta += Math.PI * 2;
        rig.want.theta = theta;
      }
    } else {
      rig.want.phi = 1.12;
    }
    bodies.forEach((b) => b.label.classList.toggle("active", focused === b));
  };

  function wantedDist(rect) {
    if (!focused) return fitDist(outerOrbit + 3, rect, 0.5);
    const extent = focused.moons.length
      ? Math.max(...focused.moons.map((m) => m.dist)) + 0.6
      : focused.radius *
        (focused.pivot && focused.pivot.children.length > 1 ? 2.5 : 1.3);
    const d = fitDist(Math.max(extent, focused.radius * 1.4), rect, 1);
    return Math.max(d, focused.radius * 3 + 2);
  }

  /* ---------- input ---------- */

  const raycaster = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  const pointers = new Map();
  let drag = null;
  let pinch = null;
  const pickables = bodies
    .flatMap((b) => [b.mesh, ...b.moons.map((m) => m.mesh)])
    .concat(probeHit);
  let hoverAt = null; // hover picking runs once per frame, not on every (up to 1000Hz) mouse event
  let hovered = null;

  function select(i) {
    if (i === "probe") Space.onProbe();
    else if (i !== null) Space.onSelect(i);
  }

  // zooming out is capped a little past the planets, except in the overview,
  // where it goes all the way out to the deep-space probe
  const minZoom = 0.35;
  let baseDist = 140;
  const maxZoom = () => (focused ? 2.5 : Math.max(2.5, FAR_DIST / baseDist));
  const clampZoom = (z) => Math.min(maxZoom(), Math.max(minZoom, z));

  function pick(x, y) {
    ndc.set((x / innerWidth) * 2 - 1, -(y / innerHeight) * 2 + 1);
    raycaster.setFromCamera(ndc, camera);
    const hit = raycaster.intersectObjects(pickables, false)[0];
    return hit ? hit.object.userData.index : null;
  }

  canvas.addEventListener("pointerdown", (e) => {
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    canvas.setPointerCapture(e.pointerId);
    if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      pinch = { d: Math.hypot(a.x - b.x, a.y - b.y), zoom: userZoom };
      drag = null;
    } else {
      drag = {
        x: e.clientX,
        y: e.clientY,
        moved: 0,
        theta: rig.want.theta,
        phi: rig.want.phi,
      };
    }
  });
  canvas.addEventListener("pointermove", (e) => {
    if (pointers.has(e.pointerId))
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pinch && pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      userZoom = clampZoom(
        (pinch.zoom * pinch.d) / Math.max(20, Math.hypot(a.x - b.x, a.y - b.y)),
      );
    } else if (drag) {
      const dx = e.clientX - drag.x,
        dy = e.clientY - drag.y;
      drag.moved = Math.max(drag.moved, Math.hypot(dx, dy));
      rig.want.theta = drag.theta - dx * 0.005;
      rig.want.phi = Math.min(1.5, Math.max(0.35, drag.phi - dy * 0.004));
    } else if (e.pointerType === "mouse") {
      hoverAt = { x: e.clientX, y: e.clientY };
    }
  });
  const release = (e) => {
    if (drag && !pinch && drag.moved < 8 && e.type === "pointerup") {
      select(pick(e.clientX, e.clientY));
    }
    pointers.delete(e.pointerId);
    if (pointers.size < 2) pinch = null;
    drag = null;
  };
  canvas.addEventListener("pointerup", release);
  canvas.addEventListener("pointercancel", release);
  canvas.addEventListener("pointerleave", () => {
    hoverAt = { x: -1e4, y: -1e4 };
  });
  canvas.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      userZoom = clampZoom(userZoom * (1 + Math.sign(e.deltaY) * 0.1));
    },
    { passive: false },
  );

  /* ---------- loop ---------- */

  function resize() {
    renderer.setSize(innerWidth, innerHeight, false);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    relayout();
  }
  addEventListener("resize", resize);
  resize();

  const clock = new THREE.Clock();
  const tmp = new THREE.Vector3();
  const origin = new THREE.Vector3();
  let time = 0;
  let first = true;
  let labelFade = 1;

  // per-frame smoothing expressed at 60fps, corrected for the real frame time,
  // so motion keeps the same feel on 120/144Hz screens and doesn't stutter when a frame drops
  let dt60 = 1;
  const ease = (k) => 1 - Math.pow(1 - k, dt60);

  // only touch the DOM when something actually changed (every write can cost a style recalc)
  function setLabel(p) {
    const b = p.b;
    const x = Math.round(p.x * 10) / 10,
      y = Math.round(p.y * 10) / 10;
    if (x !== b.x || y !== b.y) {
      b.x = x;
      b.y = y;
      b.label.style.transform = `translate(${x}px, ${y}px) translate(-50%, -100%)`;
    }
    if (p.visible !== b.shown) {
      b.shown = p.visible;
      b.label.classList.toggle("hidden", !p.visible);
    }
  }

  function frame() {
    requestAnimationFrame(frame);
    const dt = Math.min(clock.getDelta(), 0.05);
    dt60 = dt * 60;
    timeScale += ((focused ? 0.12 : 1) - timeScale) * ease(0.05);
    const t = reduceMotion || Space.paused ? 0 : dt * timeScale;
    time += t;

    sun.rotation.y += t * 0.05;
    bodies.forEach((b) => {
      if (!b.orbit) return;
      b.angle += b.speed * t;
      b.pivot.position.set(
        Math.cos(b.angle) * b.orbit,
        0,
        Math.sin(b.angle) * b.orbit,
      );
      b.mesh.rotation.y += t * 0.35;
      b.moons.forEach((m) => {
        const a = m.phase + time * m.speed;
        m.mesh.position.set(
          b.pivot.position.x + Math.cos(a) * m.dist,
          Math.sin(a) * m.dist * m.tilt,
          b.pivot.position.z + Math.sin(a) * m.dist,
        );
      });
      b.orbitLine.material.opacity +=
        ((focused === b ? 0.55 : focused ? 0.08 : 0.16) -
          b.orbitLine.material.opacity) *
        ease(0.08);
    });
    belt.rotation.y += t * 0.01;
    stars.rotation.y += Space.paused || reduceMotion ? 0 : dt * 0.004;

    if (!drag && !focused && !reduceMotion && !Space.paused)
      rig.want.theta += dt * 0.02;

    // frame the scene inside the part of the screen that isn't covered by UI
    const w = innerWidth,
      h = innerHeight;
    if (!cachedRect || performance.now() < layoutUntil) cachedRect = freeRect();
    const rect = cachedRect;
    if (!focused) baseDist = wantedDist(rect);
    userZoom = clampZoom(userZoom);
    rig.want.dist = wantedDist(rect) * userZoom;
    const wantOffX = w / 2 - (rect.left + rect.right) / 2;
    const wantOffY = h / 2 - (rect.top + rect.bottom) / 2;

    if (first) {
      rig.dist = rig.want.dist * 1.8; // fly in on load
      rig.offX = wantOffX;
      rig.offY = wantOffY;
      first = false;
    }

    tmp.copy(
      focused ? (focused.pivot ? focused.pivot.position : origin) : origin,
    );
    rig.target.lerp(tmp, ease(focused ? 0.1 : 0.05));
    rig.theta += (rig.want.theta - rig.theta) * ease(0.08);
    rig.phi += (rig.want.phi - rig.phi) * ease(0.08);
    rig.dist += (rig.want.dist - rig.dist) * ease(0.05);
    rig.offX += (wantOffX - rig.offX) * ease(0.08);
    rig.offY += (wantOffY - rig.offY) * ease(0.08);

    camera.position.set(
      rig.target.x + rig.dist * Math.sin(rig.phi) * Math.sin(rig.theta),
      rig.target.y + rig.dist * Math.cos(rig.phi),
      rig.target.z + rig.dist * Math.sin(rig.phi) * Math.cos(rig.theta),
    );
    camera.lookAt(rig.target);
    if (Math.abs(rig.offX) + Math.abs(rig.offY) > 0.5) {
      camera.setViewOffset(w, h, rig.offX, rig.offY, w, h);
    } else {
      camera.clearViewOffset();
    }
    sky.position.copy(camera.position);

    // thin the fog out when backing far away, so the system stays visible from deep space
    scene.fog.density = FOG * Math.min(1, 350 / rig.dist);

    // probe: the beacon fades in only once the camera is far out, and blinks slowly
    const probeView = focused === probeBody;
    const far = probeView ? 1 : THREE.MathUtils.smoothstep(rig.dist, 450, 800);
    const blink = reduceMotion
      ? 1
      : 0.25 +
        0.75 *
          Math.pow(0.5 + 0.5 * Math.sin((performance.now() / 1000) * 2.4), 6);
    beacon.material.opacity = far * blink;
    beacon.visible = far > 0.01;
    probeHit.scale.setScalar(
      Math.max(3.5, camera.position.distanceTo(PROBE_POS) * 0.014),
    );

    if (hoverAt && !drag) {
      const i = pick(hoverAt.x, hoverAt.y);
      hoverAt = null;
      if (i !== hovered) {
        hovered = i;
        canvas.style.cursor = i === null ? "grab" : "pointer";
        bodies.forEach((b) => b.label.classList.toggle("hover", b.index === i));
      }
    }

    renderer.render(scene, camera);

    // labels fade out as the view backs away (they would all pile up on the sun)
    const fade = focused
      ? 1
      : THREE.MathUtils.clamp((4 - rig.dist / baseDist) / 1.5, 0, 1);
    if (
      fade !== labelFade &&
      (Math.abs(fade - labelFade) > 0.01 || fade === 0 || fade === 1)
    ) {
      labelFade = fade;
      labelLayer.style.opacity = fade;
      labelLayer.style.visibility = fade ? "" : "hidden";
    }
    if (!fade) return;

    // project labels, then push overlapping ones upwards (nearest to the camera keeps its place)
    const placed = bodies
      .map((b) => {
        tmp.copy(b.pivot ? b.pivot.position : origin);
        tmp.y += b.radius * (b.index === 0 ? 1.25 : 1.6);
        tmp.project(camera);
        return {
          b,
          x: (tmp.x * 0.5 + 0.5) * w,
          y: (-tmp.y * 0.5 + 0.5) * h,
          z: tmp.z,
          width: b.w || (b.w = b.label.offsetWidth) || 80,
          visible:
            tmp.z < 1 &&
            Math.abs(tmp.x) < 1.1 &&
            (-tmp.y * 0.5 + 0.5) * h > rect.top + 8 &&
            tmp.y > -1.1,
        };
      })
      .sort((p, q) => (q.b === focused) - (p.b === focused) || p.z - q.z);
    const LINE = 22;
    placed.forEach((p, i) => {
      for (let pass = 0; pass < 4; pass++) {
        let hit = null;
        for (let k = 0; k < i && !hit; k++) {
          const o = placed[k];
          if (
            o.visible &&
            Math.abs(o.x - p.x) < (o.width + p.width) / 2 + 4 &&
            Math.abs(o.y - p.y) < LINE
          )
            hit = o;
        }
        if (!hit) break;
        p.y = hit.y - LINE;
      }
      p.visible = p.visible && p.y > rect.top + 8;
      setLabel(p);
    });
  }

  // compile every shader and upload textures up front, so the first frames don't hitch
  renderer.compile(scene, camera);
  if (renderer.initTexture) {
    scene.traverse((o) => {
      if (o.material && o.material.map) renderer.initTexture(o.material.map);
    });
  }

  Space.ready = true;
  requestAnimationFrame(frame);
})();
