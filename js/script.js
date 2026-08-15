// DXY Sites — interações da página

document.addEventListener('DOMContentLoaded', () => {

  // Atualiza o ano do rodapé automaticamente
  const copyright = document.getElementById('copyright');
  if (copyright) {
    const year = new Date().getFullYear();
    copyright.textContent = `© ${year} DXY Sites`;
  }

  // Reinicia a animação "wireframe → site publicado" toda vez que
  // o painel do hero volta a ficar visível na tela
  const buildPanel = document.querySelector('.build-panel');
  const draftLayer = document.querySelector('.draft-layer');
  const finalLayer = document.querySelector('.final-layer');

  if (buildPanel && draftLayer && finalLayer && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // remove e reaplica as classes de animação para reiniciar o efeito
          draftLayer.style.animation = 'none';
          finalLayer.style.animation = 'none';
          // força o navegador a recalcular antes de reativar a animação
          void draftLayer.offsetWidth;
          draftLayer.style.animation = '';
          finalLayer.style.animation = '';
        }
      });
    }, { threshold: 0.6 });

    observer.observe(buildPanel);
  }

  // Realce do link de navegação conforme a seção visível
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.style.color = link.getAttribute('href') === `#${id}` ? 'var(--cyan)' : '';
          });
        }
      });
    }, { threshold: 0.5 });

    sections.forEach((section) => sectionObserver.observe(section));
  }

});