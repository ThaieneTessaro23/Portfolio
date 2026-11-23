// Portfolio single-page interactions
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', open);
  menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open'); menuButton?.setAttribute('aria-expanded','false');
}));
// Fade-in on scroll: elements become visible when entering the viewport.
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), {threshold: 0.12, rootMargin: '0px 0px -30px 0px'});
  revealItems.forEach(el => observer.observe(el));
} else revealItems.forEach(el => el.classList.add('visible'));
// Top reading progress indicator
const progress = document.querySelector('.scroll-progress');
function updateProgress(){
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
  if (progress) progress.style.width = `${pct}%`;
}
window.addEventListener('scroll', updateProgress, {passive:true}); updateProgress();
// TODO: personalize the contact href values in index.html (email, LinkedIn, phone, GitHub, Instagram).

async function copyContact(text, button) {
    try {
        await navigator.clipboard.writeText(text);

        button.classList.add("copied");

        const original = button.innerHTML;

        button.innerHTML = "✓";
        button.title = "Copiado!";

        setTimeout(() => {
            button.innerHTML = original;
            button.classList.remove("copied");
            button.title = "Copiar";
        }, 1500);

    } catch (error) {
        alert("Não foi possível copiar. Tente selecionar o texto manualmente.");
    }
}