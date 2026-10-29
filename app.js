/* =========================================================
   ĐỎ LỬA · Bún Ban Mê — app
   ========================================================= */
(() => {
'use strict';

/* ---------------- DATA ---------------- */
// ings: e = emoji | s = hình vẽ (noodle, cube, tofu, cha, drop, seed) · h = ẩn khi đã vào tô (nước dùng, gia vị)
const DISHES = [
  { id:'bun-do', name:'Bún Đỏ Ban Mê', tag:'Đặc sản Buôn Ma Thuột', special:true, price:45000,
    broth:['#ff7a45','#d23a18','#7a150a'], noodle:'#e2603a', thick:true,
    lead:'Sắc đỏ của đất bazan, vị ngọt của cua đồng.',
    story:'Món quà chiều của phố núi Buôn Ma Thuột. Sợi bún to, dai, nhuộm đỏ từ hạt điều màu; nước dùng ngọt thanh từ cua đồng giã tay, thêm chả cua chiên vàng, trứng cút, huyết và lát chả. Ăn kèm rau muống bào, chấm muối ớt chanh — ăn một lần là nhớ cao nguyên.',
    taste:{Cay:3,Đậm:4,Thơm:5},
    ings:[{s:'noodle',n:'Bún sợi to đỏ'},{e:'🦀',n:'Chả cua đồng'},{e:'🥚',n:'Trứng cút'},{s:'cube',n:'Huyết'},{s:'cha',n:'Chả lụa'},{e:'🍅',n:'Cà chua'},{e:'🥬',n:'Rau muống bào'},{s:'seed',n:'Hạt điều màu',h:1},{s:'drop',n:'Nước dùng cua',h:1}],
    extras:['cha-cua','trung-cut','huyet','cha-lua','them-bun'], pair:'tra-atiso' },
  { id:'bun-rieu', name:'Bún Riêu Cua', tag:'Hương đồng nội', price:45000,
    broth:['#ff9a55','#de5a2c','#8c2a12'], noodle:'#f7f0e2',
    lead:'Riêu cua nổi bồng bềnh, chua thanh cà chua chín.',
    story:'Gạch cua đồng đánh thành những tảng riêu vàng óng nổi trên nồi nước dùng chua nhẹ vị cà chua. Thêm đậu hũ chiên, huyết, chấm chút mắm tôm — thanh mà đậm, mộc mạc như bữa cơm nhà.',
    taste:{Cay:2,Đậm:3,Thơm:4},
    ings:[{s:'noodle',n:'Bún tươi'},{e:'🦀',n:'Riêu cua'},{e:'🍅',n:'Cà chua'},{s:'tofu',n:'Đậu hũ chiên'},{s:'cube',n:'Huyết'},{e:'🌿',n:'Hành lá'},{e:'🥬',n:'Rau sống',h:1},{s:'drop',n:'Mắm tôm',c:'#7d5a6b',h:1}],
    extras:['rieu','dau-hu','huyet','cha-lua','them-bun'], pair:'tra-da' },
  { id:'bun-bo', name:'Bún Bò Huế', tag:'Khí chất cố đô', price:55000,
    broth:['#ff8a38','#cc4514','#6e1b06'], noodle:'#f5eddc', thick:true,
    lead:'Cay nồng sả ớt, đậm đà cố đô.',
    story:'Nước dùng hầm xương ống nhiều giờ, thơm sả, cay sa tế, đượm mắm ruốc. Bắp bò thái mỏng, giò heo mềm, chả Huế dai — một tô bún mang trọn khí chất cố đô.',
    taste:{Cay:5,Đậm:5,Thơm:4},
    ings:[{s:'noodle',n:'Bún sợi to'},{e:'🥩',n:'Bắp bò'},{e:'🍖',n:'Giò heo'},{e:'🍥',n:'Chả Huế'},{s:'cube',n:'Huyết'},{e:'🧅',n:'Hành tây'},{e:'🌶️',n:'Sa tế'},{e:'🌾',n:'Sả cây',h:1},{s:'drop',n:'Nước hầm xương',h:1}],
    extras:['bap-bo','gio-heo','cha-hue','huyet','them-bun'], pair:'tra-tac' },
  { id:'bun-gio', name:'Bún Giò Heo', tag:'Thanh ngọt nước xương', price:50000,
    broth:['#f7dc9a','#d9a94e','#8d6420'], noodle:'#faf5ea',
    lead:'Nước trong vắt, giò mềm, ngọt xương.',
    story:'Giò heo chọn phần nạc gân, ninh đến khi da mềm trong, thịt vừa dai. Nước dùng trong veo, ngọt xương, rắc hành lá, tiêu và chút ớt tươi — hiền lành mà ấm bụng.',
    taste:{Cay:1,Đậm:3,Thơm:4},
    ings:[{s:'noodle',n:'Bún tươi'},{e:'🍖',n:'Giò heo'},{s:'cha',n:'Chả lụa'},{e:'🧅',n:'Hành phi'},{e:'🌿',n:'Hành lá, ngò'},{e:'🌶️',n:'Ớt tươi'},{e:'🍋',n:'Chanh',h:1},{s:'drop',n:'Nước xương trong',h:1}],
    extras:['gio-heo','cha-lua','huyet','them-bun'], pair:'rau-ma' },
  { id:'bun-mam', name:'Bún Mắm', tag:'Đậm đà miền Tây', price:60000,
    broth:['#c08544','#7e4c20','#3e230d'], noodle:'#f7f0e2',
    lead:'Đậm hương mắm miền Tây, đầy ắp hải sản.',
    story:'Mắm cá linh, cá sặc nấu cùng sả tạo nên nồi nước dùng nâu sóng sánh, thơm nức. Tôm, mực, heo quay, cà tím; ăn kèm bông điên điển và rau đắng — đậm đà, say đắm.',
    taste:{Cay:2,Đậm:5,Thơm:5},
    ings:[{s:'noodle',n:'Bún tươi'},{e:'🦐',n:'Tôm'},{e:'🦑',n:'Mực'},{e:'🥓',n:'Heo quay'},{e:'🍆',n:'Cà tím'},{e:'🍥',n:'Chả cá'},{e:'🌼',n:'Bông điên điển'},{e:'🌾',n:'Sả',h:1},{s:'drop',n:'Nước mắm cá linh',h:1}],
    extras:['tom-muc','heo-quay','cha-ca','them-bun'], pair:'nuoc-mia' },
  { id:'bun-ca', name:'Bún Cá', tag:'Vàng ươm nghệ', price:50000,
    broth:['#ffcf70','#e8922c','#8a4d12'], noodle:'#faf5ea',
    lead:'Vàng ươm nghệ, thơm thì là, cá giòn dai.',
    story:'Cá lóc đồng chiên vàng, chả cá dai giòn, nước dùng nghệ vàng ươm chua dịu cà chua và thơm lừng thì là. Thanh mát, nhẹ bụng — hợp cho những ngày nắng gió.',
    taste:{Cay:2,Đậm:3,Thơm:5},
    ings:[{s:'noodle',n:'Bún tươi'},{e:'🐟',n:'Cá lóc chiên'},{e:'🍥',n:'Chả cá'},{e:'🍅',n:'Cà chua'},{e:'🌿',n:'Thì là'},{e:'🧅',n:'Hành'},{e:'🌶️',n:'Ớt',h:1},{s:'drop',n:'Nước dùng nghệ',h:1}],
    extras:['ca-chien','cha-ca','dau-hu','them-bun'], pair:'chanh-day' },
];

const EXTRAS = {
  'them-bun':{n:'Thêm bún',p:5000,e:'🍜'},
  'cha-cua':{n:'Chả cua đồng',p:15000,e:'🦀'},
  'trung-cut':{n:'Trứng cút (5 quả)',p:10000,e:'🥚'},
  'huyet':{n:'Huyết',p:5000,e:'🟥'},
  'rieu':{n:'Thêm riêu cua',p:15000,e:'🦀'},
  'dau-hu':{n:'Đậu hũ chiên',p:10000,e:'🧈'},
  'bap-bo':{n:'Bắp bò',p:25000,e:'🥩'},
  'gio-heo':{n:'Giò heo',p:20000,e:'🍖'},
  'cha-hue':{n:'Chả Huế',p:10000,e:'🍥'},
  'cha-lua':{n:'Chả lụa',p:10000,e:'🍥'},
  'tom-muc':{n:'Tôm & mực',p:25000,e:'🦐'},
  'heo-quay':{n:'Heo quay',p:20000,e:'🥓'},
  'cha-ca':{n:'Chả cá',p:15000,e:'🍥'},
  'ca-chien':{n:'Cá lóc chiên',p:20000,e:'🐟'},
};

const DRINKS = [
  {id:'tra-da',n:'Trà đá',d:'Mát lạnh, giải cay — chân ái của mọi tô bún.',p:5000,c:['#e0ac4a','#9a5b16'],ice:1,g:'🌿'},
  {id:'tra-tac',n:'Trà tắc',d:'Chua chua ngọt ngọt, thơm vỏ tắc tươi.',p:15000,c:['#f7cc4a','#d08a12'],ice:1,g:'🍊'},
  {id:'cafe-sua',n:'Cà phê sữa đá Ban Mê',d:'Robusta Buôn Ma Thuột phin chậm, sữa đặc béo.',p:25000,c:['#c99567','#6b3e1f'],ice:1,g:'☕',tag:'Đặc sản'},
  {id:'cafe-den',n:'Cà phê đen đá',d:'Đậm, đắng, thơm khói — tỉnh cả chiều.',p:20000,c:['#4a2a17','#1c0d06'],ice:1},
  {id:'bac-xiu',n:'Bạc xỉu',d:'Nhiều sữa, ít cà phê, ngọt dịu.',p:25000,c:['#efdcc2','#b98a5c'],ice:1},
  {id:'sinh-to-bo',n:'Sinh tố bơ Đắk Lắk',d:'Bơ sáp cao nguyên xay mịn, béo ngậy.',p:35000,c:['#cfe593','#7fa83a'],g:'🥑',tag:'Đặc sản',lv:82},
  {id:'chanh-day',n:'Nước chanh dây',d:'Chua thơm, mát lịm, hạt giòn tan.',p:25000,c:['#ffd65e','#f08c1a'],ice:1,g:'🍃'},
  {id:'rau-ma',n:'Rau má đậu xanh',d:'Thanh mát, bùi bùi đậu xanh.',p:20000,c:['#a5d46c','#4e8a2a'],ice:1,g:'🌿'},
  {id:'nuoc-mia',n:'Nước mía',d:'Ép tươi tại chỗ, thêm chút tắc.',p:15000,c:['#ece6a6','#b8b058'],ice:1,g:'🎋'},
  {id:'sam-bi-dao',n:'Sâm bí đao',d:'Nấu thủ công, ngọt thanh, mát gan.',p:15000,c:['#ddbd80','#9c7434'],ice:1},
  {id:'sua-dau',n:'Sữa đậu nành',d:'Nấu mỗi sáng, thơm lá dứa.',p:15000,c:['#f8efd8','#dcc89a'],g:'🫘',lv:78},
  {id:'tra-atiso',n:'Trà atiso đỏ',d:'Đỏ hồng như tô bún, chua dịu thanh nhiệt.',p:20000,c:['#e2354a','#7d0a1c'],ice:1,g:'🌺',tag:'Hợp tô đỏ'},
];

const SIDES = [
  {id:'quay',n:'Quẩy giòn',d:'2 cái',p:5000,e:'🥖'},
  {id:'rau',n:'Rau sống thêm',d:'Rau muống bào, giá, húng',p:5000,e:'🥬'},
  {id:'nem-nuong',n:'Nem nướng Ban Mê',d:'Đặc sản, kèm bánh tráng',p:45000,e:'🍢'},
  {id:'cha-gio',n:'Chả giò',d:'5 cuốn giòn rụm',p:30000,e:'🌯'},
  {id:'goi-cuon',n:'Gỏi cuốn tôm thịt',d:'2 cuốn, chấm tương',p:25000,e:'🥗'},
  {id:'nuoc-dung',n:'Chén nước dùng',d:'Chan thêm cho đã',p:10000,e:'🥣'},
];

/* ---------------- HELPERS ---------------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const fmt = n => n.toLocaleString('vi-VN') + 'đ';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;
const byId = (arr, id) => arr.find(x => x.id === id);
let UID = 0;

const qtyHTML = (kind, id, sm) =>
  `<div class="qty${sm ? ' sm' : ''}" data-kind="${kind}" data-id="${id}">
     <button type="button" data-act="dec" aria-label="Bớt">−</button>
     <output data-qty="${kind}:${id}">0</output>
     <button type="button" data-act="inc" aria-label="Thêm">+</button>
   </div>`;

const tasteHTML = t => `<div class="taste">${Object.entries(t).map(([k, v]) =>
  `<span>${k} <i>${[1,2,3,4,5].map(i => `<b class="${i <= v ? 'on' : ''}"></b>`).join('')}</i></span>`).join('')}</div>`;

/* =========================================================
   BOWL 4D
   ========================================================= */
const NOODLE_PATHS = [
  'M20 30 C 50 10, 80 45, 110 22 S 170 35, 185 20',
  'M15 22 C 45 40, 75 8, 105 30 S 160 12, 190 30',
  'M30 38 C 60 20, 95 44, 125 18 S 165 40, 180 34',
  'M40 14 C 70 32, 100 10, 140 30 S 170 20, 178 12',
  'M25 26 C 55 36, 90 14, 120 34 S 160 22, 186 26',
];

function ingFace(it, d) {
  if (it.s === 'noodle') {
    return `<svg class="sh-noodle" viewBox="0 0 60 60"><path d="M8 22c6-12 14-12 20 0s14 12 22 0M6 33c6-12 15-12 21 0s15 12 23 0M10 44c6-11 14-11 20 0s14 11 20 0" fill="none" stroke="${d.noodle}" stroke-width="${d.thick ? 5 : 3.6}" stroke-linecap="round"/></svg>`;
  }
  if (it.s) return `<i class="sh sh-${it.s}"${it.c ? ` style="--c:${it.c}"` : ''}></i>`;
  return `<span class="emo">${it.e}</span>`;
}

function bowlHTML(d, { bw, is, cls = '' }) {
  const u = ++UID;
  const s = bw / 240, rx = 106 * s, ry = 28 * s, cy = -bw * .23;
  const as = Math.min(1, (bw * .17) / is);
  const tops = d.ings.filter(i => !i.h && i.s !== 'noodle');
  let k = 0;
  const items = d.ings.map((it, i) => {
    const hide = it.h || it.s === 'noodle';
    let ax = 0, ay = cy;
    if (!hide) {
      const n = tops.length, r = .22 + .62 * Math.sqrt((k + .5) / n), a = k * 2.39996 + .8;
      ax = Math.cos(a) * r * rx * .92;
      ay = cy + Math.sin(a) * r * ry * .9 - is * as * .22;
      k++;
    }
    return { ay: hide ? -1e9 : ay, html:
      `<div class="ing${hide ? ' h' : ''}" style="--ax:${ax.toFixed(1)}px;--ay:${ay.toFixed(1)}px;--as:${hide ? .25 : as.toFixed(3)};--d:${i * 75}ms">${ingFace(it, d)}<span class="lbl">${it.n}</span></div>` };
  }).sort((a, b) => a.ay - b.ay).map(x => x.html).join('');

  const sparks = Array.from({ length: 9 }, (_, i) =>
    `<i class="spark" style="left:${12 + ((i * 37) % 76)}%;top:${18 + ((i * 53) % 62)}%;--d:${(i * .31).toFixed(2)}s"></i>`).join('');
  const sw = d.thick ? 5.2 : 3.4;
  const noodles = NOODLE_PATHS.map((p, i) =>
    `<path d="${p}" stroke="${d.noodle}" stroke-width="${sw}" opacity="${.75 + (i % 2) * .25}"/>`).join('');

  return `
  <div class="bowl-scene ${cls}" data-dish="${d.id}" style="--bw:${bw}px;--is:${is}px;--b1:${d.broth[0]};--b2:${d.broth[1]};--b3:${d.broth[2]}">
    <div class="scene3d">
      <div class="orbit"></div>
      <div class="bowl">
        <div class="bowl-shadow"></div>
        <svg viewBox="0 0 240 200" aria-hidden="true">
          <defs>
            <linearGradient id="bw${u}" x1="0" x2="1">
              <stop offset="0" stop-color="#120b09"/><stop offset=".32" stop-color="#3a2a24"/>
              <stop offset=".55" stop-color="#241712"/><stop offset="1" stop-color="#0a0605"/>
            </linearGradient>
            <radialGradient id="bi${u}" cx=".5" cy=".25" r=".75">
              <stop offset="0" stop-color="#2c1d18"/><stop offset="1" stop-color="#0a0605"/>
            </radialGradient>
            <linearGradient id="br${u}" x1="0" x2="1">
              <stop offset="0" stop-color="#8a6424"/><stop offset=".3" stop-color="#f3d28c"/>
              <stop offset=".6" stop-color="#b8862f"/><stop offset="1" stop-color="#f3d28c"/>
            </linearGradient>
          </defs>
          <path d="M86 168 L82 186 Q120 196 158 186 L154 168 Z" fill="#160e0b"/>
          <path d="M82 186 Q120 196 158 186" stroke="url(#br${u})" stroke-width="1.5" fill="none" opacity=".7"/>
          <path d="M0 40 A120 36 0 0 0 240 40 C240 112 186 168 120 172 C54 168 0 112 0 40 Z" fill="url(#bw${u})"/>
          <path d="M6 64 A116 34 0 0 0 234 64" stroke="#d7261e" stroke-width="5" fill="none" opacity=".75"/>
          <path d="M8 72 A114 33 0 0 0 232 72" stroke="url(#br${u})" stroke-width="1" fill="none" opacity=".8"/>
          <path d="M5 57 A117 34 0 0 0 235 57" stroke="url(#br${u})" stroke-width="1" fill="none" opacity=".8"/>
          <path d="M22 82 C 28 118 52 146 84 160" stroke="rgba(255,255,255,.14)" stroke-width="7" stroke-linecap="round" fill="none"/>
          <ellipse cx="120" cy="40" rx="120" ry="36" fill="url(#bi${u})"/>
          <ellipse cx="120" cy="40" rx="118.5" ry="35" fill="none" stroke="url(#br${u})" stroke-width="3"/>
        </svg>
        <div class="broth">
          <svg class="noodles" viewBox="0 0 200 50" preserveAspectRatio="none" fill="none" stroke-linecap="round">${noodles}</svg>
          ${sparks}<i class="sheen"></i>
        </div>
        <div class="pour"></div>
        <div class="ladle">🥄</div>
        <div class="steam"><span></span><span></span><span></span></div>
      </div>
      ${items}
    </div>
  </div>`;
}

function setExplode(sc) {
  const W = sc.clientWidth, H = sc.clientHeight;
  const is = parseFloat(sc.style.getPropertyValue('--is')) || 50;
  const items = $$('.ing', sc), n = items.length;
  const Rx = Math.max(W / 2 - Math.max(is * .55 + 30, W < 420 ? 62 : 0), 70);
  const Ry = Math.max(H / 2 - is * .55 - 20, 60);
  items.forEach((el, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
    el.style.setProperty('--ex', (Math.cos(a) * Rx).toFixed(1) + 'px');
    el.style.setProperty('--ey', (Math.sin(a) * Ry - 10).toFixed(1) + 'px');
    el.style.setProperty('--ez', (i % 2 ? 40 : 100) + 'px');
    el.style.setProperty('--er', (((i * 37) % 30) - 15) + 'deg');
  });
  sc.style.setProperty('--ox', (Rx * 2) + 'px');
  sc.style.setProperty('--oy', (Ry * 2) + 'px');
}

// Bung nguyên liệu ra → giữ → bay về tô, rót nước dùng → lóng lánh
async function playBowl(sc, hold = 2800) {
  if (!sc || sc._busy || REDUCE) return;
  sc._busy = true;
  setExplode(sc);
  sc.classList.remove('glisten', 'pouring');
  await sleep(40);
  sc.classList.add('exploded');
  await sleep(hold);
  sc.classList.remove('exploded');
  sc.classList.add('pouring');
  await sleep(1500);
  sc.classList.remove('pouring');
  sc.classList.add('glisten');
  sc._busy = false;
}

function makeInteractive(sc) {
  if (!matchMedia('(pointer:fine)').matches) return;
  const target = sc.closest('.stage, .slide-visual') || sc;
  target.addEventListener('pointermove', e => {
    const r = target.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    sc.style.setProperty('--ry', (x * 26).toFixed(1) + 'deg');
    sc.style.setProperty('--rx', (-y * 18 + 6).toFixed(1) + 'deg');
  });
  target.addEventListener('pointerleave', () => {
    sc.style.setProperty('--ry', '0deg');
    sc.style.setProperty('--rx', '0deg');
  });
}

/* =========================================================
   GLASS
   ========================================================= */
function glassHTML(dr) {
  return `<div class="glass-wrap" style="--l1:${dr.c[0]};--l2:${dr.c[1]};--lv:${dr.lv || 72}%">
    <div class="straw"></div>
    <div class="glass">
      <div class="liquid-fill"><i class="surface"></i>
        ${dr.ice ? '<b class="ice i1"></b><b class="ice i2"></b><b class="ice i3"></b>' : ''}
        <span class="bub b1"></span><span class="bub b2"></span><span class="bub b3"></span>
      </div>
      <i class="glass-shine"></i>
    </div>
    ${dr.g ? `<span class="garnish">${dr.g}</span>` : ''}
    <div class="glass-shadow"></div>
  </div>`;
}

/* =========================================================
   RENDER SECTIONS
   ========================================================= */
function renderMenu() {
  $('#dishGrid').innerHTML = DISHES.map((d, i) => {
    const f = d.special;
    return `
    <article class="card reveal tilt${f ? ' featured' : ''}" data-dish-card="${d.id}" style="--i:${i}">
      <div class="card-in">
        ${f ? '<div class="ribbon">ĐẶC SẢN BUÔN MÊ</div>' : ''}
        <div class="card-visual" data-open-book="${i}" title="Lật trang câu chuyện">${bowlHTML(d, { bw: f ? (innerWidth < 620 ? 250 : 360) : (innerWidth < 620 ? 128 : 170), is: f ? 54 : (innerWidth < 620 ? 28 : 34), cls: 'mini' })}</div>
        <div class="card-body">
          ${f ? '<span class="hot">🔥 Món làm nên tên quán</span>' : ''}
          <span class="card-tag">${d.tag}</span>
          <h3>${d.name}</h3>
          <p>${f ? d.story : d.lead}</p>
          ${tasteHTML(d.taste)}
          <button class="story-link" data-open-book="${i}">📖 Lật trang câu chuyện →</button>
          <div class="card-row"><span class="price">${fmt(d.price)}</span>${qtyHTML('dish', d.id)}</div>
        </div>
      </div>
    </article>`;
  }).join('');
}

function renderDrinks() {
  $('#drinkGrid').innerHTML = DRINKS.map((dr, i) => `
    <article class="drink reveal" data-drink-card="${dr.id}" style="--i:${i % 4};--l1:${dr.c[0]}">
      ${dr.tag ? `<span class="tag">${dr.tag}</span>` : ''}
      ${glassHTML(dr)}
      <h4>${dr.n}</h4>
      <p>${dr.d}</p>
      <div class="row"><span class="price">${fmt(dr.p)}</span>${qtyHTML('drink', dr.id, true)}</div>
    </article>`).join('');
}

function renderSides() {
  $('#sideGrid').innerHTML = SIDES.map((s, i) => `
    <article class="side reveal" data-side-card="${s.id}" style="--i:${i}">
      <span class="e">${s.e}</span>
      <h4>${s.n}</h4><small>${s.d}</small>
      <span class="price">${fmt(s.p)}</span>
      ${qtyHTML('side', s.id, true)}
    </article>`).join('');
}

function renderHero() {
  $('#heroBowl').innerHTML = bowlHTML(DISHES[0], { bw: innerWidth < 860 ? 210 : 330, is: innerWidth < 860 ? 38 : 58, cls: 'hero-bowl' });
  $('#heroTrio').innerHTML = ['bun-bo', 'bun-rieu', 'bun-mam']
    .map(id => bowlHTML(byId(DISHES, id), { bw: innerWidth < 860 ? 100 : 180, is: 36, cls: 'mini' })).join('');
  $('#heroGlass').innerHTML = glassHTML(byId(DRINKS, 'cafe-sua'));
  makeInteractive($('#heroBowl .bowl-scene'));
}

/* =========================================================
   CART
   ========================================================= */
const KEY = 'dolua-cart-v1';
let cart = { dishes: {}, drinks: {}, sides: {} };
try { const s = JSON.parse(localStorage.getItem(KEY)); if (s && s.dishes) cart = s; } catch (e) {}
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch (e) {} };

function getQty(kind, id) {
  if (kind === 'dish') return cart.dishes[id]?.qty || 0;
  if (kind === 'drink') return cart.drinks[id] || 0;
  if (kind === 'side') return cart.sides[id] || 0;
  if (kind === 'extra') { const [d, x] = id.split('|'); return cart.dishes[d]?.extras[x] || 0; }
  return 0;
}

function change(kind, id, delta, srcEl) {
  const before = getQty(kind, id);
  const next = Math.max(0, before + delta);
  if (next === before) return;
  let emoji = '🍜', name = '';
  if (kind === 'dish') {
    const d = byId(DISHES, id); name = d.name;
    if (!cart.dishes[id]) cart.dishes[id] = { qty: 0, extras: {} };
    cart.dishes[id].qty = next;
    if (!next) delete cart.dishes[id];
  } else if (kind === 'drink') {
    const dr = byId(DRINKS, id); name = dr.n; emoji = dr.g || '🥤';
    next ? cart.drinks[id] = next : delete cart.drinks[id];
  } else if (kind === 'side') {
    const s = byId(SIDES, id); name = s.n; emoji = s.e;
    next ? cart.sides[id] = next : delete cart.sides[id];
  } else if (kind === 'extra') {
    const [d, x] = id.split('|'); const ex = EXTRAS[x]; name = ex.n; emoji = ex.e;
    if (!cart.dishes[d]) return;
    next ? cart.dishes[d].extras[x] = next : delete cart.dishes[d].extras[x];
  }
  if (delta > 0 && srcEl) flyToCart(srcEl, emoji);
  if (delta > 0 && before === 0) toast(emoji, `Đã thêm <b>${name}</b>`);
  save();
  update(kind === 'dish' || kind === 'extra');
  $$(`[data-qty="${kind}:${id}"]`).forEach(o => { o.classList.remove('pop'); void o.offsetWidth; o.classList.add('pop'); });
}

const dishLineTotal = (id) => {
  const c = cart.dishes[id], d = byId(DISHES, id);
  return c.qty * d.price + Object.entries(c.extras).reduce((t, [x, q]) => t + EXTRAS[x].p * q, 0);
};

function totals() {
  let bowls = 0, drinks = 0, adds = 0, sum = 0;
  for (const id in cart.dishes) {
    bowls += cart.dishes[id].qty;
    adds += Object.values(cart.dishes[id].extras).reduce((a, b) => a + b, 0);
    sum += dishLineTotal(id);
  }
  for (const id in cart.drinks) { drinks += cart.drinks[id]; sum += cart.drinks[id] * byId(DRINKS, id).p; }
  for (const id in cart.sides) { adds += cart.sides[id]; sum += cart.sides[id] * byId(SIDES, id).p; }
  return { bowls, drinks, adds, sum, count: bowls + drinks + adds };
}

function update(rerenderSelected = true) {
  $$('[data-qty]').forEach(o => {
    const [kind, id] = o.dataset.qty.split(':');
    const q = getQty(kind, id);
    o.textContent = q;
    o.parentElement.classList.toggle('has', q > 0);
  });
  $$('[data-dish-card]').forEach(c => c.classList.toggle('selected', !!cart.dishes[c.dataset.dishCard]));
  $$('[data-drink-card]').forEach(c => c.classList.toggle('selected', !!cart.drinks[c.dataset.drinkCard]));
  $$('[data-side-card]').forEach(c => c.classList.toggle('selected', !!cart.sides[c.dataset.sideCard]));

  const t = totals();
  const badge = $('#cartBadge');
  badge.textContent = t.count; badge.classList.toggle('on', t.count > 0);
  $('#bbTotal').textContent = fmt(t.sum);
  $('#bbItems').innerHTML = `<span>🍜 <b>${t.bowls}</b> tô</span><span>🥤 <b>${t.drinks}</b> ly</span><span>➕ <b>${t.adds}</b> món thêm</span>`;
  $('#bookbar').classList.toggle('on', t.count > 0);
  if (rerenderSelected) renderSelected();
  renderTicket(t);
}

function renderSelected() {
  const ids = Object.keys(cart.dishes);
  const box = $('#selectedList');
  const prev = new Set($$('.sel-card', box).map(c => c.dataset.sel));
  if (!ids.length) {
    box.innerHTML = `<div class="empty">${bowlHTML(DISHES[0], { bw: 150, is: 30, cls: 'mini' })}
      <b>Bạn chưa chọn tô bún nào</b>Chọn bún ở bước 1 — phần ăn thêm cho từng tô sẽ hiện ở đây.
      <br><a class="btn btn-red" href="#menu">Chọn bún ngay</a></div>`;
    return;
  }
  box.innerHTML = ids.map(id => {
    const d = byId(DISHES, id), c = cart.dishes[id];
    const chips = d.extras.map(x => {
      const ex = EXTRAS[x], q = c.extras[x] || 0;
      return `<div class="chip${q ? ' on' : ''}"><span class="e">${ex.e}</span><span>${ex.n}<br><small>+${fmt(ex.p)}</small></span>${qtyHTML('extra', id + '|' + x, true)}</div>`;
    }).join('');
    return `<div class="sel-card" data-sel="${id}" style="${prev.has(id) ? 'animation:none' : ''}">
      <div class="sel-head">
        <div class="mini">${bowlHTML(d, { bw: 88, is: 22, cls: 'mini' })}</div>
        <div><h4>${d.name}</h4><span class="meta">${fmt(d.price)} / tô</span></div>
        ${qtyHTML('dish', id)}
      </div>
      <div class="sel-extras"><p>Ăn thêm cho ${d.name}</p><div class="chips">${chips}</div></div>
      <div class="sel-total"><span>Thành tiền</span><b>${fmt(dishLineTotal(id))}</b></div>
    </div>`;
  }).join('');
  update(false);
}

function renderTicket(t) {
  const L = [];
  const ids = Object.keys(cart.dishes);
  if (ids.length) {
    L.push('<div class="t-group">Món nước</div>');
    ids.forEach(id => {
      const d = byId(DISHES, id), c = cart.dishes[id];
      const ex = Object.entries(c.extras).map(([x, q]) => `${EXTRAS[x].n} ×${q}`).join(', ');
      L.push(`<div class="t-line"><span>${c.qty} × ${d.name}${ex ? `<small>+ ${ex}</small>` : ''}</span><b>${fmt(dishLineTotal(id))}</b></div>`);
    });
  }
  const dk = Object.keys(cart.drinks);
  if (dk.length) {
    L.push('<div class="t-group">Thức uống</div>');
    dk.forEach(id => { const dr = byId(DRINKS, id), q = cart.drinks[id]; L.push(`<div class="t-line"><span>${q} × ${dr.n}</span><b>${fmt(q * dr.p)}</b></div>`); });
  }
  const sk = Object.keys(cart.sides);
  if (sk.length) {
    L.push('<div class="t-group">Ăn kèm</div>');
    sk.forEach(id => { const s = byId(SIDES, id), q = cart.sides[id]; L.push(`<div class="t-line"><span>${q} × ${s.n}</span><b>${fmt(q * s.p)}</b></div>`); });
  }
  $('#ticketBody').innerHTML = L.length ? L.join('') : '<div class="t-empty">Vé đang trống — chọn một tô bún nhé!</div>';
  $('#ticketTotal').textContent = fmt(t.sum);
}

/* ---------------- fly + toast ---------------- */
function flyToCart(src, emoji) {
  const cartBtn = $('#cartBtn');
  const r = src.getBoundingClientRect(), c = cartBtn.getBoundingClientRect();
  if (REDUCE || !r.width) return;
  const el = document.createElement('div');
  el.className = 'fly'; el.textContent = emoji;
  const x0 = r.left + r.width / 2, y0 = r.top + r.height / 2;
  el.style.left = x0 + 'px'; el.style.top = y0 + 'px';
  document.body.appendChild(el);
  const dx = c.left + c.width / 2 - x0, dy = c.top + c.height / 2 - y0;
  el.animate([
    { transform: 'translate(-50%,-50%) scale(.6)', opacity: 0 },
    { transform: `translate(calc(-50% + ${dx * .35}px), calc(-50% + ${dy * .35 - 140}px)) scale(1.5) rotate(-20deg)`, opacity: 1, offset: .4 },
    { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(.35) rotate(20deg)`, opacity: .4 },
  ], { duration: 900, easing: 'cubic-bezier(.45,0,.4,1)' }).onfinish = () => {
    el.remove();
    cartBtn.classList.remove('bump'); void cartBtn.offsetWidth; cartBtn.classList.add('bump');
  };
}

function toast(icon, html) {
  const box = $('#toasts');
  const t = document.createElement('div');
  t.className = 'toast'; t.innerHTML = `<i>${icon}</i><span>${html}</span>`;
  box.appendChild(t);
  while (box.children.length > 3) box.firstChild.remove();
  setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 400); }, 2200);
}

/* =========================================================
   FLIP BOOK
   ========================================================= */
const book = $('#book'), modal = $('#bookModal');
let leaves = [], cur = 0, single = false, flipping = false;

function pagesList() {
  const P = [{ t: 'brand' }, { t: 'toc' }];
  DISHES.forEach((_, k) => { P.push({ t: 'text', k }); P.push({ t: 'bowl', k }); });
  P.push({ t: 'end' }, { t: 'back' });
  return P; // 16 trang: 0 brand · 1 toc · 2..13 món · 14 end · 15 bìa sau
}

function pageHTML(p, side, no) {
  const lr = side === 'l' ? 'l' : 'r';
  const corner = `<span class="corner" data-turn="${lr === 'r' ? 'next' : 'prev'}"></span>`;
  const pno = no ? `<span class="pno">— ${no} —</span>` : '';
  if (p.t === 'brand') return `<div class="page ${lr}"><div class="pg-brand">
      <svg class="flame" viewBox="0 0 24 24"><path d="M12 1.5c1.2 4.3 5.6 6.4 5.6 11.8a5.6 5.6 0 0 1-11.2 0c0-2.3 1.1-3.9 2.3-5 0 2.2 1 3.4 2.3 3.4 0-3.4-1.3-6.6 1-10.2z"/></svg>
      <h3>ĐỎ LỬA</h3><span class="sub">BÚN PHỐ NÚI BAN MÊ</span>
      <p class="slogan">“Đỏ từ sợi bún – Đậm tình cao nguyên”</p>
      <div class="ornament"></div>
      <p>Sáu tô bún, sáu câu chuyện. Lật từng trang để xem nguyên liệu tách lớp, rồi về lại trong tô nước dùng nóng hổi.</p>
    </div>${single ? corner : ''}</div>`;
  if (p.t === 'toc') return `<div class="page ${lr}">
      <span class="pg-kicker">Mục lục</span><h3 class="pg-title">Thực đơn món nước</h3>
      <ol class="toc">${DISHES.map((d, k) => `<li class="${d.special ? 'special' : ''}"><button type="button" data-goto="${k}">
        <span class="n">0${k + 1}</span><span class="t">${d.name}${d.special ? ' 🔥' : ''}<small>${d.lead}</small></span><span class="dots"></span><span class="p">${2 + k * 2}</span></button></li>`).join('')}</ol>
      ${pno}${corner}</div>`;
  if (p.t === 'text') {
    const d = DISHES[p.k];
    return `<div class="page ${lr} text-page">
      <span class="big-no">0${p.k + 1}</span>
      ${d.special ? '<span class="pg-special">🔥 ĐẶC SẢN BUÔN MÊ</span>' : `<span class="pg-kicker">${d.tag}</span>`}
      <h3>${d.name}</h3>
      <p class="pg-lead">${d.lead}</p>
      <p class="pg-story">${d.story}</p>
      <h5>Nguyên liệu</h5>
      <ul class="pg-ings">${d.ings.map(it => `<li>${it.e ? `<i>${it.e}</i>` : `<span class="dot" style="background:${it.s === 'noodle' ? d.noodle : it.s === 'cube' ? '#6d0f0f' : it.s === 'tofu' ? '#e0a040' : it.s === 'seed' ? '#c3220f' : it.s === 'cha' ? '#e9bfae' : it.c || d.broth[1]}"></span>`}${it.n}</li>`).join('')}</ul>
      ${tasteHTML(d.taste)}
      <div class="pg-pair">${glassHTML(byId(DRINKS, d.pair))}<span>Uống kèm hợp nhất: <b>${byId(DRINKS, d.pair).n}</b></span></div>
      <div class="pg-buy"><span class="price">${fmt(d.price)}</span>${qtyHTML('dish', d.id)}</div>
      ${pno}${corner}</div>`;
  }
  if (p.t === 'bowl') {
    const d = DISHES[p.k];
    return `<div class="page ${lr} dark bowl-page">
      <header><b>${d.name}</b><span class="badge4d"><i></i>ẢNH 4D</span></header>
      <div class="stage" data-k="${p.k}"></div>
      <footer><button type="button" class="replay" data-replay>↻ Tách lớp nguyên liệu</button><small>${matchMedia('(pointer:fine)').matches ? 'Di chuột để xoay tô' : 'Chạm ↻ để xem lại'}</small></footer>
      ${pno}${corner}</div>`;
  }
  if (p.t === 'end') return `<div class="page ${lr} end-page">
      <div class="glasses">${['tra-da', 'cafe-sua', 'tra-atiso'].map(id => glassHTML(byId(DRINKS, id))).join('')}</div>
      <span class="pg-kicker">Hết phần món nước</span>
      <h3>Giờ thì… làm một ly cho mát nhé!</h3>
      <p>Gấp sách lại, mình đưa bạn sang quầy thức uống — 12 món giải nhiệt đang chờ.</p>
      <button class="btn btn-red" type="button" data-close-book>Sang thức uống →</button>
      ${pno}${corner}</div>`;
  return `<div class="page ${lr} leather">
      <svg class="flame" viewBox="0 0 24 24"><path d="M12 1.5c1.2 4.3 5.6 6.4 5.6 11.8a5.6 5.6 0 0 1-11.2 0c0-2.3 1.1-3.9 2.3-5 0 2.2 1 3.4 2.3 3.4 0-3.4-1.3-6.6 1-10.2z"/></svg>
      <b>ĐỎ LỬA</b><span class="slogan">Hẹn gặp lại bên tô bún đỏ</span></div>`;
}

function buildBook() {
  single = matchMedia('(max-width: 860px)').matches;
  book.className = 'book no-anim' + (single ? ' single' : '');
  const P = pagesList();
  let html = '', L = [];
  if (single) {
    html += `<div class="page-static right">${pageHTML(P[15], 'r')}</div>`;
    L = P.slice(0, 15).map((p, i) => [pageHTML(p, 'r', i || ''), null]);
  } else {
    html += `<div class="page-static left">${pageHTML(P[0], 'l')}</div><div class="page-static right">${pageHTML(P[15], 'r')}</div>`;
    for (let i = 1; i < 15; i += 2) L.push([pageHTML(P[i], 'r', i), pageHTML(P[i + 1], 'l', i + 1)]);
  }
  html += L.map(([f, b], i) => `<div class="leaf" data-i="${i}"><div class="face front">${f}</div><div class="face back">${b || '<div class="page blank"></div>'}</div></div>`).join('');
  book.innerHTML = html;
  leaves = $$('.leaf', book);

  const bw = single ? Math.min(innerWidth * .5, 210) : Math.min(innerWidth * .19, 250);
  $$('.stage', book).forEach(st => {
    st.innerHTML = bowlHTML(DISHES[+st.dataset.k], { bw, is: single ? 40 : 50 });
    makeInteractive(st.firstElementChild);
  });
  update(false);
  applyLeaves();
}

function applyLeaves() {
  const n = leaves.length;
  leaves.forEach((el, i) => {
    const f = i < cur;
    el.classList.toggle('flipped', f);
    el.classList.remove('turning');
    el.style.zIndex = f ? i + 1 : n * 2 - i;
  });
  const total = leaves.length;
  $('#bookPrev').disabled = cur === 0;
  $('#bookNext').disabled = cur >= total;
  $('#bookPage').textContent = single ? `Trang ${cur + 1} / 16` : `Trang ${cur * 2 + 1}–${cur * 2 + 2} / 16`;
  $('#bookBar').style.width = (cur / total * 100) + '%';
}

function visibleBowlScenes() {
  // trang đang mở: double → trái 2cur, phải 2cur+1 · single → cur
  const idx = single ? [cur] : [cur * 2, cur * 2 + 1];
  return idx.filter(i => i >= 3 && i <= 13 && i % 2 === 1)
    .map(i => $(`.stage[data-k="${(i - 3) / 2}"] .bowl-scene`, book)).filter(Boolean);
}

function onSettled() {
  flipping = false;
  applyLeaves();
  visibleBowlScenes().forEach(sc => { sc.classList.remove('glisten'); setTimeout(() => playBowl(sc), 350); });
}

function goTo(target) {
  target = Math.max(0, Math.min(leaves.length, target));
  if (target === cur || flipping) return;
  flipping = true;
  book.classList.remove('no-anim');
  const fwd = target > cur;
  const steps = Math.abs(target - cur);
  const gap = steps > 1 ? 140 : 0;
  for (let s = 0; s < steps; s++) {
    const i = fwd ? cur + s : cur - 1 - s;
    setTimeout(() => {
      const el = leaves[i];
      el.style.zIndex = 500 + s;
      el.classList.add('turning');
      el.classList.toggle('flipped', fwd);
    }, s * gap);
  }
  cur = target;
  setTimeout(onSettled, (steps - 1) * gap + 1150);
}

function openBook(dishIndex) {
  if (!leaves.length) buildBook();
  book.classList.add('no-anim');
  cur = dishIndex == null || dishIndex === '' ? 0 : (single ? 2 * +dishIndex + 2 : +dishIndex + 1);
  applyLeaves();
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('lock');
  setTimeout(onSettled, 700);
}

// Đóng sách → “thoát ra là vô nước”: sóng nước dâng lên rồi mở ra phần thức uống
function closeBook() {
  if (!modal.classList.contains('open')) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('lock');
  const liq = $('#liquid');
  if (REDUCE) { $('#drinks').scrollIntoView(); return; }
  liq.classList.remove('leave'); liq.classList.add('rise');
  setTimeout(() => {
    window.scrollTo({ top: $('#drinks').getBoundingClientRect().top + scrollY - 40, behavior: 'instant' });
    liq.classList.remove('rise'); liq.classList.add('leave');
    setTimeout(() => liq.classList.remove('leave'), 950);
  }, 800);
}

$('#bookNext').onclick = () => goTo(cur + 1);
$('#bookPrev').onclick = () => goTo(cur - 1);
$('#bookClose').onclick = closeBook;
addEventListener('keydown', e => {
  if (!modal.classList.contains('open')) return;
  if (e.key === 'ArrowRight') goTo(cur + 1);
  if (e.key === 'ArrowLeft') goTo(cur - 1);
  if (e.key === 'Escape') closeBook();
});
let tx0 = null;
book.addEventListener('touchstart', e => { tx0 = e.touches[0].clientX; }, { passive: true });
book.addEventListener('touchend', e => {
  if (tx0 == null) return;
  const dx = e.changedTouches[0].clientX - tx0; tx0 = null;
  if (Math.abs(dx) > 50) goTo(cur + (dx < 0 ? 1 : -1));
});
let rb;
addEventListener('resize', () => {
  clearTimeout(rb);
  rb = setTimeout(() => {
    const s = matchMedia('(max-width: 860px)').matches;
    if (s !== single && leaves.length) { const open = modal.classList.contains('open'); leaves = []; buildBook(); if (open) openBook(0); }
  }, 250);
});

/* =========================================================
   GLOBAL CLICKS
   ========================================================= */
document.addEventListener('click', e => {
  const q = e.target.closest('.qty button');
  if (q) {
    const box = q.closest('.qty');
    change(box.dataset.kind, box.dataset.id, q.dataset.act === 'inc' ? 1 : -1, q);
    return;
  }
  const quick = e.target.closest('[data-quick-add]');
  if (quick) { change('dish', quick.dataset.quickAdd, 1, quick); return; }
  const ob = e.target.closest('[data-open-book]');
  if (ob) { e.preventDefault(); document.body.classList.remove('nav-open'); openBook(ob.dataset.openBook); return; }
  const gt = e.target.closest('[data-goto]');
  if (gt) { const k = +gt.dataset.goto; goTo(single ? 2 * k + 2 : k + 1); return; }
  const turn = e.target.closest('[data-turn]');
  if (turn) { goTo(cur + (turn.dataset.turn === 'next' ? 1 : -1)); return; }
  const rp = e.target.closest('[data-replay]');
  if (rp) { playBowl($('.bowl-scene', rp.closest('.bowl-page'))); return; }
  if (e.target.closest('[data-close-book]')) { closeBook(); return; }
  if (e.target.closest('.nav a')) document.body.classList.remove('nav-open');
});
$('.closed-book').addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openBook(); } });
$('#burger').onclick = () => document.body.classList.toggle('nav-open');
$('#cartBtn').onclick = () => $('#extras').scrollIntoView({ behavior: 'smooth' });

/* =========================================================
   BOOKING BAR + STEPS
   ========================================================= */
const STEPS = ['menu', 'drinks', 'extras', 'checkout'];
const STEP_LABEL = { menu: 'Chọn bún', drinks: 'Thức uống', extras: 'Ăn thêm', checkout: 'Xác nhận' };
let curStep = 'menu';
function trackStep() {
  const mid = innerHeight * .45;
  let s = 'menu';
  STEPS.forEach(id => { if ($('#' + id).getBoundingClientRect().top < mid) s = id; });
  curStep = s;
  const ci = STEPS.indexOf(s);
  $$('#bbSteps li').forEach((li, i) => { li.classList.toggle('on', i === ci); li.classList.toggle('done', i < ci); });
  $('#bbNext').innerHTML = ci < 3 ? `${STEP_LABEL[STEPS[ci + 1]]} ›` : 'Đặt món 🔥';
}
$('#bbNext').onclick = () => {
  const ci = STEPS.indexOf(curStep);
  if (ci < 3) $('#' + STEPS[ci + 1]).scrollIntoView({ behavior: 'smooth' });
  else $('#orderForm').requestSubmit();
};

/* =========================================================
   CHECKOUT
   ========================================================= */
const form = $('#orderForm');
form.addEventListener('change', e => {
  if (e.target.name !== 'mode') return;
  $$('[data-for]', form).forEach(f => f.classList.toggle('hidden', f.dataset.for !== e.target.value));
});
form.addEventListener('submit', e => {
  e.preventDefault();
  const err = $('#formErr');
  $$('.field', form).forEach(f => f.classList.remove('err'));
  const t = totals();
  const fail = (sel, msg) => { if (sel) sel.closest('.field').classList.add('err'); err.textContent = msg; if (sel) sel.focus(); };
  if (!t.bowls && !t.drinks && !t.adds) return fail(null, 'Vé còn trống — bạn chọn ít nhất một món nhé.');
  const F = n => form.elements.namedItem(n);
  const name = F('name').value.trim(), phone = F('phone').value.replace(/\s/g, ''), mode = F('mode').value;
  if (name.length < 2) return fail(F('name'), 'Cho bếp xin tên của bạn nhé.');
  if (!/^(0|\+84)\d{9,10}$/.test(phone)) return fail(F('phone'), 'Số điện thoại chưa đúng (VD: 0901234567).');
  if (mode === 'ship' && F('addr').value.trim().length < 6) return fail(F('addr'), 'Bạn ghi giúp địa chỉ giao hàng nhé.');
  err.textContent = '';
  const code = 'DL-' + String(Math.floor(1000 + Math.random() * 9000));
  const how = { dine: F('table').value ? `phục vụ tại bàn ${F('table').value.replace(/[<>&]/g, '')}` : 'phục vụ tại quán', take: 'chuẩn bị mang về', ship: 'giao tận nơi' }[mode];
  $('#successMsg').innerHTML = `Cảm ơn <b>${name.replace(/[<>&]/g, '')}</b>! Order ${fmt(t.sum)} đang được ${how}. Mã đơn của bạn:`;
  $('#successCode').textContent = code;
  $('#success').classList.add('open');
  $('#success').setAttribute('aria-hidden', 'false');
  confetti();
});
$('#successOk').onclick = () => {
  $('#success').classList.remove('open');
  $('#success').setAttribute('aria-hidden', 'true');
  cart = { dishes: {}, drinks: {}, sides: {} }; save(); update();
  form.reset();
  $$('[data-for]', form).forEach(f => f.classList.toggle('hidden', f.dataset.for !== 'dine'));
  scrollTo({ top: 0, behavior: 'smooth' });
};
function confetti() {
  if (REDUCE) return;
  const colors = ['#ff4b2b', '#f3d28c', '#d7261e', '#ffffff', '#ff8a3d'];
  for (let i = 0; i < 70; i++) {
    const c = document.createElement('i');
    c.className = 'confetti';
    c.style.left = Math.random() * 100 + 'vw';
    c.style.background = colors[i % colors.length];
    c.style.setProperty('--dx', (Math.random() * 200 - 100) + 'px');
    c.style.setProperty('--rot', (Math.random() * 1080 - 540) + 'deg');
    c.style.animationDuration = 2 + Math.random() * 2 + 's';
    c.style.animationDelay = Math.random() * .4 + 's';
    c.style.borderRadius = i % 3 ? '2px' : '50%';
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 4600);
  }
}

/* =========================================================
   HERO SLIDER + EMBERS
   ========================================================= */
const slides = $$('.slide'), dots = $('#heroDots');
let si = 0, sTimer;
dots.innerHTML = slides.map((_, i) => `<button type="button" aria-label="Slide ${i + 1}"><i></i></button>`).join('');
function showSlide(i) {
  si = (i + slides.length) % slides.length;
  slides.forEach((s, k) => s.classList.toggle('is-active', k === si));
  $$('button', dots).forEach((b, k) => { b.classList.remove('on'); void b.offsetWidth; b.classList.toggle('on', k === si); });
  clearTimeout(sTimer);
  sTimer = setTimeout(() => showSlide(si + 1), 7000);
  if (si === 0) setTimeout(() => playBowl($('#heroBowl .bowl-scene'), 2400), 1100);
}
$$('button', dots).forEach((b, k) => b.onclick = () => showSlide(k));

function embers() {
  const cv = $('#embers'), ctx = cv.getContext('2d');
  if (REDUCE) return;
  let W, H, P = [];
  const dpr = Math.min(devicePixelRatio || 1, 2);
  const size = () => { W = cv.width = cv.offsetWidth * dpr; H = cv.height = cv.offsetHeight * dpr; };
  size(); addEventListener('resize', size);
  const spawn = () => ({ x: Math.random() * W, y: H + Math.random() * 40, r: (Math.random() * 2 + .6) * dpr,
    vy: -(Math.random() * 1.1 + .35) * dpr, vx: (Math.random() - .5) * .4 * dpr, ph: Math.random() * 6.28, life: 1, hue: 15 + Math.random() * 30 });
  for (let i = 0; i < 70; i++) { const p = spawn(); p.y = Math.random() * H; P.push(p); }
  let visible = true;
  new IntersectionObserver(([en]) => visible = en.isIntersecting).observe(cv);
  (function loop() {
    requestAnimationFrame(loop);
    if (!visible) return;
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'lighter';
    P.forEach((p, i) => {
      p.ph += .03; p.x += p.vx + Math.sin(p.ph) * .35 * dpr; p.y += p.vy; p.life -= .0016;
      const a = Math.max(0, Math.min(1, p.life)) * (.55 + Math.sin(p.ph * 3) * .25);
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
      g.addColorStop(0, `hsla(${p.hue},100%,70%,${a})`);
      g.addColorStop(1, `hsla(${p.hue},100%,50%,0)`);
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 4, 0, 6.28); ctx.fill();
      if (p.y < -20 || p.life <= 0) P[i] = spawn();
    });
  })();
}

/* =========================================================
   FX: header, reveal, tilt, cursor glow
   ========================================================= */
function fx() {
  const io = new IntersectionObserver(es => es.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
  }), { threshold: .12, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal').forEach(el => io.observe(el));

  const bar = $('#topbar');
  const onScroll = () => { bar.classList.toggle('scrolled', scrollY > 30); trackStep(); };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  if (matchMedia('(pointer:fine)').matches && !REDUCE) {
    const glow = $('#glow');
    addEventListener('pointermove', e => { glow.style.transform = `translate(${e.clientX}px,${e.clientY}px)`; }, { passive: true });
    $$('.tilt').forEach(c => {
      c.addEventListener('pointermove', e => {
        const r = c.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        c.style.setProperty('--ty', ((x - .5) * 8).toFixed(2) + 'deg');
        c.style.setProperty('--tx', ((.5 - y) * 8).toFixed(2) + 'deg');
        c.style.setProperty('--mx', x * 100 + '%');
        c.style.setProperty('--my', y * 100 + '%');
      });
      c.addEventListener('pointerleave', () => { c.style.setProperty('--tx', '0deg'); c.style.setProperty('--ty', '0deg'); });
    });
  }
}

/* =========================================================
   BOOT
   ========================================================= */
renderHero();
renderMenu();
renderDrinks();
renderSides();
update();
fx();
embers();

const loader = $('#loader');
const t0 = performance.now();
const finish = () => {
  const wait = Math.max(0, 1700 - (performance.now() - t0));
  setTimeout(() => {
    loader.classList.add('done');
    document.body.classList.remove('lock');
    showSlide(0);
    setTimeout(() => loader.classList.add('gone'), 1500);
  }, wait);
};
document.readyState === 'complete' ? finish() : addEventListener('load', finish);
})();
