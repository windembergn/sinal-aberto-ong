// Persistência no localStorage: rascunho do formulário e cadastros enviados.
// O storage é injetável para que os testes rodem no Node com um armazenamento falso.

const PREFIXO = 'sinal-aberto:';
const CHAVE_RASCUNHO = `${PREFIXO}rascunho`;
const CHAVE_CADASTROS = `${PREFIXO}cadastros`;

// CPF nunca é guardado inteiro: só os dígitos do meio, para identificar sem expor.
export const mascararCpf = (cpf) => {
  const d = String(cpf).replace(/\D/g, '');
  return d.length === 11 ? `***.${d.slice(3, 6)}.${d.slice(6, 9)}-**` : '';
};

export function criarArmazenamento(storage = globalThis.localStorage) {
  // Em aba anônima ou com armazenamento bloqueado, o acesso pode lançar erro:
  // o site continua funcionando, só não persiste.
  const ler = (chave, padrao) => {
    try {
      const bruto = storage.getItem(chave);
      return bruto === null ? padrao : JSON.parse(bruto);
    } catch {
      return padrao;
    }
  };

  const gravar = (chave, valor) => {
    try {
      storage.setItem(chave, JSON.stringify(valor));
      return true;
    } catch {
      return false;
    }
  };

  const apagar = (chave) => {
    try {
      storage.removeItem(chave);
    } catch {
      /* sem armazenamento disponível: nada a apagar */
    }
  };

  return {
    lerRascunho: () => ler(CHAVE_RASCUNHO, null),

    salvarRascunho(campos) {
      // CPF e aceite dos termos ficam fora do rascunho de propósito.
      const { cpf, termos, ...resto } = campos;
      return gravar(CHAVE_RASCUNHO, { campos: resto, salvoEm: new Date().toISOString() });
    },

    limparRascunho: () => apagar(CHAVE_RASCUNHO),

    listarCadastros: () => ler(CHAVE_CADASTROS, []),

    adicionarCadastro(form) {
      const cadastro = {
        id: globalThis.crypto?.randomUUID?.() ?? String(Date.now()),
        nome: form.nome.trim(),
        email: form.email.trim(),
        tipo: form['tipo-participacao'],
        cidade: form.cidade.trim(),
        estado: form.estado,
        disponibilidade: form.disponibilidade ? Number(form.disponibilidade) : null,
        cpf: mascararCpf(form.cpf),
        criadoEm: new Date().toISOString(),
      };
      const lista = [cadastro, ...ler(CHAVE_CADASTROS, [])];
      return gravar(CHAVE_CADASTROS, lista) ? cadastro : null;
    },

    removerCadastro(id) {
      const lista = ler(CHAVE_CADASTROS, []).filter((c) => c.id !== id);
      gravar(CHAVE_CADASTROS, lista);
      return lista;
    },
  };
}

export const armazenamento = criarArmazenamento(globalThis.localStorage);
