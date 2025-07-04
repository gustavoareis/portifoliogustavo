let ultimoScroll = 0;

window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navegacao');
  const scrollAtual = window.scrollY;

  if (scrollAtual > ultimoScroll && scrollAtual > 100) {
    // Rolando para baixo → esconde
    nav.classList.add('ocultar');
  } else {
    // Rolando para cima → mostra
    nav.classList.remove('ocultar');
  }

  ultimoScroll = scrollAtual;
});