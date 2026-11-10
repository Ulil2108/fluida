/* ============================================================
   MODUL HUKUM ARCHIMEDES
   Tab: Teori · Prosedur · Simulasi (Gaya Apung & Bejana Pancur) · LKPD
   Prinsip Archimedes: Fa = ρf · g · Vbf = Wu - Wsemu
   ============================================================ */
MateriLab.register('archimedes', {
  render: function (c, api) {
    if (!document.getElementById('arStyle')) {
      const st = document.createElement('style'); st.id = 'arStyle'; st.textContent = `
      .ar{position:absolute;inset:0;display:flex;flex-direction:column;color:#EDEFF1;font-family:'Inter',-apple-system,BlinkMacSystemFont,'SF Pro Display',sans-serif;background:#1C2228}
      .ar-pane{flex:1;min-height:0;display:none;padding:16px 24px;overflow:hidden;position:relative}
      .ar-pane.on{display:flex;flex-direction:column;gap:12px}
      .ar-card{background:rgba(255,255,255,0.04);backdrop-filter:blur(8px);border:1px solid rgba(63,214,255,0.22);border-left:4px solid #3FD6FF;border-radius:12px;padding:12px 16px;text-align:justify;position:relative;display:flex;flex-direction:column;gap:6px;box-shadow:0 6px 20px rgba(0,0,0,0.25);flex:1 1 0;min-height:0;overflow-y:auto;scrollbar-width:thin;scrollbar-color:rgba(63,214,255,0.22) transparent}
      .ar-card::-webkit-scrollbar{width:4px}
      .ar-card::-webkit-scrollbar-track{background:transparent}
      .ar-card::-webkit-scrollbar-thumb{background:rgba(63,214,255,0.22);border-radius:4px;transition:background 0.3s}
      .ar-card:hover::-webkit-scrollbar-thumb{background:rgba(63,214,255,0.45)}
      .ar-card::-webkit-scrollbar-thumb:hover{background:rgba(63,214,255,0.75)}
      .ar-h{font-size:18px;font-weight:700;color:#3FD6FF;border-left:4px solid #1E90FF;padding-left:10px;margin-bottom:4px;text-transform:uppercase;text-align:left;letter-spacing:0.05em;flex-shrink:0}
      .ar-t{font-size:18px;line-height:1.6;color:#EDEFF1;text-align:justify}.ar-t b{color:#3FD6FF;font-weight:700}
      .ar-formula{font-family:'Courier New',monospace;font-size:24px;font-weight:800;color:#3FD6FF;text-align:center;padding:12px 16px;background:rgba(0,0,0,0.5);border:1px dashed rgba(63,214,255,0.4);border-radius:12px;letter-spacing:.06em;text-shadow:0 0 8px rgba(63,214,255,0.4);flex-shrink:0}
      
      /* TEORI & TIMELINE */
      .ar-teori-wrap{display:flex;flex-direction:column;flex:1;min-height:0;gap:10px}
      .ar-teori-hdr{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(63,214,255,0.25);padding-bottom:10px;flex-shrink:0;position:relative}
      .ar-teori-hdr::after{content:'';position:absolute;bottom:-1px;left:0;width:100px;height:2px;background:#3FD6FF;box-shadow:0 0 10px #3FD6FF}
      .ar-teori-tit{font-size:26px;font-weight:800;color:#3FD6FF;letter-spacing:0.06em;text-transform:uppercase;display:flex;align-items:center;gap:12px;text-shadow:0 0 15px rgba(63,214,255,0.4)}
      .ar-badge-num{background:rgba(63,214,255,0.15);padding:4px 12px;border-radius:8px;border:1px solid rgba(63,214,255,0.35);color:#3FD6FF;font-size:22px;font-weight:800}
      .ar-tl{display:flex;align-items:center;gap:0.5em;font-family:'Courier New',monospace;font-size:18px;font-weight:800;color:rgba(255,255,255,0.3);user-select:none}
      .ar-tl-step{cursor:pointer;display:flex;align-items:center;gap:0.4em;transition:0.25s;padding:2px 4px;border-radius:4px}
      .ar-tl-step:hover{color:#fff}
      .ar-tl-step:not(:last-child)::after{content:'──';opacity:0.35;pointer-events:none}
      .ar-tl-step.active{color:#3FD6FF;text-shadow:0 0 10px #3FD6FF}
      .ar-tl-step.done{color:#3DDC84}
      .ar-tl-step.active:not(:last-child)::after{color:#3FD6FF;opacity:0.9;text-shadow:0 0 10px #3FD6FF}
      
      /* PROGRESS BAR TRACK */
      .ar-p-track{width:100%;height:6px;background:rgba(255,255,255,0.12);border-radius:4px;overflow:hidden;flex-shrink:0;margin:6px 0 10px 0}
      .ar-p-bar{height:100%;width:14.28%;background:linear-gradient(90deg,#3FD6FF,#3DDC84);box-shadow:0 0 12px rgba(61,220,132,0.85);border-radius:4px;transition:width 0.35s ease}
      
      .ar-slide{display:none;flex:1;min-height:0;gap:16px}
      .ar-slide.on{display:flex}
      .ar-col{flex:1;display:flex;flex-direction:column;gap:10px;min-width:0;min-height:0;overflow:hidden;padding-right:0}
      
      .ar-fig{flex:0 0 380px;background:#0D1520;border:1px solid #3A4451;border-radius:12px;overflow-y:auto;display:flex;align-items:center;justify-content:center;scrollbar-width:thin;scrollbar-color:rgba(63,214,255,0.2) transparent}
      .ar-fig::-webkit-scrollbar{width:4px}
      .ar-fig::-webkit-scrollbar-track{background:transparent}
      .ar-fig::-webkit-scrollbar-thumb{background:rgba(63,214,255,0.2);border-radius:4px;transition:background 0.3s}
      .ar-fig:hover::-webkit-scrollbar-thumb{background:rgba(63,214,255,0.45)}
      
      /* FOOTER NAV */
      .ar-nav{flex:0 0 auto;display:flex;justify-content:space-between;align-items:center;padding-top:14px;border-top:1px solid rgba(255,255,255,0.05)}
      .btn-nav-outline{display:flex;align-items:center;gap:8px;padding:0.8em 1.8em;background:transparent;border:1px solid #6B747F;border-radius:30px;color:#EDEFF1;font-size:17px;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;transition:all 0.3s ease;cursor:pointer;font-family:inherit}
      .btn-nav-outline:hover:not(:disabled){border-color:#3FD6FF;color:#3FD6FF;transform:translateX(-4px)}
      .btn-nav-outline:disabled{opacity:0.3;cursor:not-allowed}
      .btn-nav-solid{display:flex;align-items:center;gap:8px;background:#3FD6FF;border:none;border-radius:30px;color:#04111d;font-size:17px;font-weight:800;letter-spacing:0.05em;padding:0.8em 1.8em;cursor:pointer;text-transform:uppercase;transition:all 0.3s ease;box-shadow:0 0 20px rgba(63,214,255,0.4);font-family:inherit}
      .btn-nav-solid:hover:not(:disabled){box-shadow:0 0 30px rgba(63,214,255,0.6);transform:translateX(4px);background:#fff}
      .btn-nav-solid.done{background:#3DDC84;color:#0f172a;box-shadow:0 0 20px rgba(61,220,132,0.4)}
      .btn-nav-solid.done:hover{box-shadow:0 0 30px rgba(61,220,132,0.6);background:#4aff98;color:#04111d}
      .btn-nav-outline svg,.btn-nav-solid svg{width:16px;height:16px;stroke-width:2.5px;fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round}
      .ar-cnt{color:#3FD6FF;font-weight:800;font-size:16px;letter-spacing:2px;font-family:'Courier New',monospace;background:rgba(63,214,255,0.1);padding:6px 16px;border-radius:20px;border:1px solid rgba(63,214,255,0.25)}
      
      .ar-quiz{flex:0 0 auto !important;min-height:auto;max-height:165px;margin-top:auto;display:flex;flex-direction:column;gap:8px;background:rgba(63,214,255,0.06);padding:10px 14px;border:1px solid rgba(63,214,255,0.25);border-left:4px solid #3DDC84;border-radius:12px;overflow-y:auto;scrollbar-width:thin;scrollbar-color:rgba(61,220,132,0.18) transparent}
      .ar-quiz::-webkit-scrollbar{width:4px}
      .ar-quiz::-webkit-scrollbar-track{background:transparent}
      .ar-quiz::-webkit-scrollbar-thumb{background:rgba(61,220,132,0.18);border-radius:4px;transition:background 0.3s}
      .ar-qq{font-size:17px;font-weight:700;color:#EDEFF1;line-height:1.45;text-align:justify}
      .ar-qo{display:flex;gap:8px;flex-wrap:wrap}.ar-qo button{flex:1;min-width:140px;background:rgba(63,214,255,0.08);border:1px solid rgba(63,214,255,0.3);border-radius:8px;padding:8px 12px;color:#3FD6FF;font-family:inherit;font-size:16px;font-weight:600;cursor:pointer;transition:0.2s;text-align:center}
      .ar-qo button:hover:not(:disabled){background:rgba(63,214,255,0.2)}
      .ar-qo button.ok{background:#3DDC84 !important;border-color:#4aff98 !important;color:#04111d !important;font-weight:800;box-shadow:0 0 10px rgba(74,255,152,0.5)}
      .ar-qo button.no{background:rgba(255,152,0,0.2) !important;border-color:#F5C84B !important;color:#F5C84B !important}
      .ar-qf{font-size:16px;font-weight:600;min-height:20px;color:#BAC7D5;text-align:justify;line-height:1.45;padding-top:6px;border-top:1px dashed rgba(63,214,255,0.2)}
      .ar-steps{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:14px;flex:1;min-height:0}
      .ar-step{display:flex;flex-direction:column;gap:6px;overflow:hidden}
      .ar-step ul{margin-left:1.2em;font-size:17px;line-height:1.45;color:#D4DCE5;text-align:justify}.ar-step li{margin-bottom:3px}.ar-step b{color:#3FD6FF}
      
      /* SIMULASI 3 PANEL SEJAJAR */
      .ar-sim{flex:1 1 0;min-height:0;height:100%;display:grid;grid-template-columns:260px 1fr 290px;gap:12px;position:relative;align-items:stretch}
      .ar-panel-left{display:flex;flex-direction:column;gap:8px;min-height:0;height:100%;overflow-y:auto;scrollbar-width:thin;scrollbar-color:rgba(63,214,255,0.2) transparent;box-sizing:border-box}
      .ar-panel-left::-webkit-scrollbar{width:4px}
      .ar-panel-left::-webkit-scrollbar-track{background:transparent}
      .ar-panel-left::-webkit-scrollbar-thumb{background:rgba(63,214,255,0.2);border-radius:4px}
      
      .ar-panel-mid{display:flex;flex-direction:column;min-height:0;height:100%;position:relative;box-sizing:border-box}
      .ar-cv{width:100%;height:100%;min-height:0;background:#0D1520;border:1px solid #3A4451;border-radius:12px;touch-action:none;cursor:default;display:block}
      
      .ar-panel-right{display:flex;flex-direction:column;gap:8px;min-height:0;height:100%;overflow-y:auto;scrollbar-width:thin;scrollbar-color:rgba(63,214,255,0.2) transparent;box-sizing:border-box}
      .ar-panel-right::-webkit-scrollbar{width:4px}
      .ar-panel-right::-webkit-scrollbar-track{background:transparent}
      .ar-panel-right::-webkit-scrollbar-thumb{background:rgba(63,214,255,0.2);border-radius:4px}
      
      .ar-panel-left .ar-card, .ar-panel-right .ar-card{padding:10px 12px}
      .ar-panel-left .ar-h, .ar-panel-right .ar-h{font-size:14px;margin-bottom:6px;border-left:3px solid #3FD6FF;padding-left:8px}
      
      .ar-card-alat{flex:0 0 auto}
      .ar-card-benda{flex:1 1 0;min-height:0;display:flex;flex-direction:column}
      .ar-card-benda .ar-benda-grid{flex:1;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:repeat(3,1fr);gap:6px}
      .ar-card-cairan{flex:0 0 auto}
      .ar-card-act{flex:0 0 auto}
      
      .ar-card-sensor{flex:0 0 auto}
      .ar-card-ukur{flex:1 1 0;min-height:0;display:flex;flex-direction:column;justify-content:space-between}
      .ar-inp-group{flex:1;display:flex;flex-direction:column;justify-content:space-evenly;gap:4px;margin:2px 0}
      
      .ar-chk{display:flex;gap:10px;flex-wrap:wrap;font-size:14px;color:#D4DCE5}
      .ar-chk label{display:flex;gap:5px;align-items:center;cursor:pointer}
      
      .ar-benda-grid button{background:#1C2228;border:1.5px solid #3A4451;border-radius:8px;padding:6px 4px;color:#EDEFF1;font-family:inherit;font-size:13px;font-weight:600;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;transition:all 0.2s;text-align:center;height:100%}
      .ar-benda-grid button:hover{border-color:#3FD6FF;background:rgba(63,214,255,0.1)}
      .ar-benda-grid button.on{border-color:#3FD6FF;background:rgba(63,214,255,0.22);box-shadow:0 0 10px rgba(63,214,255,0.4);color:#fff;font-weight:700}
      .ar-benda-grid button .b-icon{font-size:20px}
      .ar-benda-grid button .b-name{font-size:12px;line-height:1.2}
      
      .ar-mode-btns{display:flex;flex-direction:column;gap:6px;margin-top:6px}
      .ar-mode-btns button{background:#151A20;border:1.5px solid #3A4451;border-radius:8px;padding:8px 10px;color:#EDEFF1;font-family:inherit;font-size:13px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:flex-start;gap:8px;transition:0.2s;text-align:left}
      .ar-mode-btns button:hover{border-color:#3FD6FF;background:rgba(63,214,255,0.1)}
      .ar-mode-btns button.on{border-color:#3FD6FF;background:rgba(63,214,255,0.22);color:#3FD6FF;box-shadow:0 0 10px rgba(63,214,255,0.35)}
      .ar-mode-btns button.lepas{border-color:#3DDC84}
      .ar-mode-btns button.lepas.on{background:rgba(61,220,132,0.22);color:#3DDC84;box-shadow:0 0 10px rgba(61,220,132,0.4)}
      .ar-cairan-sel{display:flex;align-items:center;gap:8px;margin-top:4px}
      .ar-cairan-sel select{flex:1;background:#151A20;border:1px solid #3A4451;border-radius:6px;color:#3FD6FF;font-size:14px;font-weight:bold;padding:6px 8px;outline:none;font-family:inherit}
      
      .ar-slider-wrap{display:flex;flex-direction:column;gap:4px;margin-top:6px}
      .ar-slider-wrap span{font-size:12px;color:#BAC7D5;display:flex;justify-content:space-between}
      .ar-slider-wrap input[type=range]{accent-color:#3FD6FF;width:100%;cursor:pointer}
      
      .ar-act{display:flex;gap:6px}
      .ar-act button{flex:1;border:none;border-radius:8px;padding:9px 4px;font-family:inherit;font-weight:800;font-size:13px;cursor:pointer;text-transform:uppercase;color:#d8ffe9;background:linear-gradient(135deg,#1d8f4f,#0f5c33);transition:0.2s}
      .ar-act button:hover:not(:disabled){transform:translateY(-1px);filter:brightness(1.1)}
      .ar-act button.r{background:linear-gradient(135deg,#7a1d1d,#5c1414);color:#ffd6d6}
      .ar-act button:disabled{background:#1c2c38;color:#5d7488;cursor:not-allowed}
      
      .ar-sensor-box{font-size:13px;line-height:1.55;color:#BAC7D5;text-align:left}
      .ar-sensor-box b{color:#3FD6FF;font-size:15px}
      
      .ar-inp-item{display:flex;flex-direction:column;gap:2px;margin-bottom:4px}
      .ar-inp-item label{font-size:12px;color:#BAC7D5;font-weight:600}
      .ar-inp-wrap{display:flex;align-items:center;background:#151A20;border:1px solid #3A4451;border-radius:6px;padding:0 8px}
      .ar-inp-wrap:focus-within{border-color:#3FD6FF;box-shadow:0 0 6px rgba(63,214,255,0.3)}
      .ar-inp-wrap input{flex:1;background:transparent;border:none;color:#fff;font-size:15px;font-weight:bold;padding:6px 2px;outline:none;font-family:inherit}
      .ar-inp-wrap .ar-unit{font-size:12px;color:#3FD6FF;font-weight:600;margin-left:4px}
      
      .btn-record-lkpd{width:100%;margin-top:4px;background:linear-gradient(135deg,#1d8f4f,#0f5c33);border:1px solid #3DDC84;color:#EDEFF1;border-radius:8px;padding:9px 8px;font-family:inherit;font-weight:bold;font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;box-shadow:0 3px 6px rgba(0,0,0,0.3);transition:0.2s}
      .btn-record-lkpd:hover{background:linear-gradient(135deg,#27ae60,#147a40);box-shadow:0 0 12px rgba(61,220,132,0.5)}
      
      /* LKPD */
      #arLkpd{padding:0 !important;display:none}
      #arLkpd.on{display:flex;flex-direction:column;padding:0 !important}
      .tbl-lkpd-ar { width:100%; border-collapse:collapse; text-align:center; font-size:16px; color:#EDEFF1; background:#1C2228; }
      .tbl-lkpd-ar th { padding:8px 4px; border-right:1px solid #3A4451; font-size:15px; line-height:1.3; font-weight:600; letter-spacing:0.5px; vertical-align:middle; }
      .tbl-lkpd-ar td { padding:5px 4px; border-left:1px solid #3A4451; border-top:1px solid #3A4451; height:44px; }
      .tbl-lkpd-ar tbody tr:nth-child(odd) { background:rgba(255,255,255,0.03); }
      .tbl-lkpd-ar sub { font-size:12px; }
      .tbl-lkpd-ar .unit { font-size:12px; font-weight:normal; color:#A0B3C6; display:block; margin-top:2px; }
      .tbl-lkpd-ar input { width:100%; background:transparent; border:none; color:#EDEFF1; font-size:16px; text-align:center; font-family:inherit; outline:none; }
      .tbl-lkpd-ar input:focus { background:rgba(63,214,255,0.15); border-radius:4px; }
      .tbl-lkpd-ar td.correct { background:rgba(61,220,132,0.2) !important; color:#3DDC84 !important; font-weight:bold; }
      .tbl-lkpd-ar td.close { background:rgba(255,178,56,0.2) !important; color:#FFB238 !important; font-weight:bold; }
      .tbl-lkpd-ar td.wrong { background:rgba(224,108,117,0.2) !important; color:#E06C75 !important; font-weight:bold; }
      `;
      document.head.appendChild(st);
    }

    const tabCtrl = api.setTabs ? api.setTabs(['teori:Teori', 'prosedur:Prosedur', 'simulasi:Simulasi', 'lkpd:LKPD'], function (t) {
      tab(t, false);
    }) : null;

    c.innerHTML = '<div class="ar">' +
      '<div class="ar-pane on" id="arTeori"></div>' +
      '<div class="ar-pane" id="arProsedur"></div>' +
      '<div class="ar-pane" id="arSimulasi"></div>' +
      '<div class="ar-pane" id="arLkpd"></div>' +
    '</div>';

    const $ = function (id) { return c.querySelector('#' + id); };
    let simActive = false;
    var sim = null;
    function tab(t, updateNav) {
      if (updateNav !== false && tabCtrl) tabCtrl.setActive(t);
      c.querySelectorAll('.ar-pane').forEach(function (p) { p.classList.remove('on'); });
      const pane = $('ar' + t[0].toUpperCase() + t.slice(1));
      if (pane) pane.classList.add('on');
      simActive = (t === 'simulasi');
      if (simActive) {
        if (sim && sim.start) sim.start();
      } else {
        if (sim && sim.stop) sim.stop();
      }
    }

    /* ================= TEORI ================= */
    function phImg(fileName, title, desc) {
      return '<div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;background:#0D1520;overflow:hidden;">' +
        '<img src="asset/img/' + fileName + '" alt="' + title + '" style="width:100%;height:100%;object-fit:contain;display:block;" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\';">' +
        '<div style="display:none;width:100%;height:100%;box-sizing:border-box;padding:20px;flex-direction:column;align-items:center;justify-content:center;gap:10px;border:1px dashed rgba(63,214,255,0.4);border-radius:12px;background:radial-gradient(circle at center, rgba(63,214,255,0.08) 0%, #0D1520 75%);text-align:center;">' +
          '<div style="width:52px;height:52px;border-radius:12px;background:rgba(63,214,255,0.12);border:1px solid rgba(63,214,255,0.3);display:flex;align-items:center;justify-content:center;color:#3FD6FF;font-size:26px;">⚓</div>' +
          '<div style="font-family:\'Courier New\',monospace;font-size:14px;font-weight:bold;color:#3FD6FF;letter-spacing:0.1em;text-transform:uppercase;">ILUSTRASI HUKUM ARCHIMEDES</div>' +
          '<div style="font-size:17px;font-weight:700;color:#EDEFF1;max-width:92%;line-height:1.35;">' + title + '</div>' +
          '<div style="font-size:15px;color:#BAC7D5;max-width:92%;line-height:1.4;">' + desc + '</div>' +
          '<div style="font-family:monospace;font-size:13px;color:#ffb238;background:#1C2228;padding:6px 12px;border-radius:6px;border:1px solid #3A4451;margin-top:4px;">asset/img/' + fileName + '</div>' +
          '<div style="font-size:12px;color:#3DDC84;margin-top:2px;">(Tambahkan file gambar ke folder asset)</div>' +
        '</div>' +
      '</div>';
    }

    const figs = [
      phImg('teori_archimedes_1.png', 'Gaya Berat & Berat Semu', 'Benda di udara terasa lebih berat daripada saat ditimbang di dalam air'),
      phImg('teori_archimedes_2.png', 'Prinsip Penemuan Archimedes', 'Gelas berpancur membuktikan berat air yang tumpah sama dengan gaya apung'),
      phImg('teori_archimedes_3.png', 'Rumus Matematis Gaya Apung (Fa = ρ·g·V)', 'Gaya ke atas yang dialami benda akibat selisih tekanan hidrostatis fluida'),
      phImg('teori_archimedes_4.png', 'Keadaan Terapung, Melayang, Tenggelam', 'Perbandingan massa jenis benda terhadap zat cair penentu posisi kesetimbangan'),
      phImg('teori_archimedes_5.png', 'Fraksi Volume Bagian Tercelup', 'Hukum Archimedes pada fenomena puncak gunung es (iceberg fraction)'),
      phImg('teori_archimedes_6.png', 'Pengaruh Massa Jenis Fluida', 'Perbandingan gaya apung pada air tawar, air laut, minyak, dan gliserin'),
      phImg('teori_archimedes_7.png', 'Aplikasi Teknologi: Kapal Laut & Submarine', 'Prinsip tangki balast kapal selam dan hidrometer pengukur densitas')
    ];

    const slides = [
      /* Slide 1 */
      [
        '01',
        'Gaya Berat & Berat Semu',
        '<div class="ar-card"><div class="ar-h">Fenomena Benda di Dalam Air</div><div class="ar-t">Pernahkah Anda merasa tubuh terasa jauh lebih ringan saat berenang di kolam air? Ketika suatu benda berada di udara, neraca pegas mengukur gaya berat sebenarnya (<b>Wᵤ = m·g</b>). Namun ketika benda dimasukkan ke dalam air, neraca pegas menunjukkan nilai yang lebih kecil (<b>Wₛₑₘᵤ</b>) karena zat cair memberikan dorongan ke atas.</div></div>' +
        '<div class="ar-card"><div class="ar-h">Formula Berat Semu</div><div class="ar-formula">W_semu = W_u - F_a</div><div class="ar-t" style="margin-top:8px"><b>W_semu</b> = Berat semu benda di dalam fluida (N) &nbsp;|&nbsp; <b>W_u</b> = Berat benda di udara (N) &nbsp;|&nbsp; <b>F_a</b> = Gaya ke atas / gaya apung (N)</div></div>' +
        quizHTML('Kuis: Sebuah batu memiliki berat 50 N di udara. Saat ditimbang di dalam air, beratnya terbaca 35 N. Berapakah besar gaya apung yang diberikan air?', [
          ['15 N', 1, 'Benar! F_a = W_u - W_semu = 50 N - 35 N = 15 N.'],
          ['35 N', 0, 'Salah. 35 N adalah berat semu batu di dalam air.'],
          ['85 N', 0, 'Salah. Gaya apung mengurangi berat benda, bukan menjumlahkannya.']
        ])
      ],

      /* Slide 2 */
      [
        '02',
        'Bunyi Hukum Archimedes',
        '<div class="ar-card"><div class="ar-h">Sejarah Eureka Archimedes (287–212 SM)</div><div class="ar-t"><i>"Suatu benda yang dicelupkan sebagian atau seluruhnya ke dalam zat cair akan mengalami gaya apung ke atas yang besarnya sama dengan berat zat cair yang dipindahkan oleh benda tersebut."</i> Archimedes menemukan prinsip ini saat mengamati luapan air bak mandi ketika tubuhnya masuk.</div></div>' +
        '<div class="ar-card"><div class="ar-h">Kesetaraan dengan Berat Fluida Tumpah</div><div class="ar-formula">F_a = W_fluida_tumpah = m_f &middot; g</div><div class="ar-t" style="margin-top:8px">Volume zat cair yang tumpah atau terdesak (V_f) selalu persis sama dengan volume bagian benda yang tercelup ke dalam zat cair (V_bf).</div></div>' +
        quizHTML('Kuis: Sebuah balok dimasukkan ke bejana berpancur dan menumpahkan 2 kg air. Berapakah gaya apung yang dialami balok? (g = 9,8 m/s²)', [
          ['2,0 N', 0, 'Salah. 2 kg adalah massa air; kalikan dengan percepatan gravitasi (W = m·g).'],
          ['19,6 N', 1, 'Benar! F_a = m_air × g = 2 kg × 9,8 m/s² = 19,6 N.'],
          ['9,8 N', 0, 'Salah. F_a = 2 × 9,8 = 19,6 N.']
        ])
      ],

      /* Slide 3 */
      [
        '03',
        'Persamaan Gaya Apung (Fa)',
        '<div class="ar-card"><div class="ar-h">Penurunan Matematis Gaya Apung</div><div class="ar-t">Karena massa zat cair yang dipindahkan adalah <b>m_f = &rho;_f &middot; V_bf</b>, maka berat zat cair yang dipindahkan dapat dirumuskan secara langsung dengan mengalikan massa jenis fluida, gravitasi, dan volume benda yang tercelup.</div></div>' +
        '<div class="ar-card"><div class="ar-h">Rumus Utama Gaya Apung</div><div class="ar-formula">F_a = &rho;_f &middot; g &middot; V_bf</div><div class="ar-t" style="margin-top:8px"><b>F_a</b> = Gaya apung (N) &nbsp;|&nbsp; <b>&rho;_f</b> = Massa jenis fluida (kg/m³) &nbsp;|&nbsp; <b>g</b> = Percepatan gravitasi (m/s²) &nbsp;|&nbsp; <b>V_bf</b> = Volume benda yang tercelup (m³).</div></div>' +
        quizHTML('Kuis: Faktor manakah berikut ini yang TIDAK memengaruhi besar gaya apung Archimedes pada benda yang tercelup penuh?', [
          ['Massa jenis zat cair (ρ_f)', 0, 'Salah. Massa jenis fluida berpengaruh langsung secara linier.'],
          ['Kedalaman posisi benda di dasar kolam', 1, 'Benar! Gaya apung murni bergantung pada volume tercelup V_bf dan ρ_f, bukan pada kedalamannya.'],
          ['Volume benda yang tercelup (V_bf)', 0, 'Salah. Semakin besar volume yang tercelup, semakin besar gaya apungnya.']
        ])
      ],

      /* Slide 4 */
      [
        '04',
        'Terapung, Melayang, Tenggelam',
        '<div class="ar-card"><div class="ar-h">Tiga Keadaan Posisi Benda</div><div class="ar-t">Kondisi benda di dalam zat cair ditentukan oleh perbandingan massa jenis rata-rata benda (<b>&rho;_b</b>) terhadap massa jenis zat cair (<b>&rho;_f</b>):<br>' +
        '1. <b>Terapung</b>: &rho;_b < &rho;_f &nbsp;&rarr;&nbsp; Benda muncul sebagian di permukaan, F_a = W.<br>' +
        '2. <b>Melayang</b>: &rho;_b = &rho;_f &nbsp;&rarr;&nbsp; Seluruh benda tercelup di dalam cairan tetapi tidak menyentuh dasar, F_a = W.<br>' +
        '3. <b>Tenggelam</b>: &rho;_b > &rho;_f &nbsp;&rarr;&nbsp; Benda jatuh hingga ke dasar wadah, F_a < W.</div></div>' +
        '<div class="ar-card"><div class="ar-h">Kesetimbangan Gaya Vertikal</div><div class="ar-formula">&Sigma;F_y = F_a - W</div><div class="ar-t" style="margin-top:8px">Jika F_a > W saat dicelup penuh, timbul percepatan ke atas hingga benda menyembul dan mencapai kesetimbangan F_a = W.</div></div>' +
        quizHTML('Kuis: Balok kayu (&rho; = 700 kg/m³) dimasukkan ke dalam air murni (&rho; = 1.000 kg/m³). Keadaan balok tersebut adalah…', [
          ['Tenggelam ke dasar bejana', 0, 'Salah. Karena massa jenis kayu lebih kecil dari air, balok tidak akan tenggelam.'],
          ['Terapung dengan sebagian muncul di atas air', 1, 'Benar! Karena ρ_b (700) < ρ_f (1.000), maka balok akan terapung seimbang.'],
          ['Melayang tepat di tengah air', 0, 'Salah. Melayang hanya terjadi bila ρ_b persis sama dengan ρ_f.']
        ])
      ],

      /* Slide 5 */
      [
        '05',
        'Fraksi Benda Tercelup & Peran Penggaris',
        '<div class="ar-card"><div class="ar-h">Rasio Volume & Tinggi Bagian Terendam</div><div class="ar-t">Pada kondisi terapung seimbang, gaya berat total benda diimbangi oleh gaya apung: <b>W = F_a &nbsp;&rArr;&nbsp; &rho;_b &middot; V_b &middot; g = &rho;_f &middot; V_bf &middot; g</b>. Untuk balok dengan luas penampang konstan (A), volume sebanding dengan tinggi: <b>V = A &middot; h</b>.</div></div>' +
        '<div class="ar-card"><div class="ar-h">Fungsi Penggaris Pada Pengamatan Apung</div><div class="ar-formula">h_celup / h_total = V_bf / V_b = &rho;_b / &rho;_f</div><div class="ar-t" style="margin-top:8px">Dengan menggunakan <b>Penggaris</b>, kita dapat mengukur tinggi bagian yang terbenam (<b>h_celup</b>) dan tinggi total balok (<b>h_total</b>). Rasio tinggi terendam membuktikan perbandingan massa jenis benda terhadap cairannya!</div></div>' +
        quizHTML('Kuis: Balok kayu setinggi 6 cm mengapung di air (&rho; = 1.000 kg/m³). Jika massa jenis kayu 600 kg/m³, berapakah tinggi bagian balok yang terendam di bawah air saat diukur dengan penggaris?', [
          ['2,4 cm', 0, 'Salah. 2,4 cm adalah tinggi bagian balok yang muncul di atas air.'],
          ['3,6 cm', 1, 'Benar! h_celup = h_total · (ρ_b / ρ_f) = 6 cm · (600 / 1.000) = 3,6 cm (terendam 60%).'],
          ['6,0 cm', 0, 'Salah. 6 cm berarti seluruh balok tenggelam ke bawah air.']
        ])
      ],

      /* Slide 6 */
      [
        '06',
        'Pengaruh Massa Jenis Fluida',
        '<div class="ar-card"><div class="ar-h">Cairan Berbeda, Gaya Apung Berbeda</div><div class="ar-t">Benda dengan volume sama akan mengalami gaya apung yang berbeda jika dimasukkan ke dalam zat cair yang berbeda massa jenisnya. Semakin rapat partikel fluida (densitas tinggi), semakin besar gaya dorong ke atas yang dihasilkan.</div></div>' +
        '<div class="ar-card"><div class="ar-h">Perbandingan Fluida Lab</div><div class="ar-t">1. <b>Minyak Goreng</b> (&rho; &asymp; 900 kg/m³): Memberikan gaya apung terkecil di antara fluida uji.<br>' +
        '2. <b>Air Murni</b> (&rho; = 1.000 kg/m³): Nilai standar rujukan praktikum fisika.<br>' +
        '3. <b>Air Garam / Laut</b> (&rho; &asymp; 1.150 kg/m³): Lebih mudah membuat benda mengapung.<br>' +
        '4. <b>Gliserin</b> (&rho; = 1.260 kg/m³): Cairan sangat padat dengan daya apung terbesar.</div></div>' +
        quizHTML('Kuis: Mengapa orang lebih mudah mengapung saat berenang di Laut Mati dibandingkan di kolam air tawar?', [
          ['Kadar garam tinggi meningkatkan massa jenis air laut sehingga gaya apungnya jauh lebih besar', 1, 'Benar! Densitas Laut Mati mencapai ~1.240 kg/m³, melebihi densitas rata-rata tubuh manusia.'],
          ['Air Laut Mati memiliki percepatan gravitasi lebih kecil', 0, 'Salah. Gravitasi bumi di permukaan laut nilainya seragam.'],
          ['Suhu air Laut Mati memperkecil volume tubuh manusia', 0, 'Salah. Suhu air tidak mengubah volume tubuh secara signifikan.']
        ])
      ],

      /* Slide 7 */
      [
        '07',
        'Aplikasi Hukum Archimedes',
        '<div class="ar-card"><div class="ar-h">Teknologi Maritim & Dirgantara</div><div class="ar-t">1. <b>Kapal Laut Baja</b>: Meskipun baja memiliki massa jenis 7.800 kg/m³, lambung kapal dibuat berongga besar berisi udara sehingga massa jenis rata-rata kapal jauh lebih kecil dari air laut.<br>' +
        '2. <b>Kapal Selam</b>: Memiliki tangki balast (*ballast tank*). Mengisi tangki dengan air membuat kapal menyelam, dan meniupkan udara kompresi untuk mengosongkan tangki membuat kapal naik ke permukaan.</div></div>' +
        '<div class="ar-card"><div class="ar-h">Instrumen Sains & Kehidupan</div><div class="ar-t">3. <b>Hidrometer</b>: Alat pengukur massa jenis zat cair berdasarkan kedalaman tabung berskala yang mengapung tegak lurus.<br>' +
        '4. <b>Balon Udara Panas</b>: Udara panas di dalam balon memuai dan memiliki kerapatan lebih rendah dibanding udara dingin di sekitarnya sehingga balon terangkat.</div></div>' +
        quizHTML('Kuis: Bagaimanakah cara kapal selam mengatur posisinya agar dapat mengapung kembali ke permukaan laut?', [
          ['Membuang muatan kargo ke laut', 0, 'Salah. Kapal selam tidak membuang kargo untuk manuver naik.'],
          ['Memompa udara bertekanan ke tangki balast untuk mengeluarkan air laut', 1, 'Benar! Mengganti air dengan udara menurunkan massa jenis total kapal selam sehingga F_a > W.'],
          ['Menyalakan mesin kapal dengan kecepatan maksimum ke arah atas', 0, 'Salah. Mekanisme utama daya apung diatur oleh volume air di tangki balast.']
        ])
      ]
    ];

    function quizHTML(q, opts) {
      return '<div class="ar-card ar-quiz"><div class="ar-qq">' + q + '</div><div class="ar-qo">' + opts.map(function (o) {
        return '<button data-ok="' + o[1] + '" data-msg="' + o[2].replace(/"/g, '&quot;') + '">' + o[0] + '</button>';
      }).join('') + '</div><div class="ar-qf"></div></div>';
    }

    let cur = 0;

    /* Render Struktur Teori Lengkap */
    $('arTeori').innerHTML =
      '<div class="ar-teori-wrap">' +
        '<!-- Header -->' +
        '<div class="ar-teori-hdr">' +
          '<div class="ar-teori-tit" id="arTeoriTitle">' +
            '<span class="ar-badge-num">01</span> GAYA BERAT & BERAT SEMU' +
          '</div>' +
          '<div class="ar-tl" id="arTeoriTl">' +
            slides.map(function (s, i) {
              return '<div class="ar-tl-step' + (i === 0 ? ' active' : '') + '" data-step="' + i + '">' + s[0] + '</div>';
            }).join('') +
          '</div>' +
        '</div>' +
        '<!-- Progress Bar Track -->' +
        '<div class="ar-p-track"><div class="ar-p-bar" id="arTeoriPBar"></div></div>' +
        '<!-- Slides Container -->' +
        '<div style="flex:1;min-height:0;display:flex;position:relative">' +
          slides.map(function (s, i) {
            return '<div class="ar-slide' + (i === 0 ? ' on' : '') + '" id="arSlide_' + i + '" style="position:absolute;inset:0">' +
              '<div class="ar-col">' + s[2] + '</div>' +
              '<div class="ar-fig">' + figs[i] + '</div>' +
            '</div>';
          }).join('') +
        '</div>' +
        '<!-- Navigasi Bawah -->' +
        '<div class="ar-nav">' +
          '<button class="btn-nav-outline" id="arPrev" disabled><svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"></polyline></svg> Sebelumnya</button>' +
          '<div class="ar-cnt" id="arCnt">SLIDE 01 / 07</div>' +
          '<button class="btn-nav-solid" id="arNext">Selanjutnya <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg></button>' +
        '</div>' +
      '</div>';

    function showSlide(n) {
      cur = Math.max(0, Math.min(slides.length - 1, n));
      for (let i = 0; i < slides.length; i++) {
        const sl = $('arSlide_' + i);
        if (sl) sl.classList.toggle('on', i === cur);
      }
      const titEl = $('arTeoriTitle');
      if (titEl) {
        titEl.innerHTML = '<span class="ar-badge-num">' + slides[cur][0] + '</span> ' + slides[cur][1].toUpperCase();
      }
      const tlSteps = c.querySelectorAll('#arTeoriTl .ar-tl-step');
      tlSteps.forEach(function (stepEl, idx) {
        stepEl.classList.remove('active', 'done');
        if (idx === cur) stepEl.classList.add('active');
        else if (idx < cur) stepEl.classList.add('done');
      });
      const pBar = $('arTeoriPBar');
      if (pBar) {
        const pct = ((cur + 1) / slides.length) * 100;
        pBar.style.width = pct + '%';
      }
      $('arCnt').textContent = 'SLIDE ' + slides[cur][0] + ' / 0' + slides.length;
      $('arPrev').disabled = (cur === 0);
      const nextBtn = $('arNext');
      if (cur === slides.length - 1) {
        nextBtn.innerHTML = 'Ke Prosedur <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg>';
        nextBtn.classList.add('done');
      } else {
        nextBtn.innerHTML = 'Selanjutnya <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg>';
        nextBtn.classList.remove('done');
      }
    }

    $('arPrev').onclick = function () { showSlide(cur - 1); };
    $('arNext').onclick = function () { cur === slides.length - 1 ? tab('prosedur') : showSlide(cur + 1); };

    const tlWrap = $('arTeoriTl');
    if (tlWrap) {
      tlWrap.addEventListener('click', function (e) {
        const target = e.target.closest('.ar-tl-step');
        if (target && target.dataset.step !== undefined) {
          showSlide(parseInt(target.dataset.step, 10));
        }
      });
    }
    showSlide(0);

    // Kuis Interactive Logic
    $('arTeori').addEventListener('click', function (e) {
      const b = e.target.closest('.ar-qo button'); if (!b) return;
      const box = b.closest('.ar-quiz'), ok = b.dataset.ok === '1';
      box.querySelectorAll('button').forEach(function (x) {
        x.disabled = true;
        if (x.dataset.ok === '1') x.classList.add('ok');
      });
      if (!ok) b.classList.add('no');
      box.querySelector('.ar-qf').textContent = b.dataset.msg;
    });

    /* ================= PROSEDUR ================= */
    const steps = [
      ['Tahap 1: Pengenalan Alat & Persiapan Praktikum', ['Aktifkan <b>Grid</b> dan <b>Penggaris</b> pada panel kontrol alat bantu.', 'Perhatikan <b>Gelas Berpancur</b> terisi zat cair hingga batas lubang curahan.', 'Siapkan <b>Gelas Ukur Penampung</b> di bawah moncong untuk menampung air yang terdesak.']],
      ['Tahap 2: Mengukur Berat di Udara (Mode 1: Wᵤ)', ['Pilih salah satu dari 6 <b>Benda Uji</b> pada panel kiri (Gabus, Kayu, Lilin, Plastik, Aluminium, atau Besi).', 'Pastikan tombol <b>⚖️ 1. Gantung di Udara</b> aktif.', 'Baca skala penunjukan neraca pegas sebagai <b>Berat di Udara (Wᵤ)</b>.']],
      ['Tahap 3: Menimbang di Cairan (Mode 2: Wₛₑₘᵤ)', ['Pilih jenis <b>Zat Cair</b> (Air Murni, Minyak Goreng, Air Garam, atau Gliserin).', 'Klik tombol <b>💧 2. Timbang di Cairan</b> untuk merendam balok tercelup penuh.', 'Amati air yang tumpah ke gelas ukur dan baca jarum neraca pegas sebagai <b>Berat Semu (Wₛₑₘᵤ)</b>.']],
      ['Tahap 4: Uji Apung Alami, Penggaris, & LKPD', ['Klik tombol <b>🌊 3. Lepaskan Bebas</b> untuk mengamati fenomena alami: terapung, melayang, atau tenggelam.', 'Pada benda terapung, geser <b>Penggaris</b> untuk mengukur tinggi bagian terendam (<b>h_celup</b>) dan buktikan <b>h_celup / h_total = &rho;_b / &rho;_f</b>.', 'Hitung <b>F_a = Wᵤ - Wₛₑₘᵤ</b> lalu tekan tombol <b>📥 Catat Data ke LKPD</b>.']]
    ];
    $('arProsedur').innerHTML = '<div class="ar-steps">' + steps.map(function (s, i) {
      return '<div class="ar-card ar-step"><div class="ar-h" style="font-size:17px"><span style="color:#3FD6FF">0' + (i + 1) + '</span> &nbsp;' + s[0] + '</div><ul>' + s[1].map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul></div>';
    }).join('') + '</div><div class="ar-nav"><span></span><button class="btn-nav-solid done" id="arGoSim">Buka Simulasi &rarr;</button></div>';
    $('arGoSim').onclick = function () { tab('simulasi'); };

    /* ================= SIMULASI 3 PANEL ================= */
    // Daftar Benda Uji (Volume balok standar 100 cm³ = 1e-4 m³)
    const VOL_B = 100; // cm³
    const G_ACC = 9.8; // m/s²
    const BENDA = [
      { name: 'Balok Gabus', rho: 250, icon: '🪵', color: '#E8D5B5', stroke: '#C4A47C' },
      { name: 'Balok Kayu', rho: 600, icon: '🌲', color: '#D29B52', stroke: '#8D5B18' },
      { name: 'Balok Lilin', rho: 900, icon: '🕯️', color: '#FFF8DC', stroke: '#C8BE96' },
      { name: 'Balok Plastik Sintetis', rho: 1000, icon: '🧊', color: '#A0E7E5', stroke: '#56B4B1' },
      { name: 'Balok Aluminium', rho: 2700, icon: '🔩', color: '#B0C4DE', stroke: '#5B7B9E' },
      { name: 'Balok Besi', rho: 7800, icon: '⚙️', color: '#708090', stroke: '#36454F' }
    ];

    const FLUIDS = [
      { name: 'Air Murni', rho: 1000, color: '74, 168, 255', icon: '💧' },
      { name: 'Minyak Goreng', rho: 900, color: '255, 190, 50', icon: '🛢️' },
      { name: 'Air Garam', rho: 1150, color: '64, 224, 208', icon: '🧂' },
      { name: 'Gliserin', rho: 1260, color: '218, 112, 214', icon: '🧴' }
    ];

    const sm = {
      bendaIdx: 4, // default Aluminium
      fluidIdx: 0, // default Air Murni
      mode: 'udara', // 'udara' | 'celup' | 'lepas'
      animY: 215, // posisi Y balok saat ini
      curJarum: 2.65, // nilai jarum dinamometer (N)
      curV: 0, // volume tumpahan (cm³)
      bobPhase: 0,
      grid: true,
      ruler: true,
      rx: 70, ry: 450, // Ruler
      drag: null,
      raf: 0,
      last: 0
    };

    $('arSimulasi').innerHTML = '<div class="ar-sim">' +
      '<!-- PANEL KIRI -->' +
      '<div class="ar-panel-left">' +
        '<div class="ar-card ar-card-alat"><div class="ar-h">Alat Bantu</div><div class="ar-chk"><label><input type="checkbox" id="arGrid" checked>Grid</label><label><input type="checkbox" id="arRul" checked>Penggaris</label></div></div>' +
        '<div class="ar-card ar-card-benda"><div class="ar-h">Pilih Benda Uji (Vol = 100 cm³)</div><div class="ar-benda-grid" id="arBendaList"></div></div>' +
        '<div class="ar-card ar-card-cairan">' +
          '<div class="ar-h">Fluida Zat Cair</div>' +
          '<div class="ar-cairan-sel">' +
            '<select id="arFluidSel">' +
              FLUIDS.map(function(f, i) { return '<option value="' + i + '">' + f.icon + ' ' + f.name + ' (' + f.rho + ' kg/m³)</option>'; }).join('') +
            '</select>' +
          '</div>' +
          '<div class="ar-mode-btns">' +
            '<button id="arBtnUdara" class="on"><span>⚖️</span> 1. Gantung di Udara (Wᵤ)</button>' +
            '<button id="arBtnCelup"><span>💧</span> 2. Timbang di Cairan (Wₛₑₘᵤ)</button>' +
            '<button id="arBtnLepas" class="lepas"><span>🌊</span> 3. Lepaskan Bebas (Uji Apung)</button>' +
          '</div>' +
        '</div>' +
        '<div class="ar-card ar-card-act"><div class="ar-act"><button class="r" id="arReset" style="width:100%">Reset Simulasi</button></div></div>' +
      '</div>' +
      '<!-- PANEL TENGAH (CANVAS) -->' +
      '<div class="ar-panel-mid">' +
        '<canvas class="ar-cv" id="arCv" width="860" height="560"></canvas>' +
      '</div>' +
      '<!-- PANEL KANAN -->' +
      '<div class="ar-panel-right">' +
        '<div class="ar-card ar-card-sensor"><div class="ar-h">Status & Indikator</div><div class="ar-sensor-box" id="arRead">Pilih mode aksi untuk mengamati gaya apung.</div></div>' +
        '<div class="ar-card ar-card-ukur">' +
          '<div>' +
            '<div class="ar-h">Lembar Pengukuran Siswa</div>' +
            '<div style="font-size:13px;color:#BAC7D5;padding:6px 8px;background:rgba(0,0,0,0.25);border-radius:6px;border-left:3px solid #3DDC84;margin-bottom:6px;">' +
              'Benda: <b id="arUjiBendaName" style="color:#3FD6FF;">🔩 Balok Aluminium</b><br>' +
              'Fluida: <b id="arUjiFluidName" style="color:#3DDC84;">💧 Air Murni</b>' +
            '</div>' +
          '</div>' +
          '<div class="ar-inp-group">' +
            '<div class="ar-inp-item">' +
              '<label>Berat di Udara (Wᵤ) :</label>' +
              '<div class="ar-inp-wrap"><input type="number" step="0.01" id="arSimWu" placeholder="Baca di neraca pegas"><span class="ar-unit">N</span></div>' +
            '</div>' +
            '<div class="ar-inp-item">' +
              '<label>Berat Semu di Cairan (Wₛₑₘᵤ) :</label>' +
              '<div class="ar-inp-wrap"><input type="number" step="0.01" id="arSimWsemu" placeholder="Baca saat dicelup"><span class="ar-unit">N</span></div>' +
            '</div>' +
            '<div class="ar-inp-item">' +
              '<label>Gaya Apung Fₐ (Hasil Hitung) :</label>' +
              '<div class="ar-inp-wrap"><input type="number" step="0.01" id="arSimFa" placeholder="Wᵤ - Wₛₑₘᵤ"><span class="ar-unit">N</span></div>' +
            '</div>' +
            '<div style="display:flex;gap:6px;margin:2px 0;">' +
              '<button id="arBtnCopyRead" style="flex:1;background:rgba(63,214,255,0.12);border:1px solid rgba(63,214,255,0.35);border-radius:6px;color:#3FD6FF;padding:6px;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit;transition:0.2s;">📋 Salin Bacaan Neraca</button>' +
            '</div>' +
            '<div style="font-size:12px;color:#3FD6FF;background:rgba(63,214,255,0.08);padding:5px 8px;border-radius:6px;text-align:center;border:1px dashed rgba(63,214,255,0.25);margin-top:2px;">' +
              'Rumus Archimedes: Fₐ = Wᵤ - Wₛₑₘᵤ = &rho;_f &middot; g &middot; V_bf' +
            '</div>' +
          '</div>' +
          '<div style="margin-top:auto;">' +
            '<button id="arRecord" class="btn-record-lkpd">&#128229; CATAT DATA KE LKPD</button>' +
            '<div id="arRecordMsg" style="font-size:13px;text-align:center;margin-top:4px;min-height:18px;font-weight:bold;"></div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';

    const cv = $('arCv'), cx = cv.getContext('2d');

    function updateModeButtons() {
      const bUdara = $('arBtnUdara'), bCelup = $('arBtnCelup'), bLepas = $('arBtnLepas');
      if (bUdara) bUdara.classList.toggle('on', sm.mode === 'udara');
      if (bCelup) bCelup.classList.toggle('on', sm.mode === 'celup');
      if (bLepas) bLepas.classList.toggle('on', sm.mode === 'lepas');
    }

    function renderBendaList() {
      $('arBendaList').innerHTML = BENDA.map(function (b, i) {
        return '<button data-benda="' + i + '" class="' + (i === sm.bendaIdx ? 'on' : '') + '">' +
          '<span class="b-icon">' + b.icon + '</span>' +
          '<span class="b-name">' + b.name + '</span>' +
        '</button>';
      }).join('');
      const curB = BENDA[sm.bendaIdx];
      const curF = FLUIDS[sm.fluidIdx];
      const ujiB = $('arUjiBendaName'), ujiF = $('arUjiFluidName');
      if (ujiB) ujiB.textContent = curB.icon + ' ' + curB.name;
      if (ujiF) ujiF.textContent = curF.icon + ' ' + curF.name + ' (' + curF.rho + ' kg/m³)';
      updateModeButtons();
    }

    function resetSim() {
      sm.mode = 'udara';
      if ($('arSimWu')) $('arSimWu').value = '';
      if ($('arSimWsemu')) $('arSimWsemu').value = '';
      if ($('arSimFa')) $('arSimFa').value = '';
      const msg = $('arRecordMsg');
      if (msg) msg.textContent = '';
      renderBendaList();
    }

    $('arSimulasi').addEventListener('click', function (e) {
      const b = e.target.closest('[data-benda]');
      if (b) {
        sm.bendaIdx = +b.dataset.benda;
        renderBendaList();
      }
      else if (e.target.id === 'arBtnUdara') {
        sm.mode = 'udara';
        updateModeButtons();
      }
      else if (e.target.id === 'arBtnCelup') {
        sm.mode = 'celup';
        updateModeButtons();
      }
      else if (e.target.id === 'arBtnLepas') {
        sm.mode = 'lepas';
        updateModeButtons();
      }
      else if (e.target.id === 'arBtnCopyRead') {
        const p = calcPhysics();
        if ($('arSimWu')) $('arSimWu').value = p.Wu.toFixed(2);
        if ($('arSimWsemu')) $('arSimWsemu').value = (p.FaMax > 0 ? Math.max(0, p.Wu - p.FaMax).toFixed(2) : p.Wu.toFixed(2));
        const valWu = parseFloat($('arSimWu').value) || 0;
        const valWs = parseFloat($('arSimWsemu').value) || 0;
        if ($('arSimFa')) $('arSimFa').value = (valWu - valWs).toFixed(2);
        const msg = $('arRecordMsg');
        if (msg) {
          msg.style.color = '#3FD6FF';
          msg.textContent = '✓ Nilai bacaan neraca disalin!';
          setTimeout(function () { if (msg) msg.textContent = ''; }, 2000);
        }
      }
      else if (e.target.id === 'arReset') resetSim();
      else if (e.target.id === 'arRecord') { if (typeof recordToLkpdArchimedes === 'function') recordToLkpdArchimedes(); }
    });

    $('arSimulasi').addEventListener('change', function (e) {
      if (e.target.id === 'arFluidSel') {
        sm.fluidIdx = parseInt(e.target.value, 10) || 0;
        renderBendaList();
      }
    });

    $('arSimulasi').addEventListener('input', function (e) {
      if (e.target.id === 'arGrid') sm.grid = e.target.checked;
      else if (e.target.id === 'arRul') sm.ruler = e.target.checked;
    });

    renderBendaList();

    /* ================= KALKULASI & DRAWING CANVAS ================= */
    function calcPhysics() {
      const b = BENDA[sm.bendaIdx];
      const f = FLUIDS[sm.fluidIdx];
      const volM3 = VOL_B * 1e-6; // 100 cm³ = 1e-4 m³
      const massKg = b.rho * volM3; // misal Aluminium = 0.27 kg, Kayu = 0.06 kg
      const Wu = massKg * G_ACC; // Berat di udara (N)
      const FaMax = f.rho * G_ACC * volM3; // Gaya apung saat terbenam penuh 100%

      // Rasio massa jenis untuk kesetimbangan apung alami
      const rhoRatio = b.rho / f.rho;
      const hTotalCm = 6.0; // tinggi balok 6 cm = 60 px (skala 1 cm = 10 px)
      
      let targetY = 215; // default mode udara (balok di atas permukaan air)
      let jarumN = Wu; // penunjukan jarum dinamometer
      let Fa = 0; // gaya apung saat ini
      let Wsemu = Wu; // berat semu
      let vTumpahCm3 = 0; // volume cairan yang tumpah ke penampung
      let frac = 0; // fraksi volume balok tercelup
      let hasRope = true; // tali dinamometer terhubung
      let status = 'Di Udara';
      let hCelupCm = 0;

      if (sm.mode === 'udara') {
        targetY = 215; // balok di udara di atas permukaan air
        jarumN = Wu;
        Wsemu = Wu;
        Fa = 0;
        vTumpahCm3 = 0;
        frac = 0;
        hasRope = true;
        status = 'Di Udara (Tergantung Neraca)';
      }
      else if (sm.mode === 'celup') {
        targetY = 325; // balok ditenggelamkan/tercelup penuh oleh tali statif
        Fa = FaMax;
        Wsemu = Math.max(0, Wu - Fa);
        jarumN = Wsemu;
        vTumpahCm3 = 100;
        frac = 1.0;
        hasRope = true;
        hCelupCm = 6.0;
        status = 'Tercelup Penuh (Tergantung Neraca)';
      }
      else if (sm.mode === 'lepas') {
        hasRope = false;
        jarumN = 0; // neraca pegas tanpa beban
        Wsemu = 0;
        
        if (Math.abs(b.rho - f.rho) <= 5) {
          // MELAYANG (Massa jenis benda sama dengan massa jenis fluida)
          status = 'Melayang Bebas (ΣF_y = 0)';
          frac = 1.0;
          hCelupCm = 6.0;
          targetY = 350; // melayang di tengah bejana
          Fa = Wu;
          vTumpahCm3 = 100;
        }
        else if (b.rho < f.rho) {
          // TERAPUNG
          status = 'Terapung Bebas (ΣF_y = 0)';
          frac = rhoRatio;
          hCelupCm = parseFloat((hTotalCm * rhoRatio).toFixed(2));
          const hMunculCm = hTotalCm - hCelupCm;
          const hMunculPx = hMunculCm * 10;
          // spoutY = 300 adalah batas permukaan air
          // puncak balok berada pada spoutY - hMunculPx
          targetY = 300 - hMunculPx;
          Fa = Wu; // saat terapung setimbang, gaya apung = gaya berat
          vTumpahCm3 = rhoRatio * 100;
        }
        else {
          // TENGGELAM
          status = 'Tenggelam di Dasar (ρ_b > ρ_f)';
          frac = 1.0;
          hCelupCm = 6.0;
          // dasar bejana di 482 px. Balok tinggi 60 px -> targetY = 482 - 60 = 422 px
          targetY = 422;
          Fa = FaMax;
          vTumpahCm3 = 100;
        }
      }

      return {
        Wu: Wu,
        Wsemu: Wsemu,
        jarumN: jarumN,
        Fa: Fa,
        FaMax: FaMax,
        frac: frac,
        vCm3: vTumpahCm3,
        targetY: targetY,
        hasRope: hasRope,
        hCelupCm: hCelupCm,
        hTotalCm: hTotalCm,
        rhoRatio: rhoRatio,
        status: status,
        benda: b,
        fluid: f
      };
    }

    function draw(p) {
      cx.clearRect(0, 0, 860, 560);

      // 1. BACKGROUND LAB
      const bg = cx.createLinearGradient(0, 0, 0, 560);
      bg.addColorStop(0, '#0a1420');
      bg.addColorStop(0.6, '#060d15');
      bg.addColorStop(1, '#020509');
      cx.fillStyle = bg;
      cx.fillRect(0, 0, 860, 560);

      // Radial glow halus
      const glow = cx.createRadialGradient(400, 280, 50, 400, 280, 380);
      glow.addColorStop(0, 'rgba(63, 214, 255, 0.08)');
      glow.addColorStop(0.5, 'rgba(63, 214, 255, 0.025)');
      glow.addColorStop(1, 'transparent');
      cx.fillStyle = glow;
      cx.fillRect(0, 0, 860, 560);

      // Meja Laboratorium
      const bench = cx.createLinearGradient(0, 490, 0, 560);
      bench.addColorStop(0, '#101721');
      bench.addColorStop(1, '#080d14');
      cx.fillStyle = bench;
      cx.fillRect(0, 490, 860, 70);
      cx.strokeStyle = 'rgba(63, 214, 255, 0.25)';
      cx.lineWidth = 1;
      cx.beginPath();
      cx.moveTo(0, 490); cx.lineTo(860, 490);
      cx.stroke();

      // 2. GRID DIGITAL
      if (sm.grid) {
        cx.save();
        cx.lineWidth = 0.8;
        for (let y = 80; y <= 480; y += 20) {
          cx.strokeStyle = 'rgba(95, 168, 214, 0.08)';
          cx.beginPath();
          cx.moveTo(50, y); cx.lineTo(810, y);
          cx.stroke();
        }
        for (let x = 60; x <= 800; x += 40) {
          cx.strokeStyle = 'rgba(95, 168, 214, 0.07)';
          cx.beginPath();
          cx.moveTo(x, 80); cx.lineTo(x, 480);
          cx.stroke();
        }
        cx.restore();
      }

      // 3. STATIF PENGGANTUNG NERACA PEGAS
      const standX = 270;
      cx.save();
      // Dudukan dasar statif
      cx.fillStyle = '#2C3E50';
      cx.fillRect(standX - 90, 480, 130, 10);
      // Tiang vertikal
      cx.fillStyle = '#7F8C8D';
      cx.fillRect(standX - 60, 70, 8, 410);
      // Lengan horizontal atas
      cx.fillRect(standX - 60, 70, 185, 8);
      // Penjepit clamp statif
      cx.fillStyle = '#1C2833';
      cx.fillRect(standX + 115, 66, 16, 16);
      cx.restore();

      // Posisi Gelas Berpancur Utama (Beaker Spout)
      const bkX = 260, bkY = 270, bkW = 150, bkH = 220;
      const spoutY = bkY + 30; // 300 px (permukaan air)
      const spoutX = bkX + bkW; // 410 px

      // Posisi Gelas Ukur Penampung Tumpahan di Sebelah Kanan
      const cupX = 475, cupY = 360, cupW = 75, cupH = 130;

      // 4. FLUIDA DI DALAM GELAS BERPANCUR
      const fluidCol = p.fluid.color;
      cx.save();
      const flGrad = cx.createLinearGradient(bkX, spoutY, bkX, bkY + bkH);
      flGrad.addColorStop(0, 'rgba(' + fluidCol + ', 0.65)');
      flGrad.addColorStop(1, 'rgba(' + fluidCol + ', 0.9)');
      cx.fillStyle = flGrad;
      cx.fillRect(bkX + 6, spoutY, bkW - 12, bkH - 36);

      // Meniskus Permukaan Bejana
      cx.strokeStyle = 'rgba(' + fluidCol + ', 0.95)';
      cx.lineWidth = 2.5;
      cx.beginPath();
      cx.moveTo(bkX + 6, spoutY);
      cx.quadraticCurveTo(bkX + bkW / 2, spoutY + 3, bkX + bkW - 6, spoutY);
      cx.stroke();
      cx.restore();

      // 5. CAIRAN TUMPAH KE GELAS UKUR PENAMPUNG
      const tumpahMaxH = 75;
      const tumpahH = (sm.curV / 100) * tumpahMaxH;
      if (tumpahH > 0.5) {
        cx.save();
        cx.fillStyle = 'rgba(' + fluidCol + ', 0.78)';
        cx.fillRect(cupX + 4, cupY + cupH - tumpahH, cupW - 8, tumpahH);

        // Meniskus pada gelas ukur penampung
        cx.strokeStyle = 'rgba(' + fluidCol + ', 0.95)';
        cx.lineWidth = 2;
        cx.beginPath();
        cx.moveTo(cupX + 4, cupY + cupH - tumpahH);
        cx.quadraticCurveTo(cupX + cupW / 2, cupY + cupH - tumpahH + 2, cupX + cupW - 4, cupY + cupH - tumpahH);
        cx.stroke();

        // Kucuran air tumpah dari moncong jika volume masih mengisi
        if (Math.abs(sm.curV - p.vCm3) > 1 && p.vCm3 > 0) {
          cx.strokeStyle = 'rgba(' + fluidCol + ', 0.85)';
          cx.lineWidth = 3;
          cx.beginPath();
          cx.moveTo(spoutX + 24, spoutY + 14);
          cx.quadraticCurveTo(cupX + cupW / 2 - 10, spoutY + 30, cupX + cupW / 2, cupY + cupH - tumpahH);
          cx.stroke();
        }
        cx.restore();
      }

      // 6. DINDING GELAS KACA BERPANCUR (BEAKER SPOUT)
      cx.save();
      cx.strokeStyle = 'rgba(180, 220, 255, 0.85)';
      cx.lineWidth = 3.5;
      cx.beginPath();
      cx.moveTo(bkX, bkY);
      cx.lineTo(bkX, bkY + bkH);
      cx.lineTo(bkX + bkW, bkY + bkH);
      cx.lineTo(bkX + bkW, spoutY + 8);
      // Corong Pancuran
      cx.lineTo(spoutX + 24, spoutY + 14);
      cx.lineTo(spoutX + 22, spoutY + 8);
      cx.lineTo(bkX + bkW, spoutY);
      cx.lineTo(bkX + bkW, bkY);
      cx.stroke();

      // Dinding Gelas Ukur Penampung
      cx.beginPath();
      cx.moveTo(cupX, cupY);
      cx.lineTo(cupX, cupY + cupH);
      cx.lineTo(cupX + cupW, cupY + cupH);
      cx.lineTo(cupX + cupW, cupY);
      cx.stroke();

      // Skala mililiter pada gelas penampung
      cx.fillStyle = 'rgba(255,255,255,0.7)';
      cx.font = 'bold 9px Arial';
      for (let sc = 0; sc <= 100; sc += 25) {
        const ySc = cupY + cupH - (sc / 100) * tumpahMaxH;
        cx.fillRect(cupX + 4, ySc, 10, 1.2);
        cx.fillText(sc + 'ml', cupX + 18, ySc + 3.5);
      }

      // Label Gelas Penampung
      cx.fillStyle = '#3FD6FF';
      cx.font = 'bold 11px Arial';
      cx.textAlign = 'center';
      cx.fillText('Gelas Ukur', cupX + cupW / 2, cupY - 10);
      cx.restore();

      // 7. NERACA PEGAS (DINAMOMETER)
      const dynaX = bkX + bkW / 2; // 335 px
      const dynaTop = 78, dynaH = 90, dynaW = 28;

      // Badan Dinamometer Kaca Transparan
      cx.save();
      cx.fillStyle = 'rgba(30, 45, 60, 0.9)';
      cx.strokeStyle = '#3FD6FF';
      cx.lineWidth = 2;
      cx.beginPath();
      cx.roundRect(dynaX - dynaW / 2, dynaTop, dynaW, dynaH, 6);
      cx.fill(); cx.stroke();

      // Cincin gantung atas neraca
      cx.strokeStyle = '#7F8C8D';
      cx.lineWidth = 2.5;
      cx.beginPath();
      cx.arc(dynaX, dynaTop - 4, 4, 0, Math.PI * 2);
      cx.stroke();

      // Skala Dinamometer
      cx.strokeStyle = 'rgba(255,255,255,0.5)';
      cx.lineWidth = 1;
      for (let s = 0; s <= 8; s += 2) {
        const sy = dynaTop + 15 + (s / 8) * 60;
        cx.beginPath();
        cx.moveTo(dynaX - dynaW / 2 + 3, sy); cx.lineTo(dynaX - dynaW / 2 + 10, sy);
        cx.stroke();
      }

      // Jarum Penunjuk Gaya pada Dinamometer
      const maxRangeN = 8.5; // skala maksimum 8.5 N
      const jarumY = dynaTop + 15 + Math.max(0, Math.min(1, sm.curJarum / maxRangeN)) * 60;
      cx.fillStyle = '#FF3B30';
      cx.beginPath();
      cx.moveTo(dynaX - 7, jarumY); cx.lineTo(dynaX + 7, jarumY);
      cx.lineTo(dynaX, jarumY + 4);
      cx.closePath();
      cx.fill();

      // Badge Penunjuk Skala Dinamometer
      cx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      cx.strokeStyle = '#3FD6FF';
      cx.lineWidth = 1;
      cx.beginPath();
      cx.roundRect(dynaX + dynaW / 2 + 6, jarumY - 8, 48, 16, 4);
      cx.fill(); cx.stroke();
      cx.fillStyle = sm.curJarum > 0 ? '#3FD6FF' : '#BAC7D5';
      cx.font = 'bold 11px Arial';
      cx.textAlign = 'center';
      cx.fillText(sm.curJarum.toFixed(2) + 'N', dynaX + dynaW / 2 + 30, jarumY + 4);

      // Posisi Balok Uji Fisik
      const blockW = 60, blockH = 60; // 60px merepresentasikan balok tinggi 6.0 cm
      const bobOffset = (sm.mode === 'lepas' && p.benda.rho < p.fluid.rho && Math.abs(sm.animY - p.targetY) < 3) ? Math.sin(sm.bobPhase) * 2.2 : 0;
      const blockY = sm.animY + bobOffset;
      const blockLeft = dynaX - blockW / 2;

      // Tali Penggantung Balok
      if (p.hasRope) {
        cx.strokeStyle = '#EDEFF1';
        cx.lineWidth = 1.6;
        cx.beginPath();
        cx.moveTo(dynaX, dynaTop + dynaH);
        cx.lineTo(dynaX, blockY);
        cx.stroke();

        // Pengait di atas balok
        cx.strokeStyle = '#BDC3C7';
        cx.lineWidth = 2;
        cx.beginPath();
        cx.arc(dynaX, blockY - 3, 3, 0, Math.PI);
        cx.stroke();
      } else {
        // Mode Lepas: Pengait neraca kosong
        cx.strokeStyle = '#BDC3C7';
        cx.lineWidth = 2;
        cx.beginPath();
        cx.arc(dynaX, dynaTop + dynaH + 4, 4, 0, Math.PI);
        cx.stroke();
      }

      // 8. BALOK UJI FISIK DENGAN BAYANGAN & 3D BORDER
      cx.fillStyle = p.benda.color;
      cx.strokeStyle = p.benda.stroke;
      cx.lineWidth = 2.5;
      cx.beginPath();
      cx.roundRect(blockLeft, blockY, blockW, blockH, 5);
      cx.fill(); cx.stroke();

      // Label Benda di Balok (tanpa menampilkan nilai massa jenis)
      cx.fillStyle = '#0a1420';
      cx.font = 'bold 16px Arial';
      cx.textAlign = 'center';
      cx.fillText(p.benda.icon, dynaX, blockY + 26);
      cx.font = 'bold 11px Arial';
      cx.fillText(p.benda.name.split(' ')[1] || p.benda.name, dynaX, blockY + 44);

      // 9. ANOTASI PENGUKURAN TINGGI BALOK (PENGGARIS DIMENSI) SAAT TERAPUNG
      if (sm.mode === 'lepas' && p.benda.rho < p.fluid.rho) {
        // Bagian yang terendam (dari spoutY ke dasar balok)
        const dimX = dynaX + blockW / 2 + 10;
        const bottomY = blockY + blockH;

        // Garis dimensi h_celup (Hijau)
        cx.strokeStyle = '#3DDC84';
        cx.lineWidth = 1.8;
        cx.beginPath();
        cx.moveTo(dimX, spoutY);
        cx.lineTo(dimX, bottomY);
        // Ticks
        cx.moveTo(dimX - 4, spoutY); cx.lineTo(dimX + 4, spoutY);
        cx.moveTo(dimX - 4, bottomY); cx.lineTo(dimX + 4, bottomY);
        cx.stroke();

        cx.fillStyle = '#3DDC84';
        cx.font = 'bold 11px Arial';
        cx.textAlign = 'left';
        cx.fillText('h_celup = ' + p.hCelupCm.toFixed(1) + ' cm', dimX + 8, (spoutY + bottomY) / 2 + 4);

        // Garis dimensi h_total (Cyan) di sebelah kiri balok
        const dimLeftX = dynaX - blockW / 2 - 10;
        cx.strokeStyle = '#3FD6FF';
        cx.lineWidth = 1.8;
        cx.beginPath();
        cx.moveTo(dimLeftX, blockY);
        cx.lineTo(dimLeftX, bottomY);
        // Ticks
        cx.moveTo(dimLeftX - 4, blockY); cx.lineTo(dimLeftX + 4, blockY);
        cx.moveTo(dimLeftX - 4, bottomY); cx.lineTo(dimLeftX + 4, bottomY);
        cx.stroke();

        cx.fillStyle = '#3FD6FF';
        cx.font = 'bold 11px Arial';
        cx.textAlign = 'right';
        cx.fillText('h_tot = 6.0 cm', dimLeftX - 8, (blockY + bottomY) / 2 + 4);

        // Badge Rasio Terapung
        cx.fillStyle = 'rgba(15, 23, 42, 0.9)';
        cx.strokeStyle = 'rgba(61, 220, 132, 0.8)';
        cx.lineWidth = 1.2;
        cx.beginPath();
        cx.roundRect(140, 160, 220, 24, 6);
        cx.fill(); cx.stroke();
        cx.fillStyle = '#3DDC84';
        cx.font = 'bold 11px "Courier New", monospace';
        cx.textAlign = 'center';
        cx.fillText('h_celup/h_tot = ρ_b/ρ_f = ' + (p.hCelupCm / 6.0).toFixed(2), 250, 176);
      }

      // 10. VEKTOR PANAH GAYA BERAT W & GAYA APUNG Fa
      if (sm.mode !== 'udara') {
        const centerY = blockY + blockH / 2;

        // Gaya Apung Fa (Panah Hijau ke Atas)
        if (p.Fa > 0) {
          cx.strokeStyle = '#3DDC84';
          cx.fillStyle = '#3DDC84';
          cx.lineWidth = 2.5;
          const faLen = Math.min(48, p.Fa * 20);
          cx.beginPath();
          cx.moveTo(dynaX + 45, centerY);
          cx.lineTo(dynaX + 45, centerY - faLen);
          cx.lineTo(dynaX + 41, centerY - faLen + 8);
          cx.moveTo(dynaX + 45, centerY - faLen);
          cx.lineTo(dynaX + 49, centerY - faLen + 8);
          cx.stroke();
          cx.font = 'bold 11px Arial';
          cx.textAlign = 'left';
          cx.fillText('Fₐ=' + p.Fa.toFixed(2) + 'N', dynaX + 52, centerY - faLen + 6);
        }

        // Gaya Berat W (Panah Merah ke Bawah)
        cx.strokeStyle = '#FF6B6B';
        cx.fillStyle = '#FF6B6B';
        cx.lineWidth = 2.5;
        const wLen = Math.min(48, p.Wu * 14);
        cx.beginPath();
        cx.moveTo(dynaX - 45, centerY);
        cx.lineTo(dynaX - 45, centerY + wLen);
        cx.lineTo(dynaX - 49, centerY + wLen - 8);
        cx.moveTo(dynaX - 45, centerY + wLen);
        cx.lineTo(dynaX - 41, centerY + wLen - 8);
        cx.stroke();
        cx.textAlign = 'right';
        cx.fillText('Wᵤ=' + p.Wu.toFixed(2) + 'N', dynaX - 52, centerY + wLen);

        // Jika tenggelam mendarat di dasar: Gaya Normal dari lantai dasar bejana
        if (sm.mode === 'lepas' && p.benda.rho > p.fluid.rho && Math.abs(sm.animY - p.targetY) < 3) {
          const N_val = Math.max(0, p.Wu - p.Fa);
          cx.strokeStyle = '#F5C84B';
          cx.fillStyle = '#F5C84B';
          cx.lineWidth = 2;
          const nLen = Math.min(35, N_val * 14);
          cx.beginPath();
          cx.moveTo(dynaX, blockY + blockH);
          cx.lineTo(dynaX, blockY + blockH - nLen);
          cx.lineTo(dynaX - 4, blockY + blockH - nLen + 6);
          cx.moveTo(dynaX, blockY + blockH - nLen);
          cx.lineTo(dynaX + 4, blockY + blockH - nLen + 6);
          cx.stroke();
          cx.font = 'bold 10px Arial';
          cx.textAlign = 'center';
          cx.fillText('N=' + N_val.toFixed(2) + 'N', dynaX, blockY + blockH - nLen - 4);
        }
      }


      // 11. PENGGARIS GESER INTERAKTIF (Skala 1 cm = 10 px, pas dengan tinggi balok 6 cm = 60 px)
      if (sm.ruler) {
        cx.save();
        const rw = 36, S_RUL = 10;
        const totalCm = 24;
        const totalPx = totalCm * S_RUL;
        const top = sm.ry - totalPx;

        // Bayangan penggaris
        cx.shadowColor = 'rgba(0, 0, 0, 0.4)';
        cx.shadowBlur = 10;
        cx.fillStyle = 'rgba(255, 238, 170, 0.95)';
        cx.fillRect(sm.rx, top, rw, totalPx + 14);
        cx.strokeStyle = '#333';
        cx.lineWidth = 1.2;
        cx.strokeRect(sm.rx, top, rw, totalPx + 14);

        // Header penggaris
        cx.fillStyle = '#222';
        cx.font = 'bold 9px Arial';
        cx.textAlign = 'center';
        cx.fillText('cm', sm.rx + rw / 2, top + 10);

        // Garis skala
        for (let k = 0; k <= totalCm; k++) {
          const y = sm.ry - k * S_RUL;
          const isMajor = (k % 5 === 0);
          const isMid = (!isMajor && k % 1 === 0);
          const L = isMajor ? 18 : 10;

          cx.strokeStyle = '#222';
          cx.lineWidth = isMajor ? 1.4 : 0.8;
          cx.beginPath();
          cx.moveTo(sm.rx + rw, y);
          cx.lineTo(sm.rx + rw - L, y);
          cx.stroke();

          // Garis sub-milimeter (setiap 5 mm)
          if (k < totalCm) {
            const yMid = y - 5;
            cx.lineWidth = 0.6;
            cx.beginPath();
            cx.moveTo(sm.rx + rw, yMid);
            cx.lineTo(sm.rx + rw - 6, yMid);
            cx.stroke();
          }

          if (isMajor || k <= 10) {
            cx.fillStyle = '#111';
            cx.font = 'bold 9px Arial';
            cx.textAlign = 'left';
            cx.fillText(k, sm.rx + 3, y + 3.5);
          }
        }

        // Garis Nol Merah
        cx.fillStyle = '#D93025';
        cx.fillRect(sm.rx, sm.ry - 1.5, rw, 3);
        cx.restore();
      }

      // Update Text di Panel Kanan
      const rd = $('arRead');
      if (rd) {
        let modeStr = '';
        if (sm.mode === 'udara') {
          modeStr = '<div style="color:#F5C84B;font-weight:bold;margin-bottom:4px;">⚖️ Mode 1: Tergantung di Udara</div>' +
            'Berat di Udara (Wᵤ) : <b>' + p.Wu.toFixed(2) + ' N</b><br>' +
            'Volume Tercelup (V_bf) : <b>0 cm³</b><br>' +
            'Gaya Apung (Fₐ) : <b>0.00 N</b><br>' +
            'Neraca pegas mengukur berat asli balok sebelum dicelupkan ke zat cair.';
        } else if (sm.mode === 'celup') {
          modeStr = '<div style="color:#3FD6FF;font-weight:bold;margin-bottom:4px;">💧 Mode 2: Tergantung di Cairan</div>' +
            'Berat di Udara (Wᵤ) : <b>' + p.Wu.toFixed(2) + ' N</b><br>' +
            'Berat Semu (Wₛₑₘᵤ) : <b>' + p.Wsemu.toFixed(2) + ' N</b><br>' +
            'Gaya Apung Fₐ (Wᵤ - Wₛₑₘᵤ) : <b>' + p.Fa.toFixed(2) + ' N</b><br>' +
            'Volume Tumpah : <b>' + p.vCm3.toFixed(0) + ' ml</b><br>' +
            'Zat cair tumpah ke penampung persis sebesar volume balok terbenam.';
        } else {
          const isLayang = Math.abs(p.benda.rho - p.fluid.rho) <= 5;
          const isApung = !isLayang && (p.benda.rho < p.fluid.rho);
          const statusCol = isApung ? '#3DDC84' : (isLayang ? '#F5C84B' : '#FF6B6B');
          const statusLabel = isApung ? 'TERAPUNG ALAMI' : (isLayang ? 'MELAYANG ALAMI' : 'TENGGELAM DI DASAR');

          modeStr = '<div style="color:' + statusCol + ';font-weight:bold;margin-bottom:4px;">🌊 Mode 3: ' + statusLabel + '</div>' +
            'Tali Neraca : <b>Terlepas (0.00 N)</b><br>' +
            'Fluida : <b>' + p.fluid.name + ' (&rho; = ' + p.fluid.rho + ' kg/m³)</b><br>' +
            (isApung ? ('Tinggi Terendam (h_celup) : <b>' + p.hCelupCm.toFixed(1) + ' cm</b> (dari tinggi 6.0 cm)<br>' +
              'Rasio h_celup / h_total : <b>' + (p.hCelupCm / 6.0).toFixed(2) + '</b><br>' +
              'Gaya Apung Fₐ : <b>' + p.Fa.toFixed(2) + ' N</b> (= Wᵤ)') :
             (isLayang ? ('Balok melayang seimbang di dalam fluida.<br>Gaya Apung Fₐ = <b>' + p.Fa.toFixed(2) + ' N</b> (= Wᵤ)') :
              ('Balok tenggelam ke dasar bejana.<br>Fₐ maks: <b>' + p.Fa.toFixed(2) + ' N</b> < Wᵤ: <b>' + p.Wu.toFixed(2) + ' N</b><br>Gaya Normal Lantai: <b>' + (p.Wu - p.Fa).toFixed(2) + ' N</b>')));
        }
        rd.innerHTML = modeStr;
      }
    }

    function frame(t) {
      if (!cv.isConnected) return;
      const dt = Math.min(0.05, (t - sm.last) / 1000 || 0); sm.last = t;
      const p = calcPhysics();

      // Interpolasi mulus posisi Y balok
      const diffY = p.targetY - sm.animY;
      if (Math.abs(diffY) > 0.2) {
        sm.animY += diffY * Math.min(1, 6 * dt);
      } else {
        sm.animY = p.targetY;
      }

      // Animasi osilasi mengapung lembut saat terapung di mode lepas
      if (sm.mode === 'lepas' && p.benda.rho < p.fluid.rho) {
        sm.bobPhase += 3.2 * dt;
      } else {
        sm.bobPhase = 0;
      }

      // Interpolasi jarum dinamometer
      const diffJ = p.jarumN - sm.curJarum;
      if (Math.abs(diffJ) > 0.01) {
        sm.curJarum += diffJ * Math.min(1, 8 * dt);
      } else {
        sm.curJarum = p.jarumN;
      }

      // Interpolasi tumpahan air
      const diffV = p.vCm3 - sm.curV;
      if (Math.abs(diffV) > 0.2) {
        sm.curV += diffV * Math.min(1, 6 * dt);
      } else {
        sm.curV = p.vCm3;
      }

      draw(p);
      sm.raf = requestAnimationFrame(frame);
    }

    sim = {
      start: function () { cancelAnimationFrame(sm.raf); sm.last = performance.now(); sm.raf = requestAnimationFrame(frame); },
      stop: function () { cancelAnimationFrame(sm.raf); }
    };

    function pt(e) {
      const r = cv.getBoundingClientRect();
      return [(e.clientX - r.left) * cv.width / r.width, (e.clientY - r.top) * cv.height / r.height];
    }

    cv.addEventListener('pointerdown', function (e) {
      const p = pt(e);
      if (sm.ruler && p[0] >= sm.rx && p[0] <= sm.rx + 36 && p[1] >= sm.ry - 24 * 10 - 14 && p[1] <= sm.ry + 20) {
        sm.drag = ['r', p[0] - sm.rx, p[1] - sm.ry];
      }
      if (sm.drag) { cv.setPointerCapture(e.pointerId); cv.style.cursor = 'grabbing'; }
    });

    cv.addEventListener('pointermove', function (e) {
      const p = pt(e);
      if (!sm.drag) {
        const hR = sm.ruler && p[0] >= sm.rx && p[0] <= sm.rx + 36 && p[1] >= sm.ry - 24 * 10 - 14 && p[1] <= sm.ry + 20;
        cv.style.cursor = hR ? 'grab' : 'default';
        return;
      }
      sm.rx = Math.max(0, Math.min(820, p[0] - sm.drag[1]));
      sm.ry = Math.max(250, Math.min(540, p[1] - sm.drag[2]));
    });

    const up = function () { sm.drag = null; cv.style.cursor = 'default'; };
    cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);

    /* ================= LKPD IMPLEMENTATION ================= */
    function buildTableRows() {
      let html = '';
      for (let i = 1; i <= 5; i++) {
        html += '<tr data-row="' + i + '" data-checked="false">' +
          '<td style="font-weight:bold;color:#3FD6FF;">' + i + '</td>' +
          '<td><input type="text" class="ar-inp-benda" placeholder="Benda Uji" style="color:#3FD6FF;font-weight:600;"></td>' +
          '<td><input type="text" class="ar-inp-fluid" placeholder="Fluida" style="color:#BAC7D5;font-weight:500;"></td>' +
          '<td><input type="number" step="0.01" class="ar-inp-wu" placeholder="—"></td>' +
          '<td><input type="number" step="0.01" class="ar-inp-ws" placeholder="—"></td>' +
          '<td><input type="number" step="0.01" class="ar-inp-fac" placeholder="—" style="color:#EDEFF1;font-weight:bold;"></td>' +
          '<td><input type="text" class="ar-inp-fas" placeholder="—" readonly style="color:#3DDC84;font-weight:bold;cursor:default;"></td>' +
          '<td class="ar-cell-status" style="border-right:none;font-weight:bold;font-size:14px;color:#BAC7D5;">—</td>' +
        '</tr>';
      }
      return html;
    }

    $('arLkpd').innerHTML = '<div class="menu-frame" style="width:100%; height:100%; position:relative; overflow:hidden;">' +
      '<div class="circuit"></div>' +
      '<div class="teori-wrap" style="display:flex; flex-direction:row; padding:0.8em 1.2em; gap:1em; max-width:1440px; margin:0 auto; align-items:flex-start; height:100%; box-sizing:border-box;">' +
        '<!-- KOLOM KIRI -->' +
        '<div style="flex:1.6; display:flex; flex-direction:column; gap:0.6em; height:100%; min-width:0;">' +
          '<div style="display:flex; gap:10px; z-index:2;">' +
            '<input type="text" id="arNamaInput" placeholder="Nama Lengkap" style="flex:2; background:#1C2228; border:1px solid #3A4451; border-radius:8px; padding:10px 15px; color:#EDEFF1; font-size:16px; outline:none;">' +
            '<input type="text" id="arKelasInput" placeholder="Kelas" style="flex:1; background:#1C2228; border:1px solid #3A4451; border-radius:8px; padding:10px 15px; color:#EDEFF1; font-size:16px; outline:none;">' +
          '</div>' +
          '<div class="modern-scroll" style="flex:1; overflow-y:auto; display:flex; flex-direction:column; gap:0.6em; padding-right:8px; z-index:2;">' +
            '<div style="background:#1C2228; border:1px solid #3A4451; border-radius:8px; padding:0.8em 1.2em; display:flex; flex-direction:column; gap:0.4em; z-index:2;">' +
              '<div style="color:#3FD6FF; font-weight:bold; font-size:16px; letter-spacing:1px; text-transform:uppercase; border-bottom:1px dashed #3A4451; padding-bottom:5px; margin-bottom:2px;">&#127919; TUJUAN KEGIATAN</div>' +
              '<div style="font-size:18px; line-height:1.5; color:#EDEFF1; text-align:justify;">' +
                'Setelah melakukan virtual eksperimen dengan gelas berpancur dan neraca pegas, murid dapat membuktikan Hukum Archimedes bahwa gaya apung ke atas (Fₐ = Wᵤ - Wₛₑₘᵤ) sama dengan berat fluida yang dipindahkan (Fₐ = &rho;_f &middot; g &middot; V_bf) serta menganalisis faktor-faktor yang memengaruhinya.' +
              '</div>' +
            '</div>' +
            '<div style="background:#151A20; border:1px solid #3A4451; border-radius:10px; display:flex; flex-direction:column; z-index:2;">' +
              '<div style="background:#1C2228; border-bottom:1px solid #3A4451; border-radius:10px 10px 0 0; padding:10px 14px; display:flex; align-items:center; justify-content:space-between;">' +
                '<div style="display:flex; align-items:center; gap:10px;">' +
                  '<div style="font-size:20px;">&#128202;</div>' +
                  '<div>' +
                    '<div style="color:#3FD6FF; font-weight:bold; font-size:16px; letter-spacing:1px; text-transform:uppercase;">TABEL PENGAMATAN HUKUM ARCHIMEDES</div>' +
                    '<div style="color:#BAC7D5; font-size:13px;">Gaya Apung: Fₐ = Wᵤ - Wₛₑₘᵤ = &rho;_f &middot; g &middot; V_bf</div>' +
                  '</div>' +
                '</div>' +
              '</div>' +
              '<div style="display:flex; flex-direction:column; padding:0; overflow-x:auto;">' +
                '<table class="tbl-lkpd-ar">' +
                  '<thead style="background:#262D35; border-bottom:1px solid #3A4451;">' +
                    '<tr>' +
                      '<th style="color:#3FD6FF; width:5%;">No</th>' +
                      '<th style="color:#3FD6FF; width:18%;">Benda Uji</th>' +
                      '<th style="color:#BAC7D5; width:18%;">Fluida</th>' +
                      '<th style="color:#EDEFF1; width:12%;">Wᵤ Udara<br><span class="unit">(N)</span></th>' +
                      '<th style="color:#EDEFF1; width:13%;">Wₛₑₘᵤ Air<br><span class="unit">(N)</span></th>' +
                      '<th style="color:#EDEFF1; width:14%;">Fₐ Hasil Ukur<br><span class="unit">(N)</span></th>' +
                      '<th style="color:#3DDC84; width:14%;">Fₐ Sebenarnya<br><span class="unit">(N)</span></th>' +
                      '<th style="color:#EDEFF1; width:6%; border-right:none;">Status</th>' +
                    '</tr>' +
                  '</thead>' +
                  '<tbody id="ar-lkpd-tbody">' + buildTableRows() + '</tbody>' +
                '</table>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div style="display:flex; gap:10px; z-index:2; margin-top:2px;">' +
            '<button id="arCekJawabanBtn" style="flex:1; background:#B8860B; color:#fff; border:none; padding:10px; border-radius:6px; font-weight:bold; font-size:16px; cursor:pointer; box-shadow:0 4px 6px rgba(0,0,0,0.3); display:flex; justify-content:center; align-items:center; gap:8px;">&#10003; CEK JAWABAN</button>' +
            '<button id="arCetakLaporanBtn" style="flex:1; background:#1E5084; color:#fff; border:none; padding:10px; border-radius:6px; font-weight:bold; font-size:16px; cursor:pointer; box-shadow:0 4px 6px rgba(0,0,0,0.3); display:flex; justify-content:center; align-items:center; gap:8px;">&#128438; CETAK LAPORAN</button>' +
          '</div>' +
        '</div>' +
        '<!-- KOLOM KANAN -->' +
        '<div style="flex:1; display:flex; flex-direction:column; gap:0.8em; height:100%; min-width:0;">' +
          '<div style="display:flex; flex-wrap:nowrap; gap:10px; background:#1C2228; padding:8px; border-radius:10px; border:1px solid #3A4451; z-index:2;">' +
            '<button class="ar-lkpd-tab-btn active" id="ar-btn-analisis" style="flex:1; background:rgba(63,214,255,0.2); color:#3FD6FF; border:1px solid rgba(63,214,255,0.8); box-shadow:0 0 10px rgba(63,214,255,0.3); padding:10px; border-radius:6px; font-weight:bold; cursor:pointer; font-size:18px; transition:0.2s; white-space:nowrap;">&#128200; Analisis</button>' +
            '<button class="ar-lkpd-tab-btn" id="ar-btn-evaluasi" style="flex:1; background:#262D35; color:#BAC7D5; border:1px solid #3A4451; padding:10px; border-radius:6px; font-weight:bold; cursor:pointer; font-size:18px; transition:0.2s; white-space:nowrap;">&#128394; Evaluasi</button>' +
            '<button class="ar-lkpd-tab-btn" id="ar-btn-kesimpulan" style="flex:1; background:#262D35; color:#BAC7D5; border:1px solid #3A4451; padding:10px; border-radius:6px; font-weight:bold; cursor:pointer; font-size:18px; transition:0.2s; white-space:nowrap;">&#128161; Kesimpulan</button>' +
          '</div>' +
          '<div style="flex:1; background:#1C2228; border:1px solid #3A4451; border-radius:10px; padding:1.2em; position:relative; overflow:hidden; z-index:2; display:flex; flex-direction:column;">' +
            '<!-- Panel Analisis -->' +
            '<div id="ar-panel-analisis" class="ar-lkpd-panel" style="display:flex; flex-direction:column; gap:0.8em; height:100%;">' +
              '<div style="display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.2); border-radius:8px; padding:10px 15px;">' +
                '<div style="color:#3FD6FF; font-size:22px; font-weight:bold;">TUGAS ANALISIS</div>' +
                '<div style="color:#EDEFF1; font-size:22px; font-weight:bold;" id="arAnalisisSlideIndicator">Slide 1 / 5</div>' +
              '</div>' +
              '<div class="ar-slides-wrap" id="ar-analisis-slides-container" style="flex:1; display:flex; flex-direction:column; overflow:hidden;">' +
                '<div id="ar-analisis-slide-1" class="ar-slide-item" style="flex:1; display:flex; flex-direction:column;">' +
                  '<div style="font-size:19px; line-height:1.5; color:#EDEFF1; text-align:justify; margin-bottom:12px;">' +
                    '1. Berdasarkan data pengamatan, bagaimana hubungan antara berat benda di udara (Wᵤ), berat semu di dalam fluida (Wₛₑₘᵤ), dan gaya apung (Fₐ)? Jelaskan!' +
                  '</div>' +
                  '<textarea placeholder="Ketik jawaban di sini..." style="flex:1; width:100%; background:rgba(0,0,0,0.2); border:1px solid #3A4451; border-radius:8px; padding:14px; color:#EDEFF1; font-family:inherit; font-size:18px; text-align:justify; resize:none; outline:none; line-height:1.5;"></textarea>' +
                '</div>' +
                '<div id="ar-analisis-slide-2" class="ar-slide-item" style="flex:1; display:none; flex-direction:column;">' +
                  '<div style="font-size:19px; line-height:1.5; color:#EDEFF1; text-align:justify; margin-bottom:12px;">' +
                    '2. Bagaimana pengaruh massa jenis zat cair (&rho;_f) terhadap besar gaya apung (Fₐ) pada benda dengan volume tercelup yang sama? Berikan bukti dari data!' +
                  '</div>' +
                  '<textarea placeholder="Ketik jawaban di sini..." style="flex:1; width:100%; background:rgba(0,0,0,0.2); border:1px solid #3A4451; border-radius:8px; padding:14px; color:#EDEFF1; font-family:inherit; font-size:18px; text-align:justify; resize:none; outline:none; line-height:1.5;"></textarea>' +
                '</div>' +
                '<div id="ar-analisis-slide-3" class="ar-slide-item" style="flex:1; display:none; flex-direction:column;">' +
                  '<div style="font-size:19px; line-height:1.5; color:#EDEFF1; text-align:justify; margin-bottom:12px;">' +
                    '3. Mengapa balok kayu mengapung sedangkan balok besi tenggelam di dalam air murni? Jelaskan ditinjau dari perbandingan massa jenis dan gaya apung maksimumnya!' +
                  '</div>' +
                  '<textarea placeholder="Ketik jawaban di sini..." style="flex:1; width:100%; background:rgba(0,0,0,0.2); border:1px solid #3A4451; border-radius:8px; padding:14px; color:#EDEFF1; font-family:inherit; font-size:18px; text-align:justify; resize:none; outline:none; line-height:1.5;"></textarea>' +
                '</div>' +
                '<div id="ar-analisis-slide-4" class="ar-slide-item" style="flex:1; display:none; flex-direction:column;">' +
                  '<div style="font-size:19px; line-height:1.5; color:#EDEFF1; text-align:justify; margin-bottom:12px;">' +
                    '4. Mengapa kapal laut yang terbuat dari bahan baja padat dapat mengapung di lautan, sedangkan sebutir paku besi kecil justru langsung tenggelam?' +
                  '</div>' +
                  '<textarea placeholder="Ketik jawaban di sini..." style="flex:1; width:100%; background:rgba(0,0,0,0.2); border:1px solid #3A4451; border-radius:8px; padding:14px; color:#EDEFF1; font-family:inherit; font-size:18px; text-align:justify; resize:none; outline:none; line-height:1.5;"></textarea>' +
                '</div>' +
                '<div id="ar-analisis-slide-5" class="ar-slide-item" style="flex:1; display:none; flex-direction:column;">' +
                  '<div style="font-size:19px; line-height:1.5; color:#EDEFF1; text-align:justify; margin-bottom:12px;">' +
                    '5. Buktikan secara matematis bahwa gaya apung Archimedes Fₐ muncul akibat selisih tekanan hidrostatis antara permukaan bawah dan permukaan atas benda!' +
                  '</div>' +
                  '<textarea placeholder="Ketik penjelasan Anda di sini..." style="flex:1; width:100%; background:rgba(0,0,0,0.2); border:1px solid #3A4451; border-radius:8px; padding:14px; color:#EDEFF1; font-family:inherit; font-size:18px; text-align:justify; resize:none; outline:none; line-height:1.5;"></textarea>' +
                '</div>' +
              '</div>' +
              '<div id="ar-analisis-feedback" class="modern-scroll" style="display:none; flex:1; overflow-y:auto; padding:15px; background:rgba(61,220,132,0.1); border:1px solid #3DDC84; border-radius:8px; margin-top:5px;">' +
                '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px; gap:10px; flex-wrap:wrap;">' +
                  '<h3 style="color:#3DDC84; font-size:22px; margin:0; white-space:nowrap;">KUNCI JAWABAN &amp; PEMBAHASAN</h3>' +
                  '<button id="arBtnCekJawabanAnalisis" style="background:#1E5084; color:#fff; border:none; padding:8px 16px; border-radius:6px; font-weight:bold; font-size:16px; cursor:pointer;">Lihat Jawaban Saya</button>' +
                '</div>' +
                '<div style="font-size:18px; color:#EDEFF1; line-height:1.6; text-align:justify;">' +
                  '<b>1.</b> Berat semu benda di dalam zat cair lebih kecil daripada beratnya di udara karena zat cair memberikan gaya dorong ke atas (gaya apung, Fₐ). Hubungannya adalah: <b>Fₐ = Wᵤ - Wₛₑₘᵤ</b> atau <b>Wₛₑₘᵤ = Wᵤ - Fₐ</b>.<br><br>' +
                  '<b>2.</b> Semakin besar massa jenis zat cair (&rho;_f), semakin besar gaya apung Fₐ yang dihasilkan pada volume celup yang sama, karena Fₐ berbanding lurus secara linier dengan &rho;_f (Fₐ = &rho;_f &middot; g &middot; V_bf). Benda di gliserin mengalami gaya apung lebih besar daripada di air atau minyak.<br><br>' +
                  '<b>3.</b> Balok kayu mengapung karena massa jenisnya lebih kecil dari air (&rho;_kayu &asymp; 600 kg/m³ < &rho;_air = 1.000 kg/m³), sehingga gaya apung saat tercelup sebagian sudah mampu mengimbangi beratnya (Fₐ = W). Besi tenggelam karena &rho;_besi &asymp; 7.800 kg/m³ > &rho;_air, sehingga bahkan saat tercelup 100%, gaya apung maksimumnya tetap lebih kecil dari gaya beratnya (Fₐ < W).<br><br>' +
                  '<b>4.</b> Kapal laut dibuat dengan rongga lambung yang sangat besar berisi udara. Meskipun bahannya baja padat, volume total kapal sangat besar sehingga massa jenis rata-rata kapal (massa total / volume total) jauh lebih kecil dari massa jenis air laut. Sebaliknya, paku besi pejal tidak memiliki rongga udara sehingga massa jenisnya murni massa jenis baja (7.800 kg/m³) yang melebihi air.<br><br>' +
                  '<b>5.</b> Tekanan hidrostatis di dasar benda P₂ = &rho;_f &middot; g &middot; h₂ lebih besar dari tekanan di atas benda P₁ = &rho;_f &middot; g &middot; h₁ karena h₂ > h₁. Gaya ke atas F₂ = P₂ &middot; A dan gaya ke bawah F₁ = P₁ &middot; A. Resultan gaya vertikal ke atas adalah: <b>Fₐ = F₂ - F₁ = &rho;_f &middot; g &middot; (h₂ - h₁) &middot; A = &rho;_f &middot; g &middot; V_bf</b>.' +
                '</div>' +
              '</div>' +
              '<div id="ar-analisis-controls" style="display:flex; justify-content:space-between; margin-top:5px; align-items:center;">' +
                '<button id="arBtnAnalisisPrev" style="background:#262D35; color:#BAC7D5; border:1px solid #3A4451; padding:10px 20px; border-radius:6px; font-weight:bold; font-size:20px; cursor:pointer; opacity:0.5; pointer-events:none;">&#10094; Sebelumnya</button>' +
                '<button id="arBtnAnalisisNext" style="background:#1E5084; color:#fff; border:none; padding:10px 20px; border-radius:6px; font-weight:bold; font-size:20px; cursor:pointer;">Selanjutnya &#10095;</button>' +
                '<button id="arBtnAnalisisSelesai" style="display:none; background:#3DDC84; color:#0a1316; border:none; padding:10px 20px; border-radius:6px; font-weight:bold; font-size:20px; cursor:pointer;">SELESAI &#10003;</button>' +
              '</div>' +
            '</div>' +

            '<!-- Panel Evaluasi -->' +
            '<div id="ar-panel-evaluasi" class="ar-lkpd-panel" style="display:none; flex-direction:column; gap:0.8em; height:100%;">' +
              '<div style="display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.2); border-radius:8px; padding:10px 15px;">' +
                '<div style="color:#3FD6FF; font-size:22px; font-weight:bold;">TUGAS EVALUASI</div>' +
                '<div style="color:#EDEFF1; font-size:22px; font-weight:bold;" id="arEvaluasiSlideIndicator">Slide 1 / 4</div>' +
              '</div>' +
              '<div class="ar-slides-wrap" id="ar-evaluasi-slides-container" style="flex:1; display:flex; flex-direction:column; overflow:hidden;">' +
                '<div id="ar-evaluasi-slide-1" class="ar-slide-item" style="flex:1; display:flex; flex-direction:column;">' +
                  '<div style="font-size:19px; line-height:1.5; color:#EDEFF1; text-align:justify; margin-bottom:15px;">' +
                    '1. Besar gaya apung Archimedes yang dialami suatu benda yang tercelup seluruhnya ke dalam zat cair bergantung pada kedalaman posisi benda di bawah permukaan zat cair.' +
                  '</div>' +
                  '<div style="display:flex; gap:10px; margin-top:20px;">' +
                    '<button class="ar-eval-btn" data-slide="1" data-ans="Benar" style="flex:1; background:#262D35; color:#EDEFF1; border:1px solid #3A4451; border-radius:8px; padding:15px; font-size:22px; font-weight:bold; cursor:pointer;">BENAR</button>' +
                    '<button class="ar-eval-btn" data-slide="1" data-ans="Salah" style="flex:1; background:#262D35; color:#EDEFF1; border:1px solid #3A4451; border-radius:8px; padding:15px; font-size:22px; font-weight:bold; cursor:pointer;">SALAH</button>' +
                  '</div>' +
                '</div>' +
                '<div id="ar-evaluasi-slide-2" class="ar-slide-item" style="flex:1; display:none; flex-direction:column;">' +
                  '<div style="font-size:19px; line-height:1.5; color:#EDEFF1; text-align:justify; margin-bottom:15px;">' +
                    '2. Suatu benda terapung pada zat cair jika massa jenis rata-rata benda tersebut lebih kecil daripada massa jenis zat cair tempatnya berada.' +
                  '</div>' +
                  '<div style="display:flex; gap:10px; margin-top:20px;">' +
                    '<button class="ar-eval-btn" data-slide="2" data-ans="Benar" style="flex:1; background:#262D35; color:#EDEFF1; border:1px solid #3A4451; border-radius:8px; padding:15px; font-size:22px; font-weight:bold; cursor:pointer;">BENAR</button>' +
                    '<button class="ar-eval-btn" data-slide="2" data-ans="Salah" style="flex:1; background:#262D35; color:#EDEFF1; border:1px solid #3A4451; border-radius:8px; padding:15px; font-size:22px; font-weight:bold; cursor:pointer;">SALAH</button>' +
                  '</div>' +
                '</div>' +
                '<div id="ar-evaluasi-slide-3" class="ar-slide-item" style="flex:1; display:none; flex-direction:column;">' +
                  '<div style="font-size:19px; line-height:1.5; color:#EDEFF1; text-align:justify; margin-bottom:10px;">' +
                    '3. Sebuah balok logam memiliki berat 25 N di udara. Ketika seluruh balok dicelupkan ke dalam air, neraca pegas menunjukkan angka 18 N. Berapakah besar gaya apung Archimedes yang dialami balok dalam satuan Newton? (Ketikkan angkanya saja)' +
                  '</div>' +
                  '<textarea placeholder="Ketik angka jawaban Anda di sini (misal: 7)..." style="flex:none; height:80px; min-height:80px; width:100%; margin-bottom:10px; background:rgba(0,0,0,0.2); border:1px solid #3A4451; border-radius:8px; padding:10px 15px; color:#EDEFF1; font-family:inherit; font-size:20px; text-align:justify; resize:none; outline:none; line-height:1.5;"></textarea>' +
                '</div>' +
                '<div id="ar-evaluasi-slide-4" class="ar-slide-item" style="flex:1; display:none; flex-direction:column;">' +
                  '<div style="font-size:19px; line-height:1.5; color:#EDEFF1; text-align:justify; margin-bottom:10px;">' +
                    '4. Sebuah benda memiliki volume 0,002 m³ tercelup seluruhnya ke dalam minyak bermassa jenis 800 kg/m³. Jika percepatan gravitasi g = 10 m/s², berapakah besar gaya apung yang dialami benda dalam satuan Newton? (Ketikkan angkanya saja)' +
                  '</div>' +
                  '<textarea placeholder="Ketik angka jawaban Anda di sini (misal: 16)..." style="flex:none; height:80px; min-height:80px; width:100%; margin-bottom:10px; background:rgba(0,0,0,0.2); border:1px solid #3A4451; border-radius:8px; padding:10px 15px; color:#EDEFF1; font-family:inherit; font-size:20px; text-align:justify; resize:none; outline:none; line-height:1.5;"></textarea>' +
                '</div>' +
              '</div>' +
              '<div id="ar-evaluasi-feedback" class="modern-scroll" style="display:none; flex:1; overflow-y:auto; padding:15px; background:rgba(61,220,132,0.1); border:1px solid #3DDC84; border-radius:8px; margin-top:5px;">' +
                '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px; gap:10px; flex-wrap:wrap;">' +
                  '<h3 style="color:#3DDC84; font-size:22px; margin:0; white-space:nowrap;">KUNCI JAWABAN &amp; PEMBAHASAN</h3>' +
                  '<button id="arBtnCekJawabanEvaluasi" style="background:#1E5084; color:#fff; border:none; padding:8px 16px; border-radius:6px; font-weight:bold; font-size:16px; cursor:pointer;">Cek Jawaban Saya</button>' +
                '</div>' +
                '<div style="font-size:18px; color:#EDEFF1; line-height:1.6; text-align:justify;">' +
                  '<b>1. SALAH</b>. Gaya apung pada benda yang tercelup seluruhnya tidak bergantung pada kedalaman, melainkan hanya pada massa jenis fluida dan volume benda (Fₐ = &rho;_f &middot; g &middot; V_bf).<br><br>' +
                  '<b>2. BENAR</b>. Benda akan terapung jika &rho;_benda < &rho;_fluida, melayang jika &rho;_benda = &rho;_fluida, dan tenggelam jika &rho;_benda > &rho;_fluida.<br><br>' +
                  '<b>3. 7 N</b>. Fₐ = Wᵤ - Wₛₑₘᵤ = 25 N - 18 N = <b>7 N</b>.<br><br>' +
                  '<b>4. 16 N</b>. Fₐ = &rho;_f &middot; g &middot; V_bf = 800 &times; 10 &times; 0,002 = <b>16 N</b>.' +
                '</div>' +
              '</div>' +
              '<div id="ar-evaluasi-controls" style="display:flex; justify-content:space-between; margin-top:5px; align-items:center;">' +
                '<button id="arBtnEvaluasiPrev" style="background:#262D35; color:#BAC7D5; border:1px solid #3A4451; padding:10px 20px; border-radius:6px; font-weight:bold; font-size:20px; cursor:pointer; opacity:0.5; pointer-events:none;">&#10094; Sebelumnya</button>' +
                '<button id="arBtnEvaluasiNext" style="background:#1E5084; color:#fff; border:none; padding:10px 20px; border-radius:6px; font-weight:bold; font-size:20px; cursor:pointer;">Selanjutnya &#10095;</button>' +
                '<button id="arBtnEvaluasiSelesai" style="display:none; background:#3DDC84; color:#0a1316; border:none; padding:10px 20px; border-radius:6px; font-weight:bold; font-size:20px; cursor:pointer;">SELESAI &#10003;</button>' +
              '</div>' +
            '</div>' +

            '<!-- Panel Kesimpulan -->' +
            '<div id="ar-panel-kesimpulan" class="ar-lkpd-panel" style="display:none; flex-direction:column; gap:0.8em; height:100%;">' +
              '<div style="font-size:19px; line-height:1.6; color:#EDEFF1; font-weight:bold; text-align:justify;">' +
                'Berdasarkan tujuan kegiatan dan percobaan virtual hukum Archimedes, tuliskan kesimpulan akhir Anda mengenai faktor yang menentukan gaya apung serta syarat terjadinya kondisi terapung, melayang, dan tenggelam!' +
              '</div>' +
              '<textarea id="arKesimpulanTextarea" placeholder="Ketik kesimpulan di sini..." style="flex:1; width:100%; background:rgba(0,0,0,0.2); border:1px solid #3A4451; border-radius:8px; padding:14px; color:#EDEFF1; font-family:inherit; font-size:18px; resize:none; outline:none; line-height:1.5;"></textarea>' +
              '<div style="display:flex; justify-content:flex-end; margin-top:5px;">' +
                '<button id="arBtnSimpanKesimpulan" style="background:#28a745; color:#fff; border:none; padding:10px 20px; border-radius:6px; font-weight:bold; font-size:18px; cursor:pointer; box-shadow:0 4px 6px rgba(0,0,0,0.3);">SIMPAN KESIMPULAN &#10003;</button>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +

        '<!-- Modals -->' +
        '<div id="arCustomAlertModal" style="display:none; position:absolute; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:10000; justify-content:center; align-items:center;">' +
          '<div style="background:#1C2228; border:2px solid #E06C75; border-radius:12px; padding:30px; width:90%; max-width:700px; text-align:center; box-shadow:0 10px 30px rgba(0,0,0,0.5);">' +
            '<div style="font-size:48px; color:#E06C75; margin-bottom:15px;">&#9888;</div>' +
            '<h3 style="color:#EDEFF1; font-size:24px; margin-bottom:15px;">Belum Lengkap!</h3>' +
            '<div id="arCustomAlertText" style="color:#BAC7D5; font-size:18px; line-height:1.5; margin-bottom:30px;"></div>' +
            '<button id="arBtnCloseAlert" style="background:#E06C75; color:#fff; border:none; padding:12px 25px; border-radius:8px; font-weight:bold; font-size:18px; cursor:pointer;">OK, Saya Lengkapi</button>' +
          '</div>' +
        '</div>' +

        '<div id="arSelesaiConfirmModal" style="display:none; position:absolute; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:9999; justify-content:center; align-items:center;">' +
          '<div style="background:#1C2228; border:2px solid #3A4451; border-radius:12px; padding:30px; width:80%; max-width:500px; text-align:center; box-shadow:0 10px 30px rgba(0,0,0,0.5);">' +
            '<div style="font-size:48px; color:#F5C84B; margin-bottom:15px;">&#9888;</div>' +
            '<h3 style="color:#EDEFF1; font-size:24px; margin-bottom:15px;">Konfirmasi Penyelesaian</h3>' +
            '<p style="color:#BAC7D5; font-size:18px; line-height:1.5; margin-bottom:30px;">Anda tidak dapat merevisi jawaban setelah menekan tombol selesaikan. Apakah Anda yakin ingin melanjutkan?</p>' +
            '<div style="display:flex; justify-content:center; gap:15px;">' +
              '<button id="arBtnBatalSelesai" style="background:#262D35; color:#BAC7D5; border:1px solid #3A4451; padding:12px 25px; border-radius:8px; font-weight:bold; font-size:18px; cursor:pointer;">Edit</button>' +
              '<button id="arBtnKonfirmasiSelesai" style="background:#3DDC84; color:#0a1316; border:none; padding:12px 25px; border-radius:8px; font-weight:bold; font-size:18px; cursor:pointer;">Selesaikan</button>' +
            '</div>' +
          '</div>' +
        '</div>' +

        '<div id="arSuccessAlertModal" style="display:none; position:absolute; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:10000; justify-content:center; align-items:center;">' +
          '<div style="background:#1C2228; border:2px solid #3DDC84; border-radius:12px; padding:30px; width:80%; max-width:400px; text-align:center; box-shadow:0 10px 30px rgba(0,0,0,0.5);">' +
            '<div style="font-size:48px; color:#3DDC84; margin-bottom:15px;">&#10003;</div>' +
            '<h3 style="color:#EDEFF1; font-size:24px; margin-bottom:15px;">Berhasil!</h3>' +
            '<p id="arSuccessAlertText" style="color:#BAC7D5; font-size:18px; line-height:1.5; margin-bottom:30px;"></p>' +
            '<button id="arBtnCloseSuccess" style="background:#3DDC84; color:#0a1316; border:none; padding:12px 25px; border-radius:8px; font-weight:bold; font-size:18px; cursor:pointer;">Tutup</button>' +
          '</div>' +
        '</div>' +

        '<div id="arConfirmCheckPopup" style="display:none; position:absolute; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:9999; justify-content:center; align-items:center;">' +
          '<div style="background:#1C2228; border:2px solid #3A4451; border-radius:12px; padding:30px; width:80%; max-width:500px; text-align:center; box-shadow:0 10px 30px rgba(0,0,0,0.5);">' +
            '<div style="font-size:48px; color:#F5C84B; margin-bottom:15px;">&#9888;</div>' +
            '<h3 style="color:#EDEFF1; font-size:24px; margin-bottom:15px;">Konfirmasi Cek Jawaban</h3>' +
            '<p style="color:#BAC7D5; font-size:18px; line-height:1.5; margin-bottom:30px;">Apakah Anda yakin ingin mengecek jawaban?<br><br><span style="color:#3FD6FF;">Nilai yang sudah dicek tidak bisa dirubah lagi.</span></p>' +
            '<div style="display:flex; justify-content:center; gap:15px;">' +
              '<button id="arBtnCancelCheck" style="background:#262D35; color:#BAC7D5; border:1px solid #3A4451; padding:12px 25px; border-radius:8px; font-weight:bold; font-size:18px; cursor:pointer;">EDIT</button>' +
              '<button id="arBtnConfirmCheck" style="background:#3FD6FF; color:#0a1316; border:none; padding:12px 25px; border-radius:8px; font-weight:bold; font-size:18px; cursor:pointer;">TETAP CEK</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';

    /* ================= LOGIKA INTERAKTIF LKPD ================= */
    window.recordToLkpdArchimedes = function () {
      const msg = $('arRecordMsg');
      const p = calcPhysics();
      if (sm.mode === 'udara') {
        if (msg) {
          msg.style.color = '#F5C84B';
          msg.textContent = 'Lakukan penimbangan di cairan (Mode 2 atau 3) terlebih dahulu sebelum mencatat ke LKPD!';
          setTimeout(function () { if (msg) msg.textContent = ''; }, 3000);
        }
        return;
      }

      const inpWu = $('arSimWu'), inpWs = $('arSimWsemu'), inpFa = $('arSimFa');
      const valWu = inpWu ? parseFloat(inpWu.value) : NaN;
      const valWs = inpWs ? parseFloat(inpWs.value) : NaN;
      const valFa = inpFa ? parseFloat(inpFa.value) : NaN;

      if (isNaN(valWu) || isNaN(valWs) || isNaN(valFa)) {
        if (msg) {
          msg.style.color = '#F5C84B';
          msg.textContent = 'Harap isi Wᵤ, Wₛₑₘᵤ, dan hitung Fₐ (atau klik "📋 Salin Bacaan Neraca")!';
          setTimeout(function () { if (msg) msg.textContent = ''; }, 3000);
        }
        return;
      }

      const tbody = $('ar-lkpd-tbody');
      if (!tbody) return;

      const rows = tbody.querySelectorAll('tr');
      let targetRow = null;
      for (let r = 0; r < rows.length; r++) {
        const rowFa = rows[r].querySelector('input.ar-inp-fac');
        if (!rowFa || rowFa.value.trim() === '') {
          targetRow = rows[r];
          break;
        }
      }

      if (!targetRow) {
        if (msg) {
          msg.style.color = '#F5C84B';
          msg.textContent = 'Tabel LKPD sudah penuh (5 baris pengamatan)!';
          setTimeout(function () { if (msg) msg.textContent = ''; }, 3000);
        }
        return;
      }

      const curB = BENDA[sm.bendaIdx];
      const curF = FLUIDS[sm.fluidIdx];
      // Fa teoritis untuk volume 100 cm3
      const faReal = parseFloat((curF.rho * G_ACC * 1e-4).toFixed(2));

      targetRow.dataset.benda = curB.icon + ' ' + curB.name;
      targetRow.dataset.fluid = curF.icon + ' ' + curF.name;
      targetRow.dataset.wu = valWu;
      targetRow.dataset.ws = valWs;
      targetRow.dataset.fac = valFa;
      targetRow.dataset.fas = faReal;
      targetRow.dataset.checked = 'false';

      const rowB = targetRow.querySelector('.ar-inp-benda');
      const rowF = targetRow.querySelector('.ar-inp-fluid');
      const rowWu = targetRow.querySelector('.ar-inp-wu');
      const rowWs = targetRow.querySelector('.ar-inp-ws');
      const rowFac = targetRow.querySelector('.ar-inp-fac');
      const rowFas = targetRow.querySelector('.ar-inp-fas');
      const statusCell = targetRow.querySelector('.ar-cell-status');

      if (rowB) rowB.value = curB.icon + ' ' + curB.name;
      if (rowF) rowF.value = curF.name;
      if (rowWu) rowWu.value = valWu;
      if (rowWs) rowWs.value = valWs;
      if (rowFac) rowFac.value = valFa;
      if (rowFas) rowFas.value = '';
      if (statusCell) statusCell.innerHTML = '—';

      if (msg) {
        msg.style.color = '#3DDC84';
        msg.textContent = '✓ Berhasil dicatat ke LKPD baris ' + targetRow.dataset.row + '!';
        setTimeout(function () { if (msg) msg.textContent = ''; }, 3500);
      }
      if (typeof window.playSfx === 'function') window.playSfx('sfxBintang');
    };

    // Tab Switch Kanan (Analisis / Evaluasi / Kesimpulan)
    function switchArLkpd(tabId) {
      ['analisis', 'evaluasi', 'kesimpulan'].forEach(function (id) {
        const p = $('ar-panel-' + id);
        if (p) p.style.display = 'none';
        const b = $('ar-btn-' + id);
        if (b) {
          b.style.background = '#262D35';
          b.style.border = '1px solid #3A4451';
          b.style.boxShadow = 'none';
          b.style.color = '#BAC7D5';
        }
      });
      const targetP = $('ar-panel-' + tabId);
      if (targetP) targetP.style.display = 'flex';
      const targetB = $('ar-btn-' + tabId);
      if (targetB) {
        targetB.style.background = 'rgba(63,214,255,0.2)';
        targetB.style.border = '1px solid rgba(63,214,255,0.8)';
        targetB.style.boxShadow = '0 0 10px rgba(63,214,255,0.3)';
        targetB.style.color = '#3FD6FF';
      }
    }

    const bAna = $('ar-btn-analisis'), bEva = $('ar-btn-evaluasi'), bKes = $('ar-btn-kesimpulan');
    if (bAna) bAna.onclick = function () { switchArLkpd('analisis'); };
    if (bEva) bEva.onclick = function () { switchArLkpd('evaluasi'); };
    if (bKes) bKes.onclick = function () { switchArLkpd('kesimpulan'); };

    // Slide Analisis
    let currentArAnalisis = 1;
    const totalArAnalisis = 5;
    let isCheckingArAnalisis = false;

    function goToArAnalisisSlide(target) {
      const prev = $('ar-analisis-slide-' + currentArAnalisis);
      if (prev) prev.style.display = 'none';
      currentArAnalisis = target;
      const nxt = $('ar-analisis-slide-' + currentArAnalisis);
      if (nxt) nxt.style.display = 'flex';
      const ind = $('arAnalisisSlideIndicator');
      if (ind) ind.innerText = 'Slide ' + currentArAnalisis + ' / ' + totalArAnalisis;

      const pBtn = $('arBtnAnalisisPrev');
      if (pBtn) {
        pBtn.style.opacity = currentArAnalisis === 1 ? '0.5' : '1';
        pBtn.style.pointerEvents = currentArAnalisis === 1 ? 'none' : 'auto';
      }
      const nBtn = $('arBtnAnalisisNext');
      const sBtn = $('arBtnAnalisisSelesai');
      if (currentArAnalisis === totalArAnalisis) {
        if (nBtn) nBtn.style.display = 'none';
        if (sBtn) {
          sBtn.style.display = 'block';
          sBtn.innerHTML = isCheckingArAnalisis ? 'PEMBAHASAN &#8617;' : 'SELESAI &#10003;';
        }
      } else {
        if (nBtn) nBtn.style.display = 'block';
        if (sBtn) sBtn.style.display = 'none';
      }
    }

    const btnAnaPrev = $('arBtnAnalisisPrev'), btnAnaNext = $('arBtnAnalisisNext'), btnAnaSel = $('arBtnAnalisisSelesai');
    if (btnAnaPrev) btnAnaPrev.onclick = function () { if (currentArAnalisis > 1) goToArAnalisisSlide(currentArAnalisis - 1); };
    if (btnAnaNext) btnAnaNext.onclick = function () { if (currentArAnalisis < totalArAnalisis) goToArAnalisisSlide(currentArAnalisis + 1); };
    if (btnAnaSel) btnAnaSel.onclick = function () {
      if (isCheckingArAnalisis) {
        $('ar-analisis-slides-container').style.display = 'none';
        $('ar-analisis-controls').style.display = 'none';
        $('arAnalisisSlideIndicator').style.display = 'none';
        $('ar-analisis-feedback').style.display = 'block';
        return;
      }
      const tas = $('ar-analisis-slides-container').querySelectorAll('textarea');
      for (let i = 0; i < tas.length; i++) {
        if (tas[i].value.trim() === '') {
          showArAlert('Harap jawab semua pertanyaan (Slide ' + (i + 1) + ' belum terjawab) sebelum menyelesaikan!');
          goToArAnalisisSlide(i + 1);
          return;
        }
      }
      pendingArSelesai = 'analisis';
      $('arSelesaiConfirmModal').style.display = 'flex';
    };

    const btnCekAna = $('arBtnCekJawabanAnalisis');
    if (btnCekAna) btnCekAna.onclick = function () {
      isCheckingArAnalisis = true;
      const tas = $('ar-analisis-slides-container').querySelectorAll('textarea');
      tas.forEach(function (ta) { ta.setAttribute('readonly', true); });
      $('ar-analisis-feedback').style.display = 'none';
      $('ar-analisis-slides-container').style.display = 'flex';
      $('ar-analisis-controls').style.display = 'flex';
      $('arAnalisisSlideIndicator').style.display = 'block';
      goToArAnalisisSlide(1);
    };

    // Slide Evaluasi
    let currentArEvaluasi = 1;
    const totalArEvaluasi = 4;
    let arEvaluasiAnswers = {};
    let isCheckingArEvaluasi = false;

    $('arLkpd').addEventListener('click', function (e) {
      const b = e.target.closest('.ar-eval-btn');
      if (!b) return;
      const s = b.dataset.slide, a = b.dataset.ans;
      arEvaluasiAnswers[s] = a;
      const container = $('ar-evaluasi-slide-' + s);
      if (container) {
        container.querySelectorAll('.ar-eval-btn').forEach(function (btn) {
          btn.style.background = '#262D35';
          btn.style.border = '1px solid #3A4451';
          btn.style.color = '#EDEFF1';
        });
      }
      b.style.background = 'rgba(63,214,255,0.3)';
      b.style.border = '1px solid #3FD6FF';
      b.style.color = '#fff';
    });

    function goToArEvaluasiSlide(target) {
      const prev = $('ar-evaluasi-slide-' + currentArEvaluasi);
      if (prev) prev.style.display = 'none';
      currentArEvaluasi = target;
      const nxt = $('ar-evaluasi-slide-' + currentArEvaluasi);
      if (nxt) nxt.style.display = 'flex';
      const ind = $('arEvaluasiSlideIndicator');
      if (ind) ind.innerText = 'Slide ' + currentArEvaluasi + ' / ' + totalArEvaluasi;

      const pBtn = $('arBtnEvaluasiPrev');
      if (pBtn) {
        pBtn.style.opacity = currentArEvaluasi === 1 ? '0.5' : '1';
        pBtn.style.pointerEvents = currentArEvaluasi === 1 ? 'none' : 'auto';
      }
      const nBtn = $('arBtnEvaluasiNext');
      const sBtn = $('arBtnEvaluasiSelesai');
      if (currentArEvaluasi === totalArEvaluasi) {
        if (nBtn) nBtn.style.display = 'none';
        if (sBtn) {
          sBtn.style.display = 'block';
          sBtn.innerHTML = isCheckingArEvaluasi ? 'PEMBAHASAN &#8617;' : 'SELESAI &#10003;';
        }
      } else {
        if (nBtn) nBtn.style.display = 'block';
        if (sBtn) sBtn.style.display = 'none';
      }
    }

    const btnEvaPrev = $('arBtnEvaluasiPrev'), btnEvaNext = $('arBtnEvaluasiNext'), btnEvaSel = $('arBtnEvaluasiSelesai');
    if (btnEvaPrev) btnEvaPrev.onclick = function () { if (currentArEvaluasi > 1) goToArEvaluasiSlide(currentArEvaluasi - 1); };
    if (btnEvaNext) btnEvaNext.onclick = function () { if (currentArEvaluasi < totalArEvaluasi) goToArEvaluasiSlide(currentArEvaluasi + 1); };
    if (btnEvaSel) btnEvaSel.onclick = function () {
      if (isCheckingArEvaluasi) {
        $('ar-evaluasi-slides-container').style.display = 'none';
        $('ar-evaluasi-controls').style.display = 'none';
        $('arEvaluasiSlideIndicator').style.display = 'none';
        $('ar-evaluasi-feedback').style.display = 'block';
        return;
      }
      if (!arEvaluasiAnswers['1']) { showArAlert('Soal nomor 1 belum dijawab!'); goToArEvaluasiSlide(1); return; }
      if (!arEvaluasiAnswers['2']) { showArAlert('Soal nomor 2 belum dijawab!'); goToArEvaluasiSlide(2); return; }
      const tas = $('ar-evaluasi-slides-container').querySelectorAll('textarea');
      if (tas[0] && tas[0].value.trim() === '') { showArAlert('Soal nomor 3 belum diisi!'); goToArEvaluasiSlide(3); return; }
      if (tas[1] && tas[1].value.trim() === '') { showArAlert('Soal nomor 4 belum diisi!'); goToArEvaluasiSlide(4); return; }

      pendingArSelesai = 'evaluasi';
      $('arSelesaiConfirmModal').style.display = 'flex';
    };

    const btnCekEva = $('arBtnCekJawabanEvaluasi');
    if (btnCekEva) btnCekEva.onclick = function () {
      isCheckingArEvaluasi = true;
      const tas = $('ar-evaluasi-slides-container').querySelectorAll('textarea');
      tas.forEach(function (ta) { ta.setAttribute('readonly', true); });
      $('ar-evaluasi-feedback').style.display = 'none';
      $('ar-evaluasi-slides-container').style.display = 'flex';
      $('ar-evaluasi-controls').style.display = 'flex';
      $('arEvaluasiSlideIndicator').style.display = 'block';
      goToArEvaluasiSlide(1);
    };

    // Modal Helpers
    let pendingArSelesai = null;
    function showArAlert(msg) {
      $('arCustomAlertText').innerHTML = msg;
      $('arCustomAlertModal').style.display = 'flex';
    }
    $('arBtnCloseAlert').onclick = function () { $('arCustomAlertModal').style.display = 'none'; };
    $('arBtnBatalSelesai').onclick = function () { $('arSelesaiConfirmModal').style.display = 'none'; };
    $('arBtnCloseSuccess').onclick = function () { $('arSuccessAlertModal').style.display = 'none'; };

    $('arBtnKonfirmasiSelesai').onclick = function () {
      $('arSelesaiConfirmModal').style.display = 'none';
      if (pendingArSelesai === 'analisis') {
        $('ar-analisis-slides-container').style.display = 'none';
        $('ar-analisis-controls').style.display = 'none';
        $('arAnalisisSlideIndicator').style.display = 'none';
        $('ar-analisis-feedback').style.display = 'block';
      } else if (pendingArSelesai === 'evaluasi') {
        $('ar-evaluasi-slides-container').style.display = 'none';
        $('ar-evaluasi-controls').style.display = 'none';
        $('arEvaluasiSlideIndicator').style.display = 'none';
        $('ar-evaluasi-feedback').style.display = 'block';
      }
      $('arSuccessAlertText').textContent = 'Jawaban tugas ' + pendingArSelesai + ' berhasil disimpan!';
      $('arSuccessAlertModal').style.display = 'flex';
    };

    // Simpan Kesimpulan
    $('arBtnSimpanKesimpulan').onclick = function () {
      const val = $('arKesimpulanTextarea').value.trim();
      if (!val) {
        showArAlert('Kesimpulan masih kosong! Harap tuliskan kesimpulan Anda.');
        return;
      }
      $('arSuccessAlertText').textContent = 'Kesimpulan berhasil disimpan ke dalam laporan LKPD!';
      $('arSuccessAlertModal').style.display = 'flex';
    };

    // Cek Jawaban Tabel
    $('arCekJawabanBtn').onclick = function () {
      const tbody = $('ar-lkpd-tbody');
      const rows = tbody.querySelectorAll('tr');
      let filledCount = 0;
      rows.forEach(function (r) {
        const inpFac = r.querySelector('.ar-inp-fac');
        if (inpFac && inpFac.value.trim() !== '') filledCount++;
      });
      if (filledCount === 0) {
        showArAlert('Belum ada data pengamatan yang dicatat ke tabel LKPD!');
        return;
      }
      $('arConfirmCheckPopup').style.display = 'flex';
    };

    $('arBtnCancelCheck').onclick = function () { $('arConfirmCheckPopup').style.display = 'none'; };
    $('arBtnConfirmCheck').onclick = function () {
      $('arConfirmCheckPopup').style.display = 'none';
      const tbody = $('ar-lkpd-tbody');
      const rows = tbody.querySelectorAll('tr');
      rows.forEach(function (r) {
        const valWu = parseFloat(r.querySelector('.ar-inp-wu').value) || 0;
        const valWs = parseFloat(r.querySelector('.ar-inp-ws').value) || 0;
        const valFac = parseFloat(r.querySelector('.ar-inp-fac').value) || 0;
        const faReal = parseFloat((valWu - valWs).toFixed(2));

        const inpFas = r.querySelector('.ar-inp-fas');
        const stCell = r.querySelector('.ar-cell-status');
        if (valFac > 0) {
          inpFas.value = faReal;
          const diff = Math.abs(valFac - faReal);
          if (diff <= 0.05) {
            r.querySelector('.ar-inp-fac').parentElement.classList.add('correct');
            stCell.innerHTML = '<span style="color:#3DDC84">✓ Benar</span>';
          } else if (diff <= 0.2) {
            r.querySelector('.ar-inp-fac').parentElement.classList.add('close');
            stCell.innerHTML = '<span style="color:#FFB238">≈ Mendekati</span>';
          } else {
            r.querySelector('.ar-inp-fac').parentElement.classList.add('wrong');
            stCell.innerHTML = '<span style="color:#E06C75">✗ Salah</span>';
          }
        }
      });
    };

    // Cetak Laporan
    $('arCetakLaporanBtn').onclick = function () {
      const nama = $('arNamaInput').value.trim();
      const kelas = $('arKelasInput').value.trim();
      if (!nama || !kelas) {
        showArAlert('Harap isi Nama Lengkap dan Kelas terlebih dahulu di bagian atas!');
        return;
      }

      let pr = document.getElementById('print-report');
      if (!pr) {
        pr = document.createElement('div');
        pr.id = 'print-report';
        pr.style.display = 'none';
        document.body.appendChild(pr);
      }

      const d = new Date();
      const months = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
      const timeStr = d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear();

      let tblHtml = '<table style="width:100%; border-collapse:collapse; margin-bottom:10px; font-size:12px;">' +
        '<thead><tr style="background:#f1f5f9;"><th>No</th><th>Benda Uji</th><th>Fluida</th><th>Berat Udara Wᵤ (N)</th><th>Berat Semu Wₛₑₘᵤ (N)</th><th>Fₐ Hasil Ukur (N)</th><th>Fₐ Sebenarnya (N)</th></tr></thead><tbody>';
      const rows = $('ar-lkpd-tbody').querySelectorAll('tr');
      rows.forEach(function (r) {
        const b = r.querySelector('.ar-inp-benda').value || '-';
        const f = r.querySelector('.ar-inp-fluid').value || '-';
        const wu = r.querySelector('.ar-inp-wu').value || '-';
        const ws = r.querySelector('.ar-inp-ws').value || '-';
        const fac = r.querySelector('.ar-inp-fac').value || '-';
        const fas = r.querySelector('.ar-inp-fas').value || (r.dataset.fas || '-');
        tblHtml += '<tr><td style="text-align:center;">' + r.dataset.row + '</td><td>' + b + '</td><td>' + f + '</td><td style="text-align:center;">' + wu + '</td><td style="text-align:center;">' + ws + '</td><td style="text-align:center;">' + fac + '</td><td style="text-align:center;">' + fas + '</td></tr>';
      });
      tblHtml += '</tbody></table>';

      const kes = $('arKesimpulanTextarea').value.trim() || '-';

      pr.innerHTML = '<div class="print-page">' +
        '<div class="header-box"><h1>LAPORAN VIRTUAL EXPERIMENT</h1><h2>HUKUM ARCHIMEDES</h2><p>LABORATORIUM FISIKA DIGITAL &bull; GAYA APUNG &amp; BERAT SEMU</p></div>' +
        '<div class="identity-box"><div class="identity-item"><span class="identity-label">NAMA MURID</span><span class="identity-value">' + nama + '</span></div><div class="identity-item"><span class="identity-label">KELAS</span><span class="identity-value">' + kelas + '</span></div></div>' +
        '<div class="section"><div class="section-header color-1"><div class="section-num">01</div><div class="section-title">TUJUAN KEGIATAN</div></div><div class="content-box">Membuktikan Hukum Archimedes bahwa gaya apung ke atas (Fₐ = Wᵤ - Wₛₑₘᵤ) sama dengan berat fluida yang dipindahkan (Fₐ = &rho;_f &middot; g &middot; V_bf) serta menyelidiki syarat terapung, melayang, dan tenggelam.</div></div>' +
        '<div class="section"><div class="section-header color-2"><div class="section-num">02</div><div class="section-title">DATA HASIL PENGAMATAN</div></div><div>' + tblHtml + '</div></div>' +
        '<div class="section"><div class="section-header color-5"><div class="section-num">03</div><div class="section-title">KESIMPULAN</div></div><div class="content-box qa-box"><div class="qa-a">' + kes + '</div></div></div>' +
        '<div class="footer"><div>Virtual Experiment &mdash; Hukum Archimedes<br><span style="color:#aaa;">' + timeStr + '</span></div><div class="signature">Laporan dibuat oleh:<br><div class="signature-name">' + nama + '</div><div>' + kelas + '</div><div>' + timeStr + '</div></div></div>' +
      '</div>';

      window.print();
    };
  }
});
