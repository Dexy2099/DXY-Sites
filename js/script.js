// =========================================================
// DXY Sites — script.js
// =========================================================

// Ano dinâmico no rodapé
document.getElementById('year').textContent = new Date().getFullYear();

// ---------------------------------------------------------
// Animação do terminal na hero: "digita" a criação de cada
// serviço, como se fosse um deploy real.
// ---------------------------------------------------------
const terminalBody = document.getElementById('terminal-body');

const script = [
  { type: 'cmd', text: '$ dxy new site --cliente="sua-marca"' },
  { type: 'out', text: 'criando estrutura do site...' },
  { type: 'ok',  text: '✓ site publicado em sua-marca.com' },
  { type: 'cmd', text: '$ dxy new loja --pagamento=pix,cartao' },
  { type: 'out', text: 'configurando catálogo e checkout...' },
  { type: 'ok',  text: '✓ loja virtual pronta para vender' },
  { type: 'cmd', text: '$ dxy new bot --discord --moderacao' },
  { type: 'out', text: 'implantando bot no servidor...' },
  { type: 'ok',  text: '✓ bot online 24/7' },
  { type: 'cmd', text: '$ dxy hosting --status' },
  { type: 'ok',  text: '✓ todos os serviços no ar' },
];

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function appendLine(text, className) {
  const line = document.createElement('div');
  if (className) line.classList.add(className);
  line.textContent = text;
  terminalBody.appendChild(line);
  terminalBody.scrollTop = terminalBody.scrollHeight;
}

async function typeLine(text, className, speed = 22) {
  const line = document.createElement('div');
  if (className) line.classList.add(className);
  terminalBody.appendChild(line);

  for (let i = 0; i < text.length; i++) {
    line.textContent += text[i];
    await sleep(speed);
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runTerminal() {
  if (!terminalBody) return;

  // Se o usuário prefere menos movimento, mostra tudo direto, sem animação de digitação.
  if (prefersReducedMotion) {
    script.forEach((step) => {
      const className = step.type === 'cmd' ? 'line-cmd' : step.type === 'ok' ? 'line-ok' : '';
      appendLine(step.text, className);
    });
    return;
  }

  for (const step of script) {
    if (step.type === 'cmd') {
      await typeLine(step.text, 'line-cmd', 20);
      await sleep(200);
    } else if (step.type === 'ok') {
      appendLine(step.text, 'line-ok');
      await sleep(450);
    } else {
      appendLine(step.text, '');
      await sleep(500);
    }
  }

  // cursor piscando ao final
  const cursor = document.createElement('span');
  cursor.classList.add('cursor');
  const lastLine = document.createElement('div');
  lastLine.appendChild(document.createTextNode('$ '));
  lastLine.appendChild(cursor);
  terminalBody.appendChild(lastLine);
}

// Inicia a animação quando o terminal entra na tela (ou logo no load, na hero)
if (terminalBody) {
  runTerminal();
}

// ---------------------------------------------------------
// Reveal suave dos cards ao rolar a página
// ---------------------------------------------------------
const revealTargets = document.querySelectorAll('.card, .step, .contact-card');

if ('IntersectionObserver' in window && !prefersReducedMotion) {
  revealTargets.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealTargets.forEach((el) => observer.observe(el));
}

// ---------------------------------------------------------
// Header some/aparece de forma sutil ao rolar (mantém fixo, só sombra)
// ---------------------------------------------------------
const topbar = document.querySelector('.topbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 8) {
    topbar.style.boxShadow = '0 8px 24px -12px rgba(0,0,0,0.6)';
  } else {
    topbar.style.boxShadow = 'none';
  }
});