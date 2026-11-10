/* ============================================================
   MODUL TEKANAN HIDROSTATIS
   Tab: Teori · Prosedur · Simulasi (pipa-U ala PhET) · LKPD
   Hukum utama hidrostatis: ρ1·h1 = ρ2·h2
   ============================================================ */
MateriLab.register('hidrostatis', {
  render: function (c, api) {
    if (!document.getElementById('hsStyle')) {
      const st = document.createElement('style'); st.id = 'hsStyle'; st.textContent = `
      .hs{position:absolute;inset:0;display:flex;flex-direction:column;color:#EDEFF1;font-family:'Inter',-apple-system,BlinkMacSystemFont,'SF Pro Display',sans-serif;background:#1C2228}
      .hs-pane{flex:1;min-height:0;display:none;padding:16px 24px;overflow:hidden;position:relative}
      .hs-pane.on{display:flex;flex-direction:column;gap:12px}
      .hs-card{background:rgba(255,255,255,0.04);backdrop-filter:blur(8px);border:1px solid rgba(63,214,255,0.18);border-left:4px solid #7FBCE3;border-radius:12px;padding:12px 16px;text-align:justify;position:relative;display:flex;flex-direction:column;gap:6px;box-shadow:0 6px 20px rgba(0,0,0,0.25);flex:1 1 0;min-height:0;overflow-y:auto;scrollbar-width:thin;scrollbar-color:rgba(127,188,227,0.18) transparent}
      .hs-card::-webkit-scrollbar{width:4px}
      .hs-card::-webkit-scrollbar-track{background:transparent}
      .hs-card::-webkit-scrollbar-thumb{background:rgba(127,188,227,0.18);border-radius:4px;transition:background 0.3s}
      .hs-card:hover::-webkit-scrollbar-thumb{background:rgba(127,188,227,0.45)}
      .hs-card::-webkit-scrollbar-thumb:hover{background:rgba(127,188,227,0.75)}
      .hs-h{font-size:18px;font-weight:700;color:#7FBCE3;border-left:4px solid #5FA8D6;padding-left:10px;margin-bottom:4px;text-transform:uppercase;text-align:left;letter-spacing:0.05em;flex-shrink:0}
      .hs-t{font-size:18px;line-height:1.6;color:#EDEFF1;text-align:justify}.hs-t b{color:#7FBCE3;font-weight:700}
      .hs-formula{font-family:'Courier New',monospace;font-size:24px;font-weight:800;color:#7FBCE3;text-align:center;padding:12px 16px;background:rgba(0,0,0,0.5);border:1px dashed rgba(63,214,255,0.35);border-radius:12px;letter-spacing:.06em;text-shadow:0 0 8px rgba(63,214,255,0.4);flex-shrink:0}
      
      /* TEORI MODERN & TIMELINE */
      .hs-teori-wrap{display:flex;flex-direction:column;flex:1;min-height:0;gap:10px}
      .hs-teori-hdr{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(63,214,255,0.2);padding-bottom:10px;flex-shrink:0;position:relative}
      .hs-teori-hdr::after{content:'';position:absolute;bottom:-1px;left:0;width:100px;height:2px;background:#7FBCE3;box-shadow:0 0 10px #7FBCE3}
      .hs-teori-tit{font-size:26px;font-weight:800;color:#7FBCE3;letter-spacing:0.06em;text-transform:uppercase;display:flex;align-items:center;gap:12px;text-shadow:0 0 15px rgba(63,214,255,0.4)}
      .hs-badge-num{background:rgba(127,188,227,0.15);padding:4px 12px;border-radius:8px;border:1px solid rgba(127,188,227,0.3);color:#7FBCE3;font-size:22px;font-weight:800}
      .hs-tl{display:flex;align-items:center;gap:0.5em;font-family:'Courier New',monospace;font-size:18px;font-weight:800;color:rgba(255,255,255,0.3);user-select:none}
      .hs-tl-step{cursor:pointer;display:flex;align-items:center;gap:0.4em;transition:0.25s;padding:2px 4px;border-radius:4px}
      .hs-tl-step:hover{color:#fff}
      .hs-tl-step:not(:last-child)::after{content:'──';opacity:0.35;pointer-events:none}
      .hs-tl-step.active{color:#7FBCE3;text-shadow:0 0 10px #7FBCE3}
      .hs-tl-step.done{color:#3DDC84}
      .hs-tl-step.active:not(:last-child)::after{color:#7FBCE3;opacity:0.9;text-shadow:0 0 10px #7FBCE3}
      
      /* PROGRESS BAR TRACK (JELAS, TEBAL & MENYALA) */
      .hs-p-track{width:100%;height:6px;background:rgba(255,255,255,0.12);border-radius:4px;overflow:hidden;flex-shrink:0;margin:6px 0 10px 0}
      .hs-p-bar{height:100%;width:14.28%;background:linear-gradient(90deg,#5FA8D6,#3DDC84);box-shadow:0 0 12px rgba(61,220,132,0.85);border-radius:4px;transition:width 0.35s ease}
      
      .hs-slide{display:none;flex:1;min-height:0;gap:16px}
      .hs-slide.on{display:flex}
      .hs-col{flex:1;display:flex;flex-direction:column;gap:10px;min-width:0;min-height:0;overflow:hidden;padding-right:0}
      
      .hs-fig{flex:0 0 380px;background:#0D1520;border:1px solid #3A4451;border-radius:12px;overflow-y:auto;display:flex;align-items:center;justify-content:center;scrollbar-width:thin;scrollbar-color:rgba(127,188,227,0.18) transparent}
      .hs-fig::-webkit-scrollbar{width:4px}
      .hs-fig::-webkit-scrollbar-track{background:transparent}
      .hs-fig::-webkit-scrollbar-thumb{background:rgba(127,188,227,0.18);border-radius:4px;transition:background 0.3s}
      .hs-fig:hover::-webkit-scrollbar-thumb{background:rgba(127,188,227,0.45)}
      .hs-fig::-webkit-scrollbar-thumb:hover{background:rgba(127,188,227,0.75)}
      
      /* FOOTER NAV (PERSIS VISKOSITAS .btn-nav-outline & .btn-nav-solid) */
      .hs-nav{flex:0 0 auto;display:flex;justify-content:space-between;align-items:center;padding-top:14px;border-top:1px solid rgba(255,255,255,0.05)}
      .btn-nav-outline{display:flex;align-items:center;gap:8px;padding:0.8em 1.8em;background:transparent;border:1px solid #6B747F;border-radius:30px;color:#EDEFF1;font-size:17px;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;transition:all 0.3s ease;cursor:pointer;font-family:inherit}
      .btn-nav-outline:hover:not(:disabled){border-color:#7FBCE3;color:#7FBCE3;transform:translateX(-4px)}
      .btn-nav-outline:disabled{opacity:0.3;cursor:not-allowed}
      .btn-nav-solid{display:flex;align-items:center;gap:8px;background:#7FBCE3;border:none;border-radius:30px;color:#04111d;font-size:17px;font-weight:800;letter-spacing:0.05em;padding:0.8em 1.8em;cursor:pointer;text-transform:uppercase;transition:all 0.3s ease;box-shadow:0 0 20px rgba(63,214,255,0.4);font-family:inherit}
      .btn-nav-solid:hover:not(:disabled){box-shadow:0 0 30px rgba(63,214,255,0.6);transform:translateX(4px);background:#fff}
      .btn-nav-solid.done{background:#3DDC84;color:#0f172a;box-shadow:0 0 20px rgba(61,220,132,0.4)}
      .btn-nav-solid.done:hover{box-shadow:0 0 30px rgba(61,220,132,0.6);background:#4aff98;color:#04111d}
      .btn-nav-outline svg,.btn-nav-solid svg{width:16px;height:16px;stroke-width:2.5px;fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round}
      .hs-cnt{color:#7FBCE3;font-weight:800;font-size:16px;letter-spacing:2px;font-family:'Courier New',monospace;background:rgba(127,188,227,0.1);padding:6px 16px;border-radius:20px;border:1px solid rgba(127,188,227,0.25)}
      
      .hs-quiz{flex:0 0 auto !important;min-height:auto;max-height:165px;margin-top:auto;display:flex;flex-direction:column;gap:8px;background:rgba(63,214,255,0.05);padding:10px 14px;border:1px solid rgba(63,214,255,0.2);border-left:4px solid #3DDC84;border-radius:12px;overflow-y:auto;scrollbar-width:thin;scrollbar-color:rgba(61,220,132,0.18) transparent}
      .hs-quiz::-webkit-scrollbar{width:4px}
      .hs-quiz::-webkit-scrollbar-track{background:transparent}
      .hs-quiz::-webkit-scrollbar-thumb{background:rgba(61,220,132,0.18);border-radius:4px;transition:background 0.3s}
      .hs-quiz:hover::-webkit-scrollbar-thumb{background:rgba(61,220,132,0.45)}
      .hs-quiz::-webkit-scrollbar-thumb:hover{background:rgba(61,220,132,0.75)}
      .hs-qq{font-size:17px;font-weight:700;color:#EDEFF1;line-height:1.45;text-align:justify}
      .hs-qo{display:flex;gap:8px;flex-wrap:wrap}.hs-qo button{flex:1;min-width:140px;background:rgba(63,214,255,0.08);border:1px solid rgba(63,214,255,0.3);border-radius:8px;padding:8px 12px;color:#7FBCE3;font-family:inherit;font-size:16px;font-weight:600;cursor:pointer;transition:0.2s;text-align:center}
      .hs-qo button:hover:not(:disabled){background:rgba(63,214,255,0.2)}
      .hs-qo button.ok{background:#3DDC84 !important;border-color:#4aff98 !important;color:#04111d !important;font-weight:800;box-shadow:0 0 10px rgba(74,255,152,0.5)}
      .hs-qo button.no{background:rgba(255,152,0,0.2) !important;border-color:#F5C84B !important;color:#F5C84B !important}
      .hs-qf{font-size:16px;font-weight:600;min-height:20px;color:#BAC7D5;text-align:justify;line-height:1.45;padding-top:6px;border-top:1px dashed rgba(63,214,255,0.2)}
      .hs-steps{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:14px;flex:1;min-height:0}
      .hs-step{display:flex;flex-direction:column;gap:6px;overflow:hidden}
      .hs-step ul{margin-left:1.2em;font-size:17px;line-height:1.45;color:#D4DCE5;text-align:justify}.hs-step li{margin-bottom:3px}.hs-step b{color:#7FBCE3}
      /* simulasi 3 panel */
      /* simulasi 3 panel sejajar sempurna atas & bawah */
      .hs-sim{flex:1 1 0;min-height:0;height:100%;display:grid;grid-template-columns:260px 1fr 290px;gap:12px;position:relative;align-items:stretch}
      .hs-panel-left{display:flex;flex-direction:column;gap:8px;min-height:0;height:100%;overflow-y:auto;scrollbar-width:thin;scrollbar-color:rgba(127,188,227,0.18) transparent;box-sizing:border-box}
      .hs-panel-left::-webkit-scrollbar{width:4px}
      .hs-panel-left::-webkit-scrollbar-track{background:transparent}
      .hs-panel-left::-webkit-scrollbar-thumb{background:rgba(127,188,227,0.18);border-radius:4px}
      
      .hs-panel-mid{display:flex;flex-direction:column;min-height:0;height:100%;position:relative;box-sizing:border-box}
      .hs-cv{width:100%;height:100%;min-height:0;background:#0D1520;border:1px solid #3A4451;border-radius:12px;touch-action:none;cursor:default;display:block}
      
      .hs-panel-right{display:flex;flex-direction:column;gap:8px;min-height:0;height:100%;overflow-y:auto;scrollbar-width:thin;scrollbar-color:rgba(127,188,227,0.18) transparent;box-sizing:border-box}
      .hs-panel-right::-webkit-scrollbar{width:4px}
      .hs-panel-right::-webkit-scrollbar-track{background:transparent}
      .hs-panel-right::-webkit-scrollbar-thumb{background:rgba(127,188,227,0.18);border-radius:4px}
      
      .hs-panel-left .hs-card, .hs-panel-right .hs-card{padding:10px 12px}
      .hs-panel-left .hs-h, .hs-panel-right .hs-h{font-size:14px;margin-bottom:6px;border-left:3px solid #7FBCE3;padding-left:8px}
      
      /* Flex penyeimbang panel kiri */
      .hs-card-alat{flex:0 0 auto}
      .hs-card-cairan1{flex:0 0 auto}
      .hs-card-cairan2{flex:1 1 0;min-height:0;display:flex;flex-direction:column}
      .hs-card-cairan2 .hs-fl-grid{flex:1;display:grid;grid-template-columns:1fr 1fr;grid-auto-rows:1fr;gap:6px}
      .hs-card-act{flex:0 0 auto}
      
      /* Flex penyeimbang panel kanan */
      .hs-card-gauge{flex:0 0 auto}
      .hs-card-ukur{flex:1 1 0;min-height:0;display:flex;flex-direction:column;justify-content:space-between}
      .hs-inp-group{flex:1;display:flex;flex-direction:column;justify-content:space-evenly;gap:4px;margin:2px 0}
      
      .hs-chk{display:flex;gap:10px;flex-wrap:wrap;font-size:14px;color:#D4DCE5}
      .hs-chk label{display:flex;gap:5px;align-items:center;cursor:pointer}
      .hs-fl-lock{display:flex;align-items:center;justify-content:space-between;background:rgba(127,188,227,0.08);border:1px solid rgba(127,188,227,0.3);border-radius:8px;padding:8px 12px;color:#EDEFF1;font-size:13px}
      .hs-fl-lock b{color:#7FBCE3}
      .hs-fl-grid button{background:#1C2228;border:1.5px solid #3A4451;border-radius:8px;padding:6px 4px;color:#EDEFF1;font-family:inherit;font-size:13px;font-weight:600;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;transition:all 0.2s;text-align:center;height:100%}
      .hs-fl-grid button:hover{border-color:#7FBCE3;background:rgba(127,188,227,0.1)}
      .hs-fl-grid button.on{border-color:#7FBCE3;background:rgba(127,188,227,0.22);box-shadow:0 0 10px rgba(95,168,214,0.4);color:#fff;font-weight:700}
      .hs-fl-grid button .f-icon{font-size:20px}
      .hs-fl-grid button .f-name{font-size:12px;line-height:1.2}
      .hs-act{display:flex;gap:6px}
      .hs-act button{flex:1;border:none;border-radius:8px;padding:9px 4px;font-family:inherit;font-weight:800;font-size:13px;cursor:pointer;text-transform:uppercase;color:#d8ffe9;background:linear-gradient(135deg,#1d8f4f,#0f5c33);transition:0.2s}
      .hs-act button:hover:not(:disabled){transform:translateY(-1px);filter:brightness(1.1)}
      .hs-act button.r{background:linear-gradient(135deg,#7a1d1d,#5c1414);color:#ffd6d6}
      .hs-act button:disabled{background:#1c2c38;color:#5d7488;cursor:not-allowed}
      .hs-gauge{font-size:13px;line-height:1.55;color:#BAC7D5;text-align:left}
      .hs-gauge b{color:#ffb238;font-size:15px}
      .hs-inp-item{display:flex;flex-direction:column;gap:2px;margin-bottom:4px}
      .hs-inp-item label{font-size:12px;color:#BAC7D5;font-weight:600}
      .hs-inp-wrap{display:flex;align-items:center;background:#151A20;border:1px solid #3A4451;border-radius:6px;padding:0 8px}
      .hs-inp-wrap:focus-within{border-color:#7FBCE3;box-shadow:0 0 6px rgba(127,188,227,0.3)}
      .hs-inp-wrap input{flex:1;background:transparent;border:none;color:#fff;font-size:15px;font-weight:bold;padding:6px 2px;outline:none;font-family:inherit}
      .hs-inp-wrap .hs-unit{font-size:12px;color:#7FBCE3;font-weight:600;margin-left:4px}
      .btn-record-lkpd{width:100%;margin-top:4px;background:linear-gradient(135deg,#1E5084,#0d3257);border:1px solid #5FA8D6;color:#EDEFF1;border-radius:8px;padding:9px 8px;font-family:inherit;font-weight:bold;font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;box-shadow:0 3px 6px rgba(0,0,0,0.3);transition:0.2s}
      .btn-record-lkpd:hover{background:linear-gradient(135deg,#2b6ca8,#14497a);box-shadow:0 0 12px rgba(95,168,214,0.5)}
      /* lkpd */
      #hsLkpd{padding:0 !important;display:none}
      #hsLkpd.on{display:flex;flex-direction:column;padding:0 !important}
      .tbl-lkpd-hs { width:100%; border-collapse:collapse; text-align:center; font-size:16px; color:#EDEFF1; background:#1C2228; }
      .tbl-lkpd-hs th { padding:8px 4px; border-right:1px solid #3A4451; font-size:15px; line-height:1.3; font-weight:600; letter-spacing:0.5px; vertical-align:middle; }
      .tbl-lkpd-hs td { padding:5px 4px; border-left:1px solid #3A4451; border-top:1px solid #3A4451; height:44px; }
      .tbl-lkpd-hs tbody tr:nth-child(odd) { background:rgba(255,255,255,0.03); }
      .tbl-lkpd-hs sub { font-size:12px; }
      .tbl-lkpd-hs .unit { font-size:12px; font-weight:normal; color:#A0B3C6; display:block; margin-top:2px; }
      .tbl-lkpd-hs input { width:100%; background:transparent; border:none; color:#EDEFF1; font-size:16px; text-align:center; font-family:inherit; outline:none; }
      .tbl-lkpd-hs input:focus { background:rgba(95,168,214,0.15); border-radius:4px; }
      .tbl-lkpd-hs td.correct { background:rgba(61,220,132,0.2) !important; color:#3DDC84 !important; font-weight:bold; }
      .tbl-lkpd-hs td.close { background:rgba(255,178,56,0.2) !important; color:#FFB238 !important; font-weight:bold; }
      .tbl-lkpd-hs td.wrong { background:rgba(224,108,117,0.2) !important; color:#E06C75 !important; font-weight:bold; }
      `;
      document.head.appendChild(st);
    }

    const tabCtrl = api.setTabs ? api.setTabs(['teori:Teori', 'prosedur:Prosedur', 'simulasi:Simulasi', 'lkpd:LKPD'], function (t) {
      tab(t, false);
    }) : null;

    c.innerHTML = '<div class="hs">' +
      '<div class="hs-pane on" id="hsTeori"></div>' +
      '<div class="hs-pane" id="hsProsedur"></div>' +
      '<div class="hs-pane" id="hsSimulasi"></div>' +
      '<div class="hs-pane" id="hsLkpd"></div>' +
    '</div>';

    const $ = function (id) { return c.querySelector('#' + id); };
    let simActive = false;
    function tab(t, updateNav) {
      if (updateNav !== false && tabCtrl) tabCtrl.setActive(t);
      c.querySelectorAll('.hs-pane').forEach(function (p) { p.classList.remove('on'); });
      const pane = $('hs' + t[0].toUpperCase() + t.slice(1));
      if (pane) pane.classList.add('on');
      simActive = (t === 'simulasi');
      if (simActive) sim.start(); else sim.stop();
    }

    /* ================= TEORI ================= */
    function phImg(fileName, title, desc) {
      return '<div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;background:#0D1520;overflow:hidden;">' +
        '<img src="asset/img/' + fileName + '" alt="' + title + '" style="width:100%;height:100%;object-fit:contain;display:block;" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\';">' +
        '<div style="display:none;width:100%;height:100%;box-sizing:border-box;padding:20px;flex-direction:column;align-items:center;justify-content:center;gap:10px;border:1px dashed rgba(95,168,214,0.4);border-radius:12px;background:radial-gradient(circle at center, rgba(63,214,255,0.08) 0%, #0D1520 75%);text-align:center;">' +
          '<div style="width:52px;height:52px;border-radius:12px;background:rgba(95,168,214,0.12);border:1px solid rgba(95,168,214,0.3);display:flex;align-items:center;justify-content:center;color:#7FBCE3;font-size:26px;">🖼️</div>' +
          '<div style="font-family:\'Courier New\',monospace;font-size:14px;font-weight:bold;color:#7FBCE3;letter-spacing:0.1em;text-transform:uppercase;">PLACEHOLDER GAMBAR</div>' +
          '<div style="font-size:17px;font-weight:700;color:#EDEFF1;max-width:92%;line-height:1.35;">' + title + '</div>' +
          '<div style="font-size:15px;color:#BAC7D5;max-width:92%;line-height:1.4;">' + desc + '</div>' +
          '<div style="font-family:monospace;font-size:13px;color:#ffb238;background:#1C2228;padding:6px 12px;border-radius:6px;border:1px solid #3A4451;margin-top:4px;">asset/img/' + fileName + '</div>' +
          '<div style="font-size:12px;color:#3DDC84;margin-top:2px;">(Tambahkan file gambar ke folder asset)</div>' +
        '</div>' +
      '</div>';
    }

    const figs = [
      phImg('teori_hidrostatis_1.png', 'Massa Jenis Zat Cair (Densitas)', 'Ilustrasi perbandingan kerapatan partikel fluida (Minyak, Air, Gliserin)'),
      phImg('teori_hidrostatis_2.png', 'Konsep Tekanan (P = F / A)', 'Ilustrasi gaya tekan balok tumpul vs paku runcing pada bidang tekan'),
      phImg('teori_hidrostatis_3.png', 'Tekanan Hidrostatis (P = ρ·g·h)', 'Diagram kolom zat cair setinggi h yang menekan titik acuan di kedalaman'),
      phImg('teori_hidrostatis_4.png', 'Faktor dan Paradoks', 'Tiga bejana berhubungan berbagai bentuk dengan tinggi cairan dan tekanan dasar yang sama'),
      phImg('teori_hidrostatis_5.png', 'Hukum Utama Hidrostatis & Pipa-U', 'Diagram pipa-U berisi dua jenis zat cair berbeda (ρ₁·h₁ = ρ₂·h₂)'),
      phImg('teori_hidrostatis_6.png', 'Tekanan Mutlak / Total', 'Ilustrasi tekanan atmosfer P₀ dan tekanan hidrostatis ρgh di dalam fluida'),
      phImg('teori_hidrostatis_7.png', 'Penerapan', 'Ilustrasi bendungan tebal di bawah, tiang infus medis, dan kapal selam')
    ];

    const slides = [
      /* Slide 1 */
      [
        '01',
        'Massa Jenis (Densitas)',
        '<div class="hs-card"><div class="hs-h">Pengertian Massa Jenis</div><div class="hs-t"><b>Massa jenis (densitas, ρ)</b> merupakan ukuran kerapatan massa suatu materi fluida dalam setiap satuan volumenya. Nilai ini menjadi karakteristik intrinsik zat yang membedakan satu jenis fluida dengan fluida lainnya dan tidak bergantung pada volume total fluida.</div></div>' +
        '<div class="hs-card"><div class="hs-h">Rumus Massa Jenis</div><div class="hs-formula">ρ = m / V</div><div class="hs-t" style="margin-top:8px"><b>ρ</b> = massa jenis (kg/m³ atau g/cm³) &nbsp;|&nbsp; <b>m</b> = massa (kg) &nbsp;|&nbsp; <b>V</b> = volume (m³)</div></div>' +
        quizHTML('Kuis: Jika 2 liter air murni memiliki massa 2 kg, berapakah massa jenis air tersebut?', [
          ['500 kg/m³', 0, 'Salah. Ingat konversi: 2 liter = 0,002 m³, sehingga ρ = 2 / 0,002 = 1.000 kg/m³.'],
          ['1.000 kg/m³', 1, 'Benar! ρ = m / V = 2 kg / 0,002 m³ = 1.000 kg/m³.'],
          ['2.000 kg/m³', 0, 'Salah. Massa jenis air murni standar adalah 1.000 kg/m³ (atau 1 g/cm³).']
        ])
      ],

      /* Slide 2 */
      [
        '02',
        'Konsep Tekanan (P = F / A)',
        '<div class="hs-card"><div class="hs-h">Definisi Tekanan</div><div class="hs-t"><b>Tekanan (P)</b> adalah besarnya gaya dorong tegak lurus (F) yang bekerja pada setiap satu satuan luas bidang penampang (A). Konsep ini menjelaskan mengapa gaya yang sama dapat memberikan dampak kerusakan atau penetrasi yang amat berbeda tergantung luas bidang sentuhnya.</div></div>' +
        '<div class="hs-card"><div class="hs-h">Formula Tekanan Permukaan</div><div class="hs-formula">P = F / A</div><div class="hs-t" style="margin-top:8px"><b>P</b> = Tekanan (N/m² atau Pascal / Pa) &nbsp;|&nbsp; <b>F</b> = Gaya (N) &nbsp;|&nbsp; <b>A</b> = Luas bidang tekan (m²)</div></div>' +
        quizHTML('Kuis: Mengapa mata pisau atau jarum dibuat runcing dan tipis pada ujungnya?', [
          ['Memperkecil luas (A) agar tekanan (P) sangat besar', 1, 'Benar! Karena P = F/A, memperkecil nilai A akan melipatgandakan tekanan secara drastis.'],
          ['Memperbesar gaya dorong tangan', 0, 'Salah. Gaya dorong tangan tidak berubah; yang berubah adalah luas bidang sentuhnya.'],
          ['Mengurangi massa jenis logam pisau', 0, 'Salah. Ketajaman ujung jarum atau pisau tidak mengubah massa jenis bahannya.']
        ])
      ],

      /* Slide 3 */
      [
        '03',
        'Pengertian Tekanan Hidrostatis',
        '<div class="hs-card"><div class="hs-h">Tekanan Fluida Statis</div><div class="hs-t"><b>Tekanan hidrostatis</b> adalah tekanan yang dialami oleh suatu titik di dalam zat cair yang berada dalam kondisi diam (statis), yang timbul semata-mata akibat berat kolom fluida di atasnya yang ditarik oleh percepatan gravitasi bumi. Semakin dalam titik tersebut, semakin tebal dan berat kolom cairan yang menindihnya.</div></div>' +
        '<div class="hs-card"><div class="hs-h">Rumus Tekanan Hidrostatis</div><div class="hs-formula">P = ρ · g · h</div><div class="hs-t" style="margin-top:8px"><b>P</b> = Tekanan hidrostatis (Pa) &nbsp;|&nbsp; <b>ρ</b> = Massa jenis fluida (kg/m³) &nbsp;|&nbsp; <b>g</b> = Percepatan gravitasi (m/s²) &nbsp;|&nbsp; <b>h</b> = Kedalaman titik diukur dari permukaan zat cair (m).</div></div>' +
        quizHTML('Kuis: Dalam rumus P = ρ·g·h, dari manakah titik acuan kedalaman (h) harus diukur?', [
          ['Dari dasar wadah ke atas', 0, 'Salah. Itu adalah ketinggian dasar, bukan kedalaman.'],
          ['Dari permukaan zat cair ke bawah', 1, 'Benar! Kedalaman (h) mutlak diukur tegak lurus dari permukaan zat cair menuju titik yang ditinjau.'],
          ['Dari dinding samping wadah', 0, 'Salah. Kedalaman diukur secara vertikal dari permukaan cairan.']
        ])
      ],

      /* Slide 4 */
      [
        '04',
        'Faktor dan Paradoks',
        '<div class="hs-card"><div class="hs-h">Tiga Faktor Penentu</div><div class="hs-t">Tekanan hidrostatis berbanding lurus secara linier dengan: (1) <b>Massa jenis zat cair (ρ)</b>, (2) <b>Percepatan gravitasi (g)</b>, dan (3) <b>Kedalaman titik dari permukaan (h)</b>. Menggandakan kedalaman akan melipatgandakan tekanan hidrostatis menjadi dua kali lipat.</div></div>' +
        '<div class="hs-card"><div class="hs-h">Paradoks Hidrostatis (Bentuk Wadah)</div><div class="hs-t">Bentuk wadah, luas alas wadah, serta volume keseluruhan cairan <b>sama sekali TIDAK memengaruhi</b> nilai tekanan hidrostatis di dasar wadah. Asalkan kedalaman (h) dan jenis cairannya sama, tekanan pada dasar bejana kerucut, silinder lurus, maupun labu melengkung bernilai persis sama!</div></div>' +
        quizHTML('Kuis: Tiga bejana (kerucut, silinder lurus, dan labu bulat) diisi air hingga kedalaman sama (h = 50 cm). Tekanan air di dasar bejana adalah…', [
          ['Sama besar di semua bejana', 1, 'Benar! Paradoks hidrostatis membuktikan bentuk wadah tidak mempengaruhi tekanan dasar, hanya ρ, g, dan h.'],
          ['Paling besar di labu bulat karena airnya paling banyak', 0, 'Salah. Banyaknya volume air tidak mempengaruhi tekanan hidrostatis di dasar.'],
          ['Paling besar di kerucut karena mengerucut ke bawah', 0, 'Salah. Tekanan hidrostatis tidak ditentukan oleh kemiringan dinding wadah.']
        ])
      ],

      /* Slide 5 */
      [
        '05',
        'Hukum Utama Tekanan Hidrostatis',
        '<div class="hs-card"><div class="hs-h">Bunyi Hukum Utama</div><div class="hs-t"><i>"Semua titik yang terletak pada satu bidang datar horizontal di dalam satu jenis zat cair homogen yang saling berhubungan dalam keadaan setimbang, memiliki tekanan hidrostatis yang sama besar."</i></div></div>' +
        '<div class="hs-card"><div class="hs-h">Penerapan pada Pipa-U Dua Zat Cair</div><div class="hs-formula">ρ₁ · h₁ = ρ₂ · h₂</div><div class="hs-t" style="margin-top:8px"><b>h₁</b> dan <b>h₂</b> diukur dari garis batas bidang datar perbatasan. Cairan dengan massa jenis lebih kecil akan membentuk kolom cairan yang lebih tinggi.</div></div>' +
        quizHTML('Kuis: Pipa-U berisi air (ρ₁ = 1.000 kg/m³). Minyak (ρ₂ = 800 kg/m³) dituangkan setinggi h₂ = 10 cm. Berapakah tinggi kolom air (h₁) dari garis batas?', [
          ['8,0 cm', 1, 'Benar! h₁ = (ρ₂ · h₂) / ρ₁ = (800 × 10) / 1.000 = 8,0 cm.'],
          ['10,0 cm', 0, 'Salah. Karena minyak lebih ringan, kolom air harus lebih pendek dari 10 cm untuk mengimbangi tekanannya.'],
          ['12,5 cm', 0, 'Salah. Perhitungan yang benar adalah (800 × 10) / 1000 = 8,0 cm.']
        ])
      ],

      /* Slide 6 */
      [
        '06',
        'Tekanan Mutlak (Total)',
        '<div class="hs-card"><div class="hs-h">Pengaruh Tekanan Atmosfer (P₀)</div><div class="hs-t">Permukaan zat cair yang terbuka ke udara bebas senantiasa menerima tekanan dari lapisan atmosfer bumi. Pada permukaan laut, tekanan atmosfer standar bernilai sekitar <b>P₀ ≈ 1 atm = 1,013 × 10⁵ Pa = 101,3 kPa</b>. Tekanan udara luar ini diteruskan sama kuat ke seluruh bagian cairan.</div></div>' +
        '<div class="hs-card"><div class="hs-h">Rumus Tekanan Mutlak (Total)</div><div class="hs-formula">P_mutlak = P₀ + (ρ · g · h)</div><div class="hs-t" style="margin-top:8px;font-size:15px;white-space:nowrap;text-align:center;"><b>P_mutlak</b> = Tekanan total (Pa) &nbsp;|&nbsp; <b>P₀</b> = Tekanan atmosfer luar (Pa) &nbsp;|&nbsp; <b>ρ·g·h</b> = Tekanan hidrostatis (Pa).</div></div>' +
        quizHTML('Kuis: Penyelam berada di kedalaman laut dengan tekanan hidrostatis 200.000 Pa. Jika tekanan atmosfer di atasnya 101.300 Pa, berapa tekanan mutlaknya?', [
          ['200.000 Pa', 0, 'Salah. 200.000 Pa hanya tekanan zat cair (tekanan hidrostatis murni) belum ditambah atmosfer.'],
          ['301.300 Pa', 1, 'Benar! P_mutlak = P₀ + P_hidrostatis = 101.300 + 200.000 = 301.300 Pa.'],
          ['98.700 Pa', 0, 'Salah. Tekanan mutlak dijumlahkan, bukan dikurangkan.']
        ])
      ],

      /* Slide 7 */
      [
        '07',
        'Penerapan',
        '<div class="hs-card"><div class="hs-h">Teknologi & Konstruksi Fisika</div><div class="hs-t">1. <b>Dinding Bendungan Air</b>: Dibuat mengerucut dan sangat tebal di dasar danau untuk mengimbangi tekanan hidrostatis (P = ρ·g·h) yang berlipat ganda semakin dalam.<br>2. <b>Lambung Kapal Selam</b>: Dirancang dengan struktur lambung silinder baja titanium berkekuatan tinggi agar tidak remuk oleh gaya tekan kompresi air laut dalam.</div></div>' +
        '<div class="hs-card"><div class="hs-h">Bidang Medis & Kehidupan Manusia</div><div class="hs-t">3. <b>Pemasangan Labu Infus Pasien</b>: Kantong cairan infus wajib digantung pada tiang tinggi agar tekanan hidrostatis kolom cairan infus lebih besar dari tekanan balik darah di vena pasien, sehingga obat menetes masuk.<br>4. <b>Penyelaman & Gendang Telinga</b>: Menyelam makin dalam menekan gendang telinga ke dalam. Penyelam melakukan teknik *equalizing* untuk menyamakan tekanan telinga tengah dengan air di sekitarnya.</div></div>' +
        quizHTML('Kuis: Mengapa kantong infus medis harus selalu diposisikan lebih tinggi dari tubuh pasien?', [
          ['Agar tekanan hidrostatis cairan infus lebih besar dari tekanan darah', 1, 'Benar! Ketinggian h menghasilkan tekanan hidrostatis pendorong yang lebih tinggi daripada tekanan balik pembuluh vena.'],
          ['Agar massa jenis cairan infus meningkat', 0, 'Salah. Ketinggian gantungan tidak mengubah massa jenis obat infus.'],
          ['Agar udara luar tidak bisa masuk', 0, 'Salah. Alasan utamanya adalah menghasilkan tekanan dorong hidrostatis yang cukup bagi aliran fluida.']
        ])
      ]
    ];

    function quizHTML(q, opts) {
      return '<div class="hs-card hs-quiz"><div class="hs-qq">' + q + '</div><div class="hs-qo">' + opts.map(function (o) {
        return '<button data-ok="' + o[1] + '" data-msg="' + o[2].replace(/"/g, '&quot;') + '">' + o[0] + '</button>';
      }).join('') + '</div><div class="hs-qf"></div></div>';
    }

    let cur = 0;

    /* Render Struktur Teori Lengkap: Header Title + Timeline, Progress Bar Track, 7 Slides, dan Navigasi */
    $('hsTeori').innerHTML =
      '<div class="hs-teori-wrap">' +
        '<!-- Header -->' +
        '<div class="hs-teori-hdr">' +
          '<div class="hs-teori-tit" id="hsTeoriTitle">' +
            '<span class="hs-badge-num">01</span> MASSA JENIS (DENSITAS)' +
          '</div>' +
          '<div class="hs-tl" id="hsTeoriTl">' +
            slides.map(function (s, i) {
              return '<div class="hs-tl-step' + (i === 0 ? ' active' : '') + '" data-step="' + i + '">' + s[0] + '</div>';
            }).join('') +
          '</div>' +
        '</div>' +
        '<!-- Progress Bar Track -->' +
        '<div class="hs-p-track"><div class="hs-p-bar" id="hsTeoriPBar"></div></div>' +
        '<!-- Slides Container -->' +
        '<div style="flex:1;min-height:0;display:flex;position:relative">' +
          slides.map(function (s, i) {
            return '<div class="hs-slide' + (i === 0 ? ' on' : '') + '" id="hsSlide_' + i + '" style="position:absolute;inset:0">' +
              '<div class="hs-col">' + s[2] + '</div>' +
              '<div class="hs-fig">' + figs[i] + '</div>' +
            '</div>';
          }).join('') +
        '</div>' +
        '<!-- Navigasi Bawah (Persis Viskositas) -->' +
        '<div class="hs-nav">' +
          '<button class="btn-nav-outline" id="hsPrev" disabled><svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"></polyline></svg> Sebelumnya</button>' +
          '<div class="hs-cnt" id="hsCnt">SLIDE 01 / 07</div>' +
          '<button class="btn-nav-solid" id="hsNext">Selanjutnya <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg></button>' +
        '</div>' +
      '</div>';

    function showSlide(n) {
      cur = Math.max(0, Math.min(slides.length - 1, n));
      
      // Update Slide visibility
      for (let i = 0; i < slides.length; i++) {
        const sl = $('hsSlide_' + i);
        if (sl) sl.classList.toggle('on', i === cur);
      }
      
      // Update Title
      const titEl = $('hsTeoriTitle');
      if (titEl) {
        titEl.innerHTML = '<span class="hs-badge-num">' + slides[cur][0] + '</span> ' + slides[cur][1].toUpperCase();
      }
      
      // Update Timeline Steps (active / done)
      const tlSteps = c.querySelectorAll('#hsTeoriTl .hs-tl-step');
      tlSteps.forEach(function (stepEl, idx) {
        stepEl.classList.remove('active', 'done');
        if (idx === cur) {
          stepEl.classList.add('active');
        } else if (idx < cur) {
          stepEl.classList.add('done');
        }
      });
      
      // Update Progress Bar
      const pBar = $('hsTeoriPBar');
      if (pBar) {
        const pct = ((cur + 1) / slides.length) * 100;
        pBar.style.width = pct + '%';
      }
      
      // Update Buttons & Counter
      $('hsCnt').textContent = 'SLIDE ' + slides[cur][0] + ' / 0' + slides.length;
      $('hsPrev').disabled = (cur === 0);
      const nextBtn = $('hsNext');
      if (cur === slides.length - 1) {
        nextBtn.innerHTML = 'Ke Prosedur <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg>';
        nextBtn.classList.add('done');
      } else {
        nextBtn.innerHTML = 'Selanjutnya <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg>';
        nextBtn.classList.remove('done');
      }
    }

    $('hsPrev').onclick = function () { showSlide(cur - 1); };
    $('hsNext').onclick = function () { cur === slides.length - 1 ? tab('prosedur') : showSlide(cur + 1); };

    // Timeline step click
    const tlWrap = $('hsTeoriTl');
    if (tlWrap) {
      tlWrap.addEventListener('click', function (e) {
        const target = e.target.closest('.hs-tl-step');
        if (target && target.dataset.step !== undefined) {
          showSlide(parseInt(target.dataset.step, 10));
        }
      });
    }

    showSlide(0);

    // Kuis Interactive Logic
    $('hsTeori').addEventListener('click', function (e) {
      const b = e.target.closest('.hs-qo button'); if (!b) return;
      const box = b.closest('.hs-quiz'), ok = b.dataset.ok === '1';
      box.querySelectorAll('button').forEach(function (x) {
        x.disabled = true;
        if (x.dataset.ok === '1') x.classList.add('ok');
      });
      if (!ok) b.classList.add('no');
      box.querySelector('.hs-qf').textContent = b.dataset.msg;
    });

    /* ================= PROSEDUR ================= */
    const steps = [
      ['Tahap 1: Pengenalan Alat & Pengaturan Awal', ['Aktifkan <b>Grid</b> dan tampilkan <b>Penggaris</b> di panel kiri; seret penggaris ke dekat pipa U di panel tengah.', 'Atur <b>Atmosfer</b> ke <b>Mati</b> agar hanya tekanan hidrostatis murni yang terukur (atau <b>Hidup</b> sesuai arahan guru).', 'Aktifkan <b>Pengukur Tekanan</b> lalu seret sensor ke dalam cairan di panel tengah.']],
      ['Tahap 2: Mengisi Pipa U dengan Air', ['Cairan 1 pada dasar tabung terkunci pada <b>Air (&rho;₁ = 1.000 kg/m³)</b>.', 'Tekan tombol <b>Isi Pipa U</b> pada panel kiri untuk mengisi kedua lengan tabung.', 'Amati bahwa ketinggian air di kedua lengan berada pada bidang horizontal yang sejajar.']],
      ['Tahap 3: Menambahkan Cairan yang Diuji', ['Pilih salah satu jenis <b>Cairan 2</b> pada panel kiri (misal Minyak Goreng, Bensin, Spirtus, dll).', 'Tekan tombol <b>+ Tuang</b> untuk menuangkan cairan ke lengan kanan pipa U.', 'Seret penggaris dan sejajarkan angka <b>0</b> tepat pada <b>garis batas horizontal</b> perbatasan kedua cairan.']],
      ['Tahap 4: Pengukuran & Perhitungan Massa Jenis', ['Ukur tinggi kolom air <b>h₁</b> dan tinggi kolom cairan <b>h₂</b> dari garis batas menggunakan penggaris.', 'Ketikkan nilai <b>h₁</b>, <b>h₂</b>, dan hasil hitung <b>&rho;₂</b> pada Lembar Pengukuran di panel kanan.', 'Klik tombol <b>📥 Catat Data ke LKPD</b> untuk menyimpan data ke tabel pengamatan LKPD.']]
    ];
    $('hsProsedur').innerHTML = '<div class="hs-steps">' + steps.map(function (s, i) {
      return '<div class="hs-card hs-step"><div class="hs-h" style="font-size:17px"><span style="color:#ffb238">0' + (i + 1) + '</span> &nbsp;' + s[0] + '</div><ul>' + s[1].map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul></div>';
    }).join('') + '</div><div class="hs-nav"><span></span><button class="hs-btn solid" id="hsGoSim">Buka Simulasi &rarr;</button></div>';
    $('hsGoSim').onclick = function () { tab('simulasi'); };

    /* ================= SIMULASI 3 PANEL ================= */
    const F1 = [['Air', 1000, '74,168,255', '💧']];
    const F2 = [
      ['Minyak Goreng', 920, '255,190,50', '🛢️'],
      ['Bensin', 700, '235,210,60', '⛽'],
      ['Minyak Tanah', 800, '90,200,240', '🍶'],
      ['Spirtus', 790, '240,110,170', '🧴'],
      ['Oli Mesin', 880, '200,120,40', '🚗'],
      ['Minyak Zaitun', 910, '170,210,60', '🌿']
    ];
    const G = 9.8, P0 = 101300, S = 9, Y0 = 460, H0 = 15, W = 6;
    const sm = { f1: 0, f2: 0, r1: 1000, r2: 920, filled: false, h2t: 0, h0d: 0, h2d: 0, atm: false, grid: true, ruler: true, gauge: true,
                 rx: 140, ry: 460, gx: 690, gy: 310, drag: null, raf: 0, last: 0 };
    $('hsSimulasi').innerHTML = '<div class="hs-sim">' +
      '<!-- PANEL KIRI (ALAT, CAIRAN, KONTROL) -->' +
      '<div class="hs-panel-left">' +
        '<div class="hs-card hs-card-alat"><div class="hs-h">Alat</div><div class="hs-chk"><label><input type="checkbox" id="hsGrid" checked>Grid</label><label><input type="checkbox" id="hsRul" checked>Penggaris</label><label><input type="checkbox" id="hsGau" checked>Pengukur</label><label><input type="checkbox" id="hsAtm">Atmosfer</label></div></div>' +
        '<div class="hs-card hs-card-cairan1"><div class="hs-h">Cairan 1 (Dasar Tabung)</div><div class="hs-fl-lock"><span>💧 <b>Air Murni</b></span><span>&rho;₁ = 1.000 kg/m³ 🔒</span></div></div>' +
        '<div class="hs-card hs-card-cairan2"><div class="hs-h">Cairan 2 (Dituang ke Kanan)</div><div class="hs-fl-grid" id="hsF2"></div></div>' +
        '<div class="hs-card hs-card-act"><div class="hs-act"><button id="hsFill">Isi Pipa U</button><button id="hsPour" disabled>+ Tuang</button><button class="r" id="hsReset">Reset</button></div></div>' +
      '</div>' +
      '<!-- PANEL TENGAH (SIMULASI PIPA U) -->' +
      '<div class="hs-panel-mid">' +
        '<canvas class="hs-cv" id="hsCv" width="860" height="560"></canvas>' +
      '</div>' +
      '<!-- PANEL KANAN (OUTPUT & LEMBAR UKUR SISWA) -->' +
      '<div class="hs-panel-right">' +
        '<div class="hs-card hs-card-gauge"><div class="hs-h">Pengukur Tekanan</div><div class="hs-gauge" id="hsRead">Seret sensor ke dalam cairan di panel tengah.</div></div>' +
        '<div class="hs-card hs-card-ukur">' +
          '<div>' +
            '<div class="hs-h">Lembar Pengukuran Siswa</div>' +
            '<div style="font-size:13px;color:#BAC7D5;padding:6px 8px;background:rgba(0,0,0,0.25);border-radius:6px;border-left:3px solid #3DDC84;margin-bottom:6px;">' +
              'Zat Cair Diuji: <b id="hsUjiFluidName" style="color:#7FBCE3;">🛢️ Minyak Goreng</b><br>' +
              'Zat Cair 1: <b>Air (&rho;₁ = 1.000 kg/m³)</b>' +
            '</div>' +
          '</div>' +
          '<div class="hs-inp-group">' +
            '<div class="hs-inp-item">' +
              '<label>Tinggi Kolom Air (h₁) :</label>' +
              '<div class="hs-inp-wrap"><input type="number" id="hsSimH1" step="0.1" placeholder="Ukur pakai penggaris"><span class="hs-unit">cm</span></div>' +
            '</div>' +
            '<div class="hs-inp-item">' +
              '<label>Tinggi Kolom Cairan 2 (h₂) :</label>' +
              '<div class="hs-inp-wrap"><input type="number" id="hsSimH2" step="0.1" placeholder="Ukur pakai penggaris"><span class="hs-unit">cm</span></div>' +
            '</div>' +
            '<div class="hs-inp-item">' +
              '<label>Massa Jenis &rho;₂ (Hasil Hitung) :</label>' +
              '<div class="hs-inp-wrap"><input type="number" id="hsSimR2" step="1" placeholder="Hitung dengan rumus"><span class="hs-unit">kg/m³</span></div>' +
            '</div>' +
            '<div style="font-size:12px;color:#7FBCE3;background:rgba(63,214,255,0.08);padding:5px 8px;border-radius:6px;text-align:center;border:1px dashed rgba(63,214,255,0.25);margin-top:2px;">' +
              'Rumus: &rho;₂ = (&rho;₁ &times; h₁) / h₂' +
            '</div>' +
          '</div>' +
          '<div style="margin-top:auto;">' +
            '<button id="hsRecord" class="btn-record-lkpd">&#128229; CATAT DATA KE LKPD</button>' +
            '<div id="hsRecordMsg" style="font-size:13px;text-align:center;margin-top:4px;min-height:18px;font-weight:bold;"></div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
    const cv = $('hsCv'), cx = cv.getContext('2d');
    function renderF() {
      $('hsF2').innerHTML = F2.map(function (f, i) {
        return '<button data-f2="' + i + '" class="' + (i === sm.f2 ? 'on' : '') + '">' +
          '<span class="f-icon">' + f[3] + '</span>' +
          '<span class="f-name">' + f[0] + '</span>' +
        '</button>';
      }).join('');
      const uji = $('hsUjiFluidName');
      if (uji) uji.textContent = F2[sm.f2][3] + ' ' + F2[sm.f2][0];
      $('hsPour').disabled = !sm.filled || sm.h2t >= 16;
      $('hsFill').disabled = sm.filled;
    }
    function resetSim() {
      sm.filled = false;
      sm.h2t = 0;
      if ($('hsSimH1')) $('hsSimH1').value = '';
      if ($('hsSimH2')) $('hsSimH2').value = '';
      if ($('hsSimR2')) $('hsSimR2').value = '';
      const msg = $('hsRecordMsg');
      if (msg) msg.textContent = '';
      renderF();
    }
    $('hsSimulasi').addEventListener('click', function (e) {
      const b = e.target.closest('[data-f2]');
      if (b) {
        sm.f2 = +b.dataset.f2;
        sm.r2 = F2[sm.f2][1];
        renderF();
      }
      else if (e.target.id === 'hsFill') { sm.filled = true; renderF(); }
      else if (e.target.id === 'hsPour') { sm.h2t = Math.min(16, sm.h2t + 4); renderF(); }
      else if (e.target.id === 'hsReset') resetSim();
      else if (e.target.id === 'hsRecord') { if (typeof recordToLkpd === 'function') recordToLkpd(); }
    });
    $('hsSimulasi').addEventListener('input', function (e) {
      if (e.target.id === 'hsGrid') sm.grid = e.target.checked;
      else if (e.target.id === 'hsRul') sm.ruler = e.target.checked;
      else if (e.target.id === 'hsGau') sm.gauge = e.target.checked;
      else if (e.target.id === 'hsAtm') sm.atm = e.target.checked;
    });
    renderF();

    const px = function (cm) { return Y0 - cm * S; };
    function geom() {                       // kondisi kesetimbangan (satuan cm)
      const h2 = sm.h2d, h1 = sm.r2 * h2 / sm.r1;
      return { h1: h1, h2: h2, L: sm.h0d + h1 / 2, R: sm.h0d - h1 / 2 };
    }
    const AL = [260, 324], AR = [536, 600];
    function pressure(x, y) {               // x,y piksel kanvas → {p, depth, fl} atau null
      const g = geom(), ccm = (Y0 - y) / S;
      if (sm.h0d <= 0.01 || y > Y0 + W * S) return null;
      const inR = x >= AR[0] && x <= AR[1], inTube = x >= AL[0] && x <= AR[1];
      if (!inTube) return null;
      if (inR && ccm >= 0) {
        if (ccm > g.R + g.h2) return null;
        if (ccm > g.R) return { p: sm.r2 * G * (g.R + g.h2 - ccm), d: g.R + g.h2 - ccm, n: F2[sm.f2][0] };
        return { p: sm.r2 * G * g.h2 + sm.r1 * G * (g.R - ccm), d: g.R + g.h2 - ccm, n: F1[sm.f1][0] };
      }
      if (ccm >= 0 && x > AL[1]) return null;                 // celah di antara kedua lengan
      if (ccm > g.L) return null;
      return { p: sm.r1 * G * (g.L - ccm), d: g.L - ccm, n: F1[sm.f1][0] };
    }
    function draw() {
      cx.clearRect(0, 0, 860, 560);
      
      // 1. LATAR BELAKANG LAB DIGITAL FUTURISTIK
      const bg = cx.createLinearGradient(0, 0, 0, 560);
      bg.addColorStop(0, '#0a1420');
      bg.addColorStop(0.6, '#060d15');
      bg.addColorStop(1, '#020509');
      cx.fillStyle = bg;
      cx.fillRect(0, 0, 860, 560);

      // Ambient radial glow di belakang pipa U
      const glow = cx.createRadialGradient(430, 270, 40, 430, 270, 360);
      glow.addColorStop(0, 'rgba(63, 214, 255, 0.08)');
      glow.addColorStop(0.5, 'rgba(63, 214, 255, 0.025)');
      glow.addColorStop(1, 'transparent');
      cx.fillStyle = glow;
      cx.fillRect(0, 0, 860, 560);

      // Permukaan meja lab di bagian dasar (workbench)
      const bench = cx.createLinearGradient(0, 510, 0, 560);
      bench.addColorStop(0, '#101721');
      bench.addColorStop(1, '#080d14');
      cx.fillStyle = bench;
      cx.fillRect(0, 510, 860, 50);
      cx.strokeStyle = 'rgba(95, 168, 214, 0.25)';
      cx.lineWidth = 1;
      cx.beginPath();
      cx.moveTo(0, 510); cx.lineTo(860, 510);
      cx.stroke();

      // STATIF LABORATORIUM (RETORT STAND NYATA - TEPAT DI TENGAH)
      // Dudukan pelat besi statif di dasar
      const baseGrad = cx.createLinearGradient(270, 514, 590, 534);
      baseGrad.addColorStop(0, '#2b3644');
      baseGrad.addColorStop(0.5, '#171e28');
      baseGrad.addColorStop(1, '#0d131a');
      cx.fillStyle = baseGrad;
      cx.strokeStyle = 'rgba(127, 188, 227, 0.35)';
      cx.lineWidth = 1.2;
      cx.beginPath();
      cx.roundRect(270, 514, 320, 20, 6);
      cx.fill(); cx.stroke();

      // Tiang vertikal statif (stainless steel rod) di tengah x = 430
      const rodGrad = cx.createLinearGradient(426, 0, 434, 0);
      rodGrad.addColorStop(0, '#3a4755');
      rodGrad.addColorStop(0.4, '#a3b8cc');
      rodGrad.addColorStop(1, '#24303c');
      cx.fillStyle = rodGrad;
      cx.fillRect(426, 150, 8, 368);

      // Klem statif penahan tabung kaca (Clamp Holders)
      [230, 390].forEach(function (cy) {
        // Bosshead pada tiang tengah
        cx.fillStyle = '#1c2430';
        cx.strokeStyle = '#607286';
        cx.lineWidth = 1;
        cx.fillRect(422, cy - 8, 16, 16);
        cx.strokeRect(422, cy - 8, 16, 16);
        // Lengan klem horizontal menjepit ke tabung kiri dan kanan
        cx.fillStyle = '#3a4755';
        cx.fillRect(AL[1], cy - 4, 426 - AL[1], 8);
        cx.fillRect(434, cy - 4, AR[0] - 434, 8);
        // Bantalan karet penjepit tabung
        cx.fillStyle = 'rgba(30, 40, 50, 0.9)';
        cx.strokeStyle = 'rgba(95, 168, 214, 0.4)';
        cx.fillRect(AL[1] - 4, cy - 7, 7, 14);
        cx.strokeRect(AL[1] - 4, cy - 7, 7, 14);
        cx.fillRect(AR[0] - 3, cy - 7, 7, 14);
        cx.strokeRect(AR[0] - 3, cy - 7, 7, 14);
      });

      // 2. GRID DIGITAL PRESISI & KOORDINAT AKURAT (0 - 30 cm)
      const g = geom();
      if (sm.grid) {
        cx.save();
        // Garis minor per 1 cm
        cx.lineWidth = 0.8;
        for (let k = 1; k <= 30; k++) {
          if (k % 5 !== 0) {
            cx.strokeStyle = 'rgba(95, 168, 214, 0.08)';
            cx.beginPath();
            cx.moveTo(65, px(k));
            cx.lineTo(795, px(k));
            cx.stroke();
          }
        }
        // Garis vertikal per 45 px
        for (let xx = 70; xx <= 790; xx += 45) {
          cx.strokeStyle = (xx === 430) ? 'rgba(95, 168, 214, 0.22)' : 'rgba(95, 168, 214, 0.07)';
          cx.beginPath();
          cx.moveTo(xx, px(30));
          cx.lineTo(xx, Y0 + W * S);
          cx.stroke();
        }
        // Garis major per 5 cm & Label Ketinggian Sumbu Y
        cx.font = 'bold 11px "Courier New", monospace';
        for (let k = 0; k <= 30; k += 5) {
          cx.strokeStyle = (k === 15) ? 'rgba(63, 214, 255, 0.4)' : 'rgba(95, 168, 214, 0.22)';
          cx.lineWidth = (k === 0 || k === 15) ? 1.5 : 1;
          cx.beginPath();
          cx.moveTo(65, px(k));
          cx.lineTo(795, px(k));
          cx.stroke();

          // Angka skala di kedua sisi kanvas
          cx.fillStyle = (k === 15) ? '#3DDC84' : '#7FBCE3';
          cx.textAlign = 'right';
          cx.fillText(k + ' cm', 60, px(k) + 4);
          cx.textAlign = 'left';
          cx.fillText(k + ' cm', 800, px(k) + 4);
        }
        // Garis datum dasar tabung (0 cm)
        cx.strokeStyle = 'rgba(63, 214, 255, 0.6)';
        cx.lineWidth = 1.8;
        cx.beginPath();
        cx.moveTo(65, px(0));
        cx.lineTo(795, px(0));
        cx.stroke();
        cx.restore();
      }

      // 3. FLUIDA BER-MENISKUS REALISTIS & 3D GRADIENT SILINDER
      const c1 = F1[sm.f1][2], c2 = F2[sm.f2][2];
      const cxLeft = (AL[0] + AL[1]) / 2;   // 292
      const cxRight = (AR[0] + AR[1]) / 2; // 568

      if (sm.h0d > 0.01) {
        const yAirLeft = px(g.L);
        const yAirRight = px(g.R);
        const yBottom = Y0 + W * S;

        // Fluida 1 (Air Murni) dengan Shading 3D Silinder
        const gAirL = cx.createLinearGradient(AL[0], 0, AL[1], 0);
        gAirL.addColorStop(0, 'rgba(' + c1 + ', 0.72)');
        gAirL.addColorStop(0.3, 'rgba(' + c1 + ', 0.45)');
        gAirL.addColorStop(0.7, 'rgba(' + c1 + ', 0.55)');
        gAirL.addColorStop(1, 'rgba(' + c1 + ', 0.78)');

        cx.save();
        cx.beginPath();
        // Lengan kiri dengan lengkung meniskus cekung
        cx.moveTo(AL[0], yAirLeft);
        cx.quadraticCurveTo(cxLeft, yAirLeft + 4, AL[1], yAirLeft);
        cx.lineTo(AL[1], Y0);
        // Saluran penghubung horizontal bawah
        cx.lineTo(AR[0], Y0);
        // Lengan kanan hingga garis batas air
        cx.lineTo(AR[0], yAirRight);
        // Meniskus batas di lengan kanan
        cx.quadraticCurveTo(cxRight, yAirRight + (g.h2 > 0.01 ? 3 : 4), AR[1], yAirRight);
        // Dasar tabung
        cx.lineTo(AR[1], yBottom);
        cx.lineTo(AL[0], yBottom);
        cx.closePath();
        cx.fillStyle = gAirL;
        cx.fill();
        cx.restore();

        // Fluida 2 (Zat Uji Dituang di Lengan Kanan di Atas Garis Batas)
        if (g.h2 > 0.01) {
          const yF2Top = px(g.R + g.h2);
          const gF2 = cx.createLinearGradient(AR[0], 0, AR[1], 0);
          gF2.addColorStop(0, 'rgba(' + c2 + ', 0.82)');
          gF2.addColorStop(0.35, 'rgba(' + c2 + ', 0.52)');
          gF2.addColorStop(0.75, 'rgba(' + c2 + ', 0.64)');
          gF2.addColorStop(1, 'rgba(' + c2 + ', 0.85)');

          cx.save();
          cx.beginPath();
          // Puncak cairan 2 dengan lengkung meniskus cekung
          cx.moveTo(AR[0], yF2Top);
          cx.quadraticCurveTo(cxRight, yF2Top + 4, AR[1], yF2Top);
          cx.lineTo(AR[1], yAirRight);
          // Permukaan batas kontak fluida
          cx.quadraticCurveTo(cxRight, yAirRight + 3, AR[0], yAirRight);
          cx.closePath();
          cx.fillStyle = gF2;
          cx.fill();
          cx.restore();
        }

        // 4. GARIS LASER DATUM EMAS & TITIK KESETIMBANGAN HIDROSTATIS (PA = PB)
        if (g.h2 > 0.05) {
          const yDatum = px(g.R);
          cx.save();

          // Garis laser datum emas berpendar melintang
          cx.strokeStyle = '#FFB238';
          cx.shadowColor = 'rgba(255, 178, 56, 0.85)';
          cx.shadowBlur = 10;
          cx.lineWidth = 2;
          cx.setLineDash([7, 4]);
          cx.beginPath();
          cx.moveTo(AL[0] - 45, yDatum);
          cx.lineTo(AR[1] + 45, yDatum);
          cx.stroke();
          cx.setLineDash([]);
          cx.shadowBlur = 0;

          // Titik Simpul A (Lengan Kiri pada Garis Datum)
          cx.fillStyle = '#FFB238';
          cx.beginPath(); cx.arc(cxLeft, yDatum, 4.5, 0, Math.PI * 2); cx.fill();
          cx.strokeStyle = '#ffffff'; cx.lineWidth = 1.5;
          cx.beginPath(); cx.arc(cxLeft, yDatum, 7.5, 0, Math.PI * 2); cx.stroke();
          cx.fillStyle = '#FFB238';
          cx.font = 'bold 12px Arial';
          cx.textAlign = 'right';
          cx.fillText('Titik A (PA)', AL[0] - 8, yDatum - 6);

          // Titik Simpul B (Lengan Kanan pada Garis Datum)
          cx.fillStyle = '#FFB238';
          cx.beginPath(); cx.arc(cxRight, yDatum, 4.5, 0, Math.PI * 2); cx.fill();
          cx.strokeStyle = '#ffffff'; cx.lineWidth = 1.5;
          cx.beginPath(); cx.arc(cxRight, yDatum, 7.5, 0, Math.PI * 2); cx.stroke();
          cx.fillStyle = '#FFB238';
          cx.font = 'bold 12px Arial';
          cx.textAlign = 'left';
          cx.fillText('Titik B (PB)', AR[1] + 8, yDatum - 6);

          // Badge Pusat: PA = PB (Garis Acuan Datum Persamaan Hidrostatis)
          const badgeW = 210, badgeH = 22, badgeX = 430 - badgeW / 2, badgeY = yDatum - 11;
          cx.fillStyle = 'rgba(10, 20, 30, 0.92)';
          cx.strokeStyle = 'rgba(255, 178, 56, 0.75)';
          cx.lineWidth = 1.2;
          cx.beginPath();
          cx.roundRect(badgeX, badgeY, badgeW, badgeH, 6);
          cx.fill(); cx.stroke();
          cx.fillStyle = '#FFD272';
          cx.font = 'bold 11px Arial';
          cx.textAlign = 'center';
          cx.fillText('PA = PB  (Garis Acuan Datum)', 430, badgeY + 15);

          // Anotasi Kurung Ukur h1 (Tinggi Kolom Air Di Atas Garis Datum)
          const yL = px(g.L);
          if (yDatum - yL > 8) {
            cx.strokeStyle = '#7FBCE3';
            cx.lineWidth = 1.5;
            const h1x = AL[0] - 16;
            cx.beginPath();
            cx.moveTo(h1x, yDatum); cx.lineTo(h1x, yL);
            cx.moveTo(h1x - 4, yDatum); cx.lineTo(h1x + 4, yDatum);
            cx.moveTo(h1x - 4, yL); cx.lineTo(h1x + 4, yL);
            cx.stroke();
            cx.fillStyle = '#7FBCE3';
            cx.font = 'bold 11px Arial';
            cx.textAlign = 'right';
            cx.fillText('h₁ (air)', h1x - 6, (yDatum + yL) / 2 + 4);
          }

          // Anotasi Kurung Ukur h2 (Tinggi Kolom Zat Cair Diuji)
          const yRTop = px(g.R + g.h2);
          if (yDatum - yRTop > 8) {
            cx.strokeStyle = '#FFB238';
            cx.lineWidth = 1.5;
            const h2x = AR[1] + 16;
            cx.beginPath();
            cx.moveTo(h2x, yDatum); cx.lineTo(h2x, yRTop);
            cx.moveTo(h2x - 4, yDatum); cx.lineTo(h2x + 4, yDatum);
            cx.moveTo(h2x - 4, yRTop); cx.lineTo(h2x + 4, yRTop);
            cx.stroke();
            cx.fillStyle = '#FFB238';
            cx.font = 'bold 11px Arial';
            cx.textAlign = 'left';
            cx.fillText('h₂', h2x + 6, (yDatum + yRTop) / 2 + 4);
          }

          cx.restore();
        }
      }

      // 5. TABUNG KACA PIPA-U (LEBIH PENDEK & LEBIH LEBAR - PAS DI TENGAH)
      cx.save();
      cx.strokeStyle = 'rgba(127, 205, 255, 0.85)';
      cx.lineWidth = 3.5;
      cx.shadowColor = 'rgba(63, 214, 255, 0.45)';
      cx.shadowBlur = 6;
      cx.beginPath();
      // Dinding tabung luar
      cx.moveTo(AL[0], px(30));
      cx.lineTo(AL[0], Y0 + W * S);
      cx.lineTo(AR[1], Y0 + W * S);
      cx.lineTo(AR[1], px(30));
      // Dinding tabung dalam
      cx.moveTo(AL[1], px(30));
      cx.lineTo(AL[1], Y0);
      cx.lineTo(AR[0], Y0);
      cx.lineTo(AR[0], px(30));
      cx.stroke();
      cx.shadowBlur = 0;

      // Pantulan cahaya specular kaca silinder vertikal
      cx.fillStyle = 'rgba(255, 255, 255, 0.16)';
      cx.fillRect(AL[0] + 6, px(30), 4, Y0 + W * S - px(30) - 8);
      cx.fillRect(AR[0] + 6, px(30), 4, Y0 + W * S - px(30) - 8);

      // Cincin bibir tabung kaca (Glass Flange / Rim) di mulut atas tabung
      [AL[0], AR[0]].forEach(function (x) {
        cx.strokeStyle = 'rgba(180, 225, 255, 0.95)';
        cx.lineWidth = 2.5;
        cx.strokeRect(x - 3, px(30) - 3, (AL[1] - AL[0]) + 6, 4);
      });
      cx.restore();

      // 6. TEKANAN ATMOSFER (P0 = 101,3 kPa) JIKA AKTIF
      if (sm.atm) {
        cx.save();
        cx.fillStyle = '#ffb238';
        cx.strokeStyle = '#ffb238';
        cx.font = 'bold 13px Arial';
        cx.textAlign = 'center';
        cx.shadowColor = 'rgba(255, 178, 56, 0.65)';
        cx.shadowBlur = 8;

        [cxLeft, cxRight].forEach(function (x) {
          cx.fillText('P₀ = 101,3 kPa', x, px(30) - 24);
          [-14, 0, 14].forEach(function (dx) {
            const arrX = x + dx;
            cx.lineWidth = 2;
            cx.beginPath();
            cx.moveTo(arrX, px(30) - 18);
            cx.lineTo(arrX, px(30) - 5);
            cx.lineTo(arrX - 3, px(30) - 10);
            cx.moveTo(arrX, px(30) - 5);
            cx.lineTo(arrX + 3, px(30) - 10);
            cx.stroke();
          });
        });
        cx.restore();
      }

      // 7. BADGE NAMA ZAT CAIR DI DASAR PIPA U
      cx.save();
      cx.textAlign = 'center';
      // Lengan Kiri (Air)
      cx.fillStyle = 'rgba(15, 30, 48, 0.88)';
      cx.strokeStyle = 'rgba(95, 168, 214, 0.55)';
      cx.lineWidth = 1.2;
      cx.beginPath();
      cx.roundRect(cxLeft - 95, Y0 + W * S + 14, 190, 26, 6);
      cx.fill(); cx.stroke();
      cx.fillStyle = '#7FBCE3';
      cx.font = 'bold 12px Arial';
      cx.fillText('💧 Air Murni (ρ₁ = 1.000 kg/m³)', cxLeft, Y0 + W * S + 31);

      // Lengan Kanan (Cairan 2)
      if (g.h2 > 0.05) {
        const fName = F2[sm.f2][3] + ' ' + F2[sm.f2][0];
        cx.fillStyle = 'rgba(25, 20, 15, 0.88)';
        cx.strokeStyle = 'rgba(255, 178, 56, 0.65)';
        cx.lineWidth = 1.2;
        cx.beginPath();
        cx.roundRect(cxRight - 95, Y0 + W * S + 14, 190, 26, 6);
        cx.fill(); cx.stroke();
        cx.fillStyle = '#FFD272';
        cx.font = 'bold 12px Arial';
        cx.fillText(fName + ' (Cairan Diuji)', cxRight, Y0 + W * S + 31);
      }
      cx.restore();

      // 8. PENGGARIS SEPERTI TADI (ADA 5 GARIS PER KELIPATAN 5 CM - 30 CM)
      if (sm.ruler) {
        cx.save();
        const rw = 34, top = sm.ry - 30 * S;

        // Bayangan lembut
        cx.shadowColor = 'rgba(0, 0, 0, 0.35)';
        cx.shadowBlur = 8;
        cx.shadowOffsetX = 2;
        cx.shadowOffsetY = 2;

        // Bodi penggaris hangat transparan
        cx.fillStyle = 'rgba(255, 235, 160, 0.95)';
        cx.fillRect(sm.rx, top, rw, 30 * S + 12);
        cx.shadowColor = 'transparent';

        // Border penggaris
        cx.strokeStyle = '#333';
        cx.lineWidth = 1;
        cx.strokeRect(sm.rx, top, rw, 30 * S + 12);

        // Skala 5 garis per kelipatan 5 cm (setiap 1 cm ada garis)
        cx.strokeStyle = '#222';
        cx.fillStyle = '#222';
        cx.lineWidth = 1;
        for (let k = 0; k <= 30; k++) {
          const y = sm.ry - k * S;
          const isMajor = (k % 5 === 0);
          const L = isMajor ? 18 : 9;
          cx.beginPath();
          cx.moveTo(sm.rx + rw, y);
          cx.lineTo(sm.rx + rw - L, y);
          cx.stroke();
          if (isMajor) {
            cx.font = 'bold 11px Arial';
            cx.textAlign = 'left';
            cx.fillText(k, sm.rx + 3, y + 4);
          }
        }

        // Garis merah tebal di 0 cm
        cx.fillStyle = '#d33';
        cx.fillRect(sm.rx, sm.ry - 1.5, rw, 3);
        cx.fillStyle = '#222';
        cx.font = 'bold 11px Arial';
        cx.fillText('cm', sm.rx + 3, sm.ry + 18);

        // Hairline laser projection guide tipis dari titik 0 ke pipa U
        cx.strokeStyle = 'rgba(220, 38, 38, 0.55)';
        cx.lineWidth = 1;
        cx.setLineDash([4, 4]);
        cx.beginPath();
        if (sm.rx < 430) {
          cx.moveTo(sm.rx + rw, sm.ry);
          cx.lineTo(sm.rx + rw + 320, sm.ry);
        } else {
          cx.moveTo(sm.rx, sm.ry);
          cx.lineTo(sm.rx - 320, sm.ry);
        }
        cx.stroke();
        cx.setLineDash([]);
        cx.restore();
      }

      // 9. PENGUKUR TEKANAN DIGITAL MODERN (PIEZO PROBE & HUD DIAL GAUGE)
      if (sm.gauge) {
        cx.save();
        const r = pressure(sm.gx, sm.gy);

        // Kabel fleksibel meliuk dari probe ke dial HUD
        const dialX = sm.gx + 46, dialY = sm.gy - 46;
        cx.strokeStyle = '#1e293b';
        cx.lineWidth = 4;
        cx.beginPath();
        cx.moveTo(sm.gx, sm.gy - 22);
        cx.bezierCurveTo(sm.gx + 10, sm.gy - 45, dialX - 25, dialY + 15, dialX - 18, dialY + 22);
        cx.stroke();
        cx.strokeStyle = '#5FA8D6';
        cx.lineWidth = 1.5;
        cx.stroke();

        // Batang Jarum Probe Stainless Steel
        cx.strokeStyle = '#94a3b8';
        cx.lineWidth = 3;
        cx.beginPath();
        cx.moveTo(sm.gx, sm.gy - 24);
        cx.lineTo(sm.gx, sm.gy);
        cx.stroke();

        // Cincin pangkal sensor
        cx.fillStyle = '#475569';
        cx.fillRect(sm.gx - 3, sm.gy - 24, 6, 6);

        // Ujung Sensor Probe (Piezo-tip) dengan LED Glow
        cx.beginPath();
        cx.arc(sm.gx, sm.gy, 6, 0, Math.PI * 2);
        if (r) {
          cx.fillStyle = '#3DDC84';
          cx.shadowColor = '#3DDC84';
          cx.shadowBlur = 12;
        } else {
          cx.fillStyle = '#64748b';
          cx.shadowColor = 'transparent';
        }
        cx.fill();
        cx.shadowBlur = 0;
        cx.strokeStyle = '#ffffff';
        cx.lineWidth = 1.5;
        cx.stroke();

        // Crosshair halus pada sensor
        cx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
        cx.lineWidth = 1;
        cx.beginPath();
        cx.moveTo(sm.gx - 9, sm.gy); cx.lineTo(sm.gx + 9, sm.gy);
        cx.moveTo(sm.gx, sm.gy - 9); cx.lineTo(sm.gx + 9, sm.gy);
        cx.stroke();

        // HUD Dial Digital Melingkar (Sci-Fi Instrument)
        const dialR = 30;
        cx.fillStyle = '#0f172a';
        cx.shadowColor = 'rgba(0, 0, 0, 0.55)';
        cx.shadowBlur = 10;
        cx.beginPath();
        cx.arc(dialX, dialY, dialR, 0, Math.PI * 2);
        cx.fill();
        cx.shadowBlur = 0;

        // Bezel cyan luar
        cx.strokeStyle = 'rgba(63, 214, 255, 0.65)';
        cx.lineWidth = 2;
        cx.stroke();

        // Arc Busur Skala Tekanan (Hijau -> Kuning -> Merah)
        cx.lineWidth = 3;
        const startA = Math.PI * 0.75, endA = Math.PI * 2.25;
        cx.strokeStyle = '#3DDC84';
        cx.beginPath();
        cx.arc(dialX, dialY, dialR - 6, startA, startA + Math.PI * 0.5);
        cx.stroke();
        cx.strokeStyle = '#F5C84B';
        cx.beginPath();
        cx.arc(dialX, dialY, dialR - 6, startA + Math.PI * 0.5, startA + Math.PI * 1.0);
        cx.stroke();
        cx.strokeStyle = '#EF4444';
        cx.beginPath();
        cx.arc(dialX, dialY, dialR - 6, startA + Math.PI * 1.0, endA);
        cx.stroke();

        // Jarum Penunjuk Dial Analog
        const pTot = r ? (r.p + (sm.atm ? P0 : 0)) : (sm.atm ? P0 : 0);
        const maxP = sm.atm ? P0 + 50000 : 50000;
        const frac = Math.min(1, Math.max(0, pTot / maxP));
        const needleA = startA + frac * (endA - startA);

        cx.strokeStyle = '#FF3B30';
        cx.lineWidth = 2.5;
        cx.beginPath();
        cx.moveTo(dialX, dialY);
        cx.lineTo(dialX + (dialR - 9) * Math.cos(needleA), dialY + (dialR - 9) * Math.sin(needleA));
        cx.stroke();

        // Pivot tengah jarum
        cx.fillStyle = '#e2e8f0';
        cx.beginPath();
        cx.arc(dialX, dialY, 4, 0, Math.PI * 2);
        cx.fill();

        // Layar Digital Mini OLED di dalam dial
        cx.fillStyle = 'rgba(0, 0, 0, 0.85)';
        cx.fillRect(dialX - 22, dialY + 7, 44, 15);
        cx.strokeStyle = 'rgba(63, 214, 255, 0.4)';
        cx.lineWidth = 0.8;
        cx.strokeRect(dialX - 22, dialY + 7, 44, 15);

        cx.fillStyle = r ? '#3DDC84' : '#94a3b8';
        cx.font = 'bold 9px "Courier New", monospace';
        cx.textAlign = 'center';
        cx.fillText((pTot / 1000).toFixed(1) + 'k', dialX, dialY + 18);

        // Update teks pembacaan di kartu panel kanan
        const rd = $('hsRead');
        if (rd) {
          if (r) {
            const tot = r.p + (sm.atm ? P0 : 0);
            rd.innerHTML = 'Di dalam: <b style="color:#7FBCE3">' + r.n + '</b><br>' +
              'Kedalaman (h): <b>' + r.d.toFixed(1) + ' cm</b><br>' +
              'P hidrostatis: <b>' + (r.p / 1000).toFixed(2) + ' kPa</b><br>' +
              'P total (' + (sm.atm ? 'dengan P₀' : 'tanpa P₀') + '): <b>' + (tot / 1000).toFixed(2) + ' kPa</b>';
          } else {
            rd.innerHTML = 'Status: <span style="color:#BAC7D5">Di luar cairan</span><br>' +
              'Tekanan terukur: <b>' + (sm.atm ? (P0 / 1000).toFixed(1) + ' kPa (Udara Luar P₀)' : '0,00 kPa') + '</b><br>' +
              '<span style="font-size:12px;color:#7FBCE3;">Seret sensor ke dalam tabung pipa U.</span>';
          }
        }
        cx.restore();
      }
    }
    function frame(t) {
      if (!cv.isConnected) return;
      const dt = Math.min(0.05, (t - sm.last) / 1000 || 0); sm.last = t;
      const h0t = sm.filled ? H0 : 0;
      sm.h0d += Math.sign(h0t - sm.h0d) * Math.min(Math.abs(h0t - sm.h0d), 14 * dt);
      sm.h2d += Math.sign(sm.h2t - sm.h2d) * Math.min(Math.abs(sm.h2t - sm.h2d), 5 * dt);
      if (!sm.filled && sm.h0d < 0.01) sm.h2d = sm.h2t;
      draw(); sm.raf = requestAnimationFrame(frame);
    }
    const sim = { start: function () { cancelAnimationFrame(sm.raf); sm.last = performance.now(); sm.raf = requestAnimationFrame(frame); }, stop: function () { cancelAnimationFrame(sm.raf); } };
    function pt(e) { const r = cv.getBoundingClientRect(); return [(e.clientX - r.left) * cv.width / r.width, (e.clientY - r.top) * cv.height / r.height]; }
    cv.addEventListener('pointerdown', function (e) {
      const p = pt(e);
      if (sm.gauge && (Math.hypot(p[0] - sm.gx, p[1] - sm.gy) < 35 || Math.hypot(p[0] - (sm.gx + 46), p[1] - (sm.gy - 46)) < 32)) {
        sm.drag = ['g', 0, 0];
      }
      else if (sm.ruler && p[0] >= sm.rx && p[0] <= sm.rx + 36 && p[1] >= sm.ry - 30 * S - 12 && p[1] <= sm.ry + 20) {
        sm.drag = ['r', p[0] - sm.rx, p[1] - sm.ry];
      }
      if (sm.drag) { cv.setPointerCapture(e.pointerId); cv.style.cursor = 'grabbing'; }
    });
    cv.addEventListener('pointermove', function (e) {
      const p = pt(e);
      if (!sm.drag) {
        const hoverGauge = sm.gauge && (Math.hypot(p[0] - sm.gx, p[1] - sm.gy) < 35 || Math.hypot(p[0] - (sm.gx + 46), p[1] - (sm.gy - 46)) < 32);
        const hoverRuler = sm.ruler && p[0] >= sm.rx && p[0] <= sm.rx + 36 && p[1] >= sm.ry - 30 * S - 12 && p[1] <= sm.ry + 20;
        cv.style.cursor = (hoverGauge || hoverRuler) ? 'grab' : 'default';
        return;
      }
      if (sm.drag[0] === 'g') {
        sm.gx = Math.max(20, Math.min(840, p[0]));
        sm.gy = Math.max(20, Math.min(540, p[1]));
      } else {
        sm.rx = Math.max(0, Math.min(824, p[0] - sm.drag[1]));
        sm.ry = Math.max(30 * S + 5, Math.min(545, p[1] - sm.drag[2]));
      }
    });
    const up = function () { sm.drag = null; cv.style.cursor = 'default'; };
    cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);

    /* ================= LKPD IMPLEMENTATION (IDENTIK VISKOSITAS) ================= */
    /* ================= LKPD IMPLEMENTATION (SATU TABEL DATA TUNGGAL) ================= */
    function buildTableRows() {
      let html = '';
      for (let i = 1; i <= 5; i++) {
        html += '<tr data-row="' + i + '" data-checked="false">' +
          '<td style="font-weight:bold;color:#7FBCE3;">' + i + '</td>' +
          '<td><input type="text" class="hs-inp-fluid" placeholder="Pilih / Catat" style="color:#7FBCE3;font-weight:600;"></td>' +
          '<td><input type="text" class="hs-inp-r1" value="1000" readonly style="color:#BAC7D5;cursor:default;"></td>' +
          '<td><input type="number" step="0.1" class="hs-inp-h1" placeholder="—"></td>' +
          '<td><input type="number" step="0.1" class="hs-inp-h2" placeholder="—"></td>' +
          '<td><input type="number" step="1" class="hs-inp-rc" placeholder="—" style="color:#EDEFF1;font-weight:bold;"></td>' +
          '<td><input type="text" class="hs-inp-rs" placeholder="—" readonly style="color:#FFB238;font-weight:bold;cursor:default;"></td>' +
          '<td class="hs-cell-status" style="border-right:none;font-weight:bold;font-size:14px;color:#BAC7D5;">—</td>' +
        '</tr>';
      }
      return html;
    }

    $('hsLkpd').innerHTML = '<div class="menu-frame" style="width:100%; height:100%; position:relative; overflow:hidden;">' +
      '<div class="circuit"></div>' +
      '<div class="teori-wrap" style="display:flex; flex-direction:row; padding:0.8em 1.2em; gap:1em; max-width:1440px; margin:0 auto; align-items:flex-start; height:100%; box-sizing:border-box;">' +
        
        '<!-- KOLOM KIRI (Data Pribadi + Scroll Area Tujuan & Tabel) -->' +
        '<div style="flex:1.6; display:flex; flex-direction:column; gap:0.6em; height:100%; min-width:0;">' +
          
          '<!-- Identitas -->' +
          '<div style="display:flex; gap:10px; z-index:2;">' +
            '<input type="text" id="hsNamaInput" placeholder="Nama Lengkap" style="flex:2; background:#1C2228; border:1px solid #3A4451; border-radius:8px; padding:10px 15px; color:#EDEFF1; font-size:16px; outline:none;">' +
            '<input type="text" id="hsKelasInput" placeholder="Kelas" style="flex:1; background:#1C2228; border:1px solid #3A4451; border-radius:8px; padding:10px 15px; color:#EDEFF1; font-size:16px; outline:none;">' +
          '</div>' +

          '<!-- SCROLL AREA UNTUK TUJUAN & TABEL -->' +
          '<div class="modern-scroll" style="flex:1; overflow-y:auto; display:flex; flex-direction:column; gap:0.6em; padding-right:8px; z-index:2;">' +
            
            '<!-- Tujuan Pembelajaran -->' +
            '<div style="background:#1C2228; border:1px solid #3A4451; border-radius:8px; padding:0.8em 1.2em; display:flex; flex-direction:column; gap:0.4em; z-index:2;">' +
              '<div style="color:#7FBCE3; font-weight:bold; font-size:16px; letter-spacing:1px; text-transform:uppercase; border-bottom:1px dashed #3A4451; padding-bottom:5px; margin-bottom:2px;">&#127919; TUJUAN KEGIATAN</div>' +
              '<div style="font-size:18px; line-height:1.5; color:#EDEFF1; text-align:justify;">' +
                'Setelah melakukan virtual eksperimen dengan pipa U, murid dapat menganalisis hubungan massa jenis zat cair dan tinggi kolom cairan berdasarkan Hukum Pokok Hidrostatis sesuai kaidah ilmiah.' +
              '</div>' +
            '</div>' +

            '<!-- Tabel Pengamatan Wrapper (1 Tabel Tunggal) -->' +
            '<div style="background:#151A20; border:1px solid #3A4451; border-radius:10px; display:flex; flex-direction:column; z-index:2;">' +
              '<div style="background:#1C2228; border-bottom:1px solid #3A4451; border-radius:10px 10px 0 0; padding:10px 14px; display:flex; align-items:center; justify-content:space-between;">' +
                '<div style="display:flex; align-items:center; gap:10px;">' +
                  '<div style="font-size:20px;">&#128202;</div>' +
                  '<div>' +
                    '<div style="color:#7FBCE3; font-weight:bold; font-size:16px; letter-spacing:1px; text-transform:uppercase;">TABEL PENGAMATAN PIPA-U</div>' +
                    '<div style="color:#BAC7D5; font-size:13px;">Hukum Pokok Hidrostatis: &rho;₁ &middot; h₁ = &rho;₂ &middot; h₂ &nbsp;|&nbsp; Zat Cair 1 = Air (&rho;₁ = 1.000 kg/m&sup3;)</div>' +
                  '</div>' +
                '</div>' +
              '</div>' +
              
              '<div style="display:flex; flex-direction:column; padding:0; overflow-x:auto;">' +
                '<table class="tbl-lkpd-hs">' +
                  '<thead style="background:#262D35; border-bottom:1px solid #3A4451;">' +
                    '<tr>' +
                      '<th style="color:#7FBCE3; width:5%;">No</th>' +
                      '<th style="color:#7FBCE3; width:18%;">Zat Cair Diuji<br><span class="unit">(Cairan 2)</span></th>' +
                      '<th style="color:#BAC7D5; width:13%;">&rho;₁ Air<br><span class="unit">(kg/m&sup3;)</span></th>' +
                      '<th style="color:#7FBCE3; width:13%;">h₁ Air<br><span class="unit">(cm)</span></th>' +
                      '<th style="color:#7FBCE3; width:13%;">h₂ Cairan<br><span class="unit">(cm)</span></th>' +
                      '<th style="color:#EDEFF1; width:15%;">&rho;₂ Hasil Ukur<br><span class="unit">(kg/m&sup3;)</span></th>' +
                      '<th style="color:#FFB238; width:15%;">&rho;₂ Nilai Sebenarnya<br><span class="unit">(kg/m&sup3;)</span></th>' +
                      '<th style="color:#EDEFF1; width:8%; border-right:none;">Status</th>' +
                    '</tr>' +
                  '</thead>' +
                  '<tbody id="hs-lkpd-tbody">' + buildTableRows() + '</tbody>' +
                '</table>' +
              '</div>' +
            '</div>' +
          '</div> <!-- /SCROLL AREA -->' +

          '<!-- Tombol Aksi Kiri -->' +
          '<div style="display:flex; gap:10px; z-index:2; margin-top:2px;">' +
            '<button id="hsCekJawabanBtn" style="flex:1; background:#B8860B; color:#fff; border:none; padding:10px; border-radius:6px; font-weight:bold; font-size:16px; cursor:pointer; box-shadow:0 4px 6px rgba(0,0,0,0.3); display:flex; justify-content:center; align-items:center; gap:8px;">' +
              '&#10003; CEK JAWABAN' +
            '</button>' +
            '<button id="hsCetakLaporanBtn" style="flex:1; background:#1E5084; color:#fff; border:none; padding:10px; border-radius:6px; font-weight:bold; font-size:16px; cursor:pointer; box-shadow:0 4px 6px rgba(0,0,0,0.3); display:flex; justify-content:center; align-items:center; gap:8px;">' +
              '&#128438; CETAK LAPORAN' +
            '</button>' +
          '</div>' +
        '</div>' +

        '<!-- KOLOM KANAN (Tab & Input Analisis, Evaluasi, Kesimpulan) -->' +
        '<div style="flex:1; display:flex; flex-direction:column; gap:0.8em; height:100%; min-width:0;">' +
          
          '<!-- Tabs Atas Kanan -->' +
          '<div style="display:flex; flex-wrap:nowrap; gap:10px; background:#1C2228; padding:8px; border-radius:10px; border:1px solid #3A4451; z-index:2;">' +
            '<button class="hs-lkpd-tab-btn active" id="hs-btn-analisis" style="flex:1; background:rgba(95,168,214,0.2); color:#7FBCE3; border:1px solid rgba(95,168,214,0.8); box-shadow:0 0 10px rgba(95,168,214,0.3); padding:10px; border-radius:6px; font-weight:bold; cursor:pointer; font-size:18px; transition:0.2s; white-space:nowrap;">&#128200; Analisis</button>' +
            '<button class="hs-lkpd-tab-btn" id="hs-btn-evaluasi" style="flex:1; background:#262D35; color:#BAC7D5; border:1px solid #3A4451; padding:10px; border-radius:6px; font-weight:bold; cursor:pointer; font-size:18px; transition:0.2s; white-space:nowrap;">&#128394; Evaluasi</button>' +
            '<button class="hs-lkpd-tab-btn" id="hs-btn-kesimpulan" style="flex:1; background:#262D35; color:#BAC7D5; border:1px solid #3A4451; padding:10px; border-radius:6px; font-weight:bold; cursor:pointer; font-size:18px; transition:0.2s; white-space:nowrap;">&#128161; Kesimpulan</button>' +
          '</div>' +

          '<!-- Area Konten Tab Kanan -->' +
          '<div style="flex:1; background:#1C2228; border:1px solid #3A4451; border-radius:10px; padding:1.2em; position:relative; overflow:hidden; z-index:2; display:flex; flex-direction:column;">' +
            
            '<!-- Panel Analisis -->' +
            '<div id="hs-panel-analisis" class="hs-lkpd-panel" style="display:flex; flex-direction:column; gap:0.8em; height:100%;">' +
              '<div style="display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.2); border-radius:8px; padding:10px 15px;">' +
                '<div style="color:#7FBCE3; font-size:22px; font-weight:bold;">TUGAS ANALISIS</div>' +
                '<div style="color:#EDEFF1; font-size:22px; font-weight:bold;" id="hsAnalisisSlideIndicator">Slide 1 / 5</div>' +
              '</div>' +

              '<div class="hs-slides-wrap" id="hs-analisis-slides-container" style="flex:1; display:flex; flex-direction:column; overflow:hidden;">' +
                '<!-- SLIDE 1 -->' +
                '<div id="hs-analisis-slide-1" class="hs-slide-item" style="flex:1; display:flex; flex-direction:column;">' +
                  '<div style="font-size:19px; line-height:1.5; color:#EDEFF1; text-align:justify; margin-bottom:12px;">' +
                    '1. Berdasarkan data pengamatan, bagaimana hubungan antara massa jenis cairan 2 (&rho;&sub2;) dengan selisih tinggi kolom cairan (h&sub2; - h&sub1;) pada pipa U? Jelaskan!' +
                  '</div>' +
                  '<textarea placeholder="Ketik jawaban di sini..." style="flex:1; width:100%; background:rgba(0,0,0,0.2); border:1px solid #3A4451; border-radius:8px; padding:14px; color:#EDEFF1; font-family:inherit; font-size:18px; text-align:justify; resize:none; outline:none; line-height:1.5;"></textarea>' +
                '</div>' +
                '<!-- SLIDE 2 -->' +
                '<div id="hs-analisis-slide-2" class="hs-slide-item" style="flex:1; display:none; flex-direction:column;">' +
                  '<div style="font-size:19px; line-height:1.5; color:#EDEFF1; text-align:justify; margin-bottom:12px;">' +
                    '2. Mengapa zat cair yang memiliki massa jenis lebih kecil (seperti bensin atau minyak) selalu memiliki tinggi kolom (h&sub2;) yang lebih tinggi dibandingkan air (h&sub1;) di atas garis batas?' +
                  '</div>' +
                  '<textarea placeholder="Ketik jawaban di sini..." style="flex:1; width:100%; background:rgba(0,0,0,0.2); border:1px solid #3A4451; border-radius:8px; padding:14px; color:#EDEFF1; font-family:inherit; font-size:18px; text-align:justify; resize:none; outline:none; line-height:1.5;"></textarea>' +
                '</div>' +
                '<!-- SLIDE 3 -->' +
                '<div id="hs-analisis-slide-3" class="hs-slide-item" style="flex:1; display:none; flex-direction:column;">' +
                  '<div style="font-size:19px; line-height:1.5; color:#EDEFF1; text-align:justify; margin-bottom:12px;">' +
                    '3. Bagaimana besar tekanan hidrostatis pada titik-titik yang terletak pada satu garis batas mendatar yang sama di dalam zat cair yang sejenis? Jelaskan kaitannya dengan Hukum Pokok Hidrostatis!' +
                  '</div>' +
                  '<textarea placeholder="Ketik jawaban di sini..." style="flex:1; width:100%; background:rgba(0,0,0,0.2); border:1px solid #3A4451; border-radius:8px; padding:14px; color:#EDEFF1; font-family:inherit; font-size:18px; text-align:justify; resize:none; outline:none; line-height:1.5;"></textarea>' +
                '</div>' +
                '<!-- SLIDE 4 -->' +
                '<div id="hs-analisis-slide-4" class="hs-slide-item" style="flex:1; display:none; flex-direction:column;">' +
                  '<div style="font-size:19px; line-height:1.5; color:#EDEFF1; text-align:justify; margin-bottom:12px;">' +
                    '4. Apakah luas penampang atau diameter pipa U (misalnya jika lengan kiri dibuat lebih lebar dari lengan kanan) memengaruhi selisih tinggi kolom zat cair h&sub1; dan h&sub2;? Jelaskan alasannya!' +
                  '</div>' +
                  '<textarea placeholder="Ketik jawaban di sini..." style="flex:1; width:100%; background:rgba(0,0,0,0.2); border:1px solid #3A4451; border-radius:8px; padding:14px; color:#EDEFF1; font-family:inherit; font-size:18px; text-align:justify; resize:none; outline:none; line-height:1.5;"></textarea>' +
                '</div>' +
                '<!-- SLIDE 5 -->' +
                '<div id="hs-analisis-slide-5" class="hs-slide-item" style="flex:1; display:none; flex-direction:column;">' +
                  '<div style="font-size:19px; line-height:1.5; color:#EDEFF1; text-align:justify; margin-bottom:12px;">' +
                    '5. Turunkan persamaan matematis &rho;&sub1;&middot;h&sub1; = &rho;&sub2;&middot;h&sub2; dari kesetimbangan tekanan di titik batas, dan jelaskan bagaimana pipa U dapat dimanfaatkan untuk menentukan massa jenis zat cair yang belum diketahui!' +
                  '</div>' +
                  '<textarea placeholder="Ketik penjelasan Anda di sini..." style="flex:1; width:100%; background:rgba(0,0,0,0.2); border:1px solid #3A4451; border-radius:8px; padding:14px; color:#EDEFF1; font-family:inherit; font-size:18px; text-align:justify; resize:none; outline:none; line-height:1.5;"></textarea>' +
                '</div>' +
              '</div>' +

              '<!-- Umpan Balik Analisis -->' +
              '<div id="hs-analisis-feedback" class="modern-scroll" style="display:none; flex:1; overflow-y:auto; padding:15px; background:rgba(61,220,132,0.1); border:1px solid #3DDC84; border-radius:8px; margin-top:5px;">' +
                '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px; gap:10px; flex-wrap:wrap;">' +
                  '<h3 style="color:#3DDC84; font-size:22px; margin:0; white-space:nowrap;">KUNCI JAWABAN &amp; UMPAN BALIK</h3>' +
                  '<button id="hsBtnCekJawabanAnalisis" style="background:#1E5084; color:#fff; border:none; padding:8px 16px; border-radius:6px; font-weight:bold; font-size:16px; cursor:pointer; box-shadow:0 2px 4px rgba(0,0,0,0.3);">Lihat Jawaban Saya</button>' +
                '</div>' +
                '<div style="font-size:18px; color:#EDEFF1; line-height:1.6; text-align:justify;">' +
                  '<b>1.</b> Semakin kecil massa jenis cairan 2 (&rho;&sub2;), semakin tinggi kolom h&sub2; yang dibutuhkan untuk mengimbangi kolom air h&sub1;, sehingga selisih (h&sub2; - h&sub1;) semakin besar. Hal ini menunjukkan massa jenis berbanding terbalik dengan tinggi kolom.<br><br>' +
                  '<b>2.</b> Karena cairan 2 lebih ringan (&rho;&sub2; &lt; &rho;&sub1;), maka dibutuhkan volume dan tinggi kolom zat cair yang lebih besar agar berat kolom zat cair tersebut dapat memberikan tekanan yang sama besar dengan tekanan kolom air di kaki lainnya.<br><br>' +
                  '<b>3.</b> Berdasarkan Hukum Pokok Hidrostatis, semua titik yang berada pada satu bidang datar mendatar di dalam zat cair sejenis yang berhubungan memiliki tekanan yang sama besar (P&sub1; = P&sub2;).<br><br>' +
                  '<b>4.</b> Tidak berpengaruh. Berdasarkan paradoks hidrostatis, tekanan hidrostatis murni hanya dipengaruhi oleh massa jenis fluida, percepatan gravitasi, dan kedalaman tegak lurus (h), bukan bentuk maupun luas penampang pipa.<br><br>' +
                  '<b>5.</b> Kesetimbangan di titik batas: P&sub1; = P&sub2; &rarr; P₀ + &rho;&sub1;&middot;g&middot;h&sub1; = P₀ + &rho;&sub2;&middot;g&middot;h&sub2; &rarr; <b>&rho;&sub1;&middot;h&sub1; = &rho;&sub2;&middot;h&sub2;</b>. Dengan mengetahui &rho;&sub1; (air = 1000 kg/m³) serta mengukur h&sub1; dan h&sub2;, maka massa jenis zat cair dapat ditentukan: &rho;&sub2; = (&rho;&sub1;&middot;h&sub1;) / h&sub2;.' +
                '</div>' +
              '</div>' +

              '<!-- Navigasi Bawah Analisis -->' +
              '<div id="hs-analisis-controls" style="display:flex; justify-content:space-between; margin-top:5px; align-items:center;">' +
                '<button id="hsBtnAnalisisPrev" style="background:#262D35; color:#BAC7D5; border:1px solid #3A4451; padding:10px 20px; border-radius:6px; font-weight:bold; font-size:20px; cursor:pointer; opacity:0.5; pointer-events:none;">' +
                  '&#10094; Sebelumnya' +
                '</button>' +
                '<button id="hsBtnAnalisisNext" style="background:#1E5084; color:#fff; border:none; padding:10px 20px; border-radius:6px; font-weight:bold; font-size:20px; cursor:pointer;">' +
                  'Selanjutnya &#10095;' +
                '</button>' +
                '<button id="hsBtnAnalisisSelesai" style="display:none; background:#3DDC84; color:#0a1316; border:none; padding:10px 20px; border-radius:6px; font-weight:bold; font-size:20px; cursor:pointer;">' +
                  'SELESAI &#10003;' +
                '</button>' +
              '</div>' +
            '</div>' +

            '<!-- Panel Evaluasi -->' +
            '<div id="hs-panel-evaluasi" class="hs-lkpd-panel" style="display:none; flex-direction:column; gap:0.8em; height:100%;">' +
              '<div style="display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.2); border-radius:8px; padding:10px 15px;">' +
                '<div style="color:#7FBCE3; font-size:22px; font-weight:bold;">TUGAS EVALUASI</div>' +
                '<div style="color:#EDEFF1; font-size:22px; font-weight:bold;" id="hsEvaluasiSlideIndicator">Slide 1 / 4</div>' +
              '</div>' +

              '<div class="hs-slides-wrap" id="hs-evaluasi-slides-container" style="flex:1; display:flex; flex-direction:column; overflow:hidden;">' +
                '<!-- SLIDE 1 -->' +
                '<div id="hs-evaluasi-slide-1" class="hs-slide-item" style="flex:1; display:flex; flex-direction:column;">' +
                  '<div style="font-size:19px; line-height:1.5; color:#EDEFF1; text-align:justify; margin-bottom:15px;">' +
                    '1. Pada pipa U yang berisi dua jenis zat cair tidak bercampur, zat cair yang memiliki massa jenis lebih besar akan memiliki tinggi kolom cairan yang lebih tinggi di atas bidang batas pemisah.' +
                  '</div>' +
                  '<div style="display:flex; gap:10px; margin-top:20px;">' +
                    '<button class="hs-eval-btn" data-slide="1" data-ans="Benar" style="flex:1; background:#262D35; color:#EDEFF1; border:1px solid #3A4451; border-radius:8px; padding:15px; font-size:22px; font-weight:bold; cursor:pointer;">BENAR</button>' +
                    '<button class="hs-eval-btn" data-slide="1" data-ans="Salah" style="flex:1; background:#262D35; color:#EDEFF1; border:1px solid #3A4451; border-radius:8px; padding:15px; font-size:22px; font-weight:bold; cursor:pointer;">SALAH</button>' +
                  '</div>' +
                '</div>' +
                '<!-- SLIDE 2 -->' +
                '<div id="hs-evaluasi-slide-2" class="hs-slide-item" style="flex:1; display:none; flex-direction:column;">' +
                  '<div style="font-size:19px; line-height:1.5; color:#EDEFF1; text-align:justify; margin-bottom:15px;">' +
                    '2. Tekanan hidrostatis di dasar wadah hanya dipengaruhi oleh massa jenis zat cair, percepatan gravitasi, dan kedalaman titik dari permukaan bebas, serta tidak dipengaruhi oleh bentuk maupun luas penampang wadah.' +
                  '</div>' +
                  '<div style="display:flex; gap:10px; margin-top:20px;">' +
                    '<button class="hs-eval-btn" data-slide="2" data-ans="Benar" style="flex:1; background:#262D35; color:#EDEFF1; border:1px solid #3A4451; border-radius:8px; padding:15px; font-size:22px; font-weight:bold; cursor:pointer;">BENAR</button>' +
                    '<button class="hs-eval-btn" data-slide="2" data-ans="Salah" style="flex:1; background:#262D35; color:#EDEFF1; border:1px solid #3A4451; border-radius:8px; padding:15px; font-size:22px; font-weight:bold; cursor:pointer;">SALAH</button>' +
                  '</div>' +
                '</div>' +
                '<!-- SLIDE 3 -->' +
                '<div id="hs-evaluasi-slide-3" class="hs-slide-item" style="flex:1; display:none; flex-direction:column;">' +
                  '<div style="font-size:19px; line-height:1.5; color:#EDEFF1; text-align:justify; margin-bottom:10px;">' +
                    '3. Sebuah pipa U diisi air (&rho;&sub1; = 1000 kg/m&sup3;). Ke dalam lengan kanan dituangkan minyak setinggi h&sub2; = 10 cm. Jika selisih tinggi permukaan air pada kedua lengan adalah h&sub1; = 8 cm diukur dari garis batas, berapakah massa jenis minyak tersebut dalam satuan kg/m&sup3;? (Ketikkan angkanya saja)' +
                  '</div>' +
                  '<textarea placeholder="Ketik angka jawaban Anda di sini (misal: 800)..." style="flex:none; height:80px; min-height:80px; width:100%; margin-bottom:10px; background:rgba(0,0,0,0.2); border:1px solid #3A4451; border-radius:8px; padding:10px 15px; color:#EDEFF1; font-family:inherit; font-size:20px; text-align:justify; resize:none; outline:none; line-height:1.5;"></textarea>' +
                '</div>' +
                '<!-- SLIDE 4 -->' +
                '<div id="hs-evaluasi-slide-4" class="hs-slide-item" style="flex:1; display:none; flex-direction:column;">' +
                  '<div style="font-size:19px; line-height:1.5; color:#EDEFF1; text-align:justify; margin-bottom:10px;">' +
                    '4. Seorang penyelam menyelam hingga kedalaman 6 meter di bawah permukaan danau air tawar (&rho; = 1000 kg/m&sup3;, g = 10 m/s&sup2;). Jika tekanan udara luar diabaikan, berapakah besar tekanan hidrostatis yang dialami penyelam dalam satuan kiloPascal (kPa)? (Ketikkan angkanya saja)' +
                  '</div>' +
                  '<textarea placeholder="Ketik angka jawaban Anda di sini (misal: 60)..." style="flex:none; height:80px; min-height:80px; width:100%; margin-bottom:10px; background:rgba(0,0,0,0.2); border:1px solid #3A4451; border-radius:8px; padding:10px 15px; color:#EDEFF1; font-family:inherit; font-size:20px; text-align:justify; resize:none; outline:none; line-height:1.5;"></textarea>' +
                '</div>' +
              '</div>' +

              '<!-- Umpan Balik Evaluasi -->' +
              '<div id="hs-evaluasi-feedback" class="modern-scroll" style="display:none; flex:1; overflow-y:auto; padding:15px; background:rgba(61,220,132,0.1); border:1px solid #3DDC84; border-radius:8px; margin-top:5px;">' +
                '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px; gap:10px; flex-wrap:wrap;">' +
                  '<h3 style="color:#3DDC84; font-size:22px; margin:0; white-space:nowrap;">KUNCI JAWABAN &amp; PEMBAHASAN</h3>' +
                  '<button id="hsBtnCekJawabanEvaluasi" style="background:#1E5084; color:#fff; border:none; padding:8px 16px; border-radius:6px; font-weight:bold; font-size:16px; cursor:pointer; box-shadow:0 2px 4px rgba(0,0,0,0.3);">Cek Jawaban Saya</button>' +
                '</div>' +
                '<div style="font-size:18px; color:#EDEFF1; line-height:1.6; text-align:justify;">' +
                  '<b>1. SALAH</b>. Zat cair yang memiliki massa jenis lebih besar akan memiliki tinggi kolom yang lebih rendah karena &rho; berbanding terbalik dengan tinggi kolom h (&rho;&sub1;&middot;h&sub1; = &rho;&sub2;&middot;h&sub2;).<br><br>' +
                  '<b>2. BENAR</b>. Menurut rumus P = &rho;&middot;g&middot;h, tekanan hidrostatis hanya bergantung pada kedalaman titik, percepatan gravitasi, dan massa jenis fluida, serta sama sekali tidak bergantung pada bentuk wadah.<br><br>' +
                  '<b>3. 800 kg/m&sup3;</b>. Menggunakan rumus pipa U: &rho;&sub2; = (&rho;&sub1; &middot; h&sub1;) / h&sub2; = (1000 &middot; 8) / 10 = <b>800 kg/m&sup3;</b>.<br><br>' +
                  '<b>4. 60 kPa</b>. P = &rho; &middot; g &middot; h = 1000 &middot; 10 &middot; 6 = 60.000 Pa = <b>60 kPa</b>.' +
                '</div>' +
              '</div>' +

              '<!-- Navigasi Bawah Evaluasi -->' +
              '<div id="hs-evaluasi-controls" style="display:flex; justify-content:space-between; margin-top:5px; align-items:center;">' +
                '<button id="hsBtnEvaluasiPrev" style="background:#262D35; color:#BAC7D5; border:1px solid #3A4451; padding:10px 20px; border-radius:6px; font-weight:bold; font-size:20px; cursor:pointer; opacity:0.5; pointer-events:none;">' +
                  '&#10094; Sebelumnya' +
                '</button>' +
                '<button id="hsBtnEvaluasiNext" style="background:#1E5084; color:#fff; border:none; padding:10px 20px; border-radius:6px; font-weight:bold; font-size:20px; cursor:pointer;">' +
                  'Selanjutnya &#10095;' +
                '</button>' +
                '<button id="hsBtnEvaluasiSelesai" style="display:none; background:#3DDC84; color:#0a1316; border:none; padding:10px 20px; border-radius:6px; font-weight:bold; font-size:20px; cursor:pointer;">' +
                  'SELESAI &#10003;' +
                '</button>' +
              '</div>' +
            '</div>' +

            '<!-- Panel Kesimpulan -->' +
            '<div id="hs-panel-kesimpulan" class="hs-lkpd-panel" style="display:none; flex-direction:column; gap:0.8em; height:100%;">' +
              '<div style="font-size:19px; line-height:1.6; color:#EDEFF1; font-weight:bold; text-align:justify;">' +
                'Berdasarkan tujuan kegiatan dan percobaan yang telah dilakukan pada pipa U, tuliskan kesimpulan akhir Anda mengenai tekanan hidrostatis dan hukum pokok hidrostatis!' +
              '</div>' +
              '<textarea id="hsKesimpulanTextarea" placeholder="Ketik kesimpulan di sini..." style="flex:1; width:100%; background:rgba(0,0,0,0.2); border:1px solid #3A4451; border-radius:8px; padding:14px; color:#EDEFF1; font-family:inherit; font-size:18px; resize:none; outline:none; line-height:1.5;"></textarea>' +
              '<div style="display:flex; justify-content:flex-end; margin-top:5px;">' +
                '<button id="hsBtnSimpanKesimpulan" style="background:#28a745; color:#fff; border:none; padding:10px 20px; border-radius:6px; font-weight:bold; font-size:18px; cursor:pointer; box-shadow:0 4px 6px rgba(0,0,0,0.3);">' +
                  'SIMPAN KESIMPULAN &#10003;' +
                '</button>' +
              '</div>' +
            '</div>' +

          '</div>' +
        '</div>' +
        
        '<!-- Modal Peringatan Belum Lengkap -->' +
        '<div id="hsCustomAlertModal" style="display:none; position:absolute; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:10000; justify-content:center; align-items:center;">' +
          '<div style="background:#1C2228; border:2px solid #E06C75; border-radius:12px; padding:30px; width:90%; max-width:700px; text-align:center; box-shadow:0 10px 30px rgba(0,0,0,0.5);">' +
            '<div style="font-size:48px; color:#E06C75; margin-bottom:15px;">&#9888;</div>' +
            '<h3 style="color:#EDEFF1; font-size:24px; margin-bottom:15px;">Belum Lengkap!</h3>' +
            '<div id="hsCustomAlertText" style="color:#BAC7D5; font-size:18px; line-height:1.5; margin-bottom:30px;"></div>' +
            '<button id="hsBtnCloseAlert" style="background:#E06C75; color:#fff; border:none; padding:12px 25px; border-radius:8px; font-weight:bold; font-size:18px; cursor:pointer;">' +
              'OK, Saya Lengkapi' +
            '</button>' +
          '</div>' +
        '</div>' +

        '<!-- Modal Konfirmasi Selesai -->' +
        '<div id="hsSelesaiConfirmModal" style="display:none; position:absolute; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:9999; justify-content:center; align-items:center;">' +
          '<div style="background:#1C2228; border:2px solid #3A4451; border-radius:12px; padding:30px; width:80%; max-width:500px; text-align:center; box-shadow:0 10px 30px rgba(0,0,0,0.5);">' +
            '<div style="font-size:48px; color:#F5C84B; margin-bottom:15px;">&#9888;</div>' +
            '<h3 style="color:#EDEFF1; font-size:24px; margin-bottom:15px;">Konfirmasi Penyelesaian</h3>' +
            '<p style="color:#BAC7D5; font-size:18px; line-height:1.5; margin-bottom:30px;">' +
              'Anda tidak dapat merevisi jawaban setelah menekan tombol selesaikan. Apakah Anda yakin ingin melanjutkan?' +
            '</p>' +
            '<div style="display:flex; justify-content:center; gap:15px;">' +
              '<button id="hsBtnBatalSelesai" style="background:#262D35; color:#BAC7D5; border:1px solid #3A4451; padding:12px 25px; border-radius:8px; font-weight:bold; font-size:18px; cursor:pointer;">' +
                'Edit' +
              '</button>' +
              '<button id="hsBtnKonfirmasiSelesai" style="background:#3DDC84; color:#0a1316; border:none; padding:12px 25px; border-radius:8px; font-weight:bold; font-size:18px; cursor:pointer;">' +
                'Selesaikan' +
              '</button>' +
            '</div>' +
          '</div>' +
        '</div>' +

        '<!-- Modal Notifikasi Sukses -->' +
        '<div id="hsSuccessAlertModal" style="display:none; position:absolute; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:10000; justify-content:center; align-items:center;">' +
          '<div style="background:#1C2228; border:2px solid #3DDC84; border-radius:12px; padding:30px; width:80%; max-width:400px; text-align:center; box-shadow:0 10px 30px rgba(0,0,0,0.5);">' +
            '<div style="font-size:48px; color:#3DDC84; margin-bottom:15px;">&#10003;</div>' +
            '<h3 style="color:#EDEFF1; font-size:24px; margin-bottom:15px;">Berhasil!</h3>' +
            '<p id="hsSuccessAlertText" style="color:#BAC7D5; font-size:18px; line-height:1.5; margin-bottom:30px;"></p>' +
            '<button id="hsBtnCloseSuccess" style="background:#3DDC84; color:#0a1316; border:none; padding:12px 25px; border-radius:8px; font-weight:bold; font-size:18px; cursor:pointer;">' +
              'Tutup' +
            '</button>' +
          '</div>' +
        '</div>' +

        '<!-- Modal Konfirmasi Cek Jawaban -->' +
        '<div id="hsConfirmCheckPopup" style="display:none; position:absolute; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:9999; justify-content:center; align-items:center;">' +
          '<div style="background:#1C2228; border:2px solid #3A4451; border-radius:12px; padding:30px; width:80%; max-width:500px; text-align:center; box-shadow:0 10px 30px rgba(0,0,0,0.5);">' +
            '<div style="font-size:48px; color:#F5C84B; margin-bottom:15px;">&#9888;</div>' +
            '<h3 style="color:#EDEFF1; font-size:24px; margin-bottom:15px;">Konfirmasi Cek Jawaban</h3>' +
            '<p style="color:#BAC7D5; font-size:18px; line-height:1.5; margin-bottom:30px;">' +
              'Apakah Anda yakin ingin mengecek jawaban?<br><br>' +
              '<span style="color:#FFB238;">Nilai yang sudah dicek tidak bisa dirubah lagi.</span>' +
            '</p>' +
            '<div style="display:flex; justify-content:center; gap:15px;">' +
              '<button id="hsBtnCancelCheck" style="background:#262D35; color:#BAC7D5; border:1px solid #3A4451; padding:12px 25px; border-radius:8px; font-weight:bold; font-size:18px; cursor:pointer;">' +
                'EDIT' +
              '</button>' +
              '<button id="hsBtnConfirmCheck" style="background:#FFB238; color:#0a1316; border:none; padding:12px 25px; border-radius:8px; font-weight:bold; font-size:18px; cursor:pointer;">' +
                'TETAP CEK' +
              '</button>' +
            '</div>' +
          '</div>' +
        '</div>' +

      '</div>' +
    '</div>';

    /* ================= LOGIKA INTERAKTIF LKPD ================= */
    // Record from Simulation (3 Inputs Siswa) to LKPD Table
    window.recordToLkpd = function() {
      const msg = $('hsRecordMsg');
      if (!sm.filled || sm.h2t <= 0) {
        if (msg) {
          msg.style.color = '#FFB238';
          msg.textContent = 'Isi pipa U & tuang cairan 2 terlebih dahulu!';
          setTimeout(function() { if(msg) msg.textContent = ''; }, 3000);
        }
        return;
      }

      const inpH1 = $('hsSimH1');
      const inpH2 = $('hsSimH2');
      const inpR2 = $('hsSimR2');

      const valH1 = inpH1 ? parseFloat(inpH1.value) : NaN;
      const valH2 = inpH2 ? parseFloat(inpH2.value) : NaN;
      const valR2 = inpR2 ? parseFloat(inpR2.value) : NaN;

      if (isNaN(valH1) || isNaN(valH2) || isNaN(valR2)) {
        if (msg) {
          msg.style.color = '#FFB238';
          msg.textContent = 'Harap ukur h₁, h₂, dan hitung ρ₂ pada lembar di atas!';
          setTimeout(function() { if(msg) msg.textContent = ''; }, 3000);
        }
        return;
      }

      const tbody = $('hs-lkpd-tbody');
      if (!tbody) return;

      const rows = tbody.querySelectorAll('tr');
      let targetRow = null;
      for (let r = 0; r < rows.length; r++) {
        const rowH2 = rows[r].querySelector('input.hs-inp-h2');
        if (!rowH2 || rowH2.value.trim() === '') {
          targetRow = rows[r];
          break;
        }
      }

      if (!targetRow) {
        if (msg) {
          msg.style.color = '#FFB238';
          msg.textContent = 'Tabel LKPD sudah penuh (5 baris pengamatan)!';
          setTimeout(function() { if(msg) msg.textContent = ''; }, 3000);
        }
        return;
      }

      const fluidName = F2[sm.f2][3] + ' ' + F2[sm.f2][0];
      const rho1 = sm.r1;
      const rho2Real = sm.r2;

      targetRow.dataset.fluid = fluidName;
      targetRow.dataset.r1 = rho1;
      targetRow.dataset.h1 = valH1;
      targetRow.dataset.h2 = valH2;
      targetRow.dataset.rc = valR2;
      targetRow.dataset.rs = rho2Real;
      targetRow.dataset.checked = 'false';

      const rowFluid = targetRow.querySelector('.hs-inp-fluid');
      const rowH1 = targetRow.querySelector('.hs-inp-h1');
      const rowH2 = targetRow.querySelector('.hs-inp-h2');
      const rowRc = targetRow.querySelector('.hs-inp-rc');
      const rowRs = targetRow.querySelector('.hs-inp-rs');
      const statusCell = targetRow.querySelector('.hs-cell-status');

      if (rowFluid) rowFluid.value = fluidName;
      if (rowH1) rowH1.value = valH1;
      if (rowH2) rowH2.value = valH2;
      if (rowRc) rowRc.value = valR2;
      if (rowRs) rowRs.value = '';
      if (statusCell) statusCell.innerHTML = '—';

      if (msg) {
        msg.style.color = '#3DDC84';
        msg.textContent = '✓ Berhasil dicatat ke LKPD baris ' + targetRow.dataset.row + '!';
        setTimeout(function() { if(msg) msg.textContent = ''; }, 3500);
      }
      if (typeof window.playSfx === 'function') window.playSfx('sfxBintang');
    };

    // Tab Switch Kanan (Analisis / Evaluasi / Kesimpulan)
    function switchHsLkpd(tabId) {
      ['analisis', 'evaluasi', 'kesimpulan'].forEach(function(id) {
        const p = $('hs-panel-' + id);
        if (p) p.style.display = 'none';
        const b = $('hs-btn-' + id);
        if (b) {
          b.style.background = '#262D35';
          b.style.border = '1px solid #3A4451';
          b.style.boxShadow = 'none';
          b.style.color = '#BAC7D5';
        }
      });
      const targetP = $('hs-panel-' + tabId);
      if (targetP) targetP.style.display = 'flex';
      const targetB = $('hs-btn-' + tabId);
      if (targetB) {
        targetB.style.background = 'rgba(95,168,214,0.2)';
        targetB.style.border = '1px solid rgba(95,168,214,0.8)';
        targetB.style.boxShadow = '0 0 10px rgba(95,168,214,0.3)';
        targetB.style.color = '#7FBCE3';
      }
    }
    const bAna = $('hs-btn-analisis'), bEva = $('hs-btn-evaluasi'), bKes = $('hs-btn-kesimpulan');
    if (bAna) bAna.onclick = function() { switchHsLkpd('analisis'); };
    if (bEva) bEva.onclick = function() { switchHsLkpd('evaluasi'); };
    if (bKes) bKes.onclick = function() { switchHsLkpd('kesimpulan'); };

    // Slide Analisis
    let currentHsAnalisis = 1;
    const totalHsAnalisis = 5;
    let isCheckingHsAnalisis = false;

    function goToHsAnalisisSlide(target) {
      const prev = $('hs-analisis-slide-' + currentHsAnalisis);
      if (prev) prev.style.display = 'none';
      currentHsAnalisis = target;
      const nxt = $('hs-analisis-slide-' + currentHsAnalisis);
      if (nxt) nxt.style.display = 'flex';
      const ind = $('hsAnalisisSlideIndicator');
      if (ind) ind.innerText = 'Slide ' + currentHsAnalisis + ' / ' + totalHsAnalisis;

      const pBtn = $('hsBtnAnalisisPrev');
      if (pBtn) {
        pBtn.style.opacity = currentHsAnalisis === 1 ? '0.5' : '1';
        pBtn.style.pointerEvents = currentHsAnalisis === 1 ? 'none' : 'auto';
      }
      const nBtn = $('hsBtnAnalisisNext');
      const sBtn = $('hsBtnAnalisisSelesai');
      if (currentHsAnalisis === totalHsAnalisis) {
        if (nBtn) nBtn.style.display = 'none';
        if (sBtn) {
          sBtn.style.display = 'block';
          sBtn.innerHTML = isCheckingHsAnalisis ? 'PEMBAHASAN &#8617;' : 'SELESAI &#10003;';
        }
      } else {
        if (nBtn) nBtn.style.display = 'block';
        if (sBtn) sBtn.style.display = 'none';
      }
    }
    const btnAnaPrev = $('hsBtnAnalisisPrev'), btnAnaNext = $('hsBtnAnalisisNext'), btnAnaSel = $('hsBtnAnalisisSelesai');
    if (btnAnaPrev) btnAnaPrev.onclick = function() { if (currentHsAnalisis > 1) goToHsAnalisisSlide(currentHsAnalisis - 1); };
    if (btnAnaNext) btnAnaNext.onclick = function() { if (currentHsAnalisis < totalHsAnalisis) goToHsAnalisisSlide(currentHsAnalisis + 1); };
    if (btnAnaSel) btnAnaSel.onclick = function() {
      if (isCheckingHsAnalisis) {
        $('hs-analisis-slides-container').style.display = 'none';
        $('hs-analisis-controls').style.display = 'none';
        $('hsAnalisisSlideIndicator').style.display = 'none';
        $('hs-analisis-feedback').style.display = 'block';
        return;
      }
      const tas = $('hs-analisis-slides-container').querySelectorAll('textarea');
      for (let i = 0; i < tas.length; i++) {
        if (tas[i].value.trim() === '') {
          showHsAlert('Harap jawab semua pertanyaan (Slide ' + (i + 1) + ' belum terjawab) sebelum menyelesaikan!');
          goToHsAnalisisSlide(i + 1);
          return;
        }
      }
      pendingHsSelesai = 'analisis';
      $('hsSelesaiConfirmModal').style.display = 'flex';
    };

    const btnCekAna = $('hsBtnCekJawabanAnalisis');
    if (btnCekAna) btnCekAna.onclick = function() {
      isCheckingHsAnalisis = true;
      const tas = $('hs-analisis-slides-container').querySelectorAll('textarea');
      tas.forEach(function(ta) { ta.setAttribute('readonly', true); });
      $('hs-analisis-feedback').style.display = 'none';
      $('hs-analisis-slides-container').style.display = 'flex';
      $('hs-analisis-controls').style.display = 'flex';
      $('hsAnalisisSlideIndicator').style.display = 'block';
      goToHsAnalisisSlide(1);
    };

    // Slide Evaluasi
    let currentHsEvaluasi = 1;
    const totalHsEvaluasi = 4;
    let hsEvaluasiAnswers = {};
    let isCheckingHsEvaluasi = false;

    $('hsLkpd').addEventListener('click', function(e) {
      const b = e.target.closest('.hs-eval-btn');
      if (!b) return;
      const s = b.dataset.slide, a = b.dataset.ans;
      hsEvaluasiAnswers[s] = a;
      const container = $('hs-evaluasi-slide-' + s);
      if (container) {
        container.querySelectorAll('.hs-eval-btn').forEach(function(btn) {
          btn.style.background = '#262D35';
          btn.style.border = '1px solid #3A4451';
          btn.style.color = '#EDEFF1';
        });
      }
      b.style.background = 'rgba(95,168,214,0.3)';
      b.style.border = '1px solid #3FD6FF';
      b.style.color = '#fff';
    });

    function goToHsEvaluasiSlide(target) {
      const prev = $('hs-evaluasi-slide-' + currentHsEvaluasi);
      if (prev) prev.style.display = 'none';
      currentHsEvaluasi = target;
      const nxt = $('hs-evaluasi-slide-' + currentHsEvaluasi);
      if (nxt) nxt.style.display = 'flex';
      const ind = $('hsEvaluasiSlideIndicator');
      if (ind) ind.innerText = 'Slide ' + currentHsEvaluasi + ' / ' + totalHsEvaluasi;

      const pBtn = $('hsBtnEvaluasiPrev');
      if (pBtn) {
        pBtn.style.opacity = currentHsEvaluasi === 1 ? '0.5' : '1';
        pBtn.style.pointerEvents = currentHsEvaluasi === 1 ? 'none' : 'auto';
      }
      const nBtn = $('hsBtnEvaluasiNext');
      const sBtn = $('hsBtnEvaluasiSelesai');
      if (currentHsEvaluasi === totalHsEvaluasi) {
        if (nBtn) nBtn.style.display = 'none';
        if (sBtn) {
          sBtn.style.display = 'block';
          sBtn.innerHTML = isCheckingHsEvaluasi ? 'PEMBAHASAN &#8617;' : 'SELESAI &#10003;';
        }
      } else {
        if (nBtn) nBtn.style.display = 'block';
        if (sBtn) sBtn.style.display = 'none';
      }
    }
    const btnEvaPrev = $('hsBtnEvaluasiPrev'), btnEvaNext = $('hsBtnEvaluasiNext'), btnEvaSel = $('hsBtnEvaluasiSelesai');
    if (btnEvaPrev) btnEvaPrev.onclick = function() { if (currentHsEvaluasi > 1) goToHsEvaluasiSlide(currentHsEvaluasi - 1); };
    if (btnEvaNext) btnEvaNext.onclick = function() { if (currentHsEvaluasi < totalHsEvaluasi) goToHsEvaluasiSlide(currentHsEvaluasi + 1); };
    if (btnEvaSel) btnEvaSel.onclick = function() {
      if (isCheckingHsEvaluasi) {
        $('hs-evaluasi-slides-container').style.display = 'none';
        $('hs-evaluasi-controls').style.display = 'none';
        $('hsEvaluasiSlideIndicator').style.display = 'none';
        $('hs-evaluasi-feedback').style.display = 'block';
        return;
      }
      if (!hsEvaluasiAnswers[1]) {
        showHsAlert('Harap jawab soal Benar/Salah di Slide 1 terlebih dahulu!');
        goToHsEvaluasiSlide(1); return;
      }
      if (!hsEvaluasiAnswers[2]) {
        showHsAlert('Harap jawab soal Benar/Salah di Slide 2 terlebih dahulu!');
        goToHsEvaluasiSlide(2); return;
      }
      const tas = $('hs-evaluasi-slides-container').querySelectorAll('textarea');
      for (let i = 0; i < tas.length; i++) {
        if (tas[i].value.trim() === '') {
          showHsAlert('Harap jawab isian di Slide ' + (i + 3) + ' terlebih dahulu sebelum menyelesaikan!');
          goToHsEvaluasiSlide(i + 3); return;
        }
      }
      pendingHsSelesai = 'evaluasi';
      $('hsSelesaiConfirmModal').style.display = 'flex';
    };

    const btnCekEva = $('hsBtnCekJawabanEvaluasi');
    if (btnCekEva) btnCekEva.onclick = function() {
      isCheckingHsEvaluasi = true;
      const tas = $('hs-evaluasi-slides-container').querySelectorAll('textarea');
      tas.forEach(function(ta) { ta.setAttribute('readonly', true); });
      $('hs-evaluasi-slides-container').querySelectorAll('.hs-eval-btn').forEach(function(b) { b.style.pointerEvents = 'none'; });

      const conds = [
        { id: 1, ok: hsEvaluasiAnswers[1] === 'Salah' },
        { id: 2, ok: hsEvaluasiAnswers[2] === 'Benar' },
        { id: 3, ok: tas[0].value.includes('800') },
        { id: 4, ok: tas[1].value.includes('60') }
      ];
      conds.forEach(function(c) {
        let resDiv = $('hs-eval-res-' + c.id);
        if (!resDiv) {
          resDiv = document.createElement('div');
          resDiv.id = 'hs-eval-res-' + c.id;
          resDiv.style.marginTop = '10px';
          resDiv.style.fontSize = '18px';
          resDiv.style.fontWeight = 'bold';
          resDiv.style.textAlign = 'center';
          resDiv.style.padding = '8px';
          resDiv.style.borderRadius = '8px';
          const slide = $('hs-evaluasi-slide-' + c.id);
          if (slide) slide.appendChild(resDiv);
        }
        if (c.ok) {
          resDiv.style.background = 'rgba(61,220,132,0.15)';
          resDiv.style.border = '1px solid #3DDC84';
          resDiv.innerHTML = '<span style="color:#3DDC84;">&#10003; Jawaban Anda Benar</span>';
        } else {
          resDiv.style.background = 'rgba(224,108,117,0.15)';
          resDiv.style.border = '1px solid #E06C75';
          resDiv.innerHTML = '<span style="color:#E06C75;">&#10007; Jawaban Anda Salah</span>';
        }
      });

      $('hs-evaluasi-feedback').style.display = 'none';
      $('hs-evaluasi-slides-container').style.display = 'flex';
      $('hs-evaluasi-controls').style.display = 'flex';
      $('hsEvaluasiSlideIndicator').style.display = 'block';
      goToHsEvaluasiSlide(1);
    };

    // Modal & Konfirmasi
    let pendingHsSelesai = '';
    function showHsAlert(msg) {
      $('hsCustomAlertText').innerHTML = msg;
      $('hsCustomAlertModal').style.display = 'flex';
    }
    $('hsBtnCloseAlert').onclick = function() { $('hsCustomAlertModal').style.display = 'none'; };
    $('hsBtnCloseSuccess').onclick = function() { $('hsSuccessAlertModal').style.display = 'none'; };
    $('hsBtnBatalSelesai').onclick = function() { $('hsSelesaiConfirmModal').style.display = 'none'; };
    $('hsBtnKonfirmasiSelesai').onclick = function() {
      $('hsSelesaiConfirmModal').style.display = 'none';
      if (pendingHsSelesai === 'analisis') {
        $('hs-analisis-slides-container').style.display = 'none';
        $('hs-analisis-controls').style.display = 'none';
        $('hsAnalisisSlideIndicator').style.display = 'none';
        $('hs-analisis-feedback').style.display = 'block';
      } else if (pendingHsSelesai === 'evaluasi') {
        $('hs-evaluasi-slides-container').style.display = 'none';
        $('hs-evaluasi-controls').style.display = 'none';
        $('hsEvaluasiSlideIndicator').style.display = 'none';
        $('hs-evaluasi-feedback').style.display = 'block';
      }
    };

    // Simpan Kesimpulan
    $('hsBtnSimpanKesimpulan').onclick = function() {
      const text = $('hsKesimpulanTextarea').value;
      if (text.trim() === '') {
        showHsAlert('Harap tulis kesimpulan Anda terlebih dahulu sebelum menyimpan!');
      } else {
        $('hsSuccessAlertText').innerText = 'Kesimpulan Anda telah berhasil disimpan!';
        $('hsSuccessAlertModal').style.display = 'flex';
      }
    };

    // Cek Jawaban Tabel
    $('hsCekJawabanBtn').onclick = function() {
      $('hsConfirmCheckPopup').style.display = 'flex';
    };
    $('hsBtnCancelCheck').onclick = function() {
      $('hsConfirmCheckPopup').style.display = 'none';
    };
    $('hsBtnConfirmCheck').onclick = function() {
      $('hsConfirmCheckPopup').style.display = 'none';
      let allCorrect = true, checkedCount = 0;
      const rows = $('hs-lkpd-tbody').querySelectorAll('tr');

      rows.forEach(function(row) {
        const inpH1 = row.querySelector('.hs-inp-h1');
        const inpH2 = row.querySelector('.hs-inp-h2');
        const inpRc = row.querySelector('.hs-inp-rc');
        const inpRs = row.querySelector('.hs-inp-rs');
        const statusCell = row.querySelector('.hs-cell-status');

        const h1 = parseFloat(inpH1.value);
        const h2 = parseFloat(inpH2.value);
        const rc = parseFloat(inpRc.value);

        let r2real = parseFloat(row.dataset.rs);
        if (isNaN(r2real)) {
          const flTxt = row.querySelector('.hs-inp-fluid') ? row.querySelector('.hs-inp-fluid').value.toLowerCase() : '';
          for (let k = 0; k < F2.length; k++) {
            if (flTxt.includes(F2[k][0].toLowerCase())) {
              r2real = F2[k][1];
              break;
            }
          }
        }

        if (!isNaN(h1) && !isNaN(h2) && !isNaN(rc) && h2 > 0 && !isNaN(r2real)) {
          checkedCount++;
          inpRs.value = r2real;
          const err = Math.abs(rc - r2real) / r2real * 100;

          if (err <= 5) {
            row.querySelectorAll('td').forEach(function(td) { td.classList.remove('close', 'wrong'); td.classList.add('correct'); });
            statusCell.innerHTML = '<span style="color:#3DDC84;">Sesuai &#10003;</span>';
          } else if (err <= 12) {
            row.querySelectorAll('td').forEach(function(td) { td.classList.remove('correct', 'wrong'); td.classList.add('close'); });
            statusCell.innerHTML = '<span style="color:#FFB238;">Cukup &#9888;</span>';
          } else {
            row.querySelectorAll('td').forEach(function(td) { td.classList.remove('correct', 'close'); td.classList.add('wrong'); });
            statusCell.innerHTML = '<span style="color:#E06C75;">Salah &#10007;</span>';
            allCorrect = false;
          }
          row.dataset.checked = 'true';
          inpH1.setAttribute('readonly', true);
          inpH2.setAttribute('readonly', true);
          inpRc.setAttribute('readonly', true);
        }
      });

      if (checkedCount === 0) {
        showHsAlert('Belum ada data pengamatan yang diisi. Isi tabel pengamatan atau gunakan tombol "📥 Catat Data ke LKPD" di simulasi.');
      } else if (allCorrect) {
        if (typeof window.playSfx === 'function') window.playSfx('sfxBintang');
        $('hsSuccessAlertText').innerText = 'Luar biasa! Seluruh data perhitungan massa jenis pipa U Anda akurat dan sesuai kaidah hidrostatis.';
        $('hsSuccessAlertModal').style.display = 'flex';
      }
    };

    // Cetak Laporan
    $('hsCetakLaporanBtn').onclick = function() {
      try {
        const namaInput = $('hsNamaInput').value.trim();
        const kelasInput = $('hsKelasInput').value.trim();
        let missing = [];

        if (!namaInput || !kelasInput) {
          missing.push('<li>Identitas (Nama Lengkap &amp; Kelas)</li>');
        }

        let totalFilledRows = 0;
        const rows = $('hs-lkpd-tbody').querySelectorAll('tr');
        rows.forEach(function(r) {
          const h1 = r.querySelector('.hs-inp-h1').value.trim();
          const h2 = r.querySelector('.hs-inp-h2').value.trim();
          const rc = r.querySelector('.hs-inp-rc').value.trim();
          if (h1 && h2 && rc) totalFilledRows++;
        });
        if (totalFilledRows < 2) {
          missing.push('<li>Data Pengamatan (minimal isi 2 baris data percobaan pipa U)</li>');
        }

        const anaTas = $('hs-analisis-slides-container').querySelectorAll('textarea');
        let anaFilled = true;
        for (let i = 0; i < anaTas.length; i++) {
          if (anaTas[i].value.trim() === '') { anaFilled = false; break; }
        }
        if (!anaFilled) missing.push('<li>Analisis Data (jawab seluruh 5 pertanyaan tugas analisis)</li>');

        const evaTas = $('hs-evaluasi-slides-container').querySelectorAll('textarea');
        let evaFilled = true;
        if (!hsEvaluasiAnswers[1] || !hsEvaluasiAnswers[2]) evaFilled = false;
        for (let i = 0; i < evaTas.length; i++) {
          if (evaTas[i].value.trim() === '') { evaFilled = false; break; }
        }
        if (!evaFilled) missing.push('<li>Evaluasi (selesaikan seluruh 4 soal tugas evaluasi)</li>');

        const kes = $('hsKesimpulanTextarea').value.trim();
        if (!kes) missing.push('<li>Kesimpulan Akhir (tulis dan simpan kesimpulan Anda)</li>');

        if (missing.length > 0) {
          const msg = '<b style="color:#E06C75; font-size:22px;">Gagal mencetak laporan! Lengkapi bagian berikut terlebih dahulu:</b><br><ul style="text-align:justify; font-size:18px; line-height:1.6; padding-left:25px; margin-top:15px; margin-bottom:10px; display:inline-block;">' + missing.join('') + '</ul>';
          showHsAlert(msg);
          return;
        }

        // Siapkan Dokumen Cetak #print-report
        let pr = document.getElementById('print-report');
        if (!pr) {
          pr = document.createElement('div');
          pr.id = 'print-report';
          pr.style.display = 'none';
          document.body.appendChild(pr);
        }

        const d = new Date();
        const months = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
        let mins = d.getMinutes().toString(); if (mins.length < 2) mins = '0' + mins;
        let hrs = d.getHours().toString(); if (hrs.length < 2) hrs = '0' + hrs;
        const timeStr = d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear() + ' • ' + hrs + '.' + mins;

        let tablesHtml = '<div style="margin-bottom:15px;"><div class="table-title">TABEL PENGAMATAN PIPA-U (HUKUM POKOK HIDROSTATIS)</div>';
        tablesHtml += '<table style="width:100%; border-collapse:collapse; margin-bottom:10px; font-size:12px;">' +
          '<thead><tr style="background:#f1f5f9;"><th>No</th><th>Zat Cair Diuji</th><th>&rho;₁ Air (kg/m&sup3;)</th><th>h₁ Air (cm)</th><th>h₂ Cairan (cm)</th><th>&rho;₂ Hasil Ukur (kg/m&sup3;)</th><th>&rho;₂ Nilai Sebenarnya (kg/m&sup3;)</th></tr></thead><tbody>';
        const rws = $('hs-lkpd-tbody').querySelectorAll('tr');
        rws.forEach(function(rw) {
          const fluid = rw.querySelector('.hs-inp-fluid').value.trim() || '-';
          const h1 = rw.querySelector('.hs-inp-h1').value.trim() || '-';
          const h2 = rw.querySelector('.hs-inp-h2').value.trim() || '-';
          const rc = rw.querySelector('.hs-inp-rc').value.trim() || '-';
          const rs = rw.querySelector('.hs-inp-rs').value.trim() || (rw.dataset.rs || '-');
          tablesHtml += '<tr><td style="text-align:center;">' + rw.dataset.row + '</td><td>' + fluid + '</td><td style="text-align:center;">1000</td><td style="text-align:center;">' + h1 + '</td><td style="text-align:center;">' + h2 + '</td><td style="text-align:center;">' + rc + '</td><td style="text-align:center;">' + rs + '</td></tr>';
        });
        tablesHtml += '</tbody></table></div>';

        const anaQuestions = [
          '1. Berdasarkan data pengamatan, bagaimana hubungan antara massa jenis cairan 2 (&rho;&sub2;) dengan selisih tinggi kolom cairan (h&sub2; - h&sub1;) pada pipa U? Jelaskan!',
          '2. Mengapa zat cair yang memiliki massa jenis lebih kecil (seperti bensin atau minyak) selalu memiliki tinggi kolom (h&sub2;) yang lebih tinggi dibandingkan air (h&sub1;) di atas garis batas?',
          '3. Bagaimana besar tekanan hidrostatis pada titik-titik yang terletak pada satu garis batas mendatar yang sama di dalam zat cair yang sejenis? Jelaskan kaitannya dengan Hukum Pokok Hidrostatis!',
          '4. Apakah luas penampang atau diameter pipa U memengaruhi selisih tinggi kolom zat cair h&sub1; dan h&sub2;? Jelaskan alasannya!',
          '5. Turunkan persamaan matematis &rho;&sub1;&middot;h&sub1; = &rho;&sub2;&middot;h&sub2; dari kesetimbangan tekanan di titik batas, dan jelaskan kegunaan pipa U!'
        ];
        let anaHtml = '';
        for (let i = 0; i < anaQuestions.length; i++) {
          anaHtml += '<div class="qa-box"><div class="qa-q">' + anaQuestions[i] + '</div><div class="qa-a">' + (anaTas[i].value.trim() || '-') + '</div></div>';
        }

        const evaQuestions = [
          '1. Pada pipa U yang berisi dua jenis zat cair tidak bercampur, zat cair yang memiliki massa jenis lebih besar akan memiliki tinggi kolom cairan yang lebih tinggi di atas bidang batas pemisah.',
          '2. Tekanan hidrostatis di dasar wadah hanya dipengaruhi oleh massa jenis zat cair, percepatan gravitasi, dan kedalaman titik dari permukaan bebas, serta tidak dipengaruhi oleh bentuk wadah.',
          '3. Sebuah pipa U diisi air (&rho;&sub1; = 1000 kg/m&sup3;). Ke dalam lengan kanan dituangkan minyak setinggi h&sub2; = 10 cm. Jika h&sub1; = 8 cm diukur dari garis batas, berapakah massa jenis minyak?',
          '4. Seorang penyelam berada di kedalaman 6 meter di air tawar (&rho; = 1000 kg/m&sup3;, g = 10 m/s&sup2;). Berapakah tekanan hidrostatis dalam kPa?'
        ];
        let evaHtml = '<div class="qa-box"><div class="qa-q">' + evaQuestions[0] + '</div><div class="qa-a">Jawaban: ' + (hsEvaluasiAnswers[1] || '-') + '</div></div>' +
          '<div class="qa-box"><div class="qa-q">' + evaQuestions[1] + '</div><div class="qa-a">Jawaban: ' + (hsEvaluasiAnswers[2] || '-') + '</div></div>' +
          '<div class="qa-box"><div class="qa-q">' + evaQuestions[2] + '</div><div class="qa-a">Jawaban: ' + (evaTas[0].value.trim() || '-') + ' kg/m&sup3;</div></div>' +
          '<div class="qa-box"><div class="qa-q">' + evaQuestions[3] + '</div><div class="qa-a">Jawaban: ' + (evaTas[1].value.trim() || '-') + ' kPa</div></div>';

        pr.innerHTML = '<div class="print-page">' +
          '<div class="header-box">' +
            '<div style="width:50px; height:1px; background:rgba(255,255,255,0.5); margin:0 auto 20px;"></div>' +
            '<h1>LAPORAN VIRTUAL EXPERIMENT</h1>' +
            '<h2>TEKANAN HIDROSTATIS</h2>' +
            '<p>LABORATORIUM FISIKA DIGITAL &bull; HUKUM POKOK HIDROSTATIS &amp; PIPA U</p>' +
          '</div>' +
          '<div class="identity-box">' +
            '<div class="identity-item"><span class="identity-label">NAMA MURID</span><span class="identity-value">' + namaInput + '</span></div>' +
            '<div class="identity-item" style="min-width:200px;"><span class="identity-label">KELAS</span><span class="identity-value">' + kelasInput + '</span></div>' +
          '</div>' +
          '<div class="status-box">' +
            '<div class="badge-list">' +
              '<div class="badge">&check; Tujuan Kegiatan</div>' +
              '<div class="badge">&check; Data Pengamatan (3 Percobaan Pipa U)</div>' +
              '<div class="badge">&check; Analisis Data (5 Pertanyaan)</div>' +
              '<div class="badge">&check; Evaluasi (4 Soal)</div>' +
              '<div class="badge">&check; Kesimpulan</div>' +
            '</div>' +
            '<div class="status-badge">STATUS LAPORAN : LENGKAP</div>' +
          '</div>' +
          '<div class="section">' +
            '<div class="section-header color-1"><div class="section-num">01</div><div class="section-title">TUJUAN KEGIATAN</div></div>' +
            '<div class="content-box">Setelah melakukan virtual eksperimen dengan pipa U, murid dapat menganalisis hubungan massa jenis zat cair dan tinggi kolom cairan berdasarkan Hukum Pokok Hidrostatis (&rho;&sub1;&middot;h&sub1; = &rho;&sub2;&middot;h&sub2;) sesuai kaidah ilmiah.</div>' +
          '</div>' +
          '<div class="section">' +
            '<div class="section-header color-2"><div class="section-num">02</div><div class="section-title">DATA HASIL PENGAMATAN</div></div>' +
            '<div>' + tablesHtml + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="print-page">' +
          '<div class="section">' +
            '<div class="section-header color-3"><div class="section-num">03</div><div class="section-title">ANALISIS DATA</div></div>' +
            '<div class="content-box">' + anaHtml + '</div>' +
          '</div>' +
          '<div class="section">' +
            '<div class="section-header color-4"><div class="section-num">04</div><div class="section-title">EVALUASI</div></div>' +
            '<div class="content-box">' + evaHtml + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="print-page">' +
          '<div class="section">' +
            '<div class="section-header color-5"><div class="section-num">05</div><div class="section-title">KESIMPULAN</div></div>' +
            '<div class="content-box qa-box"><div class="qa-a">' + kes + '</div></div>' +
          '</div>' +
          '<div class="footer">' +
            '<div>Virtual Experiment &mdash; Tekanan Hidrostatis<br><span style="color:#aaa;">' + timeStr + '</span></div>' +
            '<div class="signature">Laporan dibuat oleh:<br><div class="signature-name">' + namaInput + '</div><div style="margin-bottom:5px;">' + kelasInput + '</div><div>' + timeStr + '</div></div>' +
          '</div>' +
        '</div>';

        window.print();
      } catch (err) {
        alert('Terjadi kesalahan saat mencetak laporan: ' + err.message);
        console.error(err);
      }
    };
  }
});
