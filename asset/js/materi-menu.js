/* ============================================================
   MateriLab — menu pemilihan materi & pemuat modul
   Dipanggil dari splash screen (index.html) setelah tombol MULAI.
   - Viskositas : aplikasi yang sudah ada di index.html
   - Lainnya    : dimuat sesesuai kebutuhan dari asset/js/modul/<id>.js
   Tiap modul mendaftar lewat MateriLab.register(id, { render(container, api) })
   ============================================================ */
(function () {
  const MATERI = [
    { id: 'hidrostatis', no: 1, judul: 'Tekanan Hidrostatis', ket: 'Tekanan zat cair pada kedalaman tertentu', ikon: '<path d="M12 3v14M7 12l5 5 5-5M4 21h16"/>' },
    { id: 'pascal', no: 2, judul: 'Hukum Pascal', ket: 'Penerusan tekanan pada fluida tertutup', ikon: '<rect x="3" y="12" width="6" height="8" rx="1"/><rect x="15" y="6" width="6" height="14" rx="1"/><path d="M9 16h6"/>' },
    { id: 'archimedes', no: 3, judul: 'Hukum Archimedes', ket: 'Gaya apung, terapung, melayang, tenggelam', ikon: '<path d="M3 15c3 3 6-3 9 0s6 3 9 0"/><circle cx="12" cy="8" r="3"/>' },
    { id: 'kapilaritas', no: 4, judul: 'Meniskus & Kapilaritas', ket: 'Kenaikan dan penurunan fluida dalam pipa kecil', ikon: '<path d="M9 3v12a3 3 0 0 0 6 0V3"/><path d="M9 11c2 2 4-2 6 0"/>' },
    { id: 'tegangan-permukaan', no: 5, judul: 'Tegangan Permukaan', ket: 'Gaya kohesi pada permukaan zat cair', ikon: '<path d="M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11z"/>' },
    { id: 'viskositas', no: 6, judul: 'Viskositas', ket: 'Gaya Stokes & kecepatan terminal bola dalam fluida', ikon: '<path d="M12 22a8 8 0 0 0 8-8c0-3.5-3-7.5-8-12-5 4.5-8 8.5-8 12a8 8 0 0 0 8 8z"/>' }
  ];

  const CSS = `
  .ml-overlay{position:absolute;inset:0;z-index:9000;display:none;flex-direction:column;
    background:radial-gradient(ellipse at 50% -10%,#2a3441 0%,#1C2228 60%,#12171c 100%);color:#EDEFF1;
    font-family:Arial,Helvetica,sans-serif;opacity:0;transition:opacity .45s ease}
  .ml-overlay.show{display:flex}
  .ml-overlay.vis{opacity:1}
  .ml-overlay::before{content:'';position:absolute;inset:0;opacity:.07;pointer-events:none;
    background-image:linear-gradient(90deg,#7FBCE3 1px,transparent 1px),linear-gradient(0deg,#7FBCE3 1px,transparent 1px);
    background-size:38px 38px;mask-image:radial-gradient(ellipse at 50% 40%,#000 10%,transparent 70%)}
  .ml-head{position:relative;text-align:center;padding:34px 0 8px}
  .ml-head h1{font-size:38px;letter-spacing:.08em;color:#EDEFF1;text-shadow:0 0 18px rgba(95,168,214,.6)}
  .ml-head p{margin-top:8px;font-size:19px;color:#8A929C;letter-spacing:.04em}
  .ml-grid{position:relative;flex:1;display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(2,1fr);
    gap:22px;padding:22px 60px 40px;min-height:0}
  .ml-card{position:relative;display:flex;flex-direction:column;justify-content:center;gap:10px;text-align:left;
    padding:20px 24px;border-radius:16px;border:1px solid #3A4451;background:linear-gradient(160deg,#2b333d,#20262d);
    color:inherit;font-family:inherit;cursor:pointer;overflow:hidden;
    box-shadow:0 8px 24px rgba(0,0,0,.35);transition:transform .25s ease,box-shadow .25s ease,border-color .25s ease;
    opacity:0;transform:translateY(18px);animation:mlIn .55s ease forwards}
  .ml-card::before{content:'';position:absolute;left:0;top:0;bottom:0;width:4px;background:#5FA8D6;box-shadow:0 0 12px #5FA8D6}
  .ml-card:hover{transform:translateY(-6px);border-color:#7FBCE3;box-shadow:0 14px 34px rgba(95,168,214,.28)}
  .ml-card .no{position:absolute;right:16px;top:8px;font-size:64px;font-weight:900;color:rgba(127,188,227,.10)}
  .ml-card svg{width:42px;height:42px;fill:none;stroke:#7FBCE3;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;
    filter:drop-shadow(0 0 6px rgba(127,188,227,.6))}
  .ml-card .jd{font-size:24px;font-weight:800;color:#EDEFF1;letter-spacing:.02em}
  .ml-card .kt{font-size:17px;line-height:1.4;color:#9AA5B1}
  .ml-card .tag{align-self:flex-start;font-size:13px;font-weight:800;letter-spacing:.06em;padding:3px 10px;border-radius:20px;
    text-transform:uppercase;color:#33cc66;border:1px solid rgba(51,204,102,.4);background:rgba(51,204,102,.1)}
  .ml-card .tag.soon{color:#ffb238;border-color:rgba(255,178,56,.4);background:rgba(255,178,56,.1)}
  @keyframes mlIn{to{opacity:1;transform:translateY(0)}}
  .ml-bar{position:relative;flex:0 0 auto;display:flex;align-items:center;gap:16px;height:54px;padding:0 20px;
    background:#262D35;border-bottom:2px solid #3A4451;box-shadow:0 4px 15px rgba(0,0,0,.2)}
  .ml-back{background:transparent;border:1px solid #6B747F;color:#EDEFF1;border-radius:30px;padding:7px 18px;
    font-size:15px;font-weight:700;letter-spacing:.04em;cursor:pointer;font-family:inherit;transition:.2s}
  .ml-back:hover{border-color:#7FBCE3;color:#7FBCE3;transform:translateX(-3px)}
  .ml-bar-title{font-size:18px;font-weight:800;letter-spacing:.07em;text-transform:uppercase}
  .ml-body{position:relative;flex:1;min-height:0;overflow:hidden}
  .ml-ph{height:100%;display:flex;align-items:center;justify-content:center}
  .ml-ph-card{max-width:620px;text-align:center;padding:36px 40px;border-radius:16px;border:1px dashed #3A4451;background:#262D35}
  .ml-ph-card h2{font-size:28px;color:#7FBCE3;margin-bottom:12px}
  .ml-ph-card p{font-size:19px;line-height:1.6;color:#BAC7D5}
  .ml-ph-card ul{list-style:none;display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:18px}
  .ml-ph-card li{font-size:14px;font-weight:700;padding:5px 14px;border-radius:20px;color:#7FBCE3;border:1px solid #3A4451}
  .ml-tools{position:absolute;right:28px;top:26px;display:flex;gap:12px;z-index:2}
  .ml-ico{width:48px;height:48px;border-radius:50%;border:1px solid #3A4451;background:#262D35;color:#7FBCE3;cursor:pointer;
    display:flex;align-items:center;justify-content:center;transition:.2s}
  .ml-ico:hover{border-color:#7FBCE3;box-shadow:0 0 16px rgba(95,168,214,.45);transform:translateY(-2px)}
  .ml-ico svg{width:26px;height:26px;fill:none;stroke:currentColor;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round}
  .ml-modal-wrap{position:absolute;inset:0;z-index:9500;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,.65)}
  .ml-modal-wrap.show{display:flex}
  .ml-modal{width:min(1000px,92%);max-height:88%;display:flex;flex-direction:column;background:#1C2228;border:1px solid #3A4451;
    border-radius:14px;box-shadow:0 20px 60px rgba(0,0,0,.6);overflow:hidden;color:#EDEFF1;font-family:Arial,Helvetica,sans-serif}
  .ml-modal-head{display:flex;align-items:center;justify-content:space-between;padding:14px 22px;background:#262D35;border-bottom:2px solid #3A4451}
  .ml-modal-head b{font-size:20px;letter-spacing:.06em;text-transform:uppercase;color:#7FBCE3}
  .ml-modal-x{background:none;border:1px solid #6B747F;color:#EDEFF1;width:34px;height:34px;border-radius:50%;font-size:18px;cursor:pointer}
  .ml-modal-x:hover{border-color:#7FBCE3;color:#7FBCE3}
  .ml-modal-body{overflow:auto;padding:20px 26px;font-size:19px;line-height:1.6;color:#BAC7D5}
  .ml-modal-body h3{color:#7FBCE3;font-size:20px;margin:14px 0 6px;border-left:4px solid #5FA8D6;padding-left:10px}
  .ml-modal-body ul,.ml-modal-body ol{margin-left:1.3em}
  .ml-modal-body .dev-wrap{padding:0;overflow:visible}
  `;

  const registry = {};
  const loaded = {};
  const READY = ['viskositas', 'hidrostatis', 'pascal', 'archimedes'];
  let menuEl, modEl, barTitle, bodyEl, modalEl, tabsEl;

  const INFO_HTML =
    '<h3>Tentang Lab Maya</h3><p>Laboratorium virtual Fisika Fase F pada topik <b>Fluida Statis</b>. Siswa melakukan eksperimen, mencatat data, dan menganalisisnya secara mandiri.</p>' +
    '<h3>Materi</h3><ol>' + MATERI.map(function (m) { return '<li><b>' + m.judul + '</b> &ndash; ' + m.ket + '</li>'; }).join('') + '</ol>' +
    '<h3>Alur Belajar</h3><ul><li>Teori &rarr; Prosedur &rarr; Simulasi &rarr; LKPD</li><li>Gunakan ikon rumah di bilah atas untuk kembali ke menu ini.</li></ul>' +
    '<h3>Catatan</h3><p>Saat ini materi <b>Viskositas</b>, <b>Tekanan Hidrostatis</b>, <b>Hukum Pascal</b>, dan <b>Hukum Archimedes</b> sudah tersedia; materi lain sedang disiapkan.</p>';

  function stage() { return document.getElementById('stage') || document.body; }

  function build() {
    if (menuEl) return;
    const st = document.createElement('style');
    st.textContent = CSS;
    document.head.appendChild(st);

    menuEl = document.createElement('div');
    menuEl.className = 'ml-overlay';
    menuEl.id = 'materiMenu';
    menuEl.innerHTML =
      '<div class="ml-tools">' +
      '<button type="button" class="ml-ico" id="mlInfo" title="Informasi Materi" aria-label="Informasi Materi"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 11v6"/><path d="M12 7.5h.01"/></svg></button>' +
      '<button type="button" class="ml-ico" id="mlDev" title="Profil Pengembang" aria-label="Profil Pengembang"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/></svg></button></div>' +
      '<div class="ml-head"><h1>LAB MAYA FLUIDA STATIS</h1><p>Pilih materi untuk memulai eksperimen virtual</p></div>' +
      '<div class="ml-grid">' + MATERI.map((m, i) =>
        '<button type="button" class="ml-card" data-id="' + m.id + '" style="animation-delay:' + (0.08 * i + 0.1) + 's">' +
        '<span class="no">' + String(m.no).padStart(2, '0') + '</span>' +
        '<svg viewBox="0 0 24 24">' + m.ikon + '</svg>' +
        '<span class="jd">' + m.judul + '</span><span class="kt">' + m.ket + '</span>' +
        '<span class="tag' + (READY.indexOf(m.id) >= 0 ? '' : ' soon') + '">' + (READY.indexOf(m.id) >= 0 ? 'Tersedia' : 'Segera hadir') + '</span></button>'
      ).join('') + '</div>';
    stage().appendChild(menuEl);

    modEl = document.createElement('div');
    modEl.className = 'ml-overlay';
    modEl.id = 'materiModul';
    modEl.innerHTML = '<nav class="topnav">' +
      '<div class="brand">' +
        '<div class="brand-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22a8 8 0 0 0 8-8c0-3.5-3-7.5-8-12-5 4.5-8 8.5-8 12a8 8 0 0 0 8 8z"/></svg></div>' +
        '<div class="brand-text"><div class="brand-title" id="mlBarTitle"></div><div class="brand-sub">Fisika Fase F</div></div>' +
      '</div>' +
      '<button type="button" class="nav-tab" id="mlBack" title="Kembali ke Menu Materi" aria-label="Menu Materi" style="display:flex;align-items:center;padding:.45em .7em;"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/></svg></button>' +
      '<div class="vol-control">' +
        '<button class="vol-btn" id="mlMuteBtn" title="Mute/Unmute">&#128266;</button>' +
        '<input type="range" class="vol-slider" id="mlVolSlider" min="0" max="100" value="40" title="Volume">' +
      '</div>' +
      '<div class="nav-tabs" id="mlTabs"></div>' +
    '</nav>' +
    '<div class="ml-body" id="mlBody"></div>';
    stage().appendChild(modEl);
    barTitle = modEl.querySelector('#mlBarTitle');
    bodyEl = modEl.querySelector('#mlBody');
    tabsEl = modEl.querySelector('#mlTabs');
    modEl.querySelector('#mlBack').addEventListener('click', openMenu);

    const mlMuteBtn = modEl.querySelector('#mlMuteBtn');
    const mlVolSlider = modEl.querySelector('#mlVolSlider');
    function syncVol() {
      const isMuted = window.isMuted || false;
      const vol = typeof window.masterVolume === 'number' ? window.masterVolume : 0.4;
      if (mlMuteBtn) mlMuteBtn.innerHTML = isMuted ? '&#128263;' : '&#128266;';
      if (mlVolSlider) mlVolSlider.value = isMuted ? 0 : Math.round(vol * 100);
    }
    if (mlMuteBtn) {
      mlMuteBtn.addEventListener('click', function () {
        window.isMuted = !window.isMuted;
        if (typeof updateAudioVolume === 'function') updateAudioVolume();
        syncVol();
      });
    }
    if (mlVolSlider) {
      mlVolSlider.addEventListener('input', function (e) {
        window.masterVolume = e.target.value / 100;
        if (window.masterVolume > 0) window.isMuted = false;
        if (typeof updateAudioVolume === 'function') updateAudioVolume();
        syncVol();
      });
    }

    menuEl.addEventListener('click', function (e) {
      const c = e.target.closest('.ml-card');
      if (c) return openMateri(c.dataset.id);
      if (e.target.closest('#mlInfo')) return openModal('Informasi Materi', INFO_HTML);
      if (e.target.closest('#mlDev')) {
        const src = document.querySelector('#view-pengembang .menu-frame');
        openModal('Profil Pengembang', src ? '<div class="dev-wrap">' + src.querySelector('.dev-wrap').innerHTML + '</div>' : 'Profil belum tersedia.');
      }
    });

    modalEl = document.createElement('div');
    modalEl.className = 'ml-modal-wrap';
    modalEl.innerHTML = '<div class="ml-modal"><div class="ml-modal-head"><b id="mlModalTitle"></b>' +
      '<button type="button" class="ml-modal-x" aria-label="Tutup">&times;</button></div><div class="ml-modal-body" id="mlModalBody"></div></div>';
    stage().appendChild(modalEl);
    modalEl.addEventListener('click', function (e) {
      if (e.target === modalEl || e.target.closest('.ml-modal-x')) modalEl.classList.remove('show');
    });
  }

  function openModal(title, html) {
    modalEl.querySelector('#mlModalTitle').textContent = title;
    modalEl.querySelector('#mlModalBody').innerHTML = html;
    modalEl.classList.add('show');
  }

  function show(el) {
    el.classList.add('show');
    requestAnimationFrame(function () { requestAnimationFrame(function () { el.classList.add('vis'); }); });
  }
  function hide(el) { el.classList.remove('vis', 'show'); }

  function openMenu() {
    build();
    hide(modEl);
    bodyEl.innerHTML = '';
    show(menuEl);
  }

  function openMateri(id) {
    const m = MATERI.find(function (x) { return x.id === id; });
    if (!m) return;
    if (id === 'viskositas') {            // aplikasi existing di index.html
      hide(menuEl);
      if (typeof switchView === 'function') switchView('teori');
      return;
    }
    barTitle.textContent = m.judul;
    bodyEl.innerHTML = '';
    tabsEl.innerHTML = '';
    hide(menuEl);
    show(modEl);
    const syncBtn = modEl.querySelector('#mlMuteBtn');
    const syncSld = modEl.querySelector('#mlVolSlider');
    if (syncBtn) syncBtn.innerHTML = window.isMuted ? '&#128263;' : '&#128266;';
    if (syncSld) syncSld.value = window.isMuted ? 0 : Math.round((window.masterVolume || 0.4) * 100);

    const run = function () { registry[id].render(bodyEl, api(m)); };
    if (registry[id]) return run();
    if (loaded[id]) return;
    loaded[id] = true;
    const s = document.createElement('script');
    s.src = 'asset/js/modul/' + id + '.js';
    s.onload = run;
    s.onerror = function () { loaded[id] = false; bodyEl.textContent = 'Gagal memuat modul: ' + id; };
    document.head.appendChild(s);
  }

  function api(m) {
    return {
      materi: m,
      tabsEl: tabsEl,
      setTabs: function (tabList, onTabChange) {
        tabsEl.innerHTML = tabList.map(function (s, i) {
          const parts = s.split(':');
          const key = parts[0], label = parts[1] || parts[0];
          return '<button class="nav-tab' + (i === 0 ? ' active' : '') + '" data-tab="' + key + '" type="button">' + label + '</button>';
        }).join('');

        tabsEl.onclick = function (e) {
          const btn = e.target.closest('.nav-tab');
          if (btn) {
            tabsEl.querySelectorAll('.nav-tab').forEach(function (x) { x.classList.remove('active'); });
            btn.classList.add('active');
            if (typeof onTabChange === 'function') onTabChange(btn.dataset.tab);
          }
        };

        return {
          setActive: function (key) {
            tabsEl.querySelectorAll('.nav-tab').forEach(function (x) {
              x.classList.toggle('active', x.dataset.tab === key);
            });
          }
        };
      },
      /* halaman placeholder dengan daftar sub-menu rencana */
      placeholder: function (container, deskripsi, subMenu) {
        tabsEl.innerHTML = (subMenu || []).map(function (s, i) {
          return '<button class="nav-tab' + (i === 0 ? ' active' : '') + '" type="button">' + s + '</button>';
        }).join('');
        container.innerHTML = '<div class="ml-ph"><div class="ml-ph-card"><h2>' + m.judul + '</h2><p>' + deskripsi +
          '</p><ul>' + subMenu.map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ul></div></div>';
      }
    };
  }

  window.MateriLab = {
    openMenu: openMenu,
    open: openMateri,
    register: function (id, mod) { registry[id] = mod; }
  };
})();
