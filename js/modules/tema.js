// Seletor de modo de cor: Automático (segue o sistema), Claro, Escuro e Alto contraste.
// O tema só troca o atributo data-tema no <html>; as cores vêm das variáveis do CSS.
// A escolha é aplicada antes do primeiro desenho por um script curto no <head> do HTML,
// para a página não "piscar" no tema errado.

export const CHAVE_TEMA = 'sinal-aberto:tema';
export const TEMAS = ['sistema', 'claro', 'escuro', 'alto-contraste'];
export const EVENTO_TEMA = 'sinal-aberto:tema';

export function aplicarTema(tema) {
  const valido = TEMAS.includes(tema) ? tema : 'sistema';
  if (valido === 'sistema') {
    delete document.documentElement.dataset.tema;
  } else {
    document.documentElement.dataset.tema = valido;
  }
  // Componentes que desenham em canvas (gráfico) precisam reler as cores.
  document.dispatchEvent(new CustomEvent(EVENTO_TEMA, { detail: valido }));
  return valido;
}

export function lerTemaSalvo() {
  try {
    return localStorage.getItem(CHAVE_TEMA) ?? 'sistema';
  } catch {
    return 'sistema';
  }
}

export function iniciarTema() {
  const seletor = document.getElementById('seletor-tema');
  if (!seletor) return;
  seletor.value = aplicarTema(lerTemaSalvo());

  seletor.addEventListener('change', () => {
    const tema = aplicarTema(seletor.value);
    try {
      if (tema === 'sistema') localStorage.removeItem(CHAVE_TEMA);
      else localStorage.setItem(CHAVE_TEMA, tema);
    } catch {
      /* sem armazenamento: o tema vale só para esta visita */
    }
  });

  // No modo Automático, o gráfico também precisa acompanhar a troca de tema do sistema.
  for (const consulta of ['(prefers-color-scheme: dark)', '(prefers-contrast: more)']) {
    matchMedia(consulta).addEventListener('change', () => {
      if (seletor.value === 'sistema') aplicarTema('sistema');
    });
  }
}
