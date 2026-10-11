// Regras de validação do cadastro. Funções puras (sem DOM), para poderem ser
// testadas no Node e reaproveitadas por qualquer formulário.

export const IDADE_MINIMA = 16;

const somenteDigitos = (texto) => String(texto ?? '').replace(/\D/g, '');

// CPF: confere o formato e os dois dígitos verificadores.
export function cpfValido(cpf) {
  const d = somenteDigitos(cpf);
  if (d.length !== 11 || /^(\d)\1{10}$/.test(d)) return false;

  const digito = (base) => {
    let soma = 0;
    for (let i = 0; i < base.length; i++) soma += Number(base[i]) * (base.length + 1 - i);
    const resto = (soma * 10) % 11;
    return resto === 10 ? 0 : resto;
  };

  return digito(d.slice(0, 9)) === Number(d[9]) && digito(d.slice(0, 10)) === Number(d[10]);
}

export function calcularIdade(dataIso, hoje = new Date()) {
  const [ano, mes, dia] = String(dataIso).split('-').map(Number);
  if (!ano || !mes || !dia) return NaN;
  let idade = hoje.getFullYear() - ano;
  const aindaNaoFezAniversario = hoje.getMonth() + 1 < mes || (hoje.getMonth() + 1 === mes && hoje.getDate() < dia);
  if (aindaNaoFezAniversario) idade--;
  return idade;
}

const precisaDeHoras = (tipo) => tipo === 'voluntario' || tipo === 'ambos';

// Cada regra recebe o valor do campo e o formulário inteiro (para regras cruzadas)
// e devolve a mensagem de erro, ou '' quando o valor é válido.
export const regras = {
  nome(valor) {
    const nome = valor.trim();
    if (!nome) return 'Informe seu nome completo.';
    if (nome.split(/\s+/).length < 2) return 'Informe nome e sobrenome.';
    if (nome.length > 100) return 'Use no máximo 100 caracteres.';
    return '';
  },

  email(valor) {
    if (!valor.trim()) return 'Informe seu e-mail.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor.trim())) return 'Informe um e-mail válido, como voce@exemplo.com.';
    return '';
  },

  nascimento(valor, _form, hoje = new Date()) {
    if (!valor) return 'Informe sua data de nascimento.';
    const idade = calcularIdade(valor, hoje);
    if (Number.isNaN(idade) || idade < 0) return 'Informe uma data válida.';
    if (idade < IDADE_MINIMA) return `O cadastro é a partir de ${IDADE_MINIMA} anos.`;
    if (idade > 120) return 'Confira o ano de nascimento.';
    return '';
  },

  telefone(valor) {
    if (!valor.trim()) return 'Informe um telefone ou WhatsApp.';
    const d = somenteDigitos(valor);
    if (d.length < 10 || d.length > 11) return 'Use o formato (DD) 99999-0000.';
    if (d.length === 11 && d[2] !== '9') return 'Celular com 11 dígitos começa com 9 depois do DDD.';
    return '';
  },

  cpf(valor) {
    if (!valor.trim()) return 'Informe seu CPF.';
    if (somenteDigitos(valor).length !== 11) return 'Use o formato 000.000.000-00.';
    if (!cpfValido(valor)) return 'CPF inválido: confira os números digitados.';
    return '';
  },

  cep(valor) {
    if (!valor.trim()) return 'Informe seu CEP.';
    if (somenteDigitos(valor).length !== 8) return 'Use o formato 00000-000.';
    return '';
  },

  endereco(valor) {
    if (!valor.trim()) return 'Informe a rua e o número.';
    if (!/\d/.test(valor)) return 'Inclua o número do endereço.';
    return '';
  },

  cidade(valor) {
    return valor.trim().length < 2 ? 'Informe sua cidade.' : '';
  },

  estado(valor) {
    return valor ? '' : 'Selecione um estado.';
  },

  'tipo-participacao'(valor) {
    return valor ? '' : 'Escolha uma forma de participação.';
  },

  // Regra cruzada: só é obrigatória para quem vai atuar como voluntário.
  disponibilidade(valor, form) {
    if (!precisaDeHoras(form['tipo-participacao'])) return '';
    if (valor === '' || valor == null) return 'Informe quantas horas por semana você pode dedicar.';
    const horas = Number(valor);
    if (!Number.isInteger(horas) || horas < 1 || horas > 40) return 'Informe um número inteiro entre 1 e 40.';
    return '';
  },

  mensagem(valor) {
    return valor.length > 500 ? 'Use no máximo 500 caracteres.' : '';
  },

  termos(valor) {
    return valor ? '' : 'É preciso aceitar os termos para concluir o cadastro.';
  },
};

export function validarCampo(nome, form, hoje) {
  const regra = regras[nome];
  return regra ? regra(form[nome] ?? '', form, hoje) : '';
}

// Devolve { campo: mensagem } só com os campos que têm erro.
export function validarFormulario(form, hoje) {
  const erros = {};
  for (const nome of Object.keys(regras)) {
    const mensagem = validarCampo(nome, form, hoje);
    if (mensagem) erros[nome] = mensagem;
  }
  return erros;
}

export { precisaDeHoras };
