// Máscaras de digitação para CPF, telefone e CEP.
export const mascaras = {
  cpf: (d) => d.slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2'),

  telefone: (d) => {
    d = d.slice(0, 11);
    if (d.length > 10) return d.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    if (d.length > 6) return d.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    if (d.length > 2) return d.replace(/(\d{2})(\d{0,4})/, '($1) $2');
    return d.length ? '(' + d : '';
  },

  cep: (d) => d.slice(0, 8).replace(/(\d{5})(\d)/, '$1-$2'),
};

// Aplica as máscaras aos campos com data-mascara dentro de `raiz`.
// Precisa ser chamada sempre que a view do formulário é renderizada.
export function aplicarMascaras(raiz) {
  raiz.querySelectorAll('[data-mascara]').forEach((campo) => {
    const formatar = () => {
      campo.value = mascaras[campo.dataset.mascara](campo.value.replace(/\D/g, ''));
    };

    // Ao apagar, não reformata: senão o usuário não consegue remover parênteses e traços.
    campo.addEventListener('input', (e) => {
      if (!e.inputType || !e.inputType.startsWith('delete')) formatar();
    });
    campo.addEventListener('blur', formatar);
  });
}
