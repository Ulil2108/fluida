/* ============================================================
   MODUL HUKUM PASCAL
   Tab: Teori · Prosedur · Simulasi (Dongkrak Hidrolik) · LKPD
   Prinsip Pascal: P1 = P2 -> F1 / A1 = F2 / A2
   ============================================================ */
MateriLab.register('pascal', {
  render: function (c, api) {
    if (!document.getElementById('psStyle')) {
      const st = document.createElement('style'); st.id = 'psStyle'; st.textContent = `
      .ps{position:absolute;inset:0;display:flex;flex-direction:column;color:#EDEFF1;font-family:'Inter',-apple-system,BlinkMacSystemFont,'SF Pro Display',sans-serif;background:#1C2228}
      .ps-pane{flex:1;min-height:0;display:none;padding:16px 24px;overflow:hidden;position:relative}
      .ps-pane.on{display:flex;flex-direction:column;gap:12px}
      .ps-card{background:rgba(255,255,255,0.04);backdrop-filter:blur(8px);border:1px solid rgba(245,200,75,0.22);border-left:4px solid #F5C84B;border-radius:12px;padding:12px 16px;text-align:justify;position:relative;display:flex;flex-direction:column;gap:6px;box-shadow:0 6px 20px rgba(0,0,0,0.25);flex:1 1 0;min-height:0;overflow-y:auto;scrollbar-width:thin;scrollbar-color:rgba(245,200,75,0.22) transparent}
      .ps-card::-webkit-scrollbar{width:4px}
      .ps-card::-webkit-scrollbar-track{background:transparent}
      .ps-card::-webkit-scrollbar-thumb{background:rgba(245,200,75,0.22);border-radius:4px;transition:background 0.3s}
      .ps-card:hover::-webkit-scrollbar-thumb{background:rgba(245,200,75,0.45)}
      .ps-card::-webkit-scrollbar-thumb:hover{background:rgba(245,200,75,0.75)}
      .ps-h{font-size:18px;font-weight:700;color:#F5C84B;border-left:4px solid #E09A28;padding-left:10px;margin-bottom:4px;text-transform:uppercase;text-align:left;letter-spacing:0.05em;flex-shrink:0}
      .ps-t{font-size:18px;line-height:1.6;color:#EDEFF1;text-align:justify}.ps-t b{color:#F5C84B;font-weight:700}
      .ps-formula{font-family:'Courier New',monospace;font-size:24px;font-weight:800;color:#F5C84B;text-align:center;padding:12px 16px;background:rgba(0,0,0,0.5);border:1px dashed rgba(245,200,75,0.4);border-radius:12px;letter-spacing:.06em;text-shadow:0 0 8px rgba(245,200,75,0.4);flex-shrink:0}
      
      /* TEORI MODERN & TIMELINE */
      .ps-teori-wrap{display:flex;flex-direction:column;flex:1;min-height:0;gap:10px}
      .ps-teori-hdr{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(245,200,75,0.25);padding-bottom:10px;flex-shrink:0;position:relative}
      .ps-teori-hdr::after{content:'';position:absolute;bottom:-1px;left:0;width:100px;height:2px;background:#F5C84B;box-shadow:0 0 10px #F5C84B}
      .ps-teori-tit{font-size:26px;font-weight:800;color:#F5C84B;letter-spacing:0.06em;text-transform:uppercase;display:flex;align-items:center;gap:12px;text-shadow:0 0 15px rgba(245,200,75,0.4)}
      .ps-badge-num{background:rgba(245,200,75,0.15);padding:4px 12px;border-radius:8px;border:1px solid rgba(245,200,75,0.35);color:#F5C84B;font-size:22px;font-weight:800}
      .ps-tl{display:flex;align-items:center;gap:0.5em;font-family:'Courier New',monospace;font-size:18px;font-weight:800;color:rgba(255,255,255,0.3);user-select:none}
      .ps-tl-step{cursor:pointer;display:flex;align-items:center;gap:0.4em;transition:0.25s;padding:2px 4px;border-radius:4px}
      .ps-tl-step:hover{color:#fff}
      .ps-tl-step:not(:last-child)::after{content:'──';opacity:0.35;pointer-events:none}
      .ps-tl-step.active{color:#F5C84B;text-shadow:0 0 10px #F5C84B}
      .ps-tl-step.done{color:#3DDC84}
      .ps-tl-step.active:not(:last-child)::after{color:#F5C84B;opacity:0.9;text-shadow:0 0 10px #F5C84B}
      
      /* PROGRESS BAR TRACK */
      .ps-p-track{width:100%;height:6px;background:rgba(255,255,255,0.12);border-radius:4px;overflow:hidden;flex-shrink:0;margin:6px 0 10px 0}
      .ps-p-bar{height:100%;width:14.28%;background:linear-gradient(90deg,#F5C84B,#3DDC84);box-shadow:0 0 12px rgba(61,220,132,0.85);border-radius:4px;transition:width 0.35s ease}
      
      .ps-slide{display:none;flex:1;min-height:0;gap:16px}
      .ps-slide.on{display:flex}
      .ps-col{flex:1;display:flex;flex-direction:column;gap:10px;min-width:0;min-height:0;overflow:hidden;padding-right:0}
      
      .ps-fig{flex:0 0 380px;background:#0D1520;border:1px solid #3A4451;border-radius:12px;overflow-y:auto;display:flex;align-items:center;justify-content:center;scrollbar-width:thin;scrollbar-color:rgba(245,200,75,0.2) transparent}
      .ps-fig::-webkit-scrollbar{width:4px}
      .ps-fig::-webkit-scrollbar-track{background:transparent}
      .ps-fig::-webkit-scrollbar-thumb{background:rgba(245,200,75,0.2);border-radius:4px;transition:background 0.3s}
      .ps-fig:hover::-webkit-scrollbar-thumb{background:rgba(245,200,75,0.45)}
      
      /* FOOTER NAV */
      .ps-nav{flex:0 0 auto;display:flex;justify-content:space-between;align-items:center;padding-top:14px;border-top:1px solid rgba(255,255,255,0.05)}
      .btn-nav-outline{display:flex;align-items:center;gap:8px;padding:0.8em 1.8em;background:transparent;border:1px solid #6B747F;border-radius:30px;color:#EDEFF1;font-size:17px;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;transition:all 0.3s ease;cursor:pointer;font-family:inherit}
      .btn-nav-outline:hover:not(:disabled){border-color:#F5C84B;color:#F5C84B;transform:translateX(-4px)}
      .btn-nav-outline:disabled{opacity:0.3;cursor:not-allowed}
      .btn-nav-solid{display:flex;align-items:center;gap:8px;background:#F5C84B;border:none;border-radius:30px;color:#04111d;font-size:17px;font-weight:800;letter-spacing:0.05em;padding:0.8em 1.8em;cursor:pointer;text-transform:uppercase;transition:all 0.3s ease;box-shadow:0 0 20px rgba(245,200,75,0.4);font-family:inherit}
      .btn-nav-solid:hover:not(:disabled){box-shadow:0 0 30px rgba(245,200,75,0.6);transform:translateX(4px);background:#fff}
      .btn-nav-solid.done{background:#3DDC84;color:#0f172a;box-shadow:0 0 20px rgba(61,220,132,0.4)}
      .btn-nav-solid.done:hover{box-shadow:0 0 30px rgba(61,220,132,0.6);background:#4aff98;color:#04111d}
      .btn-nav-outline svg,.btn-nav-solid svg{width:16px;height:16px;stroke-width:2.5px;fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round}
      .ps-cnt{color:#F5C84B;font-weight:800;font-size:16px;letter-spacing:2px;font-family:'Courier New',monospace;background:rgba(245,200,75,0.1);padding:6px 16px;border-radius:20px;border:1px solid rgba(245,200,75,0.25)}
      
      .ps-quiz{flex:0 0 auto !important;min-height:auto;max-height:165px;margin-top:auto;display:flex;flex-direction:column;gap:8px;background:rgba(245,200,75,0.06);padding:10px 14px;border:1px solid rgba(245,200,75,0.25);border-left:4px solid #3DDC84;border-radius:12px;overflow-y:auto;scrollbar-width:thin;scrollbar-color:rgba(61,220,132,0.18) transparent}
      .ps-quiz::-webkit-scrollbar{width:4px}
      .ps-quiz::-webkit-scrollbar-track{background:transparent}
      .ps-quiz::-webkit-scrollbar-thumb{background:rgba(61,220,132,0.18);border-radius:4px;transition:background 0.3s}
      .ps-qq{font-size:17px;font-weight:700;color:#EDEFF1;line-height:1.45;text-align:justify}
      .ps-qo{display:flex;gap:8px;flex-wrap:wrap}.ps-qo button{flex:1;min-width:140px;background:rgba(245,200,75,0.08);border:1px solid rgba(245,200,75,0.3);border-radius:8px;padding:8px 12px;color:#F5C84B;font-family:inherit;font-size:16px;font-weight:600;cursor:pointer;transition:0.2s;text-align:center}
      .ps-qo button:hover:not(:disabled){background:rgba(245,200,75,0.2)}
      .ps-qo button.ok{background:#3DDC84 !important;border-color:#4aff98 !important;color:#04111d !important;font-weight:800;box-shadow:0 0 10px rgba(74,255,152,0.5)}
      .ps-qo button.no{background:rgba(255,152,0,0.2) !important;border-color:#F5C84B !important;color:#F5C84B !important}
      .ps-qf{font-size:16px;font-weight:600;min-height:20px;color:#BAC7D5;text-align:justify;line-height:1.45;padding-top:6px;border-top:1px dashed rgba(245,200,75,0.2)}
      .ps-steps{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:14px;flex:1;min-height:0}
      .ps-step{display:flex;flex-direction:column;gap:6px;overflow:hidden}
      .ps-step ul{margin-left:1.2em;font-size:17px;line-height:1.45;color:#D4DCE5;text-align:justify}.ps-step li{margin-bottom:3px}.ps-step b{color:#F5C84B}
      
      /* SIMULASI 3 PANEL SEJAJAR SEMPURNA */
      .ps-sim{flex:1 1 0;min-height:0;height:100%;display:grid;grid-template-columns:260px 1fr 290px;gap:12px;position:relative;align-items:stretch}
      .ps-panel-left{display:flex;flex-direction:column;gap:8px;min-height:0;height:100%;overflow-y:auto;scrollbar-width:thin;scrollbar-color:rgba(245,200,75,0.2) transparent;box-sizing:border-box}
      .ps-panel-left::-webkit-scrollbar{width:4px}
      .ps-panel-left::-webkit-scrollbar-track{background:transparent}
      .ps-panel-left::-webkit-scrollbar-thumb{background:rgba(245,200,75,0.2);border-radius:4px}
      
      .ps-panel-mid{display:flex;flex-direction:column;min-height:0;height:100%;position:relative;box-sizing:border-box}
      .ps-cv{width:100%;height:100%;min-height:0;background:#0D1520;border:1px solid #3A4451;border-radius:12px;touch-action:none;cursor:default;display:block}
      
      .ps-panel-right{display:flex;flex-direction:column;gap:8px;min-height:0;height:100%;overflow-y:auto;scrollbar-width:thin;scrollbar-color:rgba(245,200,75,0.2) transparent;box-sizing:border-box}
      .ps-panel-right::-webkit-scrollbar{width:4px}
      .ps-panel-right::-webkit-scrollbar-track{background:transparent}
      .ps-panel-right::-webkit-scrollbar-thumb{background:rgba(245,200,75,0.2);border-radius:4px}
      
      .ps-panel-left .ps-card, .ps-panel-right .ps-card{padding:10px 12px}
      .ps-panel-left .ps-h, .ps-panel-right .ps-h{font-size:14px;margin-bottom:6px;border-left:3px solid #F5C84B;padding-left:8px}
      
      .ps-card-alat{flex:0 0 auto}
      .ps-card-input{flex:0 0 auto}
      .ps-card-output{flex:1 1 0;min-height:0;display:flex;flex-direction:column}
      .ps-card-output .ps-load-grid{flex:1;display:grid;grid-template-columns:1fr 1fr;grid-auto-rows:1fr;gap:6px}
      .ps-card-act{flex:0 0 auto}
      
      .ps-card-gauge{flex:0 0 auto}
      .ps-card-ukur{flex:1 1 0;min-height:0;display:flex;flex-direction:column;justify-content:space-between}
      .ps-inp-group{flex:1;display:flex;flex-direction:column;justify-content:space-evenly;gap:4px;margin:2px 0}
      
      .ps-chk{display:flex;gap:10px;flex-wrap:wrap;font-size:14px;color:#D4DCE5}
      .ps-chk label{display:flex;gap:5px;align-items:center;cursor:pointer}
      .ps-fl-lock{display:flex;align-items:center;justify-content:space-between;background:rgba(245,200,75,0.08);border:1px solid rgba(245,200,75,0.3);border-radius:8px;padding:8px 12px;color:#EDEFF1;font-size:13px}
      .ps-fl-lock b{color:#F5C84B}
      .ps-load-grid button{background:#1C2228;border:1.5px solid #3A4451;border-radius:8px;padding:6px 4px;color:#EDEFF1;font-family:inherit;font-size:13px;font-weight:600;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;transition:all 0.2s;text-align:center;height:100%}
      .ps-load-grid button:hover{border-color:#F5C84B;background:rgba(245,200,75,0.1)}
      .ps-load-grid button.on{border-color:#F5C84B;background:rgba(245,200,75,0.22);box-shadow:0 0 10px rgba(245,200,75,0.4);color:#fff;font-weight:700}
      .ps-load-grid button .l-icon{font-size:20px}
      .ps-load-grid button .l-name{font-size:12px;line-height:1.2}
      
      .ps-f1-sel{display:flex;align-items:center;gap:8px;margin-top:6px}
      .ps-f1-sel select{flex:1;background:#151A20;border:1px solid #3A4451;border-radius:6px;color:#F5C84B;font-size:14px;font-weight:bold;padding:6px 8px;outline:none;font-family:inherit}
      
      .ps-act{display:flex;gap:6px}
      .ps-act button{flex:1;border:none;border-radius:8px;padding:9px 4px;font-family:inherit;font-weight:800;font-size:13px;cursor:pointer;text-transform:uppercase;color:#d8ffe9;background:linear-gradient(135deg,#1d8f4f,#0f5c33);transition:0.2s}
      .ps-act button:hover:not(:disabled){transform:translateY(-1px);filter:brightness(1.1)}
      .ps-act button.r{background:linear-gradient(135deg,#7a1d1d,#5c1414);color:#ffd6d6}
      .ps-act button:disabled{background:#1c2c38;color:#5d7488;cursor:not-allowed}
      
      .ps-gauge{font-size:13px;line-height:1.55;color:#BAC7D5;text-align:left}
      .ps-gauge b{color:#F5C84B;font-size:15px}
      
      .ps-inp-item{display:flex;flex-direction:column;gap:2px;margin-bottom:4px}
      .ps-inp-item label{font-size:12px;color:#BAC7D5;font-weight:600}
      .ps-inp-wrap{display:flex;align-items:center;background:#151A20;border:1px solid #3A4451;border-radius:6px;padding:0 8px}
      .ps-inp-wrap:focus-within{border-color:#F5C84B;box-shadow:0 0 6px rgba(245,200,75,0.3)}
      .ps-inp-wrap input{flex:1;background:transparent;border:none;color:#fff;font-size:15px;font-weight:bold;padding:6px 2px;outline:none;font-family:inherit}
      .ps-inp-wrap .ps-unit{font-size:12px;color:#F5C84B;font-weight:600;margin-left:4px}
      
      .btn-record-lkpd{width:100%;margin-top:4px;background:linear-gradient(135deg,#B8860B,#7A5805);border:1px solid #F5C84B;color:#EDEFF1;border-radius:8px;padding:9px 8px;font-family:inherit;font-weight:bold;font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;box-shadow:0 3px 6px rgba(0,0,0,0.3);transition:0.2s}
      .btn-record-lkpd:hover{background:linear-gradient(135deg,#d49b0e,#946a06);box-shadow:0 0 12px rgba(245,200,75,0.5)}
      
      /* LKPD */
      #psLkpd{padding:0 !important;display:none}
      #psLkpd.on{display:flex;flex-direction:column;padding:0 !important}
      .tbl-lkpd-ps { width:100%; border-collapse:collapse; text-align:center; font-size:16px; color:#EDEFF1; background:#1C2228; }
      .tbl-lkpd-ps th { padding:8px 4px; border-right:1px solid #3A4451; font-size:15px; line-height:1.3; font-weight:600; letter-spacing:0.5px; vertical-align:middle; }
      .tbl-lkpd-ps td { padding:5px 4px; border-left:1px solid #3A4451; border-top:1px solid #3A4451; height:44px; }
      .tbl-lkpd-ps tbody tr:nth-child(odd) { background:rgba(255,255,255,0.03); }
      .tbl-lkpd-ps sub { font-size:12px; }
      .tbl-lkpd-ps .unit { font-size:12px; font-weight:normal; color:#A0B3C6; display:block; margin-top:2px; }
      .tbl-lkpd-ps input { width:100%; background:transparent; border:none; color:#EDEFF1; font-size:16px; text-align:center; font-family:inherit; outline:none; }
      .tbl-lkpd-ps input:focus { background:rgba(245,200,75,0.15); border-radius:4px; }
      .tbl-lkpd-ps td.correct { background:rgba(61,220,132,0.2) !important; color:#3DDC84 !important; font-weight:bold; }
      .tbl-lkpd-ps td.close { background:rgba(255,178,56,0.2) !important; color:#FFB238 !important; font-weight:bold; }
      .tbl-lkpd-ps td.wrong { background:rgba(224,108,117,0.2) !important; color:#E06C75 !important; font-weight:bold; }
      `;
      document.head.appendChild(st);
    }

    const tabCtrl = api.setTabs ? api.setTabs(['teori:Teori', 'prosedur:Prosedur', 'simulasi:Simulasi', 'lkpd:LKPD'], function (t) {
      tab(t, false);
    }) : null;

    c.innerHTML = '<div class="ps">' +
      '<div class="ps-pane on" id="psTeori"></div>' +
      '<div class="ps-pane" id="psProsedur"></div>' +
      '<div class="ps-pane" id="psSimulasi"></div>' +
      '<div class="ps-pane" id="psLkpd"></div>' +
    '</div>';

    const $ = function (id) { return c.querySelector('#' + id); };
    let simActive = false;
    function tab(t, updateNav) {
      if (updateNav !== false && tabCtrl) tabCtrl.setActive(t);
      c.querySelectorAll('.ps-pane').forEach(function (p) { p.classList.remove('on'); });
      const pane = $('ps' + t[0].toUpperCase() + t.slice(1));
      if (pane) pane.classList.add('on');
      simActive = (t === 'simulasi');
      if (simActive) sim.start(); else sim.stop();
    }

    /* ================= TEORI ================= */
    function phImg(fileName, title, desc) {
      return '<div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;background:#0D1520;overflow:hidden;">' +
        '<img src="asset/img/' + fileName + '" alt="' + title + '" style="width:100%;height:100%;object-fit:contain;display:block;" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\';">' +
        '<div style="display:none;width:100%;height:100%;box-sizing:border-box;padding:20px;flex-direction:column;align-items:center;justify-content:center;gap:10px;border:1px dashed rgba(245,200,75,0.4);border-radius:12px;background:radial-gradient(circle at center, rgba(245,200,75,0.08) 0%, #0D1520 75%);text-align:center;">' +
          '<div style="width:52px;height:52px;border-radius:12px;background:rgba(245,200,75,0.12);border:1px solid rgba(245,200,75,0.3);display:flex;align-items:center;justify-content:center;color:#F5C84B;font-size:26px;">⚙️</div>' +
          '<div style="font-family:\'Courier New\',monospace;font-size:14px;font-weight:bold;color:#F5C84B;letter-spacing:0.1em;text-transform:uppercase;">ILUSTRASI HUKUM PASCAL</div>' +
          '<div style="font-size:17px;font-weight:700;color:#EDEFF1;max-width:92%;line-height:1.35;">' + title + '</div>' +
          '<div style="font-size:15px;color:#BAC7D5;max-width:92%;line-height:1.4;">' + desc + '</div>' +
          '<div style="font-family:monospace;font-size:13px;color:#ffb238;background:#1C2228;padding:6px 12px;border-radius:6px;border:1px solid #3A4451;margin-top:4px;">asset/img/' + fileName + '</div>' +
          '<div style="font-size:12px;color:#3DDC84;margin-top:2px;">(Tambahkan file gambar ke folder asset)</div>' +
        '</div>' +
      '</div>';
    }

    const figs = [
      phImg('teori_pascal_1.png', 'Tekanan pada Fluida Permukaan', 'Konsep tekanan P = F/A gaya dorong per satuan luas penampang'),
      phImg('teori_pascal_2.png', 'Pernyataan Hukum Pascal (Blaise Pascal)', 'Tekanan pada zat cair tertutup diteruskan ke segala arah sama besar'),
      phImg('teori_pascal_3.png', 'Prinsip Dongkrak Hidrolik', 'Sistem bejana tertutup dengan piston kecil (A1) dan piston besar (A2)'),
      phImg('teori_pascal_4.png', 'Keuntungan Mekanis & Perpindahan', 'Perbandingan gaya dan jarak perpindahan piston F1·s1 = F2·s2'),
      phImg('teori_pascal_5.png', 'Penerusan Tekanan Isotropik', 'Tekanan seragam menekan ke setiap elemen dinding bejana tertutup'),
      phImg('teori_pascal_6.png', 'Sifat Inkompresibel Fluida Hidrolik', 'Fluida hidrolik minyak/oli tidak mengalami kompresi volume saat ditekan'),
      phImg('teori_pascal_7.png', 'Penerapan Hukum Pascal dalam Teknologi', 'Rem hidrolik mobil, kempa hidrolik pabrik, dan lift servis cuci mobil')
    ];

    const slides = [
      /* Slide 1 */
      [
        '01',
        'Tekanan (P = F / A)',
        '<div class="ps-card"><div class="ps-h">Konsep Dasar Tekanan</div><div class="ps-t"><b>Tekanan (P)</b> adalah perbandingan antara besarnya gaya dorong tegak lurus (F) dengan luas bidang sentuh atau penampang (A) tempat gaya tersebut bekerja. Semakin kecil luas bidang tekan pada gaya yang sama, semakin besar tekanan yang dihasilkan pada fluida.</div></div>' +
        '<div class="ps-card"><div class="ps-h">Formula Tekanan</div><div class="ps-formula">P = F / A</div><div class="ps-t" style="margin-top:8px"><b>P</b> = Tekanan (Pascal / Pa atau N/m²) &nbsp;|&nbsp; <b>F</b> = Gaya dorong (N) &nbsp;|&nbsp; <b>A</b> = Luas bidang penampang (m²)</div></div>' +
        quizHTML('Kuis: Sebuah gaya 100 N bekerja tegak lurus pada piston berluas 0,01 m². Berapakah tekanan yang dihasilkan?', [
          ['1.000 Pa', 0, 'Salah. Perhitungan: P = F / A = 100 / 0,01 = 10.000 Pa.'],
          ['10.000 Pa', 1, 'Benar! P = 100 N / 0,01 m² = 10.000 Pa (10 kPa).'],
          ['100.000 Pa', 0, 'Salah. Hitung kembali nilai 100 dibagi 0,01.']
        ])
      ],

      /* Slide 2 */
      [
        '02',
        'Bunyi Hukum Pascal',
        '<div class="ps-card"><div class="ps-h">Hukum Blaise Pascal (1653)</div><div class="ps-t"><i>"Tekanan yang diberikan pada zat cair di dalam ruang tertutup akan diteruskan oleh zat cair itu ke segala arah dengan sama besar tanpa mengalami pengurangan."</i> Prinsip inilah yang menjadi fondasi seluruh mesin pengangkat hidrolik modern.</div></div>' +
        '<div class="ps-card"><div class="ps-h">Kesetaraan Tekanan Fluida</div><div class="ps-formula">P₁ = P₂</div><div class="ps-t" style="margin-top:8px">Tekanan pada penampang input (P₁) sama persis dengan tekanan yang diterima pada penampang output (P₂), terlepas dari perbedaan bentuk atau ukuran tabung.</div></div>' +
        quizHTML('Kuis: Jika tekanan pada fluida tertutup sebesar 5.000 Pa diberikan pada piston kecil, berapa tekanan yang diteruskan ke piston besar?', [
          ['Tepat 5.000 Pa', 1, 'Benar! Hukum Pascal menegaskan tekanan diteruskan sama besar ke segala arah tanpa berkurang.'],
          ['Lebih kecil dari 5.000 Pa', 0, 'Salah. Tekanan tidak berkurang saat diteruskan dalam bejana tertutup.'],
          ['Tergantung berat piston besar', 0, 'Salah. Nilai tekanan fluida yang diteruskan tetap sama besar.']
        ])
      ],

      /* Slide 3 */
      [
        '03',
        'Persamaan Dongkrak Hidrolik',
        '<div class="ps-card"><div class="ps-h">Perumusan Matematis</div><div class="ps-t">Karena tekanan di kedua piston sama besar (P₁ = P₂), maka berlaku kesetaraan perbandingan gaya dan luas penampang. Dengan menerapkan gaya kecil F₁ pada piston kecil A₁, kita dapat menghasilkan gaya angkat F₂ yang berlipat ganda pada piston besar A₂!</div></div>' +
        '<div class="ps-card"><div class="ps-h">Rumus Dongkrak Hidrolik</div><div class="ps-formula">F₁ / A₁ = F₂ / A₂ &nbsp;&rArr;&nbsp; F₂ = F₁ &times; (A₂ / A₁)</div><div class="ps-t" style="margin-top:8px"><b>F₁, F₂</b> = Gaya pada penampang 1 dan 2 (N) &nbsp;|&nbsp; <b>A₁, A₂</b> = Luas penampang piston 1 dan 2 (m² atau cm²).</div></div>' +
        quizHTML('Kuis: Piston kecil berluas 5 cm² ditekan dengan gaya 50 N. Berapakah gaya angkat pada piston besar yang berluas 50 cm²?', [
          ['50 N', 0, 'Salah. Gaya angkat akan digandakan sesuai rasio luas piston.'],
          ['250 N', 0, 'Salah. Rasio luas penampang adalah 50 / 5 = 10 kali.'],
          ['500 N', 1, 'Benar! F₂ = F₁ × (A₂ / A₁) = 50 × (50 / 5) = 500 N.']
        ])
      ],

      /* Slide 4 */
      [
        '04',
        'Keuntungan Mekanis & Perpindahan',
        '<div class="ps-card"><div class="ps-h">Keuntungan Mekanis (KM)</div><div class="ps-t"><b>Keuntungan Mekanis (KM)</b> mengukur seberapa banyak gaya input dilipatgandakan oleh sistem hidrolik: <b>KM = F₂ / F₁ = A₂ / A₁</b>. Semakin besar rasio luas piston output terhadap input, semakin besar beban yang mampu diangkat.</div></div>' +
        '<div class="ps-card"><div class="ps-h">Hukum Kekekalan Energi & Jarak (h)</div><div class="ps-formula">W₁ = W₂ &nbsp;&rArr;&nbsp; F₁ &middot; h₁ = F₂ &middot; h₂</div><div class="ps-t" style="margin-top:8px">Gaya memang dilipatgandakan, namun jarak perpindahan piston besar (h₂) menjadi lebih kecil: <b>h₂ = h₁ &times; (A₁ / A₂)</b>. Volume fluida yang terdesak selalu konstan: V₁ = V₂.</div></div>' +
        quizHTML('Kuis: Sebuah dongkrak memiliki keuntungan mekanis KM = 5. Jika piston kecil ditekan sejauh h₁ = 20 cm, berapa jarak naiknya piston besar (h₂)?', [
          ['4 cm', 1, 'Benar! h₂ = h₁ / KM = 20 cm / 5 = 4 cm. Beban naik lebih pendek secara proporsional.'],
          ['20 cm', 0, 'Salah. Karena gaya berlipat 5 kali, maka perpindahan beban berkurang 5 kali.'],
          ['100 cm', 0, 'Salah. Piston besar tidak mungkin bergerak lebih jauh dari piston pendorong.']
        ])
      ],

      /* Slide 5 */
      [
        '05',
        'Tekanan Isotropik dalam Fluida',
        '<div class="ps-card"><div class="ps-h">Penyebaran Tekanan ke Seluruh Wadah</div><div class="ps-t">Berbeda dengan benda padat yang meneruskan gaya hanya ke arah gaya diberikan, fluida dalam wadah tertutup meneruskan tekanan secara <b>isotropik</b> (merata dan seragam ke setiap titik, sudut, dan dinding bejana penghubung).</div></div>' +
        '<div class="ps-card"><div class="ps-h">Perbedaan Pascal vs Tekanan Hidrostatis</div><div class="ps-t">Tekanan hidrostatis (P = &rho;gh) bergantung mutlak pada kedalaman vertikal kolom fluida. Sedangkan pada Hukum Pascal, penambahan tekanan dari luar (&Delta;P) didistribusikan sama rata ke seluruh cairan tanpa memandang ketinggian fluida.</div></div>' +
        quizHTML('Kuis: Apa ciri khas penerusan tekanan menurut Hukum Pascal pada bejana tertutup?', [
          ['Hanya diteruskan ke arah bawah menuju dasar bejana', 0, 'Salah. Itu adalah sifat berat kolom hidrostatis murni.'],
          ['Diteruskan ke segala arah sama besar ke seluruh bagian zat cair', 1, 'Benar! Tekanan hidrolik bersifat isotropik di dalam ruang tertutup.'],
          ['Tekanan di piston besar lebih kecil karena luasnya lebar', 0, 'Salah. Tekanannya persis sama, gayanya yang membesar.']
        ])
      ],

      /* Slide 6 */
      [
        '06',
        'Sifat Fluida Tak Kompresibel',
        '<div class="ps-card"><div class="ps-h">Syarat Fluida Hidrolik</div><div class="ps-t">Hukum Pascal bekerja optimal pada zat cair karena zat cair memiliki sifat <b>inkompresibel</b> (hampir tidak dapat dimampatkan / kerapatan massanya konstan). Jika digunakan gas (udara), gaya pendorong sebagian besar habis memampatkan gas sebelum menggerakkan beban.</div></div>' +
        '<div class="ps-card"><div class="ps-h">Minyak & Oli Hidrolik Khusus</div><div class="ps-t">Sistem hidrolik industri menggunakan minyak atau oli khusus yang tahan karat, tidak mudah mendidih, memiliki viskositas stabil, dan tidak menghasilkan gelembung udara (*bleeding*) agar transmisi daya hidrolik mencapai efisiensi 100%.</div></div>' +
        quizHTML('Kuis: Mengapa sistem rem hidrolik kendaraan bermotor menggunakan minyak rem dan bukan udara?', [
          ['Karena minyak rem tak dapat dimampatkan sehingga respon pengereman spontan', 1, 'Benar! Udara bersifat kompresibel sehingga pedal rem akan terasa amblas (*spongy*).'],
          ['Karena minyak rem lebih dingin dari udara luar', 0, 'Salah. Suhu bukan alasan mendasar transmisi tekanan fluida.'],
          ['Karena minyak rem memperkecil luas piston rem', 0, 'Salah. Fluida tidak mengubah dimensi fisik piston.']
        ])
      ],

      /* Slide 7 */
      [
        '07',
        'Penerapan Hukum Pascal',
        '<div class="ps-card"><div class="ps-h">Teknologi Hidrolik Sehari-hari</div><div class="ps-t">1. <b>Dongkrak & Lift Cuci Mobil</b>: Mengangkat kendaraan berbobot ton dengan pompa kompresor kecil.<br>2. <b>Sistem Rem Hidrolik (Cakram)</b>: Injakan kaki pengemudi dilipatgandakan untuk menjepit cakram roda baja berkecepatan tinggi.</div></div>' +
        '<div class="ps-card"><div class="ps-h">Alat Berat & Medis</div><div class="ps-t">3. <b>Ekskavator & Crane</b>: Silinder hidrolik bertenaga ribuan Pascal menggerakkan lengan pengeruk baja.<br>4. <b>Kursi Pasien Dokter Gigi</b>: Ditinggikan atau dimiringkan dengan pedal hidrolik kaki yang halus dan presisi.</div></div>' +
        quizHTML('Kuis: Manakah dari alat berikut yang mekanisme kerjanya memanfaatkan Hukum Pascal?', [
          ['Termometer raksa dan barometer Torricelli', 0, 'Salah. Termometer memanfaatkan pemuaian termal; barometer memanfaatkan tekanan hidrostatis.'],
          ['Dongkrak hidrolik dan rem cakram mobil', 1, 'Benar! Keduanya memanfaatkan pelipatgandaan gaya melalui fluida tertutup.'],
          ['Sayap pesawat terbang dan cerobong asap', 0, 'Salah. Itu adalah aplikasi Hukum Bernoulli pada fluida dinamis.']
        ])
      ]
    ];

    function quizHTML(q, opts) {
      return '<div class="ps-card ps-quiz"><div class="ps-qq">' + q + '</div><div class="ps-qo">' + opts.map(function (o) {
        return '<button data-ok="' + o[1] + '" data-msg="' + o[2].replace(/"/g, '&quot;') + '">' + o[0] + '</button>';
      }).join('') + '</div><div class="ps-qf"></div></div>';
    }

    let cur = 0;

    /* Render Struktur Teori Lengkap */
    $('psTeori').innerHTML =
      '<div class="ps-teori-wrap">' +
        '<!-- Header -->' +
        '<div class="ps-teori-hdr">' +
          '<div class="ps-teori-tit" id="psTeoriTitle">' +
            '<span class="ps-badge-num">01</span> TEKANAN (P = F / A)' +
          '</div>' +
          '<div class="ps-tl" id="psTeoriTl">' +
            slides.map(function (s, i) {
              return '<div class="ps-tl-step' + (i === 0 ? ' active' : '') + '" data-step="' + i + '">' + s[0] + '</div>';
            }).join('') +
          '</div>' +
        '</div>' +
        '<!-- Progress Bar Track -->' +
        '<div class="ps-p-track"><div class="ps-p-bar" id="psTeoriPBar"></div></div>' +
        '<!-- Slides Container -->' +
        '<div style="flex:1;min-height:0;display:flex;position:relative">' +
          slides.map(function (s, i) {
            return '<div class="ps-slide' + (i === 0 ? ' on' : '') + '" id="psSlide_' + i + '" style="position:absolute;inset:0">' +
              '<div class="ps-col">' + s[2] + '</div>' +
              '<div class="ps-fig">' + figs[i] + '</div>' +
            '</div>';
          }).join('') +
        '</div>' +
        '<!-- Navigasi Bawah -->' +
        '<div class="ps-nav">' +
          '<button class="btn-nav-outline" id="psPrev" disabled><svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"></polyline></svg> Sebelumnya</button>' +
          '<div class="ps-cnt" id="psCnt">SLIDE 01 / 07</div>' +
          '<button class="btn-nav-solid" id="psNext">Selanjutnya <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg></button>' +
        '</div>' +
      '</div>';

    function showSlide(n) {
      cur = Math.max(0, Math.min(slides.length - 1, n));
      for (let i = 0; i < slides.length; i++) {
        const sl = $('psSlide_' + i);
        if (sl) sl.classList.toggle('on', i === cur);
      }
      const titEl = $('psTeoriTitle');
      if (titEl) {
        titEl.innerHTML = '<span class="ps-badge-num">' + slides[cur][0] + '</span> ' + slides[cur][1].toUpperCase();
      }
      const tlSteps = c.querySelectorAll('#psTeoriTl .ps-tl-step');
      tlSteps.forEach(function (stepEl, idx) {
        stepEl.classList.remove('active', 'done');
        if (idx === cur) stepEl.classList.add('active');
        else if (idx < cur) stepEl.classList.add('done');
      });
      const pBar = $('psTeoriPBar');
      if (pBar) {
        const pct = ((cur + 1) / slides.length) * 100;
        pBar.style.width = pct + '%';
      }
      $('psCnt').textContent = 'SLIDE ' + slides[cur][0] + ' / 0' + slides.length;
      $('psPrev').disabled = (cur === 0);
      const nextBtn = $('psNext');
      if (cur === slides.length - 1) {
        nextBtn.innerHTML = 'Ke Prosedur <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg>';
        nextBtn.classList.add('done');
      } else {
        nextBtn.innerHTML = 'Selanjutnya <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg>';
        nextBtn.classList.remove('done');
      }
    }

    $('psPrev').onclick = function () { showSlide(cur - 1); };
    $('psNext').onclick = function () { cur === slides.length - 1 ? tab('prosedur') : showSlide(cur + 1); };

    const tlWrap = $('psTeoriTl');
    if (tlWrap) {
      tlWrap.addEventListener('click', function (e) {
        const target = e.target.closest('.ps-tl-step');
        if (target && target.dataset.step !== undefined) {
          showSlide(parseInt(target.dataset.step, 10));
        }
      });
    }
    showSlide(0);

    // Kuis Interactive Logic
    $('psTeori').addEventListener('click', function (e) {
      const b = e.target.closest('.ps-qo button'); if (!b) return;
      const box = b.closest('.ps-quiz'), ok = b.dataset.ok === '1';
      box.querySelectorAll('button').forEach(function (x) {
        x.disabled = true;
        if (x.dataset.ok === '1') x.classList.add('ok');
      });
      if (!ok) b.classList.add('no');
      box.querySelector('.ps-qf').textContent = b.dataset.msg;
    });

    /* ================= PROSEDUR ================= */
    const steps = [
      ['Tahap 1: Pengenalan Komponen Dongkrak Hidrolik', ['Aktifkan <b>Grid</b> dan tampilkan <b>Penggaris</b> serta <b>Manometer</b> pada panel kiri.', 'Kenali <b>Piston 1 (Input)</b> berpenampang kecil (A₁ = 10 cm²) dan <b>Piston 2 (Output)</b> berpenampang besar (A₂).', 'Perhatikan bahwa bejana hidrolik terisi penuh oleh oli hidrolik dalam ruang tertutup.']],
      ['Tahap 2: Mengatur Gaya Tekan Input F₁', ['Pilih besaran gaya tekan <b>F₁</b> pada panel kiri (tersedia pilihan 50 N, 100 N, 150 N, 200 N, hingga 250 N).', 'Piston 1 terkunci pada luas <b>A₁ = 10 cm²</b> sebagai acuan input standar.', 'Amati nilai tekanan hidrolik yang timbul: <b>P = F₁ / A₁</b>.']],
      ['Tahap 3: Memilih Beban Output & Melakukan Tekanan', ['Pilih jenis <b>Beban / Luas Piston Output (A₂)</b> pada panel kiri (Motor, Mobil Mini, SUV, Truk Ringan, Truk Berat).', 'Tekan tombol <b>TEKAN PISTON</b> untuk mengalirkan tekanan hidrolik ke piston output.', 'Amati bahwa piston kecil turun sejauh h₁ dan piston besar terangkat naik sejauh h₂.']],
      ['Tahap 4: Pengukuran, Perhitungan, & Catat ke LKPD', ['Gunakan penggaris dan manometer untuk memverifikasi kesetaraan tekanan fluida tertutup.', 'Hitung gaya angkat teoritis: <b>F₂ = F₁ &times; (A₂ / A₁)</b>.', 'Ketikkan data hasil ukur pada Lembar Pengukuran di panel kanan, lalu klik <b>📥 Catat Data ke LKPD</b>.']]
    ];
    $('psProsedur').innerHTML = '<div class="ps-steps">' + steps.map(function (s, i) {
      return '<div class="ps-card ps-step"><div class="ps-h" style="font-size:17px"><span style="color:#F5C84B">0' + (i + 1) + '</span> &nbsp;' + s[0] + '</div><ul>' + s[1].map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul></div>';
    }).join('') + '</div><div class="ps-nav"><span></span><button class="btn-nav-solid done" id="psGoSim">Buka Simulasi &rarr;</button></div>';
    $('psGoSim').onclick = function () { tab('simulasi'); };

    /* ================= SIMULASI 3 PANEL ================= */
    const A1_VAL = 10; // cm²
    const LOADS = [
      { name: 'Sepeda Motor', a2: 50, icon: '🏍️', mass: 250 },
      { name: 'Mobil Sedan', a2: 100, icon: '🚗', mass: 1000 },
      { name: 'Mobil SUV', a2: 200, icon: '🚙', mass: 2000 },
      { name: 'Truk Ringan', a2: 400, icon: '🚚', mass: 4000 },
      { name: 'Truk Tronton', a2: 500, icon: '🚛', mass: 5000 }
    ];

    const sm = {
      f1: 100, // Newton
      loadIdx: 1, // default Mobil Sedan A2=100
      pressed: false,
      pressFrac: 0, // 0 to 1
      grid: true,
      ruler: true,
      gauge: true,
      atm: false,
      rx: 120, ry: 450, // Ruler pos
      gx: 680, gy: 320, // Gauge pos
      drag: null,
      raf: 0,
      last: 0
    };

    $('psSimulasi').innerHTML = '<div class="ps-sim">' +
      '<!-- PANEL KIRI (ALAT, KONTROL INPUT & OUTPUT) -->' +
      '<div class="ps-panel-left">' +
        '<div class="ps-card ps-card-alat"><div class="ps-h">Alat Bantu</div><div class="ps-chk"><label><input type="checkbox" id="psGrid" checked>Grid</label><label><input type="checkbox" id="psRul" checked>Penggaris</label><label><input type="checkbox" id="psGau" checked>Manometer</label><label><input type="checkbox" id="psAtm">Atmosfer</label></div></div>' +
        '<div class="ps-card ps-card-input">' +
          '<div class="ps-h">Piston 1 (Input Pendorong)</div>' +
          '<div class="ps-fl-lock"><span>🔩 <b>Penampang A₁</b></span><span>10 cm² 🔒</span></div>' +
          '<div class="ps-f1-sel">' +
            '<span style="font-size:13px;color:#BAC7D5;white-space:nowrap;">Gaya F₁ :</span>' +
            '<select id="psF1Sel">' +
              '<option value="50">50 N</option>' +
              '<option value="100" selected>100 N</option>' +
              '<option value="150">150 N</option>' +
              '<option value="200">200 N</option>' +
              '<option value="250">250 N</option>' +
            '</select>' +
          '</div>' +
        '</div>' +
        '<div class="ps-card ps-card-output"><div class="ps-h">Piston 2 (Beban & Penampang A₂)</div><div class="ps-load-grid" id="psLoads"></div></div>' +
        '<div class="ps-card ps-card-act"><div class="ps-act"><button id="psPress">Tekan Piston</button><button class="r" id="psReset">Reset</button></div></div>' +
      '</div>' +
      '<!-- PANEL TENGAH (CANVAS DONGKRAK HIDROLIK) -->' +
      '<div class="ps-panel-mid">' +
        '<canvas class="ps-cv" id="psCv" width="860" height="560"></canvas>' +
      '</div>' +
      '<!-- PANEL KANAN (OUTPUT & LEMBAR PENGUKURAN) -->' +
      '<div class="ps-panel-right">' +
        '<div class="ps-card ps-card-gauge"><div class="ps-h">Manometer Tekanan</div><div class="ps-gauge" id="psRead">Tekan piston untuk mengamati transmisi tekanan hidrolik.</div></div>' +
        '<div class="ps-card ps-card-ukur">' +
          '<div>' +
            '<div class="ps-h">Lembar Pengukuran Siswa</div>' +
            '<div style="font-size:13px;color:#BAC7D5;padding:6px 8px;background:rgba(0,0,0,0.25);border-radius:6px;border-left:3px solid #3DDC84;margin-bottom:6px;">' +
              'Beban Uji: <b id="psUjiLoadName" style="color:#F5C84B;">🚗 Mobil Sedan</b><br>' +
              'Piston Input: <b>A₁ = 10 cm²</b>' +
            '</div>' +
          '</div>' +
          '<div class="ps-inp-group">' +
            '<div class="ps-inp-item">' +
              '<label>Gaya Tekan Input (F₁) :</label>' +
              '<div class="ps-inp-wrap"><input type="number" id="psSimF1" placeholder="Gaya diberikan"><span class="ps-unit">N</span></div>' +
            '</div>' +
            '<div class="ps-inp-item">' +
              '<label>Luas Penampang Beban (A₂) :</label>' +
              '<div class="ps-inp-wrap"><input type="number" id="psSimA2" placeholder="Luas piston 2"><span class="ps-unit">cm²</span></div>' +
            '</div>' +
            '<div class="ps-inp-item">' +
              '<label>Gaya Angkat F₂ (Hasil Hitung) :</label>' +
              '<div class="ps-inp-wrap"><input type="number" id="psSimF2" placeholder="Hitung dengan rumus"><span class="ps-unit">N</span></div>' +
            '</div>' +
            '<div style="font-size:12px;color:#F5C84B;background:rgba(245,200,75,0.08);padding:5px 8px;border-radius:6px;text-align:center;border:1px dashed rgba(245,200,75,0.25);margin-top:2px;">' +
              'Rumus Pascal: F₂ = F₁ &times; (A₂ / A₁)' +
            '</div>' +
          '</div>' +
          '<div style="margin-top:auto;">' +
            '<button id="psRecord" class="btn-record-lkpd">&#128229; CATAT DATA KE LKPD</button>' +
            '<div id="psRecordMsg" style="font-size:13px;text-align:center;margin-top:4px;min-height:18px;font-weight:bold;"></div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';

    const cv = $('psCv'), cx = cv.getContext('2d');

    function renderLoads() {
      $('psLoads').innerHTML = LOADS.map(function (ld, i) {
        return '<button data-load="' + i + '" class="' + (i === sm.loadIdx ? 'on' : '') + '">' +
          '<span class="l-icon">' + ld.icon + '</span>' +
          '<span class="l-name">' + ld.name + '<br><b style="color:#F5C84B">' + ld.a2 + ' cm²</b></span>' +
        '</button>';
      }).join('');
      const uji = $('psUjiLoadName');
      if (uji) uji.textContent = LOADS[sm.loadIdx].icon + ' ' + LOADS[sm.loadIdx].name + ' (' + LOADS[sm.loadIdx].a2 + ' cm²)';
      $('psPress').disabled = sm.pressed;
    }

    function resetSim() {
      sm.pressed = false;
      sm.pressFrac = 0;
      if ($('psSimF1')) $('psSimF1').value = '';
      if ($('psSimA2')) $('psSimA2').value = '';
      if ($('psSimF2')) $('psSimF2').value = '';
      const msg = $('psRecordMsg');
      if (msg) msg.textContent = '';
      renderLoads();
    }

    $('psSimulasi').addEventListener('click', function (e) {
      const b = e.target.closest('[data-load]');
      if (b) {
        sm.loadIdx = +b.dataset.load;
        renderLoads();
      }
      else if (e.target.id === 'psPress') { sm.pressed = true; renderLoads(); }
      else if (e.target.id === 'psReset') resetSim();
      else if (e.target.id === 'psRecord') { if (typeof recordToLkpdPascal === 'function') recordToLkpdPascal(); }
    });

    $('psSimulasi').addEventListener('change', function (e) {
      if (e.target.id === 'psF1Sel') {
        sm.f1 = parseFloat(e.target.value) || 100;
      }
    });

    $('psSimulasi').addEventListener('input', function (e) {
      if (e.target.id === 'psGrid') sm.grid = e.target.checked;
      else if (e.target.id === 'psRul') sm.ruler = e.target.checked;
      else if (e.target.id === 'psGau') sm.gauge = e.target.checked;
      else if (e.target.id === 'psAtm') sm.atm = e.target.checked;
    });

    renderLoads();

    /* ================= CANVAS RENDER DONGKRAK HIDROLIK ================= */
    const Y_DATUM = 360;
    const P0 = 101300; // 1 atm dalam Pa
    const S = 5; // pixel per cm skala

    // Dimensi geometri dongkrak:
    // Piston 1 (kiri): sumbu X = 240, lebar silinder = 70 (A1 konvensional)
    // Piston 2 (kanan): sumbu X = 570, lebar silinder bergantung pada A2 (120 s/d 220 px)
    function geom() {
      const curLoad = LOADS[sm.loadIdx];
      const a2 = curLoad.a2;
      const ratio = a2 / A1_VAL; // KM = A2/A1
      const F2 = sm.f1 * ratio;
      // Piston 1 turun sejauh h1 (maksimal 16 cm saat full pressed)
      const h1 = sm.pressFrac * 16;
      // Piston 2 naik sejauh h2 = h1 / ratio (hukum kekekalan volume)
      const h2 = h1 / ratio;
      const P_pascal = (sm.f1 / (A1_VAL * 1e-4)); // Pascal (N/m²)
      return {
        a1: A1_VAL,
        a2: a2,
        ratio: ratio,
        f1: sm.f1,
        f2: F2,
        h1: h1,
        h2: h2,
        p: sm.pressed ? P_pascal : 0
      };
    }

    function draw() {
      cx.clearRect(0, 0, 860, 560);
      const g = geom();

      // 1. LATAR BELAKANG LAB
      const bg = cx.createLinearGradient(0, 0, 0, 560);
      bg.addColorStop(0, '#0a1420');
      bg.addColorStop(0.6, '#060d15');
      bg.addColorStop(1, '#020509');
      cx.fillStyle = bg;
      cx.fillRect(0, 0, 860, 560);

      // Radial glow hangat di tengah
      const glow = cx.createRadialGradient(430, 280, 50, 430, 280, 380);
      glow.addColorStop(0, 'rgba(245, 200, 75, 0.08)');
      glow.addColorStop(0.5, 'rgba(245, 200, 75, 0.025)');
      glow.addColorStop(1, 'transparent');
      cx.fillStyle = glow;
      cx.fillRect(0, 0, 860, 560);

      // Meja Workbench
      const bench = cx.createLinearGradient(0, 500, 0, 560);
      bench.addColorStop(0, '#101721');
      bench.addColorStop(1, '#080d14');
      cx.fillStyle = bench;
      cx.fillRect(0, 500, 860, 60);
      cx.strokeStyle = 'rgba(245, 200, 75, 0.25)';
      cx.lineWidth = 1;
      cx.beginPath();
      cx.moveTo(0, 500); cx.lineTo(860, 500);
      cx.stroke();

      // 2. GRID DIGITAL PRESISI
      if (sm.grid) {
        cx.save();
        cx.lineWidth = 0.8;
        for (let y = 100; y <= 480; y += 20) {
          cx.strokeStyle = (y === Y_DATUM) ? 'rgba(245, 200, 75, 0.45)' : 'rgba(95, 168, 214, 0.08)';
          cx.beginPath();
          cx.moveTo(60, y); cx.lineTo(800, y);
          cx.stroke();
        }
        for (let x = 80; x <= 780; x += 40) {
          cx.strokeStyle = 'rgba(95, 168, 214, 0.07)';
          cx.beginPath();
          cx.moveTo(x, 100); cx.lineTo(x, 480);
          cx.stroke();
        }
        cx.restore();
      }

      // 3. SILINDER BEJANA DONGKRAK HIDROLIK & SALURAN
      const x1 = 230, w1 = 70; // Silinder input (A1)
      const w2 = Math.min(200, 110 + (g.a2 / 500) * 80); // Lebar silinder output (A2)
      const x2 = 580 - w2 / 2;
      const yBot = 470, pipeH = 46;

      // Fluida hidrolik (Oli Merah Amber Berpendar)
      const yFluid1 = Y_DATUM + g.h1 * S;
      const yFluid2 = Y_DATUM - g.h2 * S;

      cx.save();
      // Jalur fluida utuh
      cx.beginPath();
      cx.moveTo(x1, yFluid1);
      cx.lineTo(x1, yBot);
      cx.lineTo(x2 + w2, yBot);
      cx.lineTo(x2 + w2, yFluid2);
      cx.lineTo(x2, yFluid2);
      cx.lineTo(x2, yBot - pipeH);
      cx.lineTo(x1 + w1, yBot - pipeH);
      cx.lineTo(x1 + w1, yFluid1);
      cx.closePath();

      const fluidGrad = cx.createLinearGradient(0, yFluid2, 0, yBot);
      fluidGrad.addColorStop(0, 'rgba(235, 87, 87, 0.85)');
      fluidGrad.addColorStop(0.5, 'rgba(190, 40, 40, 0.9)');
      fluidGrad.addColorStop(1, 'rgba(130, 20, 20, 0.95)');
      cx.fillStyle = fluidGrad;
      cx.fill();
      cx.restore();

      // Dinding Silinder Baja Luar
      cx.save();
      cx.strokeStyle = 'rgba(160, 185, 210, 0.85)';
      cx.lineWidth = 4;
      cx.shadowColor = 'rgba(245, 200, 75, 0.3)';
      cx.shadowBlur = 6;
      cx.beginPath();
      // Silinder 1 kiri
      cx.moveTo(x1, 160);
      cx.lineTo(x1, yBot);
      cx.lineTo(x2 + w2, yBot);
      cx.lineTo(x2 + w2, 160);
      // Saluran dalam
      cx.moveTo(x2, 160);
      cx.lineTo(x2, yBot - pipeH);
      cx.lineTo(x1 + w1, yBot - pipeH);
      cx.lineTo(x1 + w1, 160);
      cx.stroke();
      cx.restore();

      // Garis Datum Awal (Garis Referensi Level Awal)
      cx.save();
      cx.strokeStyle = '#F5C84B';
      cx.lineWidth = 1.5;
      cx.setLineDash([5, 4]);
      cx.beginPath();
      cx.moveTo(x1 - 30, Y_DATUM);
      cx.lineTo(x2 + w2 + 30, Y_DATUM);
      cx.stroke();
      cx.setLineDash([]);
      cx.fillStyle = '#F5C84B';
      cx.font = 'bold 11px Arial';
      cx.textAlign = 'right';
      cx.fillText('Level Datum Awal (h₀)', x1 - 35, Y_DATUM + 4);
      cx.restore();

      // 4. PISTON 1 (INPUT PENDORONG)
      const p1H = 26;
      cx.save();
      // Batang piston 1
      cx.fillStyle = '#4A5568';
      cx.fillRect(x1 + w1 / 2 - 6, yFluid1 - 100, 12, 100);
      // Kepala penekan piston 1
      const p1Grad = cx.createLinearGradient(x1, 0, x1 + w1, 0);
      p1Grad.addColorStop(0, '#718096');
      p1Grad.addColorStop(0.5, '#E2E8F0');
      p1Grad.addColorStop(1, '#4A5568');
      cx.fillStyle = p1Grad;
      cx.strokeStyle = '#2D3748';
      cx.lineWidth = 2;
      cx.fillRect(x1 + 2, yFluid1 - p1H, w1 - 4, p1H);
      cx.strokeRect(x1 + 2, yFluid1 - p1H, w1 - 4, p1H);

      // Panah Gaya Tekan F1 di atas piston 1
      cx.fillStyle = '#3DDC84';
      cx.strokeStyle = '#3DDC84';
      cx.lineWidth = 3;
      const arrowTop = yFluid1 - 150, arrowBot = yFluid1 - 110;
      cx.beginPath();
      cx.moveTo(x1 + w1 / 2, arrowTop);
      cx.lineTo(x1 + w1 / 2, arrowBot);
      cx.lineTo(x1 + w1 / 2 - 8, arrowBot - 10);
      cx.moveTo(x1 + w1 / 2, arrowBot);
      cx.lineTo(x1 + w1 / 2 + 8, arrowBot - 10);
      cx.stroke();
      cx.font = 'bold 13px Arial';
      cx.textAlign = 'center';
      cx.fillText('F₁ = ' + g.f1 + ' N', x1 + w1 / 2, arrowTop - 8);
      cx.restore();

      // 5. PISTON 2 (OUTPUT PENGANGKAT & BEBAN)
      const p2H = 28;
      cx.save();
      // Batang piston 2
      cx.fillStyle = '#4A5568';
      cx.fillRect(x2 + w2 / 2 - 10, yFluid2 - 60, 20, 60);
      // Kepala piston 2
      const p2Grad = cx.createLinearGradient(x2, 0, x2 + w2, 0);
      p2Grad.addColorStop(0, '#718096');
      p2Grad.addColorStop(0.5, '#E2E8F0');
      p2Grad.addColorStop(1, '#4A5568');
      cx.fillStyle = p2Grad;
      cx.strokeStyle = '#2D3748';
      cx.lineWidth = 2;
      cx.fillRect(x2 + 2, yFluid2 - p2H, w2 - 4, p2H);
      cx.strokeRect(x2 + 2, yFluid2 - p2H, w2 - 4, p2H);

      // Platform Pengangkat Beban di atas batang piston 2
      const platY = yFluid2 - 68, platW = w2 + 20, platX = x2 - 10;
      cx.fillStyle = '#2B3644';
      cx.strokeStyle = '#F5C84B';
      cx.lineWidth = 1.8;
      cx.beginPath();
      cx.roundRect(platX, platY, platW, 10, 4);
      cx.fill(); cx.stroke();

      // Gambar Ikon Beban
      const curLoad = LOADS[sm.loadIdx];
      cx.font = '40px Arial';
      cx.textAlign = 'center';
      cx.fillText(curLoad.icon, platX + platW / 2, platY - 12);

      // Panah Gaya Angkat F2
      cx.fillStyle = '#F5C84B';
      cx.strokeStyle = '#F5C84B';
      cx.lineWidth = 3;
      const f2Bot = platY - 60, f2Top = platY - 95;
      cx.beginPath();
      cx.moveTo(platX + platW / 2, f2Bot);
      cx.lineTo(platX + platW / 2, f2Top);
      cx.lineTo(platX + platW / 2 - 8, f2Top + 10);
      cx.moveTo(platX + platW / 2, f2Top);
      cx.lineTo(platX + platW / 2 + 8, f2Top + 10);
      cx.stroke();
      cx.font = 'bold 13px Arial';
      cx.fillText('F₂ = ' + g.f2.toFixed(0) + ' N', platX + platW / 2, f2Top - 8);
      cx.restore();

      // 6. ANOTASI PERPINDAHAN h1 & h2
      if (g.h1 > 0.2) {
        cx.save();
        cx.strokeStyle = '#7FBCE3';
        cx.lineWidth = 1.5;
        // Penanda h1
        const ax1 = x1 - 12;
        cx.beginPath();
        cx.moveTo(ax1, Y_DATUM); cx.lineTo(ax1, yFluid1);
        cx.moveTo(ax1 - 4, Y_DATUM); cx.lineTo(ax1 + 4, Y_DATUM);
        cx.moveTo(ax1 - 4, yFluid1); cx.lineTo(ax1 + 4, yFluid1);
        cx.stroke();
        cx.fillStyle = '#7FBCE3';
        cx.font = 'bold 11px Arial';
        cx.textAlign = 'right';
        cx.fillText('h₁=' + g.h1.toFixed(1) + 'cm', ax1 - 6, (Y_DATUM + yFluid1) / 2 + 4);

        // Penanda h2
        const ax2 = x2 + w2 + 12;
        cx.strokeStyle = '#F5C84B';
        cx.beginPath();
        cx.moveTo(ax2, Y_DATUM); cx.lineTo(ax2, yFluid2);
        cx.moveTo(ax2 - 4, Y_DATUM); cx.lineTo(ax2 + 4, Y_DATUM);
        cx.moveTo(ax2 - 4, yFluid2); cx.lineTo(ax2 + 4, yFluid2);
        cx.stroke();
        cx.fillStyle = '#F5C84B';
        cx.textAlign = 'left';
        cx.fillText('h₂=' + g.h2.toFixed(2) + 'cm', ax2 + 6, (Y_DATUM + yFluid2) / 2 + 4);
        cx.restore();
      }

      // Badge Pusat Persamaan Hukum Pascal
      const badgeW = 260, badgeH = 26, badgeX = 430 - badgeW / 2, badgeY = 485;
      cx.save();
      cx.fillStyle = 'rgba(15, 23, 42, 0.9)';
      cx.strokeStyle = 'rgba(245, 200, 75, 0.7)';
      cx.lineWidth = 1.2;
      cx.beginPath();
      cx.roundRect(badgeX, badgeY, badgeW, badgeH, 6);
      cx.fill(); cx.stroke();
      cx.fillStyle = '#F5C84B';
      cx.font = 'bold 12px "Courier New", monospace';
      cx.textAlign = 'center';
      cx.fillText('P₁ = P₂  <=>  F₁/A₁ = F₂/A₂', 430, badgeY + 17);
      cx.restore();

      // 7. PENGGARIS
      if (sm.ruler) {
        cx.save();
        const rw = 34, top = sm.ry - 30 * S;
        cx.shadowColor = 'rgba(0, 0, 0, 0.35)';
        cx.shadowBlur = 8;
        cx.fillStyle = 'rgba(255, 235, 160, 0.95)';
        cx.fillRect(sm.rx, top, rw, 30 * S + 12);
        cx.strokeStyle = '#333';
        cx.lineWidth = 1;
        cx.strokeRect(sm.rx, top, rw, 30 * S + 12);

        cx.fillStyle = '#222';
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
        cx.fillStyle = '#d33';
        cx.fillRect(sm.rx, sm.ry - 1.5, rw, 3);
        cx.restore();
      }

      // 8. MANOMETER DIGITAL
      if (sm.gauge) {
        cx.save();
        const dialX = sm.gx, dialY = sm.gy;
        const dialR = 32;

        cx.fillStyle = '#0f172a';
        cx.shadowColor = 'rgba(0,0,0,0.5)';
        cx.shadowBlur = 10;
        cx.beginPath();
        cx.arc(dialX, dialY, dialR, 0, Math.PI * 2);
        cx.fill();
        cx.strokeStyle = '#F5C84B';
        cx.lineWidth = 2;
        cx.stroke();

        // Tampilan Tekanan
        const pKPa = sm.pressed ? (g.p / 1000) : 0;
        const pTotKPa = pKPa + (sm.atm ? (P0 / 1000) : 0);

        cx.fillStyle = '#F5C84B';
        cx.font = 'bold 11px "Courier New", monospace';
        cx.textAlign = 'center';
        cx.fillText(pTotKPa.toFixed(1), dialX, dialY + 4);
        cx.font = '9px Arial';
        cx.fillStyle = '#BAC7D5';
        cx.fillText('kPa', dialX, dialY + 16);

        // Update Text di Panel Kanan
        const rd = $('psRead');
        if (rd) {
          if (sm.pressed) {
            rd.innerHTML = 'Tekanan Hidrolik (P) : <b>' + pKPa.toFixed(1) + ' kPa</b><br>' +
              'Gaya Input F₁ : <b>' + g.f1 + ' N</b> (A₁ = ' + g.a1 + ' cm²)<br>' +
              'Gaya Angkat F₂ : <b>' + g.f2.toFixed(0) + ' N</b> (A₂ = ' + g.a2 + ' cm²)<br>' +
              'Keuntungan Mekanis (KM) : <b>' + g.ratio.toFixed(1) + 'x</b>';
          } else {
            rd.innerHTML = 'Status: <span style="color:#BAC7D5">Piston belum ditekan</span><br>' +
              'Tekanan fluida : <b>' + (sm.atm ? '101,3 kPa (P₀)' : '0,0 kPa') + '</b><br>' +
              '<span style="font-size:12px;color:#F5C84B;">Tekan tombol "Tekan Piston" untuk mengalirkan tekanan.</span>';
          }
        }
        cx.restore();
      }
    }

    function frame(t) {
      if (!cv.isConnected) return;
      const dt = Math.min(0.05, (t - sm.last) / 1000 || 0); sm.last = t;
      if (sm.pressed && sm.pressFrac < 1) {
        sm.pressFrac = Math.min(1, sm.pressFrac + 2.5 * dt);
      }
      draw();
      sm.raf = requestAnimationFrame(frame);
    }

    const sim = {
      start: function () { cancelAnimationFrame(sm.raf); sm.last = performance.now(); sm.raf = requestAnimationFrame(frame); },
      stop: function () { cancelAnimationFrame(sm.raf); }
    };

    function pt(e) {
      const r = cv.getBoundingClientRect();
      return [(e.clientX - r.left) * cv.width / r.width, (e.clientY - r.top) * cv.height / r.height];
    }

    cv.addEventListener('pointerdown', function (e) {
      const p = pt(e);
      if (sm.gauge && Math.hypot(p[0] - sm.gx, p[1] - sm.gy) < 36) {
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
        const hG = sm.gauge && Math.hypot(p[0] - sm.gx, p[1] - sm.gy) < 36;
        const hR = sm.ruler && p[0] >= sm.rx && p[0] <= sm.rx + 36 && p[1] >= sm.ry - 30 * S - 12 && p[1] <= sm.ry + 20;
        cv.style.cursor = (hG || hR) ? 'grab' : 'default';
        return;
      }
      if (sm.drag[0] === 'g') {
        sm.gx = Math.max(35, Math.min(825, p[0]));
        sm.gy = Math.max(35, Math.min(525, p[1]));
      } else {
        sm.rx = Math.max(0, Math.min(824, p[0] - sm.drag[1]));
        sm.ry = Math.max(30 * S + 5, Math.min(545, p[1] - sm.drag[2]));
      }
    });

    const up = function () { sm.drag = null; cv.style.cursor = 'default'; };
    cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);

    /* ================= LKPD IMPLEMENTATION (1 TABEL TUNGGAL) ================= */
    function buildTableRows() {
      let html = '';
      for (let i = 1; i <= 5; i++) {
        html += '<tr data-row="' + i + '" data-checked="false">' +
          '<td style="font-weight:bold;color:#F5C84B;">' + i + '</td>' +
          '<td><input type="text" class="ps-inp-load" placeholder="Pilih Beban" style="color:#F5C84B;font-weight:600;"></td>' +
          '<td><input type="number" class="ps-inp-f1" placeholder="—"></td>' +
          '<td><input type="text" class="ps-inp-a1" value="10" readonly style="color:#BAC7D5;cursor:default;"></td>' +
          '<td><input type="number" class="ps-inp-a2" placeholder="—"></td>' +
          '<td><input type="number" step="1" class="ps-inp-f2c" placeholder="—" style="color:#EDEFF1;font-weight:bold;"></td>' +
          '<td><input type="text" class="ps-inp-f2s" placeholder="—" readonly style="color:#3DDC84;font-weight:bold;cursor:default;"></td>' +
          '<td class="ps-cell-status" style="border-right:none;font-weight:bold;font-size:14px;color:#BAC7D5;">—</td>' +
        '</tr>';
      }
      return html;
    }

    $('psLkpd').innerHTML = '<div class="menu-frame" style="width:100%; height:100%; position:relative; overflow:hidden;">' +
      '<div class="circuit"></div>' +
      '<div class="teori-wrap" style="display:flex; flex-direction:row; padding:0.8em 1.2em; gap:1em; max-width:1440px; margin:0 auto; align-items:flex-start; height:100%; box-sizing:border-box;">' +
        '<!-- KOLOM KIRI -->' +
        '<div style="flex:1.6; display:flex; flex-direction:column; gap:0.6em; height:100%; min-width:0;">' +
          '<div style="display:flex; gap:10px; z-index:2;">' +
            '<input type="text" id="psNamaInput" placeholder="Nama Lengkap" style="flex:2; background:#1C2228; border:1px solid #3A4451; border-radius:8px; padding:10px 15px; color:#EDEFF1; font-size:16px; outline:none;">' +
            '<input type="text" id="psKelasInput" placeholder="Kelas" style="flex:1; background:#1C2228; border:1px solid #3A4451; border-radius:8px; padding:10px 15px; color:#EDEFF1; font-size:16px; outline:none;">' +
          '</div>' +
          '<div class="modern-scroll" style="flex:1; overflow-y:auto; display:flex; flex-direction:column; gap:0.6em; padding-right:8px; z-index:2;">' +
            '<div style="background:#1C2228; border:1px solid #3A4451; border-radius:8px; padding:0.8em 1.2em; display:flex; flex-direction:column; gap:0.4em; z-index:2;">' +
              '<div style="color:#F5C84B; font-weight:bold; font-size:16px; letter-spacing:1px; text-transform:uppercase; border-bottom:1px dashed #3A4451; padding-bottom:5px; margin-bottom:2px;">&#127919; TUJUAN KEGIATAN</div>' +
              '<div style="font-size:18px; line-height:1.5; color:#EDEFF1; text-align:justify;">' +
                'Setelah melakukan virtual eksperimen dengan dongkrak hidrolik, murid dapat menyelidiki hubungan antara gaya tekan input (F₁), luas penampang piston (A₁ dan A₂), serta gaya angkat output (F₂) berdasarkan Hukum Pascal (F₁/A₁ = F₂/A₂) secara saintifik.' +
              '</div>' +
            '</div>' +
            '<div style="background:#151A20; border:1px solid #3A4451; border-radius:10px; display:flex; flex-direction:column; z-index:2;">' +
              '<div style="background:#1C2228; border-bottom:1px solid #3A4451; border-radius:10px 10px 0 0; padding:10px 14px; display:flex; align-items:center; justify-content:space-between;">' +
                '<div style="display:flex; align-items:center; gap:10px;">' +
                  '<div style="font-size:20px;">&#128202;</div>' +
                  '<div>' +
                    '<div style="color:#F5C84B; font-weight:bold; font-size:16px; letter-spacing:1px; text-transform:uppercase;">TABEL PENGAMATAN DONGKRAK HIDROLIK</div>' +
                    '<div style="color:#BAC7D5; font-size:13px;">Hukum Pascal: F₁ / A₁ = F₂ / A₂ &nbsp;|&nbsp; Piston Input A₁ = 10 cm²</div>' +
                  '</div>' +
                '</div>' +
              '</div>' +
              '<div style="display:flex; flex-direction:column; padding:0; overflow-x:auto;">' +
                '<table class="tbl-lkpd-ps">' +
                  '<thead style="background:#262D35; border-bottom:1px solid #3A4451;">' +
                    '<tr>' +
                      '<th style="color:#F5C84B; width:5%;">No</th>' +
                      '<th style="color:#F5C84B; width:20%;">Beban Diangkat</th>' +
                      '<th style="color:#EDEFF1; width:13%;">F₁ Input<br><span class="unit">(N)</span></th>' +
                      '<th style="color:#BAC7D5; width:11%;">A₁ Input<br><span class="unit">(cm²)</span></th>' +
                      '<th style="color:#F5C84B; width:13%;">A₂ Output<br><span class="unit">(cm²)</span></th>' +
                      '<th style="color:#EDEFF1; width:15%;">F₂ Hasil Ukur<br><span class="unit">(N)</span></th>' +
                      '<th style="color:#3DDC84; width:15%;">F₂ Sebenarnya<br><span class="unit">(N)</span></th>' +
                      '<th style="color:#EDEFF1; width:8%; border-right:none;">Status</th>' +
                    '</tr>' +
                  '</thead>' +
                  '<tbody id="ps-lkpd-tbody">' + buildTableRows() + '</tbody>' +
                '</table>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div style="display:flex; gap:10px; z-index:2; margin-top:2px;">' +
            '<button id="psCekJawabanBtn" style="flex:1; background:#B8860B; color:#fff; border:none; padding:10px; border-radius:6px; font-weight:bold; font-size:16px; cursor:pointer; box-shadow:0 4px 6px rgba(0,0,0,0.3); display:flex; justify-content:center; align-items:center; gap:8px;">&#10003; CEK JAWABAN</button>' +
            '<button id="psCetakLaporanBtn" style="flex:1; background:#1E5084; color:#fff; border:none; padding:10px; border-radius:6px; font-weight:bold; font-size:16px; cursor:pointer; box-shadow:0 4px 6px rgba(0,0,0,0.3); display:flex; justify-content:center; align-items:center; gap:8px;">&#128438; CETAK LAPORAN</button>' +
          '</div>' +
        '</div>' +
        '<!-- KOLOM KANAN -->' +
        '<div style="flex:1; display:flex; flex-direction:column; gap:0.8em; height:100%; min-width:0;">' +
          '<div style="display:flex; flex-wrap:nowrap; gap:10px; background:#1C2228; padding:8px; border-radius:10px; border:1px solid #3A4451; z-index:2;">' +
            '<button class="ps-lkpd-tab-btn active" id="ps-btn-analisis" style="flex:1; background:rgba(245,200,75,0.2); color:#F5C84B; border:1px solid rgba(245,200,75,0.8); box-shadow:0 0 10px rgba(245,200,75,0.3); padding:10px; border-radius:6px; font-weight:bold; cursor:pointer; font-size:18px; transition:0.2s; white-space:nowrap;">&#128200; Analisis</button>' +
            '<button class="ps-lkpd-tab-btn" id="ps-btn-evaluasi" style="flex:1; background:#262D35; color:#BAC7D5; border:1px solid #3A4451; padding:10px; border-radius:6px; font-weight:bold; cursor:pointer; font-size:18px; transition:0.2s; white-space:nowrap;">&#128394; Evaluasi</button>' +
            '<button class="ps-lkpd-tab-btn" id="ps-btn-kesimpulan" style="flex:1; background:#262D35; color:#BAC7D5; border:1px solid #3A4451; padding:10px; border-radius:6px; font-weight:bold; cursor:pointer; font-size:18px; transition:0.2s; white-space:nowrap;">&#128161; Kesimpulan</button>' +
          '</div>' +
          '<div style="flex:1; background:#1C2228; border:1px solid #3A4451; border-radius:10px; padding:1.2em; position:relative; overflow:hidden; z-index:2; display:flex; flex-direction:column;">' +
            '<!-- Panel Analisis -->' +
            '<div id="ps-panel-analisis" class="ps-lkpd-panel" style="display:flex; flex-direction:column; gap:0.8em; height:100%;">' +
              '<div style="display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.2); border-radius:8px; padding:10px 15px;">' +
                '<div style="color:#F5C84B; font-size:22px; font-weight:bold;">TUGAS ANALISIS</div>' +
                '<div style="color:#EDEFF1; font-size:22px; font-weight:bold;" id="psAnalisisSlideIndicator">Slide 1 / 5</div>' +
              '</div>' +
              '<div class="ps-slides-wrap" id="ps-analisis-slides-container" style="flex:1; display:flex; flex-direction:column; overflow:hidden;">' +
                '<div id="ps-analisis-slide-1" class="ps-slide-item" style="flex:1; display:flex; flex-direction:column;">' +
                  '<div style="font-size:19px; line-height:1.5; color:#EDEFF1; text-align:justify; margin-bottom:12px;">' +
                    '1. Berdasarkan data eksperimen, bagaimana pengaruh pembesaran luas penampang piston output (A₂) terhadap besar gaya angkat yang dihasilkan (F₂)? Jelaskan!' +
                  '</div>' +
                  '<textarea placeholder="Ketik jawaban di sini..." style="flex:1; width:100%; background:rgba(0,0,0,0.2); border:1px solid #3A4451; border-radius:8px; padding:14px; color:#EDEFF1; font-family:inherit; font-size:18px; text-align:justify; resize:none; outline:none; line-height:1.5;"></textarea>' +
                '</div>' +
                '<div id="ps-analisis-slide-2" class="ps-slide-item" style="flex:1; display:none; flex-direction:column;">' +
                  '<div style="font-size:19px; line-height:1.5; color:#EDEFF1; text-align:justify; margin-bottom:12px;">' +
                    '2. Mengapa dongkrak hidrolik mampu mengangkat beban ribuan kilogram hanya dengan gaya dorong tangan yang relatif kecil?' +
                  '</div>' +
                  '<textarea placeholder="Ketik jawaban di sini..." style="flex:1; width:100%; background:rgba(0,0,0,0.2); border:1px solid #3A4451; border-radius:8px; padding:14px; color:#EDEFF1; font-family:inherit; font-size:18px; text-align:justify; resize:none; outline:none; line-height:1.5;"></textarea>' +
                '</div>' +
                '<div id="ps-analisis-slide-3" class="ps-slide-item" style="flex:1; display:none; flex-direction:column;">' +
                  '<div style="font-size:19px; line-height:1.5; color:#EDEFF1; text-align:justify; margin-bottom:12px;">' +
                    '3. Jika gaya tekan F₁ tetap dan luas piston output A₂ diperbesar 4 kali lipat, apa yang terjadi pada gaya angkat F₂ dan jarak perpindahan naiknya piston h₂?' +
                  '</div>' +
                  '<textarea placeholder="Ketik jawaban di sini..." style="flex:1; width:100%; background:rgba(0,0,0,0.2); border:1px solid #3A4451; border-radius:8px; padding:14px; color:#EDEFF1; font-family:inherit; font-size:18px; text-align:justify; resize:none; outline:none; line-height:1.5;"></textarea>' +
                '</div>' +
                '<div id="ps-analisis-slide-4" class="ps-slide-item" style="flex:1; display:none; flex-direction:column;">' +
                  '<div style="font-size:19px; line-height:1.5; color:#EDEFF1; text-align:justify; margin-bottom:12px;">' +
                    '4. Mengapa pada sistem dongkrak hidrolik digunakan cairan oli dan bukan udara (gas)? Jelaskan ditinjau dari sifat kompresibilitas zat!' +
                  '</div>' +
                  '<textarea placeholder="Ketik jawaban di sini..." style="flex:1; width:100%; background:rgba(0,0,0,0.2); border:1px solid #3A4451; border-radius:8px; padding:14px; color:#EDEFF1; font-family:inherit; font-size:18px; text-align:justify; resize:none; outline:none; line-height:1.5;"></textarea>' +
                '</div>' +
                '<div id="ps-analisis-slide-5" class="ps-slide-item" style="flex:1; display:none; flex-direction:column;">' +
                  '<div style="font-size:19px; line-height:1.5; color:#EDEFF1; text-align:justify; margin-bottom:12px;">' +
                    '5. Turunkan persamaan F₁/A₁ = F₂/A₂ dari prinsip dasar kesetaraan tekanan fluida tertutup Hukum Pascal!' +
                  '</div>' +
                  '<textarea placeholder="Ketik penjelasan Anda di sini..." style="flex:1; width:100%; background:rgba(0,0,0,0.2); border:1px solid #3A4451; border-radius:8px; padding:14px; color:#EDEFF1; font-family:inherit; font-size:18px; text-align:justify; resize:none; outline:none; line-height:1.5;"></textarea>' +
                '</div>' +
              '</div>' +
              '<div id="ps-analisis-feedback" class="modern-scroll" style="display:none; flex:1; overflow-y:auto; padding:15px; background:rgba(61,220,132,0.1); border:1px solid #3DDC84; border-radius:8px; margin-top:5px;">' +
                '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px; gap:10px; flex-wrap:wrap;">' +
                  '<h3 style="color:#3DDC84; font-size:22px; margin:0; white-space:nowrap;">KUNCI JAWABAN &amp; PEMBAHASAN</h3>' +
                  '<button id="psBtnCekJawabanAnalisis" style="background:#1E5084; color:#fff; border:none; padding:8px 16px; border-radius:6px; font-weight:bold; font-size:16px; cursor:pointer;">Lihat Jawaban Saya</button>' +
                '</div>' +
                '<div style="font-size:18px; color:#EDEFF1; line-height:1.6; text-align:justify;">' +
                  '<b>1.</b> Semakin besar luas penampang piston output (A₂), maka gaya angkat F₂ semakin besar secara berbanding lurus, sesuai rumus F₂ = F₁ &times; (A₂ / A₁).<br><br>' +
                  '<b>2.</b> Karena rasio luas penampang A₂ jauh lebih besar dari A₁ (A₂ >> A₁). Tekanan fluida P yang dihasilkan oleh gaya kecil F₁ diteruskan merata ke seluruh fluida dan menekan penampang A₂ yang luas sehingga menghasilkan gaya dorong total F₂ yang berlipat ganda.<br><br>' +
                  '<b>3.</b> Gaya angkat F₂ akan bertambah 4 kali lipat, namun jarak perpindahan naiknya piston beban h₂ akan berkurang menjadi 1/4 kali dari semula, sesuai hukum kekekalan usaha dan energi (F₁ &middot; h₁ = F₂ &middot; h₂).<br><br>' +
                  '<b>4.</b> Cairan oli bersifat inkompresibel (hampir tidak dapat dimampatkan), sehingga tekanan diteruskan secara instan 100%. Jika menggunakan udara (gas), udara bersifat kompresibel sehingga gaya tekan hanya akan memampatkan volume gas tanpa mengangkat beban secara efektif.<br><br>' +
                  '<b>5.</b> Berdasarkan Hukum Pascal, tekanan fluida di ruang tertutup diteruskan sama besar ke segala arah (P₁ = P₂). Karena P = F / A, maka P₁ = F₁ / A₁ dan P₂ = F₂ / A₂. Menyamakan keduanya menghasilkan persamaan: <b>F₁ / A₁ = F₂ / A₂</b>.' +
                '</div>' +
              '</div>' +
              '<div id="ps-analisis-controls" style="display:flex; justify-content:space-between; margin-top:5px; align-items:center;">' +
                '<button id="psBtnAnalisisPrev" style="background:#262D35; color:#BAC7D5; border:1px solid #3A4451; padding:10px 20px; border-radius:6px; font-weight:bold; font-size:20px; cursor:pointer; opacity:0.5; pointer-events:none;">&#10094; Sebelumnya</button>' +
                '<button id="psBtnAnalisisNext" style="background:#1E5084; color:#fff; border:none; padding:10px 20px; border-radius:6px; font-weight:bold; font-size:20px; cursor:pointer;">Selanjutnya &#10095;</button>' +
                '<button id="psBtnAnalisisSelesai" style="display:none; background:#3DDC84; color:#0a1316; border:none; padding:10px 20px; border-radius:6px; font-weight:bold; font-size:20px; cursor:pointer;">SELESAI &#10003;</button>' +
              '</div>' +
            '</div>' +

            '<!-- Panel Evaluasi -->' +
            '<div id="ps-panel-evaluasi" class="ps-lkpd-panel" style="display:none; flex-direction:column; gap:0.8em; height:100%;">' +
              '<div style="display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.2); border-radius:8px; padding:10px 15px;">' +
                '<div style="color:#F5C84B; font-size:22px; font-weight:bold;">TUGAS EVALUASI</div>' +
                '<div style="color:#EDEFF1; font-size:22px; font-weight:bold;" id="psEvaluasiSlideIndicator">Slide 1 / 4</div>' +
              '</div>' +
              '<div class="ps-slides-wrap" id="ps-evaluasi-slides-container" style="flex:1; display:flex; flex-direction:column; overflow:hidden;">' +
                '<div id="ps-evaluasi-slide-1" class="ps-slide-item" style="flex:1; display:flex; flex-direction:column;">' +
                  '<div style="font-size:19px; line-height:1.5; color:#EDEFF1; text-align:justify; margin-bottom:15px;">' +
                    '1. Pada dongkrak hidrolik, semakin besar rasio perbandingan luas penampang piston output terhadap piston input (A₂ / A₁), semakin besar keuntungan mekanis pengangkatan beban.' +
                  '</div>' +
                  '<div style="display:flex; gap:10px; margin-top:20px;">' +
                    '<button class="ps-eval-btn" data-slide="1" data-ans="Benar" style="flex:1; background:#262D35; color:#EDEFF1; border:1px solid #3A4451; border-radius:8px; padding:15px; font-size:22px; font-weight:bold; cursor:pointer;">BENAR</button>' +
                    '<button class="ps-eval-btn" data-slide="1" data-ans="Salah" style="flex:1; background:#262D35; color:#EDEFF1; border:1px solid #3A4451; border-radius:8px; padding:15px; font-size:22px; font-weight:bold; cursor:pointer;">SALAH</button>' +
                  '</div>' +
                '</div>' +
                '<div id="ps-evaluasi-slide-2" class="ps-slide-item" style="flex:1; display:none; flex-direction:column;">' +
                  '<div style="font-size:19px; line-height:1.5; color:#EDEFF1; text-align:justify; margin-bottom:15px;">' +
                    '2. Hukum Pascal menyatakan bahwa tekanan zat cair hanya diteruskan ke arah vertikal tegak lurus ke bawah sesuai arah tarikan gravitasi bumi.' +
                  '</div>' +
                  '<div style="display:flex; gap:10px; margin-top:20px;">' +
                    '<button class="ps-eval-btn" data-slide="2" data-ans="Benar" style="flex:1; background:#262D35; color:#EDEFF1; border:1px solid #3A4451; border-radius:8px; padding:15px; font-size:22px; font-weight:bold; cursor:pointer;">BENAR</button>' +
                    '<button class="ps-eval-btn" data-slide="2" data-ans="Salah" style="flex:1; background:#262D35; color:#EDEFF1; border:1px solid #3A4451; border-radius:8px; padding:15px; font-size:22px; font-weight:bold; cursor:pointer;">SALAH</button>' +
                  '</div>' +
                '</div>' +
                '<div id="ps-evaluasi-slide-3" class="ps-slide-item" style="flex:1; display:none; flex-direction:column;">' +
                  '<div style="font-size:19px; line-height:1.5; color:#EDEFF1; text-align:justify; margin-bottom:10px;">' +
                    '3. Sebuah pompa hidrolik memiliki luas piston kecil A₁ = 10 cm² dan luas piston besar A₂ = 50 cm². Jika gaya tekan yang diberikan F₁ = 100 N, berapakah gaya angkat F₂ yang dihasilkan dalam satuan Newton? (Ketikkan angkanya saja)' +
                  '</div>' +
                  '<textarea placeholder="Ketik angka jawaban Anda di sini (misal: 500)..." style="flex:none; height:80px; min-height:80px; width:100%; margin-bottom:10px; background:rgba(0,0,0,0.2); border:1px solid #3A4451; border-radius:8px; padding:10px 15px; color:#EDEFF1; font-family:inherit; font-size:20px; text-align:justify; resize:none; outline:none; line-height:1.5;"></textarea>' +
                '</div>' +
                '<div id="ps-evaluasi-slide-4" class="ps-slide-item" style="flex:1; display:none; flex-direction:column;">' +
                  '<div style="font-size:19px; line-height:1.5; color:#EDEFF1; text-align:justify; margin-bottom:10px;">' +
                    '4. Pada sistem rem hidrolik mobil, luas piston pedal rem A₁ = 2 cm² dan luas silinder kaliper rem A₂ = 8 cm². Jika kaki pengemudi menekan pedal dengan gaya 200 N, berapakah gaya jepit rem F₂ pada piringan roda dalam satuan Newton? (Ketikkan angkanya saja)' +
                  '</div>' +
                  '<textarea placeholder="Ketik angka jawaban Anda di sini (misal: 800)..." style="flex:none; height:80px; min-height:80px; width:100%; margin-bottom:10px; background:rgba(0,0,0,0.2); border:1px solid #3A4451; border-radius:8px; padding:10px 15px; color:#EDEFF1; font-family:inherit; font-size:20px; text-align:justify; resize:none; outline:none; line-height:1.5;"></textarea>' +
                '</div>' +
              '</div>' +
              '<div id="ps-evaluasi-feedback" class="modern-scroll" style="display:none; flex:1; overflow-y:auto; padding:15px; background:rgba(61,220,132,0.1); border:1px solid #3DDC84; border-radius:8px; margin-top:5px;">' +
                '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px; gap:10px; flex-wrap:wrap;">' +
                  '<h3 style="color:#3DDC84; font-size:22px; margin:0; white-space:nowrap;">KUNCI JAWABAN &amp; PEMBAHASAN</h3>' +
                  '<button id="psBtnCekJawabanEvaluasi" style="background:#1E5084; color:#fff; border:none; padding:8px 16px; border-radius:6px; font-weight:bold; font-size:16px; cursor:pointer;">Cek Jawaban Saya</button>' +
                '</div>' +
                '<div style="font-size:18px; color:#EDEFF1; line-height:1.6; text-align:justify;">' +
                  '<b>1. BENAR</b>. Keuntungan mekanis KM = A₂ / A₁. Semakin besar rasio luas piston, semakin besar faktor pengali gaya angkat.<br><br>' +
                  '<b>2. SALAH</b>. Hukum Pascal menegaskan tekanan diteruskan <b>ke segala arah sama besar</b> secara isotropik, bukan hanya ke arah vertikal.<br><br>' +
                  '<b>3. 500 N</b>. F₂ = F₁ &times; (A₂ / A₁) = 100 &times; (50 / 10) = <b>500 N</b>.<br><br>' +
                  '<b>4. 800 N</b>. F₂ = F₁ &times; (A₂ / A₁) = 200 &times; (8 / 2) = 200 &times; 4 = <b>800 N</b>.' +
                '</div>' +
              '</div>' +
              '<div id="ps-evaluasi-controls" style="display:flex; justify-content:space-between; margin-top:5px; align-items:center;">' +
                '<button id="psBtnEvaluasiPrev" style="background:#262D35; color:#BAC7D5; border:1px solid #3A4451; padding:10px 20px; border-radius:6px; font-weight:bold; font-size:20px; cursor:pointer; opacity:0.5; pointer-events:none;">&#10094; Sebelumnya</button>' +
                '<button id="psBtnEvaluasiNext" style="background:#1E5084; color:#fff; border:none; padding:10px 20px; border-radius:6px; font-weight:bold; font-size:20px; cursor:pointer;">Selanjutnya &#10095;</button>' +
                '<button id="psBtnEvaluasiSelesai" style="display:none; background:#3DDC84; color:#0a1316; border:none; padding:10px 20px; border-radius:6px; font-weight:bold; font-size:20px; cursor:pointer;">SELESAI &#10003;</button>' +
              '</div>' +
            '</div>' +

            '<!-- Panel Kesimpulan -->' +
            '<div id="ps-panel-kesimpulan" class="ps-lkpd-panel" style="display:none; flex-direction:column; gap:0.8em; height:100%;">' +
              '<div style="font-size:19px; line-height:1.6; color:#EDEFF1; font-weight:bold; text-align:justify;">' +
                'Berdasarkan tujuan kegiatan dan percobaan virtual dongkrak hidrolik, tuliskan kesimpulan akhir Anda mengenai prinsip Hukum Pascal dan keuntungan mekanis sistem hidrolik!' +
              '</div>' +
              '<textarea id="psKesimpulanTextarea" placeholder="Ketik kesimpulan di sini..." style="flex:1; width:100%; background:rgba(0,0,0,0.2); border:1px solid #3A4451; border-radius:8px; padding:14px; color:#EDEFF1; font-family:inherit; font-size:18px; resize:none; outline:none; line-height:1.5;"></textarea>' +
              '<div style="display:flex; justify-content:flex-end; margin-top:5px;">' +
                '<button id="psBtnSimpanKesimpulan" style="background:#28a745; color:#fff; border:none; padding:10px 20px; border-radius:6px; font-weight:bold; font-size:18px; cursor:pointer; box-shadow:0 4px 6px rgba(0,0,0,0.3);">SIMPAN KESIMPULAN &#10003;</button>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +

        '<!-- Modals -->' +
        '<div id="psCustomAlertModal" style="display:none; position:absolute; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:10000; justify-content:center; align-items:center;">' +
          '<div style="background:#1C2228; border:2px solid #E06C75; border-radius:12px; padding:30px; width:90%; max-width:700px; text-align:center; box-shadow:0 10px 30px rgba(0,0,0,0.5);">' +
            '<div style="font-size:48px; color:#E06C75; margin-bottom:15px;">&#9888;</div>' +
            '<h3 style="color:#EDEFF1; font-size:24px; margin-bottom:15px;">Belum Lengkap!</h3>' +
            '<div id="psCustomAlertText" style="color:#BAC7D5; font-size:18px; line-height:1.5; margin-bottom:30px;"></div>' +
            '<button id="psBtnCloseAlert" style="background:#E06C75; color:#fff; border:none; padding:12px 25px; border-radius:8px; font-weight:bold; font-size:18px; cursor:pointer;">OK, Saya Lengkapi</button>' +
          '</div>' +
        '</div>' +

        '<div id="psSelesaiConfirmModal" style="display:none; position:absolute; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:9999; justify-content:center; align-items:center;">' +
          '<div style="background:#1C2228; border:2px solid #3A4451; border-radius:12px; padding:30px; width:80%; max-width:500px; text-align:center; box-shadow:0 10px 30px rgba(0,0,0,0.5);">' +
            '<div style="font-size:48px; color:#F5C84B; margin-bottom:15px;">&#9888;</div>' +
            '<h3 style="color:#EDEFF1; font-size:24px; margin-bottom:15px;">Konfirmasi Penyelesaian</h3>' +
            '<p style="color:#BAC7D5; font-size:18px; line-height:1.5; margin-bottom:30px;">Anda tidak dapat merevisi jawaban setelah menekan tombol selesaikan. Apakah Anda yakin ingin melanjutkan?</p>' +
            '<div style="display:flex; justify-content:center; gap:15px;">' +
              '<button id="psBtnBatalSelesai" style="background:#262D35; color:#BAC7D5; border:1px solid #3A4451; padding:12px 25px; border-radius:8px; font-weight:bold; font-size:18px; cursor:pointer;">Edit</button>' +
              '<button id="psBtnKonfirmasiSelesai" style="background:#3DDC84; color:#0a1316; border:none; padding:12px 25px; border-radius:8px; font-weight:bold; font-size:18px; cursor:pointer;">Selesaikan</button>' +
            '</div>' +
          '</div>' +
        '</div>' +

        '<div id="psSuccessAlertModal" style="display:none; position:absolute; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:10000; justify-content:center; align-items:center;">' +
          '<div style="background:#1C2228; border:2px solid #3DDC84; border-radius:12px; padding:30px; width:80%; max-width:400px; text-align:center; box-shadow:0 10px 30px rgba(0,0,0,0.5);">' +
            '<div style="font-size:48px; color:#3DDC84; margin-bottom:15px;">&#10003;</div>' +
            '<h3 style="color:#EDEFF1; font-size:24px; margin-bottom:15px;">Berhasil!</h3>' +
            '<p id="psSuccessAlertText" style="color:#BAC7D5; font-size:18px; line-height:1.5; margin-bottom:30px;"></p>' +
            '<button id="psBtnCloseSuccess" style="background:#3DDC84; color:#0a1316; border:none; padding:12px 25px; border-radius:8px; font-weight:bold; font-size:18px; cursor:pointer;">Tutup</button>' +
          '</div>' +
        '</div>' +

        '<div id="psConfirmCheckPopup" style="display:none; position:absolute; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index:9999; justify-content:center; align-items:center;">' +
          '<div style="background:#1C2228; border:2px solid #3A4451; border-radius:12px; padding:30px; width:80%; max-width:500px; text-align:center; box-shadow:0 10px 30px rgba(0,0,0,0.5);">' +
            '<div style="font-size:48px; color:#F5C84B; margin-bottom:15px;">&#9888;</div>' +
            '<h3 style="color:#EDEFF1; font-size:24px; margin-bottom:15px;">Konfirmasi Cek Jawaban</h3>' +
            '<p style="color:#BAC7D5; font-size:18px; line-height:1.5; margin-bottom:30px;">Apakah Anda yakin ingin mengecek jawaban?<br><br><span style="color:#F5C84B;">Nilai yang sudah dicek tidak bisa dirubah lagi.</span></p>' +
            '<div style="display:flex; justify-content:center; gap:15px;">' +
              '<button id="psBtnCancelCheck" style="background:#262D35; color:#BAC7D5; border:1px solid #3A4451; padding:12px 25px; border-radius:8px; font-weight:bold; font-size:18px; cursor:pointer;">EDIT</button>' +
              '<button id="psBtnConfirmCheck" style="background:#F5C84B; color:#0a1316; border:none; padding:12px 25px; border-radius:8px; font-weight:bold; font-size:18px; cursor:pointer;">TETAP CEK</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';

    /* ================= LOGIKA INTERAKTIF LKPD ================= */
    window.recordToLkpdPascal = function () {
      const msg = $('psRecordMsg');
      if (!sm.pressed) {
        if (msg) {
          msg.style.color = '#F5C84B';
          msg.textContent = 'Tekan piston terlebih dahulu sebelum mencatat data!';
          setTimeout(function () { if (msg) msg.textContent = ''; }, 3000);
        }
        return;
      }

      const inpF1 = $('psSimF1'), inpA2 = $('psSimA2'), inpF2 = $('psSimF2');
      const valF1 = inpF1 ? parseFloat(inpF1.value) : NaN;
      const valA2 = inpA2 ? parseFloat(inpA2.value) : NaN;
      const valF2 = inpF2 ? parseFloat(inpF2.value) : NaN;

      if (isNaN(valF1) || isNaN(valA2) || isNaN(valF2)) {
        if (msg) {
          msg.style.color = '#F5C84B';
          msg.textContent = 'Harap isi F₁, A₂, dan hitung F₂ pada lembar di atas!';
          setTimeout(function () { if (msg) msg.textContent = ''; }, 3000);
        }
        return;
      }

      const tbody = $('ps-lkpd-tbody');
      if (!tbody) return;

      const rows = tbody.querySelectorAll('tr');
      let targetRow = null;
      for (let r = 0; r < rows.length; r++) {
        const rowF2 = rows[r].querySelector('input.ps-inp-f2c');
        if (!rowF2 || rowF2.value.trim() === '') {
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

      const curLoad = LOADS[sm.loadIdx];
      const loadName = curLoad.icon + ' ' + curLoad.name;
      const f2Real = Math.round(sm.f1 * (curLoad.a2 / A1_VAL));

      targetRow.dataset.load = loadName;
      targetRow.dataset.f1 = valF1;
      targetRow.dataset.a1 = A1_VAL;
      targetRow.dataset.a2 = valA2;
      targetRow.dataset.f2c = valF2;
      targetRow.dataset.f2s = f2Real;
      targetRow.dataset.checked = 'false';

      const rowLoad = targetRow.querySelector('.ps-inp-load');
      const rowF1 = targetRow.querySelector('.ps-inp-f1');
      const rowA2 = targetRow.querySelector('.ps-inp-a2');
      const rowF2c = targetRow.querySelector('.ps-inp-f2c');
      const rowF2s = targetRow.querySelector('.ps-inp-f2s');
      const statusCell = targetRow.querySelector('.ps-cell-status');

      if (rowLoad) rowLoad.value = loadName;
      if (rowF1) rowF1.value = valF1;
      if (rowA2) rowA2.value = valA2;
      if (rowF2c) rowF2c.value = valF2;
      if (rowF2s) rowF2s.value = '';
      if (statusCell) statusCell.innerHTML = '—';

      if (msg) {
        msg.style.color = '#3DDC84';
        msg.textContent = '✓ Berhasil dicatat ke LKPD baris ' + targetRow.dataset.row + '!';
        setTimeout(function () { if (msg) msg.textContent = ''; }, 3500);
      }
      if (typeof window.playSfx === 'function') window.playSfx('sfxBintang');
    };

    // Tab Switch Kanan (Analisis / Evaluasi / Kesimpulan)
    function switchPsLkpd(tabId) {
      ['analisis', 'evaluasi', 'kesimpulan'].forEach(function (id) {
        const p = $('ps-panel-' + id);
        if (p) p.style.display = 'none';
        const b = $('ps-btn-' + id);
        if (b) {
          b.style.background = '#262D35';
          b.style.border = '1px solid #3A4451';
          b.style.boxShadow = 'none';
          b.style.color = '#BAC7D5';
        }
      });
      const targetP = $('ps-panel-' + tabId);
      if (targetP) targetP.style.display = 'flex';
      const targetB = $('ps-btn-' + tabId);
      if (targetB) {
        targetB.style.background = 'rgba(245,200,75,0.2)';
        targetB.style.border = '1px solid rgba(245,200,75,0.8)';
        targetB.style.boxShadow = '0 0 10px rgba(245,200,75,0.3)';
        targetB.style.color = '#F5C84B';
      }
    }

    const bAna = $('ps-btn-analisis'), bEva = $('ps-btn-evaluasi'), bKes = $('ps-btn-kesimpulan');
    if (bAna) bAna.onclick = function () { switchPsLkpd('analisis'); };
    if (bEva) bEva.onclick = function () { switchPsLkpd('evaluasi'); };
    if (bKes) bKes.onclick = function () { switchPsLkpd('kesimpulan'); };

    // Slide Analisis
    let currentPsAnalisis = 1;
    const totalPsAnalisis = 5;
    let isCheckingPsAnalisis = false;

    function goToPsAnalisisSlide(target) {
      const prev = $('ps-analisis-slide-' + currentPsAnalisis);
      if (prev) prev.style.display = 'none';
      currentPsAnalisis = target;
      const nxt = $('ps-analisis-slide-' + currentPsAnalisis);
      if (nxt) nxt.style.display = 'flex';
      const ind = $('psAnalisisSlideIndicator');
      if (ind) ind.innerText = 'Slide ' + currentPsAnalisis + ' / ' + totalPsAnalisis;

      const pBtn = $('psBtnAnalisisPrev');
      if (pBtn) {
        pBtn.style.opacity = currentPsAnalisis === 1 ? '0.5' : '1';
        pBtn.style.pointerEvents = currentPsAnalisis === 1 ? 'none' : 'auto';
      }
      const nBtn = $('psBtnAnalisisNext');
      const sBtn = $('psBtnAnalisisSelesai');
      if (currentPsAnalisis === totalPsAnalisis) {
        if (nBtn) nBtn.style.display = 'none';
        if (sBtn) {
          sBtn.style.display = 'block';
          sBtn.innerHTML = isCheckingPsAnalisis ? 'PEMBAHASAN &#8617;' : 'SELESAI &#10003;';
        }
      } else {
        if (nBtn) nBtn.style.display = 'block';
        if (sBtn) sBtn.style.display = 'none';
      }
    }

    const btnAnaPrev = $('psBtnAnalisisPrev'), btnAnaNext = $('psBtnAnalisisNext'), btnAnaSel = $('psBtnAnalisisSelesai');
    if (btnAnaPrev) btnAnaPrev.onclick = function () { if (currentPsAnalisis > 1) goToPsAnalisisSlide(currentPsAnalisis - 1); };
    if (btnAnaNext) btnAnaNext.onclick = function () { if (currentPsAnalisis < totalPsAnalisis) goToPsAnalisisSlide(currentPsAnalisis + 1); };
    if (btnAnaSel) btnAnaSel.onclick = function () {
      if (isCheckingPsAnalisis) {
        $('ps-analisis-slides-container').style.display = 'none';
        $('ps-analisis-controls').style.display = 'none';
        $('psAnalisisSlideIndicator').style.display = 'none';
        $('ps-analisis-feedback').style.display = 'block';
        return;
      }
      const tas = $('ps-analisis-slides-container').querySelectorAll('textarea');
      for (let i = 0; i < tas.length; i++) {
        if (tas[i].value.trim() === '') {
          showPsAlert('Harap jawab semua pertanyaan (Slide ' + (i + 1) + ' belum terjawab) sebelum menyelesaikan!');
          goToPsAnalisisSlide(i + 1);
          return;
        }
      }
      pendingPsSelesai = 'analisis';
      $('psSelesaiConfirmModal').style.display = 'flex';
    };

    const btnCekAna = $('psBtnCekJawabanAnalisis');
    if (btnCekAna) btnCekAna.onclick = function () {
      isCheckingPsAnalisis = true;
      const tas = $('ps-analisis-slides-container').querySelectorAll('textarea');
      tas.forEach(function (ta) { ta.setAttribute('readonly', true); });
      $('ps-analisis-feedback').style.display = 'none';
      $('ps-analisis-slides-container').style.display = 'flex';
      $('ps-analisis-controls').style.display = 'flex';
      $('psAnalisisSlideIndicator').style.display = 'block';
      goToPsAnalisisSlide(1);
    };

    // Slide Evaluasi
    let currentPsEvaluasi = 1;
    const totalPsEvaluasi = 4;
    let psEvaluasiAnswers = {};
    let isCheckingPsEvaluasi = false;

    $('psLkpd').addEventListener('click', function (e) {
      const b = e.target.closest('.ps-eval-btn');
      if (!b) return;
      const s = b.dataset.slide, a = b.dataset.ans;
      psEvaluasiAnswers[s] = a;
      const container = $('ps-evaluasi-slide-' + s);
      if (container) {
        container.querySelectorAll('.ps-eval-btn').forEach(function (btn) {
          btn.style.background = '#262D35';
          btn.style.border = '1px solid #3A4451';
          btn.style.color = '#EDEFF1';
        });
      }
      b.style.background = 'rgba(245,200,75,0.3)';
      b.style.border = '1px solid #F5C84B';
      b.style.color = '#fff';
    });

    function goToPsEvaluasiSlide(target) {
      const prev = $('ps-evaluasi-slide-' + currentPsEvaluasi);
      if (prev) prev.style.display = 'none';
      currentPsEvaluasi = target;
      const nxt = $('ps-evaluasi-slide-' + currentPsEvaluasi);
      if (nxt) nxt.style.display = 'flex';
      const ind = $('psEvaluasiSlideIndicator');
      if (ind) ind.innerText = 'Slide ' + currentPsEvaluasi + ' / ' + totalPsEvaluasi;

      const pBtn = $('psBtnEvaluasiPrev');
      if (pBtn) {
        pBtn.style.opacity = currentPsEvaluasi === 1 ? '0.5' : '1';
        pBtn.style.pointerEvents = currentPsEvaluasi === 1 ? 'none' : 'auto';
      }
      const nBtn = $('psBtnEvaluasiNext');
      const sBtn = $('psBtnEvaluasiSelesai');
      if (currentPsEvaluasi === totalPsEvaluasi) {
        if (nBtn) nBtn.style.display = 'none';
        if (sBtn) {
          sBtn.style.display = 'block';
          sBtn.innerHTML = isCheckingPsEvaluasi ? 'PEMBAHASAN &#8617;' : 'SELESAI &#10003;';
        }
      } else {
        if (nBtn) nBtn.style.display = 'block';
        if (sBtn) sBtn.style.display = 'none';
      }
    }

    const btnEvaPrev = $('psBtnEvaluasiPrev'), btnEvaNext = $('psBtnEvaluasiNext'), btnEvaSel = $('psBtnEvaluasiSelesai');
    if (btnEvaPrev) btnEvaPrev.onclick = function () { if (currentPsEvaluasi > 1) goToPsEvaluasiSlide(currentPsEvaluasi - 1); };
    if (btnEvaNext) btnEvaNext.onclick = function () { if (currentPsEvaluasi < totalPsEvaluasi) goToPsEvaluasiSlide(currentPsEvaluasi + 1); };
    if (btnEvaSel) btnEvaSel.onclick = function () {
      if (isCheckingPsEvaluasi) {
        $('ps-evaluasi-slides-container').style.display = 'none';
        $('ps-evaluasi-controls').style.display = 'none';
        $('psEvaluasiSlideIndicator').style.display = 'none';
        $('ps-evaluasi-feedback').style.display = 'block';
        return;
      }
      if (!psEvaluasiAnswers['1']) { showPsAlert('Soal nomor 1 belum dijawab!'); goToPsEvaluasiSlide(1); return; }
      if (!psEvaluasiAnswers['2']) { showPsAlert('Soal nomor 2 belum dijawab!'); goToPsEvaluasiSlide(2); return; }
      const tas = $('ps-evaluasi-slides-container').querySelectorAll('textarea');
      if (tas[0] && tas[0].value.trim() === '') { showPsAlert('Soal nomor 3 belum diisi!'); goToPsEvaluasiSlide(3); return; }
      if (tas[1] && tas[1].value.trim() === '') { showPsAlert('Soal nomor 4 belum diisi!'); goToPsEvaluasiSlide(4); return; }

      pendingPsSelesai = 'evaluasi';
      $('psSelesaiConfirmModal').style.display = 'flex';
    };

    const btnCekEva = $('psBtnCekJawabanEvaluasi');
    if (btnCekEva) btnCekEva.onclick = function () {
      isCheckingPsEvaluasi = true;
      const tas = $('ps-evaluasi-slides-container').querySelectorAll('textarea');
      tas.forEach(function (ta) { ta.setAttribute('readonly', true); });
      $('ps-evaluasi-feedback').style.display = 'none';
      $('ps-evaluasi-slides-container').style.display = 'flex';
      $('ps-evaluasi-controls').style.display = 'flex';
      $('psEvaluasiSlideIndicator').style.display = 'block';
      goToPsEvaluasiSlide(1);
    };

    // Modal Helpers
    let pendingPsSelesai = null;
    function showPsAlert(msg) {
      $('psCustomAlertText').innerHTML = msg;
      $('psCustomAlertModal').style.display = 'flex';
    }
    $('psBtnCloseAlert').onclick = function () { $('psCustomAlertModal').style.display = 'none'; };
    $('psBtnBatalSelesai').onclick = function () { $('psSelesaiConfirmModal').style.display = 'none'; };
    $('psBtnCloseSuccess').onclick = function () { $('psSuccessAlertModal').style.display = 'none'; };

    $('psBtnKonfirmasiSelesai').onclick = function () {
      $('psSelesaiConfirmModal').style.display = 'none';
      if (pendingPsSelesai === 'analisis') {
        $('ps-analisis-slides-container').style.display = 'none';
        $('ps-analisis-controls').style.display = 'none';
        $('psAnalisisSlideIndicator').style.display = 'none';
        $('ps-analisis-feedback').style.display = 'block';
      } else if (pendingPsSelesai === 'evaluasi') {
        $('ps-evaluasi-slides-container').style.display = 'none';
        $('ps-evaluasi-controls').style.display = 'none';
        $('psEvaluasiSlideIndicator').style.display = 'none';
        $('ps-evaluasi-feedback').style.display = 'block';
      }
      $('psSuccessAlertText').textContent = 'Jawaban tugas ' + pendingPsSelesai + ' berhasil disimpan!';
      $('psSuccessAlertModal').style.display = 'flex';
    };

    // Simpan Kesimpulan
    $('psBtnSimpanKesimpulan').onclick = function () {
      const val = $('psKesimpulanTextarea').value.trim();
      if (!val) {
        showPsAlert('Kesimpulan masih kosong! Harap tuliskan kesimpulan Anda.');
        return;
      }
      $('psSuccessAlertText').textContent = 'Kesimpulan berhasil disimpan ke dalam laporan LKPD!';
      $('psSuccessAlertModal').style.display = 'flex';
    };

    // Cek Jawaban Tabel
    $('psCekJawabanBtn').onclick = function () {
      const tbody = $('ps-lkpd-tbody');
      const rows = tbody.querySelectorAll('tr');
      let filledCount = 0;
      rows.forEach(function (r) {
        const inpF2c = r.querySelector('.ps-inp-f2c');
        if (inpF2c && inpF2c.value.trim() !== '') filledCount++;
      });
      if (filledCount === 0) {
        showPsAlert('Belum ada data pengamatan yang dicatat ke tabel LKPD!');
        return;
      }
      $('psConfirmCheckPopup').style.display = 'flex';
    };

    $('psBtnCancelCheck').onclick = function () { $('psConfirmCheckPopup').style.display = 'none'; };
    $('psBtnConfirmCheck').onclick = function () {
      $('psConfirmCheckPopup').style.display = 'none';
      const tbody = $('ps-lkpd-tbody');
      const rows = tbody.querySelectorAll('tr');
      rows.forEach(function (r) {
        const valF1 = parseFloat(r.querySelector('.ps-inp-f1').value) || 0;
        const valA2 = parseFloat(r.querySelector('.ps-inp-a2').value) || 0;
        const valF2c = parseFloat(r.querySelector('.ps-inp-f2c').value) || 0;
        const f2Real = Math.round(valF1 * (valA2 / A1_VAL));

        const inpF2s = r.querySelector('.ps-inp-f2s');
        const stCell = r.querySelector('.ps-cell-status');
        if (valF2c > 0) {
          inpF2s.value = f2Real;
          const diff = Math.abs(valF2c - f2Real);
          if (diff <= 5) {
            r.querySelector('.ps-inp-f2c').parentElement.classList.add('correct');
            stCell.innerHTML = '<span style="color:#3DDC84">✓ Benar</span>';
          } else if (diff <= 25) {
            r.querySelector('.ps-inp-f2c').parentElement.classList.add('close');
            stCell.innerHTML = '<span style="color:#FFB238">≈ Mendekati</span>';
          } else {
            r.querySelector('.ps-inp-f2c').parentElement.classList.add('wrong');
            stCell.innerHTML = '<span style="color:#E06C75">✗ Salah</span>';
          }
        }
      });
    };

    // Cetak Laporan
    $('psCetakLaporanBtn').onclick = function () {
      const nama = $('psNamaInput').value.trim();
      const kelas = $('psKelasInput').value.trim();
      if (!nama || !kelas) {
        showPsAlert('Harap isi Nama Lengkap dan Kelas terlebih dahulu di bagian atas!');
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
        '<thead><tr style="background:#f1f5f9;"><th>No</th><th>Beban Diangkat</th><th>F₁ Input (N)</th><th>A₁ Input (cm²)</th><th>A₂ Output (cm²)</th><th>F₂ Hasil Ukur (N)</th><th>F₂ Sebenarnya (N)</th></tr></thead><tbody>';
      const rows = $('ps-lkpd-tbody').querySelectorAll('tr');
      rows.forEach(function (r) {
        const load = r.querySelector('.ps-inp-load').value || '-';
        const f1 = r.querySelector('.ps-inp-f1').value || '-';
        const a1 = '10';
        const a2 = r.querySelector('.ps-inp-a2').value || '-';
        const f2c = r.querySelector('.ps-inp-f2c').value || '-';
        const f2s = r.querySelector('.ps-inp-f2s').value || (r.dataset.f2s || '-');
        tblHtml += '<tr><td style="text-align:center;">' + r.dataset.row + '</td><td>' + load + '</td><td style="text-align:center;">' + f1 + '</td><td style="text-align:center;">' + a1 + '</td><td style="text-align:center;">' + a2 + '</td><td style="text-align:center;">' + f2c + '</td><td style="text-align:center;">' + f2s + '</td></tr>';
      });
      tblHtml += '</tbody></table>';

      const kes = $('psKesimpulanTextarea').value.trim() || '-';

      pr.innerHTML = '<div class="print-page">' +
        '<div class="header-box"><h1>LAPORAN VIRTUAL EXPERIMENT</h1><h2>HUKUM PASCAL</h2><p>LABORATORIUM FISIKA DIGITAL &bull; DONGKRAK HIDROLIK</p></div>' +
        '<div class="identity-box"><div class="identity-item"><span class="identity-label">NAMA MURID</span><span class="identity-value">' + nama + '</span></div><div class="identity-item"><span class="identity-label">KELAS</span><span class="identity-value">' + kelas + '</span></div></div>' +
        '<div class="section"><div class="section-header color-1"><div class="section-num">01</div><div class="section-title">TUJUAN KEGIATAN</div></div><div class="content-box">Menyelidiki hubungan antara gaya tekan input (F₁), luas penampang piston (A₁ dan A₂), serta gaya angkat output (F₂) berdasarkan Hukum Pascal (F₁/A₁ = F₂/A₂).</div></div>' +
        '<div class="section"><div class="section-header color-2"><div class="section-num">02</div><div class="section-title">DATA HASIL PENGAMATAN</div></div><div>' + tblHtml + '</div></div>' +
        '<div class="section"><div class="section-header color-5"><div class="section-num">03</div><div class="section-title">KESIMPULAN</div></div><div class="content-box qa-box"><div class="qa-a">' + kes + '</div></div></div>' +
        '<div class="footer"><div>Virtual Experiment &mdash; Hukum Pascal<br><span style="color:#aaa;">' + timeStr + '</span></div><div class="signature">Laporan dibuat oleh:<br><div class="signature-name">' + nama + '</div><div>' + kelas + '</div><div>' + timeStr + '</div></div></div>' +
      '</div>';

      window.print();
    };
  }
});
