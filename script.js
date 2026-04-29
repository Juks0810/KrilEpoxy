/* ── CUSTOM CURSOR ── */
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
});
(function animRing() {
  rx += (mx - rx) * 0.14; ry += (my - ry) * 0.14;
  ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
  requestAnimationFrame(animRing);
})();

document.querySelectorAll('a,button,.service-card,.material-item,.why-feature,.showcase-tile,.hero-card').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});
document.addEventListener('mousedown', () => document.body.classList.add('cursor-click'));
document.addEventListener('mouseup', () => document.body.classList.remove('cursor-click'));

/* ── SCROLL PROGRESS ── */
const bar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  bar.style.width = (window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100) + '%';
}, { passive: true });

/* ── NAV ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 40), { passive: true });

/* Active nav link */
const navLinks = document.querySelectorAll('.nav-links a[data-section]');
const secObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) navLinks.forEach(a => a.classList.toggle('active', a.dataset.section === e.target.id));
  });
}, { threshold: 0.35 });
document.querySelectorAll('section[id]').forEach(s => secObs.observe(s));

/* ── REVEAL ── */
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

/* ── PROCESS LINE ── */
const procObs = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) document.getElementById('process-steps').classList.add('animated');
}, { threshold: 0.4 });
procObs.observe(document.getElementById('process-steps'));

/* ── COUNTER ANIMATION ── */
function runCounter(el) {
  const target = parseInt(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  const dur = 1800;
  const t0 = performance.now();
  (function tick(now) {
    const p = Math.min((now - t0) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    const v = Math.floor(ease * target);
    el.textContent = (target >= 1000 ? v.toLocaleString('hr') : v) + suffix;
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = (target >= 1000 ? target.toLocaleString('hr') : target) + suffix;
  })(t0);
}
const cntObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('[data-count]').forEach(runCounter);
      cntObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.stats, .hero-visual').forEach(el => cntObs.observe(el));

/* ── WORD SCRAMBLE ── */
const sw = document.getElementById('scramble-word');
const words = ['traju','sjaje','govore','žive'];
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
let wIdx = 0;
function scrambleTo(word) {
  let iter = 0;
  const iv = setInterval(() => {
    sw.textContent = word.split('').map((c, i) => i < iter ? word[i] : CHARS[Math.floor(Math.random() * CHARS.length)]).join('');
    if (iter >= word.length) clearInterval(iv);
    iter += 0.5;
  }, 38);
}
setInterval(() => { wIdx = (wIdx + 1) % words.length; scrambleTo(words[wIdx]); }, 3200);

/* ── FLOATING PARTICLES ── */
const pc = document.getElementById('particles');
for (let i = 0; i < 20; i++) {
  const p = document.createElement('div');
  p.className = 'particle';
  const s = Math.random() * 5 + 2;
  p.style.cssText = `width:${s}px;height:${s}px;left:${Math.random()*100}%;bottom:-5%;animation-duration:${7+Math.random()*9}s;animation-delay:${Math.random()*10}s;`;
  pc.appendChild(p);
}

/* ── SERVICE CARDS ── */
function toggleService(card) {
  const open = card.classList.contains('expanded');
  document.querySelectorAll('.service-card.expanded').forEach(c => c.classList.remove('expanded'));
  if (!open) card.classList.add('expanded');
}

/* ── RIPPLE ── */
function addRipple(btn, e) {
  const r = document.createElement('span');
  r.className = 'btn-ripple';
  const rect = btn.getBoundingClientRect();
  const sz = Math.max(rect.width, rect.height);
  r.style.cssText = `width:${sz}px;height:${sz}px;left:${e.clientX-rect.left-sz/2}px;top:${e.clientY-rect.top-sz/2}px;`;
  btn.appendChild(r);
  setTimeout(() => r.remove(), 700);
}
document.querySelectorAll('.btn-primary').forEach(btn => btn.addEventListener('click', e => addRipple(btn, e)));

/* ── 3D TILT ── */
document.querySelectorAll('[data-tilt]').forEach(tile => {
  tile.addEventListener('mousemove', e => {
    const rect = tile.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    tile.style.transform = `perspective(600px) rotateY(${x*14}deg) rotateX(${-y*14}deg) scale(1.03)`;
  });
  tile.addEventListener('mouseleave', () => { tile.style.transform = ''; });
});

/* ── MAGNETIC BUTTONS ── */
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width/2) * 0.22;
    const y = (e.clientY - rect.top - rect.height/2) * 0.22;
    btn.style.transform = `translate(${x}px,${y}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transition = 'transform 0.45s ease';
    btn.style.transform = '';
    setTimeout(() => btn.style.transition = '', 450);
  });
});

/* ── PARALLAX ON SCROLL ── */
const heroContent = document.getElementById('hero-content');
const heroVisual = document.getElementById('hero-visual');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y < window.innerHeight) {
    heroContent.style.transform = `translateY(${y * 0.07}px)`;
    heroVisual.style.transform = `translateY(${y * 0.04}px)`;
    pc.style.transform = `translateY(${y * 0.15}px)`;
  }
}, { passive: true });

/* ── WHY-BIG PARALLAX on mouse ── */
const whyBig = document.getElementById('why-big');
whyBig.parentElement.addEventListener('mousemove', e => {
  const rect = whyBig.parentElement.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  whyBig.style.transform = `translate(${x*22}px,${y*12}px)`;
});
whyBig.parentElement.addEventListener('mouseleave', () => { whyBig.style.transform = ''; });

/* ── TOAST ── */
document.getElementById('submit-btn').addEventListener('click', function(e) {
  addRipple(this, e);
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
});