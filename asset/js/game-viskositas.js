/* ============================================================
   VISCOSITY DRAG RACE — game materi Viskositas
   Bola dijatuhkan ke tabung fluida. Fisika:
     m·a = (ρb − ρf)·V·g − 6π·η·r·v − ½·Cd·ρf·π·r²·v|v|
   (hambatan Stokes + hambatan kuadratik untuk kecepatan tinggi)
   Dimuat dari index.html saat tab "Game" dibuka.
   ============================================================ */
(function () {
  if (window.GameViskositas) return;

  const G = 9.8, CD = 0.47, DEPTH = 0.30, MAXT = 40, DT = 0.001;
  const FLUIDS = {
    air: { n: 'Air', eta: 0.001, rho: 1000, col: '74,168,255' },
    oli: { n: 'Oli Mesin', eta: 0.3, rho: 870, col: '201,154,46' },
    gliserin: { n: 'Gliserin', eta: 1.4, rho: 1260, col: '154,215,200' },
    madu: { n: 'Madu', eta: 10, rho: 1420, col: '224,162,27' }
  };
  const MATS = [
    { id: 'kayu', n: 'Kayu', rho: 700, cost: 1, c1: '#d9a566', c2: '#7a4f24' },
    { id: 'plastik', n: 'Plastik', rho: 1100, cost: 2, c1: '#ff9ab0', c2: '#b0304f' },
    { id: 'kaca', n: 'Kaca', rho: 2500, cost: 3, c1: '#d8f3ff', c2: '#4f8fa8' },
    { id: 'besi', n: 'Besi', rho: 7800, cost: 4, c1: '#e8edf2', c2: '#4a5568' },
    { id: 'timbal', n: 'Timbal', rho: 11300, cost: 5, c1: '#b9a8d9', c2: '#3d3157' }
  ];
  const LEVELS = [
    { name: 'Level 1', fluid: 'oli', free: null, budget: 14, mode: 'race', opp: { mat: 'kaca', r: 5 }, def: { mat: 'plastik', r: 3 },
      brief: 'Kalahkan bola lawan! Kedua tabung berisi <b>oli mesin</b>. Atur bahan dan jari-jari bola dalam batas poin.' },
    { name: 'Level 2', fluid: 'gliserin', free: null, budget: 10, mode: 'race', opp: { mat: 'besi', r: 4 }, def: { mat: 'kaca', r: 2 },
      brief: 'Cairan lebih kental (<b>gliserin</b>) dan poin lebih sedikit. Mana yang lebih berguna: bola lebih besar atau lebih rapat?' },
    { name: 'Level 3', fluid: 'oli', free: ['oli', 'gliserin', 'madu'], budget: 12, mode: 'window', window: [4, 6],
      brief: 'Tepat waktu! Pilih cairan dan bola agar sampai dasar antara <b>4 s – 6 s</b>. Tidak ada lawan, hanya jam.' }
  ];

  const matById = id => MATS.find(m => m.id === id);

  /* ---------- Fisika ---------- */
  function simulate(fl, rho_b, r_mm) {
    const r = r_mm / 1000, V = 4 / 3 * Math.PI * r * r * r, m = rho_b * V;
    const A = Math.PI * r * r;
    const k = 6 * Math.PI * fl.eta * r / m;                         // hambatan linear / m
    const aNet = (rho_b - fl.rho) * V * G / m;                      // percepatan efektif (berat − apung)
    const n = Math.round(MAXT / DT);
    const d = new Float32Array(n + 1);
    let x = 0, v = 0, t = 0, tBottom = null, vmax = 0, i = 0;
    for (; i <= n; i++) {
      d[i] = x;
      if (x >= DEPTH && tBottom === null) { tBottom = t; break; }
      const aq = 0.5 * CD * fl.rho * A * Math.abs(v) * v / m;       // hambatan kuadratik
      v = (v + DT * (aNet - aq)) / (1 + DT * k);                    // implisit utk suku linear (stabil)
      x += v * DT;
      if (x < 0) { x = 0; if (v < 0) v = 0; }
      if (v > vmax) vmax = v;
      t += DT;
    }
    const vt = 2 * r * r * G * (rho_b - fl.rho) / (9 * fl.eta);     // v terminal (Stokes)
    const Re = fl.rho * vmax * 2 * r / fl.eta;
    return { d, len: i, tBottom, vmax, vt, Re, floated: rho_b <= fl.rho };
  }
  const posAt = (s, t) => s.d[Math.min(s.len, Math.floor(t / DT))] || 0;

  /* ---------- State ---------- */
  const st = { lv: 0, mat: 'besi', r: 5, fluid: 'oli', phase: 'setup', raf: 0 };
  const stars = JSON.parse(localStorage.getItem('gvStars') || '[0,0,0]');
  let root, cv, ctx, run = null;

  const css = `
  .gv-root{position:absolute;inset:0;display:grid;grid-template-columns:380px 1fr;gap:16px;padding:12px 16px;color:#EDEFF1;font-family:Arial,Helvetica,sans-serif;z-index:1}
  .gv-side{display:flex;flex-direction:column;gap:8px;min-height:0;overflow:hidden}
  .gv-card{background:#262D35;border:1px solid #3A4451;border-radius:10px;padding:8px 12px;text-align:justify}
  .gv-h{font-size:14px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:#7FBCE3;border-left:4px solid #5FA8D6;padding-left:8px;margin-bottom:5px;text-align:left}
  .gv-brief{font-size:15px;line-height:1.4;color:#BAC7D5;text-align:justify}
  .gv-brief b{color:#7FBCE3}
  .gv-mats{display:grid;grid-template-columns:repeat(5,1fr);gap:6px}
  .gv-mat{background:#1C2228;border:2px solid #3A4451;border-radius:8px;padding:4px 2px;color:#EDEFF1;font-family:inherit;cursor:pointer;text-align:center;transition:.15s}
  .gv-mat:hover{border-color:#7FBCE3}
  .gv-mat.on{border-color:#7FBCE3;box-shadow:0 0 12px rgba(95,168,214,.5);background:#26323f}
  .gv-mat i{display:block;width:22px;height:22px;border-radius:50%;margin:0 auto 3px}
  .gv-mat b{display:block;font-size:13px}.gv-mat small{font-size:11px;color:#8A929C}
  .gv-row{display:flex;justify-content:space-between;align-items:baseline;font-size:15px;color:#BAC7D5}
  .gv-row b{color:#7FBCE3;font-size:17px}
  .gv-range{width:100%;margin-top:4px;accent-color:#5FA8D6}
  .gv-fl{display:flex;gap:6px;flex-wrap:wrap}
  .gv-fl button{flex:1;min-width:70px;background:#1C2228;border:2px solid #3A4451;border-radius:8px;padding:5px 4px;color:#EDEFF1;font-family:inherit;font-size:14px;font-weight:700;cursor:pointer}
  .gv-fl button.on{border-color:#7FBCE3;box-shadow:0 0 10px rgba(95,168,214,.4)}
  .gv-fixed{font-size:16px;color:#EDEFF1;text-align:left}.gv-fixed small{display:block;font-size:13px;color:#8A929C;margin-top:2px}
  .gv-pts{height:10px;border-radius:6px;background:#1C2228;border:1px solid #3A4451;overflow:hidden;margin-top:5px}
  .gv-pts div{height:100%;background:linear-gradient(90deg,#1d8f4f,#33cc66);transition:width .2s}
  .gv-pts.over div{background:linear-gradient(90deg,#b02a2a,#ff5555)}
  .gv-go{border:none;border-radius:10px;padding:11px;font-size:18px;font-weight:900;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;font-family:inherit;color:#d8ffe9;background:linear-gradient(135deg,#1d8f4f,#0f5c33);box-shadow:0 0 16px rgba(61,220,132,.35);transition:.15s}
  .gv-go:hover:not(:disabled){box-shadow:0 0 26px rgba(61,220,132,.6);transform:translateY(-1px)}
  .gv-go:disabled{background:#1c2c38;color:#5d7488;box-shadow:none;cursor:not-allowed}
  .gv-main{display:flex;flex-direction:column;gap:10px;min-width:0;min-height:0}
  .gv-lv{display:flex;gap:10px}
  .gv-lvb{flex:1;background:#262D35;border:2px solid #3A4451;border-radius:10px;padding:8px;color:#EDEFF1;font-family:inherit;font-size:17px;font-weight:800;cursor:pointer;display:flex;justify-content:space-between;align-items:center}
  .gv-lvb.on{border-color:#7FBCE3;box-shadow:0 0 12px rgba(95,168,214,.4)}
  .gv-lvb.lock{opacity:.45;cursor:not-allowed}
  .gv-lvb span{color:#ffb238;letter-spacing:2px}
  .gv-canvas{flex:1;min-height:0;width:100%;border:1px solid #3A4451;border-radius:12px;background:#0D1520;display:block}
  .gv-modal{position:absolute;inset:0;z-index:20;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,.65)}
  .gv-modal.show{display:flex}
  .gv-box{width:min(720px,92%);background:#1C2228;border:1px solid #5FA8D6;border-radius:16px;padding:22px 26px;box-shadow:0 0 40px rgba(95,168,214,.3)}
  .gv-box h2{font-size:30px;margin-bottom:6px}
  .gv-box .st{font-size:34px;color:#ffb238;letter-spacing:6px;margin-bottom:10px}
  .gv-box table{width:100%;border-collapse:collapse;font-size:18px;margin:8px 0 12px}
  .gv-box td{padding:5px 8px;border-bottom:1px solid #3A4451;color:#BAC7D5}.gv-box td:last-child{text-align:right;color:#EDEFF1;font-weight:700}
  .gv-box p{font-size:18px;line-height:1.5;color:#BAC7D5;margin-bottom:12px;text-align:justify}
  .gv-box p b{color:#7FBCE3}
  .gv-btns{display:flex;gap:10px}
  .gv-btns button{flex:1;border:none;border-radius:10px;padding:12px;font-size:17px;font-weight:800;cursor:pointer;font-family:inherit;text-transform:uppercase}
  .gv-b1{background:#2a4a66;color:#d4eeff}.gv-b2{background:linear-gradient(135deg,#1d8f4f,#0f5c33);color:#d8ffe9}
  `;

  /* ---------- UI ---------- */
  function build(container) {
    const s = document.createElement('style'); s.textContent = css; document.head.appendChild(s);
    container.innerHTML = '<div class="circuit"></div><div class="gv-root"><div class="gv-side" id="gvSide"></div>' +
      '<div class="gv-main"><div class="gv-lv" id="gvLv"></div><canvas class="gv-canvas" id="gvCv" width="820" height="540"></canvas></div>' +
      '<div class="gv-modal" id="gvModal"><div class="gv-box" id="gvBox"></div></div></div>';
    root = container.querySelector('.gv-root');
    cv = container.querySelector('#gvCv'); ctx = cv.getContext('2d');
    container.querySelector('#gvSide').addEventListener('click', onSide);
    container.querySelector('#gvSide').addEventListener('input', onSide);
    container.querySelector('#gvLv').addEventListener('click', e => {
      const b = e.target.closest('[data-lv]'); if (b) pickLevel(+b.dataset.lv);
    });
    container.querySelector('#gvBox').addEventListener('click', onBox);
    pickLevel(0);
  }

  const cost = () => matById(st.mat).cost + st.r;

  const unlocked = i => i === 0 || stars[i - 1] > 0;

  function pickLevel(i, keep) {
    if (!unlocked(i)) return;
    cancelAnimationFrame(st.raf); run = null; hideModal();
    st.lv = i; st.phase = 'setup';
    const L = LEVELS[i];
    st.fluid = L.fluid;
    if (!keep && L.def) { st.mat = L.def.mat; st.r = L.def.r; }
    if (cost() > L.budget) { st.mat = 'besi'; st.r = Math.min(st.r, L.budget - 4); }
    renderLv(); renderSide(); draw(0);
  }

  function renderLv() {
    document.getElementById('gvLv').innerHTML = LEVELS.map((l, i) => {
      const lock = !unlocked(i);
      return '<button type="button" class="gv-lvb' + (i === st.lv ? ' on' : '') + (lock ? ' lock' : '') + '" data-lv="' + i + '"' + (lock ? ' disabled title="Selesaikan level sebelumnya dulu"' : '') + '>' +
        l.name + '<span>' + (lock ? '🔒' : '★'.repeat(stars[i]) + '☆'.repeat(3 - stars[i])) + '</span></button>';
    }).join('');
  }

  function renderSide() {
    const L = LEVELS[st.lv], f = FLUIDS[st.fluid], used = cost(), over = used > L.budget;
    const fluidBlock = L.free
      ? '<div class="gv-fl">' + L.free.map(k => '<button type="button" data-fl="' + k + '" class="' + (k === st.fluid ? 'on' : '') + '">' + FLUIDS[k].n + '</button>').join('') + '</div>'
      : '<div class="gv-fixed">' + FLUIDS[L.fluid].n + '</div>';
    document.getElementById('gvSide').innerHTML =
      '<div class="gv-card"><div class="gv-h">Misi ' + L.name + '</div><div class="gv-brief">' + L.brief + '</div></div>' +
      '<div class="gv-card"><div class="gv-h">Cairan dalam tabung</div>' + fluidBlock +
      '<div class="gv-fixed"><small>η = ' + f.eta + ' Pa·s &nbsp;|&nbsp; ρ = ' + f.rho + ' kg/m³</small></div></div>' +
      '<div class="gv-card"><div class="gv-h">Bahan bola</div><div class="gv-mats">' + MATS.map(m =>
        '<button type="button" class="gv-mat' + (m.id === st.mat ? ' on' : '') + '" data-mat="' + m.id + '"><i style="background:radial-gradient(circle at 35% 30%,' + m.c1 + ',' + m.c2 + ')"></i><b>' + m.n + '</b><small>' + m.rho + '</small></button>').join('') +
      '</div><div style="font-size:12px;color:#8A929C;margin-top:3px;text-align:justify">Angka = massa jenis (kg/m³) &middot; biaya bahan ' + matById(st.mat).cost + ' poin</div></div>' +
      '<div class="gv-card"><div class="gv-h">Jari-jari bola</div><div class="gv-row"><span>r</span><b id="gvRv">' + st.r + ' mm</b></div>' +
      '<input class="gv-range" id="gvR" type="range" min="1" max="10" step="1" value="' + st.r + '"></div>' +
      '<div class="gv-card"><div class="gv-row"><span>Poin terpakai</span><b id="gvUsed" style="color:' + (over ? '#ff6b6b' : '#7FBCE3') + '">' + used + ' / ' + L.budget + '</b></div>' +
      '<div class="gv-pts' + (over ? ' over' : '') + '" id="gvBar"><div style="width:' + Math.min(100, used / L.budget * 100) + '%"></div></div></div>' +
      '<button type="button" class="gv-go" id="gvGo"' + (over || st.phase === 'racing' ? ' disabled' : '') + '>' + (over ? 'Poin melebihi batas' : '▶ Jatuhkan!') + '</button>';
  }

  function updatePts() {
    const L = LEVELS[st.lv], used = cost(), over = used > L.budget;
    const set = (id, fn) => { const e = document.getElementById(id); if (e) fn(e); };
    set('gvRv', e => e.textContent = st.r + ' mm');
    set('gvUsed', e => { e.textContent = used + ' / ' + L.budget; e.style.color = over ? '#ff6b6b' : '#7FBCE3'; });
    set('gvBar', e => { e.className = 'gv-pts' + (over ? ' over' : ''); e.firstChild.style.width = Math.min(100, used / L.budget * 100) + '%'; });
    set('gvGo', e => { e.disabled = over || st.phase === 'racing'; e.textContent = over ? 'Poin melebihi batas' : '▶ Jatuhkan!'; });
  }

  function onSide(e) {
    if (st.phase === 'racing') return;
    const t = e.target;
    if (t.id === 'gvR') { st.r = +t.value; updatePts(); draw(0); return; }
    const m = t.closest('[data-mat]'), fl = t.closest('[data-fl]');
    if (m) { st.mat = m.dataset.mat; renderSide(); draw(0); }
    else if (fl) { st.fluid = fl.dataset.fl; renderSide(); draw(0); }
    else if (t.closest('#gvGo')) start();
  }

  /* ---------- Balapan ---------- */
  function start() {
    const L = LEVELS[st.lv];
    if (cost() > L.budget) return;
    const mine = simulate(FLUIDS[st.fluid], matById(st.mat).rho, st.r);
    let opp = null;
    if (L.mode === 'race') opp = simulate(FLUIDS[L.fluid], matById(L.opp.mat).rho, L.opp.r);
    const ends = [mine.tBottom, opp && opp.tBottom].filter(x => x != null);
    const first = ends.length ? Math.min.apply(null, ends) : 6;
    const last = ends.length ? Math.max.apply(null, ends) : 6;
    const endT = (L.mode === 'window' ? (mine.tBottom != null ? mine.tBottom : 6) : last) + 0.3;
    const rate = Math.max(0.02, Math.min(4, (L.mode === 'window' ? (mine.tBottom || 6) : first) / 3));
    run = { mine, opp, endT, rate, t: 0, last: performance.now() };
    st.phase = 'racing'; renderSide();
    st.raf = requestAnimationFrame(loop);
  }

  function loop(now) {
    const dt = Math.min(0.05, (now - run.last) / 1000); run.last = now;
    run.t = Math.min(run.endT, run.t + dt * run.rate);
    draw(run.t);
    if (run.t >= run.endT) return finish();
    st.raf = requestAnimationFrame(loop);
  }

  function finish() {
    st.phase = 'result';
    const L = LEVELS[st.lv], { mine, opp } = run, f = FLUIDS[st.fluid];
    let win, star = 0, rows, title;
    const tm = mine.tBottom;
    rows = [['Bahan / jari-jari', matById(st.mat).n + ' · ' + st.r + ' mm'],
            ['Waktu sampai dasar', tm != null ? tm.toFixed(2) + ' s' : 'tidak sampai'],
            ['v terminal teori (Stokes)', mine.floated ? '— (mengapung)' : (mine.vt * 100).toFixed(1) + ' cm/s'],
            ['v maks. simulasi', (mine.vmax * 100).toFixed(1) + ' cm/s']];
    if (L.mode === 'race') {
      const to = opp.tBottom;
      rows.splice(2, 0, ['Waktu lawan (' + matById(L.opp.mat).n + ', ' + L.opp.r + ' mm)', to != null ? to.toFixed(2) + ' s' : 'tidak sampai']);
      win = tm != null && (to == null || tm < to);
      if (win) { star = 1; if (to == null || tm < to * 0.85) star++; if (cost() <= L.budget - 2) star++; }
    } else {
      win = tm != null && tm >= L.window[0] && tm <= L.window[1];
      rows.splice(2, 0, ['Target waktu', L.window[0] + ' – ' + L.window[1] + ' s']);
      if (win) { star = 1; if (cost() <= L.budget - 2) star++; if (Math.abs(tm - 5) <= 0.3) star++; }
    }
    if (win && star > stars[st.lv]) { stars[st.lv] = star; localStorage.setItem('gvStars', JSON.stringify(stars)); }
    title = win ? '🏆 ' + (L.mode === 'race' ? 'Menang!' : 'Tepat waktu!') : (mine.floated ? 'Bola mengapung' : (L.mode === 'race' ? 'Kalah…' : 'Belum tepat'));
    const why = explain(mine, f, win, L);
    renderLv();
    document.getElementById('gvBox').innerHTML =
      '<h2 style="color:' + (win ? '#33cc66' : '#ffb238') + '">' + title + '</h2>' +
      '<div class="st">' + '★'.repeat(win ? star : 0) + '☆'.repeat(3 - (win ? star : 0)) + '</div>' +
      '<table>' + rows.map(r => '<tr><td>' + r[0] + '</td><td>' + r[1] + '</td></tr>').join('') + '</table>' +
      '<p>' + why + '</p><div class="gv-btns"><button class="gv-b1" data-a="again">Coba lagi</button>' +
      (win && st.lv < LEVELS.length - 1 ? '<button class="gv-b2" data-a="next">Level berikutnya ▶</button>' : '') + '</div>';
    document.getElementById('gvModal').classList.add('show');
  }

  function explain(s, f, win, L) {
    const rb = matById(st.mat).rho;
    if (s.floated) return '<b>ρ bola (' + rb + ') ≤ ρ fluida (' + f.rho + ')</b> sehingga gaya apung ≥ berat. Pilih bahan yang lebih rapat dari ' + f.n + '.';
    let t = 'Kecepatan terminal: <b>v = 2r²g(ρb − ρf) / 9η</b>. Naikkan <b>r</b> (berpengaruh kuadrat) atau <b>ρb</b> agar lebih cepat; ' + f.n + ' dengan η = ' + f.eta + ' Pa·s ';
    t += f.eta >= 1 ? 'sangat kental, jadi hambatannya besar dan bola hampir langsung mencapai v terminal.' : 'cukup encer, jadi bola sempat dipercepat sebelum mencapai v terminal.';
    if (s.Re > 1) t += ' Re ≈ ' + s.Re.toFixed(0) + ' (&gt;1): hambatan tidak lagi linear, sehingga v simulasi lebih kecil dari rumus Stokes.';
    if (L.mode === 'window' && !win && s.tBottom != null) t += s.tBottom < L.window[0] ? ' Terlalu cepat — kurangi r/ρb atau pilih cairan lebih kental.' : ' Terlalu lambat — tambah r/ρb atau pilih cairan lebih encer.';
    return t;
  }

  function hideModal() { const m = document.getElementById('gvModal'); if (m) m.classList.remove('show'); }
  function onBox(e) {
    const a = e.target.dataset.a; if (!a) return;
    if (a === 'next') pickLevel(st.lv + 1); else pickLevel(st.lv, true);
  }

  /* ---------- Gambar ---------- */
  const TOP = 70, BOT = 500, TW = 130;
  function tube(cx, fl, label, d, tNow, doneT, mat, rmm, col2) {
    const H = BOT - TOP, x0 = cx - TW / 2;
    // tabung & cairan
    const g = ctx.createLinearGradient(0, TOP, 0, BOT);
    g.addColorStop(0, 'rgba(' + fl.col + ',.28)'); g.addColorStop(1, 'rgba(' + fl.col + ',.7)');
    ctx.fillStyle = g; ctx.fillRect(x0, TOP + 14, TW, H - 14);
    ctx.strokeStyle = '#5FA8D6'; ctx.lineWidth = 3; ctx.beginPath();
    ctx.moveTo(x0, TOP - 10); ctx.lineTo(x0, BOT); ctx.lineTo(x0 + TW, BOT); ctx.lineTo(x0 + TW, TOP - 10); ctx.stroke();
    // skala
    ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.fillStyle = '#9AA5B1'; ctx.font = '13px Arial'; ctx.lineWidth = 1;
    for (let c = 0; c <= 30; c += 5) {
      const y = TOP + 20 + (c / 30) * (H - 40);
      ctx.beginPath(); ctx.moveTo(x0 + TW, y); ctx.lineTo(x0 + TW - 10, y); ctx.stroke();
      ctx.fillText(c + ' cm', x0 + TW + 8, y + 4);
    }
    // label
    ctx.fillStyle = '#EDEFF1'; ctx.font = 'bold 20px Arial'; ctx.textAlign = 'center';
    ctx.fillText(label, cx, 30);
    ctx.fillStyle = '#7FBCE3'; ctx.font = '15px Arial'; ctx.fillText(fl.n, cx, 52);
    // bola
    const px = 7 + rmm * 2.2, y0 = TOP + 20 + px, y1 = BOT - px - 6;
    const ratio = Math.max(0, Math.min(1, d / DEPTH));
    const by = y0 + ratio * (y1 - y0);
    const trailN = 6; ctx.globalAlpha = .18;
    for (let k = 1; k <= trailN; k++) { ctx.beginPath(); ctx.fillStyle = mat.c1; ctx.arc(cx, by - k * 7 * Math.min(1, ratio * 8), px * (1 - k / 10), 0, 7); if (ratio > 0.01) ctx.fill(); }
    ctx.globalAlpha = 1;
    const bg = ctx.createRadialGradient(cx - px * .35, by - px * .35, px * .1, cx, by, px);
    bg.addColorStop(0, mat.c1); bg.addColorStop(1, mat.c2);
    ctx.fillStyle = bg; ctx.beginPath(); ctx.arc(cx, by, px, 0, 7); ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,.5)'; ctx.lineWidth = 1.5; ctx.stroke();
    // waktu
    ctx.fillStyle = doneT != null ? '#33cc66' : '#ffb238'; ctx.font = 'bold 24px Arial';
    ctx.fillText((doneT != null ? '✔ ' + doneT.toFixed(2) : Math.min(tNow, MAXT).toFixed(2)) + ' s', cx, BOT + 36);
    ctx.textAlign = 'left';
  }

  function draw(tNow) {
    const L = LEVELS[st.lv];
    ctx.clearRect(0, 0, 820, 540);
    const bg = ctx.createLinearGradient(0, 0, 0, 540); bg.addColorStop(0, '#0f2235'); bg.addColorStop(1, '#0a121c');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, 820, 540);
    const mm = matById(st.mat), idle = !run || st.phase === 'setup';
    const mine = run && !idle ? run.mine : null;
    const dm = mine ? posAt(mine, tNow) : 0;
    const dMine = mine && mine.tBottom != null && tNow >= mine.tBottom ? mine.tBottom : null;
    if (L.mode === 'race') {
      tube(250, FLUIDS[st.fluid], 'KAMU', dm, tNow, dMine, mm, st.r);
      const o = matById(L.opp.mat);
      const dop = run && !idle ? posAt(run.opp, tNow) : 0;
      const dOpp = run && !idle && run.opp.tBottom != null && tNow >= run.opp.tBottom ? run.opp.tBottom : null;
      tube(570, FLUIDS[L.fluid], 'LAWAN', dop, tNow, dOpp, o, L.opp.r);
    } else {
      tube(410, FLUIDS[st.fluid], 'KAMU', dm, tNow, dMine, mm, st.r);
      ctx.fillStyle = '#ffb238'; ctx.font = 'bold 22px Arial'; ctx.textAlign = 'center';
      ctx.fillText('Target: ' + L.window[0] + ' – ' + L.window[1] + ' s', 640, 270); ctx.textAlign = 'left';
    }
    if (run && st.phase === 'racing' && run.rate < 0.95) {
      ctx.fillStyle = '#9AA5B1'; ctx.font = '14px Arial'; ctx.fillText('gerak lambat ×' + run.rate.toFixed(2), 14, 530);
    }
  }

  window.GameViskositas = {
    init: function (container) { if (!root) build(container); }
  };
})();
